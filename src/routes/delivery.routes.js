const express = require("express");
const deliRouter = express.Router();

const deliveryController = require("../controllers/delivery.controllers");
const authenticate = require("../middlewares/auth.middlewares");
const authorize = require("../middlewares/authorize.middlewares");

//create delivery
deliRouter.post("/create", authenticate, authorize("dispatcher"), deliveryController.createDelivery);
//get delivery
deliRouter.get("/all", authenticate, authorize("dispatcher", "rider"), deliveryController.getAllDeliveries);
deliRouter.get("/:id", authenticate, authorize("dispatcher", "rider"), deliveryController.getDeliveryById);

//assign rider
deliRouter.patch("/:deliveryId/assign", authenticate, authorize("dispatcher"), deliveryController.assignRider);
//accept assignment
deliRouter.patch("/:deliveryId/accept", authenticate, authorize("rider"), deliveryController.acceptAssignment);
//update delivery status
deliRouter.patch("/:deliveryId/status", authenticate, authorize("rider"), deliveryController.updateDeliveryStatus);
//cancel delivery
deliRouter.patch("/:deliveryId/cancel", authenticate, authorize("dispatcher"), deliveryController.cancelDelivery);

module.exports = deliRouter;