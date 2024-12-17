// Backend for Wallpapers Website - Node.js + Express
// Project: Free Wallpaper Posting Site
// Entry Point: server.js / index.js

// 1. Import Required Modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const wallpaperRoutes = require('./routes/wallpaperRoutes');

// 2. Initialize Express App
const app = express();
const PORT = 5000;

// 3. Middlewares
app.use(cors()); // Allow Cross-Origin Requests
app.use(bodyParser.json()); // Parse JSON Payloads

// 4. Connect to MongoDB Database
const DB_URI = 'mongodb://127.0.0.1:27017/wallpapersDB'; // Local MongoDB (Replace with Atlas if needed)
mongoose.connect(DB_URI).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// 5. Use Routes
app.use('/wallpapers', wallpaperRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Wallpaper API!');
});

// 6. Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});