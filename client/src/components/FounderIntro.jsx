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
          <div className="lg:col-span-4 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#FCCD37]/80 text-[#5B2E19] font-black text-xs tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FCCD37]" />
              OUR FOUNDER
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-[#5B2E19] tracking-tight leading-tight">
              Chief Michael Ade. Ojo, OON
            </h2>

            <p className="text-sm font-bold text-[#8C4A26] leading-snug">
              Entrepreneurship, Education and a Legacy of Community Development
            </p>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Chief Michael Ade. Ojo, OON, is a Nigerian entrepreneur whose career spans business development, education, investment and community advancement. From Elizade's inception in 1971 to sustained investments in national infrastructure and Elizade University, his story reflects a lifetime commitment to creating opportunity.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/founder"
                className="btn-cmao-secondary px-5 py-2.5 text-xs sm:text-sm shadow-md"
              >
                <span>Founder's Profile</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link
                to="/about"
                className="btn-cmao-outline px-4 py-2.5 text-xs sm:text-sm"
              >
                <span>About CMAOF</span>
              </Link>
            </div>
          </div>

          {/* ── Right Column: Purpose, Vision & Mission ── */}
          <div className="lg:col-span-4 lg:border-l lg:border-slate-200/90 lg:pl-6 space-y-4 pt-3 lg:pt-0">

            {/* Our Purpose (Earth Brown) */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-[#5B2E19]/20" style={{ background: '#FAF6EE' }}>
                <Target size={18} className="text-[#5B2E19]" strokeWidth={2.4} />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-extrabold text-[11px] uppercase tracking-wider text-[#5B2E19]">
                  OUR PURPOSE
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  To create pathways for people to overcome barriers, unlock their potential and build better lives.
                </p>
              </div>
            </div>

            {/* Our Vision (Sun Yellow) */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-[#FCCD37]/50" style={{ background: '#FFF8E5' }}>
                <Eye size={18} className="text-[#B8860B]" strokeWidth={2.4} />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-extrabold text-[11px] uppercase tracking-wider text-[#B8860B]">
                  OUR VISION
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  A society where everyone has the opportunity to live with dignity and achieve self-reliance.
                </p>
              </div>
            </div>

            {/* Our Mission (CMAO Green) */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-[#338C26]/30" style={{ background: '#EDF7EB' }}>
                <Users size={18} className="text-[#338C26]" strokeWidth={2.4} />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-extrabold text-[11px] uppercase tracking-wider text-[#338C26]">
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
