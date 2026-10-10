const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');
const { uploadOnCloudinary } = require('../utils/cloudinary');

// @route   GET /api/blogs
// @desc    Get all blogs (published only for public)
router.get('/', async (req, res) => {
  try {
    const { all } = req.query;
    let filter = all === 'true' ? {} : { isPublished: true };

    // If fetching for admin dashboard, apply RBAC filtering
    if (all === 'true' && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
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

    // Exclude heavy 'content' field in list view to drastically reduce response payload and speed up loading
    const blogs = await Blog.find(filter)
      .select('-content')
      .sort({ createdAt: -1 })
      .lean();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blogs/:idOrSlug
// @desc    Get single blog by ID or Slug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const param = req.params.idOrSlug;
    let blog;
    
    // Check if it's a valid MongoDB ObjectId
    if (param.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(param);
    }
    
    // If not found by ID or not a valid ID, try finding by slug
    if (!blog) {
      blog = await Blog.findOne({ slug: param });
    }

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog
router.post('/', protect, upload.single('coverImageFile'), async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, author, isPublished, coverImageUrl, metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots } = req.body;
    
    let coverImage = '';
    
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (uploadResult) {
        coverImage = uploadResult.url;
      }
    } else if (coverImageUrl) {
      coverImage = coverImageUrl;
    }

    const newBlog = new Blog({
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      excerpt: excerpt || '',
      content,
      coverImage,
      category: category || 'General',
      author: author || 'S-Vastu Solution',
      isPublished: isPublished === 'false' ? false : true,
      metaTitle: metaTitle || '',
      metaDescription: metaDescription || '',
      metaKeywords: metaKeywords || '',
      metaCanonical: metaCanonical || '',
      metaRobots: metaRobots || 'index, follow',
      createdBy: req.admin._id
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update a blog
router.put('/:id', protect, upload.single('coverImageFile'), async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, author, isPublished, coverImageUrl, metaTitle, metaDescription, metaKeywords, metaCanonical, metaRobots } = req.body;
    
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      // Check ownership
      if (req.admin.role === 'subadmin' && blog.createdBy && blog.createdBy.toString() !== req.admin._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to edit this blog' });
      }

      if (title) blog.title = title;
      if (slug) blog.slug = slug;
      if (excerpt !== undefined) blog.excerpt = excerpt;
      if (content) blog.content = content;
      if (category) blog.category = category;
      if (author) blog.author = author;
      if (isPublished !== undefined) blog.isPublished = isPublished === 'false' ? false : true;
      if (metaTitle !== undefined) blog.metaTitle = metaTitle;
      if (metaDescription !== undefined) blog.metaDescription = metaDescription;
      if (metaKeywords !== undefined) blog.metaKeywords = metaKeywords;
      if (metaCanonical !== undefined) blog.metaCanonical = metaCanonical;
      if (metaRobots !== undefined) blog.metaRobots = metaRobots;

      if (req.file) {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        if (uploadResult) {
          blog.coverImage = uploadResult.url;
        }
      } else if (coverImageUrl !== undefined) {
        blog.coverImage = coverImageUrl;
      }

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      // Check ownership
      if (req.admin.role === 'subadmin' && blog.createdBy && blog.createdBy.toString() !== req.admin._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this blog' });
      }

      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
