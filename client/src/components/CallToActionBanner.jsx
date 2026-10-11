import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, HeartPulse, Users, Handshake, Gift } from 'lucide-react';

const CallToActionBanner = ({ onOpenDonate }) => {
  return (
    <section className="relative w-full py-5 sm:py-6 lg:py-7 bg-[#093A2C] text-white overflow-hidden border-b border-emerald-900/80">
      {/* Background Image with Crisp Soft Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-overlay"
        style={{ backgroundImage: `url('/images/hero_community.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#093A2C] via-[#093A2C]/90 to-[#072E23]/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-6">
          
          {/* Left Title Block */}
          <div className="flex items-start gap-3 max-w-lg shrink-0">
            <div className="w-1.5 h-11 sm:h-12 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-left">
              <h2 className="text-xl sm:text-2xl lg:text-[1.6rem] font-extrabold text-white tracking-tight leading-tight">
                Be Part of a Brighter Tomorrow
              </h2>
              <p className="text-emerald-100/90 text-xs sm:text-[13px] leading-snug font-normal">
                Your support helps us expand opportunities, improve lives and build stronger communities across Nigeria.
              </p>
            </div>
          </div>

          {/* Middle Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <button
              onClick={onOpenDonate}
              className="bg-[#EA580C] hover:bg-[#d97706] text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Heart size={16} className="fill-white stroke-none" />
              <span>Donate Now</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>

            <Link
              to="/get-involved"
              className="border border-white/80 hover:border-white hover:bg-white/10 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Partner With Us</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>

          {/* Right Action Icons List with vertical dividers */}
          <div className="flex items-center gap-3 sm:gap-4 text-center shrink-0 border-t lg:border-t-0 lg:border-l border-white/20 pt-3 lg:pt-0 lg:pl-6">
            
            {/* Donate Icon */}
            <button 
              onClick={onOpenDonate}
              className="flex flex-col items-center gap-1 group cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white group-hover:bg-white/25 transition-colors">
                <HeartPulse size={19} strokeWidth={2.2} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-100 tracking-tight">Donate</span>
            </button>

            <div className="w-[1px] h-7 bg-white/25 shrink-0" />

            {/* Volunteer Icon */}
            <Link 
              to="/get-involved"
              className="flex flex-col items-center gap-1 group cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white group-hover:bg-white/25 transition-colors">
                <Users size={19} strokeWidth={2.2} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-100 tracking-tight">Volunteer</span>
            </Link>

            <div className="w-[1px] h-7 bg-white/25 shrink-0" />

            {/* Partner Icon */}
            <Link 
              to="/get-involved"
              className="flex flex-col items-center gap-1 group cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white group-hover:bg-white/25 transition-colors">
                <Handshake size={19} strokeWidth={2.2} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-100 tracking-tight">Partner</span>
            </Link>

            <div className="w-[1px] h-7 bg-white/25 shrink-0" />

            {/* Support a Programme Icon */}
            <Link 
              to="/our-work"
              className="flex flex-col items-center gap-1 group cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white group-hover:bg-white/25 transition-colors">
                <Gift size={19} strokeWidth={2.2} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-100 tracking-tight">Support a Programme</span>
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;
