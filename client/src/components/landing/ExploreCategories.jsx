import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

const ExploreCategories = ({ selectedCategoryPill, setSelectedCategoryPill }) => {
  const categories = [
    { id: 'all', label: 'All Fields' },
    { id: 'ai', label: 'Artificial Intelligence' },
    { id: 'business', label: 'Business & Management' },
    { id: 'data', label: 'Data Science' },
    { id: 'software', label: 'Software Engineering' },
    { id: 'leasing', label: 'Equipment Leasing & Finance' }
  ];

  const categoryCards = {
    all: [
      {
        title: 'Google AI Essentials',
        provider: 'Google',
        type: 'Specialization',
        rating: 4.8,
        bgGradient: 'from-blue-600 via-indigo-600 to-purple-600',
        textTag: 'AI ESSENTIALS',
        logoText: 'G'
      },
      {
        title: 'Certified Leasing Professional',
        provider: 'ACC Council',
        type: 'Accreditation Exam',
        rating: 4.9,
        bgGradient: 'from-slate-900 to-[#0A192F]',
        textTag: 'CLP REGISTRY',
        logoText: 'A'
      },
      {
        title: 'React & Node.js Developer',
        provider: 'CareerMAX Labs',
        type: 'Professional Certificate',
        rating: 4.9,
        bgGradient: 'from-purple-650 to-pink-600',
        textTag: 'FULL STACK',
        logoText: 'C'
      },
      {
        title: 'IBM Data Science Specialist',
        provider: 'IBM Network',
        type: 'Specialization',
        rating: 4.6,
        bgGradient: 'from-[#0f172a] via-[#1e293b] to-blue-900',
        textTag: 'DATA SCIENCE',
        logoText: 'I'
      }
    ],
    ai: [
      {
        title: 'Google AI Essentials',
        provider: 'Google',
        type: 'Specialization',
        rating: 4.8,
        bgGradient: 'from-blue-600 via-indigo-600 to-purple-600',
        textTag: 'AI ESSENTIALS',
        logoText: 'G'
      },
      {
        title: 'AI Foundations for Everyone',
        provider: 'IBM Network',
        type: 'Specialization',
        rating: 4.7,
        bgGradient: 'from-slate-900 via-slate-800 to-blue-950',
        textTag: 'AI FOUNDATIONS',
        logoText: 'I'
      },
      {
        title: 'Prompt Engineering for Developers',
        provider: 'Vanderbilt University',
        type: 'Specialization',
        rating: 4.8,
        bgGradient: 'from-pink-500 via-purple-600 to-indigo-700',
        textTag: 'PROMPT ENG',
        logoText: 'V'
      },
      {
        title: 'Google Prompting Essentials',
        provider: 'Google',
        type: 'Specialization',
        rating: 4.8,
        bgGradient: 'from-emerald-500 via-teal-600 to-blue-700',
        textTag: 'PROMPT ESSENTIALS',
        logoText: 'G'
      }
    ],
    business: [
      {
        title: 'Financial Lease Accounting',
        provider: 'ACC Council',
        type: 'Specialization Course',
        rating: 4.9,
        bgGradient: 'from-slate-800 to-slate-950',
        textTag: 'LEASE FINANCE',
        logoText: 'A'
      },
      {
        title: 'Business Statistics with Excel',
        provider: 'Wharton School',
        type: 'Accredited Course',
        rating: 4.8,
        bgGradient: 'from-[#0A192F] to-[#1E2A3A]',
        textTag: 'STATISTICS',
        logoText: 'W'
      },
      {
        title: 'Operations Management',
        provider: 'Illinois Uni',
        type: 'Specialization',
        rating: 4.7,
        bgGradient: 'from-blue-800 to-slate-900',
        textTag: 'OPERATIONS',
        logoText: 'I'
      }
    ],
    data: [
      {
        title: 'Google Data Analytics Professional',
        provider: 'Google',
        type: 'Specialization',
        rating: 4.8,
        bgGradient: 'from-amber-500 via-orange-600 to-red-650',
        textTag: 'DATA ANALYTICS',
        logoText: 'G'
      },
      {
        title: 'IBM Data Science Specialist',
        provider: 'IBM Network',
        type: 'Specialization',
        rating: 4.6,
        bgGradient: 'from-[#0f172a] via-[#1e293b] to-blue-900',
        textTag: 'DATA SCIENCE',
        logoText: 'I'
      },
      {
        title: 'Microsoft Power BI Analyst',
        provider: 'Microsoft',
        type: 'Professional Certificate',
        rating: 4.7,
        bgGradient: 'from-cyan-500 via-blue-600 to-indigo-750',
        textTag: 'POWER BI',
        logoText: 'M'
      }
    ],
    software: [
      {
        title: 'React & Node.js Developer',
        provider: 'CareerMAX Labs',
        type: 'Professional Certificate',
        rating: 4.9,
        bgGradient: 'from-purple-650 to-pink-600',
        textTag: 'FULL STACK',
        logoText: 'C'
      },
      {
        title: 'Python for Everybody',
        provider: 'Michigan Uni',
        type: 'Specialization',
        rating: 4.8,
        bgGradient: 'from-[#0A192F] via-[#1E2A3A] to-blue-850',
        textTag: 'PYTHON DEV',
        logoText: 'M'
      },
      {
        title: 'Introduction to Generative AI',
        provider: 'Google Cloud',
        type: 'Accredited Course',
        rating: 4.7,
        bgGradient: 'from-blue-650 via-indigo-600 to-purple-650',
        textTag: 'GENERATIVE AI',
        logoText: 'G'
      }
    ],
    leasing: [
      {
        title: 'Certified Leasing Professional',
        provider: 'ACC Council',
        type: 'Accreditation Exam',
        rating: 4.9,
        bgGradient: 'from-slate-900 to-[#0A192F]',
        textTag: 'CLP REGISTRY',
        logoText: 'A'
      },
      {
        title: 'Lease & Asset Finance Specialist',
        provider: 'ELRA Academy',
        type: 'Accredited Certification',
        rating: 4.8,
        bgGradient: 'from-emerald-600 via-teal-700 to-indigo-850',
        textTag: 'LAFS EXAM',
        logoText: 'E'
      },
      {
        title: 'Asset Securitization Models',
        provider: 'ELRA Academy',
        type: 'Advanced Exam',
        rating: 4.8,
        bgGradient: 'from-blue-900 via-[#102A43] to-slate-950',
        textTag: 'SECURITIZATION',
        logoText: 'E'
      }
    ]
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-[#0A192F] tracking-tight">Explore categories</h2>
        <Link to="/register" className="text-xs font-bold text-[#00B4D8] hover:underline flex items-center gap-1">
          Explore all programs <ArrowRight size={14} />
        </Link>
      </div>

      {/* Categories Pills Row */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryPill(cat.id)}
            className={`px-4.5 py-2 border rounded-full text-xs font-bold transition-all duration-205 cursor-pointer ${
              selectedCategoryPill === cat.id 
                ? 'bg-[#00B4D8] border-[#00B4D8] text-white font-extrabold shadow-sm' 
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-350'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Dynamic Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {categoryCards[selectedCategoryPill]?.map((card, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 overflow-hidden flex flex-col justify-between transition-all"
          >
            {/* Visual Box Graphic Header */}
            <div className={`h-32 bg-gradient-to-r ${card.bgGradient} relative p-4 flex flex-col justify-between text-white`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_60%)]" />
              <div className="text-[7px] font-black tracking-widest uppercase bg-white/10 px-2 py-0.5 rounded w-fit relative z-10 border border-white/10">
                {card.provider}
              </div>
              <div className="font-extrabold text-sm tracking-tight leading-none drop-shadow-sm select-none relative z-10">
                {card.textTag}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                {/* Provider Logo Letter and Label */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-655 shrink-0">
                    {card.logoText}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{card.provider}</span>
                </div>

                {/* Card Title */}
                <h4 className="font-bold text-xs text-[#0A192F] line-clamp-2 leading-tight">
                  {card.title}
                </h4>
              </div>

              {/* Card Footer Metric */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[9px] text-slate-400 font-bold uppercase">{card.type}</span>
                <div className="flex items-center gap-0.5 text-[10px] font-bold text-[#334155]">
                  <Star className="fill-amber-400 text-amber-400" size={10} />
                  <span>{card.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCategories;
