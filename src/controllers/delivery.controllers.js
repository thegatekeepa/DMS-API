const deliveryService = require("../services/delivery.services");

// Create delivery
const createDelivery = async (req, res) => {
    try {
        const newDelivery = await deliveryService.createDelivery(
            req.user.id,
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Delivery created successfully.",
            data: newDelivery,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all deliveries
const getAllDeliveries = async (req, res) => {
    try {
        const allDeliveries = await deliveryService.getAllDeliveries();

        return res.status(200).json({
            success: true,
            data: allDeliveries,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get delivery by ID
const getDeliveryById = async (req, res) => {
    try {
        const oneDelivery = await deliveryService.getDeliveryById(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            data: oneDelivery,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

// Assign rider
const assignRider = async (req, res) => {
    try {
        const assignedDelivery = await deliveryService.assignRider(
            req.params.deliveryId,
            req.body.riderId
        );

        return res.status(200).json({
            success: true,
            message: "Rider assigned successfully.",
            data: assignedDelivery,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Rider accepts assignment
const acceptAssignment = async (req, res) => {
    try {
        const acceptedDelivery = await deliveryService.acceptAssignment(
            req.params.deliveryId,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: "Assignment accepted.",
            data: acceptedDelivery,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Update delivery status
const updateDeliveryStatus = async (req, res) => {
    try {
        const updatedDelivery = await deliveryService.updateDeliveryStatus(
            req.params.deliveryId,
            req.body.status
        );

        return res.status(200).json({
            success: true,
            message: "Delivery status updated.",
            data: updatedDelivery,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Cancel delivery
const cancelDelivery = async (req, res) => {
    try {
        const deletedDelivery = await deliveryService.cancelDelivery(
            req.params.deliveryId
        );

        return res.status(200).json({
            success: true,
            message: "Delivery cancelled.",
            data: deletedDelivery,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createDelivery,
    getAllDeliveries,
    getDeliveryById,
    assignRider,
    acceptAssignment,
    updateDeliveryStatus,
    cancelDelivery,
};