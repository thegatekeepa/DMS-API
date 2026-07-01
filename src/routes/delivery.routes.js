const express = require("express");
const deliRouter = express.Router();

const deliveryController = require("../controllers/delivery.controllers");
const authenticate = require("../middlewares/auth.middlewares");

//create delivery
deliRouter.post("/create", authenticate, deliveryController.createDelivery);
//get delivery
deliRouter.get("/all", authenticate, deliveryController.getAllDeliveries);
deliRouter.get("/:id", authenticate, deliveryController.getDeliveryById);

//assign rider
deliRouter.patch("/:deliveryId/assign", authenticate, deliveryController.assignRider);
//accept assignment
deliRouter.patch("/:deliveryId/accept", authenticate, deliveryController.acceptAssignment);
//update delivery status
deliRouter.patch("/:deliveryId/status", authenticate, deliveryController.updateDeliveryStatus);
//cancel delivery
deliRouter.patch("/:deliveryId/cancel", authenticate, deliveryController.cancelDelivery);

module.exports = deliRouter;