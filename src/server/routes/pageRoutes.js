const express = require('express');
const router = express.Router();
const { getPages, getPageBySlug, createPage, updatePage, deletePage } = require('../controllers/pageController');
const { protect } = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');

const cpUpload = upload.fields([
  { name: 'section1Image', maxCount: 1 },
  { name: 'section2Image', maxCount: 1 },
  { name: 'section3Image', maxCount: 1 },
  { name: 'section4Image', maxCount: 1 },
  { name: 'section5Image', maxCount: 1 },
  { name: 'section6Image', maxCount: 1 }
]);

router.route('/')
  .get(getPages)
  .post(protect, cpUpload, createPage);

router.route('/:slug')
  .get(getPageBySlug);

router.route('/:id')
  .put(protect, cpUpload, updatePage)
  .delete(protect, deletePage);

module.exports = router;
