import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  problem: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Resolved'],
    default: 'New'
  }
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', contactSchema);
