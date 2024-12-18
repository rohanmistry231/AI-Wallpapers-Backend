// models/wallpaperModel.js

const mongoose = require('mongoose');

// Define Wallpaper Schema
const wallpaperSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    tags: { type: [String], default: [] }, // New field for tags
    createdAt: { type: Date, default: Date.now },
});

// Export the Wallpaper Model
const Wallpaper = mongoose.model('Wallpaper', wallpaperSchema);

module.exports = Wallpaper;
