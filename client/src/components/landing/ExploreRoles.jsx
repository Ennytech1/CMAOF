import React, { useState } from 'react';
import { ChevronDown, ArrowRight, User } from 'lucide-react';

const ExploreRoles = () => {
  const [selectedRoleTab, setSelectedRoleTab] = useState('popular');
  const [levelDropdown, setLevelDropdown] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('Beginner');

  const roleTabs = [
    { id: 'popular', label: 'Popular' },
    { id: 'software', label: 'Software Engineering & IT' },
    { id: 'leasing', label: 'Leasing & Finance' },
    { id: 'data', label: 'Data Science & Analytics' }
  ];

  const roleCardsData = {
    popular: [
      {
        role: 'Data Scientist',
        description: 'A Data Scientist analyzes large datasets to uncover insights, using statistics, machine learning, and visualization to inform business strategies.',
        provider: 'IBM Network',
        logoText: 'I',
        avatarBg: 'bg-amber-400',
        avatarAccent: 'text-amber-900',
        gender: 'male'
      },
      {
        role: 'Certified Leasing Auditor',
        description: 'An Auditor evaluates leasing assets, audits portfolios, structures credit risk indicators, and ensures alignments with ELRA compliance codes.',
        provider: 'ACC Council',
        logoText: 'A',
        avatarBg: 'bg-red-400',
        avatarAccent: 'text-red-950',
        gender: 'female'
      }
    ],
    software: [
      {
        role: 'Full-Stack Developer',
        description: 'A Full-Stack Developer builds responsive user interfaces and robust server logic, deploying web applications from database to client.',
        provider: 'CareerMAX Labs',
        logoText: 'C',
        avatarBg: 'bg-purple-500',
        avatarAccent: 'text-purple-950',
        gender: 'female'
      },
      {
        role: 'AI Systems Architect',
        description: 'An AI Architect designs and deploys large language models, agentic retrieval frameworks, prompt chains, and vector search indexing.',
        provider: 'OpenAI Devs',
        logoText: 'O',
        avatarBg: 'bg-slate-700',
        avatarAccent: 'text-white',
        gender: 'male'
      }
    ],
    leasing: [
      {
        role: 'Asset Risk Analyst',
        description: 'An Analyst models financial risk profiles, structures lease valuations, audits equipment agreements, and monitors asset securitizations.',
        provider: 'ELRA Academy',
        logoText: 'E',
        avatarBg: 'bg-emerald-500',
        avatarAccent: 'text-emerald-950',
        gender: 'male'
      },
      {
        role: 'Asset Valuator',
        description: 'A Valuator determines accurate market values for equipment leasing assets and outlines leasing tax depreciation schedules.',
        provider: 'ELRA Academy',
        logoText: 'E',
        avatarBg: 'bg-teal-500',
        avatarAccent: 'text-teal-950',
        gender: 'female'
      }
    ],
    data: [
      {
        role: 'Data Analyst',
        description: 'A Data Analyst cleans, transforms, and models data to discover useful information, suggesting conclusions and supporting decision-making.',
        provider: 'Google',
        logoText: 'G',
        avatarBg: 'bg-blue-500',
        avatarAccent: 'text-blue-950',
        gender: 'female'
      },
      {
        role: 'Business Intelligence Analyst',
        description: 'A BI Analyst creates dashboard reports, designs data models, and queries databases to track metrics and drive marketing plans.',
        provider: 'Microsoft',
        logoText: 'M',
        avatarBg: 'bg-cyan-500',
        avatarAccent: 'text-cyan-955',
        gender: 'male'
      }
    ]
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Grey Capsule Outer Container */}
      <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-8 md:space-y-0 md:grid md:grid-cols-12 md:gap-8 items-start relative overflow-hidden">
        
        {/* Decorative Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,180,216,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,180,216,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Left Column: Description */}
        <div className="space-y-6 md:col-span-3 pr-2 z-10 relative">
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-[#0A192F] tracking-tight">Explore roles</h3>
            <p className="text-xs text-[#334155] font-semibold leading-relaxed">
              Grow in your career and get new skills with these premium courses on a 7-day free trial.
            </p>
          </div>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-1.5 px-5 py-3 border border-[#00B4D8] hover:bg-[#00B4D8] hover:text-white text-[#00B4D8] text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {/* Right Column: Roles Grid */}
        <div className="space-y-6 md:col-span-9 z-10 relative">
          
          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4 border-b border-slate-200 pb-4">
            
            {/* Dropdown level */}
            <div className="relative">
              <button 
                onClick={() => setLevelDropdown(!levelDropdown)}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-bold text-[#0A192F] hover:bg-slate-50 transition-colors"
              >
                Level: {selectedLevel} <ChevronDown size={14} className="text-slate-400" />
              </button>
              {levelDropdown && (
                <div className="absolute left-0 mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-20 space-y-1">
                  {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        setSelectedLevel(lvl);
                        setLevelDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg hover:bg-slate-50 text-[#334155] hover:text-[#0A192F] transition-colors"
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {roleTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRoleTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedRoleTab === tab.id 
                      ? 'bg-slate-950 text-white font-extrabold shadow-sm' 
                      : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roleCardsData[selectedRoleTab]?.map((card, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-200/60 p-6 flex justify-between gap-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group overflow-hidden relative"
              >
                {/* Text Content */}
                <div className="space-y-4 flex-1 flex flex-col justify-between z-10 relative">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-base text-[#0A192F] leading-snug">
                      {card.role}
                    </h4>
                    <p className="text-[11px] text-[#334155] font-semibold leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Offered by</span>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-[9px] text-[#0A192F] shrink-0">
                        {card.logoText}
                      </div>
                      <span className="text-xs font-bold text-[#0A192F]">{card.provider}</span>
                    </div>
                  </div>
                </div>

                {/* Avatar Graphic Illustration Box (Matches IBM/Adobe visual elements!) */}
                <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 relative flex items-end justify-center select-none overflow-hidden z-10">
                  {/* Colored circular background backing */}
                  <div className={`absolute bottom-0 w-24 h-24 md:w-28 md:h-28 rounded-full ${card.avatarBg} opacity-80 scale-[0.9] group-hover:scale-95 transition-transform duration-300`} />
                  
                  {/* Stylized Avatar Illustration */}
                  <div className="z-10 text-white relative">
                    <User size={64} className="stroke-[1.25] text-slate-900 opacity-20" />
                    {/* Add clean visual elements depending on role */}
                    {card.gender === 'female' ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-4xl font-extrabold opacity-60 ${card.avatarAccent}`}>👩‍💼</span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-4xl font-extrabold opacity-60 ${card.avatarAccent}`}>👨‍💼</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExploreRoles;
