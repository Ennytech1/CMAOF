import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, FileText, Globe, BookOpen, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import CmaofLogo from './CmaofLogo';

const CATEGORY_COLORS = {
  Education: { bg: 'bg-[#EA580C]/10', text: 'text-[#EA580C]', border: 'border-[#EA580C]/30' },
  Health: { bg: 'bg-[#06402B]/10', text: 'text-[#06402B]', border: 'border-[#06402B]/30' },
  Community: { bg: 'bg-[#0B2D6E]/10', text: 'text-[#0B2D6E]', border: 'border-[#0B2D6E]/30' },
  Gallery: { bg: 'bg-amber-500/10', text: 'text-amber-700', border: 'border-amber-400/30' },
  Resources: { bg: 'bg-emerald-600/10', text: 'text-emerald-700', border: 'border-emerald-500/30' },
  About: { bg: 'bg-[#06402B]/10', text: 'text-[#06402B]', border: 'border-[#06402B]/30' },
};

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const quickLinks = [
    { title: 'Chief Michael Ade. Ojo, OON — Official Founder Profile', category: 'About', link: '/founder', keywords: 'elizade founder oon ade ojo bio ilara-mokin assembly plant smtb toyota' },
    { title: 'Elizade University & Academic Sponsorships', category: 'Education', link: '/founder', keywords: 'elizade university accreditation nuc higher education scholarship' },
    { title: 'University Scholarships Program', category: 'Education', link: '/our-work/education' },
    { title: 'Mission 1,000 Ilara Professionals', category: 'Education', link: '/our-work/education' },
    { title: 'Maternal & Child Health Outreach', category: 'Health', link: '/our-work/health' },
    { title: 'Clean Water Borehole Projects', category: 'Community', link: '/our-work/community-resilience' },
    { title: 'Multimedia Photo & Video Gallery', category: 'Gallery', link: '/gallery' },
    { title: 'Annual Financial & Impact Report', category: 'Resources', link: '/resources' },
    { title: 'Chief Michael Ade. Ojo Archival Photo Gallery', category: 'Gallery', link: '/gallery' }
  ];

  const filtered = query.trim() 
    ? quickLinks.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        (item.keywords && item.keywords.toLowerCase().includes(query.toLowerCase()))
      )
    : quickLinks;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="CMAOF Global Resource Search"
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-emerald-900/10 flex flex-col max-h-[85vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Tricolor Brand Accent Top Bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#06402B] via-[#0B2D6E] to-[#EA580C]" />

        <div className="p-5 sm:p-6 flex flex-col flex-1 min-h-0">
          {/* Modal Brand Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <CmaofLogo asLink={false} imgClassName="h-8 sm:h-9 w-auto object-contain" />
              <div className="hidden sm:block h-5 w-px bg-slate-200" />
              <span className="hidden sm:inline-block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Resource Navigator
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#EA580C] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close search (Esc)"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Input Bar with CMAOF Brand Green Focus Ring */}
          <div className="relative flex items-center mb-5 shrink-0">
            <Search className="absolute left-4 w-5 h-5 text-emerald-800/60" />
            <input
              type="text"
              placeholder="Search initiatives, scholarships, annual reports, founder legacy..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#06402B] focus:border-[#06402B] transition-all shadow-inner"
              autoFocus
            />
          </div>

          {/* Results / Quick Links */}
          <div className="flex-1 min-h-0 flex flex-col space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {query.trim() ? `Search Results (${filtered.length})` : 'Recommended Foundation Direct Links'}
              </span>
              <span className="text-[11px] font-semibold text-[#06402B]">
                CMAOF Archive
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar">
              {filtered.length > 0 ? (
                filtered.map((item, idx) => {
                  const tagStyle = CATEGORY_COLORS[item.category] || { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' };
                  return (
                    <Link
                      key={idx}
                      to={item.link}
                      onClick={onClose}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/60 text-slate-800 hover:text-[#06402B] border border-slate-100 hover:border-emerald-300 transition-all group shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#06402B] group-hover:border-emerald-400 group-hover:bg-[#06402B] group-hover:text-white transition-all shrink-0 shadow-xs">
                          <FileText size={16} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold leading-tight truncate group-hover:text-[#06402B] transition-colors">
                            {item.title}
                          </h4>
                          <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}`}>
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-slate-400 group-hover:text-[#06402B] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </Link>
                  );
                })
              ) : (
                <div className="text-center py-10 text-slate-400 text-sm space-y-2">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Search size={20} />
                  </div>
                  <p className="font-semibold text-slate-600">No matching foundation resources found for "{query}"</p>
                  <p className="text-xs text-slate-400">Try searching for "Scholarships", "Health", "Ilara", or "Founder"</p>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer Tip */}
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">ESC</kbd> to close</span>
            <span className="font-semibold text-[#06402B]">Chief Michael Ade.Ojo Foundation</span>
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
};

export default SearchModal;
