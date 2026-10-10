'use client';
import React from 'react';
import { Link } from './RouterShim';
import { motion } from 'framer-motion';
import { Home, Building2, Factory, Hash, Monitor, Map, Star } from 'lucide-react';
const numerologyImg = '/assets/7 nume.webp';

export default function Services({ hideHeader = false, layout = 'grid', showAllServices = false }) {
  const services = [
    {
      slug: "vastu-solution",
      icon: <Star className="w-10 h-10 text-white" />,
      title: "Vastu Solution",
      description: "Expert solutions for your home and office to positively influence the energy sources of the universe for harmony and prosperity.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
    },
    {
      slug: "vastu-for-house",
      icon: <Home className="w-10 h-10 text-white" />,
      title: "Residential Vastu",
      description: "Harmonize your home to attract health, wealth, and family peace. We analyze the placement of bedrooms, kitchens, and entrances to ensure optimal cosmic flow.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
    },
    {
      slug: "vastu-for-office",
      icon: <Building2 className="w-10 h-10 text-white" />,
      title: "Commercial Vastu",
      description: "Boost your business growth, employee productivity, and client retention by aligning your office, shop, or showroom with powerful Vastu principles.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
    },
    {
      slug: "industrial-vastu",
      icon: <Factory className="w-10 h-10 text-white" />,
      title: "Industrial Vastu",
      description: "Ensure smooth manufacturing processes, reduce machinery breakdowns, and maximize output by perfectly balancing the five elements in your factory.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
    },
    {
      slug: "numerology",
      icon: <Hash className="w-10 h-10 text-white" />,
      title: "Numerology Integration",
      description: "Combine the power of your numbers with Vastu. We provide personalized remedies based on your date of birth and planetary alignments.",
      image: numerologyImg
    },
    {
      slug: "online-consultation",
      icon: <Monitor className="w-10 h-10 text-white" />,
      title: "Online Consultation",
      description: "Get expert Vastu advice from anywhere in the world. We thoroughly analyze your floor plans and coordinate via video calls for accurate remedies.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
    },
    {
      slug: "vastu-for-land",
      icon: <Map className="w-10 h-10 text-white" />,
      title: "Vastu for Land/Plots",
      description: "Ensure the land you buy is highly auspicious. We check the soil, shape, slopes, and energy fields before you invest in your dream project.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop"
    }
  ];

  let displayedServices = services;
  if (!showAllServices) {
    displayedServices = services.filter(service => service.slug !== 'vastu-solution');
  }

  return (
    <section id="services" className={`bg-slate-50 relative ${hideHeader ? 'py-5' : 'py-12'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-8 mt-4">
            <span className="text-[#B8860B] font-serif italic tracking-wider text-2xl sm:text-3xl leading-none">Our Expertise</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-2 mb-4 leading-tight">
              Comprehensive <span className="text-[#B8860B]">Vastu Services</span>
            </h2>
            {/* <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full mb-2"></div> */}
          </div>
        )}

        {layout === 'grid' ? (
          <>
            {/* Desktop View: Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {displayedServices.map((service, index) => (
                <div key={index} className="group bg-white p-8 border border-dashed border-gray-300 hover:border-[#D4AF37] transition-colors duration-300 flex flex-col items-center text-center h-full">

                  {/* Double Dotted Icon Container */}
                  <div className="w-24 h-24 rounded-full border border-dashed border-gray-300 group-hover:border-[#D4AF37] flex items-center justify-center mb-6 transition-colors duration-300">
                    <div className="w-20 h-20 rounded-full border border-dashed border-gray-200 flex items-center justify-center group-hover:bg-[#D4AF37] transition-all duration-300">
                      <div className="text-[#B8860B] group-hover:text-white transition-colors duration-300">
                        {React.cloneElement(service.icon, { className: "w-8 h-8" })}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#B8860B] mb-4 uppercase tracking-wider transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">
                    {service.description}
                  </p>

                  {/* Action Link */}
                  <Link to={`/${service.slug}`} className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#B8860B] group-hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
                    <span>Read More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Link>

                </div>
              ))}
            </div>

            {/* Mobile View: Infinite Animated Marquee */}
            <div className="md:hidden overflow-hidden relative w-full flex py-2">
              <motion.div
                className="flex gap-4 px-2"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: displayedServices.length * 4, repeat: Infinity }}
                style={{ width: "fit-content" }}
              >
                {[...displayedServices, ...displayedServices].map((service, index) => (
                  <div key={`mobile-${index}`} className="bg-white p-6 border border-dashed border-gray-300 flex flex-col items-center text-center w-[280px] shrink-0">
                    <div className="w-20 h-20 rounded-full border border-dashed border-gray-300 flex items-center justify-center mb-5">
                      <div className="w-16 h-16 rounded-full border border-dashed border-gray-200 flex items-center justify-center">
                        <div className="text-[#B8860B]">
                          {React.cloneElement(service.icon, { className: "w-7 h-7" })}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider whitespace-normal">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5 whitespace-normal">
                      {service.description}
                    </p>
                    <Link to={`/${service.slug}`} className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#B8860B]">
                      <span>Read More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-8 lg:gap-12">
            {displayedServices.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`flex flex-col lg:flex-row gap-6 lg:gap-8 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

                  {/* Text Card */}
                  <div className="w-full lg:w-1/2 bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 flex flex-col justify-center hover:shadow-[0_20px_50px_rgba(212,175,55,0.08)] transition-all duration-300 relative overflow-hidden group">
                    {/* Subtle Background Accent */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mb-8 border border-[#D4AF37]/20 group-hover:bg-[#D4AF37] group-hover:shadow-[0_10px_20px_rgba(212,175,55,0.3)] transition-all duration-500">
                      <div className="text-[#B8860B] group-hover:text-white transition-colors duration-500">
                        {React.cloneElement(service.icon, { className: "w-8 h-8" })}
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#B8860B] transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-1">
                      {service.description}
                    </p>

                    <Link to={`/${service.slug}`} className="mt-auto flex items-center gap-2 text-sm font-bold text-[#B8860B] cursor-pointer w-fit border-b border-[#D4AF37]/30 pb-1 hover:border-[#D4AF37] transition-all duration-300">
                      <span>Explore Service</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Link>
                  </div>

                  {/* Image Card */}
                  <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto min-h-[320px] rounded-3xl overflow-hidden shadow-sm relative group">
                    <img
                      src={typeof service.image === 'string' ? (service.image.includes('unsplash') ? service.image.replace('w=800', 'w=600&q=70') : service.image) : (service.image?.src || '')}
                      alt={service.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Gentle overlay for premium feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

