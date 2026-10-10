const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const { protect, adminOnly } = require('../middlewares/auth');

const isValidPassword = (password) => {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;
};
// Generate Access Token (30 days)
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Generate Refresh Token (3 days)
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
};

// @desc    Auth admin & get tokens
// @route   POST /api/admin/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // allow login via username OR email
    const admin = await Admin.findOne({ 
      $or: [
        { username: username }, 
        { email: username }
      ] 
    });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (admin.isLocked) {
      return res.status(403).json({ 
        message: 'Account locked due to multiple failed attempts.', 
        locked: true 
      });
    }

    const isMatch = await admin.matchPassword(password);

    if (isMatch) {
      admin.failedLoginAttempts = 0;
      await admin.save();
      
      res.json({
        _id: admin._id,
        username: admin.username,
        role: admin.role,
        token: generateAccessToken(admin._id),
        refreshToken: generateRefreshToken(admin._id),
      });
    } else {
      admin.failedLoginAttempts = (admin.failedLoginAttempts || 0) + 1;
      let msg = 'Invalid username or password';
      
      if (admin.failedLoginAttempts >= 5) {
        admin.isLocked = true;
        admin.failedLoginAttempts = 0; // reset for next time they unlock
        msg = 'Account locked due to 5 failed attempts.';
      }
      await admin.save();
      
      res.status(401).json({ 
        message: msg,
        locked: admin.isLocked
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
});

// @desc    Send OTP to unlock account
// @route   POST /api/admin/login-otp/send
// @access  Public
router.post('/login-otp/send', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await Admin.findOne({ 
      $or: [
        { username: username }, 
        { email: username }
      ] 
    });
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.email) return res.status(400).json({ message: 'No email associated with this account. Contact super admin.' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;
    user.failedOtpAttempts = 0; // reset attempts when generating new OTP
    await user.save();

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (scriptUrl) {
      const htmlMessage = `
        <h2>Account Unlock OTP</h2>
        <p>Dear ${user.name},</p>
        <p>Your OTP to unlock your account and securely login is: <strong style="font-size:24px;">${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
      `;

      const formData = new URLSearchParams();
      formData.append('to', user.email);
      formData.append('subject', 'Account Unlock OTP - S Vastu');
      formData.append('message', htmlMessage);

      await fetch(scriptUrl, {
        method: 'POST',
        body: formData,
      });
      res.json({ message: 'OTP sent to your registered email address' });
    } else {
      res.status(500).json({ message: 'Email configuration missing' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Verify OTP and Login
// @route   POST /api/admin/login-otp/verify
// @access  Public
router.post('/login-otp/verify', async (req, res) => {
  try {
    const { username, otp } = req.body;
    
    const user = await Admin.findOne({ 
      $or: [
        { username: username }, 
        { email: username }
      ],
      resetOtpExpire: { $gt: Date.now() } 
    });

    if (!user) {
      return res.status(400).json({ message: 'OTP has expired or user not found. Request a new one.' });
    }

    if (user.resetOtp !== otp) {
      user.failedOtpAttempts = (user.failedOtpAttempts || 0) + 1;
      if (user.failedOtpAttempts >= 10) {
        user.resetOtp = undefined;
        user.resetOtpExpire = undefined;
        user.failedOtpAttempts = 0;
        await user.save();
        return res.status(400).json({ message: 'Too many invalid attempts. OTP invalidated. Please request a new one.' });
      }
      await user.save();
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Unlock account and clear OTP
    user.isLocked = false;
    user.failedLoginAttempts = 0;
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;
    user.failedOtpAttempts = 0;
    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateAccessToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get new access token using refresh token
// @route   POST /api/admin/refresh
// @access  Public
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Refresh token expired or invalid' });
      }
      
      const newAccessToken = generateAccessToken(decoded.id);
      res.json({ token: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Forgot Password - Send OTP
// @route   POST /api/admin/forgot-password
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.failedOtpAttempts = 0; // reset attempts when generating new OTP
    await user.save();

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (scriptUrl) {
      const htmlMessage = `
        <h2>Password Reset OTP</h2>
        <p>Dear ${user.name},</p>
        <p>Your OTP to reset your S-Vastu dashboard password is: <strong style="font-size:24px;">${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
      `;

      const formData = new URLSearchParams();
      formData.append('to', user.email);
      formData.append('subject', 'Password Reset OTP - S Vastu');
      formData.append('message', htmlMessage);

      await fetch(scriptUrl, {
        method: 'POST',
        body: formData,
      });
      console.log('OTP sent successfully via Google Apps Script to', user.email);
      res.json({ message: 'OTP sent to email successfully' });
    } else {
      res.status(500).json({ message: 'Email configuration missing' });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Reset Password with OTP
// @route   POST /api/admin/reset-password
// @access  Public
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }

    if (!isValidPassword(newPassword)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long, and include a number, a capital letter, and a special character.' });
    }

    const user = await Admin.findOne({ email, resetOtpExpire: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: 'OTP has expired or user not found. Request a new one.' });
    }

    if (user.resetOtp !== otp) {
      user.failedOtpAttempts += 1;
      if (user.failedOtpAttempts >= 3) {
        user.resetOtp = undefined;
        user.resetOtpExpire = undefined;
        user.failedOtpAttempts = 0;
        await user.save();
        return res.status(400).json({ message: 'Too many invalid attempts. OTP invalidated. Please request a new one.' });
      }
      await user.save();
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.password = newPassword;
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;
    user.failedOtpAttempts = 0;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all users (admins & subadmins)
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await Admin.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create a new user
// @route   POST /api/admin/users
// @access  Private/Admin
router.post('/users', protect, adminOnly, async (req, res) => {
  try {
    const { username, password, role, name, email, phone } = req.body;
    
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long, and include a number, a capital letter, and a special character.' });
    }

    const userExists = await Admin.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await Admin.create({
      username,
      password,
      role: role || 'subadmin',
      name: name || '',
      email: email || '',
      phone: phone || ''
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        email: user.email,
        phone: user.phone
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update a user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
router.put('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const { name, email, phone, username } = req.body;
    const user = await Admin.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username && username !== user.username) {
      const usernameExists = await Admin.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
      user.username = username;
    }

    user.name = name !== undefined ? name : user.name;
    user.email = email !== undefined ? email : user.email;
    user.phone = phone !== undefined ? phone : user.phone;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      role: updatedUser.role,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
router.put('/users/:id/role', protect, adminOnly, async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    if (user) {
      user.role = req.body.role || user.role;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update user password
// @route   PUT /api/admin/users/:id/password
// @access  Private/Admin
router.put('/users/:id/password', protect, adminOnly, async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    if (user) {
      if (!req.body.password) {
        return res.status(400).json({ message: 'Password is required' });
      }
      if (!isValidPassword(req.body.password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long, and include a number, a capital letter, and a special character.' });
      }
      user.password = req.body.password;
      await user.save();
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    if (user) {
      if (user.role === 'admin' && req.admin._id.toString() !== user._id.toString()) {
        // Prevent deleting another admin unless we want to allow it. Let's allow it for now, 
        // or maybe protect the primary admin? Let's just delete.
      }
      if (req.admin._id.toString() === user._id.toString()) {
         return res.status(400).json({ message: 'Cannot delete yourself' });
      }
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
