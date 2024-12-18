// routes/wallpaperRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllWallpapers,
    addWallpaper,
    getWallpapersByCategory,
    deleteWallpaper,
    getWallpapersByTag,
    updateWallpaper,
    getAllCategories
} = require('../controllers/wallpaperController');

// Add new route for fetching categories
router.get("/categories", getAllCategories);

// Get all wallpapers
router.get('/', getAllWallpapers);

// Get wallpapers by tag
router.get('/tags/:tag', getWallpapersByTag);

// Add a new wallpaper
router.post('/', addWallpaper);

// Update a wallpaper by ID
router.put('/:id', updateWallpaper);

// Get wallpapers by category
router.get('/category/:category', getWallpapersByCategory);

// Delete a wallpaper by ID
router.delete('/:id', deleteWallpaper);

module.exports = router;
