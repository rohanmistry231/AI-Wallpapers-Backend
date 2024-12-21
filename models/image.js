const mongoose = require('mongoose');

// Define the schema for storing image metadata
const imageSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
      required: true, // Make sure the image name is required
    },
    imageUrl: {
      type: String,
      required: true, // Make sure the image URL is required
    },
    uploadedAt: {
      type: Date,
      default: Date.now, // Automatically set the upload date
    },
    description: {
      type: String,
      default: '', // Optional field for image description
    },
    tags: {
      type: [String], // Optional array of tags
      default: [], // Default to an empty array
    },
    size: {
      type: Number, // Size in bytes
      required: true, // Make sure size is required
    },
    format: {
      type: String,
      required: true, // Ensure format is provided (e.g., 'jpg', 'png', etc.)
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the model from the schema
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
