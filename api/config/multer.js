const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Debug: Log Cloudinary config
console.log('Cloudinary Config in Multer:', cloudinary.config());

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'enactus_forms',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif']
  }
});

const parser = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = parser;