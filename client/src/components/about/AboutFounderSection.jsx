import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Heart, Users, Star, Images } from 'lucide-react';
import { founderImages } from '../../assets/founderImages';

const AboutFounderSection = ({ onReadStory }) => {
  return (
    <section className="py-6 sm:py-8 lg:py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* ── Column 1: Founder Portrait (4 cols) ── */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/4.8] rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 group bg-slate-100">
              <img
                src={founderImages.founder1}
                alt="Chief Michael Ade. Ojo, OON"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* ── Column 2: Bio Text & Story CTA (5 cols) ── */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Eyebrow tag */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#FCCD37] rounded-full shrink-0" />
              <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#5B2E19] font-sans">
                FOUNDER'S PROFILE
              </span>
            </div>

            {/* Name */}
            <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-black text-[#5B2E19] tracking-tight leading-tight font-sans">
              Chief Michael Ade. Ojo, OON
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-bold text-[#8C4A26] font-sans leading-snug">
              Entrepreneurship, Education and a Legacy of Community Development
            </p>

            {/* Bio text */}
            <p className="text-slate-700 text-xs sm:text-base leading-relaxed font-normal">
              Chief Michael Ade. Ojo, OON, is a Nigerian entrepreneur whose career spans business development, education, investment and community advancement. From the establishment of Elizade Independent Agencies in 1971 to sustained investments in institutions and local infrastructure, his story reflects a long-standing commitment to creating opportunities beyond commercial enterprise.
            </p>

            {/* Pill Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/founder"
                className="btn-cmao-secondary px-6 py-3 text-xs sm:text-sm shadow-md"
              >
                <span>Read Full Biography</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>

              <button
                type="button"
                onClick={onReadStory}
                className="btn-cmao-outline px-5 py-3 text-xs sm:text-sm font-bold"
              >
                <Images size={15} />
                <span>Archival Photos</span>
              </button>
            </div>

          </div>

          {/* ── Column 3: "A LEGACY THAT LIVES ON" Card (3 cols) ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl p-5 sm:p-6 border border-[#EFE8DC] shadow-xs space-y-5 bg-[#FAF6EE]/60">
              
              <h3 className="text-xs font-black uppercase tracking-wider text-[#5B2E19] font-sans">
                A LEGACY THAT LIVES ON
              </h3>

              <div className="space-y-4">
                {/* Item 1: Graduation Cap (CMAO Blue) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#EBF3FC] text-[#0047BA] flex items-center justify-center shrink-0 mt-0.5 border border-[#0047BA]/20">
                    <GraduationCap size={18} strokeWidth={2.4} />
                  </div>
                  <p className="text-xs font-semibold text-slate-800 leading-snug">
                    Champion for education and human development
                  </p>
                </div>

                {/* Item 2: Heart (CMAO Green) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#EDF7EB] text-[#338C26] flex items-center justify-center shrink-0 mt-0.5 border border-[#338C26]/20">
                    <Heart size={18} className="fill-[#338C26] text-[#338C26]" strokeWidth={2.2} />
                  </div>
                  <p className="text-xs font-semibold text-slate-800 leading-snug">
                    Passionate about the well-being of people and communities
                  </p>
                </div>

                {/* Item 3: Users (CMAO Earth Brown) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white text-[#5B2E19] flex items-center justify-center shrink-0 mt-0.5 border border-[#5B2E19]/25 shadow-xs">
                    <Users size={18} strokeWidth={2.4} />
                  </div>
                  <p className="text-xs font-semibold text-slate-800 leading-snug">
                    A visionary philanthropist and nation-builder
                  </p>
                </div>

                {/* Item 4: Star (Sun Yellow) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FFF8E5] text-[#D4A017] flex items-center justify-center shrink-0 mt-0.5 border border-[#FCCD37]/40">
                    <Star size={18} className="fill-[#FCCD37] text-[#D4A017]" strokeWidth={2.2} />
                  </div>
                  <p className="text-xs font-semibold text-slate-800 leading-snug">
                    An enduring legacy of compassion, opportunity and impact
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutFounderSection;
