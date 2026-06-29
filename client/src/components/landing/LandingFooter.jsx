import React from 'react';
import { ShieldCheck } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Compliance / Security Card Container */}
      <div className="py-16 px-6 max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-white via-white to-[#00B4D8]/5 border border-slate-200/80 shadow-sm text-center space-y-6 relative overflow-hidden">
          {/* Subtle Decorative Orb */}
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-[#00B4D8]/5 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />

          <ShieldCheck className="text-[#00B4D8] mx-auto animate-pulse" size={40} />
          <h4 className="font-extrabold text-[#0A192F] text-xl tracking-tight">Secure & Regulatory Compliant Registry</h4>
          <p className="text-xs text-[#334155] font-semibold leading-relaxed max-w-xl mx-auto">
            CareerMAX aligns fully with the **Nigeria Data Protection Act (NDPA)**. All independent certification credentials are verified under the regulatory guidelines of the **Equipment Leasing Registration Authority (ELRA)**.
          </p>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="border-t border-slate-800 bg-[#0A192F] py-8 text-center text-xs text-slate-400 font-bold relative z-10">
        <p>&copy; {new Date().getFullYear()} CareerMAX. All rights reserved. Designed for Africa's Professional Growth Ecosystem.</p>
      </div>
    </footer>
  );
};

export default LandingFooter;
