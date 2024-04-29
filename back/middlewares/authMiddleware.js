const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // Utilisez un espace comme séparateur
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        const user = await User.findById(decoded?.id);
        req.user = user;
        next(); // Appel de next() pour passer au middleware suivant ou à la route
      }
    } catch (error) {
      throw new Error("Non autorisé, token expiré, veuillez vous connecter");
    }
  } else {
    throw new Error("There is no token attached ");
  }
});

// admin

const isAdmin = asyncHandler(async (req, res, next) => {
  console.log("req.user", req.user);
  const { email } = req.user;
  const adminUser = await User.findOne({ NumCardId });
  if (adminUser.role !== "admin") {
    throw new Error("Vous n'etes pas un admin");
  } else {
    next(); // passer la requete
  }
});

module.exports = { authMiddleware, isAdmin };
