//for multer config, to be passed down through express to cloudinary
const multer = require("multer");
const storage = multer.diskStorage({});

const toMulter = multer({
    storage,
});

module.exports = toMulter;