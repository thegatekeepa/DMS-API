const userService = require("../services/user.services");

// Get all riders
const getAllRiders = async (req, res) => {
    try {
        const allRiders = await userService.getAllRiders();

        return res.status(200).json({
            success: true,
            data: allRiders,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get rider by ID
const getRiderById = async (req, res) => {
    try {
        const oneRider = await userService.getRiderById(req.params.id);

        return res.status(200).json({
            success: true,
            data: oneRider,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all dispatchers
const getAllDispatchers = async (req, res) => {
    try {
        const allDispatchers = await userService.getAllDispatchers();

        return res.status(200).json({
            success: true,
            data: allDispatchers,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get dispatcher by ID
const getDispatcherById = async (req, res) => {
    try {
        const oneDispatcher = await userService.getDispatcherById(req.params.id);

        return res.status(200).json({
            success: true,
            data: oneDispatcher,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

// Update profile
const updateProfile = async (req, res) => {
    try {
        const updatedUser = await userService.updateProfile(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: updatedUser,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Deactivate user
const deactivateUser = async (req, res) => {
    try {
        const deletedUser = await userService.deactivateUser(req.params.id);

        return res.status(200).json({
            success: true,
            message: "User deactivated successfully.",
            data: deletedUser,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllRiders,
    getRiderById,
    getAllDispatchers,
    getDispatcherById,
    updateProfile,
    deactivateUser,
};