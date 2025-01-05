const mongoose = require('mongoose');
const Image = require('../models/image'); // Import the Image model

exports.createImage = async (req, res) => {
  try {
    const images = req.body; // Expecting an array of images

    // Check if the input is an array
    if (!Array.isArray(images)) {
      return res.status(400).json({
        message: 'Input should be an array of image objects',
      });
    }

    // Validate each image in the array
    for (const image of images) {
      const { imageName, imageUrl, downloadUrl, category } = image;

      if (!imageName || !imageUrl || !downloadUrl || !category) {
        return res.status(400).json({
          message: 'All fields are required: imageName, imageUrl, downloadUrl, and category',
          errorData: image,
        });
      }
    }

    // Save all images to the database
    const savedImages = await Image.insertMany(images);
    res.status(201).json({
      message: 'Images created successfully',
      data: savedImages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating images', error: error.message });
  }
};

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({
      message: 'Images fetched successfully',
      data: images,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error: error.message });
  }
};

// Get a single image by ID
exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid image ID' });
    }

    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json({
      message: 'Image fetched successfully',
      data: image,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching image by ID', error: error.message });
  }
};

// Update an image by ID
exports.updateImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedImage = await Image.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json({
      message: 'Image updated successfully',
      data: updatedImage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating image', error: error.message });
  }
};

// Delete an image by ID
exports.deleteImageById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedImage = await Image.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json({
      message: 'Image deleted successfully',
      data: deletedImage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
};

// Fetch images by category
exports.getImagesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const images = await Image.find({ category });

    if (!images.length) {
      return res.status(404).json({ message: `No images found in category: ${category}` });
    }

    res.status(200).json({
      message: `Images fetched successfully for category: ${category}`,
      data: images,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images by category', error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    // Fetch all images
    const images = await Image.find({}, 'category'); // Fetch only category field

    // Handle case where no images are found
    if (!images.length) {
      return res.status(404).json({ message: 'No categories found' });
    }

    // Extract distinct categories manually
    const categories = [...new Set(images.map((image) => image.category).filter(Boolean))];

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories',
      error: error.message,
    });
  }
};

// Get image count by category
exports.getImageCountByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const count = await Image.countDocuments({ category });

    res.status(200).json({
      success: true,
      category,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching image count by category",
      error: error.message,
    });
  }
};
