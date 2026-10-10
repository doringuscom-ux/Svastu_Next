'use client';
import React from 'react';

export default function CitySections({ pageData }) {
  if (!pageData) return null;

  const sections = [
    { data: pageData.section1, reverse: true },
    { data: pageData.section2, reverse: false },
    { data: pageData.section3, reverse: true },
    { data: pageData.section4, reverse: false },
    { data: pageData.section5, reverse: true },
    { data: pageData.section6, reverse: false }
  ];

  // Filter only sections that have actual content
  const activeSections = sections.filter(section => {
    const { topHeading, topSubHeading, heading, text, image } = section.data || {};
    return !!(topHeading || topSubHeading || heading || text || image);
  });

  if (activeSections.length === 0) return null;

  return (
    <div className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-orange-50/30">
      {/* Background Sacred Geometric Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#D4AF37 1.2px, transparent 1.2px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      {/* Ambient Glowing Orbs with Warm Multi-tone Depth */}
      <div className="absolute top-12 -left-20 w-[450px] h-[450px] bg-[#D4AF37]/15 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-20 w-[450px] h-[450px] bg-orange-200/25 rounded-full filter blur-[110px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-[550px] h-80 bg-[#D4AF37]/12 rounded-full filter blur-[120px] pointer-events-none"></div>

      {/* Geometric Shape 1: Concentric Gold Rings with Directional Dashes */}
      <div className="absolute -top-12 -right-12 w-88 h-88 rounded-full border border-[#D4AF37]/25 pointer-events-none flex items-center justify-center">
        <div className="w-64 h-64 rounded-full border border-dashed border-[#D4AF37]/35 flex items-center justify-center">
          <div className="w-44 h-44 rounded-full border border-[#D4AF37]/20 bg-amber-50/30 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-dotted border-[#D4AF37]/40" />
          </div>
        </div>
      </div>

      {/* Geometric Shape 2: Architectural Arch at Bottom Left */}
      <div className="absolute -bottom-20 -left-14 w-72 h-[420px] rounded-t-full border-2 border-[#D4AF37]/20 bg-gradient-to-t from-[#D4AF37]/10 via-amber-50/20 to-transparent pointer-events-none -rotate-12" />

      {/* Geometric Shape 3: Floating Sacred Ashtakon (8-pointed Diamond Star) */}
      <div className="absolute top-1/4 left-10 w-12 h-12 pointer-events-none">
        <div className="w-full h-full rotate-45 border border-[#D4AF37]/40 bg-[#D4AF37]/5 shadow-sm" />
        <div className="w-full h-full rotate-0 border border-[#D4AF37]/25 absolute inset-0" />
      </div>
      <div className="absolute top-2/3 right-10 w-16 h-16 rotate-12 border border-dashed border-[#D4AF37]/35 bg-amber-100/20 rounded-2xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-16 w-8 h-8 rounded-full border border-[#D4AF37]/30 bg-white/50 pointer-events-none shadow-sm" />

      {/* Architectural Crosshair Alignment Markers */}
      <div className="absolute top-8 left-8 text-[#D4AF37]/50 text-xl font-mono select-none pointer-events-none">+</div>
      <div className="absolute top-8 right-8 text-[#D4AF37]/50 text-xl font-mono select-none pointer-events-none">+</div>
      <div className="absolute bottom-8 left-8 text-[#D4AF37]/50 text-xl font-mono select-none pointer-events-none">+</div>
      <div className="absolute bottom-8 right-8 text-[#D4AF37]/50 text-xl font-mono select-none pointer-events-none">+</div>

      {/* Subtle Vastu Compass/Mandala Watermark SVG in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] pointer-events-none opacity-[0.038] text-[#D4AF37]">
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full animate-[spin_180s_linear_infinite]">
          <circle cx="100" cy="100" r="90" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="75" />
          <circle cx="100" cy="100" r="60" strokeDasharray="2 2" />
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="20" />
          <line x1="100" y1="10" x2="100" y2="190" />
          <line x1="10" y1="100" x2="190" y2="100" />
          <line x1="36.36" y1="36.36" x2="163.64" y2="163.64" />
          <line x1="36.36" y1="163.64" x2="163.64" y2="36.36" />
          <polygon points="100,15 105,30 95,30" fill="currentColor" />
          <polygon points="100,185 105,170 95,170" fill="currentColor" />
          <polygon points="15,100 30,105 30,95" fill="currentColor" />
          <polygon points="185,100 170,105 170,95" fill="currentColor" />
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-12 md:space-y-16">
          {activeSections.map((section, index) => {
            const { topHeading, topSubHeading, heading, text, image } = section.data || {};

            return (
              <div key={index} className="flex flex-col relative">
                
                {/* Elegant Section Divider with Gold Compass Star Motif */}
                {index > 0 && (
                  <div className="my-8 md:my-10 flex items-center justify-center gap-3 opacity-70">
                    <div className="h-px w-24 md:w-36 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                    <div className="relative flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-amber-50"></div>
                      <div className="w-1 h-1 rounded-full bg-[#D4AF37] absolute"></div>
                    </div>
                    <div className="h-px w-24 md:w-36 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                  </div>
                )}
                
                {/* Optional Center Header */}
                {(topHeading || topSubHeading) && (
                  <div className="text-center max-w-3xl mx-auto px-4 mb-6 md:mb-8">
                    {topHeading && (
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2 tracking-normal">
                        {topHeading}
                      </h2>
                    )}
                    {topSubHeading && (
                      <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {topSubHeading}
                      </p>
                    )}
                  </div>
                )}

                <div 
                  className={`flex flex-col ${image ? (section.reverse ? 'md:flex-row-reverse' : 'md:flex-row') : ''} gap-6 md:gap-8 lg:gap-12 md:items-stretch relative`}
                >
                  {/* Image Side with Glowing 3D Gold Accent Frame */}
                  {image && (
                    <div className="w-full md:w-5/12 flex flex-col relative group">
                      {/* Decorative Glowing Gold Accent Frame Behind Image */}
                      <div className={`absolute -inset-2.5 rounded-3xl border border-[#D4AF37]/45 bg-gradient-to-br from-[#D4AF37]/15 via-amber-50/60 to-[#D4AF37]/20 shadow-[0_10px_30px_-5px_rgba(212,175,55,0.2)] -z-0 transition-transform duration-500 group-hover:rotate-0 ${section.reverse ? 'rotate-1' : '-rotate-1'}`} />
                      
                      <div className="relative z-10 w-full h-full min-h-[260px] rounded-2xl overflow-hidden shadow-lg border border-gray-100/80 bg-white">
                        <img 
                          src={image} 
                          alt={heading || `Section ${index + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Text Side with Subtle Ghost Numeral Backdrop */}
                  <div className={`w-full ${image ? 'md:w-7/12' : 'w-full'} flex flex-col justify-center py-1 relative`}>
                    {/* Ghost Number Watermark (01, 02, 03...) */}
                    <span className="absolute -top-6 -left-3 md:-left-6 text-7xl md:text-8xl font-serif font-black text-amber-900/[0.035] select-none pointer-events-none tracking-tighter">
                      0{index + 1}
                    </span>

                    {heading && (
                      <div className="mb-3 relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-snug">
                          {heading}
                        </h2>
                        <div className="h-1 w-14 bg-[#D4AF37] rounded-full mt-2"></div>
                      </div>
                    )}
                    {text && (
                      <div 
                        className="city-user-content leading-relaxed relative z-10"
                        dangerouslySetInnerHTML={{ __html: text }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

