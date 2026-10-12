import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Official UN SDG Vector Pictogram Icons matching the reference ──

// SDG 1: NO POVERTY - 5 figures holding hands (adult with cane, adult, 3 children)
const SDG1Icon = () => (
  <svg className="w-full h-full max-h-6 sm:max-h-7 md:max-h-8 text-white select-none" viewBox="0 0 44 26" fill="currentColor">
    {/* Person 1 with walking cane (left) */}
    <circle cx="6" cy="6" r="2.4" />
    <path d="M4.6 10.5h2.8v13H4.6z" />
    <line x1="2" y1="12" x2="2" y2="23.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Person 2 (Adult) */}
    <circle cx="13.5" cy="6" r="2.4" />
    <path d="M12.1 10.5h2.8v13h-2.8z" />
    
    {/* Person 3 (Child) */}
    <circle cx="20" cy="11.5" r="1.9" />
    <path d="M18.9 15h2.2v8.5h-2.2z" />
    
    {/* Person 4 (Child) */}
    <circle cx="25.5" cy="11" r="1.9" />
    <path d="M24.4 14.5h2.2v9h-2.2z" />
    
    {/* Person 5 (Adult on right) */}
    <circle cx="32" cy="6" r="2.4" />
    <path d="M30.6 10.5h2.8v13h-2.8z" />
    
    {/* Connecting hand-holding horizontal bar */}
    <path d="M6 14h26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// SDG 3: GOOD HEALTH - ECG heartbeat pulse line with solid heart on right
const SDG3Icon = () => (
  <svg className="w-full h-full max-h-6 sm:max-h-7 md:max-h-8 select-none" viewBox="0 0 44 26" fill="none">
    {/* ECG pulse line */}
    <path
      d="M3 15h6l2.5-6 4 12 3.5-9 2.5 4 2.5-1h4"
      stroke="#FFFFFF"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Solid heart on the right */}
    <path
      d="M35 10.5c-1.8 0-2.8 1.3-3.2 2-.4-.7-1.4-2-3.2-2-2 0-3.6 1.6-3.6 3.6 0 3 5.2 6.8 6.8 7.6 1.6-.8 6.8-4.6 6.8-7.6 0-2-1.6-3.6-3.6-3.6z"
      fill="#FFFFFF"
    />
  </svg>
);

// SDG 4: QUALITY EDUCATION - Open book with vertical pencil on right
const SDG4Icon = () => (
  <svg className="w-full h-full max-h-6 sm:max-h-7 md:max-h-8 select-none" viewBox="0 0 44 26" fill="none">
    {/* Left open page */}
    <path
      d="M7 8c2.5-1.2 5.5-1.2 8 0v11.5c-2.5-1.2-5.5-1.2-8 0V8z"
      fill="#FFFFFF"
    />
    {/* Right open page */}
    <path
      d="M17 8c2.5-1.2 5.5-1.2 8 0v11.5c-2.5-1.2-5.5-1.2-8 0V8z"
      fill="#FFFFFF"
    />
    {/* Vertical pencil on the right */}
    <rect x="29" y="6" width="3" height="11" fill="#FFFFFF" rx="0.5" />
    <path d="M29 17l1.5 3.5 1.5-3.5h-3z" fill="#FFFFFF" />
  </svg>
);

// SDG 6: CLEAN WATER - Glass container with suspended water droplet
const SDG6Icon = () => (
  <svg className="w-full h-full max-h-6 sm:max-h-7 md:max-h-8 select-none" viewBox="0 0 44 26" fill="none">
    {/* Glass container outline */}
    <path
      d="M14 9h16l-2.2 12h-11.6L14 9z"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Water droplet */}
    <path
      d="M22 10.5c-2 2.5-3.2 4.2-3.2 5.8a3.2 3.2 0 0 0 6.4 0c0-1.6-1.2-3.3-3.2-5.8z"
      fill="#FFFFFF"
    />
    {/* Bottom flow spout/arrow */}
    <path d="M20 21h4l-2 3-2-3z" fill="#FFFFFF" />
  </svg>
);

// SDG 10: REDUCED INEQUALITIES - Equal sign inside 4-direction arrow diamond
const SDG10Icon = () => (
  <svg className="w-full h-full max-h-6 sm:max-h-7 md:max-h-8 select-none" viewBox="0 0 44 26" fill="none">
    {/* Equal sign in middle */}
    <rect x="17" y="10.5" width="10" height="2" fill="#FFFFFF" rx="0.4" />
    <rect x="17" y="14.5" width="10" height="2" fill="#FFFFFF" rx="0.4" />
    {/* Top arrow */}
    <path d="M22 5.5l-3 3h6l-3-3z" fill="#FFFFFF" />
    {/* Bottom arrow */}
    <path d="M22 21.5l-3-3h6l-3 3z" fill="#FFFFFF" />
    {/* Left arrow */}
    <path d="M12.5 13.5l3-3v6l-3-3z" fill="#FFFFFF" />
    {/* Right arrow */}
    <path d="M31.5 13.5l-3-3v6l3-3z" fill="#FFFFFF" />
  </svg>
);

