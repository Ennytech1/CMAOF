import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Building2,
  Heart,
  ShieldCheck,
  Download,
  Calendar,
  MapPin,
  CheckCircle2,
  GraduationCap,
  HeartPulse,
  Droplets,
  Sprout,
  Filter,
  Layers,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  ChevronDown,
  BarChart3,
  Award,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Dynamic year dataset mapping
const YEAR_DATA = {
  '2026': {
    peopleReached: '12,480',
    peopleTrend: '+ 12% this year',
    communitiesServed: '86',
    communitiesTrend: '+ 6',
    scholarships: '2,340',
    scholarshipsTrend: '+ 15%',
    medicalInterventions: '8,520',
    medicalTrend: '+ 18%',
    totalDonut: '12,480',
    pillarStats: [
      { name: 'Education & Human Capital', count: '5,240', pct: 42, color: '#0284c7', circleClass: 'bg-[#0284c7]' },
      { name: 'Health & Well-being', count: '4,120', pct: 33, color: '#ef4444', circleClass: 'bg-[#ef4444]' },
      { name: 'Community Resilience', count: '3,120', pct: 25, color: '#06402B', circleClass: 'bg-[#06402B]' },
    ],
    outcomes: [
      { id: 'edu', label: 'School Enrollment', count: '2,340', icon: GraduationCap, color: 'bg-[#0284c7]', border: 'border-sky-100', bg: 'bg-sky-50/60' },
      { id: 'health', label: 'Medical Care', count: '8,520', icon: HeartPulse, color: 'bg-rose-500', border: 'border-rose-100', bg: 'bg-rose-50/60' },
      { id: 'food', label: 'Food Support', count: '3,120', icon: Sprout, color: 'bg-emerald-600', border: 'border-emerald-100', bg: 'bg-emerald-50/60' },
      { id: 'water', label: 'Water Projects', count: '24', icon: Droplets, color: 'bg-[#06402B]', border: 'border-teal-100', bg: 'bg-teal-50/60' },
    ],
    monthlyBars: [
      { month: 'Jan', value: 420 },
      { month: 'Feb', value: 380 },
      { month: 'Mar', value: 650 },
      { month: 'Apr', value: 720 },
      { month: 'May', value: 890 },
      { month: 'Jun', value: 840 },
      { month: 'Jul', value: 610 },
      { month: 'Aug', value: 920 },
      { month: 'Sep', value: 1250 },
      { month: 'Oct', value: 1100 },
      { month: 'Nov', value: 1380 },
      { month: 'Dec', value: 1450 },
    ],
  },
  '2025': {
    peopleReached: '10,950',
    peopleTrend: '+ 18% vs 2024',
    communitiesServed: '80',
    communitiesTrend: '+ 8',
    scholarships: '1,980',
    scholarshipsTrend: '+ 22%',
    medicalInterventions: '7,150',
    medicalTrend: '+ 14%',
    totalDonut: '10,950',
    pillarStats: [
      { name: 'Education & Human Capital', count: '4,620', pct: 42, color: '#0284c7', circleClass: 'bg-[#0284c7]' },
      { name: 'Health & Well-being', count: '3,610', pct: 33, color: '#ef4444', circleClass: 'bg-[#ef4444]' },
      { name: 'Community Resilience', count: '2,720', pct: 25, color: '#06402B', circleClass: 'bg-[#06402B]' },
    ],
    outcomes: [
      { id: 'edu', label: 'School Enrollment', count: '1,980', icon: GraduationCap, color: 'bg-[#0284c7]', border: 'border-sky-100', bg: 'bg-sky-50/60' },
      { id: 'health', label: 'Medical Care', count: '7,150', icon: HeartPulse, color: 'bg-rose-500', border: 'border-rose-100', bg: 'bg-rose-50/60' },
      { id: 'food', label: 'Food Support', count: '2,720', icon: Sprout, color: 'bg-emerald-600', border: 'border-emerald-100', bg: 'bg-emerald-50/60' },
      { id: 'water', label: 'Water Projects', count: '18', icon: Droplets, color: 'bg-[#06402B]', border: 'border-teal-100', bg: 'bg-teal-50/60' },
    ],
    monthlyBars: [
      { month: 'Jan', value: 350 },
      { month: 'Feb', value: 310 },
      { month: 'Mar', value: 540 },
      { month: 'Apr', value: 610 },
      { month: 'May', value: 760 },
      { month: 'Jun', value: 720 },
      { month: 'Jul', value: 520 },
      { month: 'Aug', value: 790 },
      { month: 'Sep', value: 1080 },
      { month: 'Oct', value: 950 },
      { month: 'Nov', value: 1190 },
      { month: 'Dec', value: 1240 },
    ],
  },
  '2024': {
    peopleReached: '9,240',
    peopleTrend: '+ 24% inaugural',
    communitiesServed: '72',
    communitiesTrend: '+ 14',
    scholarships: '1,620',
    scholarshipsTrend: '+ 30%',
    medicalInterventions: '6,280',
    medicalTrend: '+ 20%',
    totalDonut: '9,240',
    pillarStats: [
      { name: 'Education & Human Capital', count: '3,880', pct: 42, color: '#0284c7', circleClass: 'bg-[#0284c7]' },
      { name: 'Health & Well-being', count: '3,050', pct: 33, color: '#ef4444', circleClass: 'bg-[#ef4444]' },
      { name: 'Community Resilience', count: '2,310', pct: 25, color: '#06402B', circleClass: 'bg-[#06402B]' },
    ],
    outcomes: [
      { id: 'edu', label: 'School Enrollment', count: '1,620', icon: GraduationCap, color: 'bg-[#0284c7]', border: 'border-sky-100', bg: 'bg-sky-50/60' },
      { id: 'health', label: 'Medical Care', count: '6,280', icon: HeartPulse, color: 'bg-rose-500', border: 'border-rose-100', bg: 'bg-rose-50/60' },
      { id: 'food', label: 'Food Support', count: '2,310', icon: Sprout, color: 'bg-emerald-600', border: 'border-emerald-100', bg: 'bg-emerald-50/60' },
      { id: 'water', label: 'Water Projects', count: '12', icon: Droplets, color: 'bg-[#06402B]', border: 'border-teal-100', bg: 'bg-teal-50/60' },
    ],
    monthlyBars: [
      { month: 'Jan', value: 280 },
      { month: 'Feb', value: 240 },
      { month: 'Mar', value: 420 },
      { month: 'Apr', value: 480 },
      { month: 'May', value: 610 },
      { month: 'Jun', value: 580 },
      { month: 'Jul', value: 430 },
      { month: 'Aug', value: 650 },
      { month: 'Sep', value: 890 },
      { month: 'Oct', value: 780 },
      { month: 'Nov', value: 980 },
      { month: 'Dec', value: 1020 },
    ],
  },
};

