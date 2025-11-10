// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const formRoutes = require('./routes/formRoutes');
const User = require('./models/User');

// Initialize express app
const app = express();

// Get allowed origins from environment variable or use defaults
const allowedOrigins = process.env.FRONTEND_URL ? 
  process.env.FRONTEND_URL.split(',').map(url => url.trim()) : 
  ['http://localhost:8080', 'http://localhost:8081'];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum file size is 5MB.'
      });
    }
  }
  res.status(500).json({
    success: false,
    message: 'An error occurred during file upload',
    error: err.message
  });
});

// Routes
app.use('/api/form', formRoutes);

// Add auth route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Create default admin user if it doesn't exist
    createDefaultAdmin();
  })
  .catch((error) => console.error('MongoDB connection error:', error));

// Function to create default admin user
async function createDefaultAdmin() {
  try {
    const existingUser = await User.findOne({ username: 'enactus' });
    if (!existingUser) {
      const adminUser = new User({
        username: 'enactus',
        password: 'enactus2030#'
      });
      await adminUser.save();
      console.log('Default admin user created:');
      console.log('Username: enactus');
      console.log('Password: enactus2030#');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});