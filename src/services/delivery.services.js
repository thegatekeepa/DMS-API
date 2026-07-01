const Delivery = require("../models/delivery.models");
const { ASSIGNMENT_STATUS, DMSDELIVERY_STATUS } = require("../constants/deliveryStatus");
const { logHistory } = require("../services/deliveryHistory.services");

//create Delivery
const createDelivery = async (dispatcherId, deliveryData) => {
    const createdDelivery = await Delivery.create({
        ...deliveryData,
        dispatcher: dispatcherId,
    });

    return createdDelivery;
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
    await logHistory(
        upcomingDelivery._id, 
        upcomingDelivery.deliveryStatus, 
        upcomingDelivery.dispatcher
    );

    return upcomingDelivery;
};

//accept assignment
const acceptAssignment = async (deliveryId, riderId) => {
    const acceptedDelivery = await Delivery.findById(deliveryId);
        //check if the delivery exists
    if (!acceptedDelivery) {
        throw new Error("Delivery not found.");
    }
         //check if the accepted matches the model
    if (acceptedDelivery.rider.toString() !== riderId.toString()) {
        throw new Error("Unauthorized.");
    }
          //check if the assignment is accepted within 45 mins; autoreject if not
    if (new Date() > acceptedDelivery.assignmentExpiresAt) {
        acceptedDelivery.assignmentStatus =
            ASSIGNMENT_STATUS.rejected;

        acceptedDelivery.rider = null;
        acceptedDelivery.assignmentExpiresAt = null;
           //save --whatever occurs here
        await acceptedDelivery.save();

        throw new Error("Assignment has expired.");
    }
       //assignmen accepted above? = delivvery accepted
    acceptedDelivery.assignmentStatus = ASSIGNMENT_STATUS.accepted;
    acceptedDelivery.deliveryStatus = DMSDELIVERY_STATUS.accepted;

    await acceptedDelivery.save();
    await logHistory(
        acceptedDelivery._id, 
        acceptedDelivery.deliveryStatus, 
        acceptedDelivery.dispatcher
    );

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
    await logHistory(
        updatedDelivery._id, 
        updatedDelivery.deliveryStatus, 
        updatedDelivery.dispatcher
    );

    return updatedDelivery;
};

//cancel delivery
const cancelDelivery = async (deliveryId) => {
    const cancelledDelivery = await Delivery.findById(deliveryId);

    if (!cancelledDelivery) {
        throw new Error("Delivery not found.");
    }

    cancelledDelivery.deliveryStatus = DMSDELIVERY_STATUS.cancelled;

    await cancelledDelivery.save();
    await logHistory(
        cancelledDelivery._id, 
        cancelledDelivery.deliveryStatus, 
        cancelledDelivery.dispatcher
    );

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