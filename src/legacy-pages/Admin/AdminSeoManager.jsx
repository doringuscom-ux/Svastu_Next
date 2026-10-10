'use client';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Search, Save, X, Settings, Link as LinkIcon, Upload } from 'lucide-react';
import { SEO_API, PAGES_API, BLOGS_API } from '../../utils/api';

const STATIC_PAGE_DEFAULTS = [
  { _id: 'home', title: 'Home Page', slug: '/', metaTitle: '', metaDescription: '', isStatic: true },
  { _id: 'about', title: 'About Page', slug: '/about-us', metaTitle: '', metaDescription: '', isStatic: true },
  { _id: 'services', title: 'Services Page', slug: '/services', metaTitle: '', metaDescription: '', isStatic: true },
  { _id: 'gallery', title: 'Gallery Page', slug: '/gallery', metaTitle: '', metaDescription: '', isStatic: true },
  { _id: 'contact', title: 'Contact Page', slug: '/contact-us', metaTitle: '', metaDescription: '', isStatic: true },
  { _id: 'blog', title: 'Blog Page', slug: '/blog', metaTitle: '', metaDescription: '', isStatic: true },
  { _id: 'locations', title: 'Locations Page', slug: '/locations', metaTitle: '', metaDescription: '', isStatic: true },
];

