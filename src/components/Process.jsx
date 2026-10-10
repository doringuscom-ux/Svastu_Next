'use client';

import { PhoneCall, Map, FileText, Sparkles } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      icon: <PhoneCall className="w-7 h-7" />,
      title: "Initial Consultation",
      description: "We begin with a detailed discussion about your space, the challenges you are facing, and your specific goals for the consultation."
    },
    {
      icon: <Map className="w-7 h-7" />,
      title: "Site Analysis",
      description: "Our experts visit your site or analyze your floor plans to map out the 16 Vastu zones and identify elemental imbalances."
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: "Custom Remedies",
      description: "You receive a comprehensive report with practical, non-destructive remedies like color therapy, mirrors, and specific object placements."
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "Energy Activation",
      description: "We guide you through the implementation of the remedies and follow up to ensure the positive energy flow is fully activated."
    }
  ];

  return (
    <section className="py-8 lg:py-10 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-8 relative">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] to-[#D4AF37]">Consultation Process</span>
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            A seamless, scientific, and transparent approach to harmonizing your environment and unlocking its true potential.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-stretch max-w-7xl mx-auto">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative group perspective-1000">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50 h-[350px] lg:h-full transform transition-all duration-700 ease-out group-hover:shadow-[#D4AF37]/30 group-hover:shadow-3xl">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop" 
                alt="Consultation Process" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-700"></div>
              
              <div className="absolute bottom-8 left-8 right-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <p className="font-serif italic text-2xl text-[#D4AF37] mb-2 drop-shadow-md">Expert Analysis</p>
                <p className="text-sm text-gray-100 max-w-xs leading-relaxed drop-shadow-sm">Precise measurements and calculations for optimal results in your space.</p>
              </div>
            </div>
            
            {/* Decorative blocks */}
            <div className="absolute -top-6 -left-6 w-40 h-40 border-t-4 border-l-4 border-[#D4AF37]/40 rounded-tl-[3rem] -z-10 transition-all duration-700 ease-out group-hover:-top-8 group-hover:-left-8 group-hover:border-[#D4AF37] group-hover:scale-105"></div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 border-b-4 border-r-4 border-[#D4AF37]/40 rounded-br-[3rem] -z-10 transition-all duration-700 ease-out group-hover:-bottom-8 group-hover:-right-8 group-hover:border-[#D4AF37] group-hover:scale-105"></div>
          </div>

          {/* Steps blocks */}
          <div className="w-full lg:w-1/2 relative pl-4 sm:pl-0">
            {/* Connecting line */}
            <div className="absolute left-[39px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#D4AF37]/80 via-[#D4AF37]/40 to-transparent hidden sm:block shadow-[0_0_8px_rgba(212,175,55,0.5)]"></div>
            
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div key={index} className="group relative flex flex-row gap-4 sm:gap-6 p-1 sm:p-0">
                  <div className="flex-shrink-0 relative z-10 pt-1">

                    
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center border border-gray-100 group-hover:border-[#D4AF37]/40 group-hover:shadow-[0_8px_30px_-4px_rgba(212,175,55,0.3)] transition-all duration-500 ease-out group-hover:-translate-y-2 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF9F1] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="text-[#D4AF37] relative z-10 transform group-hover:scale-110 group-hover:text-[#B8860B] transition-all duration-500 drop-shadow-sm">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-1 sm:pt-3 flex-1 transition-all duration-300 group-hover:translate-x-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 flex items-center group-hover:text-[#B8860B] transition-colors duration-300">
                      <span className="hidden sm:inline-block text-[#D4AF37]/70 mr-4 text-4xl font-black group-hover:text-[#B8860B] transition-colors duration-300">0{index + 1}</span> 
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base group-hover:text-gray-800 transition-colors duration-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}

