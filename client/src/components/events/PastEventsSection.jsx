import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ArrowRight, 
  MapPin, 
  Image as ImageIcon, 
  X 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ── Past Events Data matching reference image exactly ──
const pastEventsData = [
  {
    id: 'kano-medical',
    title: 'Medical Outreach – Kano',
    date: 'Aug 2025',
    summary: 'Free healthcare services for over 1,000 beneficiaries.',
    image: '/images/past_event_kano_medical.jpg',
    location: 'Kano State, Nigeria',
    attendees: '1,240 Beneficiaries',
    impact: 'Free screenings, pediatric health, and essential medications delivered across 3 communities.',
  },
  {
    id: 'school-support',
    title: 'School Support Programme',
    date: 'Jul 2025',
    summary: 'Learning materials for 5 schools across rural communities.',
    image: '/images/past_event_school_support.jpg',
    location: 'Ondo & Ekiti Environs',
    attendees: '2,800+ Students Supported',
    impact: 'Distributed over 10,000 exercise books, textbooks, teacher kits, and school uniforms.',
  },
  {
    id: 'clean-water',
    title: 'Clean Water Initiative',
    date: 'Jun 2025',
    summary: 'New boreholes and clean water access in 3 communities.',
    image: '/images/past_event_clean_water.jpg',
    location: 'Selected Rural Settlements',
    attendees: '15,000+ Community Residents',
    impact: 'Commissioned 3 deep solar pumping systems and established local community WASH committees.',
  },
  {
    id: 'community-support',
    title: 'Community Support Activity',
    date: 'May 2025',
    summary: 'Food and essential items for vulnerable families.',
    image: '/images/past_event_community_relief.jpg',
    location: 'Southwest Rural Environs',
    attendees: '850 Families Reached',
    impact: 'Nutritional food packages, sanitation kits, and emergency elderly welfare assistance provided.',
  },
];

const PastEventsSection = () => {
  const [selectedGalleryEvent, setSelectedGalleryEvent] = useState(null);

  // Body scroll lock and Escape key listener
  useEffect(() => {
    if (selectedGalleryEvent) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedGalleryEvent(null);
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedGalleryEvent]);

  return (
    <section id="past-events" className="w-full bg-white py-14 sm:py-18 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* ═══════════════════════════════════════════════════════════
            1. SECTION HEADER ROW (Accent Bar, Title & Subtitle + View All Link)
            ═══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          
          {/* Left: Accent Bar + Title & Subtitle */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-[4px] h-6 bg-[#FCCD37] rounded-full shrink-0 shadow-xs" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5B2E19] tracking-tight">
                Past Events
              </h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm font-medium pl-3.5">
              Highlights from our recent events and activities.
            </p>
          </div>

          {/* Right: View All Past Events Link */}
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#5B2E19] hover:text-[#8C4A26] transition-colors group cursor-pointer self-start sm:self-auto"
          >
            <span>View All Past Events</span>
            <ArrowRight size={15} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>

        {/* ═══════════════════════════════════════════════════════════
            2. 4-COLUMN PAST EVENTS CARDS GRID
            ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastEventsData.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              
              {/* Card Top: Image */}
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content Area */}
                <div className="p-4 sm:p-5 space-y-2">
                  
                  {/* Title & Circular Arrow Icon */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-extrabold text-[#5B2E19] leading-snug group-hover:text-[#8C4A26] transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    
                    {/* Brand Circular Arrow Button */}
                    <button
                      onClick={() => setSelectedGalleryEvent(event)}
                      className="w-7 h-7 rounded-full bg-[#FFF8E5] text-[#5B2E19] hover:bg-[#5B2E19] hover:text-[#FCCD37] flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-2xs group-hover:scale-105"
                      title="View Event Details"
                    >
                      <ArrowRight size={13} strokeWidth={2.4} />
                    </button>
                  </div>

                  {/* Date Stamp */}
                  <p className="text-xs font-semibold text-slate-500">
                    {event.date}
                  </p>

                  {/* Summary */}
                  <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed line-clamp-2 pt-0.5">
                    {event.summary}
                  </p>

                </div>
              </div>

              {/* Card Footer: View Gallery Link */}
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1">
                <button
                  onClick={() => setSelectedGalleryEvent(event)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#5B2E19] hover:text-[#8C4A26] transition-colors cursor-pointer"
                >
                  <span>View Gallery</span>
                  <ArrowRight size={13} strokeWidth={2.4} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════
          3. PAST EVENT DETAIL & GALLERY MODAL - PORTAL
          ═══════════════════════════════════════════════════════════ */}
      {selectedGalleryEvent && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedGalleryEvent(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedGalleryEvent.title}
        >
          <div 
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-950/15 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tricolor top brand bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#5B2E19] via-[#8C4A26] to-[#FCCD37]" />
            
            {/* Modal Image Header */}
            <div className="relative h-48 bg-[#2B1309] overflow-hidden shrink-0">
              <img
                src={selectedGalleryEvent.image}
                alt={selectedGalleryEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1309] via-[#2B1309]/60 to-transparent" />
              
              <button
                onClick={() => setSelectedGalleryEvent(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-[#5B2E19] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close (Esc)"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#FCCD37]">
                  {selectedGalleryEvent.date}
                </span>
                <h3 className="text-xl font-black leading-tight text-white mt-0.5">
                  {selectedGalleryEvent.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 min-h-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-[#FAF6EE]/70 p-3 rounded-xl border border-slate-200">
                <MapPin size={15} className="text-[#8C4A26] shrink-0" />
                <span>{selectedGalleryEvent.location}</span>
                <span className="mx-2 text-slate-300">•</span>
                <span className="text-[#338C26] font-bold">{selectedGalleryEvent.attendees}</span>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#5B2E19] mb-1">
                  Community Impact Summary
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {selectedGalleryEvent.impact}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  to="/gallery"
                  className="flex-1 py-3 rounded-xl btn-cmao-primary font-bold text-xs text-center flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-[#FCCD37]/20"
                >
                  <ImageIcon size={14} />
                  <span>Explore Full Photo Album</span>
                </Link>
                <button
                  onClick={() => setSelectedGalleryEvent(null)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-[#FAF6EE] text-xs font-bold cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

    </section>
  );
};

export default PastEventsSection;
