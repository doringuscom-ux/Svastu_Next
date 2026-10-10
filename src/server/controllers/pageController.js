const Page = require('../models/Page');
const { uploadOnCloudinary } = require('../utils/cloudinary');

// Get all pages
const getPages = async (req, res) => {
  try {
    let filter = {};
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      const jwt = require('jsonwebtoken');
      const Admin = require('../models/Admin');
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminUser = await Admin.findById(decoded.id);
        if (adminUser && adminUser.role === 'subadmin') {
          filter.createdBy = adminUser._id;
        }
      } catch (err) {
        // Token invalid, ignore or handle
      }
    }
    const pages = await Page.find(filter).sort({ createdAt: -1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get page by slug
const getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (page) {
      res.json(page);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new page
const createPage = async (req, res) => {
  try {
    const { title, slug, country, metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots, customText } = req.body;
    
    // Parse section JSON strings
    let section1 = req.body.section1 ? JSON.parse(req.body.section1) : { heading: '', text: '', image: '' };
    let section2 = req.body.section2 ? JSON.parse(req.body.section2) : { heading: '', text: '', image: '' };
    let section3 = req.body.section3 ? JSON.parse(req.body.section3) : { heading: '', text: '', image: '' };
    let section4 = req.body.section4 ? JSON.parse(req.body.section4) : { heading: '', text: '', image: '' };
    let section5 = req.body.section5 ? JSON.parse(req.body.section5) : { heading: '', text: '', image: '' };
    let section6 = req.body.section6 ? JSON.parse(req.body.section6) : { heading: '', text: '', image: '' };

    // Handle image uploads
    if (req.files) {
      if (req.files['section1Image'] && req.files['section1Image'][0]) {
        const uploadRes = await uploadOnCloudinary(req.files['section1Image'][0].path);
        if (uploadRes) section1.image = uploadRes.url;
      }
      if (req.files['section2Image'] && req.files['section2Image'][0]) {
        const uploadRes = await uploadOnCloudinary(req.files['section2Image'][0].path);
        if (uploadRes) section2.image = uploadRes.url;
      }
      if (req.files['section3Image'] && req.files['section3Image'][0]) {
        const uploadRes = await uploadOnCloudinary(req.files['section3Image'][0].path);
        if (uploadRes) section3.image = uploadRes.url;
      }
      if (req.files['section4Image'] && req.files['section4Image'][0]) {
        const uploadRes = await uploadOnCloudinary(req.files['section4Image'][0].path);
        if (uploadRes) section4.image = uploadRes.url;
      }
      if (req.files['section5Image'] && req.files['section5Image'][0]) {
        const uploadRes = await uploadOnCloudinary(req.files['section5Image'][0].path);
        if (uploadRes) section5.image = uploadRes.url;
      }
      if (req.files['section6Image'] && req.files['section6Image'][0]) {
        const uploadRes = await uploadOnCloudinary(req.files['section6Image'][0].path);
        if (uploadRes) section6.image = uploadRes.url;
      }
    }

    const pageExists = await Page.findOne({ slug });
    if (pageExists) {
      return res.status(400).json({ message: 'Page with this slug already exists' });
    }

    const page = new Page({
      title, slug, country, metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots, customText,
      section1, section2, section3, section4, section5, section6,
      createdBy: req.admin._id
    });

    const createdPage = await page.save();
    res.status(201).json(createdPage);
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a page
const updatePage = async (req, res) => {
  try {
    const { title, slug, country, metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots, customText } = req.body;
    const page = await Page.findById(req.params.id);

    if (page) {
      // Check ownership
      if (req.admin.role === 'subadmin' && page.createdBy && page.createdBy.toString() !== req.admin._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to edit this page' });
      }

      // Parse section JSON strings
      let section1 = req.body.section1 ? JSON.parse(req.body.section1) : page.section1;
      let section2 = req.body.section2 ? JSON.parse(req.body.section2) : page.section2;
      let section3 = req.body.section3 ? JSON.parse(req.body.section3) : page.section3;
      let section4 = req.body.section4 ? JSON.parse(req.body.section4) : page.section4;
      let section5 = req.body.section5 ? JSON.parse(req.body.section5) : page.section5;
      let section6 = req.body.section6 ? JSON.parse(req.body.section6) : page.section6;

      // Handle image uploads
      if (req.files) {
        if (req.files['section1Image'] && req.files['section1Image'][0]) {
          const uploadRes = await uploadOnCloudinary(req.files['section1Image'][0].path);
          if (uploadRes) section1.image = uploadRes.url;
        }
        if (req.files['section2Image'] && req.files['section2Image'][0]) {
          const uploadRes = await uploadOnCloudinary(req.files['section2Image'][0].path);
          if (uploadRes) section2.image = uploadRes.url;
        }
        if (req.files['section3Image'] && req.files['section3Image'][0]) {
          const uploadRes = await uploadOnCloudinary(req.files['section3Image'][0].path);
          if (uploadRes) section3.image = uploadRes.url;
        }
        if (req.files['section4Image'] && req.files['section4Image'][0]) {
          const uploadRes = await uploadOnCloudinary(req.files['section4Image'][0].path);
          if (uploadRes) section4.image = uploadRes.url;
        }
        if (req.files['section5Image'] && req.files['section5Image'][0]) {
          const uploadRes = await uploadOnCloudinary(req.files['section5Image'][0].path);
          if (uploadRes) section5.image = uploadRes.url;
        }
        if (req.files['section6Image'] && req.files['section6Image'][0]) {
          const uploadRes = await uploadOnCloudinary(req.files['section6Image'][0].path);
          if (uploadRes) section6.image = uploadRes.url;
        }
      }
      
      page.title = title || page.title;
      page.slug = slug || page.slug;
      page.country = country !== undefined ? country : page.country;
      page.metaTitle = metaTitle !== undefined ? metaTitle : page.metaTitle;
      page.metaDescription = metaDescription !== undefined ? metaDescription : page.metaDescription;
      page.metaKeywords = metaKeywords !== undefined ? metaKeywords : page.metaKeywords;
      page.metaCanonical = metaCanonical !== undefined ? metaCanonical : page.metaCanonical;
      page.metaRobots = metaRobots !== undefined ? metaRobots : page.metaRobots;
      page.customText = customText !== undefined ? customText : page.customText;
      page.section1 = section1;
      page.section2 = section2;
      page.section3 = section3;
      page.section4 = section4;
      page.section5 = section5;
      page.section6 = section6;

      const updatedPage = await page.save();
      res.json(updatedPage);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a page
const deletePage = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (page) {
      // Check ownership
      if (req.admin.role === 'subadmin' && page.createdBy && page.createdBy.toString() !== req.admin._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this page' });
      }
      
      await page.deleteOne();
      res.json({ message: 'Page removed' });
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getPages, getPageBySlug, createPage, updatePage, deletePage };
