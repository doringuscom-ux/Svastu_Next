'use client';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from '@/components/RouterShim';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { PAGES_API } from '../utils/api';
import Services from '../components/Services';
import Process from '../components/Process';
import CoreValues from '../components/CoreValues';
import Founders from '../components/Founders';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import AirflowVastuChakra from '../components/AirflowVastuChakra';
import VastuChakra from '../components/VastuChakra';
import YoutubeShorts from '../components/YoutubeShorts';
import CitySections from '../components/CitySections';
import NotFoundPage from './NotFoundPage';

function CityHero({ city, customText, country }) {
  const cleanCitySlug = city ? city.replace(/^(experienced-)?vastu-consultant-in-/i, '') : '';
  const formattedCity = cleanCitySlug 
    ? cleanCitySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    : 'Your City';

  return (
    <section className="relative pt-36 pb-16 md:pt-48 md:pb-24 bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h4 className="text-orange-600 font-bold tracking-widest mb-4 text-sm uppercase">
            S-Vastu Services in {formattedCity}
          </h4>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Vastu Consultant in <span className="text-orange-500 whitespace-nowrap">{formattedCity}</span>
          </h1>
          {customText ? (
            <div 
              className="city-user-content mb-8 max-w-3xl mx-auto text-center whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: customText }}
            />
          ) : (
            <p className="text-base sm:text-lg text-gray-600 font-normal mb-8 leading-relaxed text-center max-w-2xl mx-auto">
              Transform your life and space with our specialized Vastu and Astrology services tailored for clients in {formattedCity}. Experience harmony, success, and peace.
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact-us" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-orange-500/30">
              Book a Consultation
            </Link>
            <a href="https://wa.me/919817755699" target="_blank" rel="noopener noreferrer" className="bg-white text-orange-500 border border-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full font-bold transition-all flex items-center justify-center gap-2">
              WhatsApp Now
            </a>
          </div>
        </div>
      </div>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
    </section>
  );
}

export default function CityPage({ initialPageData = null }) {
  const { cityName, slug } = useParams();
  const actualCityName = cityName || slug;
  const [pageData, setPageData] = useState(initialPageData);
  const [loading, setLoading] = useState(!initialPageData);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialPageData && (initialPageData.slug === actualCityName || !actualCityName)) {
      setPageData(initialPageData);
      setLoading(false);
      return;
    }

    const fetchPageData = async () => {
      try {
        const { data } = await axios.get(`${PAGES_API}/${actualCityName}`);
        setPageData(data);
      } catch (err) {
        console.error('Page SEO data not found for this city.');
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPageData();
    window.scrollTo(0, 0);
  }, [actualCityName, initialPageData]);

  if (loading) {
    return <div className="min-h-screen pt-32 text-center text-xl font-bold">Loading {actualCityName}...</div>;
  }

  if (error) {
    return <NotFoundPage />;
  }

  const formattedCity = actualCityName 
    ? actualCityName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    : 'Your City';

  const justCityName = actualCityName && actualCityName.startsWith('vastu-consultant-in-')
    ? actualCityName.replace('vastu-consultant-in-', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    : formattedCity;

  const metaTitle = pageData?.metaTitle || `Best Vastu Consultant & Astrologer in ${justCityName} | S-Vastu`;
  const metaDescription = pageData?.metaDescription || `Looking for expert Vastu and Astrology services in ${justCityName}? S-Vastu offers personalized consultations for home, business, and numerology.`;
  const metaKeywords = pageData?.metaKeywords || '';
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://svastusolution.com';
  const metaCanonical = pageData?.metaCanonical || `${baseUrl}/${actualCityName}`;
  const metaRobots = pageData?.metaRobots || 'index, follow';

  return (
    <div className="city-landing-page">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
        <link rel="canonical" href={metaCanonical} />
        <meta name="robots" content={metaRobots} />
      </Helmet>

      <CityHero city={actualCityName} customText={pageData?.customText} country={pageData?.country} />
      <CitySections pageData={pageData} />
      
      <CoreValues />
      <Process />
      <Founders />
      <div id="services">
        <Services />
      </div>
      
      <YoutubeShorts />
      
      <AirflowVastuChakra />
      <VastuChakra />
      <Testimonials />
      
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}

