const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

router.post("/auth/register", authCtrl.register);
router.post("/auth/login", authCtrl.login);
//router.post("/auth/forgotpassword", authCtrl.forgotPassword);
router.put("/auth/passwordreset/:resetToken", authCtrl.resetPassword);

module.exports = router;
