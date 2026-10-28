import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, ShieldCheck, Phone, ArrowRight } from 'lucide-react';

const ContactHero = () => {
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [currentTimeWAT, setCurrentTimeWAT] = useState('');

  useEffect(() => {
    const updateTime = () => {
      // Calculate West Africa Time (UTC+1)
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const watTime = new Date(utc + 3600000 * 1);
      
      const hours = watTime.getHours();
      const minutes = watTime.getMinutes();
      const day = watTime.getDay(); // 0 is Sunday, 6 is Saturday

      // Business hours: Monday to Friday (1-5), 8:00 to 17:00
      const isWeekday = day >= 1 && day <= 5;
      const isWorkingHour = hours >= 8 && hours < 17;
      setIsOpenNow(isWeekday && isWorkingHour);

      const timeString = watTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTimeWAT(timeString);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white select-text" style={{ minHeight: '480px' }}>
      {/* Background Image: Composite of Students, Boy, and Chief Michael Ade.Ojo */}
      <div
        className="absolute inset-0 bg-cover bg-right lg:bg-[position:82%_center] bg-no-repeat transition-all duration-700"
        style={{ backgroundImage: `url('/images/hero_composite.jpg')` }}
        aria-hidden="true"
      />

      {/* ── High-Contrast Linear Gradient Overlay: ensures 100% solid, crisp white backing behind all text ── */}
      <div
        className="absolute inset-0 hidden md:block pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 32%, rgba(255,255,255,0.92) 46%, rgba(255,255,255,0.40) 60%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      {/* Mobile Vertical Gradient Fallback */}
      <div
        className="absolute inset-0 md:hidden pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 65%, rgba(255,255,255,0.40) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content Container (Padded below fixed navbar) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[96px] sm:pt-[110px] lg:pt-[122px] pb-12 sm:pb-16 lg:pb-18 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 sm:space-y-5 max-w-2xl">
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0B2D6E]">
              <div className="w-[3px] h-3.5 bg-[#EA580C] rounded-full shrink-0" />
              <Link to="/" className="hover:text-[#06402B] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-400 stroke-[2.2]" />
              <span className="text-[#0B2D6E] font-bold">Contact Secretariat</span>
            </div>

            {/* Category Eyebrow Header with Orange Indicator matching official brand pattern */}
            <div className="flex items-center gap-2 pt-0.5">
              <div className="w-[3.5px] h-4.5 bg-[#EA580C] rounded-xs shrink-0" />
              <span className="text-xs sm:text-[13px] font-black uppercase tracking-[0.2em] text-[#06402B]">
                OFFICIAL FOUNDATION SECRETARIAT
              </span>
            </div>

            {/* High-Contrast Brand Stacked Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-extrabold tracking-tight leading-[1.08] text-left">
              <span className="block text-[#06402B]">Connect With</span>
              <span className="block text-[#0B2D6E] mt-0.5">
                Chief Michael Ade.Ojo <span className="text-[#06402B]">Foundation</span>
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-slate-600 sm:text-slate-700 text-sm sm:text-base lg:text-[16.5px] leading-relaxed max-w-xl font-normal">
              We welcome dialogue with prospective scholarship beneficiaries, developmental partners, 
              institutional benefactors, and community advocates dedicated to transforming lives across Nigeria.
            </p>

            {/* Action Buttons Row matching Home and Event Heroes */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1.5 sm:pt-2">
              {/* Primary Action Button: Dispatch Official Enquiry */}
              <a
                href="#contact-enquiry-form"
                onClick={(e) => {
                  e.preventDefault();
                  const formElement = document.getElementById('contact-enquiry-form');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-md cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #E67E22 55%, #EA580C 100%)',
                  boxShadow: '0 6px 20px -4px rgba(234, 88, 12, 0.45)',
                }}
              >
                <span>Dispatch Official Enquiry</span>
                <ArrowRight size={16} strokeWidth={2.4} />
              </a>

              {/* Secondary Action Button: Toll-Free Helpline */}
              <a
                href="tel:+2348002626363"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-xs cursor-pointer bg-white border-2"
                style={{ borderColor: '#06402B', color: '#06402B' }}
              >
                <Phone size={16} strokeWidth={2.2} style={{ color: '#06402B' }} />
                <span>Helpline: 0800-CMAOF</span>
              </a>
            </div>

            {/* Real-time Status Indicators */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200/90 mt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200/80 shadow-2xs text-xs font-semibold text-[#06402B]">
                <span className={`w-2.5 h-2.5 rounded-full ${isOpenNow ? 'bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.7)]' : 'bg-amber-500'}`} />
                <span>
                  {isOpenNow ? 'Secretariat Open (WAT)' : 'Secretariat Closed'}
                  {currentTimeWAT ? ` • ${currentTimeWAT}` : ''}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/95 border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700">
                <Clock size={13} className="text-[#EA580C]" />
                <span>Avg. Turnaround: &lt; 24-48 Business Hours</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/95 border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700">
                <ShieldCheck size={13} className="text-[#06402B]" />
                <span>Verified Direct Official Channels</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
