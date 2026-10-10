'use client';
import React, { useState, useEffect } from 'react';
import { useNavigate } from '@/components/RouterShim';
import axios from 'axios';
import { Eye, EyeOff, Mail, KeyRound, ArrowLeft, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ADMIN_API } from '../../utils/api';

const isValidPassword = (password) => {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;
};

const AdminLogin = () => {
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Forgot Password State
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [isForgotOtpMode, setIsForgotOtpMode] = useState(false);
  const [email, setEmail] = useState(''); // Used for forgot password
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Lockout / OTP Login State (they use the same backend endpoints)
  const [isOtpLoginMode, setIsOtpLoginMode] = useState(false);
  const [isLockedMode, setIsLockedMode] = useState(false); 
  const [isUnlockOtpMode, setIsUnlockOtpMode] = useState(false);
  const [unlockOtp, setUnlockOtp] = useState('');

  // Global State
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleStandardLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${ADMIN_API}/login`, { username, password });
      localStorage.setItem('adminToken', data.token);
      if (data.role) {
        localStorage.setItem('adminRole', data.role);
      }
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/admin/dashboard');
    } catch (err) {
      const responseData = err.response?.data;
      setError(responseData?.message || 'Login failed');
      if (responseData?.locked) {
        setIsLockedMode(true);
        setIsOtpLoginMode(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // Used for both unlocking account and passwordless login
  const handleSendLoginOtp = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const { data } = await axios.post(`${ADMIN_API}/login-otp/send`, { username });
      setSuccess(data.message || 'OTP sent to your registered email.');
      setIsUnlockOtpMode(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLoginOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${ADMIN_API}/login-otp/verify`, { username, otp: unlockOtp });
      // Upon success, we get the login tokens
      localStorage.setItem('adminToken', data.token);
      if (data.role) {
        localStorage.setItem('adminRole', data.role);
      }
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSendForgotOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post(`${ADMIN_API}/forgot-password`, { email });
      setSuccess('OTP has been sent to your email.');
      setIsForgotOtpMode(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!isValidPassword(newPassword)) {
      setError('Password must be at least 8 characters long, and include a number, a capital letter, and a special character.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await axios.post(`${ADMIN_API}/reset-password`, { email, otp, newPassword });
      setSuccess('Password reset successfully! You can now login.');
      setIsForgotMode(false);
      setIsForgotOtpMode(false);
      setUsername('');
      setPassword('');
      setEmail('');
      setOtp('');
      setNewPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const resetAllModes = () => {
    setIsForgotMode(false);
    setIsOtpLoginMode(false);
    setIsLockedMode(false);
    setIsUnlockOtpMode(false);
    setIsForgotOtpMode(false);
    setError('');
    setSuccess('');
    setUnlockOtp('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        
        {/* Render OTP Login / Unlock Mode */}
        {isOtpLoginMode ? (
          <>
            <button 
              onClick={resetAllModes}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-800 mb-4 transition-colors"
            >
              <ArrowLeft size={18} /> Back to Login
            </button>
            
            {isLockedMode ? (
              <div className="flex justify-center mb-4 text-red-500">
                <AlertTriangle size={48} />
              </div>
            ) : (
              <div className="flex justify-center mb-4 text-blue-500">
                <ShieldCheck size={48} />
              </div>
            )}
            
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
              {isLockedMode ? 'Account Locked' : 'Login with OTP'}
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              {isLockedMode 
                ? 'Your account has been locked due to multiple failed login attempts. Verify your identity using an OTP sent to your registered email.'
                : 'Enter your Username or Email to receive a secure login OTP.'}
            </p>
            
            {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center border border-red-200">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm text-center border border-green-200">{success}</div>}
            
            {!isUnlockOtpMode ? (
              <form onSubmit={handleSendLoginOtp}>
                 <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Username or Email</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required
                    placeholder="Enter username or email"
                  />
                </div>
                <button 
                  disabled={loading} 
                  type="submit"
                  className={`w-full text-white p-3 rounded-lg font-bold transition-colors shadow-md ${isLockedMode ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-400' : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400'}`}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyLoginOtp}>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium flex items-center gap-2">
                    <KeyRound size={16} /> Enter 6-Digit OTP
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-center font-bold tracking-widest transition-all" 
                    value={unlockOtp} 
                    onChange={(e) => setUnlockOtp(e.target.value)} 
                    required
                    maxLength="6"
                    placeholder="------"
                  />
                </div>
                <button disabled={loading} type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 font-bold transition-colors shadow-md disabled:bg-green-400">
                  {loading ? 'Verifying...' : 'Verify OTP & Login'}
                </button>
              </form>
            )}
          </>
        ) : isForgotMode ? (
          <>
            <button 
              onClick={resetAllModes}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-800 mb-4 transition-colors"
            >
              <ArrowLeft size={18} /> Back to Login
            </button>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Reset Password</h2>
            
            {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center border border-red-200">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm text-center border border-green-200">{success}</div>}
            
            {!isForgotOtpMode ? (
              <form onSubmit={handleSendForgotOtp}>
                <p className="text-sm text-gray-600 mb-6">Enter your registered email address and we'll send you an OTP to reset your password.</p>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium flex items-center gap-2">
                    <Mail size={16} /> Email Address
                  </label>
                  <input 
                    type="email" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    placeholder="admin@svastu.com"
                  />
                </div>
                <button disabled={loading} type="submit" className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 font-bold transition-colors shadow-md disabled:bg-gray-400">
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium flex items-center gap-2">
                    <KeyRound size={16} /> Enter 6-Digit OTP
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-center font-bold tracking-widest transition-all" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    required
                    maxLength="6"
                    placeholder="------"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">New Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none pr-10 transition-all" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <button disabled={loading} type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 font-bold transition-colors shadow-md disabled:bg-green-400">
                  {loading ? 'Verifying...' : 'Reset Password'}
                </button>
              </form>
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
            
            {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center border border-red-200">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm text-center border border-green-200">{success}</div>}
            
            <form onSubmit={handleStandardLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Username or Email</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required
                  placeholder="admin or admin@svastu.com"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none pr-10 transition-all" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2">
                   <button 
                    type="button" 
                    onClick={() => { setIsOtpLoginMode(true); setError(''); setSuccess(''); }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Login with OTP
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setIsForgotMode(true); setError(''); setSuccess(''); }}
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <button disabled={loading} type="submit" className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 font-bold transition-colors shadow-md disabled:bg-orange-300 flex items-center justify-center gap-2">
                {loading ? 'Logging in...' : 'Login Securely'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;

