const mongoose = require("mongoose");
const User = require("../models/user.models");
const {DMSDELIVERY_STATUS, 
  ASSIGNMENT_STATUS} = require("../constants/deliveryStatus");

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
                }, message: "Number must contain exactly 11 digits."
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

    dispatcher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      default: null
    },

    assignmentStatus: {
      type: String,
      enum: Object.values(ASSIGNMENT_STATUS),
      default: ASSIGNMENT_STATUS.pending
    },

    assignmentExpiresAt: {
      type: Date, 
      default: null
    },

    deliveryStatus: {
      type: String,
      enum: Object.values(DMSDELIVERY_STATUS),
      default: DMSDELIVERY_STATUS.pending
    },
  },
  {
    timestamps: true,
  }
);
const delivery = mongoose.model("Delivery", deliverySchema);
module.exports = delivery;