const express = require("express");
const { CreateUser } = require("../controller/UserControls");
const router = express.Router();

router.post("/register" , CreateUser); // a bloquer car je serai le seul a pouvoir ajouter


module.exports = router