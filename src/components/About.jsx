'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Star, Eye, Shield, Target, Check } from 'lucide-react';

const consultationImg = '/assets/consultation.png';

export default function About({ isCityPage = false }) {
  return (
    <div id="about" className="bg-white">
      {/* Mission & Vision Section */}
      <section className={`bg-white ${isCityPage ? 'pt-2 pb-10' : 'py-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isCityPage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-[#D4AF37] font-semibold tracking-widest uppercase mb-2">About Svastu</h3>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Transforming Spaces, Elevating Lives</h2>
                
                <div className="relative rounded-3xl bg-gradient-to-br from-[#D4AF37]/30 via-orange-50 to-amber-100/50 p-[1px] shadow-sm">
                  <div className="bg-white/90 backdrop-blur-md rounded-[23px] p-5 md:p-6 text-gray-700 text-sm md:text-base leading-relaxed relative overflow-hidden">
                    {/* Subtle dot pattern background */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                    
                    <div className="relative z-10">
                      <div className="relative float-right ml-5 md:ml-6 mb-4 mt-1 w-1/3 md:w-1/4 lg:w-1/5 group">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-2 bg-gradient-to-r from-orange-200 to-amber-100 rounded-full blur-lg opacity-70 -z-10 group-hover:opacity-100 transition-opacity duration-500"
                        ></motion.div>
                        <motion.img
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.03, rotate: -2 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          src={consultationImg}
                          alt="Vastu Consultation"
                          className="relative rounded-xl shadow-md object-cover ring-2 ring-white w-full transition-transform duration-500"
                        />
                      </div>
                      <p className="mb-3">
                        At Svastu, we believe that every space influences the people who live, work, and grow within it.
                      </p>
                      <p className="mb-3">Our approach combines the timeless principles of Vastu with systematic analysis, practical design thinking, and a deep understanding of how spatial planning impacts everyday life. Instead of relying on fear, superstition, or expensive remedies, we study the relationship between architecture, movement, natural elements, light, ventilation, orientation, and energy flow to identify opportunities for meaningful improvement.</p>
                      <p className="mb-3">Every recommendation is carefully tailored to the property, its purpose, and the people who use it. Whether it is a home, office, commercial establishment, or industrial project, our goal is to create spaces that support clarity, wellbeing, productivity, financial growth, and peace of mind.</p>
                      <p>We don’t simply suggest changes—we provide a structured roadmap for transforming spaces into environments that naturally support success.</p>
                      <div className="clear-both"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-[#D4AF37] font-semibold tracking-widest uppercase mb-2">About Svastu</h3>
                  <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Transforming Spaces, Elevating Lives</h2>
                  <div className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 space-y-4">
                    <p>At Svastu, we believe that every space influences the people who live, work, and grow within it.</p>
                    <p>Our approach combines the timeless principles of Vastu with systematic analysis, practical design thinking, and a deep understanding of how spatial planning impacts everyday life. Instead of relying on fear, superstition, or expensive remedies, we study the relationship between architecture, movement, natural elements, light, ventilation, orientation, and energy flow to identify opportunities for meaningful improvement.</p>
                    <p>Every recommendation is carefully tailored to the property, its purpose, and the people who use it. Whether it is a home, office, commercial establishment, or industrial project, our goal is to create spaces that support clarity, wellbeing, productivity, financial growth, and peace of mind.</p>
                    <p>We don’t simply suggest changes—we provide a structured roadmap for transforming spaces into environments that naturally support success.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/20 rounded-3xl transform rotate-3 scale-105"
                ></motion.div>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src={consultationImg}
                  alt="Vastu Consultation"
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px]"
                />
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Premium Vision & Mission Section - Hidden on City Pages */}
      {!isCityPage && (
        <section className="py-16 relative overflow-hidden bg-[#0B152A]">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -left-6 -top-8 text-8xl text-[#D4AF37]/5 font-serif font-black select-none pointer-events-none">01</div>
                <h3 className="text-[#D4AF37] tracking-[0.2em] text-sm font-semibold uppercase mb-4 flex items-center gap-4">
                  <span className="w-8 h-px bg-[#D4AF37]"></span> Our Vision
                </h3>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-6">
                  Redefining Vastu for the Modern World
                </h2>
                <div className="text-gray-300 text-lg leading-relaxed space-y-4 font-normal">
                  <p>By combining ancient cosmic wisdom with rigorous analytical thinking, we create spaces that deeply inspire wellbeing, prosperity, and purposeful living.</p>
                  <p>We envision a future where Vastu is recognised not as superstition, but as an intelligent, scientific framework for designing environments that positively influence the human experience.</p>
                </div>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl"
              >
                <div className="absolute -right-4 -bottom-4 text-8xl text-white/5 font-serif font-black select-none pointer-events-none">02</div>
                <h3 className="text-[#D4AF37] tracking-[0.2em] text-sm font-semibold uppercase mb-4 flex items-center gap-4">
                  <span className="w-8 h-px bg-[#D4AF37]"></span> Our Mission
                </h3>
                <p className="text-white text-xl md:text-2xl font-serif mb-6 leading-relaxed">
                  Delivering premium consultations through clarity, precision, and uncompromised integrity.
                </p>

                <ul className="space-y-4">
                  {[
                    "Providing practical, evidence-informed recommendations rather than fear-based advice.",
                    "Respecting architectural design while enhancing spatial energy.",
                    "Offering customised solutions instead of generic formulas.",
                    "Educating clients so they understand the reasoning behind every recommendation.",
                    "Creating healthier, more balanced environments that support long-term growth, happiness, and success."
                  ].map((text, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                      className="flex items-start gap-4 text-slate-300 group"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                      <span className="text-base md:text-lg leading-relaxed font-normal group-hover:text-white transition-colors">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </div>
        </section>
      )}


    </div>
  );
}

