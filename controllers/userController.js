const User = require('../models/user'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, "SECRET", { expiresIn: '1h' }); // Use consistent secret key
};

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'This email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'User registered successfully.',
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Failed to register user. Please try again later.' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'User logged in successfully.',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'Failed to log in. Please try again later.' });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    res.status(200).json(req.user); // req.user is set by `protect`
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ error: 'This email is already in use by another account.' });
    }

    req.user.name = name;
    req.user.email = email;

    const updatedUser = await req.user.save();

    res.status(200).json({
      message: 'Profile updated successfully.',
      user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email },
    });
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(500).json({ error: 'Failed to update profile.' });
  }
};

// Delete user account
exports.deleteUserAccount = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found. Unable to delete account.' });
      }
  
      res.status(200).json({ message: 'Account deleted successfully.' });
    } catch (err) {
      console.error('Error deleting user account:', err);
      res.status(500).json({ error: 'Failed to delete account.' });
    }
  };
  