'use client';


import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      text: "After implementing the Vastu remedies suggested by S Vastu Solution, my factory's production issues were resolved within weeks. The non-destructive approach was exactly what we needed.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Homeowner",
      text: "The energy in our new home felt off until we consulted them. By just changing some colors and moving a few mirrors, the atmosphere has become incredibly peaceful and positive.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Corporate Executive",
      text: "I was facing career stagnation. The numerology and Vastu integration provided by their team gave me a new perspective and within months, I saw major career growth. Highly recommended!",
      rating: 5
    },
    {
      name: "Neha Gupta",
      role: "Retail Store Owner",
      text: "We applied the commercial Vastu recommendations to our boutique. The footfall increased dramatically, and the overall vibe of the store is much more welcoming now.",
      rating: 5
    },
    {
      name: "Vikram Singh",
      role: "Real Estate Developer",
      text: "S Vastu Solution has been our go-to consultant for all our new residential projects. Their deep knowledge of land Vastu ensures our properties sell faster and bring luck to the buyers.",
      rating: 5
    },
    {
      name: "Aarti Desai",
      role: "IT Professional",
      text: "The online consultation was so easy and accurate. They corrected the severe Vastu dosha in my apartment without breaking a single wall. My health and sleep have improved immensely.",
      rating: 5
    }
  ];

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -window.innerWidth / 1.5 : window.innerWidth / 1.5;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-12 pb-0 bg-[#0B152A] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] opacity-[0.03] blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B8860B] opacity-[0.03] blur-[100px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-[#D4AF37] font-serif italic tracking-wider text-2xl sm:text-3xl">Client Stories</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 mb-6">
            Trusted by <span className="text-[#D4AF37]">Happy Clients</span>
          </h2>
        </div>

        <div className="relative group">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-[#D4AF37] p-3 rounded-full text-white shadow-xl backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-[#D4AF37] p-3 rounded-full text-white shadow-xl backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-8 pt-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="min-w-full md:min-w-[calc(33.333%-1rem)] snap-center bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300 flex flex-col"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#D4AF37] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-8 italic flex-grow">"{item.text}"</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{item.name}</h4>
                    <p className="text-gray-400 text-sm">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

