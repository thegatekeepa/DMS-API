//proof of delivery router
const express = require("express");
const prodRouter = express.Router();

const proofController = require("../controllers/proD.controllers");
const authenticate = require("../middlewares/auth.middlewares");
const upload = require("../middlewares/forUpload");
const authorize = require("../middlewares/authorize.middlewares");
const uploadImage = require("../utils/uploadImage");

//submit proof of delivery
prodRouter.post(
    "/:deliveryId", 
    authenticate, 
    authorize("rider"), 
    upload.single("image"), 
    proofController.uploadProof);
//see proof of delivery
prodRouter.get(
    "/:deliveryId/get", 
    authenticate, 
    authorize(
        "dispatcher", 
        "rider"), 
        proofController.getProofByDelivery
    );

module.exports = prodRouter;