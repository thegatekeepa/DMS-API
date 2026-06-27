const mongoose = require("mongoose");
const DMSDELIVERY_STATUS = require("../constants/deliveryStatus");

const deliverySchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      unique: true,
      required: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerPhone: {
      type: String,
      required: true,
      trim: true,
      validate: {
                validator: function (value) {
                    return /^\d{11}$/.test(value);
                }, message: "Please enter 11 digits number to continue."
            },
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    dropoffAddress: {
      type: String,
      required: true,
    },

    packageDescription: {
      type: String,
      required: true,
    },

    deliveryStatus: {
      type: String,
      enum: Object.values(DMSDELIVERY_STATUS),
      default: DMSDELIVERY_STATUS.pending
    },

    dispatcher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
const delivery = mongoose.model("Delivery", deliverySchema);
module.exports = delivery;