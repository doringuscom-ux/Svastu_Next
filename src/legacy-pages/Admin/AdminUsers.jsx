'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Shield, User, Key, Edit, X, Save, Eye, EyeOff } from 'lucide-react';
import { ADMIN_API } from '../../utils/api';

const isValidPassword = (password) => {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [editingUserId, setEditingUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Change Password Modal State
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [changePasswordUserId, setChangePasswordUserId] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'subadmin',
    name: '',
    email: '',
    phone: ''
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${ADMIN_API}/users`, getAuthHeaders());
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setEditingUserId(null);
    setFormData({ username: '', password: '', role: 'subadmin', name: '', email: '', phone: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        // Update User
        await axios.put(`${ADMIN_API}/users/${editingUserId}`, formData, getAuthHeaders());
        alert('User details updated successfully!');
      } else {
        // Create User
        if (!isValidPassword(formData.password)) {
          setError('Password must be at least 8 characters long, and include a number, a capital letter, and a special character.');
          return;
        }
        await axios.post(`${ADMIN_API}/users`, formData, getAuthHeaders());
        alert('User created successfully!');
      }
      resetForm();
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || (editingUserId ? 'Failed to update user' : 'Failed to create user'));
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setFormData({
      username: user.username || '',
      password: '', // We don't populate password, it's handled separately
      role: user.role || 'subadmin',
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${ADMIN_API}/users/${id}`, getAuthHeaders());
        fetchUsers();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`${ADMIN_API}/users/${id}/role`, { role: newRole }, getAuthHeaders());
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change role');
    }
  };

  const openChangePasswordModal = (id) => {
    setChangePasswordUserId(id);
    setNewPassword('');
    setShowNewPassword(false);
    setChangePasswordModal(true);
  };

  const submitChangePassword = async (e) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    
    if (!isValidPassword(newPassword)) {
      setError('Password must be at least 8 characters long, and include a number, a capital letter, and a special character.');
      return;
    }

    try {
      await axios.put(`${ADMIN_API}/users/${changePasswordUserId}/password`, { password: newPassword }, getAuthHeaders());
      alert('Password updated successfully!');
      setChangePasswordModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Shield className="text-orange-500" /> User Management
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError('')}><X size={18} /></button>
        </div>
      )}

      {/* Create / Edit User Form */}
      <div className={`p-6 rounded-lg shadow-sm border mb-8 max-w-4xl transition-colors ${editingUserId ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            {editingUserId ? <><Edit size={20} className="text-orange-500" /> Edit User Details</> : 'Create New User'}
          </h2>
          {editingUserId && (
            <button onClick={resetForm} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <X size={16} /> Cancel
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g. Rahul Sharma"
              className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="rahul@example.com"
              className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              type="text" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="9876543210"
              className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username (Login ID)</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          {!editingUserId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={!editingUserId}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}
          {!editingUserId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select 
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="subadmin">Sub-Admin</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
          <div className="lg:col-span-3 flex gap-3 mt-2">
            <button 
              type="submit" 
              className={`${editingUserId ? 'bg-orange-600 hover:bg-orange-700' : 'bg-orange-500 hover:bg-orange-600'} text-white px-6 py-2 rounded flex items-center justify-center gap-2 transition-colors w-full md:w-auto`}
            >
              {editingUserId ? <><Save size={18} /> Save Changes</> : <><Plus size={18} /> Add User</>}
            </button>
            {editingUserId && (
              <button 
                type="button"
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded flex items-center justify-center gap-2 transition-colors w-full md:w-auto"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="4" className="text-center py-4">Loading users...</td></tr>
            ) : users.map(user => (
              <tr key={user._id} className={`hover:bg-gray-50 transition-colors ${editingUserId === user._id ? 'bg-orange-50' : ''}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full hidden sm:block">
                      <User size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name || 'N/A'}</p>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-900">{user.email || 'N/A'}</p>
                  <p className="text-sm text-gray-500">{user.phone || 'N/A'}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className={`text-sm rounded-full px-3 py-1 font-semibold border-none outline-none focus:ring-2 focus:ring-orange-500 ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    <option value="admin">Admin</option>
                    <option value="subadmin">Sub-Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleEditClick(user)}
                    className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-full transition-colors mr-1"
                    title="Edit Details"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => openChangePasswordModal(user._id)}
                    className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors mr-1"
                    title="Change Password"
                  >
                    <Key size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Change Password Modal */}
      {changePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Key size={20} className="text-blue-500" /> Change User Password
            </h3>
            <form onSubmit={submitChangePassword}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    autoFocus
                    className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setChangePasswordModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

