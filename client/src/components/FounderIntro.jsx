import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Users } from 'lucide-react';

const FounderIntro = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ── Left Column: Founder Portrait ── */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none aspect-[4/4.5] sm:aspect-[4/5] lg:aspect-[3.8/4.8] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-100 group">
              <img
                src="/images/founder_new.jpg"
                alt="Chief Michael Ade.Ojo"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* ── Middle Column: Story & CTA ── */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[#EA580C] font-extrabold text-xs tracking-widest uppercase block">
              OUR FOUNDER
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#0F2B5B] tracking-tight leading-tight">
              A Legacy of People and Possibilities
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Chief Michael Ade.Ojo is a distinguished entrepreneur and
              philanthropist whose life of service and commitment to community
              development continues to inspire lasting change.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The Chief Michael Ade.Ojo Foundation (CMAOF) carries forward his
              enduring belief in the power of education, health and strong communities
              to create a better, more prosperous Nigeria.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 bg-[#0F4C3A] hover:bg-[#14634C] text-white px-6 py-2.5 sm:py-3 rounded-full font-bold text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Read Our Story</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* ── Right Column: Purpose, Vision & Mission ── */}
          <div className="lg:col-span-4 lg:border-l lg:border-slate-200/90 lg:pl-8 space-y-6 pt-4 lg:pt-0">

            {/* Our Purpose */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(234, 88, 12, 0.10)' }}>
                <Target size={24} className="text-[#EA580C]" strokeWidth={2.3} />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#EA580C]">
                  OUR PURPOSE
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  To create pathways for people to overcome barriers, unlock their potential and build better lives.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(15, 76, 58, 0.10)' }}>
                <Eye size={24} className="text-[#0F4C3A]" strokeWidth={2.3} />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#0F4C3A]">
                  OUR VISION
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  A society where everyone has the opportunity to live with dignity and achieve self-reliance.
                </p>
              </div>
            </div>

            {/* Our Mission */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(15, 76, 58, 0.10)' }}>
                <Users size={24} className="text-[#0F4C3A]" strokeWidth={2.3} />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#0F4C3A]">
                  OUR MISSION
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  To empower people, expand opportunity and strengthen communities to build better futures.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderIntro;
