'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PAGES_API, BLOGS_API, GALLERY_API, CONTACT_API } from '../../utils/api';
import { MapPin, BookOpen, Image as ImageIcon, MessageSquare, Loader } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pagesTotal: 0,
    pagesSeoDone: 0,
    pagesSeoMissing: 0,
    
    blogsTotal: 0,
    blogsPublished: 0,
    blogsDraft: 0,
    
    galleryTotal: 0,
    
    contactsTotal: 0,
    contactsNew: 0,
    contactsContacted: 0,
    contactsResolved: 0
  });
  
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [pagesRes, blogsRes, galleryRes, contactRes] = await Promise.all([
          axios.get(PAGES_API, getAuthHeaders()).catch(() => ({ data: [] })),
          axios.get(`${BLOGS_API}?all=true`, getAuthHeaders()).catch(() => ({ data: [] })),
          axios.get(GALLERY_API, getAuthHeaders()).catch(() => ({ data: [] })),
          axios.get(CONTACT_API, getAuthHeaders()).catch(() => ({ data: [] }))
        ]);

        const pages = pagesRes.data || [];
        const blogs = blogsRes.data || [];
        const gallery = galleryRes.data || [];
        const contacts = contactRes.data || [];

        setStats({
          pagesTotal: pages.length,
          pagesSeoDone: pages.filter(p => p.metaTitle && p.metaDescription).length,
          pagesSeoMissing: pages.filter(p => !p.metaTitle || !p.metaDescription).length,
          
          blogsTotal: blogs.length,
          blogsPublished: blogs.filter(b => b.isPublished).length,
          blogsDraft: blogs.filter(b => !b.isPublished).length,
          
          galleryTotal: gallery.length,
          
          contactsTotal: contacts.length,
          contactsNew: contacts.filter(c => c.status === 'New' || !c.status).length,
          contactsContacted: contacts.filter(c => c.status === 'Contacted').length,
          contactsResolved: contacts.filter(c => c.status === 'Resolved').length
        });
      } catch (error) {
        console.error('Error fetching stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Data for Charts
  const pagesData = [
    { name: 'SEO Optimized', value: stats.pagesSeoDone, color: '#10b981' },
    { name: 'SEO Missing', value: stats.pagesSeoMissing, color: '#ef4444' }
  ];

  const blogsData = [
    { name: 'Published', value: stats.blogsPublished, color: '#3b82f6' },
    { name: 'Drafts', value: stats.blogsDraft, color: '#f59e0b' }
  ];

  const contactsData = [
    { name: 'New/Pending', value: stats.contactsNew, color: '#ef4444' },
    { name: 'Contacted', value: stats.contactsContacted, color: '#f59e0b' },
    { name: 'Resolved', value: stats.contactsResolved, color: '#10b981' }
  ];



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">Comprehensive data reports with visual breakdowns.</p>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <Loader className="w-10 h-10 text-orange-500 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Loading your dashboard report...</p>
        </div>
      ) : (
        <>
          {/* Top Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">City Pages</p>
                <p className="text-4xl font-extrabold mt-2 text-blue-900">{stats.pagesTotal}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-full">
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Blog Posts</p>
                <p className="text-4xl font-extrabold mt-2 text-green-900">{stats.blogsTotal}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-full">
                <BookOpen className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Gallery Images</p>
                <p className="text-4xl font-extrabold mt-2 text-purple-900">{stats.galleryTotal}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-full">
                <ImageIcon className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact Leads</p>
                <p className="text-4xl font-extrabold mt-2 text-orange-900">{stats.contactsTotal}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-full">
                <MessageSquare className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            
            {/* Contacts Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-2 mb-6 w-full pb-4 border-b border-gray-50">
                <div className="bg-orange-100 p-2 rounded-lg"><MessageSquare className="w-5 h-5 text-orange-600" /></div>
                <h2 className="text-lg font-bold text-gray-800">Contact Queries</h2>
              </div>
              <div className="h-64 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={contactsData} 
                      cx="50%" cy="50%" 
                      innerRadius={70} 
                      outerRadius={90} 
                      dataKey="value"
                      stroke="none"
                      paddingAngle={5}
                    >
                      {contactsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                      itemStyle={{ color: '#374151' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
                  <span className="text-3xl font-black text-gray-800">{stats.contactsTotal}</span>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Total</span>
                </div>
              </div>
            </div>

            {/* Pages SEO Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-2 mb-6 w-full pb-4 border-b border-gray-50">
                <div className="bg-blue-100 p-2 rounded-lg"><MapPin className="w-5 h-5 text-blue-600" /></div>
                <h2 className="text-lg font-bold text-gray-800">City Pages SEO</h2>
              </div>
              <div className="h-64 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={pagesData} 
                      cx="50%" cy="50%" 
                      innerRadius={70} 
                      outerRadius={90} 
                      dataKey="value"
                      stroke="none"
                      paddingAngle={5}
                    >
                      {pagesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                      itemStyle={{ color: '#374151' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
                  <span className="text-3xl font-black text-gray-800">{stats.pagesTotal}</span>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Pages</span>
                </div>
              </div>
            </div>

            {/* Blogs Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-2 mb-6 w-full pb-4 border-b border-gray-50">
                <div className="bg-green-100 p-2 rounded-lg"><BookOpen className="w-5 h-5 text-green-600" /></div>
                <h2 className="text-lg font-bold text-gray-800">Blog Status</h2>
              </div>
              <div className="h-64 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={blogsData} 
                      cx="50%" cy="50%" 
                      innerRadius={70} 
                      outerRadius={90} 
                      dataKey="value"
                      stroke="none"
                      paddingAngle={5}
                    >
                      {blogsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                      itemStyle={{ color: '#374151' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
                  <span className="text-3xl font-black text-gray-800">{stats.blogsTotal}</span>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Blogs</span>
                </div>
              </div>
            </div>

          </div>
          
        </>
      )}
    </div>
  );
}

