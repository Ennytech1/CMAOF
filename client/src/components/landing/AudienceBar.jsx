import React from 'react';

const AudienceBar = ({ activeAudience, setActiveAudience }) => {
  const audiences = [
    { id: 'individuals', label: 'For Individuals' },
    { id: 'employers', label: 'For Employers' },
    { id: 'sponsors', label: 'For Sponsors' },
    { id: 'unis', label: 'For Universities' },
  ];

  return (
    <div className="bg-[#0A192F] border-b border-slate-800 py-2.5 px-6">
      <div className="max-w-7xl mx-auto flex gap-6 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {audiences.map((aud) => (
          <button
            key={aud.id}
            onClick={() => setActiveAudience(aud.id)}
            className={`pb-0.5 border-b-2 transition-all duration-200 ${
              activeAudience === aud.id 
                ? 'border-[#00B4D8] text-white font-black' 
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            {aud.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AudienceBar;
