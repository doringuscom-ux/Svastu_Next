const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect } = require('../middlewares/auth');

// @desc    Submit a new contact form
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, state, problem, date, time } = req.body;
    
    if (!name || !email || !phone || !problem) {
      return res.status(400).json({ message: 'Name, email, phone, and problem are required' });
    }

    const newContact = new Contact({
      name, email, phone, state, problem, date, time
    });

    const savedContact = await newContact.save();
    
    // --- SEND EMAIL VIA GOOGLE APPS SCRIPT ---
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (scriptUrl && adminEmail) {
      try {
        const htmlMessage = `
          <h2>New Consultation Request</h2>
          <table border="1" cellpadding="8" style="border-collapse: collapse;">
            <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
            <tr><td><strong>State:</strong></td><td>${state || 'N/A'}</td></tr>
            <tr><td><strong>Problem:</strong></td><td>${problem}</td></tr>
            <tr><td><strong>Date:</strong></td><td>${date || 'N/A'}</td></tr>
            <tr><td><strong>Time:</strong></td><td>${time || 'N/A'}</td></tr>
          </table>
        `;

        // Send POST request to Google Script
        // Using fetch to pass URL encoded form data
        const formData = new URLSearchParams();
        formData.append('to', adminEmail);
        formData.append('subject', 'New Contact Form Submission - S Vastu');
        formData.append('message', htmlMessage);

        await fetch(scriptUrl, {
          method: 'POST',
          body: formData,
        });
        console.log('Admin notification sent successfully via Google Apps Script');
      } catch (scriptErr) {
        console.error('Failed to send notification via Google Script:', scriptErr);
      }
    }
    // -----------------------------------------

    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.status = status || contact.status;
    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete a contact submission
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    await contact.deleteOne();
    res.json({ message: 'Contact removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
