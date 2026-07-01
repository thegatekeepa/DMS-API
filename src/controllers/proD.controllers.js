//prof of delivery controller
const proofOfDeliveryService = require("../services/proD.services");

// Upload proof of delivery
const uploadProof = async (req, res) => {
    try {
        const uploadedProof = await proofOfDeliveryService.uploadProof(
            req.params.deliveryId,
            req.user.id,
            req.file,
            req.body.notes
        );

        return res.status(201).json({
            success: true,
            message: "Proof of delivery uploaded successfully.",
            data: uploadedProof,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get proof of delivery
const getProofByDelivery = async (req, res) => {
    try {
        const proof = await proofOfDeliveryService.getProofByDelivery(
            req.params.deliveryId
        );

        return res.status(200).json({
            success: true,
            data: proof,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    uploadProof,
    getProofByDelivery,
};