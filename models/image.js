const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: [true, 'Image name is required'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  downloadUrl: {
    type: String,
    required: [true, 'Download URL is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);
