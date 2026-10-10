const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "svastu" // save in svastu folder
        });
        
        // file has been uploaded successfully
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return response;

    } catch (error) {
        console.error("Cloudinary upload failed", error);
        // remove the locally saved temporary file as the upload operation got failed
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
}

module.exports = { uploadOnCloudinary };
