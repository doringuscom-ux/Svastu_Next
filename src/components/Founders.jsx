'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
const nareshImage = '/assets/ER. Naresh Kumar.webp';
const supriyaImage = '/assets/ER. Supriya.webp';

export default function Founders() {
  return (
    <section className="pt-10 pb-24 bg-[#0B152A] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-[#D4AF37] font-serif tracking-[0.2em] uppercase text-sm mb-4 block">Our Visionaries</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Meet the Experts
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
        </motion.div>

        <div className="space-y-12">
          
          {/* Founder 1: ER. Naresh Kumar */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative bg-[#131F3B]/40 backdrop-blur-xl border border-white/5 hover:border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 lg:p-12 transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]"
          >
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
              
              {/* Image Container */}
              <div className="w-full lg:w-2/5 flex justify-center">
                <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden p-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/40 to-transparent opacity-50 rounded-2xl"></div>
                  <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-2xl"></div>
                  <img 
                    src={nareshImage} 
                    alt="Er. Naresh Kumar" 
                    className="w-full h-full object-cover rounded-xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Decorative corner */}
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]"></div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]"></div>
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full lg:w-3/5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6">
                  <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                  <span className="text-[10px] sm:text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">36+ Years Experience</span>
                </div>
                
                <h4 className="text-[#D4AF37] font-serif italic text-2xl mb-2">Expert Vastu Consultant</h4>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                  ER. <span className="text-[#94A3B8]">Naresh Kumar</span>
                </h3>
                
                <div className="space-y-4 text-gray-200 text-base sm:text-lg leading-relaxed font-normal">
                  <p>
                    A highly experienced Vastu Shastra expert and qualified Civil Engineer. With a profound understanding of architectural science and traditional Vastu principles, he has transformed countless living and working spaces.
                  </p>
                  <p>
                    His practical approach ensures that every structure aligns with positive cosmic energy—bringing prosperity, peace, and success without compromising on modern architectural aesthetics.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Founder 2: ER. Supriya */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative bg-[#131F3B]/40 backdrop-blur-xl border border-white/5 hover:border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 lg:p-12 transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]"
          >
            <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-16 items-center">
              
              {/* Image Container */}
              <div className="w-full lg:w-2/5 flex justify-center">
                <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden p-2">
                  <div className="absolute inset-0 bg-gradient-to-bl from-[#D4AF37]/40 to-transparent opacity-50 rounded-2xl"></div>
                  <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-2xl"></div>
                  <img 
                    src={supriyaImage} 
                    alt="Er. Supriya" 
                    className="w-full h-full object-cover rounded-xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Decorative corner */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]"></div>
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]"></div>
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full lg:w-3/5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6">
                  <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                  <span className="text-[10px] sm:text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">Vedic Vastu & Nutrology</span>
                </div>
                
                <h4 className="text-[#D4AF37] font-serif italic text-2xl mb-2">Advanced Wellness Expert</h4>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                  ER. <span className="text-[#94A3B8]">Supriya</span>
                </h3>
                
                <div className="space-y-4 text-gray-200 text-base sm:text-lg leading-relaxed font-normal">
                  <p>
                    Holding an M.Tech degree alongside a PG Diploma in Vedic Vastu and a specialized qualification in Nutrology.
                  </p>
                  <p>
                    With over 5 years of dedicated experience, she masterfully blends the ancient wisdom of Vedic Vastu with modern lifestyle and nutrology, guiding individuals to achieve perfectly balanced living spaces and holistic well-being.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

