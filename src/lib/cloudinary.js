import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadBufferToCloudinary(buffer, folder = 'svastu') {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload stream error:', error);
          return reject(new Error(`Image upload failed: ${error.message || 'Cloudinary error'}`));
        }
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}

export default cloudinary;
