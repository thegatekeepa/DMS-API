const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/user.controllers");
const authenticate = require("../middlewares/auth.middlewares");
const authorize = require("../middlewares/authorize.middlewares");

//get riders
userRouter.get(
    "/riders", 
    authenticate, 
    authorize("dispatcher"), 
    userController.getAllRiders
);
userRouter.get(
    "/rider/:id", 
    authenticate, 
    authorize("dispatcher"), 
    userController.getRiderById
);
//get dispatchers
userRouter.get(
    "/dispatchers", 
    authenticate, 
    authorize("rider"), 
    userController.getAllDispatchers
);
userRouter.get(
    "/dispatcher/:id", 
    authenticate, 
    authorize("rider"), 
    userController.getDispatcherById
);

//update user profile, regardless of role 
userRouter.patch("/:id", 
    authenticate, 
    userController.updateProfile
);

//deactivate user profile, regardless of role
userRouter.patch(
    "/:id/deactivate", 
    authenticate, 
    userController.deactivateUser
);

module.exports = userRouter;