import React from 'react';
import { PhoneCall, ShieldAlert, HeartHandshake, ArrowUpRight } from 'lucide-react';

const ContactUrgentBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#0D1B2A] via-[#142A42] to-[#06402B] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-700/80">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#EA580C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left copy */}
        <div className="lg:col-span-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-[11px] font-bold text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>RAPID RESPONSE & SAFEGUARDING</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-serif-cmaof">
            Urgent Community Relief or Safeguarding Alerts?
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            If you are reporting a critical community humanitarian emergency, flood relief crisis, 
            or urgent child protection / safeguarding concern related to a CMAOF project, please contact our 
            direct intervention dispatch line immediately.
          </p>
        </div>

        {/* Right CTA / Hotline */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
          <a
            href="tel:+2348002626363"
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-orange-500/20 transition-all duration-200 cursor-pointer text-center"
          >
            <PhoneCall size={16} />
            <span>Toll-Free Helpline: 0800-CMAOF</span>
          </a>

          <a
            href="mailto:safeguarding@cmaofoundation.org"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors cursor-pointer text-center"
          >
            <ShieldAlert size={15} className="text-amber-300" />
            <span>safeguarding@cmaofoundation.org</span>
            <ArrowUpRight size={13} className="text-slate-400" />
          </a>
        </div>

      </div>

    </div>
  );
};

export default ContactUrgentBanner;
