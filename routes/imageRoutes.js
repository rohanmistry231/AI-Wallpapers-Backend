// Import necessary modules
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Routes

// Create a new image
router.post('/', imageController.createImage);

// Get all images
router.get('/', imageController.getAllImages);

// Update an image by ID
router.put('/:id', imageController.updateImageById);

// Delete an image by ID
router.delete('/:id', imageController.deleteImageById);

// Fetch images by category
router.get('/category/:category', imageController.getImagesByCategory);

// Get image by ID
router.get('/:id', imageController.getImageById);

// Search images by name or tags
router.get('/search', imageController.searchImages);

// Paginate images
router.get('/paginate', imageController.paginateImages);

module.exports = router;