//proof of Delivery Services
const ProofOfDelivery = require("../models/proD.models");
const Delivery = require("../models/delivery.models");
const uploadImage = require("../middlewares/forUpload");

// Upload Proof of Delivery 
const uploadProof = async (deliveryId, riderId, file, notes) => {
    // Check if delivery exists before creating a proof for it's delivery 
    const existingDelivery = await Delivery.findById(deliveryId);

    if (!existingDelivery) {
        throw new Error("Delivery does not exist.");
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadImage(file.path);

    // Save proof
    const deliveryProof = await ProofOfDelivery.create({
        deliveryItem: deliveryId,
        imageUrl: uploadedImage.imageUrl,
        imagePublicId: uploadedImage.imagePublicId,
        notes,
        deliveredBy: riderId,
    });

    return deliveryProof;
};

// Get proof by delivery
const getProofByDelivery = async (deliveryId) => {
    const provenDelivery = await ProofOfDelivery.findOne({
        deliveryItem: deliveryId,
    })
        .populate("deliveryItem")
        .populate("deliveredBy", "firstName lastName");

    if (!provenDelivery) {
        throw new Error("Proof of delivery not found.");
    }

    return provenDelivery;
};

module.exports = {
    uploadProof,
    getProofByDelivery,
};