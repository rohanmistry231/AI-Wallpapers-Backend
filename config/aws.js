const AWS = require('aws-sdk');

// Load environment variables from .env file
require('dotenv').config();

// Set AWS credentials and region from environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,  // e.g., 'us-west-2'
});

// Create S3 instance with configured credentials
const s3 = new AWS.S3();

module.exports = s3;
