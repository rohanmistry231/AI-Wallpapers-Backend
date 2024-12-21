const express = require('express');
const router = express.Router();

// Import the image controller
const imageController = require('../controllers/imageController');

// Route for uploading image (POST)
router.post('/upload', imageController.uploadImage);

// Route for fetching all images (GET) with pagination
router.get('/', imageController.getAllImages);

// Route for searching images by tags or description (GET)
router.get('/search', imageController.searchImages);

// Route for getting image by ID (GET)
router.get('/:id', imageController.getImageById);

// Route for deleting image by ID (DELETE)
router.delete('/:id', imageController.deleteImage);

module.exports = router;
