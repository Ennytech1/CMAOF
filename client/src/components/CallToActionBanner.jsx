import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, HeartPulse, Users, Handshake, Gift } from 'lucide-react';

const CallToActionBanner = ({ onOpenDonate }) => {
  return (
    <section className="relative w-full py-8 sm:py-9 lg:py-10 bg-[#241007] text-white overflow-hidden border-b border-[#5B2E19]/60">
      {/* Background Image with Crisp Warm Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-[position:center_32%] bg-no-repeat opacity-60 pointer-events-none"
        style={{ backgroundImage: `url('/images/hero_community.jpg')` }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(36, 16, 7, 0.94) 0%, rgba(44, 20, 10, 0.85) 38%, rgba(69, 34, 18, 0.58) 72%, rgba(36, 16, 7, 0.75) 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Left Title Block */}
          <div className="flex items-start gap-3.5 max-w-lg shrink-0">
            <div className="w-1.5 h-12 sm:h-14 bg-[#FCCD37] rounded-full shrink-0 mt-0.5 shadow-sm" />
            <div className="space-y-1 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-[#FCCD37] block">
                GET INVOLVED TODAY
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-[1.75rem] font-black text-white tracking-tight leading-tight">
                Be Part of a Brighter Tomorrow
              </h2>
              <p className="text-[#FAF6EE] text-xs sm:text-[13.5px] leading-relaxed font-medium">
                Your support helps us expand opportunities, improve lives and build stronger communities across Nigeria.
              </p>
            </div>
          </div>

          {/* Middle Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <Link
              to="/donate"
              className="btn-cmao-primary px-6 py-2.5 text-xs sm:text-sm font-black shadow-lg shadow-black/30 inline-flex items-center gap-2 cursor-pointer"
            >
              <Heart size={16} className="fill-[#5B2E19]/30 stroke-[#5B2E19]" strokeWidth={2.5} />
              <span>Donate Now</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>

            <Link
              to="/get-involved"
              className="border-2 border-[#FCCD37] text-[#FCCD37] hover:bg-[#FCCD37] hover:text-[#3D1E10] font-black text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Partner With Us</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>

          {/* Right Action Icons List with vertical dividers */}
          <div className="flex items-center gap-3 sm:gap-4 text-center shrink-0 border-t lg:border-t-0 lg:border-l border-white/20 pt-3 lg:pt-0 lg:pl-6">
            
            {/* Donate Icon */}
            <Link 
              to="/donate"
              className="flex flex-col items-center gap-1.5 group cursor-pointer hover:opacity-95 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#FCCD37] group-hover:text-[#3D1E10] group-hover:border-[#FCCD37] transition-all">
                <HeartPulse size={19} strokeWidth={2.2} />
              </div>
              <span className="text-[11px] font-bold text-slate-200 group-hover:text-[#FCCD37] transition-colors tracking-tight">Donate</span>
            </Link>

            <div className="w-[1px] h-7 bg-white/20 shrink-0" />

            {/* Volunteer Icon */}
            <Link 
              to="/get-involved"
              className="flex flex-col items-center gap-1.5 group cursor-pointer hover:opacity-95 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#FCCD37] group-hover:text-[#3D1E10] group-hover:border-[#FCCD37] transition-all">
                <Users size={19} strokeWidth={2.2} />
              </div>
              <span className="text-[11px] font-bold text-slate-200 group-hover:text-[#FCCD37] transition-colors tracking-tight">Volunteer</span>
            </Link>

            <div className="w-[1px] h-7 bg-white/20 shrink-0" />

            {/* Partner Icon */}
            <Link 
              to="/get-involved"
              className="flex flex-col items-center gap-1.5 group cursor-pointer hover:opacity-95 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#FCCD37] group-hover:text-[#3D1E10] group-hover:border-[#FCCD37] transition-all">
                <Handshake size={19} strokeWidth={2.2} />
              </div>
              <span className="text-[11px] font-bold text-slate-200 group-hover:text-[#FCCD37] transition-colors tracking-tight">Partner</span>
            </Link>

            <div className="w-[1px] h-7 bg-white/20 shrink-0" />

            {/* Support a Programme Icon */}
            <Link 
              to="/our-work"
              className="flex flex-col items-center gap-1.5 group cursor-pointer hover:opacity-95 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#FCCD37] group-hover:text-[#3D1E10] group-hover:border-[#FCCD37] transition-all">
                <Gift size={19} strokeWidth={2.2} />
              </div>
              <span className="text-[11px] font-bold text-slate-200 group-hover:text-[#FCCD37] transition-colors tracking-tight">Support</span>
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;
