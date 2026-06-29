import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Award, Users } from 'lucide-react';

const HeroBanners = () => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Banner 1: Individual Learning Plus */}
      <div className="rounded-[2rem] p-8 bg-gradient-to-r from-[#0A192F] to-[#1E2A3A] text-white flex flex-col md:flex-row gap-6 justify-between items-start shadow-xl relative overflow-hidden group border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,180,216,0.1),transparent_50%)] pointer-events-none" />
        <div className="space-y-4 flex-1 z-10">
          <span className="bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/30 text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full">
            CareerMAX Plus
          </span>
          <h2 className="text-2xl md:text-3xl font-black leading-tight tracking-tight">Meet new goals with professional credentials</h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Unlock unlimited premium courses, independent exam assessments, and verified QR badges. Save 40% on annual access.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0092b0] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md mt-2"
          >
            Start 7-Day Free Trial <ArrowRight size={14} />
          </Link>
        </div>

        {/* Floating Card Mockup */}
        <div className="w-36 h-36 bg-slate-900/80 border border-white/10 rounded-2xl flex flex-col justify-between p-4 shrink-0 relative overflow-hidden z-10 shadow-lg select-none">
          <div className="flex justify-between items-center">
            <Sparkles className="text-yellow-400" size={16} />
            <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">PASSED</span>
          </div>
          <div>
            <span className="text-[8px] font-bold text-slate-500 block uppercase tracking-wider">Accreditation</span>
            <strong className="text-white text-xs block leading-tight font-black">CLP Certificate</strong>
            <span className="text-[7px] text-slate-400 font-semibold block mt-0.5">ID: #8a9c2d</span>
          </div>
        </div>
      </div>

      {/* Banner 2: Team Training & Sponsorship */}
      <div className="rounded-[2rem] p-8 bg-gradient-to-r from-[#0A192F] to-[#1E2A3A] text-white flex flex-col md:flex-row gap-6 justify-between items-start shadow-xl relative overflow-hidden group border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,180,216,0.08),transparent_50%)] pointer-events-none" />
        <div className="space-y-4 flex-1 z-10">
          <span className="bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/30 text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full">
            CareerMAX for Teams
          </span>
          <h2 className="text-2xl md:text-3xl font-black leading-tight tracking-tight">Refresh skills. Sponsor pipeline cohorts</h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Fund candidate learning tracks, analyze cohort progress percentage, and recruit top-performing verified talent.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md mt-2"
          >
            Sponsor Training <ArrowRight size={14} />
          </Link>
        </div>

        {/* Floating Cohort Tracker Mockup */}
        <div className="w-36 h-36 bg-slate-900/80 border border-white/10 rounded-2xl flex flex-col justify-between p-4 shrink-0 relative overflow-hidden z-10 shadow-lg select-none">
          <Users className="text-[#00B4D8]" size={18} />
          <div>
            <span className="text-[8px] font-bold text-slate-500 block uppercase tracking-wider">Cohort Progress</span>
            <strong className="text-white text-lg block font-black leading-none">82% Avg</strong>
            <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden mt-1.5">
              <div className="bg-[#00B4D8] h-full rounded-full" style={{ width: '82%' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanners;
