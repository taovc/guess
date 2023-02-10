const express = require("express");
const expressWs = require("express-ws");
const router = express.Router();
const authCtrl = require("../controllers/auth");

expressWs(router);
router.post("/auth/register", authCtrl.register);
router
  .post("/auth/login", authCtrl.login)
  .ws("/auth/login", function (ws, req) {
    ws.on("message", function (msg) {
      console.log(msg);
    });
    console.log("socket", req.testing);
  });
router.put("/auth/passwordreset/:resetToken", authCtrl.resetPassword);
//router.get("/auth/delete/:email", authCtrl.deleteUser);

module.exports = router;
