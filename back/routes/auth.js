const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");

router.post("/auth/register", authCtrl.register);
router.post("/auth/login", authCtrl.login);
router.put("/auth/passwordreset/:resetToken", authCtrl.resetPassword);
//router.get("/auth/delete/:email", authCtrl.deleteUser);

module.exports = router;
