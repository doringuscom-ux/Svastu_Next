import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'small',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, { timestamps: true });

export default mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
