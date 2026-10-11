import React from 'react';
import { Download, FileText } from 'lucide-react';

const ResourcesPage = () => {
  const docs = [
    { title: "2025 Annual Impact Report", type: "PDF Document", size: "4.2 MB", year: "2025" },
    { title: "CMAOF Strategic Governance Framework", type: "Policy Paper", size: "1.8 MB", year: "2025" },
    { title: "Mission 1,000 Ilara Professionals Blueprint", type: "Program Guide", size: "2.5 MB", year: "2026" },
    { title: "Child Safeguarding & Protection Policy", type: "Legal Policy", size: "850 KB", year: "2025" },
    { title: "Audited Financial Statements (2024-2025)", type: "Financial Report", size: "3.1 MB", year: "2025" },
    { title: "Media Kit & Brand Guidelines", type: "ZIP Archive", size: "12.4 MB", year: "2026" }
  ];

  return (
    <div className="py-12 lg:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#0F4C3A] text-xs font-extrabold uppercase tracking-wider">
          Document Centre & Publications
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0D1B2A] tracking-tight">
          Foundation Resources & Reports
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0F4C3A] flex items-center justify-center">
                <FileText size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-base">{doc.title}</h3>
              <p className="text-slate-400 text-xs">{doc.type} • {doc.size} • {doc.year}</p>
            </div>
            <button className="w-full bg-slate-100 hover:bg-[#0F4C3A] text-slate-800 hover:text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors">
              <Download size={14} />
              <span>Download File</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
