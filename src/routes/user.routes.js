const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/user.controllers");
const authenticate = require("../middlewares/auth.middlewares");

//the endpoints
userRouter.get("/riders", authenticate, userController.getAllRiders);
userRouter.get("/rider/:id", authenticate, userController.getRiderById);

userRouter.get("/dispatchers", authenticate, userController.getAllDispatchers);
userRouter.get("/dispatcher/:id", authenticate, userController.getDispatcherById);

//update user profile, regardless of role 
userRouter.patch("/:id", authenticate, userController.updateProfile);

//deactivate user profile, regardless of role
userRouter.patch("/:id/deactivate", authenticate, userController.deactivateUser);

module.exports = userRouter;