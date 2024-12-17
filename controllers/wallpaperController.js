// controllers/wallpaperController.js

const Wallpaper = require('../models/Wallpapers');

// Get All Wallpapers
const getAllWallpapers = async (req, res) => {
    try {
        const wallpapers = await Wallpaper.find();
        res.status(200).json(wallpapers);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Add a New Wallpaper
const addWallpaper = async (req, res) => {
    try {
        const { title, category, imageUrl } = req.body;
        const newWallpaper = new Wallpaper({ title, category, imageUrl });
        await newWallpaper.save();
        res.status(201).json(newWallpaper);
    } catch (err) {
        res.status(500).json({ message: 'Error adding wallpaper', error: err.message });
    }
};

// Get Wallpapers by Category
const getWallpapersByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const wallpapers = await Wallpaper.find({ category });
        res.status(200).json(wallpapers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching category', error: err.message });
    }
};

// Delete a Wallpaper by ID
const deleteWallpaper = async (req, res) => {
    try {
        const { id } = req.params;
        await Wallpaper.findByIdAndDelete(id);
        res.status(200).json({ message: 'Wallpaper deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting wallpaper', error: err.message });
    }
};

module.exports = {
    getAllWallpapers,
    addWallpaper,
    getWallpapersByCategory,
    deleteWallpaper,
};
