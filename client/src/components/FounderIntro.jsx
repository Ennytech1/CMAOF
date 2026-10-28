import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Users } from 'lucide-react';
import { founderImages } from '../assets/founderImages';

const FounderIntro = () => {
  return (
    <section className="py-6 sm:py-8 lg:py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* ── Left Column: Founder Portrait ── */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[260px] sm:max-w-[290px] aspect-[4/4.8] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 group bg-slate-100">
              <img
                src={founderImages.founder1}
                alt="Chief Michael Ade. Ojo, OON"
                className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* ── Middle Column: Story & CTA ── */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-[#EA580C] font-extrabold text-xs tracking-widest uppercase block">
              OUR FOUNDER
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-[#0F2B5B] tracking-tight leading-tight">
              Chief Michael Ade. Ojo, OON
            </h2>

            <p className="text-sm font-bold text-[#EA580C] leading-snug">
              Entrepreneurship, Education and a Legacy of Community Development
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Chief Michael Ade. Ojo, OON, is a Nigerian entrepreneur whose career spans business development, education, investment and community advancement. From Elizade's inception in 1971 to sustained investments in national infrastructure and Elizade University, his story reflects a lifetime commitment to creating opportunity.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/founder"
                className="inline-flex items-center gap-2 bg-[#0F4C3A] hover:bg-[#14634C] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Founder's Profile</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 border border-slate-300 hover:border-[#0F4C3A] text-slate-700 hover:text-[#0F4C3A] px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <span>About CMAOF</span>
              </Link>
            </div>
          </div>

          {/* ── Right Column: Purpose, Vision & Mission ── */}
          <div className="lg:col-span-4 lg:border-l lg:border-slate-200/90 lg:pl-6 space-y-3.5 pt-3 lg:pt-0">

            {/* Our Purpose */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(234, 88, 12, 0.10)' }}>
                <Target size={18} className="text-[#EA580C]" strokeWidth={2.3} />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-extrabold text-[11px] uppercase tracking-wider text-[#EA580C]">
                  OUR PURPOSE
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  To create pathways for people to overcome barriers, unlock their potential and build better lives.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(15, 76, 58, 0.10)' }}>
                <Eye size={18} className="text-[#0F4C3A]" strokeWidth={2.3} />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-extrabold text-[11px] uppercase tracking-wider text-[#0F4C3A]">
                  OUR VISION
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  A society where everyone has the opportunity to live with dignity and achieve self-reliance.
                </p>
              </div>
            </div>

            {/* Our Mission */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(15, 76, 58, 0.10)' }}>
                <Users size={18} className="text-[#0F4C3A]" strokeWidth={2.3} />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-extrabold text-[11px] uppercase tracking-wider text-[#0F4C3A]">
                  OUR MISSION
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
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
