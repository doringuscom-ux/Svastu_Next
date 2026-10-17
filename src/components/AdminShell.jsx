'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, LogOut, Home, Users, Image as ImageIcon, Mail, Settings } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { ADMIN_API } from '../utils/api';

const SESSION_REFRESH_MS = 60 * 60 * 1000;

const clearSession = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('adminRole');
};

export default function AdminLayout({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [role, setRole] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setAuthorized(true);
    setRole(localStorage.getItem('adminRole') || '');

    const expireSession = () => {
      clearSession();
      router.push('/admin/login?expired=1');
    };

    // Any 401 from our API means the token is no longer valid: send the admin to login
    // instead of leaving them on a page where every action silently fails.
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        const url = error.config?.url || '';
        if (error.response?.status === 401 && url.startsWith('/api/') && !url.startsWith(`${ADMIN_API}/login`)) {
          expireSession();
        }
        return Promise.reject(error);
      }
    );

    // Sliding session: swap the token for a fresh one now and every hour while the panel is open.
    // Only a 401 logs out; a network/server error keeps the current session.
    const refreshSession = async () => {
      try {
        const { data } = await axios.get(`${ADMIN_API}/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        localStorage.setItem('adminToken', data.token);
        if (data.role) {
          localStorage.setItem('adminRole', data.role);
          setRole(data.role);
        }
      } catch (err) {
        // 401 is handled by the interceptor above
      }
    };
    refreshSession();
    const timer = setInterval(refreshSession, SESSION_REFRESH_MS);

    return () => {
      axios.interceptors.response.eject(interceptor);
      clearInterval(timer);
    };
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push('/admin/login');
  };

  const isActive = (path) => pathname === path;

  if (!authorized) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0">
        <div className="p-6 text-xl font-bold border-b border-gray-800 flex items-center gap-2">
          <LayoutDashboard className="text-orange-500" />
          <span>S-Vastu Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          <Link href="/admin/dashboard" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/dashboard') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
            <Home size={18} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/city-pages" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/city-pages') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
            <FileText size={18} />
            <span>City Pages</span>
          </Link>
          <Link href="/admin/blog-pages" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/blog-pages') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
            <FileText size={18} />
            <span>Blog Pages</span>
          </Link>
          <Link href="/admin/gallery-pages" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/gallery-pages') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
            <ImageIcon size={18} />
            <span>Gallery</span>
          </Link>
          <Link href="/admin/contact-pages" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/contact-pages') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
            <Mail size={18} />
            <span>Contact Leads</span>
          </Link>
          <Link href="/admin/seo-manager" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/seo-manager') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
            <Settings size={18} />
            <span>SEO Manager</span>
          </Link>
          {role === 'admin' && (
            <Link href="/admin/users" className={`flex items-center gap-3 p-3 rounded transition-colors ${isActive('/admin/users') ? 'bg-orange-600' : 'hover:bg-gray-800'}`}>
              <Users size={18} />
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
        {children}
      </main>
    </div>
  );
}
