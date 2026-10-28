import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Download,
  Calendar,
  Users,
  Building2,
  Heart,
  ShieldCheck,
  GraduationCap,
  HeartPulse,
  Sprout,
  Droplets,
  TrendingUp,
  MapPin,
  ChevronDown,
  CheckCircle2,
  BarChart3,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

const KPI_METRICS = [
  {
    title: 'People Reached',
    value: '12,480',
    trend: '+ 12% this year',
    icon: Users,
    bg: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Communities Served',
    value: '86',
    trend: '+ 6',
    icon: Building2,
    bg: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Scholarships',
    value: '2,340',
    trend: '+ 15%',
    icon: Heart,
    bg: 'bg-rose-50 text-rose-500 fill-rose-500',
  },
  {
    title: 'Medical Interventions',
    value: '8,520',
    trend: '+ 18%',
    icon: ShieldCheck,
    bg: 'bg-amber-50 text-amber-600',
  },
];

const MONTHLY_IMPACT_2026 = [
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
];

const STATE_IMPACT_DATA = [
  { state: 'Lagos', tier: 'high', beneficiaries: '4,280', communities: 14, pillar: 'Education & Health' },
  { state: 'Kano', tier: 'high', beneficiaries: '3,150', communities: 22, pillar: 'Health & Nutrition' },
  { state: 'Kaduna', tier: 'high', beneficiaries: '2,420', communities: 18, pillar: 'Education STEM' },
  { state: 'Oyo', tier: 'high', beneficiaries: '1,890', communities: 12, pillar: 'Water & Community' },
  { state: 'Enugu', tier: 'medium', beneficiaries: '980', communities: 8, pillar: 'Education' },
  { state: 'Ondo', tier: 'medium', beneficiaries: '840', communities: 6, pillar: 'Ilara-Mokin Cluster' },
  { state: 'Rivers', tier: 'medium', beneficiaries: '750', communities: 5, pillar: 'Agritech Micro-grants' },
  { state: 'Abuja (FCT)', tier: 'medium', beneficiaries: '620', communities: 4, pillar: 'Youth Fellowship' },
  { state: 'Sokoto', tier: 'low', beneficiaries: '420', communities: 3, pillar: 'Primary Eye Care' },
  { state: 'Delta', tier: 'low', beneficiaries: '380', communities: 2, pillar: 'Vocational Training' },
];

