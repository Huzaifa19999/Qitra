import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(input: File | string): Promise<{ secure_url?: string; error?: string }> {
  try {
    if (typeof input === 'string') {
      const result = await cloudinary.uploader.upload(input, { folder: 'perfume-store' });
      return { secure_url: result.secure_url };
    }

    const arrayBuffer = await input.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve) => {
      cloudinary.uploader.upload_stream(
        { folder: 'perfume-store' },
        (error, result) => {
          if (error || !result) {
            console.error('Cloudinary upload error:', error);
            resolve({ error: error?.message || 'Failed to upload image' });
          } else {
            resolve({ secure_url: result.secure_url });
          }
        }
      ).end(buffer);
    });
  } catch (error) {
    console.error('Error processing file for upload:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export default cloudinary;
