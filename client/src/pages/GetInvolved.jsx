import React from 'react';
import { Heart, Handshake, Users, Award } from 'lucide-react';

const GetInvolved = ({ onOpenDonate }) => {
  return (
    <div className="py-12 lg:py-16 space-y-16 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
          Partner With CMAOF
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0D1B2A] tracking-tight">
          Join Us in Building Brighter Communities
        </h1>
        <p className="text-slate-600 text-lg">
          Whether as an individual donor, corporate CSR partner, technical volunteer, or institutional benefactor, your participation multiplies our reach.
        </p>
      </div>

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
  );
};

export default GetInvolved;
