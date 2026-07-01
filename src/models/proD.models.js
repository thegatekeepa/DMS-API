//proD = proof of Delivery
const mongoose = require("mongoose");

const proDSchema = new mongoose.Schema(
  {
    deliveryItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
      required: true,
      unique: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    imagePublicId: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      trim: true,
    },

    deliveredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const proD = mongoose.model("ProofofDelivery", proDSchema);
module.exports = proD;