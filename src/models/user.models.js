const mongoose = require("mongoose");
const DMSROLES = require("../constants");

const userSchema = new mongoose.Schema (
    {
        firstName: {
            type: String,
            required: true, 
            trim: true
        }, 

        lastName: {
            type: String,
            required: true, 
            trim: true
        },

        email: {
            type: String,
            required: true, 
            lowercase: true, 
            trim: true
        }, 

        password: {
            type: String,
            required: true, 
            validate: {
                validator: function (value) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{9,}$/.test(value);
                }, message: 
                "Password must be at least 9 characters long and include uppercase, lowercase, and a special character."
            }, 
            select: false
        }, 
        
        phone: {
            type: String, 
            required: true, 
            validate: {
                validator: function (value) {
                    return /^\d{11}$/.test(value);
                }, message: "Please enter 11 digits number to continue."
            }, 
            trim: true
        },

        role: {
            type: String,
            enum: Object.values(DMSROLES),
            required: true
        }, 

        dispatcher: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            default: null
        },

        isActive: {
            type: Boolean,
            default: true
        }, 
}, 
{
    timestamps: true
}
);

const user = mongoose.model("Users", userSchema);
module.exports = user;