// SDG 11: SUSTAINABLE CITIES - Skyline (house, skyscraper with windows, angled building)
const SDG11Icon = () => (
  <svg className="w-full h-full max-h-6 sm:max-h-7 md:max-h-8 text-white select-none" viewBox="0 0 44 26" fill="currentColor">
    {/* Small house on left with pitched roof */}
    <path d="M13 14.5l-3.5 2.5v6h7v-6l-3.5-2.5z" />
    <circle cx="13" cy="18.5" r="1" fill="#FD9D24" />
    {/* Tall skyscraper with window grid */}
    <rect x="18.5" y="8" width="6.5" height="15" rx="0.5" />
    <rect x="19.8" y="9.8" width="1.3" height="1.3" fill="#FD9D24" />
    <rect x="22.4" y="9.8" width="1.3" height="1.3" fill="#FD9D24" />
    <rect x="19.8" y="12.3" width="1.3" height="1.3" fill="#FD9D24" />
    <rect x="22.4" y="12.3" width="1.3" height="1.3" fill="#FD9D24" />
    <rect x="19.8" y="14.8" width="1.3" height="1.3" fill="#FD9D24" />
    <rect x="22.4" y="14.8" width="1.3" height="1.3" fill="#FD9D24" />
    <rect x="19.8" y="17.3" width="1.3" height="1.3" fill="#FD9D24" />
    <rect x="22.4" y="17.3" width="1.3" height="1.3" fill="#FD9D24" />
    <rect x="19.8" y="19.8" width="1.3" height="1.3" fill="#FD9D24" />
    <rect x="22.4" y="19.8" width="1.3" height="1.3" fill="#FD9D24" />
    {/* Angled building on right */}
    <path d="M26.5 12l4.5-3.5v14.5h-4.5V12z" />
    <rect x="28" y="11" width="1.3" height="1.3" fill="#FD9D24" />
    <rect x="28" y="13.5" width="1.3" height="1.3" fill="#FD9D24" />
    <rect x="28" y="16" width="1.3" height="1.3" fill="#FD9D24" />
    <rect x="28" y="18.5" width="1.3" height="1.3" fill="#FD9D24" />
    {/* Ground base line */}
    <rect x="7" y="23" width="28" height="1.2" fill="currentColor" />
  </svg>
);

// SDG 17: PARTNERSHIPS FOR THE GOALS - Official 5-ring interlocking rosette network
const SDG17Icon = () => (
  <svg className="w-full h-full max-h-6 sm:max-h-7 md:max-h-8 select-none" viewBox="0 0 44 26" fill="none" stroke="#FFFFFF" strokeWidth="1.6">
    <circle cx="22" cy="8.5" r="3.4" />
    <circle cx="16.5" cy="13" r="3.4" />
    <circle cx="27.5" cy="13" r="3.4" />
    <circle cx="18.5" cy="18.5" r="3.4" />
    <circle cx="25.5" cy="18.5" r="3.4" />
    <circle cx="22" cy="14" r="1.5" fill="#FFFFFF" stroke="none" />
  </svg>
);

const reports = [
  {
    id: 1,
    title: 'Annual Report 2024',
    size: 'PDF • 2.4 MB',
    coverImage: '/images/pillar_education.jpg',
  },
  {
    id: 2,
    title: 'Impact Report 2024',
    size: 'PDF • 3.1 MB',
    coverImage: '/images/hero_community.jpg',
  },
  {
    id: 3,
    title: 'Medical Outreach Report 2026',
    size: 'PDF • 1.8 MB',
    coverImage: '/images/impact_hero_boy.jpg',
  },
  {
    id: 4,
    title: 'Strategic Plan 2026 – 2030',
    size: 'PDF • 2.9 MB',
    coverImage: '/images/pillar_community.jpg',
  },
];

const sdgs = [
  {
    id: 1,
    num: '1',
    title: 'NO POVERTY',
    bg: 'bg-[#E5243B]',
    icon: <SDG1Icon />,
  },
  {
    id: 3,
    num: '3',
    title: 'GOOD HEALTH AND WELL-BEING',
    bg: 'bg-[#4C9F38]',
    icon: <SDG3Icon />,
  },
  {
    id: 4,
    num: '4',
    title: 'QUALITY EDUCATION',
    bg: 'bg-[#C5192D]',
    icon: <SDG4Icon />,
  },
  {
    id: 6,
    num: '6',
    title: 'CLEAN WATER AND SANITATION',
    bg: 'bg-[#26BDE2]',
    icon: <SDG6Icon />,
  },
  {
    id: 10,
    num: '10',
    title: 'REDUCED INEQUALITIES',
    bg: 'bg-[#DD1367]',
    icon: <SDG10Icon />,
  },
  {
    id: 11,
    num: '11',
    title: 'SUSTAINABLE CITIES AND COMMUNITIES',
    bg: 'bg-[#FD9D24]',
    icon: <SDG11Icon />,
  },
  {
    id: 17,
    num: '17',
    title: 'PARTNERSHIPS FOR THE GOALS',
    bg: 'bg-[#19486A]',
    icon: <SDG17Icon />,
  },
];

