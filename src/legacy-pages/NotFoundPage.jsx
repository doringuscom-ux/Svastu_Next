'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/components/RouterShim';
import { Home, Compass } from 'lucide-react';
import SeoMeta from '../components/SeoMeta';

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-20 lg:py-24">
      <SeoMeta pageName="404" />
      
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Compass size={120} className="text-orange-900 animate-spin-slow" />
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Oops! The Stars Are Misaligned
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-600 mb-10 max-w-lg mx-auto"
        >
          We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the Vastu here needs some correcting.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link 
            to="/" 
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg hover:scale-105"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <Link 
            to="/contact-us" 
            className="flex items-center gap-2 bg-white text-gray-800 border-2 border-gray-200 hover:border-orange-500 hover:text-orange-600 font-semibold px-8 py-4 rounded-full transition-all hover:shadow-md"
          >
            Contact Support
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

