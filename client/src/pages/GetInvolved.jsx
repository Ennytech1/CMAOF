import React from 'react';
import { Heart, Handshake, Users, Award, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetInvolved = ({ onOpenDonate }) => {
  return (
    <div className="w-full bg-white space-y-16 animate-fade-in pb-16">
      
      {/* ── Hero Section matching Hero.jsx and AboutHero.jsx ── */}
      <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: '520px' }}>
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-[position:82%_center] bg-no-repeat"
          style={{ backgroundImage: `url('/images/hero_community.jpg')` }}
          aria-hidden="true"
        />

        {/* ── Exact Linear Gradient Overlay matching reference screenshot ── */}
        <div
          className="absolute inset-0 hidden md:block pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.78) 8%, rgba(255,255,255,0.97) 20%, rgba(255,255,255,0.97) 38%, rgba(255,255,255,0.75) 48%, rgba(255,255,255,0.25) 58%, transparent 68%)',
          }}
          aria-hidden="true"
        />
        {/* Mobile vertical gradient fallback */}
        <div
          className="absolute inset-0 md:hidden pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.92) 60%, rgba(255,255,255,0.40) 100%)',
          }}
          aria-hidden="true"
        />

        {/* ── Content wrapper with balanced padding matching Home Hero & About Hero ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[98px] sm:pt-[115px] lg:pt-[128px] pb-14 sm:pb-16 lg:pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0F2B5B]">
                <div className="w-1 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                <Link to="/" className="hover:text-[#0F4C3A] transition-colors">Home</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <span className="text-[#0F2B5B]">Get Involved</span>
              </div>

              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#EA580C] rounded-full shrink-0" />
                <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0F4C3A]">
                  PARTNER WITH CMAOF
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.12] text-[#0F2B5B]">
                Join Us in Building Brighter Communities
              </h1>

              {/* Subtitle */}
              <p className="text-[#1E355E] text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-medium">
                Whether as an individual donor, corporate CSR partner, technical volunteer, or institutional benefactor, your participation multiplies our reach.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenDonate}
                  className="flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-white text-xs sm:text-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer bg-gradient-to-r from-[#EA580C] to-[#F97316] shadow-md"
                >
                  <Heart size={16} className="fill-white/25 stroke-white" strokeWidth={2.5} />
                  <span>Donate Now</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 text-center">
          <div className="w-14 h-14 rounded-full bg-amber-100 text-[#F59E0B] flex items-center justify-center mx-auto">
            <Heart size={28} className="fill-amber-500" />
          </div>
          <h3 className="text-2xl font-bold text-[#0D1B2A]">Make a Donation</h3>
          <p className="text-slate-600 text-sm">Directly support scholarships, primary healthcare clinics, or clean water installations.</p>
          <button onClick={onOpenDonate} className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white py-3 rounded-full font-bold text-sm shadow">
            Donate Now
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#0F4C3A] flex items-center justify-center mx-auto">
            <Handshake size={28} />
          </div>
          <h3 className="text-2xl font-bold text-[#0D1B2A]">Corporate CSR</h3>
          <p className="text-slate-600 text-sm">Co-fund strategic development cohorts with verified ESG & CSR reporting.</p>
          <a href="/contact" className="w-full block bg-[#0F4C3A] hover:bg-[#14634C] text-white py-3 rounded-full font-bold text-sm shadow">
            Partner With Us
          </a>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 text-center">
          <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto">
            <Users size={28} />
          </div>
          <h3 className="text-2xl font-bold text-[#0D1B2A]">Volunteer Action Corps</h3>
          <p className="text-slate-600 text-sm">Lend your technical expertise, medical skills, or mentorship to our active programs.</p>
          <a href="/contact" className="w-full block bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-full font-bold text-sm shadow">
            Join Volunteer Corps
          </a>
        </div>

      </div>
    </div>
  </div>
);
};

export default GetInvolved;
