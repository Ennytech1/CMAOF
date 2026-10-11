import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X } from 'lucide-react';

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
    { name: 'News & Stories', path: '/news' },
    { name: 'Get Involved', path: '/get-involved' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
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
          
          {/* CMAOF Institutional Logo (Left) */}
          <Link to="/" className="flex items-center gap-3 group">
            
            {/* Tree Emblem SVG matching design */}
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Tree Canopy Leaves (Green & Orange) */}
                <circle cx="50" cy="22" r="9" fill="#0F4C3A" />
                <circle cx="36" cy="30" r="10" fill="#0F4C3A" />
                <circle cx="64" cy="30" r="10" fill="#0F4C3A" />
                <circle cx="26" cy="42" r="9" fill="#14634C" />
                <circle cx="74" cy="42" r="9" fill="#14634C" />
                <circle cx="40" cy="22" r="6" fill="#F59E0B" />
                <circle cx="60" cy="22" r="6" fill="#EA580C" />
                
                {/* Human Silhouettes as Tree Trunk */}
                <path d="M50 42 C44 42, 40 50, 35 55 C41 56, 47 53, 50 48 C53 53, 59 56, 65 55 C60 50, 56 42, 50 42 Z" fill="#EA580C" />
                <path d="M47 52 C47 52, 42 70, 36 82 C43 79, 48 70, 50 62 C52 70, 57 79, 64 82 C58 70, 53 52, 53 52 Z" fill="#0F4C3A" />
                <circle cx="50" cy="40" r="4" fill="#F59E0B" />
                <circle cx="37" cy="48" r="3.5" fill="#EA580C" />
                <circle cx="63" cy="48" r="3.5" fill="#EA580C" />
              </svg>
            </div>

            {/* Typography Stack */}
            <div className="flex flex-col">
              <span className={`font-black text-2xl tracking-tight leading-none transition-colors ${
                isScrolled ? 'text-[#0F4C3A] group-hover:text-[#14634C]' : 'text-[#0F4C3A] group-hover:text-[#14634C]'
              }`}>
                CMAOF
              </span>
              <span className={`text-[10px] font-extrabold tracking-wider uppercase leading-tight mt-0.5 ${
                isScrolled ? 'text-[#0F4C3A]' : 'text-[#0F4C3A]'
              }`}>
                CHIEF MICHAEL ADE.OJO
              </span>
              <span className={`text-[10px] font-black tracking-widest uppercase leading-tight ${
                isScrolled ? 'text-[#0F4C3A]' : 'text-[#0F4C3A]'
              }`}>
                FOUNDATION
              </span>
              <span className={`text-[9px] italic font-semibold leading-none mt-0.5 ${
                isScrolled ? 'text-emerald-800' : 'text-emerald-900'
              }`}>
                Stronger People. Brighter Communities.
              </span>
            </div>

          </Link>

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
