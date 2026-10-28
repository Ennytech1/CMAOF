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
  ExternalLink,
  GraduationCap,
  HeartPulse,
  Droplets,
  Sprout,
  BarChart3,
  Sparkles,
  Layers,
  ArrowUpRight,
  Filter,
  Check,
  Clock,
  Award,
} from 'lucide-react';
import toast from 'react-hot-toast';

const KPI_METRICS = [
  {
    title: 'Verified Beneficiaries',
    value: '12,480',
    trend: '+14.2% YoY',
    icon: Users,
    color: 'emerald',
    sub: 'Direct biometrically verified recipients',
    pill: '100% Audited',
  },
  {
    title: 'Communities Reached',
    value: '86',
    trend: '+12 LGAs in 2026',
    icon: Building2,
    color: 'blue',
    sub: 'Active across 10 Nigerian States',
    pill: 'Field Active',
  },
  {
    title: 'Scholarship Grants',
    value: '2,340',
    trend: '98.6% Completion',
    icon: GraduationCap,
    color: 'amber',
    sub: 'Primary, Secondary & Tertiary STEM',
    pill: 'Pillar 1',
  },
  {
    title: 'Clinical Care & Surgeries',
    value: '8,520',
    trend: '+18.4% this quarter',
    icon: HeartPulse,
    color: 'rose',
    sub: 'Cataract surgeries & primary health',
    pill: 'Pillar 2',
  },
];

const MONTHLY_IMPACT_2026 = [
  { month: 'Jan', value: 420, interventions: 310 },
  { month: 'Feb', value: 380, interventions: 280 },
  { month: 'Mar', value: 650, interventions: 490 },
  { month: 'Apr', value: 720, interventions: 530 },
  { month: 'May', value: 890, interventions: 670 },
  { month: 'Jun', value: 840, interventions: 620 },
  { month: 'Jul', value: 610, interventions: 450 },
  { month: 'Aug', value: 920, interventions: 710 },
  { month: 'Sep', value: 1250, interventions: 940 },
  { month: 'Oct', value: 1100, interventions: 820 },
  { month: 'Nov', value: 1380, interventions: 1040 },
  { month: 'Dec', value: 1450, interventions: 1120 },
];

const STATE_IMPACT_DATA = [
  { state: 'Lagos', lgaCount: 6, beneficiaries: '4,280', communities: 14, coordinator: 'Hauwa Bello', primaryPillar: 'Education & Health', status: 'Active' },
  { state: 'Kano', lgaCount: 8, beneficiaries: '3,150', communities: 22, coordinator: 'Ibrahim Danladi', primaryPillar: 'Health & Nutrition', status: 'Active' },
  { state: 'Kaduna', lgaCount: 5, beneficiaries: '2,420', communities: 18, coordinator: 'Amina Yusuf', primaryPillar: 'Education & STEM', status: 'Active' },
  { state: 'Oyo', lgaCount: 4, beneficiaries: '1,890', communities: 12, coordinator: 'Dr. Kelechi Nwosu', primaryPillar: 'Clean Water & Clinics', status: 'Active' },
  { state: 'Niger', lgaCount: 5, beneficiaries: '1,420', communities: 11, coordinator: 'Usman Garba', primaryPillar: 'Solar Boreholes & Agricoop', status: 'Active' },
  { state: 'Ondo', lgaCount: 3, beneficiaries: '840', communities: 6, coordinator: 'Olumide Bakare', primaryPillar: 'Ilara-Mokin Regional Hub', status: 'Active' },
  { state: 'Enugu', lgaCount: 3, beneficiaries: '980', communities: 8, coordinator: 'Chidinma Eze', primaryPillar: 'Tertiary Scholarships', status: 'Active' },
  { state: 'Rivers', lgaCount: 2, beneficiaries: '750', communities: 5, coordinator: 'Bariledum Nwankwo', primaryPillar: 'Agritech Micro-grants', status: 'Active' },
  { state: 'Abuja (FCT)', lgaCount: 3, beneficiaries: '620', communities: 4, coordinator: 'Zainab Mohammed', primaryPillar: 'Leadership Fellows', status: 'Active' },
  { state: 'Plateau', lgaCount: 2, beneficiaries: '480', communities: 3, coordinator: 'Pam Gyang', primaryPillar: 'Community Peace Hub', status: 'Active' },
];

