const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controllers");

authRouter.post("/register", authController.Register);
authRouter.post("/login", authController.Login);

module.exports = authRouter;