const STATE_IMPACT_DATA = [
  { state: 'Lagos', tier: 'High', beneficiaries: '4,280', communities: 14, primaryPillar: 'Education & Health', coordinator: 'Hauwa Bello' },
  { state: 'Kano', tier: 'High', beneficiaries: '3,150', communities: 22, primaryPillar: 'Health & Nutrition', coordinator: 'Ibrahim Danladi' },
  { state: 'Kaduna', tier: 'High', beneficiaries: '2,420', communities: 18, primaryPillar: 'Education & STEM', coordinator: 'Amina Yusuf' },
  { state: 'Oyo', tier: 'High', beneficiaries: '1,890', communities: 12, primaryPillar: 'Water & Health', coordinator: 'Dr. Kelechi Nwosu' },
  { state: 'Enugu', tier: 'Medium', beneficiaries: '980', communities: 8, primaryPillar: 'Tertiary Scholarships', coordinator: 'Chidinma Eze' },
  { state: 'Ondo', tier: 'Medium', beneficiaries: '840', communities: 6, primaryPillar: 'Ilara-Mokin Regional Hub', coordinator: 'Olumide Bakare' },
  { state: 'Rivers', tier: 'Medium', beneficiaries: '750', communities: 5, primaryPillar: 'Agritech Micro-grants', coordinator: 'Bariledum Nwankwo' },
  { state: 'Abuja (FCT)', tier: 'Medium', beneficiaries: '620', communities: 4, primaryPillar: 'Leadership Fellows', coordinator: 'Zainab Mohammed' },
  { state: 'Sokoto', tier: 'Low', beneficiaries: '420', communities: 3, primaryPillar: 'Primary Eye Care', coordinator: 'Usman Garba' },
  { state: 'Delta', tier: 'Low', beneficiaries: '380', communities: 2, primaryPillar: 'Vocational Training', coordinator: 'Efe Omoruyi' },
];

