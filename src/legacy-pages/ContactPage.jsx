'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';
import Contact from '../components/Contact';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-[#0B152A] pt-16 pb-10 sm:pt-20 sm:pb-12 overflow-hidden">
        {/* Animated glowing blobs */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -25, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 -left-40 w-[500px] h-[500px] bg-[#D4AF37] rounded-full mix-blend-screen filter blur-[120px] opacity-15 pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 25, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-[#38bdf8] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none"
        />
        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-white mb-5 leading-tight tracking-tight">
              Get in{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#f8e8a0] to-[#D4AF37]">
                  Touch
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37] to-[#D4AF37]/0 rounded-full" />
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Reach out to schedule a{' '}
              <span className="text-[#D4AF37]/80 font-medium">consultation</span>{' '}
              and bring perfect Vastu harmony to your home or workspace.
            </p>
            {/* Divider */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/50 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/50 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Component */}
      <Contact />
    </div>
  );
}

