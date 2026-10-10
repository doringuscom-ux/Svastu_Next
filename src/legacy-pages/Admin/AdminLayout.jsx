'use client';
import React from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from '@/components/RouterShim';
import { LayoutDashboard, FileText, LogOut, Home } from 'lucide-react';

const AdminLayout = () => {
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('adminRole');
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-gray-800 flex items-center gap-2">
          <LayoutDashboard className="text-orange-500" />
          <span>S-Vastu Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link to="/admin/dashboard" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/dashboard') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
            <Home size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/city-pages" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/city-pages') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
            <FileText size={18} />
            <span>City Pages</span>
          </Link>
          <Link to="/admin/blog-pages" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/blog-pages') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
            <FileText size={18} />
            <span>Blog Pages</span>
          </Link>
          <Link to="/admin/gallery-pages" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/gallery-pages') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
            <FileText size={18} />
            <span>Gallery</span>
          </Link>
          <Link to="/admin/contact-pages" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/contact-pages') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
            <FileText size={18} />
            <span>Contact Leads</span>
          </Link>
          <Link to="/admin/seo-manager" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/seo-manager') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
            <FileText size={18} />
            <span>SEO Manager</span>
          </Link>
          {localStorage.getItem('adminRole') === 'admin' && (
            <Link to="/admin/users" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/users') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
              <FileText size={18} />
              <span>User Management</span>
            </Link>
          )}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 p-3 rounded text-white font-medium transition-colors">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

