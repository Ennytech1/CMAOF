import React from 'react';
import { ArrowRight, GraduationCap, Heart, Users, Star } from 'lucide-react';

const AboutFounderSection = ({ onReadStory }) => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* ── Column 1: Sepia Founder Portrait (4 cols) ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none aspect-[4/4.8] rounded-2xl overflow-hidden shadow-md border border-slate-200/90 group">
                <img
                  src="/images/founder_portrait_sepia.jpg"
                  alt="Chief Michael Ade.Ojo"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* ── Column 2: Bio Text & Story CTA (5 cols) ── */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Eyebrow tag */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#EA580C] rounded-full shrink-0" />
                <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0F4C3A] font-sans">
                  OUR FOUNDER
                </span>
              </div>

              {/* Name */}
              <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-black text-[#0F2B5B] tracking-tight leading-tight font-sans">
                Chief Michael Ade.Ojo
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base font-bold text-[#0F2B5B] font-sans">
                A Life of Service, A Legacy of Impact
              </p>

              {/* Bio text */}
              <p className="text-slate-700 text-xs sm:text-base leading-relaxed font-medium">
                Chief Michael Ade.Ojo is a distinguished entrepreneur, philanthropist and community leader whose life of service and commitment to nation-building continues to inspire generations. His belief in the power of education, health and strong communities laid the foundation for CMAOF and continues to shape its mission today.
              </p>

              {/* Pill Button */}
              <div className="pt-2">
                <button
                  onClick={onReadStory}
                  className="bg-[#0F4C3A] hover:bg-[#14634C] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Read the Founder's Story</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>

            </div>

            {/* ── Column 3: "A LEGACY THAT LIVES ON" Card (3 cols) ── */}
            <div className="lg:col-span-3">
              <div className="bg-slate-50/90 rounded-2xl p-5 sm:p-6 border border-slate-200/70 shadow-xs space-y-5">
                
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F2B5B] font-sans">
                  A LEGACY THAT LIVES ON
                </h3>

                <div className="space-y-4">
                  {/* Item 1: Graduation Cap */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100/90 text-[#0F4C3A] flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap size={18} strokeWidth={2.2} />
                    </div>
                    <p className="text-xs font-semibold text-slate-700 leading-snug">
                      Champion for education and human development
                    </p>
                  </div>

                  {/* Item 2: Heart */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-100/90 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Heart size={18} className="fill-rose-500 text-rose-500" strokeWidth={2.2} />
                    </div>
                    <p className="text-xs font-semibold text-slate-700 leading-snug">
                      Passionate about the well-being of people and communities
                    </p>
                  </div>

                  {/* Item 3: Users */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-100/90 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Users size={18} strokeWidth={2.2} />
                    </div>
                    <p className="text-xs font-semibold text-slate-700 leading-snug">
                      A visionary philanthropist and nation-builder
                    </p>
                  </div>

                  {/* Item 4: Star */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100/90 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Star size={18} className="fill-amber-500 text-amber-500" strokeWidth={2.2} />
                    </div>
                    <p className="text-xs font-semibold text-slate-700 leading-snug">
                      An enduring legacy of compassion, opportunity and impact
                    </p>
                  </div>
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
