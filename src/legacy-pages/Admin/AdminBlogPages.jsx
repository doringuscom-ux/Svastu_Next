'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, X, Upload } from 'lucide-react';
import JoditEditor from 'jodit-react';
import { BLOGS_API } from '../../utils/api';

const API_URL = BLOGS_API;

export default function AdminBlogPages() {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // File input state
  const [coverImageFile, setCoverImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'General',
    author: 'S-Vastu Solution',
    isPublished: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    metaCanonical: '',
    metaRobots: 'index, follow'
  });

  const editorComponent = React.useMemo(() => (
    <JoditEditor
      value={formData.content || ''}
      config={{
        readonly: false,
        placeholder: 'Write your blog content here...',
        height: 400,
      }}
      onBlur={(newContent) => setFormData(prev => ({ ...prev, content: newContent }))}
    />
  ), [editingBlog?._id]);

  const [isFetching, setIsFetching] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchBlogs = async () => {
    setIsFetching(true);
    try {
      const { data } = await axios.get(`${API_URL}?all=true`, getAuthHeaders());
      setBlogs(data);
    } catch (err) {
      setError('Failed to fetch blogs');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenModal = async (listBlog = null) => {
    if (listBlog) {
      // The list endpoint omits `content` to stay light, so load the full post before editing.
      let blog = listBlog;
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/${listBlog._id}`, getAuthHeaders());
        blog = data;
      } catch (err) {
        setError('Failed to load blog content. Please try again.');
        return;
      } finally {
        setLoading(false);
      }
      setEditingBlog(blog);
      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        category: blog.category || 'General',
        author: blog.author || 'S-Vastu Solution',
        isPublished: blog.isPublished,
        metaTitle: blog.metaTitle || '',
        metaDescription: blog.metaDescription || '',
        metaKeywords: blog.metaKeywords || '',
        metaCanonical: blog.metaCanonical || '',
        metaRobots: blog.metaRobots || 'index, follow'
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'General',
        author: 'S-Vastu Solution',
        isPublished: true,
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        metaCanonical: '',
        metaRobots: 'index, follow'
      });
    }
    setCoverImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    setCoverImageFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // We must use FormData because of the file upload
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('slug', formData.slug);
    submitData.append('excerpt', formData.excerpt);
    submitData.append('content', formData.content);
    submitData.append('category', formData.category);
    submitData.append('author', formData.author);
    submitData.append('isPublished', formData.isPublished);
    submitData.append('metaTitle', formData.metaTitle);
    submitData.append('metaDescription', formData.metaDescription);
    submitData.append('metaKeywords', formData.metaKeywords);
    submitData.append('metaCanonical', formData.metaCanonical);
    submitData.append('metaRobots', formData.metaRobots);
    
    if (coverImageFile) {
      submitData.append('coverImageFile', coverImageFile);
    }

    // Configure headers for FormData + Authorization
    const token = localStorage.getItem('adminToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      if (editingBlog) {
        await axios.put(`${API_URL}/${editingBlog._id}`, submitData, config);
        // Also update SEO separately if needed, but our PUT route handles everything
      } else {
        await axios.post(API_URL, submitData, config);
      }
      fetchBlogs();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving blog');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        fetchBlogs();
      } catch (err) {
        setError('Error deleting blog');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Blogs</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Create Blog
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Blogs Table */}
      {isFetching ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Loading blogs...
        </div>
      ) : (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                  <div className="text-sm text-gray-500">/{blog.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.isPublished ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Published</span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Draft</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleOpenModal(blog)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogs.length === 0 && (
          <div className="p-6 text-center text-gray-500">No blogs found. Create one!</div>
        )}
      </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="Leave blank to auto-generate"
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      name="coverImageFile"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="coverImageFile"
                    />
                    <label htmlFor="coverImageFile" className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-gray-700 border border-gray-300 transition-colors">
                      <Upload size={18} />
                      {coverImageFile ? coverImageFile.name : 'Choose Image File'}
                    </label>
                    {editingBlog?.coverImage && !coverImageFile && (
                      <img src={editingBlog.coverImage} alt="Current cover" className="h-10 w-auto rounded" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Image will be uploaded to Cloudinary.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Description)</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full border border-gray-300 rounded p-2"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content * (HTML allowed)</label>
                  {editorComponent}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">Publish this blog</label>
                </div>

                {/* SEO Fields */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                      <input
                        type="text"
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                      <input
                        type="text"
                        name="metaKeywords"
                        value={formData.metaKeywords}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded p-2"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                    <textarea
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full border border-gray-300 rounded p-2"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                      <input
                        type="text"
                        name="metaCanonical"
                        value={formData.metaCanonical}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meta Robots</label>
                      <select
                        name="metaRobots"
                        value={formData.metaRobots}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded p-2 bg-white"
                      >
                        <option value="index, follow">index, follow</option>
                        <option value="noindex, follow">noindex, follow</option>
                        <option value="index, nofollow">index, nofollow</option>
                        <option value="noindex, nofollow">noindex, nofollow</option>
                      </select>
                    </div>
                  </div>
                </div>

              </form>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-4 rounded-b-lg">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="blog-form"
                className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Blog'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

