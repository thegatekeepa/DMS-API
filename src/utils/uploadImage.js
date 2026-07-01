//cloudinary receives image upload after passing through multer and express
const cloudinary = require("../configs/cloudinary");

const uploadImage = async (filePath) => {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: "27Go_DMS",
    });

    return {
        imageUrl: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id,
    };
};

module.exports = uploadImage;