import React from 'react';

// Green Circular Checkmark Icon
const GreenCheckIcon = () => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#047857" />
    <path
      d="M6 10l2.5 2.5L14 7"
      stroke="#FFFFFF"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Exact Target / Bullseye with Arrow Icon
const TargetArrowIcon = () => (
  <svg className="w-8 h-8 text-[#0F2B5B]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
    {/* Outer target circle */}
    <circle cx="15" cy="17" r="11" strokeWidth="2.4" />
    {/* Inner ring */}
    <circle cx="15" cy="17" r="6" strokeWidth="2.4" />
    {/* Bullseye center */}
    <circle cx="15" cy="17" r="2" fill="currentColor" />
    {/* Arrow striking from top-right */}
    <path d="M26 6L16.5 15.5" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M20 6h6v6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Exact Database / Cylindrical Stack Icon
const DatabaseCylinderIcon = () => (
  <svg className="w-8 h-8 text-[#0F2B5B]" viewBox="0 0 32 32" fill="currentColor">
    {/* Top disk */}
    <ellipse cx="16" cy="7.5" rx="9.5" ry="3.2" />
    {/* Middle disk */}
    <path d="M6.5 8v5c0 1.8 4.25 3.2 9.5 3.2s9.5-1.4 9.5-3.2V8c0 1.8-4.25 3.2-9.5 3.2S6.5 9.8 6.5 8z" />
    {/* Bottom disk */}
    <path d="M6.5 14.5v5.2c0 1.8 4.25 3.2 9.5 3.2s9.5-1.4 9.5-3.2v-5.2c0 1.8-4.25 3.2-9.5 3.2s-9.5-1.4-9.5-3.2z" />
  </svg>
);

// Exact 3-Bar Ascending Chart Icon
const BarChartColumnsIcon = () => (
  <svg className="w-8 h-8 text-[#0F2B5B]" viewBox="0 0 32 32" fill="currentColor">
    {/* Short bar */}
    <rect x="7" y="18" width="4.5" height="10" rx="1.2" />
    {/* Medium bar */}
    <rect x="14" y="11.5" width="4.5" height="16.5" rx="1.2" />
    {/* Tall bar */}
    <rect x="21" y="5.5" width="4.5" height="22.5" rx="1.2" />
  </svg>
);

// Exact Document / Report with Dog-ear Fold Icon
const DocumentSheetIcon = () => (
  <svg className="w-8 h-8 text-[#0F2B5B]" viewBox="0 0 32 32" fill="currentColor">
    {/* Main document sheet */}
    <path d="M8 4h10l6 6v17a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 27V5.5A1.5 1.5 0 0 1 8 4z" />
    {/* Dog-ear corner flap */}
    <polygon points="18,4 18,10 24,10" fill="#E2E8F0" />
    {/* Text lines */}
    <rect x="10" y="14" width="12" height="2" rx="1" fill="#FFFFFF" />
    <rect x="10" y="18" width="12" height="2" rx="1" fill="#FFFFFF" />
    <rect x="10" y="22" width="8" height="2" rx="1" fill="#FFFFFF" />
  </svg>
);

// Exact Gear / Cogwheel Icon
const GearInsightIcon = () => (
  <svg className="w-8 h-8 text-[#0F2B5B]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54A.484.484 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.63 8.48c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.49.41h4c.25 0 .46-.18.49-.42l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const measurementSteps = [
  {
    id: 1,
    title: 'Define clear objectives and indicators',
    icon: <TargetArrowIcon />,
  },
  {
    id: 2,
    title: 'Collect reliable data from programme implementation',
    icon: <DatabaseCylinderIcon />,
  },
  {
    id: 3,
    title: 'Measure results against targets',
    icon: <BarChartColumnsIcon />,
  },
  {
    id: 4,
    title: 'Report transparently through annual and programme reports',
    icon: <DocumentSheetIcon />,
  },
  {
    id: 5,
    title: 'Use insights to improve and scale impact',
    icon: <GearInsightIcon />,
  },
];

const principles = [
  'Accuracy and transparency',
  'Learning and continuous improvement',
  'Accountability to our beneficiaries and partners',
  'Responsible use of resources',
];

const ImpactMeasurementApproach = () => {
  return (
    <section id="approach-measurement" className="w-full pt-2 pb-0 sm:pb-1 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── 3-Part Continuous Row: Left Title + Center 5 Steps with Dividers + Right Principles Speech Bubble ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-4 items-center">
          
          {/* Part 1 (Left): Title & Subtitle with Orange Accent Bar (lg:col-span-3) */}
          <div className="lg:col-span-3 flex items-start gap-2.5">
            <div className="w-[3.5px] h-11 bg-[#EA580C] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg lg:text-[18px] font-black text-[#0F2B5B] uppercase tracking-tight leading-tight">
                OUR APPROACH TO MEASUREMENT
              </h2>
              <p className="text-slate-600 text-xs sm:text-[12px] font-normal leading-relaxed">
                We track our progress using a clear, transparent and evidence-based approach.
              </p>
            </div>
          </div>

          {/* Part 2 (Center): 5 Process Steps with Vertical Dividers (lg:col-span-6) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-0 items-start">
              {measurementSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center px-1.5 sm:px-2 py-1.5 space-y-2 border-l border-slate-200"
                >
                  {/* Step Icon */}
                  <div className="w-10 h-10 flex items-center justify-center">
                    {step.icon}
                  </div>

                  {/* Step Title / Description */}
                  <p className="text-slate-700 text-[10.5px] sm:text-[11px] font-semibold leading-[1.25] max-w-[110px]">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Part 3 (Right): OUR PRINCIPLES Speech Bubble Card (lg:col-span-3) */}
          <div className="lg:col-span-3 relative pl-0 lg:pl-1">
            {/* Left-pointing speech bubble triangle on desktop */}
            <div
              className="hidden lg:block absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[7px] border-y-transparent border-r-[8px] border-r-[#EDF5F2] z-10"
              aria-hidden="true"
            />

            <div className="bg-[#EDF5F2] rounded-2xl p-3.5 sm:p-4 border border-[#DAE8E1] shadow-xs space-y-2">
              <h3 className="text-xs sm:text-[12px] font-black text-[#064E3B] uppercase tracking-wider leading-tight">
                OUR PRINCIPLES
              </h3>

              <ul className="space-y-1.5 pt-0.5">
                {principles.map((principle, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <GreenCheckIcon />
                    <span className="text-slate-700 text-[11px] sm:text-[11.5px] font-medium leading-tight">
                      {principle}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ImpactMeasurementApproach;
