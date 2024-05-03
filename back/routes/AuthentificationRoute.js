const express = require("express");

const {
    CreateUser,
    loginUserControl,
    getAllUser,
    getAUser,
    deleteAUser,
    updateAUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginProf,
    } = require("../controller/UserControls");
  const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

  
  const router = express.Router();

router.post("/register", CreateUser);


router.post("/login", loginUserControl);
router.post("/loginAdmin", loginProf);

router.get("/getAllUser", getAllUser);
router.get("/refresh", handleRefreshToken);


router.get("/:id", authMiddleware, getAUser);


router.get("/logout", logout);

router.put("/password", authMiddleware, updatePassword);

router.post("/forgot-Password-Token", forgotPasswordToken);
router.put("/reset-Password/:token", resetPassword);

router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put("/edit-user", authMiddleware, updateAUser);


router.delete("/:id", deleteAUser);

module.exports = router;
