import React from 'react';
import { Calendar, MapPin, ArrowRight, Users } from 'lucide-react';
import EventHero from '../components/events/EventHero';
import UpcomingEventsSection from '../components/events/UpcomingEventsSection';
import PastEventsSection from '../components/events/PastEventsSection';
import EventCtaSection from '../components/events/EventCtaSection';

const EventsPage = ({ onOpenDonate }) => {
  const scrollToUpcoming = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('upcoming-events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCalendar = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('event-calendar');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* ── 1. The Exact Event Hero Section ── */}
      <EventHero
        onOpenDonate={onOpenDonate}
        onViewEvents={scrollToUpcoming}
        onViewCalendar={scrollToCalendar}
      />

      {/* ── 2. The Exact Upcoming Events Section with Filter Tabs & 4-Card Grid ── */}
      <UpcomingEventsSection onOpenDonate={onOpenDonate} />

      {/* ── 3. The Exact Past Events Section with 4 Cards & Dual CTA Strip ── */}
      <PastEventsSection onOpenDonate={onOpenDonate} onViewCalendar={scrollToCalendar} />

      {/* ── 3. Interactive Event Calendar Section ── */}
      <section id="event-calendar" className="bg-white border-y border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-[3.5px] h-4 bg-[#EA580C] rounded-xs" />
                <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#06402B]">
                  EVENT CALENDAR
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2D6E] tracking-tight">
                Plan Your Participation
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Stay updated with the full foundation schedule. We publish regular updates for scholarship exams, medical outreaches, leadership seminars, and community projects.
              </p>

              <div className="pt-2 space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#06402B] flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2D6E]">Sync to Your Personal Calendar</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Subscribe to our Google Calendar or Apple iCal feed for automatic event notifications.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center shrink-0 mt-0.5">
                    <Users size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B2D6E]">Partner or Propose an Event</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Organizations and youth groups can propose joint community initiatives with CMAOF.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#06402B] hover:bg-[#0B2D6E] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm"
                >
                  <span>Propose an Initiative</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* Calendar Overview Table */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-extrabold text-[#0B2D6E]">Annual Activity Highlights</h3>
                  <p className="text-xs text-slate-500">2025 – 2026 Strategic Schedule</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#06402B] font-bold text-xs">
                  Active Year
                </span>
              </div>

              <div className="space-y-3.5">
                {[
                  { month: 'NOV', day: '12', title: 'Free Medical Outreach – Ibadan', location: 'Ibadan, Oyo State', color: 'bg-rose-600' },
                  { month: 'DEC', day: '05', title: 'Education Support Initiative', location: 'Kaduna State', color: 'bg-blue-600' },
                  { month: 'JAN', day: '20', title: 'Community Leaders Forum', location: 'Abuja', color: 'bg-amber-600' },
                  { month: 'APR', day: '15 - 17', title: 'CMAOF Foundation Summit 2026', location: 'Eko Hotels, Lagos', color: 'bg-emerald-600' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 transition-all shadow-xs"
                  >
                    <div className="w-14 h-12 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase leading-none">{item.month}</span>
                      <span className="text-sm font-black text-[#0B2D6E] leading-none mt-1">{item.day}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{item.title}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <MapPin size={12} className="text-[#EA580C]" />
                        <span>{item.location}</span>
                      </p>
                    </div>

                    <div className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 5. Dual CTA Banner Section (Positioned before the global footer with 0 bottom margin & matching footer width) ── */}
      <EventCtaSection onOpenDonate={onOpenDonate} onViewCalendar={scrollToCalendar} />

    </div>
  );
};

export default EventsPage;
