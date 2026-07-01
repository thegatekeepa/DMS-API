const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cName: process.env.CLOUDINARY_CLOUD_NAME,
    aKey: process.env.CLOUDINARY_API_KEY,
    aSecret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;