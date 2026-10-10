'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { YOUTUBE_API } from '../utils/api';

export default function YoutubeShorts() {
  const scrollContainerRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchVideos = async () => {
      try {
        // Fetch directly from our own backend to completely bypass CORS and YouTube blocks
        const response = await fetch(`${YOUTUBE_API}/shorts`);
        const data = await response.json();

        if (!isMounted) return;

        if (data.success && data.data) {
          // Use all available videos for the slider instead of just 4
          setVideos(data.data);
        } else {
          setVideos(["dQw4w9WgXcQ", "EngW7tCbLso", "M7FIvfx5J10", "LXb3EKWsInQ"]);
        }
      } catch (error) {
        console.error("Failed to fetch videos from backend:", error);
        if (isMounted) setVideos(["dQw4w9WgXcQ", "EngW7tCbLso", "M7FIvfx5J10", "LXb3EKWsInQ"]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVideos();
    
    return () => { isMounted = false; };
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-orange-50 to-yellow-50 relative overflow-hidden border-t border-orange-100">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <svg className="text-red-600 w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Vastu Shorts & Tips
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            Discover quick, actionable Vastu insights directly from our experts to bring positivity into your life.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
             <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
          </div>
        ) : (
          <div className="relative flex items-center group max-w-full">
            {/* Left Arrow */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 z-20 bg-white/90 text-gray-800 p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:bg-orange-500 hover:text-white transition-all transform -translate-x-2 md:-translate-x-6 opacity-0 group-hover:opacity-100 focus:opacity-100 border border-gray-200"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Slider */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-6 px-4 py-6 scroll-smooth snap-x snap-mandatory scrollbar-hide w-full justify-start"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {videos.map((id, index) => (
                <div 
                  key={index} 
                  className="flex-none w-[240px] sm:w-[260px] aspect-[9/16] snap-center rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gray-900 border-4 border-white/50"
                >
                  <iframe
                    className="w-full h-full pointer-events-auto"
                    src={`https://www.youtube.com/embed/${id}?autoplay=0&loop=1&playlist=${id}`}
                    title={`Vastu Short ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 z-20 bg-white/90 text-gray-800 p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:bg-orange-500 hover:text-white transition-all transform translate-x-2 md:translate-x-6 opacity-0 group-hover:opacity-100 focus:opacity-100 border border-gray-200"
              aria-label="Scroll Right"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
          <a 
            href="https://www.youtube.com/@Svastusolution" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 hover:-translate-y-1 shadow-[0_10px_20px_rgba(220,38,38,0.3)]"
          >
            <Play size={22} fill="currentColor" />
            Subscribe to @Svastusolution
          </a>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}

