const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const upload = require('../config/multer');

// POST route to handle form submission with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { fullName, phone, committee, membershipType } = req.body;
    
    // Create new form entry
    const newForm = new Form({
      fullName,
      phone,
      committee,
      membershipType,
      imageUrl: req.file ? req.file.path : null
    });

    // Save to database
    const savedForm = await newForm.save();
    
    res.status(201).json({
      success: true,
      data: savedForm
    });
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving form data'
    });
  }
});

// GET route to fetch all form entries with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Get total count
    const total = await Form.countDocuments();
    
    // Get paginated results
    const forms = await Form.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    
    res.status(200).json({
      success: true,
      data: forms,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching form data'
    });
  }
});

// GET route to export all form entries as CSV
router.get('/export', async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    
    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="enactus_form_data_${new Date().toISOString().slice(0, 10)}.csv"`);
    
    // Create CSV header
    const csvHeader = 'ID,Full Name,Phone,Committee,Membership Type,Created At,Payment Image URL\n';
    res.write(csvHeader);
    
    // Add data rows
    forms.forEach(form => {
      const row = [
        form._id,
        `"${form.fullName}"`,
        form.phone,
        `"${form.committee}"`,
        form.membershipType === 'new' ? 'New Member' : 'Old Member',
        new Date(form.createdAt).toISOString().slice(0, 10),
        form.imageUrl || 'No image'
      ].join(',') + '\n';
      res.write(row);
    });
    
    res.end();
  } catch (error) {
    console.error('Error exporting forms:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while exporting form data'
    });
  }
});

// GET route to fetch a single form entry by ID
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found'
      });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching form data'
    });
  }
});

module.exports = router;