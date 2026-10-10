import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: 'Admin User'
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  resetOtp: {
    type: String,
  },
  resetOtpExpire: {
    type: Date,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
  failedOtpAttempts: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ['admin', 'subadmin'],
    default: 'subadmin',
  },
}, {
  timestamps: true,
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);