const ImpactReportsAndSDGs = () => {
  const handleDownload = (reportTitle) => {
    toast.success(`Downloading ${reportTitle} (PDF)...`, {
      style: {
        borderRadius: '12px',
        background: '#0F2B5B',
        color: '#fff',
      },
      iconTheme: {
        primary: '#10B981',
        secondary: '#fff',
      },
    });
  };

  return (
    <section id="reports-and-sdgs" className="w-full py-3 sm:py-4 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── 2-Column Responsive Row: Left = Reports, Right = Global Goals ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">

          {/* ════════════════════════════════════════════════════════════════
              LEFT COLUMN: REPORTS & PUBLICATIONS (Span 6 on lg)
          ════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
            
            {/* ── Section Header ── */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="w-[3.5px] h-6 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-[#0F2B5B] uppercase tracking-tight leading-tight">
                    REPORTS & PUBLICATIONS
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-[13px] font-normal leading-relaxed mt-0.5">
                    Access our latest reports, research and publications.
                  </p>
                </div>
              </div>

              <Link
                to="/resources"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0F4C3A] hover:text-[#14634C] shrink-0 transition-colors cursor-pointer group pt-0.5"
              >
                <span className="underline underline-offset-2">View All Resources</span>
                <ArrowRight size={14} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* ── 4 Reports Cards: 4 across on sm and lg ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-2xl p-2 sm:p-2.5 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex items-center gap-2 group min-h-[92px]"
                >
                  {/* Miniature Report Cover Preview */}
                  <div className="w-11 sm:w-12 h-16 sm:h-[68px] rounded-md overflow-hidden shrink-0 shadow-xs relative border border-slate-200/70 bg-slate-100 flex flex-col justify-between">
                    <img
                      src={report.coverImage}
                      alt={report.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                    <div className="absolute top-0.5 left-0.5 right-0.5">
                      <div className="w-2.5 h-0.5 bg-[#EA580C] rounded-full" />
                    </div>
                    <div className="absolute bottom-0.5 left-1 right-0.5 text-[6px] font-extrabold text-white uppercase leading-none drop-shadow-xs truncate">
                      CMAOF
                    </div>
                  </div>

                  {/* Report Details & Download Button */}
                  <div className="flex-1 min-w-0 h-full flex flex-col justify-between py-0.5">
                    <div>
                      <h3 className="font-extrabold text-[#0F2B5B] text-[10.5px] sm:text-[11px] leading-tight line-clamp-2">
                        {report.title}
                      </h3>
                      <div className="text-slate-400 text-[9.5px] leading-tight font-medium pt-0.5">
                        {report.size}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(report.title)}
                      className="inline-flex items-center gap-1 bg-[#0F4C3A] hover:bg-[#14634C] text-white px-2 py-0.5 rounded-full text-[9.5px] font-bold shadow-xs transition-colors cursor-pointer self-start active:scale-95 mt-1"
                    >
                      <span>Download</span>
                      <Download size={10} strokeWidth={2.4} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ════════════════════════════════════════════════════════════════
              RIGHT COLUMN: ALIGNMENT WITH GLOBAL GOALS (Span 6 on lg)
          ════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
            
            {/* ── Section Header ── */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="w-[3.5px] h-6 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-[#0F2B5B] uppercase tracking-tight leading-tight">
                    ALIGNMENT WITH GLOBAL GOALS
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-[13px] font-normal leading-relaxed mt-0.5">
                    Our work contributes to the United Nations Sustainable Development Goals (SDGs).
                  </p>
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0F4C3A] hover:text-[#14634C] shrink-0 transition-colors cursor-pointer group pt-0.5"
              >
                <span className="underline underline-offset-2">View SDGs</span>
                <ArrowRight size={14} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* ── 7 SDG Tiles: Compact SQUARES, Responsive, Official UN Icons ── */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1 w-full">
              {sdgs.map((sdg) => (
                <div
                  key={sdg.id}
                  className={`${sdg.bg} text-white rounded-md sm:rounded-lg p-1 sm:p-1.5 aspect-square flex flex-col justify-between shadow-xs hover:scale-105 transition-transform duration-200 select-none cursor-default`}
                  title={`SDG ${sdg.num}: ${sdg.title}`}
                >
                  {/* Number & Title Header */}
                  <div className="flex items-start gap-0.5 sm:gap-1 leading-none">
                    <span className="text-[10px] sm:text-xs md:text-[13px] font-black shrink-0 leading-none">
                      {sdg.num}
                    </span>
                    <span className="text-[5px] sm:text-[6px] md:text-[7px] font-extrabold uppercase leading-[1.05] tracking-tight block">
                      {sdg.title}
                    </span>
                  </div>

                  {/* Official UN Pictogram Icon */}
                  <div className="flex-1 flex items-center justify-center my-auto w-full pt-0.5">
                    {sdg.icon}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ImpactReportsAndSDGs;
