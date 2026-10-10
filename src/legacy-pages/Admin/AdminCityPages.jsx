'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import JoditEditor from 'jodit-react';
import ImageCropperModal from '../../components/ImageCropperModal';
import { PAGES_API } from '../../utils/api';

const API_URL = PAGES_API;

const SECTION_EDITOR_CONFIG = {
  readonly: false,
  placeholder: 'Section content...',
  height: 250,
  // We intentionally omit limitChars to prevent the editor from freezing when pasting large blocks of text
};

export default function AdminCityPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterCountry, setFilterCountry] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    country: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    customText: '',
    section1: { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
    section2: { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
    section3: { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
    section4: { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
    section5: { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
    section6: { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' }
  });

  const [fileData, setFileData] = useState({
    section1Image: null, section2Image: null, section3Image: null,
    section4Image: null, section5Image: null, section6Image: null
  });
  
  const [visibleSections, setVisibleSections] = useState(3);
  
  // Cropper states
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [currentCropSection, setCurrentCropSection] = useState('');
  const [previewUrls, setPreviewUrls] = useState({});

  // Ref to store latest editor contents without triggering re-renders
  const editorContents = useRef({
    customText: '',
    section1: '', section2: '', section3: '',
    section4: '', section5: '', section6: ''
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchPages = async () => {
    try {
      const response = await axios.get(API_URL, getAuthHeaders());
      setPages(response.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleFileSelect = (sectionImage, file) => {
    if (!file) return;
    setFileData(prev => ({ ...prev, [sectionImage]: file }));
    setPreviewUrls(prev => ({ ...prev, [sectionImage]: URL.createObjectURL(file) }));
  };

  const handleCropComplete = (croppedFile, previewUrl) => {
    setFileData(prev => ({ ...prev, [currentCropSection]: croppedFile }));
    setPreviewUrls(prev => ({ ...prev, [currentCropSection]: previewUrl }));
    setCropperOpen(false);
  };

  const generateSlug = () => {
    if (formData.title && !formData.slug) {
      setFormData({
        ...formData,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const submitData = new FormData();
      
      // Merge latest editor contents before submitting
      const finalData = {
        ...formData,
        customText: editorContents.current.customText,
        section1: { ...formData.section1, text: editorContents.current.section1 },
        section2: { ...formData.section2, text: editorContents.current.section2 },
        section3: { ...formData.section3, text: editorContents.current.section3 },
        section4: { ...formData.section4, text: editorContents.current.section4 },
        section5: { ...formData.section5, text: editorContents.current.section5 },
        section6: { ...formData.section6, text: editorContents.current.section6 },
      };
      
      // Append regular fields
      Object.keys(finalData).forEach(key => {
        if (key.startsWith('section')) {
          submitData.append(key, JSON.stringify(finalData[key]));
        } else {
          submitData.append(key, finalData[key] || '');
        }
      });

      // Append files
      if (fileData.section1Image) submitData.append('section1Image', fileData.section1Image);
      if (fileData.section2Image) submitData.append('section2Image', fileData.section2Image);
      if (fileData.section3Image) submitData.append('section3Image', fileData.section3Image);
      if (fileData.section4Image) submitData.append('section4Image', fileData.section4Image);
      if (fileData.section5Image) submitData.append('section5Image', fileData.section5Image);
      if (fileData.section6Image) submitData.append('section6Image', fileData.section6Image);

      const config = { headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }};
      
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, submitData, config);
      } else {
        await axios.post(API_URL, submitData, config);
      }
      setShowForm(false);
      setEditingId(null);
      fetchPages();
      resetForm();
      setPreviewUrls({});
    } catch (error) {
      console.error('Error saving page:', error);
      alert(error.response?.data?.message || 'Error saving page');
    }
  };

  const handleEdit = (page) => {
    let activeCount = 3;
    if (page.section6?.text || page.section6?.image) activeCount = 6;
    else if (page.section5?.text || page.section5?.image) activeCount = 5;
    else if (page.section4?.text || page.section4?.image) activeCount = 4;
    
    setVisibleSections(activeCount);
    
    setFormData({
      ...page,
      country: page.country || '',
      section1: page.section1 || { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
      section2: page.section2 || { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
      section3: page.section3 || { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
      section4: page.section4 || { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
      section5: page.section5 || { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
      section6: page.section6 || { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' }
    });
    
    // Initialize editor contents
    editorContents.current = {
      customText: page.customText || '',
      section1: page.section1?.text || '',
      section2: page.section2?.text || '',
      section3: page.section3?.text || '',
      section4: page.section4?.text || '',
      section5: page.section5?.text || '',
      section6: page.section6?.text || ''
    };

    setFileData({ section1Image: null, section2Image: null, section3Image: null, section4Image: null, section5Image: null, section6Image: null });
    setPreviewUrls({});
    setEditingId(page._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this city page?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchPages();
      } catch (error) {
        console.error('Error deleting page:', error);
      }
    }
  };

  const resetForm = () => {
    setVisibleSections(3);
    setFormData({ 
      title: '', slug: '', country: '', metaTitle: '', metaDescription: '', metaKeywords: '', customText: '',
      section1: { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
      section2: { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
      section3: { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
      section4: { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
      section5: { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' },
      section6: { topHeading: '', topSubHeading: '', heading: '', text: '', image: '' }
    });
    
    // Reset editor contents
    editorContents.current = {
      customText: '', section1: '', section2: '', section3: '', section4: '', section5: '', section6: ''
    };

    setFileData({ section1Image: null, section2Image: null, section3Image: null, section4Image: null, section5Image: null, section6Image: null });
    setPreviewUrls({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage City Pages</h1>
        <button
          onClick={() => {
            resetForm();
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? 'Cancel' : 'Add New City'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit City Page' : 'Create New City Page'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title (e.g., Delhi)</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  onBlur={generateSlug}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL endpoint, e.g., delhi)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., Malaysia"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Best Vastu Consultant in Delhi | S-Vastu"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords (comma separated)</label>
                <input
                  type="text"
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Hero Text (optional)</label>
                <div className="border border-gray-300 rounded overflow-hidden">
                  <JoditEditor
                    value={formData.customText || ''}
                    config={{
                      readonly: false,
                      placeholder: 'Customized welcoming text for this city...',
                      height: 300,
                    }}
                    onChange={(newContent) => { editorContents.current.customText = newContent; }}
                  />
                </div>
              </div>

              {/* Dynamic Sections */}
              {[...Array(visibleSections)].map((_, i) => {
                const num = i + 1;
                return (
                  <div key={`section${num}`} className="md:col-span-2 border-t pt-8 mt-4">
                    <h3 className="text-xl font-bold mb-4">Section {num}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Optional Center Header (Displays above the section)</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Top Heading</span>
                              <span className={formData[`section${num}`]?.topHeading?.length > 150 ? 'text-red-500' : ''}>
                                {formData[`section${num}`]?.topHeading?.length || 0}/150
                              </span>
                            </div>
                            <input
                              type="text"
                              maxLength={150}
                              value={formData[`section${num}`]?.topHeading || ''}
                              onChange={(e) => handleSectionChange(`section${num}`, 'topHeading', e.target.value)}
                              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Top Sub-Heading (Optional)</span>
                              <span className={formData[`section${num}`]?.topSubHeading?.length > 250 ? 'text-red-500' : ''}>
                                {formData[`section${num}`]?.topSubHeading?.length || 0}/250
                              </span>
                            </div>
                            <input
                              type="text"
                              maxLength={250}
                              value={formData[`section${num}`]?.topSubHeading || ''}
                              onChange={(e) => handleSectionChange(`section${num}`, 'topSubHeading', e.target.value)}
                              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2 border-t border-gray-200 my-2"></div>

                      <div className="md:col-span-2">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                          <span>Side Heading</span>
                          <span className={formData[`section${num}`]?.heading?.length > 250 ? 'text-red-500 font-normal text-xs' : 'font-normal text-xs text-gray-500'}>
                            {formData[`section${num}`]?.heading?.length || 0}/250
                          </span>
                        </div>
                        <input
                          type="text"
                          maxLength={250}
                          value={formData[`section${num}`]?.heading || ''}
                          onChange={(e) => handleSectionChange(`section${num}`, 'heading', e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image Upload (Direct upload, no crop needed)
                        </label>
                        <input
                          id={`file-section${num}Image`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileSelect(`section${num}Image`, e.target.files[0])}
                          className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:ring-orange-500 focus:border-orange-500"
                        />
                        {(previewUrls[`section${num}Image`] || formData[`section${num}`]?.image) && (
                          <div className="mt-3 flex items-center gap-3">
                            <div className="w-28 h-24 relative rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                              <img 
                                src={previewUrls[`section${num}Image`] || formData[`section${num}`]?.image} 
                                alt={`Section ${num} preview`} 
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewUrls(prev => ({ ...prev, [`section${num}Image`]: null }));
                                setFileData(prev => ({ ...prev, [`section${num}Image`]: null }));
                                handleSectionChange(`section${num}`, 'image', '');
                                const fileInput = document.getElementById(`file-section${num}Image`);
                                if (fileInput) fileInput.value = '';
                              }}
                              className="px-3 py-1.5 text-xs text-red-600 hover:text-red-800 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                            >
                              Remove Image
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
                        <div className="border border-gray-300 rounded overflow-hidden bg-white">
                          <JoditEditor
                            value={formData[`section${num}`]?.text || ''}
                            config={SECTION_EDITOR_CONFIG}
                            onChange={(newContent) => { editorContents.current[`section${num}`] = newContent; }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add Section Button */}
              {visibleSections < 6 && (
                <div className="md:col-span-2 flex justify-center mt-6">
                  <button
                    type="button"
                    onClick={() => setVisibleSections(prev => Math.min(prev + 1, 6))}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
                  >
                    <Plus size={20} />
                    Add Section {visibleSections + 1}
                  </button>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="mt-4 bg-gray-900 text-white px-6 py-2 rounded font-medium hover:bg-gray-800"
            >
              {editingId ? 'Update City Page' : 'Save City Page'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div>Loading pages...</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Cities List</h3>
            <div className="flex items-center gap-2">
              <label htmlFor="countryFilter" className="text-sm font-medium text-gray-700">Filter by Country:</label>
              <select
                id="countryFilter"
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm bg-white"
              >
                <option value="">All Countries</option>
                {[...new Set(pages.map(p => p.country).filter(Boolean))].map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SEO Title</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(filterCountry ? pages.filter(p => p.country === filterCountry) : pages).length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No city pages found.</td>
                </tr>
              ) : (
                (filterCountry ? pages.filter(p => p.country === filterCountry) : pages).map((page) => (
                  <tr key={page._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{page.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{page.country || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      <a href={`/${page.slug}`} target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">
                        /{page.slug}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-gray-500 truncate max-w-xs">{page.metaTitle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(page)} className="text-blue-600 hover:text-blue-900 mr-4">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(page._id)} className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <ImageCropperModal 
        isOpen={cropperOpen}
        onClose={() => setCropperOpen(false)}
        imageSrc={cropImageSrc}
        onCropComplete={handleCropComplete}
        aspect={3/4}
      />
    </div>
  );
}

