const Image = require('../models/image'); // Import the Image model
const s3Service = require('../services/s3Service'); // Import the S3 service functions

// Image Upload Logic (For direct upload from S3 to MongoDB metadata)
exports.uploadImage = async (req, res) => {
  try {
    const { imageUrl, imageName, size, format, description, tags } = req.body; // Fetch metadata from request body

    // Ensure required fields are present
    if (!imageUrl || !imageName || !size || !format) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new image document
    const newImage = new Image({
      imageName: imageName, // Image name from the request
      imageUrl: imageUrl, // Image URL from S3
      size: size, // Image size in bytes
      format: format, // Image format (e.g., 'jpeg', 'png')
      description: description || '', // Optional description
      tags: tags || [], // Optional tags
    });

    await newImage.save(); // Save the image metadata to MongoDB

    res.status(201).json({
      message: 'Image uploaded and data saved successfully',
      image: newImage,
    });
  } catch (error) {
    console.error('Error in uploadImage:', error.message);
    res.status(500).json({ error: 'Failed to upload and save image data' });
  }
};

// Get Images with Pagination
exports.getAllImages = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const images = await Image.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const totalCount = await Image.countDocuments();

    res.status(200).json({
      images,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error('Error in getAllImages:', error.message);
    res.status(500).json({ error: 'Failed to retrieve images' });
  }
};

// Search Images by Tags or Description
exports.searchImages = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const images = await Image.find({
      $or: [
        { tags: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({
      images,
      count: images.length,
    });
  } catch (error) {
    console.error('Error in searchImages:', error.message);
    res.status(500).json({ error: 'Failed to search images' });
  }
};

// Get Image by ID
exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.status(200).json({ image });
  } catch (error) {
    console.error('Error in getImageById:', error.message);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
};

// Delete Image by ID
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Delete the image from S3
    const fileKey = image.imageUrl.split('/').pop(); // Extract file key from the URL
    await s3Service.deleteImageFromS3(fileKey);

    // Delete the image record from the database
    await Image.findByIdAndDelete(id);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error in deleteImage:', error.message);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
