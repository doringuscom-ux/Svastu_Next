'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Star, Eye, Shield, Target, Check, X } from 'lucide-react';
import Founders from '../components/Founders';
const consultationImg = '/assets/consultation.png';
import SeoMeta from '../components/SeoMeta';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50 flex flex-col">
      <SeoMeta pageName="about" />
      {/* Hero Section */}
      <section className="relative bg-[#0B152A] pt-12 pb-12 sm:pt-16 sm:pb-16 overflow-hidden">
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
              About{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#f8e8a0] to-[#D4AF37]">
                  Us
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37] to-[#D4AF37]/0 rounded-full" />
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Bridging{' '}
              <span className="text-[#D4AF37]/80 font-medium">ancient cosmic wisdom</span>{' '}
              with modern living to create spaces of profound harmony, prosperity, and joy.
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

      {/* Mission & Vision Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* Premium Vision & Mission Section */}
      <section className="py-10 relative overflow-hidden bg-[#0B152A]">
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

      {/* Our Approach Section */}
      <section className="py-10 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <h3 className="text-[#D4AF37] font-semibold tracking-widest uppercase mb-2">Our Approach</h3>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Spatial Intelligence Framework™️</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Unlike conventional Vastu consultations that often rely on a checklist of dos and don’ts, our methodology follows a structured analytical process.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="text-5xl font-black text-[#D4AF37]/60 mb-4">01</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Space Analysis</h4>
              <p className="text-gray-600 leading-relaxed">
                We study the complete layout, orientation, functional zoning, circulation patterns, natural light, ventilation, surrounding influences, and the interaction of the five elements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="text-5xl font-black text-[#D4AF37]/60 mb-4">02</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Energy Mapping</h4>
              <p className="text-gray-600 leading-relaxed">
                Every room serves a purpose. We analyse how the distribution of spaces aligns with the intended activities and identify energetic imbalances that may affect wellbeing, relationships, productivity, or business performance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="text-5xl font-black text-[#D4AF37]/60 mb-4">03</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Root Cause Identification</h4>
              <p className="text-gray-600 leading-relaxed">
                Instead of treating visible symptoms, we identify the underlying spatial factors that may be contributing to challenges in your life or business, addressing issues at their source.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="text-5xl font-black text-[#D4AF37]/60 mb-4">04</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Practical Optimisation</h4>
              <p className="text-gray-600 leading-relaxed">
                Our recommendations prioritise practical adjustments and intelligent space planning. Structural modifications are suggested only when genuinely necessary.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="text-5xl font-black text-[#D4AF37]/60 mb-4">05</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Personal Alignment</h4>
              <p className="text-gray-600 leading-relaxed">
                Where appropriate, we consider the occupants’ goals and lifestyle to ensure the space supports their individual aspirations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We're Different Section */}
      <section className="py-10 bg-[#0B152A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-4">Why We’re Different</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 relative mt-10">
            {/* Animated Pulsing VS Badge */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-30 items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-[#D4AF37] rounded-full blur-md"
              />
              <div className="relative w-full h-full bg-[#0B152A] rounded-full border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <span className="text-[#D4AF37] font-black italic text-xl">VS</span>
              </div>
            </div>

            {/* Most Consultants */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-md opacity-70 hover:opacity-100 transition-all duration-500 hover:shadow-2xl"
            >
              <h3 className="text-xl font-bold text-slate-400 mb-6 pb-4 border-b border-white/10 text-center md:text-left tracking-wide">
                Most Vastu Consultants
              </h3>
              <ul className="space-y-4">
                {[
                  "Follow fixed, rigid rules",
                  "One-size-fits-all recommendations",
                  "Focus mainly on directions",
                  "Recommend expensive remedies",
                  "Fear-based consultation",
                  "Explain what is wrong"
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className="flex items-start gap-3 text-slate-400 text-[15px]"
                  >
                    <div className="p-1 rounded-full bg-red-500/10 mt-0.5 shrink-0">
                      <X className="w-4 h-4 text-red-500/80" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Svastu */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="bg-gradient-to-br from-[#1a2942] via-[#0B152A] to-[#D4AF37]/20 border border-[#D4AF37]/50 p-6 md:p-8 rounded-3xl backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.2)] relative z-10 transform md:scale-105 hover:shadow-[0_0_60px_rgba(212,175,55,0.3)] transition-all duration-500 overflow-hidden"
            >
              {/* Inner animated glow */}
              <motion.div
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D4AF37]/20 to-transparent pointer-events-none"
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>

              <h3 className="text-2xl font-bold mb-6 pb-4 border-b border-[#D4AF37]/20 text-center md:text-left flex justify-center md:justify-start items-center gap-2">
                <Star className="w-6 h-6 text-[#D4AF37] fill-current drop-shadow-[0_0_5px_rgba(212,175,55,0.8)]" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#f8e8a0] to-[#D4AF37] animate-pulse">
                  The Svastu Way
                </span>
              </h3>
              <ul className="space-y-4 relative z-10">
                {[
                  "Scientific observation with traditional wisdom",
                  "Property-specific analysis",
                  "Focus on complete spatial dynamics",
                  "Practical solutions before remedies",
                  "Education instead of fear",
                  "Explain why a recommendation works",
                  "Balance architecture, functionality, and energy",
                  "Premium consultation backed by systematic analysis"
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                    className="flex items-start gap-3 text-slate-100 text-[15px] font-medium"
                  >
                    <div className="p-1 rounded-full bg-[#D4AF37]/20 mt-0.5 shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Core Philosophy */}
      <section className="py-[70px] relative overflow-hidden bg-[#050A15]">
        {/* Deep animated glow in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative bg-white/5 border border-white/10 p-10 md:p-16 rounded-3xl backdrop-blur-xl shadow-2xl"
          >
            {/* Floating Quote Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] border-4 border-[#050A15]">
              <span className="text-[#050A15] text-5xl font-serif font-black leading-none mt-5">"</span>
            </div>

            <h3 className="text-[#D4AF37] font-bold tracking-widest uppercase mb-8 mt-4 text-sm md:text-base">
              Our Core Philosophy
            </h3>

            <p className="text-xl md:text-3xl font-serif text-slate-200 leading-relaxed mb-8">
              "A building does not change your destiny. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#f8e8a0] font-bold">
                It shapes the environment
              </span>{' '}
              in which your decisions, emotions, relationships, health, and opportunities unfold."
            </p>

            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-slate-500 to-transparent mx-auto mb-8"></div>

            <p className="text-base md:text-lg text-slate-400 font-medium tracking-wide">
              When the environment supports you, <span className="text-white">life often becomes easier to navigate.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
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
        </div>
      </section>

      {/* Founders Section */}
      <Founders />

      {/* Call to Action */}
      <section className="py-10 bg-white border-t border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Ready to Transform Your Space?</h2>
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
              href="/services"
              className="inline-block border-2 border-[#D4AF37] text-[#B8860B] font-semibold text-lg px-10 py-3.5 rounded-full hover:bg-[#D4AF37]/5 transition-all"
            >
              Explore Services
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

