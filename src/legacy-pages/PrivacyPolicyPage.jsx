'use client';
import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 shadow-sm rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-8 border-b pb-4">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              This Privacy Policy explains how S Vastu Solution (“we,” “us,” or “our”) collects, uses, shares, and protects your personal information when you use our services, interact with our social media pages, or visit our website (the “Service”).
              By accessing or using the Service, you consent to the data practices described in this policy.
            </p>

            <h2 className="text-2xl font-semibold text-[#0A192F] mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect information that identifies, relates to, describes, or is capable of being associated with you (“Personal Data”).</p>
            
            <h3 className="text-xl font-medium text-[#0A192F] mt-6 mb-3">A. Information You Provide Directly:</h3>
            <p className="mb-2">This is information you willingly submit to us, primarily through contact forms, lead generation ads, and during consultations:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Contact Information:</strong> Name, Email Address, and Phone Number.</li>
              <li><strong>Vastu/Numerology Data:</strong> Date of Birth, Time of Birth, Name for Correction, Property Address, or Property type (House, Shop, Plot).</li>
              <li><strong>Payment Data:</strong> Billing address and payment method details (collected by third-party payment processors, not stored by us).</li>
            </ul>

            <h3 className="text-xl font-medium text-[#0A192F] mt-6 mb-3">B. Information Collected Automatically:</h3>
            <p className="mb-2">When you use our Service or click on our ads, we collect:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Usage Data:</strong> Information about how you use our website or Facebook Page, including pages viewed and links clicked.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, operating system, and the source of your visit.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#0A192F] mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-2">We use your Personal Data for the following primary purposes:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>To Provide Services:</strong> To prepare and deliver your Vastu analysis, Numerology report, or consultation.</li>
              <li><strong>Communication:</strong> To contact you via email, phone, or WhatsApp to confirm appointments, deliver reports, and follow up on requests.</li>
              <li><strong>Marketing:</strong> To send you updates, promotions, and offers related to S Vastu Solution, provided you have opted in.</li>
              <li><strong>Improvement:</strong> To monitor and analyze usage and trends to improve our services and advertising effectiveness.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#0A192F] mt-8 mb-4">3. How We Share Your Information</h2>
            <p className="mb-2">We do not sell your Personal Data. We share your information only with trusted third parties necessary to operate our business:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Service Providers:</strong> We share data with third parties who perform functions on our behalf, such as CRM systems (for lead follow-up) and email marketing platforms.</li>
              <li><strong>Legal Compliance:</strong> If required by law, subpoena, or other legal process, we may disclose your information to comply with legal obligations.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#0A192F] mt-8 mb-4">4. Data Retention</h2>
            <p className="mb-6">
              We retain your Personal Data only for as long as necessary to provide you with services and fulfill the purposes outlined in this policy. Consultation data (DOB, Name, Property details) is retained to facilitate future consultations and reference.
            </p>

            <h2 className="text-2xl font-semibold text-[#0A192F] mt-8 mb-4">5. Your Data Rights</h2>
            <p className="mb-2">Depending on your location, you may have the following rights regarding your Personal Data:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Right of Access:</strong> You can request a copy of the Personal Data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> You can request that we correct any information you believe is inaccurate or incomplete.</li>
              <li><strong>Right to Erasure (Right to be Forgotten):</strong> You can request that we delete your Personal Data, under certain conditions.</li>
              <li><strong>Right to Opt-Out:</strong> You can unsubscribe from our marketing communications at any time by clicking the “unsubscribe” link in any email or by contacting us directly.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#0A192F] mt-8 mb-4">6. Contact Us</h2>
            <p className="mb-4">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-bold text-[#0A192F] mb-4">S Vastu Solution</h3>
              <ul className="space-y-3">
                <li><strong>Email:</strong> <a href="mailto:svastunumerology@gmail.com" className="text-[#D4AF37] hover:underline">svastunumerology@gmail.com</a></li>
                <li><strong>Phone/WhatsApp 1:</strong> <a href="tel:+919817755699" className="text-[#D4AF37] hover:underline">+91 98177 55699</a></li>
                <li><strong>Phone/WhatsApp 2:</strong> <a href="tel:+919878657299" className="text-[#D4AF37] hover:underline">+91 98786 57299</a></li>
                <li><strong>Address:</strong> Shop No. 55, 1st Floor, Main Market, Panchkula Road, Baltana</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

