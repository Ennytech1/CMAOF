import React from 'react';
import { ShieldCheck, Lock, FileCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PoliciesPage = () => {
  return (
    <div className="w-full bg-[#FAF6EE]/30 py-12 lg:py-16 min-h-[80vh] animate-fade-in font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Breadcrumb / Back Link */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#5B2E19]">
          <Link to="/" className="hover:underline flex items-center gap-1">
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-[#8C4A26]">Policies & Governance</span>
        </div>

        <div className="text-center space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFF8E5] border border-[#FCCD37]/60 text-[#5B2E19] text-xs font-black uppercase tracking-wider shadow-xs">
            Legal & Institutional Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#5B2E19] tracking-tight">
            Governance, Privacy & Safeguarding Policies
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            The institutional guidelines, ethical frameworks, and legal protections governing all Chief Michael Ade.Ojo Foundation operations.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-md space-y-8 text-slate-700 text-sm leading-relaxed relative overflow-hidden">
          {/* Top Tricolor Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5B2E19] via-[#8C4A26] to-[#FCCD37]" />

          <section className="space-y-3 pt-2">
            <h2 className="text-xl font-black text-[#5B2E19] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#FFF8E5] text-[#5B2E19] border border-[#FCCD37]/30 flex items-center justify-center shrink-0">
                <Lock size={16} />
              </span>
              1. Privacy & Data Protection Policy
            </h2>
            <p>
              The Chief Michael Ade.Ojo Foundation (CMAOF) is strictly committed to respecting and protecting the privacy of all donors, beneficiaries, volunteers, and website visitors in accordance with applicable Nigerian and international data protection laws. No submitted personal data is ever sold or commoditized.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-black text-[#5B2E19] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#338C26] border border-emerald-200/50 flex items-center justify-center shrink-0">
                <ShieldCheck size={16} />
              </span>
              2. Child & Vulnerable Adult Safeguarding Policy
            </h2>
            <p>
              CMAOF maintains a zero-tolerance stance against abuse, exploitation, and harassment. All staff, volunteers, and operational partners adhere to strict safeguarding guidelines during all educational, scholarship, and community healthcare outreaches.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-black text-[#5B2E19] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#0047BA] border border-blue-200/50 flex items-center justify-center shrink-0">
                <FileCheck size={16} />
              </span>
              3. Whistleblowing & Anti-Corruption Governance
            </h2>
            <p>
              We maintain direct, encrypted, and strictly confidential channels for reporting any suspected fraud, misconduct, or policy breach. Reports can be submitted directly to our independent audit desk at <a href="mailto:safeguarding@cmaofoundation.org" className="text-[#5B2E19] font-bold underline hover:text-[#8C4A26]">safeguarding@cmaofoundation.org</a>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};

export default PoliciesPage;
