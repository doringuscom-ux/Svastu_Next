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

// Uploads the file in `formData[field]` (if one was chosen) and returns its URL, else null.
export async function uploadFormImage(formData, field, folder) {
  const file = formData.get(field);
  if (!file || typeof file === 'string' || file.size === 0) {
    return null;
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await uploadBufferToCloudinary(buffer, folder);
  return result.secure_url || result.url;
}

export default cloudinary;
