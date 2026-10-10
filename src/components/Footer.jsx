'use client';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebookF, FaYoutube, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { Link } from './RouterShim';
const logo = '/assets/S.Vastu-logo.webp';

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-gray-300 pt-16 pb-8 border-t border-[#0A192F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">

          {/* Brand Col */}
          <div className="flex flex-col items-start lg:items-center text-center lg:text-left space-y-6">
            <div className="bg-white p-6 rounded-full shadow-sm inline-block mb-2">
              <img src={logo} alt="S Vastu Solution Logo" className="h-24 w-auto object-contain" />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white font-medium mb-3">Follow Us On :</p>
              <div className="flex gap-3 text-[#D4AF37]">
                <a href="https://www.facebook.com/Svastusolution" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A192F] transition-all shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]" aria-label="Facebook">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="https://www.youtube.com/@Svastusolution" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A192F] transition-all shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]" aria-label="YouTube">
                  <FaYoutube className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/svastusolution/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A192F] transition-all shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]" aria-label="Instagram">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="https://www.pinterest.com/svastusolution/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A192F] transition-all shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]" aria-label="Pinterest">
                  <FaPinterestP className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 uppercase tracking-wide">Contact Info</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <a href="mailto:svastunumerology@gmail.com" className="text-gray-300 text-sm hover:text-white transition-colors">svastunumerology@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] mt-1" />
                <div className="flex flex-col gap-1 text-gray-300 text-sm">
                  <a href="tel:+919817755699" className="hover:text-white transition-colors">+91 98177 55699</a>
                  <a href="tel:+919878657299" className="hover:text-white transition-colors">+91 98786 57299</a>
                </div>
              </li>
            </ul>


          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4 lg:gap-8">
            {/* Quick Links Col */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 uppercase tracking-wide">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'About Us', 'Services', 'Locations', 'Blog'].map((link) => {
                  let linkPath = link.toLowerCase().replace(' ', '-');
                  if (link === 'Home') linkPath = '';
                  if (link === 'About Us') linkPath = 'about-us';
  
                  return (
                    <li key={link}>
                      <a href={`/${linkPath}`} className="text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-sm">
                        <span className="text-[#D4AF37] font-bold">›</span> {link}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
  
            {/* Vastu Services Col */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 uppercase tracking-wide">Vastu Services</h4>
              <ul className="space-y-4">
                {['Vastu Solution', 'Vastu For House', 'Vastu For Office', 'Industrial Vastu', 'Numerology'].map((service) => (
                  <li key={service}>
                    <a href={`/services`} className="text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-sm">
                      <span className="text-[#D4AF37] font-bold">›</span> {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm text-center md:text-left flex flex-col md:flex-row gap-1 md:gap-2">
            <span>&copy; {new Date().getFullYear()} S Vastu Solution. All Rights Reserved.</span>
            <span className="hidden md:inline">|</span>
            <span>
              Designed & Developed by{' '}
              <a href="https://digitalorra.com/" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-white font-medium transition-colors">
                Digital ORRA
              </a>
            </span>
          </div>
          <div className="flex gap-4 text-sm text-gray-400">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

