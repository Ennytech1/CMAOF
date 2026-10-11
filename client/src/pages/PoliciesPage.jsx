import React from 'react';
import { ShieldCheck, Lock, FileCheck } from 'lucide-react';

const PoliciesPage = () => {
  return (
    <div className="py-12 lg:py-16 space-y-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center space-y-4">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-slate-200 text-slate-800 text-xs font-extrabold uppercase tracking-wider">
          Legal & Institutional Compliance
        </span>
        <h1 className="text-4xl font-extrabold text-[#0D1B2A]">Governance, Privacy & Safeguarding Policies</h1>
      </div>

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0D1B2A] flex items-center gap-2">
            <Lock size={18} className="text-[#0F4C3A]" />
            1. Privacy & Data Protection Policy
          </h2>
          <p>
            The Chief Michael Ade.Ojo Foundation (CMAOF) is committed to respecting and protecting the privacy of all donors, beneficiaries, volunteers, and website visitors in accordance with applicable data protection laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0D1B2A] flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#0F4C3A]" />
            2. Child & Vulnerable Adult Safeguarding Policy
          </h2>
          <p>
            CMAOF maintains a zero-tolerance stance against abuse, exploitation, and misconduct. All staff, volunteers, and partners adhere to strict child protection guidelines during all educational and healthcare outreaches.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0D1B2A] flex items-center gap-2">
            <FileCheck size={18} className="text-[#0F4C3A]" />
            3. Whistleblowing & Anti-Corruption Governance
          </h2>
          <p>
            We maintain direct confidential channels for reporting any suspected fraud, misconduct, or policy breach. Reports can be submitted directly to governance@cmaofoundation.org.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PoliciesPage;
