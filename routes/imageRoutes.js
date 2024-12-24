// Import necessary modules
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Routes

// Create a new image
router.post('/', imageController.createImage);

// Get all images
router.get('/', imageController.getAllImages);

// Get image by ID
router.get('/:id', imageController.getImageById);

// Update an image by ID
router.put('/:id', imageController.updateImageById);

// Delete an image by ID
router.delete('/:id', imageController.deleteImageById);

// Fetch images by category
router.get('/category/:category', imageController.getImagesByCategory);

// Paginate images
router.get('/paginate', imageController.paginateImages);

module.exports = router;