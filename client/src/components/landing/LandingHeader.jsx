import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Search, ChevronDown, Award, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingHeader = ({ searchQuery, setSearchQuery, onSearch }) => {
  const [showExploreMenu, setShowExploreMenu] = useState(false);

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200/80 py-4 px-6 md:px-8 z-50 shadow-sm">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-6 relative">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 hover:opacity-90 transition-opacity">
          <div className="w-9.5 h-9.5 bg-[#00B4D8]/10 rounded-xl flex items-center justify-center text-[#00B4D8] shrink-0 shadow-sm border border-[#00B4D8]/10">
            <GraduationCap size={22} className="stroke-[2.5]" />
          </div>
          <span className="font-black text-xl tracking-tight text-[#0A192F] font-plus-jakarta">
            Career<span className="text-[#00B4D8]">MAX</span>
          </span>
        </Link>

        {/* Navigation & Explore Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-[#334155] relative">
          
          {/* Explore Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowExploreMenu(true)}
            onMouseLeave={() => setShowExploreMenu(false)}
          >
            <button className="flex items-center gap-1 px-4 py-2 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:text-[#0A192F] rounded-xl transition-all cursor-pointer">
              Explore <ChevronDown size={14} className={`text-slate-500 transition-transform duration-200 ${showExploreMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Panel */}
            <AnimatePresence>
              {showExploreMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-[420px] bg-white border border-slate-200 shadow-xl rounded-2xl p-6 z-50 grid grid-cols-2 gap-6"
                >
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Award size={12} className="text-[#00B4D8]" /> Professional Certs
                    </p>
                    <div className="space-y-2 text-xs font-semibold text-[#334155]">
                      <Link to="/register" className="block hover:text-[#00B4D8] transition-colors">Leasing Professional (CLP)</Link>
                      <Link to="/register" className="block hover:text-[#00B4D8] transition-colors">Asset Finance (LAFS)</Link>
                      <Link to="/register" className="block hover:text-[#00B4D8] transition-colors">Full-Stack Software Eng</Link>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <BookOpen size={12} className="text-[#00B4D8]" /> Popular Fields
                    </p>
                    <div className="space-y-2 text-xs font-semibold text-[#334155]">
                      <Link to="/register" className="block hover:text-[#00B4D8] transition-colors">Data Science & BI</Link>
                      <Link to="/register" className="block hover:text-[#00B4D8] transition-colors">AI & Agent Architectures</Link>
                      <Link to="/register" className="block hover:text-[#00B4D8] transition-colors">Product Management</Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#features" className="hover:text-[#0A192F] transition-colors">Certifications</a>
          <a href="#pricing" className="hover:text-[#0A192F] transition-colors">For Enterprise</a>
        </div>

        {/* Central Search Form */}
        <form onSubmit={onSearch} className="flex-1 max-w-md relative hidden sm:flex items-center group">
          <Search size={16} className="absolute left-4 text-slate-400 group-focus-within:text-[#00B4D8] transition-colors pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search credentials, skills, or accreditors..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/80 focus:border-[#00B4D8] focus:bg-white rounded-2xl pl-11 pr-4 py-2.5 text-xs font-medium text-[#334155] outline-none transition-all placeholder-slate-400 focus:shadow-md focus:shadow-[#00B4D8]/5"
          />
        </form>

        {/* Auth CTA Buttons */}
        <div className="flex items-center gap-4 shrink-0">
          <Link to="/login" className="text-xs font-bold text-[#334155] hover:text-[#0A192F] transition-colors px-2 py-1.5">
            Log In
          </Link>
          <Link 
            to="/register" 
            className="bg-[#00B4D8] hover:bg-[#0092b0] text-white text-xs font-bold px-5.5 py-3 rounded-2xl shadow-md shadow-[#00B4D8]/10 hover:shadow-[#00B4D8]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Join for Free
          </Link>
        </div>

      </div>
    </header>
  );
};

export default LandingHeader;
