import React from 'react';
import { Target, Eye, Mountain, HeartHandshake, Heart, Users, Shield, BarChart3 } from 'lucide-react';

const AboutPillarsGrid = () => {
  return (
    <section id="purpose-vision" className="pt-8 sm:pt-12 pb-3 sm:pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        
        {/* 1. OUR PURPOSE */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(234, 88, 12, 0.12)', color: '#EA580C' }}>
                <Target size={26} strokeWidth={2.4} />
              </div>
              <h3 className="font-extrabold text-xs sm:text-[13px] uppercase tracking-wider text-[#0F4C3A] font-sans">
                OUR PURPOSE
              </h3>
            </div>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">
              To create pathways for people to overcome barriers, unlock their potential and build better lives.
            </p>
          </div>
        </div>

        {/* 2. OUR VISION */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(15, 76, 58, 0.12)', color: '#0F4C3A' }}>
                <Eye size={26} strokeWidth={2.4} />
              </div>
              <h3 className="font-extrabold text-xs sm:text-[13px] uppercase tracking-wider text-[#0F4C3A] font-sans">
                OUR VISION
              </h3>
            </div>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">
              A society where everyone has the opportunity to live with dignity and achieve self-reliance.
            </p>
          </div>
        </div>

        {/* 3. OUR MISSION */}
        <div className="bg-[#F4F7FC]/80 rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(15, 43, 91, 0.12)', color: '#0F2B5B' }}>
                <Mountain size={26} strokeWidth={2.4} />
              </div>
              <h3 className="font-extrabold text-xs sm:text-[13px] uppercase tracking-wider text-[#0F2B5B] font-sans">
                OUR MISSION
              </h3>
            </div>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-medium">
              To empower people, expand opportunity and strengthen communities to build better futures.
            </p>
          </div>
        </div>

        {/* 4. OUR VALUES */}
        <div className="bg-slate-50/90 rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <h3 className="font-extrabold text-xs sm:text-[13px] uppercase tracking-wider text-[#0F2B5B] font-sans text-center">
              OUR VALUES
            </h3>
            
            <div className="grid grid-cols-3 gap-2 text-center items-start">
              {/* Dignity */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100/90 text-[#0F4C3A] flex items-center justify-center shadow-xs">
                  <HeartHandshake size={18} strokeWidth={2.3} />
                </div>
                <span className="text-[11px] font-bold text-slate-800">Dignity</span>
              </div>

              {/* Compassion */}
              <div className="flex flex-col items-center gap-1.5 border-x border-slate-200/70 px-1">
                <div className="w-9 h-9 rounded-full bg-orange-100/90 text-[#EA580C] flex items-center justify-center shadow-xs">
                  <Heart size={18} className="fill-[#EA580C] text-[#EA580C]" strokeWidth={2.3} />
                </div>
                <span className="text-[11px] font-bold text-slate-800">Compassion</span>
              </div>

              {/* Empowerment */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 rounded-full bg-blue-100/90 text-[#0F2B5B] flex items-center justify-center shadow-xs">
                  <Users size={18} strokeWidth={2.3} />
                </div>
                <span className="text-[11px] font-bold text-slate-800">Empowerment</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center items-start pt-3 border-t border-slate-200/60">
              {/* Integrity */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 rounded-full bg-rose-100/90 text-rose-600 flex items-center justify-center shadow-xs">
                  <Shield size={18} className="fill-rose-600 text-rose-600" strokeWidth={2.3} />
                </div>
                <span className="text-[11px] font-bold text-slate-800">Integrity</span>
              </div>

              {/* Impact */}
              <div className="flex flex-col items-center gap-1.5 border-l border-slate-200/70">
                <div className="w-9 h-9 rounded-full bg-amber-100/90 text-amber-600 flex items-center justify-center shadow-xs">
                  <BarChart3 size={18} className="fill-amber-500 text-amber-600" strokeWidth={2.3} />
                </div>
                <span className="text-[11px] font-bold text-slate-800">Impact</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutPillarsGrid;
