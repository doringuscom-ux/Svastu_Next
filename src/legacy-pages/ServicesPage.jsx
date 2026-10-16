'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import Services from '../components/Services';

export default function ServicesPage() {
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
              Our{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#f8e8a0] to-[#D4AF37] bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                  Services
                </span>
                {/* Underline accent */}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37] to-[#D4AF37]/0 rounded-full" />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive range of Vastu solutions designed to bring{' '}
              <span className="text-[#D4AF37]/80 font-medium">prosperity</span>,{' '}
              <span className="text-[#D4AF37]/80 font-medium">health</span>, and{' '}
              <span className="text-[#D4AF37]/80 font-medium">harmony</span> to your spaces.
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

      {/* Services Component */}
      <Services hideHeader layout="zigzag" showAllServices={true} />

      {/* Call to Action */}
      <section className="py-16 bg-white border-t border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Need a Custom Vastu Plan?</h2>
          <p className="text-lg text-gray-500 mb-8">Connect with our experts today and embark on a journey towards harmony and prosperity.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(184, 134, 11, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              href="/#contact"
              className="inline-block bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold text-lg px-10 py-3.5 rounded-full shadow-lg transition-all"
            >
              Book a Consultation
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/about-us"
              className="inline-block border-2 border-[#D4AF37] text-[#B8860B] font-semibold text-lg px-10 py-3.5 rounded-full hover:bg-[#D4AF37]/5 transition-all"
            >
              About Us
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

