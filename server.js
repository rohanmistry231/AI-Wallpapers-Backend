// Import required dependencies and modules
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer'); // Import multer for file uploads

// Import the routes
const imageRoutes = require('./routes/imageRoutes');
const userRoutes = require('./routes/userRoutes');

// Create an instance of Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Add timestamp to filename
  }
});

// File filter to allow only certain types of files (optional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Accept jpeg and png
  } else {
    cb(new Error('Only jpeg and png files are allowed'), false); // Reject others
  }
};

// Set up multer upload middleware with file size limit (optional)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
}).single('file'); // 'file' is the key in the form-data for the file

// Serve static files for images
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection (for storing image and user data)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the application on database connection error
  });

// Routes
app.use('/images', imageRoutes); // Routes for image-related operations
app.use('/users', userRoutes); // Routes for user-related operations

// Image Upload Route
app.post('/upload', upload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, size, mimetype, path: imageUrl } = req.file;

  // Assuming the Image model is defined to store image details
  const newImage = new Image({
    imageName: originalname,
    imageUrl: imageUrl,
    size: size,
    format: mimetype.split('/')[1], // Extract file format (e.g., jpg, png)
  });

  newImage.save()
    .then(() => {
      res.status(201).json({
        message: 'Image uploaded and data saved successfully',
        image: newImage,
      });
    })
    .catch((error) => {
      console.error('Error saving image:', error);
      res.status(500).json({ error: 'Failed to save image data' });
    });
});

// Default route for API
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Wallpaper API!',
    endpoints: {
      images: '/images',
      users: '/users',
    },
  });
});

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'An internal server error occurred' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
