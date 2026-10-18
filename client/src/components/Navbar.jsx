import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X } from 'lucide-react';

import CmaofLogo from './CmaofLogo';

const Navbar = ({ onOpenDonate, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5' 
          : 'py-3.5'
      }`}
      style={
        !isScrolled
          ? {
              background:
                'linear-gradient(to right, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.96) 55%, rgba(255,255,255,0.88) 75%, rgba(255,255,255,0.6) 88%, rgba(255,255,255,0.2) 100%)',
            }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* CMAOF Institutional Logo (Left) with Official Brand Colors */}
          <CmaofLogo imgClassName="h-11 sm:h-12 md:h-13 w-auto object-contain" />

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden xl:flex items-center space-x-6 lg:space-x-7">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`py-1 text-sm font-semibold transition-all relative ${
                    active
                      ? 'text-[#0F4C3A] font-bold'
                      : 'text-slate-800 hover:text-[#0F4C3A]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-[#0F4C3A] rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Search Icon & Gradient Donate Button */}
          <div className="flex items-center gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="w-10 h-10 rounded-full bg-white/90 border border-slate-200/80 shadow-sm hover:shadow flex items-center justify-center text-slate-700 hover:text-[#0F4C3A] hover:border-emerald-300 transition-all cursor-pointer backdrop-blur-sm"
              title="Search foundation website"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={2.3} />
            </button>

            {/* Gradient Orange Donate Pill Button */}
            <button
              onClick={onOpenDonate}
              className="bg-gradient-to-r from-[#F59E0B] via-[#E67E22] to-[#EA580C] hover:opacity-95 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg flex items-center gap-2 transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <Heart size={16} className="fill-white/20 stroke-[2.5]" />
              <span>Donate</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-800 hover:text-[#0F4C3A] rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                isActive(link.path)
                  ? 'bg-emerald-50 text-[#0F4C3A] font-bold'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              className="w-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow"
            >
              <Heart size={18} className="fill-white/20 stroke-[2.5]" />
              <span>Donate to CMAOF</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
