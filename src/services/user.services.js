const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

//get all riders
const getAllRiders = async () => {
    return await User.find({
        role: "rider",
        isActive: true,
    });
};

//get rider by id
const getRiderById = async (id) => {
    const Rider = await User.findOne({
        _id: id,
        role: "rider",
    });

    if (!Rider) {
        throw new Error("Rider not found.");
    }

    return Rider;
};

//get all dispatcher
const getAllDispatchers = async () => {
    return await User.find({
        role: "dispatcher",
        isActive: true,
    });
};

//get dispatcher by id
const getDispatcherById = async (id) => {
    const Dispatcher = await User.findOne({
        _id: id,
        role: "dispatcher",
    });

    if (!Dispatcher) {
        throw new Error("Dispatcher not found.");
    }

    return Dispatcher;
};

//update profile
const updateProfile = async (userId, updateData) => {
    const returningUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!returningUser) {
        throw new Error("User not found.");
    }

    return returningUser;
};

//deactivate or delete user
const deactivateUser = async (userId) => {
    const deletedUser = await User.findByIdAndUpdate(
        userId,
        {
            isActive: false,
        },
        {
            new: true,
        }
    );

    if (!deletedUser) {
        throw new Error("User not found.");
    }

    return deletedUser;
};

