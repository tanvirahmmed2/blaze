const jwt = require("jsonwebtoken")


const createJsonwebtoken = (payload, secretKey, expiresIn) => {
    
    if (typeof payload !== 'object' || !payload) {
        throw new Error('payload mus be a non-empty object')
    } 
    if (typeof secretKey !== 'string' || !secretKey) {
        throw new Error('secret key mus be a non-empty object')
    }
    try {
        const token = jwt.sign(payload, secretKey, { expiresIn })

        return token

        
    } catch (error) {
        throw error
        
    }


}

module.exports = { createJsonwebtoken }