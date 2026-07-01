//proof of delivery router
const express = require("express");
const prodRouter = express.Router();

const proofController = require("../controllers/proD.controllers");
const authenticate = require("../middlewares/auth.middlewares");
const upload = require("../middlewares/forUpload");

//submit proof of delivery
prodRouter.post("/:deliveryId", authenticate, upload.single("image"), proofController.uploadProof);
//see proof of delivery
prodRouter.get("/:deliveryId/get", authenticate, proofController.getProofByDelivery);

module.exports = prodRouter;