const SDG_TARGETS = [
  {
    code: 'SDG 1',
    name: 'No Poverty',
    progress: 84,
    achieved: '8,400 households transitioned to sustainable livelihood',
    target: '10,000 Households by 2027',
    icon: Sprout,
    color: 'text-rose-600',
    barColor: 'bg-rose-500',
  },
  {
    code: 'SDG 3',
    name: 'Good Health & Well-being',
    progress: 92,
    achieved: '8,520 treated with verified free medical supplies & cataract surgeries',
    target: '9,250 Patients Annual Gate',
    icon: HeartPulse,
    color: 'text-emerald-600',
    barColor: 'bg-emerald-500',
  },
  {
    code: 'SDG 4',
    name: 'Quality Education',
    progress: 95,
    achieved: '2,340 STEM and tertiary scholars funded, equipped & mentored',
    target: '2,500 Scholars Benchmark',
    icon: GraduationCap,
    color: 'text-blue-600',
    barColor: 'bg-blue-600',
  },
  {
    code: 'SDG 6',
    name: 'Clean Water & Sanitation',
    progress: 90,
    achieved: '45 solar-powered clean water borehole systems commissioned (280,000L/day)',
    target: '50 Stations by Q4 2026',
    icon: Droplets,
    color: 'text-cyan-600',
    barColor: 'bg-cyan-500',
  },
];

const VERIFIED_AUDIT_FEED = [
  {
    id: 'aud-01',
    activity: 'Solar Water Station Yield & Bacteriological Lab Certification',
    location: 'Ilara-Mokin, Ondo State',
    date: '26 Oct 2026',
    officer: 'Engr. D. Adeleke (Independent MEAL Inspector)',
    status: 'Certified Pure (WHO Standards)',
  },
  {
    id: 'aud-02',
    activity: 'Biometric Enrollment & Identity Audit for Tertiary STEM Scholars',
    location: 'Federal University of Technology, Akure',
    date: '22 Oct 2026',
    officer: 'Hauwa Bello (Lead Programme Director)',
    status: '100% Attendance Verified',
  },
  {
    id: 'aud-03',
    activity: 'Ophthalmic Clinic & Post-Op Cataract Examination Sign-off',
    location: 'Primary Health Center, Ibadan, Oyo State',
    date: '18 Oct 2026',
    officer: 'Dr. Kelechi Nwosu (Medical Director)',
    status: '180 Surgeries 0% Complication',
  },
];

