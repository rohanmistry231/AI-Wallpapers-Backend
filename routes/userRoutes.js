const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Protect routes

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.delete('/profile', protect, deleteUserAccount);

module.exports = router;
