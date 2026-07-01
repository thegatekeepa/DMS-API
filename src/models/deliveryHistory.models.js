const mongoose = require("mongoose");

const dHistorySchema = new mongoose.Schema(
  {
    deliveryItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
      required: true,
    },

    newStatus: {
      type: String,
      required: true,
    },

    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const dHistory = mongoose.model(
    "DeliveryHistory", 
    dHistorySchema
)
module.exports = dHistory;