export default function AdminSeoManager() {
  const [activeTab, setActiveTab] = useState('City Pages');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    metaCanonical: '',
    metaRobots: 'index, follow',
    ogImage: '',
    scriptTags: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const getMultipartHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { 
      headers: { 
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}` 
      } 
    };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'City Pages') {
        const res = await axios.get(PAGES_API, getAuthHeaders());
        setData(res.data);
      } else if (activeTab === 'Blogs') {
        const res = await axios.get(`${BLOGS_API}?all=true`, getAuthHeaders());
        setData(res.data);
      } else if (activeTab === 'Static Pages') {
        const res = await axios.get(SEO_API, getAuthHeaders());
        const savedSeo = res.data; // array of seo objects { pageName, title, description, ... }
        
        // Merge with defaults
        const merged = STATIC_PAGE_DEFAULTS.map(def => {
          const found = savedSeo.find(s => s.pageName === def._id);
          if (found) {
            return {
              ...def,
              metaTitle: found.title || '',
              metaDescription: found.description || '',
              metaKeywords: found.keywords || '',
              metaCanonical: found.canonical || '',
              metaRobots: found.robots || 'index, follow',
              ogImage: found.ogImage || '',
              scriptTags: found.scriptTags || ''
            };
          }
          return def;
        });
        setData(merged);
      }
    } catch (error) {
      console.error("Error fetching SEO data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const query = searchQuery.toLowerCase();
      const title = (item.title || item.name || '').toLowerCase();
      const slug = (item.slug || '').toLowerCase();
      return title.includes(query) || slug.includes(query);
    });
  }, [data, searchQuery]);

  const handleEdit = (item) => {
    setEditingItem(item);
    
    // Auto-generate canonical URL if it's empty
    let autoCanonical = item.metaCanonical || '';
    if (!autoCanonical) {
      const baseUrl = window.location.origin;
      let path = '';
      if (activeTab === 'City Pages') {
        path = `/${item.slug}`;
      } else if (activeTab === 'Blogs') {
        path = `/${item.slug}`;
      } else if (activeTab === 'Static Pages') {
        path = item.slug === '/' ? '' : item.slug;
      }
      autoCanonical = `${baseUrl}${path}`;
    }

    setFormData({
      metaTitle: item.metaTitle || '',
      metaDescription: item.metaDescription || '',
      metaKeywords: item.metaKeywords || '',
      metaCanonical: autoCanonical,
      metaRobots: item.metaRobots || 'index, follow',
      ogImage: item.ogImage || '',
      scriptTags: item.scriptTags || ''
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setImageFile(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (activeTab === 'City Pages') {
        await axios.put(`${PAGES_API}/${editingItem._id}`, formData, getAuthHeaders());
      } else if (activeTab === 'Blogs') {
        const submitData = new FormData();
        // Blogs API requires title, slug, content to update, wait! 
        // We only want to update SEO fields. 
        // The blog PUT endpoint might overwrite content if not provided. Let's check.
        // Usually, PUT is full replace. To be safe, we merge with existing.
        // Let's pass all existing blog data + new SEO data.
        await axios.put(`${BLOGS_API}/${editingItem._id}`, {
          ...editingItem,
          ...formData
        }, getAuthHeaders());
      } else if (activeTab === 'Static Pages') {
        const submitData = new FormData();
        submitData.append('title', formData.metaTitle);
        submitData.append('description', formData.metaDescription);
        submitData.append('keywords', formData.metaKeywords);
        submitData.append('scriptTags', formData.scriptTags);
        submitData.append('canonical', formData.metaCanonical);
        submitData.append('robots', formData.metaRobots);
        
        if (imageFile) {
          submitData.append('ogImageFile', imageFile);
        } else {
          submitData.append('ogImage', formData.ogImage);
        }
        await axios.put(`${SEO_API}/${editingItem._id}`, submitData, getMultipartHeaders());
      }
      
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving SEO", error);
      alert("Error saving SEO data");
    } finally {
      setSaving(false);
    }
  };

  const hasMissingData = (item) => {
    return !item.metaTitle || !item.metaDescription;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">SEO Manager</h1>
        <p className="text-gray-500">Centralized tool to manage SEO for all your dynamic pages</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 space-x-8">
        {['City Pages', 'Static Pages', 'Blogs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-medium transition-colors relative ${
              activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search pages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full border border-gray-300 rounded-lg py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/80 text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Name / Title</th>
                <th className="px-6 py-4">URL Slug</th>
                <th className="px-6 py-4">SEO Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Loading data...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No pages found matching your search.</td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 font-mono text-gray-500 text-xs">
                      {activeTab === 'City Pages' ? `/${item.slug}` : 
                       activeTab === 'Blogs' ? `/${item.slug}` : 
                       item.slug}
                    </td>
                    <td className="px-6 py-4">
                      {hasMissingData(item) ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Missing Data
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                          Optimized
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Settings size={16} /> Edit SEO
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Edit SEO Settings</h2>
                <p className="text-sm text-gray-500 mt-1">{editingItem?.title}</p>
              </div>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Meta Title</label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Best Vastu Consultant in Delhi | S-Vastu"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-xs text-gray-500">Recommended: 50-60 characters</span>
                    <span className={`text-xs font-medium ${formData.metaTitle.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                      {formData.metaTitle.length}/60
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Meta Description</label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  ></textarea>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-xs text-gray-500">Recommended: 150-160 characters</span>
                    <span className={`text-xs font-medium ${formData.metaDescription.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                      {formData.metaDescription.length}/160
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Meta Keywords</label>
                  <input
                    type="text"
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleInputChange}
                    placeholder="vastu, home design, numerology..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">Comma separated list of keywords.</p>
                </div>

                {/* Advanced fields for all pages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Canonical URL</label>
                    <input
                      type="text"
                      name="metaCanonical"
                      value={formData.metaCanonical}
                      onChange={handleInputChange}
                      placeholder="https://..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Meta Robots</label>
                    <select
                      name="metaRobots"
                      value={formData.metaRobots}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                      <option value="index, follow">index, follow</option>
                      <option value="noindex, follow">noindex, follow</option>
                      <option value="index, nofollow">index, nofollow</option>
                      <option value="noindex, nofollow">noindex, nofollow</option>
                    </select>
                  </div>
                </div>

                {/* Static pages specific (OG Image & Scripts) */}
                {activeTab === 'Static Pages' && (
                  <div className="space-y-4 pt-2 border-t border-gray-100">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">OG Image (Social Media Preview)</label>
                      <div className="flex gap-4 items-start">
                        {formData.ogImage && !imageFile && (
                          <div className="w-24 h-24 bg-gray-100 rounded-lg border flex-shrink-0 overflow-hidden">
                            <img src={formData.ogImage} alt="OG Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
                          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-5 h-5 mb-1 text-gray-400" />
                              <p className="text-xs text-gray-500 font-medium">Click to upload image</p>
                            </div>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                          </label>
                          {imageFile && <p className="text-xs text-blue-600 mt-2 font-medium truncate">{imageFile.name}</p>}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Custom Header Scripts</label>
                      <textarea
                        name="scriptTags"
                        rows="3"
                        value={formData.scriptTags}
                        onChange={handleInputChange}
                        placeholder="<!-- Paste Google Analytics, Facebook Pixel, or Schema JSON-LD here -->"
                        className="w-full border border-gray-300 rounded-lg p-3 font-mono text-xs bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-xl flex justify-end gap-3">
              <button 
                onClick={handleCloseModal}
                disabled={saving}
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {saving ? 'Saving...' : (
                  <>
                    <Save size={18} /> Save SEO Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

