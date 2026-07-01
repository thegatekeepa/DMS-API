//only getDeliveryHistory is here since logHistory is not to be exposed to the client; it runs in the backgroung via the service code 
const deliveryHistoryService = require("../services/deliveryHistory.services");

// Get delivery history
const getDeliveryHistory = async (req, res) => {
    try {
        const history = await deliveryHistoryService.getDeliveryHistory(
            req.params.deliveryId
        );

        return res.status(200).json({
            success: true,
            data: history,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getDeliveryHistory,
};