import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  pageName: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    default: 'S-Vastu - Best Vastu Consultant'
  },
  description: {
    type: String,
    default: 'Expert Vastu consulting for home and commercial spaces.'
  },
  keywords: {
    type: String,
    default: 'Vastu, consultant, astrology'
  },
  ogImage: {
    type: String,
    default: ''
  },
  scriptTags: {
    type: String,
    default: ''
  },
  canonical: {
    type: String,
    default: ''
  },
  robots: {
    type: String,
    default: 'index, follow'
  }
}, { timestamps: true });

export default mongoose.models.Seo || mongoose.model('Seo', seoSchema);
