// Import required dependencies and modules
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require("helmet"); // Import Helmet
const mongoose = require('mongoose');
const path = require('path');

// Import the routes
const imageRoutes = require('./routes/imageRoutes');
const userRoutes = require('./routes/userRoutes');


// Create an instance of Express app
const app = express();

// Configure Helmet to allow Vercel live script
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'", "https://vercel.live"],
        "connect-src": ["'self'", "https://vercel.live"],
      },
    },
  })
);

// Middleware
// CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

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
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});