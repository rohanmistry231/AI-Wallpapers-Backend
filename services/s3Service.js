// Importing AWS SDK v3 modules
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Create an instance of the S3Client
const s3 = new S3Client({
  region: process.env.AWS_REGION, // Your region here
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload an image to AWS S3
const uploadImageToS3 = async (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: Date.now().toString() + '-' + file.originalname, // Unique filename using timestamp
    Body: file.buffer, // File buffer for upload
    ContentType: file.mimetype, // Content type of the file
    ACL: 'public-read', // Set public read permissions for the file
  };

  try {
    const command = new PutObjectCommand(params);
    const result = await s3.send(command); // Using send to execute the command
    return { Location: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}` }; // Return S3 URL
  } catch (error) {
    throw new Error(`Failed to upload image to S3: ${error.message}`);
  }
};

// Function to get the URL of a file from S3 (public-read)
const getImageUrlFromS3 = async (fileKey) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
  };

  try {
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // Generate a signed URL with an expiration of 1 hour
    return url;
  } catch (error) {
    throw new Error(`Failed to get image URL from S3: ${error.message}`);
  }
};

// Function to delete an image from S3
const deleteImageFromS3 = async (fileKey) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3.send(command); // Using send to execute the command
    return { message: 'Image deleted successfully' };
  } catch (error) {
    throw new Error(`Failed to delete image from S3: ${error.message}`);
  }
};

module.exports = {
  uploadImageToS3,
  getImageUrlFromS3,
  deleteImageFromS3,
};
