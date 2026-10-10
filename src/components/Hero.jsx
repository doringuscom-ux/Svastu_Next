'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Droplets, Flame, Wind, Sparkles, Phone, MessageCircle } from 'lucide-react';

export default function Hero() {
  const elements = [
    {
      icon: (
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
          <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-[#DCC197]" strokeWidth={1.5} />
        </motion.div>
      ),
      title: "Earth (Prithvi)",
      desc: "The foundation of stability and strength in your environment."
    },
    {
      icon: (
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <Droplets className="w-8 h-8 sm:w-10 sm:h-10 text-[#DCC197]" strokeWidth={1.5} />
        </motion.div>
      ),
      title: "Water (Jal)",
      desc: "Represents fluidity, emotions, and the flow of prosperity."
    },
    {
      icon: (
        <motion.div animate={{ scale: [1, 1.15, 1], rotate: [-3, 3, -3] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}>
          <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-[#DCC197]" strokeWidth={1.5} />
        </motion.div>
      ),
      title: "Fire (Agni)",
      desc: "The energy of transformation, passion, and illumination."
    },
    {
      icon: (
        <motion.div animate={{ x: [-3, 3, -3], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <Wind className="w-8 h-8 sm:w-10 sm:h-10 text-[#DCC197]" strokeWidth={1.5} />
        </motion.div>
      ),
      title: "Air (Vayu)",
      desc: "The breath of life, movement, and communication."
    },
    {
      icon: (
        <motion.div animate={{ rotate: [0, 180, 360], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#DCC197]" strokeWidth={1.5} />
        </motion.div>
      ),
      title: "Space (Akasha)",
      desc: "The container of all elements, representing expansion and connection."
    }
  ];

  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : true
  );

  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setActiveCardIndex(activeCardIndex === index ? null : index);
  };

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 1 }, // Changed from 0 to 1 for LCP
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 30 }, // Starting with opacity 1 for SEO/LCP
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden gap-8 sm:gap-12 bg-[#1E242C]">
      
      <style>{`
        @keyframes mobileMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-mobile-marquee {
          animation: mobileMarquee 20s linear infinite;
        }
      `}</style>

      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover opacity-80"
          src="/hero-video.mp4"
        />
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=60&w=600&auto=format&fit=crop"
          alt="Hero Background"
          className="block md:hidden w-full h-full object-cover opacity-60"
        />
        {/* Simple dark overlay to make text readable */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center py-4 sm:py-6 flex-shrink-0"
      >
        <motion.p
          variants={itemVariants}
          className="text-[#DCC197] font-medium text-xs sm:text-sm md:text-base mt-4 mb-2 sm:mb-3 drop-shadow-md uppercase tracking-[0.15em] sm:tracking-[0.2em]"
        >
          Trusted Vastu Consultant
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 sm:mb-8 leading-tight drop-shadow-2xl"
        >
          Welcome to <br className="block sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCC197] to-[#FCEABB] italic font-semibold">S-Vastu Solution</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-normal drop-shadow-md tracking-wide leading-relaxed px-2"
        >
          Align your space with natural forces to attract peace, prosperity, and positive vibrations.
        </motion.p>


      </motion.div>

      {/* Bottom 5 Elements Flip Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="relative z-20 w-full px-4 flex-shrink-0"
      >
        {/* Desktop View */}
        <div className="hidden sm:flex max-w-7xl mx-auto flex-wrap justify-center gap-4 sm:gap-6">
          {elements.map((item, i) => (
            <div
              key={i}
              className="group h-48 sm:h-56 w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)] max-w-[260px] [perspective:1000px] cursor-pointer"
            >
              <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* Front Side (Glassmorphism) */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center bg-black/40 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl antialiased">
                  <div className="w-16 h-16 rounded-full border border-dashed border-gray-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <div className="transform scale-90">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-xs md:text-sm uppercase tracking-[0.15em] text-center mb-3">
                    {item.title}
                  </h3>
                  <div className="w-6 h-px bg-[#DCC197] mb-3"></div>
                  <p className="text-white text-[9px] tracking-[0.2em] uppercase opacity-80">
                    Hover for Info
                  </p>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center bg-[#1E242C]/95 backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)] border border-[#DCC197]/30 rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_30px_rgba(220,193,151,0.15)] antialiased">
                  <div className="transform scale-75 mb-2 opacity-80">
                    {item.icon}
                  </div>
                  <h3 className="text-[#DCC197] font-bold text-xs md:text-sm uppercase tracking-[0.15em] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-[11px] md:text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Infinite Animated Marquee */}
        <div className="sm:hidden overflow-hidden relative w-full flex py-2">
          <div
            className="flex gap-4 px-2 animate-mobile-marquee"
            style={{ width: "fit-content", animationPlayState: activeCardIndex !== null ? 'paused' : 'running' }}
          >
            {[...elements, ...elements].map((item, index) => {
              const originalIndex = index % elements.length;
              const isActive = activeCardIndex === originalIndex;
              
              return (
                <div
                  key={`mobile-${index}`}
                  className="group h-40 w-[160px] shrink-0 [perspective:1000px] cursor-pointer"
                  onClick={() => handleCardClick(originalIndex)}
                >
                  <div className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${isActive ? '[transform:rotateY(180deg)]' : ''}`}>

                    {/* Front Side */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center bg-black/60 border border-white/10 rounded-2xl p-3 shadow-xl antialiased">
                      <div className="w-12 h-12 rounded-full border border-dashed border-gray-400 flex items-center justify-center mb-3">
                        <div className="transform scale-75">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.15em] text-center mb-2">
                        {item.title}
                      </h3>
                      <div className="w-6 h-px bg-[#DCC197] mb-2"></div>
                      <p className="text-white text-[7.5px] tracking-[0.2em] uppercase opacity-80">
                        Tap for Info
                      </p>
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center bg-[#1E242C]/95 border border-[#DCC197]/30 rounded-2xl p-3 text-center shadow-lg antialiased">
                      <div className="transform scale-50 mb-1 opacity-80">
                        {item.icon}
                      </div>
                      <h3 className="text-[#DCC197] font-bold text-[10px] uppercase tracking-[0.15em] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-[9px] leading-relaxed line-clamp-3">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-12 w-full px-4 sm:px-0">
          <motion.a
            title="Call Now"
            href="tel:+919817755699"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-[#DCC197] text-[#1E242C] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase px-6 py-4 sm:px-8 sm:py-5 hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_30px_rgba(220,193,151,0.3)] rounded-sm w-full sm:w-[260px] justify-center"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            Call Now
          </motion.a>
          
          <motion.a
            title="WhatsApp Now"
            href="https://wa.me/919817755699"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-transparent border border-[#DCC197] text-[#DCC197] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase px-6 py-4 sm:px-8 sm:py-5 hover:bg-[#DCC197] hover:text-[#1E242C] hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_30px_rgba(220,193,151,0.1)] rounded-sm w-full sm:w-[260px] justify-center"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            WhatsApp Now
          </motion.a>
        </div>
      </motion.div>

    </div>
  );
}


