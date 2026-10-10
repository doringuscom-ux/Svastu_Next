'use client';
import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from '@/components/RouterShim';
import { Home, Building2, Factory, Hash, Monitor, Map, ArrowLeft, CheckCircle2, Phone, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// Using the same data structure from Services.jsx but enriched with more details
const servicesData = {
  'vastu-solution': {
    title: 'Vastu Solution',
    icon: <Star className="w-12 h-12 text-white" />,
    shortDesc: 'Expert solutions for your home and office to positively influence the energy sources of the universe.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    overview: 'At S-Vastu Solution, we offer expert consulting to balance the five natural elements in your living or working spaces. Our mission is to align your environment with cosmic energies, ensuring harmony, financial success, and emotional well-being.',
    benefits: [
      'Enhanced Health and Vitality',
      'Improved Financial Stability',
      'Harmonious Relationships',
      'Increased Productivity and Success',
      'Spiritual and Mental Clarity'
    ],
    features: [
      { title: 'Energy Alignment', desc: 'Balancing the 5 natural elements.' },
      { title: 'Detailed Analysis', desc: 'In-depth study of your property layout.' },
      { title: 'Space Optimization', desc: 'Proper placement for maximum positivity.' },
      { title: 'Custom Remedies', desc: 'Personalized solutions for your space.' }
    ]
  },
  'vastu-for-house': {
    title: 'Residential Vastu',
    icon: <Home className="w-12 h-12 text-white" />,
    shortDesc: 'Harmonize your home to attract health, wealth, and family peace.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop',
    overview: 'Your home is your sanctuary. Our Residential Vastu services are designed to align your living space with cosmic energies, ensuring peace, prosperity, and positivity for you and your family.',
    benefits: [
      'Improved family relationships and harmony',
      'Better health and reduced stress levels',
      'Financial stability and career growth',
      'Enhanced positive energy (Prana) flow'
    ],
    features: [
      { title: 'Entrance Analysis', desc: 'Determining the most auspicious direction for your main door.' },
      { title: 'Kitchen Placement', desc: 'Aligning the fire element for health and wealth.' },
      { title: 'Bedroom Vastu', desc: 'Ensuring restful sleep and strong relationships.' }
    ]
  },
  'vastu-for-office': {
    title: 'Commercial Vastu',
    icon: <Building2 className="w-12 h-12 text-white" />,
    shortDesc: 'Boost your business growth, employee productivity, and client retention.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
    overview: 'Success in business depends on the flow of energy in your workspace. Our Commercial Vastu solutions optimize your office, retail store, or showroom to attract wealth and smooth operations.',
    benefits: [
      'Increased sales and revenue',
      'Higher employee productivity and retention',
      'Better brand reputation',
      'Smooth conflict resolution'
    ],
    features: [
      { title: 'Seating Arrangement', desc: 'Optimal placement for directors and staff.' },
      { title: 'Cash Counter Placement', desc: 'Attracting and retaining wealth.' },
      { title: 'Meeting Rooms', desc: 'Fostering successful negotiations.' }
    ]
  },
  'industrial-vastu': {
    title: 'Industrial Vastu',
    icon: <Factory className="w-12 h-12 text-white" />,
    shortDesc: 'Ensure smooth manufacturing processes and reduce machinery breakdowns.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop',
    overview: 'Factories and industries involve heavy machinery and massive energy flow. Balancing the five elements here is critical to prevent accidents and maximize production output.',
    benefits: [
      'Maximized production output',
      'Reduced machinery breakdowns and accidents',
      'Better labor relations',
      'Quality improvement in products'
    ],
    features: [
      { title: 'Heavy Machinery Placement', desc: 'Grounding heavy energies in the right zones.' },
      { title: 'Raw Material Storage', desc: 'Ensuring smooth supply chain flow.' },
      { title: 'Finished Goods', desc: 'Accelerating sales and dispatch.' }
    ]
  },
  'numerology': {
    title: 'Numerology Integration',
    icon: <Hash className="w-12 h-12 text-white" />,
    shortDesc: 'Combine the power of your numbers with Vastu for personalized remedies.',
    image: 'https://images.unsplash.com/photo-1590845947698-8924d7409b56?q=80&w=2000&auto=format&fit=crop',
    overview: 'Your birth date holds the key to your destiny. By integrating Numerology with Vastu, we provide hyper-personalized remedies that align your space specifically to your planetary numbers.',
    benefits: [
      'Personalized remedies tailored to you',
      'Overcoming recurring life obstacles',
      'Aligning career paths with destiny numbers',
      'Harmonizing relationships based on compatibility'
    ],
    features: [
      { title: 'Name Correction', desc: 'Vibrational alignment of your personal or business name.' },
      { title: 'Lucky Colors & Directions', desc: 'Applying personal favorable elements in Vastu.' },
      { title: 'Astro-Vastu Remedies', desc: 'Combining planetary influence with spatial energy.' }
    ]
  },
  'online-consultation': {
    title: 'Online Consultation',
    icon: <Monitor className="w-12 h-12 text-white" />,
    shortDesc: 'Get expert Vastu advice from anywhere in the world.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop',
    overview: 'Distance should not be a barrier to positive energy. Our Online Vastu Consultation allows you to get expert advice globally. We analyze your digital floor plans with pinpoint accuracy.',
    benefits: [
      'Global accessibility',
      'Convenient scheduling',
      'Detailed digital reports',
      'Cost-effective solutions'
    ],
    features: [
      { title: 'Floor Plan Analysis', desc: 'Digital grid mapping and degree calculations.' },
      { title: 'Video Consultations', desc: 'Face-to-face discussions and virtual tours.' },
      { title: 'Digital Reports', desc: 'Comprehensive PDF reports with actionable remedies.' }
    ]
  },
  'vastu-for-land': {
    title: 'Vastu for Land/Plots',
    icon: <Map className="w-12 h-12 text-white" />,
    shortDesc: 'Ensure the land you buy is highly auspicious before you invest.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop',
    overview: 'The energy of the land dictates the energy of the building. Selecting the right plot is the most crucial step. We analyze soil, slopes, shapes, and surrounding environments.',
    benefits: [
      'Avoiding properties with negative history',
      'Ensuring smooth construction process',
      'Better resale value',
      'Long-term peace of mind'
    ],
    features: [
      { title: 'Soil Testing', desc: 'Checking the fertility and energy holding capacity.' },
      { title: 'Slope Analysis', desc: 'Ensuring correct elevations for wealth retention.' },
      { title: 'Surroundings Check', desc: 'Analyzing roads, water bodies, and neighboring structures.' }
    ]
  }
};

export default function SingleServicePage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Remove fallback to vastu-for-house and handle invalid slug
    if (slug && servicesData[slug]) {
      setService(servicesData[slug]);
    } else {
      setService('not-found');
    }
  }, [slug]);

  if (!service) return null;
  if (service === 'not-found') return <Navigate to="/404" replace />;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/60"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mt-32 md:mt-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full border border-[#D4AF37] flex items-center justify-center bg-white/10 backdrop-blur-sm">
              <div className="text-[#D4AF37]">
                {React.cloneElement(service.icon, { className: "w-10 h-10" })}
              </div>
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4"
          >
            {service.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-200 md:px-12 font-normal"
          >
            {service.shortDesc}
          </motion.p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Content */}
          <div className="lg:w-2/3">
            <Link to="/services" className="inline-flex items-center text-[#B8860B] hover:text-[#D4AF37] mb-8 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Services
            </Link>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Service Overview</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {service.overview}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 text-[#D4AF37] mr-2" />
                    Key Benefits
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#B8860B] mr-3 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Approach</h3>
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0 border border-[#D4AF37]/20">
                        <span className="text-[#B8860B] font-bold">{idx + 1}</span>
                      </div>
                      <div className="flex-1 mt-0.5">
                        <h4 className="font-bold text-gray-900 text-sm md:text-base">{feature.title}</h4>
                        <p className="text-xs md:text-sm text-gray-500 mt-0.5 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Booking Card */}
            <div className="bg-[#1A1A1A] rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
              
              <h3 className="text-2xl font-bold mb-2">Book a Consultation</h3>
              <p className="text-gray-400 mb-8 text-sm">Get expert guidance tailored to your specific needs.</p>
              
              <Link to="/contact-us" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:shadow-[0_10px_20px_rgba(212,175,55,0.3)] transition-all duration-300 transform hover:-translate-y-1 mb-4">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Now
              </Link>
              
              <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
                <span>Or call us:</span>
                <a href="tel:+919817755699" className="text-[#D4AF37] font-bold hover:underline flex items-center">
                  <Phone className="w-3 h-3 mr-1" /> +91 98177 55699
                </a>
              </div>
            </div>

            {/* Other Services Links */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">More Services</h3>
              <div className="space-y-4">
                {Object.entries(servicesData).map(([key, item]) => {
                  if (key === slug) return null;
                  return (
                    <Link 
                      key={key} 
                      to={`/${key}`}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-gray-600 group-hover:text-[#B8860B] font-medium transition-colors">
                        {item.title}
                      </span>
                      <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-[#D4AF37] transform rotate-180 transition-colors" />
                    </Link>
                  )
                }).slice(0, 5)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