const ImpactDashboardPage = () => {
  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedPillarFilter, setSelectedPillarFilter] = useState('All Pillars');
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredState, setHoveredState] = useState(STATE_IMPACT_DATA[0]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const handleTabSwitch = (tabId) => {
    setMobileSidebarOpen(false);
    if (tabId === 'beneficiaries') navigate('/admin/beneficiaries');
    else if (tabId === 'dashboard') navigate('/admin/dashboard');
    else if (tabId === 'programmes') navigate('/admin/programmes');
    else if (tabId === 'donations') navigate('/admin/donations');
    else if (tabId === 'impact') navigate('/admin/impact');
    else navigate(`/admin/${tabId}`);
  };

  const handleSignOut = () => {
    localStorage.removeItem('cmaof_admin_token');
    toast.success('Signed out of admin session');
    navigate('/admin');
  };

  const handleDownloadReport = () => {
    toast.success('Compiling CMAOF 2026 Annual Impact & MEAL Dossier...');
    window.print();
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex overflow-hidden font-sans selection:bg-[#06402B] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. FIXED 100VH LEFT SIDEBAR
      ───────────────────────────────────────────────────────────── */}
      <AdminSidebar
        activeTab="impact"
        onTabChange={handleTabSwitch}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        onSignOut={handleSignOut}
      />

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT AREA
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 lg:pl-64 h-screen flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <AdminHeader
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onSignOut={handleSignOut}
          onOpenSettings={() => navigate('/admin/dashboard')}
        />

        {/* Scrollable Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-5">
          {/* ─────────────────────────────────────────────────────────────
              3. PAGE HEADER & ACTIONS
          ───────────────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight">
                Impact Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Track progress, outcomes and impact across all programmes.
              </p>
            </div>

            {/* Top Right Controls (Select Year & Download Report) */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-xs">
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
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#06402B] to-[#0A5238] hover:from-[#042C1D] hover:to-[#06402B] text-white text-xs sm:text-[13px] font-bold shadow-md shadow-emerald-950/20 transition-all cursor-pointer active:scale-[0.98]"
              >
                <Download size={15} />
                <span>Download Report</span>
              </button>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              4. 4 TOP KPI SUMMARY CARDS
          ───────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
            {KPI_METRICS.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-2xl ${kpi.bg} flex items-center justify-center font-bold shrink-0`}>
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight truncate">
                      {kpi.title}
                    </p>
                    <p className="text-xl sm:text-[1.35rem] font-black text-[#0B2D6E] tracking-tight leading-tight mt-0.5 truncate">
                      {kpi.value}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-bold mt-0.5">
                      {kpi.trend}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              5. MIDDLE ROW: PEOPLE REACHED BY PILLAR & GEOGRAPHIC REACH
          ───────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Left Card (5.5 Cols): People Reached by Pillar */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight mb-4">
                  People Reached by Pillar
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-2">
                  {/* Donut SVG with exact 3-color breakdown */}
                  <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
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
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-xl font-black text-[#0B2D6E] leading-tight">12,480</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
                    </div>
                  </div>

                  {/* Legend matching screenshot */}
                  <div className="space-y-3.5 w-full sm:w-auto">
                    <div className="flex items-start gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-[#0284c7] mt-1 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-700 leading-tight">Education & Human Capital</p>
                        <p className="text-xs font-extrabold text-[#0B2D6E] mt-0.5">5,240 <span className="text-slate-400 font-medium">(42%)</span></p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-[#ef4444] mt-1 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-700 leading-tight">Health & Well-being</p>
                        <p className="text-xs font-extrabold text-[#0B2D6E] mt-0.5">4,120 <span className="text-slate-400 font-medium">(33%)</span></p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-3 h-3 rounded-full bg-[#06402B] mt-1 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-700 leading-tight">Community Resilience</p>
                        <p className="text-xs font-extrabold text-[#0B2D6E] mt-0.5">3,120 <span className="text-slate-400 font-medium">(25%)</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Field baseline MEAL verification</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} /> Target Exceeded (+8%)
                </span>
              </div>
            </div>

            {/* Right Card (7 Cols): Geographic Reach */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight">
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
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-2">
                  {/* Nigeria Map Graphic with Heatmap Overlays */}
                  <div className="sm:col-span-8 relative min-h-[220px] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                    <img
                      src="/images/nigeria_geographic_map.jpg"
                      alt="Nigeria Geographic Reach Map"
                      className="w-full h-auto max-h-[220px] object-contain opacity-90 hover:opacity-100 transition-opacity"
                    />

                    {/* Active State Hover Callout Card */}
                    {hoveredState && (
                      <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-xs text-white p-2.5 rounded-xl text-left shadow-lg pointer-events-none">
                        <p className="font-bold text-xs">{hoveredState.state} State</p>
                        <p className="text-[11px] text-emerald-300">
                          {hoveredState.beneficiaries} Beneficiaries • {hoveredState.communities} Communities
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Legend & Tiers List */}
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

                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                      <p><strong>Top State:</strong> Lagos (4,280 reached)</p>
                      <p><strong>Rural Spread:</strong> 86 Communities</p>
                      <p><strong>Presence:</strong> 10 Federal States</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>National Coverage Index: 28%</span>
                <span className="text-emerald-700 font-bold">Zenith & Access Bank CSR hubs</span>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              6. BOTTOM ROW: KEY OUTCOME INDICATORS & IMPACT TRENDS
          ───────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Left Card (5 Cols): Key Outcome Indicators */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight mb-4">
                  Key Outcome Indicators
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  {/* Indicator 1: School Enrollment */}
                  <div className="p-3 rounded-2xl bg-sky-50/60 border border-sky-100 text-center flex flex-col items-center justify-center">
                    <div className="w-9 h-9 rounded-xl bg-[#0284c7] text-white flex items-center justify-center mb-1.5 shadow-xs">
                      <GraduationCap size={18} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate w-full">
                      School Enrollment
                    </p>
                    <p className="text-base sm:text-lg font-black text-[#0B2D6E] mt-0.5">
                      2,340
                    </p>
                  </div>

                  {/* Indicator 2: Medical Beneficiaries */}
                  <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-100 text-center flex flex-col items-center justify-center">
                    <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center mb-1.5 shadow-xs">
                      <HeartPulse size={18} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate w-full">
                      Medical Care
                    </p>
                    <p className="text-base sm:text-lg font-black text-[#0B2D6E] mt-0.5">
                      8,520
                    </p>
                  </div>

                  {/* Indicator 3: Food Support */}
                  <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center flex flex-col items-center justify-center">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-1.5 shadow-xs">
                      <Sprout size={18} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate w-full">
                      Food Support
                    </p>
                    <p className="text-base sm:text-lg font-black text-[#0B2D6E] mt-0.5">
                      3,120
                    </p>
                  </div>

                  {/* Indicator 4: Water Projects */}
                  <div className="p-3 rounded-2xl bg-teal-50/60 border border-teal-100 text-center flex flex-col items-center justify-center">
                    <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center mb-1.5 shadow-xs">
                      <Droplets size={18} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate w-full">
                      Water Projects
                    </p>
                    <p className="text-base sm:text-lg font-black text-[#0B2D6E] mt-0.5">
                      24
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                All metrics audited and logged under ISO MEAL criteria
              </div>
            </div>

            {/* Right Card (7 Cols): Impact Trends (People Reached) Bar Chart */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight">
                    Impact Trends (People Reached)
                  </h2>

                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#06402B] cursor-pointer"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>

                {/* Monthly Bar Chart matching screenshot */}
                <div className="relative h-44 sm:h-48 w-full pt-4">
                  {/* Background grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] font-bold text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="w-6 text-right">1500</span>
                      <div className="flex-1 border-b border-dashed border-slate-200" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 text-right">1000</span>
                      <div className="flex-1 border-b border-dashed border-slate-200" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 text-right">500</span>
                      <div className="flex-1 border-b border-dashed border-slate-200" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 text-right">0</span>
                      <div className="flex-1 border-b border-slate-300" />
                    </div>
                  </div>

                  {/* Bars */}
                  <div className="absolute inset-0 pl-8 flex items-end justify-between gap-1 sm:gap-2 pb-6">
                    {MONTHLY_IMPACT_2026.map((item, index) => {
                      const heightPercent = (item.value / 1600) * 100;
                      const isHovered = hoveredBar === index;

                      return (
                        <div
                          key={item.month}
                          onMouseEnter={() => setHoveredBar(index)}
                          onMouseLeave={() => setHoveredBar(null)}
                          className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                        >
                          {isHovered && (
                            <div className="absolute -top-7 bg-slate-900 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow z-10 whitespace-nowrap">
                              {item.month}: {item.value.toLocaleString()} reached
                            </div>
                          )}
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className={`
                              w-full max-w-[24px] rounded-t-md transition-all duration-300
                              ${
                                isHovered
                                  ? 'bg-[#14634C] scale-y-105'
                                  : 'bg-gradient-to-t from-[#06402B] to-[#0D5C3E]'
                              }
                            `}
                          />
                          <span className="absolute -bottom-5 text-[9px] sm:text-[10px] font-bold text-slate-400">
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Peak outreach quarter: Q3 & Q4 (School & Agricultural cycle)</span>
                <span className="text-emerald-700 font-bold">Continuous Monitoring</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ImpactDashboardPage;
