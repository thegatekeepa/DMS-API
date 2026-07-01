//for creating auth token during registration
const jwt = require("jsonwebtoken");
const User = require("../models/user.models"); 

const generateAuthToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const register = async (userData) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    role,
    password,
  } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ 
    email: email.toLowerCase() 
});

  if (existingUser) {
    throw new Error("User already exists.");
  }

  // Create user
  const user = new User({
    firstName,
    lastName,
    email,
    phone,
    role,
    password,
  });

  await user.save();

  // Generate JWT
  const token = generateAuthToken(user);

  // Remove password from response
  const userObject = user.toObject();
  delete userObject.password;

  return {
    user: userObject
  };
};

//login user
const login = async ({ email, password }) => {
  // Find user (include password)
  const existingUser = await User.findOne({ 
    email: email.toLowerCase()
}).select("+password");

  if (!existingUser) {
    throw new Error("Invalid email or password.");
  }

  // Compare password
  const isMatch = await existingUser.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password.");
  }

  // Generate JWT
  const token = generateAuthToken(existingUser);

  // Remove password from response
  const userObject = existingUser.toObject();
  delete userObject.password;

  return {
    existingUser: userObject,
    token,
  };
};

module.exports = {
  register,
  login,
};