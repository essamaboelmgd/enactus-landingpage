const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  committee: {
    type: String,
    required: true
  },
  membershipType: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Form', formSchema);