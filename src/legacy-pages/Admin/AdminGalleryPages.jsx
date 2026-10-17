'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import { GALLERY_API } from '../../utils/api';

const API_URL = GALLERY_API;

export default function AdminGalleryPages() {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // File vs URL state
  const [inputType, setInputType] = useState('upload'); // 'upload' or 'url'
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    category: 'Residential',
    size: 'small',
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const [isFetching, setIsFetching] = useState(true);

  const fetchImages = async () => {
    setIsFetching(true);
    try {
      const { data } = await axios.get(API_URL, getAuthHeaders());
      setImages(data);
    } catch (err) {
      setError('Failed to fetch gallery images');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleOpenModal = (img = null) => {
    if (img) {
      setEditingImage(img);
      setFormData({
        src: img.src || '',
        alt: img.alt || '',
        category: img.category || 'Residential',
        size: img.size || 'small',
      });
      setInputType(img.src && img.src.startsWith('http') && !img.src.includes('cloudinary') ? 'url' : 'upload');
    } else {
      setEditingImage(null);
      setFormData({
        src: '',
        alt: '',
        category: 'Residential',
        size: 'small',
      });
      setInputType('upload');
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingImage(null);
    setImageFile(null);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const submitData = new FormData();
    submitData.append('alt', formData.alt);
    submitData.append('category', formData.category);
    submitData.append('size', formData.size);
    
    if (inputType === 'upload' && imageFile) {
      submitData.append('imageFile', imageFile);
    } else if (inputType === 'url' && formData.src) {
      submitData.append('src', formData.src);
    }

    const token = localStorage.getItem('adminToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      if (editingImage) {
        await axios.put(`${API_URL}/${editingImage._id}`, submitData, config);
      } else {
        if (inputType === 'upload' && !imageFile) {
          setError('Please select an image file to upload.');
          setLoading(false);
          return;
        }
        if (inputType === 'url' && !formData.src) {
          setError('Please enter an image URL.');
          setLoading(false);
          return;
        }
        await axios.post(API_URL, submitData, config);
      }
      fetchImages();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving image');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image from the gallery?')) {
      try {
        await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        fetchImages();
      } catch (err) {
        setError('Error deleting image');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Gallery</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Add Image
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Gallery Grid View */}
      {isFetching ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Loading gallery images...
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="h-48 w-full bg-gray-200 relative">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex gap-2">
                <button 
                  onClick={() => handleOpenModal(img)}
                  className="bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition"
                >
                  <Pencil size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(img._id)}
                  className="bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 line-clamp-1" title={img.alt}>{img.alt}</h3>
                <p className="text-sm text-gray-500 mt-1">{img.category}</p>
              </div>
              <div className="mt-3 text-xs font-semibold text-gray-400 uppercase">
                Size: {img.size}
              </div>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <div className="col-span-full p-12 text-center bg-white rounded-lg border border-dashed border-gray-300 text-gray-500">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>No images in your gallery yet. Click "Add Image" to get started!</p>
          </div>
        )}
      </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">{editingImage ? 'Edit Gallery Image' : 'Add New Image'}</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="gallery-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Image Input Type Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-lg w-full max-w-xs mb-4">
                  <button
                    type="button"
                    onClick={() => setInputType('upload')}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${inputType === 'upload' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputType('url')}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${inputType === 'url' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Paste URL
                  </button>
                </div>

                {/* Image Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image {editingImage ? '' : '*'}</label>
                  
                  {inputType === 'upload' ? (
                    <div className="flex flex-col gap-4">
                      {editingImage?.src && !imageFile && (
                        <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border">
                          <img src={editingImage.src} alt="Current" className="w-full h-full object-contain" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-center w-full">
                        <label htmlFor="imageFile" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              {imageFile ? imageFile.name : 'PNG, JPG, WEBP (Max 5MB)'}
                            </p>
                          </div>
                          <input id="imageFile" type="file" name="imageFile" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="url"
                        name="src"
                        value={formData.src}
                        onChange={handleInputChange}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      />
                      {formData.src && (
                        <div className="mt-3 w-full h-48 bg-gray-100 rounded-lg overflow-hidden border">
                          <img src={formData.src} alt="Preview" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text / Title *</label>
                  <input
                    type="text"
                    name="alt"
                    value={formData.alt}
                    onChange={handleInputChange}
                    placeholder="e.g. Modern Living Room Design"
                    required
                    className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="e.g. Residential"
                      required
                      className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Size</label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded p-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    >
                      <option value="small">Small (1x1 square)</option>
                      <option value="medium">Medium (1x2 tall)</option>
                      <option value="large">Large (2x2 big square)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Affects grid layout on frontend.</p>
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
                form="gallery-form"
                className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Save Image'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

