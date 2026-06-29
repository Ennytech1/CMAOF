import React from 'react';

const PartnerShowcase = () => {
  const partners = [
    'ELRA REGISTRY',
    'ACC COUNCIL',
    'MICROSOFT',
    'GOOGLE',
    'PAYSTACK',
    'OPENAI',
    'ANTHROPIC'
  ];

  return (
    <section className="py-12 border-y border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-slate-50 shadow-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,216,0.02),transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 text-center space-y-5 relative z-10">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
          Partnered with Leading Regulatory Bodies & Tech Innovators
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-xs font-black text-slate-400 opacity-80">
          {partners.map((partner, idx) => (
            <span key={idx} className="hover:text-slate-650 transition-colors cursor-default select-none">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerShowcase;
