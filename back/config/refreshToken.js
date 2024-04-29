const jwt = require("jsonwebtoken");

// Utilisation de l'ID pour générer un token de rafraîchissement
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

module.exports = { generateRefreshToken };
