const jwt = require("jsonwebtoken");
// on utilise l id pour generer un token
const generateToken=(id) => {
    return jwt.sign({id}, process.env.JWT_SECRET , { expiresIn:"1d"})
}

module.exports = { generateToken};