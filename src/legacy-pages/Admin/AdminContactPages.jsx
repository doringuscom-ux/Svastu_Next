'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, MessageSquare, Clock, Phone, Mail, CheckCircle, Calendar, MailOpen, RotateCw } from 'lucide-react';
import { CONTACT_API } from '../../utils/api';

export default function AdminContactPages() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('All'); // 'All', 'Unread', 'Read'

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchContacts = async (isManual = false) => {
    try {
      if (isManual) setRefreshing(true);
      const { data } = await axios.get(CONTACT_API, getAuthHeaders());
      // Sort by newest first
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setContacts(sortedData);
    } catch (error) {
      console.error("Error fetching contacts", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`${CONTACT_API}/${id}`, getAuthHeaders());
        setContacts(contacts.filter(c => c._id !== id));
      } catch (error) {
        alert("Failed to delete");
      }
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`${CONTACT_API}/${id}`, { status: 'Resolved' }, getAuthHeaders());
      setContacts(contacts.map(c => c._id === id ? { ...c, status: 'Resolved' } : c));
    } catch (error) {
      alert("Failed to mark as read");
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const formatTime = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
  };

  const newMessagesCount = contacts.filter(c => c.status === 'New').length;
  
  const filteredContacts = contacts.filter(c => {
    if (filter === 'Unread') return c.status === 'New';
    if (filter === 'Read') return c.status !== 'New';
    return true;
  });

  if (loading) return <div className="p-8 text-gray-500 font-medium w-full">Loading messages...</div>;

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen p-6 -m-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Leads</h1>
          <p className="text-gray-500 text-sm mt-1">Manage inquiries submitted through the public Contact Us page.</p>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchContacts(true)}
              disabled={refreshing}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold text-sm border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-sm transition-all disabled:opacity-50"
              title="Refresh leads"
            >
              <RotateCw size={16} className={refreshing ? 'animate-spin text-blue-600' : ''} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>

            <button 
              onClick={() => setFilter(filter === 'Unread' ? 'All' : 'Unread')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm border shadow-sm transition-colors ${filter === 'Unread' ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100'}`}
            >
              <MailOpen size={18} />
              {newMessagesCount} New Messages
            </button>
          </div>
          
          <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
            {['All', 'Unread', 'Read'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${filter === f ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {filteredContacts.length === 0 ? (
        <div className="bg-white p-16 text-center rounded-xl shadow-sm border border-dashed border-gray-300 w-full">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No {filter !== 'All' ? filter.toLowerCase() : ''} contact inquiries found.</p>
        </div>
      ) : (
        <div className="space-y-6 w-full">
          {filteredContacts.map((contact) => {
            const isNew = contact.status === 'New';
            
            return (
              <div 
                key={contact._id} 
                className={`bg-white rounded-xl shadow-sm overflow-hidden w-full relative ${
                  !isNew && 'opacity-80 hover:opacity-100 transition-opacity'
                }`}
              >
                {/* Colored Left Border */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${isNew ? 'bg-blue-600' : 'bg-gray-300'}`}></div>

                <div className="p-6 pl-8">
                  {/* Top Section */}
                  <div className="flex justify-between items-start mb-6">
                    {/* Left: Avatar & Info */}
                    <div className="flex gap-4 items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${isNew ? 'bg-blue-600' : 'bg-gray-400'}`}>
                        {getInitials(contact.name)}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-lg font-bold text-gray-900 capitalize">{contact.name}</h2>
                          {isNew && (
                            <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                              New
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Mail size={14} className="text-gray-400" />
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-1.5">
                              <Phone size={14} className="text-gray-400" />
                              {contact.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Date, Time & Actions */}
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-[11px] text-gray-400 flex flex-col items-end gap-1 font-semibold uppercase tracking-wide">
                        <div className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(contact.createdAt)}</div>
                        <div className="flex items-center gap-1.5"><Clock size={12} /> {formatTime(contact.createdAt)}</div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {isNew ? (
                          <button 
                            onClick={() => markAsRead(contact._id)}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 hover:text-gray-900 bg-gray-100/80 hover:bg-gray-200 px-3 py-1.5 rounded transition-colors uppercase tracking-wider"
                          >
                            <CheckCircle size={14} /> Mark Read
                          </button>
                        ) : (
                          <button 
                            onClick={async () => {
                              try {
                                await axios.put(`${CONTACT_API}/${contact._id}`, { status: 'New' }, getAuthHeaders());
                                setContacts(contacts.map(c => c._id === contact._id ? { ...c, status: 'New' } : c));
                              } catch (e) {
                                alert("Failed to mark as unread");
                              }
                            }}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors uppercase tracking-wider"
                          >
                            <Mail size={14} /> Mark Unread
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(contact._id)}
                          className="flex items-center gap-1.5 text-[11px] font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-colors uppercase tracking-wider"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Message Section */}
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Message</span>
                    <div className="bg-[#f8fafc] rounded-lg p-4 border border-gray-100 text-gray-700 text-sm whitespace-pre-wrap leading-relaxed shadow-inner">
                      {contact.problem || "No message provided."}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

