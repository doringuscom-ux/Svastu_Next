import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  metaTitle: {
    type: String,
    default: '',
  },
  metaDescription: {
    type: String,
    default: '',
  },
  metaKeywords: {
    type: String,
    default: '',
  },
  metaCanonical: {
    type: String,
    default: '',
  },
  metaRobots: {
    type: String,
    default: 'index, follow',
  },
  customText: {
    type: String,
    default: '',
  },
  section1: {
    topHeading: { type: String, default: '' },
    topSubHeading: { type: String, default: '' },
    heading: { type: String, default: '' },
    text: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  section2: {
    topHeading: { type: String, default: '' },
    topSubHeading: { type: String, default: '' },
    heading: { type: String, default: '' },
    text: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  section3: {
    topHeading: { type: String, default: '' },
    topSubHeading: { type: String, default: '' },
    heading: { type: String, default: '' },
    text: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  section4: {
    topHeading: { type: String, default: '' },
    topSubHeading: { type: String, default: '' },
    heading: { type: String, default: '' },
    text: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  section5: {
    topHeading: { type: String, default: '' },
    topSubHeading: { type: String, default: '' },
    heading: { type: String, default: '' },
    text: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  section6: {
    topHeading: { type: String, default: '' },
    topSubHeading: { type: String, default: '' },
    heading: { type: String, default: '' },
    text: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true,
});

export default mongoose.models.Page || mongoose.model('Page', pageSchema);
