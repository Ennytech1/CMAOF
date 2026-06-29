import React from 'react';
import { Star } from 'lucide-react';

const NewAndPopular = () => {
  const columns = [
    {
      title: 'Most popular',
      accentColor: 'border-[#00B4D8]',
      tagBg: 'bg-[#00B4D8]/10 text-[#00B4D8]',
      items: [
        { title: 'Google Data Analytics', provider: 'Google', type: 'Professional Certificate', rating: 4.8 },
        { title: 'Certified Leasing Professional', provider: 'ACC Council', type: 'Accreditation Exam', rating: 4.9 },
        { title: 'Financial Analysis Masterclass', provider: 'ELRA Academy', type: 'Specialization Course', rating: 4.7 }
      ]
    },
    {
      title: 'Hot new releases',
      accentColor: 'border-emerald-500',
      tagBg: 'bg-emerald-500/10 text-emerald-600',
      items: [
        { title: 'Agentic AI & Agent Architectures', provider: 'OpenAI Devs', type: 'Specialization', rating: 4.9 },
        { title: 'Asset Securitization Models', provider: 'ELRA Academy', type: 'Advanced Exam', rating: 4.8 },
        { title: 'Risk Compliance Audits (NDPA)', provider: 'ACC Faculty', type: 'Accreditation', rating: 4.6 }
      ]
    },
    {
      title: 'Trending AI programs',
      accentColor: 'border-purple-500',
      tagBg: 'bg-purple-500/10 text-purple-600',
      items: [
        { title: 'Microsoft AI Product Manager', provider: 'Microsoft', type: 'Professional Certificate', rating: 4.7 },
        { title: 'Deep Learning Specialization', provider: 'DeepLearning.AI', type: 'Accredited Course', rating: 4.9 },
        { title: 'IBM RAG & Agentic Systems', provider: 'IBM Academy', type: 'Specialization', rating: 4.8 }
      ]
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-200/80 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#0A192F] tracking-tight">New and popular programs</h2>
          <p className="text-[#334155] text-xs font-medium">Explore the fastest growing learning and certification registries on the platform.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {columns.map((col, cIdx) => (
            <div key={cIdx} className="space-y-6">
              <h3 className={`font-extrabold text-[#0A192F] border-l-4 ${col.accentColor} pl-3 text-base flex items-center justify-between`}>
                <span>{col.title}</span>
                <span className="text-[9px] font-bold text-[#00B4D8] cursor-pointer hover:underline">View all</span>
              </h3>
              <div className="space-y-4">
                {col.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-slate-50 border border-slate-200/50 rounded-2xl items-center hover:bg-slate-100/50 transition-colors">
                    <div className={`w-10 h-10 ${col.tagBg} rounded-xl flex items-center justify-center font-bold text-sm shrink-0`}>
                      {item.provider.charAt(0)}
                    </div>
                    <div className="overflow-hidden flex-1">
                      <h4 className="font-bold text-[#0A192F] text-xs truncate">{item.title}</h4>
                      <p className="text-[9px] text-[#334155] font-semibold">{item.provider} &bull; {item.type}</p>
                    </div>
                    <div className="flex items-center gap-0.5 text-[10px] font-bold text-slate-650 shrink-0">
                      <Star className="fill-amber-400 text-amber-400" size={10} />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewAndPopular;
