const express = require("express");
const dhRouter = express.Router();

const deliveryHistoryController = require("../controllers/dHistory.controllers");
const authenticate = require("../middlewares/auth.middlewares");

dhRouter.get("/:deliveryId", authenticate, deliveryHistoryController.getDeliveryHistory);

module.exports = dhRouter;