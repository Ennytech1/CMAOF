import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import CmaofLogo from '../CmaofLogo';

// Inline SVG components for Social Media Icons
const LinkedinIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
  </svg>
);

/**
 * ResourcesFooter Component
 * Global section footer aligned with official CMAOF corporate brand tokens.
 * Matches logo background (#FFFAE8) for a 100% seamless appearance.
 */
const ResourcesFooter = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      try {
        await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: newsletterEmail.trim(), source: 'resources_footer' }),
        });
      } catch (err) {
        console.warn('Newsletter sync notice:', err.message);
      }
      toast.success('Thank you for subscribing to CMAOF updates!');
      setNewsletterEmail('');
    } else {
      toast.error('Please enter a valid email address.');
    }
  };

  return (
    <footer className="w-full font-sans bg-[#FFFAE8] border-t border-[#E8DEC2] text-[#3D1E10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-6">
        
        {/* Responsive Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* 1. Official CMAOF Logo & About Snippet & Social (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center">
              <CmaofLogo imgClassName="h-14 sm:h-16 w-auto object-contain" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            </div>
            
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#5B2E19]/80 font-normal max-w-sm">
              Empowering communities, expanding educational opportunity, advancing healthcare access, and fostering economic prosperity across Nigeria.
            </p>

            {/* Social Media Links */}
            <div className="pt-1">
              <span className="block text-[11px] font-bold text-[#5B2E19] uppercase tracking-wider mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-[#5B2E19] hover:bg-[#FCCD37] text-[#FAF6EE] hover:text-[#5B2E19] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                >
                  <LinkedinIcon />
                </a>

                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-8 h-8 rounded-full bg-[#5B2E19] hover:bg-[#FCCD37] text-[#FAF6EE] hover:text-[#5B2E19] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                >
                  <TwitterIcon />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-[#5B2E19] hover:bg-[#FCCD37] text-[#FAF6EE] hover:text-[#5B2E19] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                >
                  <FacebookIcon />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-[#5B2E19] hover:bg-[#FCCD37] text-[#FAF6EE] hover:text-[#5B2E19] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-[#5B2E19] hover:bg-[#FCCD37] text-[#FAF6EE] hover:text-[#5B2E19] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                >
                  <YoutubeIcon />
                </a>
              </div>
            </div>
          </div>

          {/* 2. Strategic Pillars (Cols 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[#5B2E19] font-bold text-xs uppercase tracking-wider">
              Strategic Pillars
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] font-medium text-[#5B2E19]/85">
              <li>
                <Link to="/our-work/education" className="hover:text-[#0047BA] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0047BA] shrink-0" />
                  <span>Education & Opportunity</span>
                </Link>
              </li>
              <li>
                <Link to="/our-work/health" className="hover:text-[#338C26] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#338C26] shrink-0" />
                  <span>Health & Wellbeing</span>
                </Link>
              </li>
              <li>
                <Link to="/our-work/humanitarian-support" className="hover:text-[#5B2E19] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B2E19] shrink-0" />
                  <span>Humanitarian Support</span>
                </Link>
              </li>
              <li>
                <Link to="/our-work/economic-empowerment" className="hover:text-[#5B2E19] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FCCD37] shrink-0" />
                  <span>Economic Empowerment</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/our-work" className="text-[#5B2E19] hover:underline font-bold transition-colors inline-flex items-center gap-1">
                  <span>Framework Overview</span>
                  <ArrowRight size={12} strokeWidth={2.5} />
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Institutional Links (Cols 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[#5B2E19] font-bold text-xs uppercase tracking-wider">
              Institutional
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] font-medium text-[#5B2E19]/85">
              <li>
                <Link to="/" className="hover:text-[#5B2E19] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#5B2E19] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/founder" className="hover:text-[#5B2E19] transition-colors">
                  Founder's Profile
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-[#5B2E19] transition-colors">
                  Impact & Results
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#5B2E19] transition-colors">
                  Multimedia Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#5B2E19] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/donate" 
                  className="text-[#5B2E19] font-extrabold hover:text-[#338C26] transition-colors inline-flex items-center gap-1"
                >
                  <span>Donate to CMAOF</span>
                  <ArrowRight size={12} strokeWidth={2.5} />
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter Subscription (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[#5B2E19] font-bold text-xs uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-xs text-[#5B2E19]/80 leading-relaxed">
              Subscribe to receive the latest impact updates, field reports, and opportunities from CMAOF.
            </p>
            <form 
              onSubmit={handleNewsletterSubmit} 
              className="flex items-center rounded-lg border border-[#D8C7A3] overflow-hidden bg-white shadow-xs w-full max-w-sm focus-within:border-[#5B2E19] focus-within:ring-1 focus-within:ring-[#5B2E19]"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-3 py-2.5 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="bg-[#5B2E19] hover:bg-[#3D1E10] text-[#FCCD37] px-3.5 py-2.5 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="border-t border-[#E8DEC2] mt-8 pt-4 pb-2 flex flex-col md:flex-row items-center justify-between text-xs text-[#5B2E19]/75 gap-3">
          <p className="text-xs font-normal text-center md:text-left">
            © {new Date().getFullYear()} Chief Michael Ade.Ojo Foundation (CMAOF). All rights reserved.
          </p>

          <div className="flex items-center flex-wrap justify-center gap-3 text-xs">
            <Link to="/policies" className="hover:text-[#5B2E19] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#D8C7A3]">|</span>
            <Link to="/policies" className="hover:text-[#5B2E19] transition-colors">
              Terms of Use
            </Link>
            <span className="text-[#D8C7A3]">|</span>
            <Link to="/policies" className="hover:text-[#5B2E19] transition-colors">
              Cookie Policy
            </Link>
            <span className="text-[#D8C7A3]">|</span>
            <Link to="/policies" className="hover:text-[#5B2E19] transition-colors">
              Safeguarding
            </Link>
            <span className="text-[#D8C7A3]">|</span>
            <Link to="/contact" className="hover:text-[#5B2E19] transition-colors">
              Contact
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default ResourcesFooter;
