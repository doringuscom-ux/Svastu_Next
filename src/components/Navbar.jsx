'use client';
import { useState, useEffect } from 'react';
import { Link } from './RouterShim';
import { Menu, X, Phone, Mail } from 'lucide-react';
const logo = '/assets/S.Vastu-logo.webp';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 5) {
          setShowNav(false);
        } else {
          setShowNav(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`w-full font-sans shadow-sm fixed top-0 z-50 bg-white border-b border-gray-100 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* Top Bar - Info */}
      {/* <div className="bg-[#B8860B] text-white py-2 px-4 sm:px-8 flex-col md:flex-row justify-between items-center hidden md:flex">
        <p className="text-sm font-medium tracking-wide">
          Welcome to S-Vastu Solution – Trusted Vastu Consultant
        </p>
        <div className="flex gap-6 mt-2 md:mt-0 text-sm font-medium">
          <a href="tel:+919817755699" className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors">
            <Phone size={14} /> +91 98177 55699
          </a>
          <a href="mailto:svastunumerology@gmail.com" className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors">
            <Mail size={14} /> svastunumerology@gmail.com
          </a>
        </div>
      </div> */}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer group">
            {/* Using the logo you uploaded, make sure to save it as logo.png in the public folder */}
            <img
              src={logo}
              alt="S Vastu Solution Logo"
              className="h-16 sm:h-20 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback if image is missing */}
            <div className="hidden text-2xl font-bold text-[#B8860B]">S VASTU</div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 lg:space-x-10 items-center">
            {['Home', 'About', 'Services', 'Gallery', 'Locations', 'Blog', 'Contact'].map((item) => {
              const isRoute = true;
              const routePath = item === 'Home' ? '/' : item === 'About' ? '/about-us' : item === 'Contact' ? '/contact-us' : `/${item.toLowerCase()}`;
              const hashPath = item === 'About' ? '/#about-us' : item === 'Contact' ? '/#contact-us' : `/#${item.toLowerCase()}`;

              if (isRoute) {
                return (
                  <Link
                    key={item}
                    to={routePath}
                    className="text-gray-700 hover:text-[#B8860B] font-semibold text-base transition-colors duration-300 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B8860B] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                );
              }
              return (
                <a
                  key={item}
                  href={hashPath}
                  className="text-gray-700 hover:text-[#B8860B] font-semibold text-base transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B8860B] transition-all duration-300 group-hover:w-full"></span>
                </a>
              );
            })}
            <a href="https://wa.me/919817755699" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white px-7 py-2.5 rounded-full font-bold hover:shadow-lg hover:shadow-[#B8860B]/30 transition-all duration-300 transform hover:-translate-y-0.5 inline-block text-center">
              Book Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-[#B8860B] focus:outline-none p-2 rounded-md transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t border-gray-100 shadow-2xl absolute w-full transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible h-0 overflow-hidden'}`}>
        <div className="px-4 pt-4 pb-6 space-y-2">
          <p className="text-xs text-gray-500 mb-4 pb-3 border-b text-center px-4">
            Welcome to S Vastu Solution – Trusted Vastu Consultant
          </p>
          {['Home', 'About', 'Services', 'Gallery', 'Locations', 'Blog', 'Contact'].map((item) => {
            const isRoute = true;
            const routePath = item === 'Home' ? '/' : item === 'About' ? '/about-us' : item === 'Contact' ? '/contact-us' : `/${item.toLowerCase()}`;
            const hashPath = item === 'About' ? '/#about-us' : item === 'Contact' ? '/#contact-us' : `/#${item.toLowerCase()}`;

            if (isRoute) {
              return (
                <Link
                  key={item}
                  to={routePath}
                  className="block px-4 py-3 rounded-lg text-base font-semibold text-gray-800 hover:text-[#B8860B] hover:bg-orange-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              );
            }
            return (
              <a
                key={item}
                href={hashPath}
                className="block px-4 py-3 rounded-lg text-base font-semibold text-gray-800 hover:text-[#B8860B] hover:bg-orange-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            );
          })}
          <div className="pt-4 px-2">
            <a href="https://wa.me/919817755699" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="block w-full text-center bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white px-6 py-3.5 rounded-xl font-bold hover:shadow-lg transition-all shadow-md">
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

