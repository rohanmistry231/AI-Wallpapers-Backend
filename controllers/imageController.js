const Image = require('../models/image'); // Import the Image model

// Create a new image entry
exports.createImage = async (req, res) => {
  try {
    const { imageName, imageUrl, description, tags, size, format, category, resolution } = req.body;

    const newImage = new Image({
      imageName,
      imageUrl,
      description,
      tags,
      size,
      format,
      category,
      resolution,
    });

    const savedImage = await newImage.save();
    res.status(201).json({
      message: 'Image created successfully',
      data: savedImage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating image', error: error.message });
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

    // Check if the provided ID is a valid ObjectId
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

// Search images by name or tags
exports.searchImages = async (req, res) => {
  try {
    const { query } = req.query;

    const images = await Image.find({
      $or: [
        { imageName: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
      ],
    });

    if (!images.length) {
      return res.status(404).json({ message: `No images found for search query: ${query}` });
    }

    res.status(200).json({
      message: 'Search results fetched successfully',
      data: images,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error searching images', error: error.message });
  }
};

// Paginate images
exports.paginateImages = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const images = await Image.find().skip(skip).limit(Number(limit));
    const total = await Image.countDocuments();

    res.status(200).json({
      message: 'Images paginated successfully',
      data: images,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error paginating images', error: error.message });
  }
};