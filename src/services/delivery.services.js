const Delivery = require("../models/delivery.models");
const { ASSIGNMENT_STATUS, DMSDELIVERY_STATUS } = require("../constants/deliveryStatus");

//create Delivery
const createDelivery = async (dispatcherId, deliveryData) => {
    const delivery = await Delivery.create({
        ...deliveryData,
        dispatcher: dispatcherId,
    });

    return delivery;
};

// get all deliveries
const getAllDeliveries = async () => {
    return await Delivery.find()
        .populate("dispatcher", "firstName lastName email")
        .populate("rider", "firstName lastName phone");
};

//get delivery by id
const getDeliveryById = async (deliveryId) => {
    const oneDelivery = await Delivery.findById(deliveryId)
        .populate("dispatcher", "firstName lastName email")
        .populate("rider", "firstName lastName phone");

    if (!oneDelivery) {
        throw new Error("Delivery not found.");
    }

    return oneDelivery;
};

//assign rider
const assignRider = async (deliveryId, riderId) => {
    const upcomingDelivery = await Delivery.findById(deliveryId);

    if (!upcomingDelivery) {
        throw new Error("Delivery not found.");
    }

    upcomingDelivery.rider = riderId;
    upcomingDelivery.assignmentStatus = ASSIGNMENT_STATUS.pending;
    upcomingDelivery.assignmentExpiresAt = new Date(Date.now() + 45 * 60 * 1000);
    upcomingDelivery.deliveryStatus = DMSDELIVERY_STATUS.assigned;

    await upcomingDelivery.save();

    return upcomingDelivery;
};

//accept assignment
const acceptAssignment = async (deliveryId, riderId) => {
    const acceptedDelivery = await Delivery.findById(deliveryId);

    if (!acceptedDelivery) {
        throw new Error("Delivery not found.");
    }

    if (acceptedDelivery.rider.toString() !== riderId.toString) {
        throw new Error("Unauthorized.");
    }

    if (new Date() > acceptedDelivery.assignmentExpiresAt) {
        acceptedDelivery.assignmentStatus =
            ASSIGNMENT_STATUS.rejected;

        acceptedDelivery.rider = null;
        acceptedDelivery.assignmentExpiresAt = null;

        await acceptedDelivery.save();

        throw new Error("Assignment has expired.");
    }

    acceptedDelivery.assignmentStatus =
        ASSIGNMENT_STATUS.accepted;

    acceptedDelivery.deliveryStatus =
        DMSDELIVERY_STATUS.accepted;

    await acceptedDelivery.save();

    return acceptedDelivery;
};

//update delivery status
const updateDeliveryStatus = async (
    deliveryId,
    status
) => {
    const updatedDelivery = await Delivery.findById(deliveryId);

    if (!updatedDelivery) {
        throw new Error("Delivery not found.");
    }

    updatedDelivery.deliveryStatus = status;

    await updatedDelivery.save();

    return updatedDelivery;
};

//cancel delivery
const cancelDelivery = async (deliveryId) => {
    const cancelledDelivery = await Delivery.findById(deliveryId);

    if (!cancelledDelivery) {
        throw new Error("Delivery not found.");
    }

    cancelledDelivery.deliveryStatus =
        DMSDELIVERY_STATUS.cancelled;

    await cancelledDelivery.save();

    return cancelledDelivery;
};

module.exports = { createDelivery, 
    getAllDeliveries, 
    getDeliveryById, 
    assignRider,
    acceptAssignment, 
    updateDeliveryStatus, 
    cancelDelivery
};