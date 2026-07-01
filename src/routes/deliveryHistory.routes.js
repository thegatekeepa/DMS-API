const express = require("express");
const dhRouter = express.Router();

const deliveryHistoryController = require("../controllers/dHistory.controllers");
const authenticate = require("../middlewares/auth.middlewares");
const authorize = require("../middlewares/authorize.middlewares");

dhRouter.get(
    "/:deliveryId", 
    authenticate, 
    authorize(
        "dispatcher", 
        "rider"), 
        deliveryHistoryController.getDeliveryHistory
    );

module.exports = dhRouter;