import React, { useState } from 'react';
import { Search, X, ArrowRight, FileText, Globe, BookOpen, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import CmaofLogo from './CmaofLogo';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickLinks = [
    { title: 'University Scholarships Program', category: 'Education', link: '/our-work/education' },
    { title: 'Mission 1,000 Ilara Professionals', category: 'Education', link: '/our-work/education' },
    { title: 'Maternal & Child Health Outreach', category: 'Health', link: '/our-work/health' },
    { title: 'Clean Water Borehole Projects', category: 'Community', link: '/our-work/community-resilience' },
    { title: 'Multimedia Photo & Video Gallery', category: 'Gallery', link: '/gallery' },
    { title: 'Annual Financial & Impact Report', category: 'Resources', link: '/resources' },
    { title: 'Chief Michael Ade.Ojo Founder Legacy', category: 'About', link: '/founder' }
  ];

  const filtered = query.trim() 
    ? quickLinks.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()))
    : quickLinks;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative border border-slate-100">
        
        {/* Modal Brand Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <CmaofLogo asLink={false} imgClassName="h-8 sm:h-9 w-auto object-contain" />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex items-center mb-6">
          <Search className="absolute left-4 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search programs, stories, reports, policies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-700"
            autoFocus
          />
        </div>

        {/* Results / Quick Links */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
            {query.trim() ? 'Search Results' : 'Suggested Links & Resources'}
          </span>

          <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
            {filtered.length > 0 ? (
              filtered.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  onClick={onClose}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-[#0F4C3A] border border-slate-100 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0F4C3A] group-hover:border-emerald-300">
                      <FileText size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold leading-tight">{item.title}</h4>
                      <span className="text-[10px] text-slate-400 font-semibold">{item.category}</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-slate-400 group-hover:text-[#0F4C3A] group-hover:translate-x-1 transition-all" />
                </Link>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 text-sm">
                No matching foundation resources found for "{query}".
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SearchModal;
