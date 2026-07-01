const mongoose = require("mongoose");
const DMSROLES = require("../constants/roles");
const Bcrypt = require("bcrypt");

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

        isAvailable: {
            type: Boolean,
            default: true
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

//hash password before saving
userSchema.pre(
  "save", async function () {
  if (!this.isModified('password')) return; // Only hash if password is new/changed

  const salt = await Bcrypt.genSalt(10); // Generate salt
  this.password = await Bcrypt.hash(this.password, salt); // Hash password
  }
);

//compare entered password with stored hash
userSchema.methods.comparePassword = async function (inputPassword) {
  return Bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;