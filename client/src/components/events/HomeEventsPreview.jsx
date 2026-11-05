import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';
import { INITIAL_EVENTS } from '../../data/eventsData';

const HomeEventsPreview = () => {
  // Take top 3 upcoming events
  const upcomingEvents = INITIAL_EVENTS.filter((e) => e.status === 'Upcoming').slice(0, 3);

  return (
    <section className="w-full bg-[#FAF6EE]/50 py-16 sm:py-20 border-y border-[#EFE8DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-[#FCCD37]" />
              <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#5B2E19]">
                UPCOMING FIELD MISSIONS & OUTREACHES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#5B2E19] tracking-tight">
              Join Our Assemblies & Interventions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              Discover opportunities to participate in medical clinics, education symposiums, and community handovers.
            </p>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#5B2E19] hover:text-[#996F00] transition-colors group cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>View Full Events Calendar</span>
            <ArrowRight size={15} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EFE8DC] shadow-xs hover:shadow-xl hover:border-[#FCCD37]/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Image + Date Badge */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs rounded-xl px-2.5 py-1.5 shadow-md border border-[#FCCD37]/60 text-center select-none min-w-[56px]">
                    <span className="block text-base sm:text-lg font-black text-[#5B2E19] leading-none">
                      {event.dateDay}
                    </span>
                    <span className="block text-[10px] font-black uppercase text-[#8C4A26] tracking-wider leading-none mt-1">
                      {event.dateMonthYear}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base sm:text-lg font-black text-[#5B2E19] leading-snug group-hover:text-[#8C4A26] transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-1.5 pt-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                      <Clock size={13} className="text-[#338C26] shrink-0" />
                      <span className="truncate">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin size={13} className="text-[#5B2E19] shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {event.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${tag.bg} ${tag.text}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Link
                  to="/events"
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-white text-xs sm:text-[13px] bg-[#5B2E19] hover:bg-[#3D1E10] transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer"
                >
                  <span>{event.buttonText || 'Register Now'}</span>
                  <ArrowRight size={14} strokeWidth={2.4} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeEventsPreview;
