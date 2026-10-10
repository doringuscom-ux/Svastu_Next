'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const InstagramIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function InstagramFeed() {
  useEffect(() => {
    // Dynamically load the Elfsight platform script only once
    let script = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Safely remove watermark and duplicate titles using text matching
    const interval = setInterval(() => {
      // Hide Free Widget Badge
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        if (link.textContent.includes('Free Instagram Feed Widget') || link.href.includes('elfsight.com/instagram-feed-instashow')) {
          link.style.display = 'none';
        }
      });

      // Hide Duplicate "Follow us on Instagram" text from Elfsight
      const elfsightContainer = document.querySelector('.elfsight-app-7b460780-ff7a-4bdc-ab7d-331a4ed961a6');
      if (elfsightContainer) {
        const elements = elfsightContainer.querySelectorAll('div, a, span, h1, h2, h3');
        elements.forEach(el => {
          if (el.textContent.trim() === 'Follow us on Instagram') {
            el.style.display = 'none';
          }
        });
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="instagram-feed" className="pt-12 pb-2 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center mb-6 shadow-lg shadow-pink-500/30"
          >
            <InstagramIcon className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight text-center"
          >
            Follow us on Instagram
          </motion.h2>
        </div>

        {/* Elfsight Widget Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="w-full relative z-10 mb-12"
        >
          <div className="elfsight-app-7b460780-ff7a-4bdc-ab7d-331a4ed961a6" data-elfsight-app-lazy></div>
        </motion.div>
      </div>
    </section>
  );
}

