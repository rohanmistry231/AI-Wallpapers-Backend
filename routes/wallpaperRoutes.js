// routes/wallpaperRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllWallpapers,
    addWallpaper,
    getWallpapersByCategory,
    deleteWallpaper,
} = require('../controllers/wallpaperController');

// Get all wallpapers
router.get('/', getAllWallpapers);

// Add a new wallpaper
router.post('/', addWallpaper);

// Get wallpapers by category
router.get('/category/:category', getWallpapersByCategory);

// Delete a wallpaper by ID
router.delete('/:id', deleteWallpaper);

module.exports = router;
