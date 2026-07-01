const DeliveryHistory = require("../models/deliveryHistory.models");

// Log a delivery status change
const logHistory = async (
    deliveryId,
    newStatus,
    changedBy ) => {
    const loggedHistory = await DeliveryHistory.create({
        deliveryItem: deliveryId,
        newStatus,
        changedBy,
    });

    return loggedHistory;
};

// Get delivery history
const getDeliveryHistory = async (deliveryId) => {
    const deliveryHistory = await DeliveryHistory.find({
        deliveryItem: deliveryId,
    })
        .populate("changedBy", "firstName lastName role")
        .sort({ createdAt: 1 });

    return deliveryHistory;
};

module.exports = {
    logHistory,
    getDeliveryHistory,
};