const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'enactus_forms',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif']
  }
});

const parser = multer({ storage: storage });

module.exports = parser;