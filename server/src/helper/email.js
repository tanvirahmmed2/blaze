const nodemailer = require("nodemailer");
const { smtpUSERNAME, smtpPASSWORD } = require("../secret");




const transporter = nodemailer.createTransport({
    host: "smtp.gamil.com",
    port: 587,
    secure: false,
    auth: {
        user: smtpUSERNAME,
        pass: smtpPASSWORD,
    },
});

const EmailwithNodeMailer = async (emailData) => {
    try {
        const mailOptions = {
            from: smtpUSERNAME,
            to: emailData.email,
            subject: emailData.subject,
            html: emailData.html,
        }
        const info = await transporter.sendMail(mailOptions)
        console.log(`message sent : %s`, info.response);

    } catch (error) {
        console.error(`error occred while sending email`)
        throw error
    }
    
}

module.exports = EmailwithNodeMailer