import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Calendar as CalendarIcon, 
  Star, 
  BookOpen, 
  HeartPulse, 
  Users, 
  Briefcase, 
  MapPin, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Clock, 
  Share2 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { INITIAL_EVENTS } from '../../data/eventsData';

// ── Events Data from unified dataset ──
const eventsData = INITIAL_EVENTS;

// ── Filter Tabs matching top row icons & labels ──
const filterTabs = [
  { id: 'all', label: 'All Events', icon: CalendarIcon, color: '#06402B' },
  { id: 'foundation', label: 'Foundation Events', icon: Star, color: '#1D4ED8' },
  { id: 'education', label: 'Education Initiatives', icon: BookOpen, color: '#0B2D6E' },
  { id: 'medical', label: 'Medical Outreaches', icon: HeartPulse, color: '#DC2626' },
  { id: 'community', label: 'Community Activities', icon: Users, color: '#EA580C' },
  { id: 'stakeholder', label: 'Stakeholder Meetings', icon: Briefcase, color: '#06402B' },
];

const UpcomingEventsSection = ({ onOpenDonate }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'register' | 'details'
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
  });

  // Filter logic
  const filteredEvents = eventsData.filter((event) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'stakeholder') return event.stakeholder;
    return event.category === activeTab;
  });

  const handleOpenAction = (event, type) => {
    setSelectedEventForModal(event);
    setModalMode(type);
    setRegistrationSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedEventForModal(null);
    setModalMode(null);
    setRegistrationSuccess(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please enter your full name and email address.');
      return;
    }
    setRegistrationSuccess(true);
    toast.success(`Registered for ${selectedEventForModal.title}!`, {
      icon: '🎉',
    });
  };

  // Body scroll lock and Escape key listener
  useEffect(() => {
    if (selectedEventForModal) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') handleCloseModal();
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedEventForModal]);

  return (
    <section id="upcoming-events" className="w-full bg-[#F8FAFC] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* ═══════════════════════════════════════════════════════════
            1. TOP FILTER TABS BAR (Horizontal Pill Buttons Row)
            ═══════════════════════════════════════════════════════════ */}
        <div className="overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-max">
            {filterTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-xs select-none ${
                    isActive
                      ? 'bg-[#06402B] text-white shadow-md scale-[1.02]'
                      : 'bg-white text-[#0B2D6E] hover:bg-slate-100 hover:text-[#06402B] border border-slate-200/80'
                  }`}
                >
                  <IconComponent
                    size={18}
                    strokeWidth={isActive ? 2.5 : 2.2}
                    style={{ color: isActive ? '#FFFFFF' : tab.color }}
                    className="shrink-0"
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            2. SECTION HEADER ROW (Title & Subtitle + View All Link)
            ═══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
          
          {/* Left: Orange Accent Bar + Title & Subtitle */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-[3.5px] h-6 bg-[#EA580C] rounded-xs shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D6E] tracking-tight">
                Upcoming Events
              </h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm font-medium pl-3.5">
              Be part of our upcoming events and initiatives.
            </p>
          </div>

          {/* Right: View All Upcoming Events Link */}
          <button
            onClick={() => setActiveTab('all')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#06402B] hover:text-[#042D1E] transition-colors group cursor-pointer self-start sm:self-auto"
          >
            <span>View All Upcoming Events</span>
            <ArrowRight size={15} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
          </button>

        </div>

        {/* ═══════════════════════════════════════════════════════════
            3. 4-COLUMN EVENTS CARD GRID
            ═══════════════════════════════════════════════════════════ */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <CalendarIcon size={36} className="mx-auto text-slate-400" />
            <h3 className="text-lg font-bold text-[#0B2D6E]">No events found in this category</h3>
            <p className="text-xs text-slate-500">Check back soon or explore all our active initiatives.</p>
            <button
              onClick={() => setActiveTab('all')}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[#06402B] text-white font-bold text-xs"
            >
              Show All Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                
                {/* ── Card Top: Image + Floating White Date Badge ── */}
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Floating Date Badge (Top-Left) */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs rounded-xl px-2.5 py-1.5 shadow-md border border-white/80 text-center select-none min-w-[56px]">
                      <span className="block text-base sm:text-lg font-black text-[#06402B] leading-none">
                        {event.dateDay}
                      </span>
                      <span className="block text-[10px] font-extrabold uppercase text-slate-700 tracking-wider leading-none mt-1">
                        {event.dateMonthYear}
                      </span>
                    </div>
                  </div>

                  {/* ── Card Body: Title, Description, Location, Tags ── */}
                  <div className="p-4 sm:p-5 space-y-3">
                    
                    {/* Title */}
                    <h3 className="text-base sm:text-[17px] font-extrabold text-[#0B2D6E] leading-snug group-hover:text-[#06402B] transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed line-clamp-3">
                      {event.description}
                    </p>

                    {/* Location Pin */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 pt-1">
                      <MapPin size={14} className="text-[#DC2626] shrink-0" />
                      <span className="font-semibold truncate">{event.location}</span>
                    </div>

                    {/* Category Tags Pills Row */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {event.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-md ${tag.bg} ${tag.text} select-none`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

                {/* ── Card Bottom: Solid Dark Green Action Button ── */}
                <div className="p-4 sm:p-5 pt-0">
                  <button
                    onClick={() => handleOpenAction(event, event.buttonType)}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-white text-xs sm:text-[13px] transition-all duration-200 flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer hover:scale-[1.01] active:scale-95"
                    style={{ backgroundColor: '#06402B' }}
                  >
                    <span>{event.buttonText}</span>
                    <ArrowRight size={14} strokeWidth={2.4} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* ═══════════════════════════════════════════════════════════
          4. INTERACTIVE MODAL (Register Now / Learn More) - PORTAL
          ═══════════════════════════════════════════════════════════ */}
      {selectedEventForModal && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label={selectedEventForModal.title}
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-950/15 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tricolor top brand bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#06402B] via-[#0B2D6E] to-[#EA580C]" />
            
            {/* Modal Header */}
            <div className="relative h-40 bg-slate-900 overflow-hidden shrink-0">
              <img
                src={selectedEventForModal.image}
                alt={selectedEventForModal.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
              
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-[#EA580C] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close (Esc)"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#D4AF37]">
                  {selectedEventForModal.dateDay} {selectedEventForModal.dateMonthYear}
                </span>
                <h3 className="text-lg font-black leading-tight text-white mt-0.5">
                  {selectedEventForModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 min-h-0">
              
              {/* Event Quick Details */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin size={15} className="text-[#EA580C] shrink-0" />
                  <span className="font-semibold truncate">{selectedEventForModal.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock size={15} className="text-[#06402B] shrink-0" />
                  <span className="font-semibold truncate">{selectedEventForModal.time}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {selectedEventForModal.description}
              </p>

              {/* Form or Confirmation */}
              {modalMode === 'register' ? (
                registrationSuccess ? (
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <CheckCircle2 size={36} className="text-[#06402B] mx-auto" />
                    <h4 className="text-sm font-extrabold text-[#06402B]">Registration Confirmed!</h4>
                    <p className="text-xs text-slate-600">
                      An event pass and invitation schedule have been sent to your email address.
                    </p>
                    <button
                      onClick={handleCloseModal}
                      className="mt-3 px-5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white text-xs font-bold cursor-pointer transition-colors"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-3.5 pt-1">
                    <h4 className="text-xs font-extrabold text-[#0B2D6E] uppercase tracking-wider">
                      Attendee Registration
                    </h4>
                    
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Adebayo Ogunlesi"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B] focus:ring-1 focus:ring-[#06402B]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          placeholder="adebayo@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B] focus:ring-1 focus:ring-[#06402B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+234 800 000 0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B] focus:ring-1 focus:ring-[#06402B]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#06402B] hover:bg-[#042D1E] text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                    >
                      Complete Free Registration
                    </button>
                  </form>
                )
              ) : (
                /* Learn More Details */
                <div className="space-y-4 pt-1">
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold text-[#0B2D6E] uppercase tracking-wider">
                      Event Highlights & Purpose
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>Strategic agenda aligned with CMAOF community transformation goals.</li>
                      <li>Free participation supported by the Chief Michael Ade.Ojo Foundation.</li>
                      <li>Opportunities for networking, local stakeholder dialogue, and support.</li>
                    </ul>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setModalMode('register')}
                      className="flex-1 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042D1E] text-white font-bold text-xs transition-all cursor-pointer text-center"
                    >
                      Register to Attend
                    </button>
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: selectedEventForModal.title,
                            text: selectedEventForModal.description,
                            url: window.location.href,
                          }).catch(() => {});
                        } else {
                          toast.success('Event link copied to clipboard!');
                        }
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                      title="Share Event"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>,
        document.body
      )}

    </section>
  );
};

export default UpcomingEventsSection;
