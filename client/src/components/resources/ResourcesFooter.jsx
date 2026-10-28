import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

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

import CmaofLogo from '../CmaofLogo';

/**
 * ResourcesFooter Component
 * Replicated with 100% pixel fidelity to the reference image.
 * Dedicated specifically to the Resources Page.
 */
const ResourcesFooter = ({ onOpenDonate }) => {
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
    <footer className="w-full font-sans bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-8 pb-6">
        
        {/* Main Content Row: Logo, Quick Links, Connect With Us, Divider, Subscribe */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-6">
          
          {/* 1. Official CMAOF Logo with Brand Colors */}
          <div className="shrink-0 flex items-start pt-0.5">
            <CmaofLogo imgClassName="h-13 sm:h-14 lg:h-15 w-auto object-contain" />
          </div>

          {/* 2. Quick Links (3 Columns of Navigation Links) */}
          <div className="space-y-3">
            <h4 className="text-[#0B2D6E] font-bold text-sm tracking-tight">
              Quick Links
            </h4>
            <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:gap-10 text-xs sm:text-[13px] font-medium text-[#5A6E85]">
              {/* Sub-column 1 */}
              <ul className="space-y-2 sm:space-y-2.5">
                <li>
                  <Link to="/" className="hover:text-[#06402B] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#06402B] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/founder" className="hover:text-[#06402B] transition-colors font-medium">
                    Founder's Profile
                  </Link>
                </li>
                <li>
                  <Link to="/our-work" className="hover:text-[#06402B] transition-colors">
                    Our Work
                  </Link>
                </li>
              </ul>

              {/* Sub-column 2 */}
              <ul className="space-y-2 sm:space-y-2.5">
                <li>
                  <Link to="/impact" className="hover:text-[#06402B] transition-colors">
                    Impact
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-[#06402B] transition-colors">
                    Multimedia Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/event" className="hover:text-[#06402B] transition-colors">
                    Event
                  </Link>
                </li>
              </ul>

              {/* Sub-column 3 */}
              <ul className="space-y-2 sm:space-y-2.5">
                <li>
                  <Link to="/resources" className="hover:text-[#06402B] transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#06402B] transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/donate" 
                    className="hover:text-[#06402B] transition-colors text-left"
                  >
                    Donate
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Connect With Us (Circular Social Buttons) */}
          <div className="space-y-3">
            <h4 className="text-[#0B2D6E] font-bold text-sm tracking-tight">
              Connect With Us
            </h4>
            <div className="flex items-center gap-2 sm:gap-2.5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0B2D6E] hover:bg-[#06402B] text-white flex items-center justify-center transition-colors shadow-2xs"
              >
                <LinkedinIcon />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0B2D6E] hover:bg-[#06402B] text-white flex items-center justify-center transition-colors shadow-2xs"
              >
                <TwitterIcon />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0B2D6E] hover:bg-[#06402B] text-white flex items-center justify-center transition-colors shadow-2xs"
              >
                <FacebookIcon />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0B2D6E] hover:bg-[#06402B] text-white flex items-center justify-center transition-colors shadow-2xs"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0B2D6E] hover:bg-[#06402B] text-white flex items-center justify-center transition-colors shadow-2xs"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* 4. Vertical Divider on Desktop */}
          <div className="hidden xl:block w-px h-11 bg-slate-200 self-center shrink-0" aria-hidden="true" />

          {/* 5. Subscribe Form with Forest Green Button */}
          <div className="space-y-3">
            <h4 className="text-[#0B2D6E] font-bold text-sm tracking-tight">
              Subscribe
            </h4>
            <form 
              onSubmit={handleNewsletterSubmit} 
              className="flex items-center rounded-lg border border-[#CBD5E1] overflow-hidden bg-white shadow-2xs w-full sm:w-[260px] md:w-[280px]"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-3 py-2 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="bg-[#06402B] hover:bg-[#042D1E] active:bg-[#032418] text-white px-3.5 py-2.5 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Subscribe"
              >
                <ArrowRight size={15} strokeWidth={2.4} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="border-t border-[#E2E8F0] mt-8 pt-4 pb-2 flex flex-col md:flex-row items-center justify-between text-xs text-[#5A6E85] gap-3">
          <p className="text-[#5A6E85] text-xs font-normal">
            © {new Date().getFullYear()} Chief Michael Ade.Ojo Foundation. All rights reserved.
          </p>

          <div className="flex items-center flex-wrap gap-2 text-xs text-[#5A6E85]">
            <Link to="/policies" className="hover:text-[#06402B] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/policies" className="hover:text-[#06402B] transition-colors">
              Terms of Use
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/policies" className="hover:text-[#06402B] transition-colors">
              Cookie Policy
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/policies" className="hover:text-[#06402B] transition-colors">
              Safeguarding
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/contact" className="hover:text-[#06402B] transition-colors">
              Contact
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default ResourcesFooter;