const AdminImpactSection = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [metricMode, setMetricMode] = useState('people'); // 'people' | 'interventions'
  const [selectedPillar, setSelectedPillar] = useState('All');
  const [hoveredMonth, setHoveredMonth] = useState(null);

  // Filter state footprint by pillar
  const filteredStates = STATE_IMPACT_DATA.filter((s) => {
    if (selectedPillar === 'All') return true;
    return s.primaryPillar.toLowerCase().includes(selectedPillar.toLowerCase().split(' ')[0]);
  });

  const handleExportCSV = () => {
    const headers = ['State', 'Target LGAs', 'Verified Beneficiaries', 'Communities Count', 'State Coordinator', 'Primary Thematic Pillar', 'Status'];
    const rows = filteredStates.map((s) => [
      `"${s.state}"`,
      `"${s.lgaCount}"`,
      `"${s.beneficiaries}"`,
      `"${s.communities}"`,
      `"${s.coordinator}"`,
      `"${s.primaryPillar}"`,
      `"${s.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CMAOF_MEAL_Impact_Report_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('MEAL Impact Report exported as CSV!');
  };

  const currentValues = MONTHLY_IMPACT_2026.map((m) =>
    metricMode === 'people' ? m.value : m.interventions
  );
  const maxVal = Math.max(...currentValues);

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. CLEAN EXECUTIVE HEADER (Orange Accent Pill + Controls)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="w-1.5 h-8 sm:h-9 rounded-full bg-[#f97316] mt-0.5 shrink-0" />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight">
              Impact & MEAL Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Empirical monitoring metrics, biometric registries, community footprints, and verified UN SDG indicators.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs cursor-pointer focus:outline-none focus:border-[#06402B]"
          >
            <option value="2026">Year 2026 (Live Audit)</option>
            <option value="2025">Year 2025 (Annual Close)</option>
            <option value="2024">Year 2024 (Historical)</option>
          </select>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Export MEAL Dossier</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. 4 EXECUTIVE KPI IMPACT METRIC CARDS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_METRICS.map((kpi, idx) => {
          const Icon = kpi.icon;
          const bgMap = {
            emerald: 'bg-emerald-50 text-[#06402B] border-emerald-100',
            blue: 'bg-blue-50 text-[#0B2D6E] border-blue-100',
            amber: 'bg-amber-50 text-amber-800 border-amber-100',
            rose: 'bg-rose-50 text-rose-700 border-rose-100',
          };

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold group-hover:scale-105 transition-transform ${bgMap[kpi.color]}`}
                >
                  <Icon size={18} />
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {kpi.pill}
                </span>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {kpi.title}
                </p>
                <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
                  {kpi.value}
                </p>
                <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-100">
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <TrendingUp size={13} />
                    {kpi.trend}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate max-w-[120px]">{kpi.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MONTHLY INTERVENTION VELOCITY VISUALIZER
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <BarChart3 size={18} className="text-[#06402B]" />
              <span>Milestone Delivery Velocity ({selectedYear})</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Verified monthly cadence of on-the-ground interventions and direct assistance.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setMetricMode('people')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                metricMode === 'people'
                  ? 'bg-white text-[#0B2D6E] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Beneficiaries Reached
            </button>
            <button
              type="button"
              onClick={() => setMetricMode('interventions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                metricMode === 'interventions'
                  ? 'bg-white text-[#0B2D6E] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Direct Interventions
            </button>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-52 pt-8 pb-2 flex items-end justify-between gap-1 sm:gap-3">
          {MONTHLY_IMPACT_2026.map((item, idx) => {
            const val = metricMode === 'people' ? item.value : item.interventions;
            const heightPct = Math.round((val / maxVal) * 100);
            const isHovered = hoveredMonth === idx;

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative"
                onMouseEnter={() => setHoveredMonth(idx)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-10 px-2.5 py-1.5 rounded-xl bg-[#0B2D6E] text-white text-[11px] font-bold whitespace-nowrap shadow-lg z-20 animate-[fadeIn_0.1s_ease]">
                    {val.toLocaleString()} {metricMode === 'people' ? 'recipients' : 'actions'} ({item.month})
                  </div>
                )}

                <div className="w-full bg-slate-100/90 rounded-t-xl h-36 flex items-end overflow-hidden">
                  <div
                    className={`w-full transition-all duration-300 rounded-t-xl ${
                      isHovered ? 'bg-[#f97316]' : 'bg-[#06402B]'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span
                  className={`text-[11px] font-bold transition-colors ${
                    isHovered ? 'text-[#06402B] font-black' : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                >
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#06402B]" />
            Monthly Milestone Progress
          </span>
          <span className="font-bold text-[#0B2D6E]">
            Peak Output: 1,450 Verified Operations (December Gate)
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. REGIONAL COVERAGE FOOTPRINT & UN SDG SCORECARDS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 10 Active States Regional Footprint Ledger (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm sm:text-base font-black text-[#0B2D6E] tracking-tight">
                Geographic Coverage & Field Footprint
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                10 Active Nigerian States with verified local government footprints.
              </p>
            </div>

            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              {['All', 'Education', 'Health', 'Clean Water'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelectedPillar(p)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                    selectedPillar === p
                      ? 'bg-[#06402B] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="py-2.5 px-3">State & LGAs</th>
                  <th className="py-2.5 px-3">Primary Intervention</th>
                  <th className="py-2.5 px-3">Coordinator</th>
                  <th className="py-2.5 px-3 text-right">Beneficiaries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredStates.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-800">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#06402B] shrink-0" />
                        <div>
                          <span>{s.state}</span>
                          <span className="block text-[10px] font-normal text-slate-400">
                            {s.lgaCount} LGAs • {s.communities} Communities
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#06402B] border border-emerald-100">
                        {s.primaryPillar}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-medium">
                      {s.coordinator}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-[#0B2D6E] font-mono text-sm">
                      {s.beneficiaries}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: United Nations SDG Alignment (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm sm:text-base font-black text-[#0B2D6E] tracking-tight">
                  UN SDG Impact Scorecard
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Verified alignment against United Nations Global Goals.
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0B2D6E] border border-blue-100 shrink-0">
                4 Key Goals
              </span>
            </div>

            <div className="space-y-3.5 mt-3">
              {SDG_TARGETS.map((sdg, idx) => {
                const Icon = sdg.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-2 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center shrink-0">
                          <Icon size={16} className={sdg.color} />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black uppercase text-slate-400">
                              {sdg.code}
                            </span>
                            <span className="font-bold text-xs text-slate-800">{sdg.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium block">
                            Target: {sdg.target}
                          </span>
                        </div>
                      </div>

                      <span className="font-black text-xs text-[#06402B]">
                        {sdg.progress}%
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${sdg.barColor} transition-all duration-500`}
                        style={{ width: `${sdg.progress}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-600 font-medium">
                      {sdg.achieved}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>External Evaluation: Deloitte MEAL Audit</span>
            <span className="font-bold text-emerald-700">92.8% Cumulative Compliance</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. THIRD-PARTY AUDIT & INDEPENDENT VERIFICATION LOG
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#06402B]" />
              <span>Independent MEAL Field Certifications & Technical Audits</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Third-party quality assessments, lab water analysis, and clinical sign-offs.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700">Cryptographically Signed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {VERIFIED_AUDIT_FEED.map((aud) => (
            <div
              key={aud.id}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-mono">{aud.date}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#06402B] font-bold border border-emerald-100">
                  {aud.status}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 line-clamp-2">{aud.activity}</h4>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin size={11} className="text-slate-400 shrink-0" />
                <span>{aud.location}</span>
              </p>
              <p className="text-[10px] text-slate-400 font-medium pt-1 border-t border-slate-200/60">
                Inspector: {aud.officer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminImpactSection;
