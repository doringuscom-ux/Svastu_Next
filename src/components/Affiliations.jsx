'use client';
import { motion } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';

export default function Affiliations() {
  const affiliations = [
    {
      icon: <Award className="w-8 h-8 text-[#D4AF37]" />,
      title: "INDIAN KAYAKING & CANOEING ASSOCIATION",
      subtitle: "( NATIONAL GOVERNING BODY )",
      location: "INDIA"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />,
      title: "HARYANA OLYMPIC ASSOCIATION",
      subtitle: "( STATE LEVEL BODY )",
      location: "HARYANA"
    }
  ];

  return (
    <section className="py-20 bg-[#0B1121] relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-widest uppercase">
            Our Affiliations
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full opacity-70"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {affiliations.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative rounded-[2rem] bg-[#0E1527] border border-white/5 overflow-hidden shadow-2xl flex flex-col h-full group"
            >
              {/* Glass Reflection Highlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="p-10 flex-1 flex flex-col items-center justify-center text-center relative z-10">
                
                {/* Icon with glowing backdrop */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[#D4AF37]/20 blur-xl rounded-full scale-150"></div>
                  <div className="relative z-10 w-20 h-20 rounded-full border border-[#D4AF37]/30 bg-[#0B1121]/50 backdrop-blur-sm flex items-center justify-center">
                    {item.icon}
                  </div>
                  {/* Small decorative dot */}
                  <div className="absolute -bottom-2 -left-4 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"></div>
                </div>

                <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide uppercase mb-4 leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-[#3b82f6] text-sm md:text-base font-bold tracking-[0.2em] mb-2 uppercase">
                  {item.subtitle}
                </p>
                
                <p className="text-gray-400 text-xs tracking-widest uppercase">
                  {item.location}
                </p>
                
              </div>

              {/* Bottom Affiliated With Tab */}
              <div className="mt-auto pt-4 relative">
                {/* Very subtle top border line separating the content */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                {/* The pill shape */}
                <div className="mx-6 mb-0 h-12 bg-[#1E293B]/50 rounded-t-3xl border-t border-x border-white/5 flex items-center justify-center backdrop-blur-md">
                  <span className="text-gray-500 italic font-semibold tracking-widest text-sm">affiliated with</span>
                </div>
              </div>
              
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

