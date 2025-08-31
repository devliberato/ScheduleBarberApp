const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

//middleware
const verifyToken = require("../helpers/verify-token");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.patch("/edituser", verifyToken, UserController.editUserProfile);
router.post("/forgotpassword", UserController.forgotpassword);
router.post("/resetpassword", UserController.resetPassword);


module.exports = router;