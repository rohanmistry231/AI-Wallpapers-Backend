const mongoose = require('mongoose');

// Define the schema for storing image metadata
const imageSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
      required: true, // Ensure the image name is required
    },
    imageUrl: {
      type: String,
      required: true, // Ensure the image URL is required
      match: /^https?:\/\/.+/, // Validate URL format
    },
    uploadedAt: {
      type: Date,
      default: Date.now, // Automatically set the upload date
    },
    description: {
      type: String,
      default: '', // Optional field for image description
      maxlength: 500, // Limit description length
    },
    tags: {
      type: [String], // Array of tags for searching and filtering
      default: [], // Default to an empty array
      index: true, // Create an index for efficient search
    },
    size: {
      type: Number, // Size in bytes
      required: true, // Ensure size is required
    },
    format: {
      type: String,
      required: true, // Ensure format is provided (e.g., 'jpg', 'png', etc.)
    },
    category: {
      type: String,
      required: true, // Each wallpaper belongs to a category (e.g., Nature, Cars, Abstract)
      index: true, // Index for efficient search
    },
    resolution: {
      width: { type: Number, required: true }, // Width in pixels
      height: { type: Number, required: true }, // Height in pixels
    },
    isFeatured: {
      type: Boolean,
      default: false, // Mark wallpapers as featured for highlighting
    },
    downloads: {
      type: Number,
      default: 0, // Track how many times a wallpaper has been downloaded
    },
    views: {
      type: Number,
      default: 0, // Track how many times a wallpaper has been viewed
    },
    likes: {
      type: Number,
      default: 0, // Track the number of likes for each wallpaper
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Add text indexes for name, description, and tags for full-text search
imageSchema.index({ imageName: 'text', description: 'text', tags: 'text' });

// Create the model from the schema
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
