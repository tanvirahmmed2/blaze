const createHttpError = require("http-errors");
const User = require("../models/user.model");
const { jwtactivationkey, clientURL } = require("../secret");
const { createJsonwebtoken } = require("../helper/jsonwebtoken");
const EmailwithNodeMailer = require("../helper/email");

const getUser = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchRegEx = new RegExp(search, "i");

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegEx } },
        { email: { $regex: searchRegEx } },
        { phone: { $regex: searchRegEx } }
      ]
    };

    const users = await User.find(filter)
      .select("-password")
      .skip(skip)
      .limit(limit);

    const count = await User.countDocuments(filter);

    if (!users || users.length === 0) {
      throw createHttpError(404, "No users found");
    }

    res.status(200).json({
      message: "User profiles returned",
      users,
      pagination: {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null
      }
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      throw createHttpError(409, "User with this email already exists. Please try another.");
    }


    const token = createJsonwebtoken(
      { name, email, password, phone, address },
      jwtactivationkey,
      "10m"
    );

    const emailData = {
      email,
      subject: "Account Activation Mail",
      html: `
        <h2>Hello ${name}!</h2>
        <p>Please click below to activate your account:</p>
        <a href="${clientURL}/api/users/activate/${token}" target="_blank">
          Activate Your Account
        </a>
      `
    };

    // Send email
    try {
      await EmailwithNodeMailer(emailData);
    } catch (error) {
      return next(createHttpError(500, "Failed to send verification email"));
    }

    return res.status(200).json({
      message: `Please check your email (${email}) to complete registration.`,
      payload: { token }
    });

  } catch (error) {
    if (!error.status) error.status = 500;
    next(error);
  }
};

module.exports = {
  getUser,
  registerUser
};
