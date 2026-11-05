import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import ResourcesFooter from './resources/ResourcesFooter';
import CmaofLogo from './CmaofLogo';

// Inline SVG components for Social Media Icons
const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
  </svg>
);

const CmaofTreeLogo = () => (
  <CmaofLogo 
    variant="dark" 
    imgClassName="h-20 sm:h-24 md:h-28 w-auto max-w-[280px] sm:max-w-[320px] object-contain -ml-1" 
  />
);

const Footer = ({ onOpenDonate }) => {
  const location = useLocation();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  // Render the Multimedia Gallery / Section footer design on all section pages;
  // Only the home page ('/') retains the dark institutional footer.
  const isHomePage = location.pathname === '/' || location.pathname === '';
  if (!isHomePage) {
    return <ResourcesFooter onOpenDonate={onOpenDonate} />;
  }

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      try {
        await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: newsletterEmail.trim(), source: 'home_footer' }),
        });
      } catch (err) {
        console.warn('Newsletter sync notice:', err.message);
      }
      toast.success('Thank you for subscribing to CMAOF Institutional Gazette!');
      setNewsletterEmail('');
    } else {
      toast.error('Please enter a valid email address.');
    }
  };

  return (
    <footer className="w-full font-sans">
      
      {/* ────────────────────────────────────────────────────────── */}
      {/* MAIN INSTITUTIONAL FOOTER: Official Earth Brown (#5B2E19)  */}
      {/* Exactly matches logof.png background for a 100% seamless look */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="bg-[#5B2E19] text-[#FAF6EE] pt-12 sm:pt-14 pb-8 border-t-4 border-[#FCCD37] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-10 border-b border-white/20">
            
            {/* Column 1: Logo & Brand Description & Social Icons (Col 1-3) */}
            <div className="lg:col-span-3 space-y-4">
              <CmaofTreeLogo />
              <p className="text-[#FAF6EE] text-xs sm:text-[13px] leading-relaxed max-w-sm font-normal">
                Empowering communities, expanding educational opportunity, advancing healthcare access, and fostering economic prosperity across Nigeria.
              </p>

              {/* Social Media Circular Buttons with Sun Yellow Hover */}
              <div className="flex items-center gap-2.5 pt-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FCCD37] text-white hover:text-[#5B2E19] border border-white/20 hover:border-[#FCCD37] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105"
                >
                  <LinkedinIcon />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FCCD37] text-white hover:text-[#5B2E19] border border-white/20 hover:border-[#FCCD37] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105"
                >
                  <FacebookIcon />
                </a>

                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter X"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FCCD37] text-white hover:text-[#5B2E19] border border-white/20 hover:border-[#FCCD37] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105"
                >
                  <TwitterIcon />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FCCD37] text-white hover:text-[#5B2E19] border border-white/20 hover:border-[#FCCD37] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FCCD37] text-white hover:text-[#5B2E19] border border-white/20 hover:border-[#FCCD37] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105"
                >
                  <YoutubeIcon />
                </a>
              </div>
            </div>

            {/* Column 2: Strategic Pillars (Col 4-6) - Four Official Foundation Pillars */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-[#FCCD37] font-black text-xs sm:text-[13px] tracking-wider uppercase font-sans drop-shadow-xs">
                Strategic Pillars
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] font-medium">
                <li>
                  <Link 
                    to="/our-work/education" 
                    className="text-[#FAF6EE] hover:text-[#FCCD37] transition-colors flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#0047BA] shadow-xs shrink-0" />
                    <span>Education & Opportunity</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/our-work/health" 
                    className="text-[#FAF6EE] hover:text-[#FCCD37] transition-colors flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#338C26] shadow-xs shrink-0" />
                    <span>Health & Wellbeing</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/our-work/humanitarian-support" 
                    className="text-[#FAF6EE] hover:text-[#FCCD37] transition-colors flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FAF6EE] border border-white/40 shadow-xs shrink-0" />
                    <span>Humanitarian Support</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/our-work/economic-empowerment" 
                    className="text-[#FAF6EE] hover:text-[#FCCD37] transition-colors flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FCCD37] shadow-xs shrink-0" />
                    <span>Economic Empowerment</span>
                  </Link>
                </li>
                <li className="pt-2 border-t border-white/15">
                  <Link 
                    to="/our-work" 
                    className="text-[#FCCD37] hover:text-white font-extrabold transition-colors flex items-center gap-1"
                  >
                    <span>Strategic Framework Overview</span>
                    <ArrowRight size={13} strokeWidth={2.6} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links (Col 7-8) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-[#FCCD37] font-black text-xs sm:text-[13px] tracking-wider uppercase font-sans drop-shadow-xs">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] font-medium">
                <li><Link to="/" className="text-[#FAF6EE] hover:text-[#FCCD37] transition-colors block">Home</Link></li>
                <li><Link to="/about" className="text-[#FAF6EE] hover:text-[#FCCD37] transition-colors block">About Us</Link></li>
                <li><Link to="/founder" className="text-[#FAF6EE] hover:text-[#FCCD37] transition-colors block font-semibold">Founder's Profile</Link></li>
                <li><Link to="/impact" className="text-[#FAF6EE] hover:text-[#FCCD37] transition-colors block">Impact & Numbers</Link></li>
                <li><Link to="/gallery" className="text-[#FAF6EE] hover:text-[#FCCD37] transition-colors block">Multimedia Gallery</Link></li>
              </ul>
            </div>

            {/* Column 4: Get Involved & Resources (Col 9-10) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-[#FCCD37] font-black text-xs sm:text-[13px] tracking-wider uppercase font-sans drop-shadow-xs">
                Get Involved
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] font-medium">
                <li><Link to="/donate" className="text-[#FCCD37] hover:text-white transition-colors block font-black">Donate to CMAOF</Link></li>
                <li><Link to="/get-involved" className="text-[#FAF6EE] hover:text-[#FCCD37] transition-colors block">Partner With Us</Link></li>
                <li><Link to="/resources" className="text-[#FAF6EE] hover:text-[#FCCD37] transition-colors block">Publications & Reports</Link></li>
                <li><Link to="/events" className="text-[#FAF6EE] hover:text-[#FCCD37] transition-colors block">Events & Calendar</Link></li>
                <li><Link to="/contact" className="text-[#FAF6EE] hover:text-[#FCCD37] transition-colors block">Contact CMAOF</Link></li>
              </ul>
            </div>

            {/* Column 5: Stay Connected (Col 11-12) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-[#FCCD37] font-black text-xs sm:text-[13px] tracking-wider uppercase font-sans drop-shadow-xs">
                Stay Connected
              </h4>
              <p className="text-[#FAF6EE] text-xs leading-relaxed font-normal">
                Subscribe to our newsletter for the latest updates, stories, and opportunities.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-2.5 pt-1">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-white text-slate-900 placeholder:text-slate-500 text-xs px-3.5 py-2.5 rounded-xl w-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FCCD37] font-medium shadow-xs"
                  required
                />
                <button
                  type="submit"
                  className="w-full btn-cmao-primary py-2.5 rounded-xl font-black text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={14} strokeWidth={2.5} />
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Legal Copyright Bar */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs sm:text-[12px] text-[#FAF6EE]/90 gap-3">
            <p className="font-normal">© {new Date().getFullYear()} Chief Michael Ade.Ojo Foundation (CMAOF). All rights reserved.</p>

            <div className="flex items-center space-x-3 text-[#FAF6EE]/80">
              <Link to="/policies" className="hover:text-[#FCCD37] transition-colors">Privacy Policy</Link>
              <span className="text-white/30">|</span>
              <Link to="/policies" className="hover:text-[#FCCD37] transition-colors">Terms of Use</Link>
              <span className="text-white/30">|</span>
              <Link to="/policies" className="hover:text-[#FCCD37] transition-colors">Safeguarding</Link>
              <span className="text-white/30">|</span>
              <Link to="/contact" className="hover:text-[#FCCD37] transition-colors">Contact</Link>
            </div>

            <p className="text-[#FCCD37] font-bold tracking-tight">
              A Brighter Nigeria. For Generations.
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;