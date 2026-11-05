import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  Menu, 
  X
} from 'lucide-react';

import CmaofLogo from './CmaofLogo';

const Navbar = ({ onOpenDonate, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdmin]);

  // Route change listener: close mobile menu
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (isAdmin) {
    return null;
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Work', path: '/our-work' },
    { name: 'Impact', path: '/impact' },
    { name: 'Multimedia Gallery', path: '/gallery' },
    { name: 'Event', path: '/event' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/gallery' && (location.pathname.startsWith('/gallery') || location.pathname.startsWith('/news'))) return true;
    if (path === '/event' && (location.pathname.startsWith('/event') || location.pathname.startsWith('/events') || location.pathname.startsWith('/get-involved'))) return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavLinkClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FFFAE8]/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#E8DEC2]' 
          : 'bg-[#FFFAE8]/90 backdrop-blur-sm py-3.5 border-b border-[#E8DEC2]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* CMAOF Institutional Logo (Left) with Official Brand Colors */}
          <CmaofLogo imgClassName="h-10 sm:h-11 md:h-12 w-auto object-contain" onClick={handleNavLinkClick} />

          {/* Desktop Navigation Links (Center) - Responsive from lg: and above */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-5 2xl:gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const displayName = link.name === 'Multimedia Gallery' ? (
                <>
                  <span className="hidden xl:inline">Multimedia </span>Gallery
                </>
              ) : (
                link.name
              );

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={handleNavLinkClick}
                  className={`py-1 text-[13px] xl:text-sm font-semibold transition-all relative ${
                    active
                      ? 'text-[#5B2E19] font-bold'
                      : 'text-[#5B2E19]/80 hover:text-[#5B2E19]'
                  }`}
                >
                  {displayName}
                  {active && (
                    <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-[#FCCD37] rounded-full animate-fade-in shadow-xs" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Search Icon & Active Sun Yellow Donate Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-[#E8DEC2] shadow-2xs hover:shadow-xs flex items-center justify-center text-[#5B2E19] hover:bg-[#FCCD37] transition-all cursor-pointer"
              title="Search foundation website"
              aria-label="Search"
            >
              <Search size={17} strokeWidth={2.4} />
            </button>

            {/* Active Sun Yellow Donate Pill Button */}
            <Link
              to="/donate"
              onClick={handleNavLinkClick}
              className="btn-cmao-primary px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-black text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <Heart size={15} className="fill-[#5B2E19]/30 stroke-[#5B2E19] stroke-[2.5]" />
              <span>Donate</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#5B2E19] hover:bg-[#FAF0D4] rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFAE8] border-b border-[#E8DEC2] px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          {navLinks.map((link) => {
            const active = isActive(link.path);

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={handleNavLinkClick}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors min-h-[44px] flex items-center ${
                  active
                    ? 'bg-[#FAF0D4] text-[#5B2E19] font-bold border-l-4 border-[#5B2E19]'
                    : 'text-[#5B2E19] hover:bg-[#FAF0D4]/60'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-[#E8DEC2] flex flex-col gap-2">
            <Link
              to="/donate"
              onClick={handleNavLinkClick}
              className="w-full btn-cmao-primary py-3 rounded-xl font-black text-center flex items-center justify-center gap-2 shadow min-h-[48px]"
            >
              <Heart size={18} className="fill-[#5B2E19]/30 stroke-[#5B2E19] stroke-[2.5]" />
              <span>Donate to CMAOF</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
