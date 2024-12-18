// controllers/wallpaperController.js

const Wallpaper = require("../models/Wallpapers");

// Get All Wallpapers
const getAllWallpapers = async (req, res) => {
  try {
    const wallpapers = await Wallpaper.find();
    res.status(200).json(wallpapers);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Add a New Wallpaper
const addWallpaper = async (req, res) => {
  try {
    const { title, category, imageUrl, tags } = req.body; // Include tags from request
    const newWallpaper = new Wallpaper({ title, category, imageUrl, tags });
    await newWallpaper.save();
    res.status(201).json(newWallpaper);
  } catch (err) {
    res.status(500).json({ message: "Error adding wallpaper", error: err.message });
  }
};

// Get Wallpapers by Category
const getWallpapersByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const wallpapers = await Wallpaper.find({ category });
    res.status(200).json(wallpapers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching category", error: err.message });
  }
};

// Fetch All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Wallpaper.distinct("category");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err.message });
  }
};

// Delete a Wallpaper by ID
const deleteWallpaper = async (req, res) => {
  try {
    const { id } = req.params;
    await Wallpaper.findByIdAndDelete(id);
    res.status(200).json({ message: "Wallpaper deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting wallpaper", error: err.message });
  }
};

// Get Wallpapers by Tag
const getWallpapersByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const wallpapers = await Wallpaper.find({ tags: tag }); // Find wallpapers containing the tag
    res.status(200).json(wallpapers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching wallpapers by tag", error: err.message });
  }
};

// Update a Wallpaper by ID
const updateWallpaper = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, imageUrl, tags } = req.body; // Fields to update

    // Find and update the wallpaper
    const updatedWallpaper = await Wallpaper.findByIdAndUpdate(
      id,
      { title, category, imageUrl, tags }, // Fields to update
      { new: true, runValidators: true } // Return updated document and run validations
    );

    if (!updatedWallpaper) {
      return res.status(404).json({ message: "Wallpaper not found" });
    }

    res.status(200).json(updatedWallpaper);
  } catch (err) {
    res.status(500).json({ message: "Error updating wallpaper", error: err.message });
  }
};

module.exports = {
  getAllWallpapers,
  addWallpaper,
  getWallpapersByCategory,
  getAllCategories, // Export the new controller
  deleteWallpaper,
  getWallpapersByTag,
  updateWallpaper,
};
