import React from 'react';
import ImpactHero from '../components/impact/ImpactHero';
import ImpactStatsStrip from '../components/impact/ImpactStatsStrip';
import { Download } from 'lucide-react';

const ImpactPage = () => {
  return (
    <div className="w-full bg-white space-y-12 animate-fade-in pb-16">
      {/* 1. Impact Hero Banner */}
      <ImpactHero />

      {/* 2. Impact Stats & Commitments Strip (At a Glance) */}
      <div id="verified-impact">
        <ImpactStatsStrip />
      </div>

      {/* 3. Reports & Downloads */}
      <section id="download-reports" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#0D1B2A]">Download Annual Institutional Reports</h3>
            <p className="text-slate-600 text-sm">Access audited financial statements, program evaluations, and strategic publications.</p>
          </div>
          <button className="bg-[#0F4C3A] hover:bg-[#14634C] text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow shrink-0 cursor-pointer">
            <Download size={18} />
            <span>Download 2025 Impact Report (PDF)</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ImpactPage;
