const express = require("express");
const {

    getAStudent,getAllStudents,CreateStudent,CreateMultipleStudents

} = require("../controller/StudentsControls");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", CreateStudent);
router.post("/CreateMultipleStudents", CreateMultipleStudents);





router.get("/getAllStudents", getAllStudents);

router.get("/:cin", authMiddleware, getAStudent);


module.exports = router;
