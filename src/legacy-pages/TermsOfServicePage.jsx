'use client';
import React from 'react';
import SeoMeta from '../components/SeoMeta';

export default function TermsOfServicePage() {
  return (
    <>
      <SeoMeta pageName="terms-of-service" />
      <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 shadow-sm rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-8 border-b pb-4">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              Welcome to S Vastu Solution. By accessing our website or using our services, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>

            <h2 className="text-2xl font-semibold text-[#0A192F] mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By engaging with our Vastu, Numerology, or Astrology consultation services, you agree to comply with and be bound by these terms. If you do not agree, please do not use our services.
            </p>
            
            <h2 className="text-2xl font-semibold text-[#0A192F] mt-8 mb-4">2. Services Provided</h2>
            <p className="mb-4">
              S Vastu Solution provides consultations and reports based on traditional Vastu Shastra and Numerology. The advice, analysis, and recommendations provided are for guidance purposes only.
            </p>

            <h2 className="text-2xl font-semibold text-[#0A192F] mt-8 mb-4">3. Limitation of Liability</h2>
            <p className="mb-4">
              While we strive to provide accurate and beneficial advice based on systematic analysis, S Vastu Solution does not guarantee any specific outcomes, financial gains, or life changes. Our services should not replace professional medical, legal, or financial advice. We shall not be held liable for any decisions made based on our consultations.
            </p>

            <h2 className="text-2xl font-semibold text-[#0A192F] mt-8 mb-4">4. Payment and Refunds</h2>
            <p className="mb-4">
              Payment for consultations and reports must be made in advance as per the agreed terms. Due to the customized nature of our services (reports and analysis time), fees are generally non-refundable once the consultation or report preparation has commenced.
            </p>

            <h2 className="text-2xl font-semibold text-[#0A192F] mt-8 mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including text, graphics, logos, and reports provided to you, is the intellectual property of S Vastu Solution and may not be reproduced without explicit permission.
            </p>

            <h2 className="text-2xl font-semibold text-[#0A192F] mt-8 mb-4">6. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms of Service at any time. Any changes will be posted on this page with an updated revision date.
            </p>

            <h2 className="text-2xl font-semibold text-[#0A192F] mt-8 mb-4">7. Contact Us</h2>
            <p className="mb-4">If you have any questions regarding these terms, please contact us:</p>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-bold text-[#0A192F] mb-4">S Vastu Solution</h3>
              <ul className="space-y-3">
                <li><strong>Email:</strong> <a href="mailto:svastunumerology@gmail.com" className="text-[#D4AF37] hover:underline">svastunumerology@gmail.com</a></li>
                <li><strong>Phone:</strong> <a href="tel:+919817755699" className="text-[#D4AF37] hover:underline">+91 98177 55699</a></li>
                <li><strong>Address:</strong> Shop No. 55, 1st Floor, Main Market, Panchkula Road, Baltana</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