const AdminImpactSection = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedPillarFilter, setSelectedPillarFilter] = useState('All Pillars');
  const [hoveredBar, setHoveredBar] = useState(null);
  const [selectedState, setSelectedState] = useState(STATE_IMPACT_DATA[0]);
  const [activeViewTab, setActiveViewTab] = useState('dashboard'); // 'dashboard' | 'state-roster' | 'sdg'

  const currentData = YEAR_DATA[selectedYear] || YEAR_DATA['2026'];

  const filteredStates = STATE_IMPACT_DATA.filter((s) => {
    if (selectedPillarFilter === 'All Pillars') return true;
    return s.primaryPillar.toLowerCase().includes(selectedPillarFilter.toLowerCase().split(' ')[0]);
  });

  const handleDownloadReport = () => {
    toast.success(`Exporting CMAOF ${selectedYear} Impact & MEAL Dossier...`);
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['State', 'Impact Tier', 'Verified Beneficiaries', 'Communities Count', 'Primary Thematic Pillar', 'State Coordinator'];
    const rows = filteredStates.map((s) => [
      `"${s.state}"`,
      `"${s.tier}"`,
      `"${s.beneficiaries}"`,
      `"${s.communities}"`,
      `"${s.primaryPillar}"`,
      `"${s.coordinator}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CMAOF_Impact_Metrics_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Impact metrics CSV exported successfully!');
  };

  return (
    <div className="space-y-5 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. IMPACT DASHBOARD HEADER (Matching Screenshot Layout)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <span className="w-1.5 h-8 sm:h-9 rounded-full bg-[#f97316] mt-0.5 shrink-0" />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight">
              Impact Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Track progress, outcomes and impact across all programmes.
            </p>
          </div>
        </div>

        {/* Top Right Controls: Select Year & Download Report Button */}
        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-xs">
            <span className="text-slate-400 font-medium">Select Year</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent font-black text-[#0B2D6E] focus:outline-none cursor-pointer"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleDownloadReport}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"
          >
            <Download size={14} />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. 4 TOP KPI SUMMARY CARDS (Matching Screenshot Shapes & Colors)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Card 1: People Reached */}
        <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#06402B] border border-emerald-100 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
            <Users size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight truncate">
              People Reached
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight leading-tight mt-0.5 truncate">
              {currentData.peopleReached}
            </p>
            <p className="text-[11px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
              <span className="text-[10px]">▲</span>
              <span>{currentData.peopleTrend}</span>
            </p>
          </div>
        </div>

        {/* Card 2: Communities Served */}
        <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#06402B] border border-emerald-100 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
            <Building2 size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight truncate">
              Communities Served
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight leading-tight mt-0.5 truncate">
              {currentData.communitiesServed}
            </p>
            <p className="text-[11px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
              <span className="text-[10px]">▲</span>
              <span>{currentData.communitiesTrend}</span>
            </p>
          </div>
        </div>

        {/* Card 3: Scholarships */}
        <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
            <Heart size={22} className="fill-rose-500" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight truncate">
              Scholarships
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight leading-tight mt-0.5 truncate">
              {currentData.scholarships}
            </p>
            <p className="text-[11px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
              <span className="text-[10px]">▲</span>
              <span>{currentData.scholarshipsTrend}</span>
            </p>
          </div>
        </div>

        {/* Card 4: Medical Interventions */}
        <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
            <ShieldCheck size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight truncate">
              Medical Interventions
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight leading-tight mt-0.5 truncate">
              {currentData.medicalInterventions}
            </p>
            <p className="text-[11px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
              <span className="text-[10px]">▲</span>
              <span>{currentData.medicalTrend}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MIDDLE ROW (2 COLUMNS): PEOPLE REACHED BY PILLAR & GEOGRAPHIC REACH
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Card (5.2 Cols): People Reached by Pillar */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-base font-black text-[#0B2D6E] tracking-tight">
                People Reached by Pillar
              </h2>
              <span className="text-[11px] font-bold text-slate-400">Audited {selectedYear}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
              {/* Donut Chart SVG with Exact 3-color Breakdown */}
              <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="15" />
                  {/* Education: 42% = 100.2 dash */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="15"
                    strokeDasharray="100.2 238.76"
                    strokeDashoffset="0"
                    className="transition-all duration-500"
                  />
                  {/* Health: 33% = 78.8 dash */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="15"
                    strokeDasharray="78.79 238.76"
                    strokeDashoffset="-100.2"
                    className="transition-all duration-500"
                  />
                  {/* Community: 25% = 59.7 dash */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#06402B"
                    strokeWidth="15"
                    strokeDasharray="59.69 238.76"
                    strokeDashoffset="-178.99"
                    className="transition-all duration-500"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-xl font-black text-[#0B2D6E] leading-tight">
                    {currentData.totalDonut}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Total
                  </span>
                </div>
              </div>

              {/* Legend with Color Dots Matching Screenshot */}
              <div className="space-y-3 w-full sm:w-auto">
                {currentData.pillarStats.map((pillar, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5">
                    <span className={`w-3 h-3 rounded-full ${pillar.circleClass} mt-1 shrink-0`} />
                    <div>
                      <p className="text-xs font-bold text-slate-700 leading-tight">
                        {pillar.name}
                      </p>
                      <p className="text-xs font-extrabold text-[#0B2D6E] mt-0.5">
                        {pillar.count}{' '}
                        <span className="text-slate-400 font-medium">({pillar.pct}%)</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Verified field beneficiary registration</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 size={12} /> Target Exceeded (+8%)
            </span>
          </div>
        </div>

        {/* Right Card (6.8 Cols): Geographic Reach */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-base font-black text-[#0B2D6E] tracking-tight">
                Geographic Reach
              </h2>

              <select
                value={selectedPillarFilter}
                onChange={(e) => setSelectedPillarFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#06402B] cursor-pointer"
              >
                <option value="All Pillars">All Pillars</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Community">Community</option>
              </select>
            </div>

            {/* Map Display & Legend Container */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-1">
              {/* Nigeria Map Graphic with Active State Callout */}
              <div className="sm:col-span-8 relative min-h-[200px] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                <img
                  src="/images/nigeria_geographic_map.jpg"
                  alt="Nigeria Geographic Reach Map"
                  className="w-full h-auto max-h-[195px] object-contain opacity-90 hover:opacity-100 transition-opacity"
                />

                {/* Active State Details Callout Badge */}
                {selectedState && (
                  <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-xs text-white px-3 py-2 rounded-xl text-left shadow-lg">
                    <p className="font-bold text-xs">{selectedState.state} State ({selectedState.tier} Impact)</p>
                    <p className="text-[11px] text-emerald-300">
                      {selectedState.beneficiaries} Beneficiaries • {selectedState.communities} Communities
                    </p>
                  </div>
                )}
              </div>

              {/* Right Legend & Quick State Chips */}
              <div className="sm:col-span-4 space-y-3">
                <div className="space-y-2.5 text-xs font-bold">
                  <div className="flex items-center gap-2 text-slate-800">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#06402B] shadow-xs" />
                    <span>High Impact</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] shadow-xs" />
                    <span>Medium Impact</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#a7f3d0] shadow-xs" />
                    <span>Low Impact</span>
                  </div>
                </div>

                {/* State selector pills for quick interactive exploration */}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Select State Hub
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {STATE_IMPACT_DATA.slice(0, 6).map((st) => (
                      <button
                        key={st.state}
                        type="button"
                        onClick={() => setSelectedState(st)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                          selectedState?.state === st.state
                            ? 'bg-[#06402B] text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {st.state}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>National Coverage: 10 Focal States</span>
            <span className="text-emerald-700 font-bold">Ilara-Mokin Innovation Cluster</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM ROW (2 COLUMNS): KEY OUTCOME INDICATORS & IMPACT TRENDS BAR CHART
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Card (5 Cols): Key Outcome Indicators */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm sm:text-base font-black text-[#0B2D6E] tracking-tight">
                Key Outcome Indicators
              </h2>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                All Audited
              </span>
            </div>

            {/* 4 White/Color Accent Sub-Cards matching Screenshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {currentData.outcomes.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-2xl ${item.bg} border ${item.border} text-center flex flex-col items-center justify-center group hover:scale-102 transition-transform shadow-2xs`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl ${item.color} text-white flex items-center justify-center mb-1.5 shadow-xs`}
                    >
                      <IconComponent size={18} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight truncate w-full">
                      {item.label}
                    </p>
                    <p className="text-base sm:text-lg font-black text-[#0B2D6E] mt-0.5">
                      {item.count}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>SDG 1, 3, 4, 6 Compliance</span>
            <span className="font-bold text-[#06402B]">100% Verified Outcomes</span>
          </div>
        </div>

        {/* Right Card (7 Cols): Impact Trends (People Reached) Monthly Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm sm:text-base font-black text-[#0B2D6E] tracking-tight">
                Impact Trends (People Reached)
              </h2>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#06402B] cursor-pointer"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>

            {/* Monthly Bar Chart Matching Screenshot Exact Look */}
            <div className="relative h-44 w-full pt-4">
              {/* Background Dashed Grid Lines (500, 300, 200, 0) */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] font-bold text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-6 text-right">500+</span>
                  <div className="flex-1 border-b border-dashed border-slate-200" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-right">300</span>
                  <div className="flex-1 border-b border-dashed border-slate-200" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-right">200</span>
                  <div className="flex-1 border-b border-dashed border-slate-200" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-right">0</span>
                  <div className="flex-1 border-b border-slate-300" />
                </div>
              </div>

              {/* Dynamic Vertical Green Bars */}
              <div className="absolute inset-0 pl-8 flex items-end justify-between gap-1 sm:gap-2 pb-6">
                {currentData.monthlyBars.map((item, index) => {
                  const heightPercent = Math.min(100, Math.round((item.value / 1550) * 100));
                  const isHovered = hoveredBar === index;

                  return (
                    <div
                      key={item.month}
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                      className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                    >
                      {/* Interactive Hover Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-7 bg-slate-900 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow z-10 whitespace-nowrap animate-[fadeIn_0.1s_ease]">
                          {item.month}: {item.value.toLocaleString()} reached
                        </div>
                      )}

                      {/* Bar with Screenshot Rounded-Top & Green Color */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`
                          w-full max-w-[24px] rounded-t-md transition-all duration-300
                          ${
                            isHovered
                              ? 'bg-[#10b981] scale-y-105 shadow-xs'
                              : 'bg-gradient-to-t from-[#06402B] to-[#0A5238]'
                          }
                        `}
                      />

                      {/* Month Label */}
                      <span className="absolute -bottom-5 text-[9px] sm:text-[10px] font-bold text-slate-400 group-hover:text-slate-800 transition-colors">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Peak outreach surge: Q3 & Q4 back-to-school season</span>
            <span className="text-emerald-700 font-bold">Continuous Monitoring</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. VALUABLE IMPROVEMENT: DETAILED STATE FOOTPRINT & EXPORT ROSTER
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-black text-[#0B2D6E]">
              State-by-State Impact Roster ({filteredStates.length} Focal States)
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Verified field counts, community coverage, and designated state coordinators.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Download size={13} />
            <span>Export CSV Roster</span>
          </button>
        </div>

        <div className="overflow-x-auto pt-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase">
                <th className="pb-2">Federal State</th>
                <th className="pb-2">Impact Tier</th>
                <th className="pb-2">Verified Beneficiaries</th>
                <th className="pb-2">Communities</th>
                <th className="pb-2">Lead Thematic Pillar</th>
                <th className="pb-2">State Coordinator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStates.map((st) => (
                <tr
                  key={st.state}
                  onClick={() => setSelectedState(st)}
                  className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                    selectedState?.state === st.state ? 'bg-emerald-50/50' : ''
                  }`}
                >
                  <td className="py-2.5 font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#06402B]" />
                    <span>{st.state}</span>
                  </td>
                  <td className="py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        st.tier === 'High'
                          ? 'bg-emerald-100 text-[#06402B]'
                          : st.tier === 'Medium'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {st.tier} Impact
                    </span>
                  </td>
                  <td className="py-2.5 font-mono font-bold text-[#0B2D6E]">{st.beneficiaries}</td>
                  <td className="py-2.5 text-slate-600">{st.communities} Communities</td>
                  <td className="py-2.5 font-semibold text-slate-800">{st.primaryPillar}</td>
                  <td className="py-2.5 text-slate-500">{st.coordinator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminImpactSection;
