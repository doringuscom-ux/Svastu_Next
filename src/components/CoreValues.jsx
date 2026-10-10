'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Star, Shield } from 'lucide-react';

export default function CoreValues() {
  return (
    <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-12"
        >
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Core Values</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </motion.div>

        {/* Desktop View: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-10">
          {[
            { icon: Shield, title: "Integrity", desc: "Honest and transparent guidance without fear-mongering." },
            { icon: Star, title: "Excellence", desc: "Highest standards of service and profound expertise." },
            { icon: Compass, title: "Authenticity", desc: "Rooted in classical texts, adapted for modern architecture." }
          ].map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl cursor-pointer"
            >
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <value.icon className="w-8 h-8 text-[#B8860B]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile View: Infinite Animated Marquee */}
        <div className="md:hidden overflow-hidden relative w-full flex py-4">
          <motion.div
            className="flex gap-4 px-2"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 15, repeat: Infinity }}
            style={{ width: "fit-content" }}
          >
            {[
              { icon: Shield, title: "Integrity", desc: "Honest and transparent guidance without fear-mongering." },
              { icon: Star, title: "Excellence", desc: "Highest standards of service and profound expertise." },
              { icon: Compass, title: "Authenticity", desc: "Rooted in classical texts, adapted for modern architecture." },
              // Duplicate the set for seamless looping
              { icon: Shield, title: "Integrity", desc: "Honest and transparent guidance without fear-mongering." },
              { icon: Star, title: "Excellence", desc: "Highest standards of service and profound expertise." },
              { icon: Compass, title: "Authenticity", desc: "Rooted in classical texts, adapted for modern architecture." }
            ].map((value, i) => (
              <div
                key={`mobile-${i}`}
                className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 w-[260px] shrink-0"
              >
                <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <value.icon className="w-7 h-7 text-[#B8860B]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-normal">{value.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

