import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ContactSecretariatHub from '../components/contact/ContactSecretariatHub';
import ContactForm from '../components/contact/ContactForm';
import ContactMapSection from '../components/contact/ContactMapSection';
import ContactFaqSection from '../components/contact/ContactFaqSection';

const ContactPage = () => {
  const activeCategory = 'general';

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-enquiry-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-[#FAF6EE]/30 text-slate-800 animate-fade-in pt-24 sm:pt-28 pb-20">
      
      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5B2E19]">
          <div className="w-1.5 h-3.5 bg-[#FCCD37] rounded-full shrink-0 shadow-xs" />
          <Link to="/" className="hover:text-[#8C4A26] transition-colors">Home</Link>
          <ChevronRight size={14} className="text-slate-400 stroke-[2.2]" />
          <span className="text-[#5B2E19] font-bold">Contact Secretariat</span>
        </div>

        {/* 1. Core Secretariat Hub & Official Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Multi-Office Secretariat Hub, Anti-Fraud Notice & Socials (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <ContactSecretariatHub />
          </div>

          {/* Right Column: Interactive Verified Enquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <ContactForm initialCategory={activeCategory} />
          </div>

        </div>

        {/* 2. Interactive Secretariat Campus Maps & Visitor Protocols */}
        <ContactMapSection />

        {/* 3. Frequently Asked Questions (Accordion) */}
        <ContactFaqSection onScrollToForm={scrollToForm} />

      </div>

    </div>
  );
};

export default ContactPage;
