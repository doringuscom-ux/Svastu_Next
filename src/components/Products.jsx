'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
const remediesImage = '/assets/REMDIES.jpeg';

export default function Products() {
  return (
    <section className="py-20 bg-[#f4f5f8] overflow-hidden" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4B619B] mb-8 leading-tight">
              Powerful Vastu Products &ndash; Energize Your Space
            </h2>
            
            <p className="text-gray-800 text-lg mb-6 leading-relaxed">
              In addition to consultancy, we also offer a wide range of carefully curated <strong>Vastu Products</strong> to help you activate specific energy centers in your home or office. Our collection includes:
            </p>
            
            <ul className="space-y-3 mb-8 ml-2">
              {[
                "Vastu pyramids",
                "Energy-balancing yantras",
                "Vastu salt",
                "Directional compasses",
                "Crystals and gemstones",
                "Feng Shui items with Vastu benefits"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  className="flex items-center text-gray-800 text-lg"
                >
                  <span className="w-2 h-2 rounded-full bg-[#4B619B] mr-4 flex-shrink-0"></span>
                  {item}
                </motion.li>
              ))}
            </ul>
            
            <p className="text-gray-800 text-lg leading-relaxed">
              Each product is chosen for its proven ability to correct energy imbalances and support Vastu remedies, especially for clients looking for non-intrusive, easy-to-use options.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 px-8 py-3 bg-[#4B619B] text-white rounded-full font-semibold hover:bg-[#3A4B7A] transition-colors shadow-lg flex items-center gap-2"
            >
              Explore Products <ArrowRight size={20} />
            </motion.button>
          </motion.div>
          
          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full w-full">
              {/* Optional background glow/decoration */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#4B619B]/20 to-transparent z-10 pointer-events-none"></div>
              
              <img 
                src={remediesImage} 
                alt="Vastu Products on display" 
                className="w-full h-auto max-h-[600px] object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1596484552834-6a58f850d0d1?q=80&w=1000&auto=format&fit=crop"; 
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

