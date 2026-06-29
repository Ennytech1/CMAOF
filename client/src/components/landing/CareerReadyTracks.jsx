import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

const CareerReadyTracks = ({ selectedJobCareer, setSelectedJobCareer }) => {
  const tabs = [
    { id: 'data', label: 'Data' },
    { id: 'finance', label: 'Business & Finance' },
    { id: 'software', label: 'Software Engineering' },
    { id: 'pm', label: 'Project Management' }
  ];

  const tracksData = {
    data: [
      {
        title: 'Google Data Analytics',
        provider: 'Google',
        type: 'Professional Certificate',
        rating: 4.8,
        bgGradient: 'from-blue-600 to-indigo-750',
        textTag: 'DATA ANALYTICS',
        logoText: 'G',
        avatarBg: 'bg-[#4285F4]'
      },
      {
        title: 'Microsoft Power BI Data Analyst',
        provider: 'Microsoft',
        type: 'Professional Certificate',
        rating: 4.6,
        bgGradient: 'from-blue-900 to-[#102A43]',
        textTag: 'POWER BI ANALYST',
        logoText: 'M',
        avatarBg: 'bg-[#F25022]'
      },
      {
        title: 'IBM Data Science',
        provider: 'IBM',
        type: 'Professional Certificate',
        rating: 4.6,
        bgGradient: 'from-slate-900 to-blue-950',
        textTag: 'DATA SCIENCE',
        logoText: 'I',
        avatarBg: 'bg-[#052FAD]'
      },
      {
        title: 'Tableau Business Intelligence Analyst',
        provider: 'Tableau Learning Partner',
        type: 'Professional Certificate',
        rating: 4.7,
        bgGradient: 'from-purple-650 via-purple-700 to-indigo-800',
        textTag: 'TABLEAU BI',
        logoText: 'T',
        avatarBg: 'bg-[#E97627]'
      }
    ],
    finance: [
      {
        title: 'Certified Leasing Professional',
        provider: 'ACC Council',
        type: 'Professional Accreditation',
        rating: 4.9,
        bgGradient: 'from-slate-950 to-slate-900',
        textTag: 'CLP REGISTER',
        logoText: 'A',
        avatarBg: 'bg-emerald-600'
      },
      {
        title: 'Lease & Asset Finance Specialist',
        provider: 'ELRA Academy',
        type: 'Accredited Certification',
        rating: 4.8,
        bgGradient: 'from-teal-650 via-teal-700 to-emerald-800',
        textTag: 'LAFS REGISTRY',
        logoText: 'E',
        avatarBg: 'bg-emerald-500'
      },
      {
        title: 'Asset Securitization Models',
        provider: 'ELRA Academy',
        type: 'Advanced Exam',
        rating: 4.8,
        bgGradient: 'from-indigo-900 to-[#0A192F]',
        textTag: 'SECURITIZATION',
        logoText: 'E',
        avatarBg: 'bg-[#00B4D8]'
      },
      {
        title: 'Credit Risk & Audit Control',
        provider: 'ACC Faculty',
        type: 'Specialization Course',
        rating: 4.7,
        bgGradient: 'from-[#0A192F] via-[#102A43] to-slate-950',
        textTag: 'CREDIT AUDIT',
        logoText: 'A',
        avatarBg: 'bg-indigo-650'
      }
    ],
    software: [
      {
        title: 'Full-Stack Software Engineering',
        provider: 'CareerMAX Labs',
        type: 'Professional Certificate',
        rating: 4.9,
        bgGradient: 'from-purple-600 via-pink-600 to-orange-550',
        textTag: 'FULL STACK DEV',
        logoText: 'C',
        avatarBg: 'bg-purple-650'
      },
      {
        title: 'Agentic AI & Agent Architectures',
        provider: 'OpenAI Developer Network',
        type: 'Specialization Certificate',
        rating: 4.9,
        bgGradient: 'from-slate-800 to-slate-950',
        textTag: 'AI AGENTS',
        logoText: 'O',
        avatarBg: 'bg-slate-700'
      },
      {
        title: 'Python for Everybody',
        provider: 'Michigan University',
        type: 'Specialization',
        rating: 4.8,
        bgGradient: 'from-blue-900 via-indigo-950 to-slate-900',
        textTag: 'PYTHON LAB',
        logoText: 'M',
        avatarBg: 'bg-[#FFCB2B]'
      },
      {
        title: 'Introduction to Generative AI',
        provider: 'Google Cloud',
        type: 'Accredited Course',
        rating: 4.7,
        bgGradient: 'from-blue-600 via-indigo-600 to-purple-650',
        textTag: 'GENERATIVE AI',
        logoText: 'G',
        avatarBg: 'bg-[#4285F4]'
      }
    ],
    pm: [
      {
        title: 'Google Project Management',
        provider: 'Google',
        type: 'Professional Certificate',
        rating: 4.8,
        bgGradient: 'from-amber-500 to-orange-655',
        textTag: 'PROJECT MGMT',
        logoText: 'G',
        avatarBg: 'bg-[#4285F4]'
      },
      {
        title: 'Microsoft AI Product Manager',
        provider: 'Microsoft',
        type: 'Specialization Certificate',
        rating: 4.7,
        bgGradient: 'from-cyan-500 via-blue-600 to-indigo-750',
        textTag: 'AI PRODUCT MGR',
        logoText: 'M',
        avatarBg: 'bg-[#F25022]'
      },
      {
        title: 'Agile & Scrum Workflow Leader',
        provider: 'ACC Council',
        type: 'Accreditation Exam',
        rating: 4.6,
        bgGradient: 'from-slate-900 to-[#102A43]',
        textTag: 'AGILE SCRUM',
        logoText: 'A',
        avatarBg: 'bg-indigo-750'
      },
      {
        title: 'Stakeholder Communications Specialist',
        provider: 'CareerMAX Labs',
        type: 'Specialization',
        rating: 4.5,
        bgGradient: 'from-teal-650 to-slate-950',
        textTag: 'COMMUNICATIONS',
        logoText: 'C',
        avatarBg: 'bg-emerald-600'
      }
    ]
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      
      {/* Concentric Gradient Banner Card */}
      <div className="rounded-[2.5rem] bg-gradient-to-r from-[#0A192F] via-[#00B4D8] to-emerald-600 p-8 md:p-12 text-white space-y-8 shadow-xl relative overflow-hidden">
        
        {/* Subtle Background Radial Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_60%)]" />

        <div className="space-y-2 relative z-10">
          <Link to="/register" className="inline-flex items-center gap-1 font-bold text-sm hover:underline">
            Get job-ready for an in-demand career <ArrowRight size={14} />
          </Link>
          <p className="text-xs text-slate-200 font-medium">No prior experience needed to get started.</p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap gap-2.5 relative z-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedJobCareer(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm ${
                selectedJobCareer === tab.id 
                  ? 'bg-slate-950 text-white font-extrabold shadow-md' 
                  : 'bg-white text-slate-800 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 relative z-10">
          {tracksData[selectedJobCareer]?.map((card, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden flex flex-col justify-between transition-all hover:scale-[1.015] shadow-md hover:shadow-lg text-slate-800"
            >
              {/* Card Banner Graphic */}
              <div className={`h-32 bg-gradient-to-br ${card.bgGradient} relative p-4 flex flex-col justify-between text-white`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_60%)]" />
                <div className="flex justify-between items-start">
                  <div className="text-[7px] font-black tracking-widest uppercase bg-white/10 px-2 py-0.5 rounded border border-white/10">
                    {card.provider}
                  </div>
                  <div className={`w-6 h-6 rounded-full ${card.avatarBg} text-white flex items-center justify-center font-bold text-[9px] shadow-sm border border-white/20 shrink-0`}>
                    {card.logoText}
                  </div>
                </div>
                <div className="font-extrabold text-xs tracking-wider leading-none drop-shadow-sm select-none">
                  {card.textTag}
                </div>
              </div>

              {/* Card Bottom Details */}
              <div className="p-4 space-y-4 flex-1 flex flex-col justify-between bg-white">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{card.provider}</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#0A192F] line-clamp-2 leading-tight">
                    {card.title}
                  </h4>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                    {card.type}
                  </span>
                  <div className="flex items-center gap-0.5 text-[10px] font-bold text-[#334155]">
                    <Star className="fill-amber-400 text-amber-400" size={10} />
                    <span>{card.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CareerReadyTracks;
