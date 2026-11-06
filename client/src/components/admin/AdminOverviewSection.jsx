import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  Heart,
  FileText,
  GraduationCap,
  Bell,
  Calendar,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building,
  Activity,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminOverviewSection = ({ stats, onNavigateToBeneficiaries }) => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [hoveredBar, setHoveredBar] = useState(null);

  // Monthly Donations Data for 2026
  const monthlyData2026 = [
    { month: 'Jan', value: 750, label: '₦750K' },
    { month: 'Feb', value: 1280, label: '₦1.28M' },
    { month: 'Mar', value: 1620, label: '₦1.62M' },
    { month: 'Apr', value: 1580, label: '₦1.58M' },
    { month: 'May', value: 2040, label: '₦2.04M' },
    { month: 'Jun', value: 2850, label: '₦2.85M' },
    { month: 'Jul', value: 2280, label: '₦2.28M' },
    { month: 'Aug', value: 2750, label: '₦2.75M' },
    { month: 'Sep', value: 3150, label: '₦3.15M' },
    { month: 'Oct', value: 3780, label: '₦3.78M' },
  ];

  const monthlyData2025 = [
    { month: 'Jan', value: 520, label: '₦520K' },
    { month: 'Feb', value: 890, label: '₦890K' },
    { month: 'Mar', value: 1100, label: '₦1.10M' },
    { month: 'Apr', value: 1350, label: '₦1.35M' },
    { month: 'May', value: 1600, label: '₦1.60M' },
    { month: 'Jun', value: 2100, label: '₦2.10M' },
    { month: 'Jul', value: 1850, label: '₦1.85M' },
    { month: 'Aug', value: 2200, label: '₦2.20M' },
    { month: 'Sep', value: 2500, label: '₦2.50M' },
    { month: 'Oct', value: 2900, label: '₦2.90M' },
  ];

  const activeMonthlyData = selectedYear === '2026' ? monthlyData2026 : monthlyData2025;
  const maxBarValue = 5000;

  // 8 Executive Metric Cards Data aligned with CMAOF brand
  const kpiCards = [
    {
      title: 'Total Beneficiaries',
      value: stats?.totalBeneficiaries?.toLocaleString('en-US') || '12,480',
      trend: '+12% annual expansion',
      trendColor: 'text-[#338C26] font-bold',
      icon: <Users size={19} className="text-[#5B2E19]" />,
      bgIcon: 'bg-[#FAF0D4]',
      cardBg: 'bg-white',
    },
    {
      title: 'Active Programmes',
      value: stats?.activeProgrammes || 28,
      trend: '4 Strategic Pillars',
      trendColor: 'text-[#0047BA] font-bold',
      icon: <Briefcase size={19} className="text-[#0047BA]" />,
      bgIcon: 'bg-blue-50',
      cardBg: 'bg-white',
    },
    {
      title: 'Health Interventions',
      value: stats?.medicalInterventions?.toLocaleString('en-US') || '8,520',
      trend: '+18% clinical reach',
      trendColor: 'text-[#338C26] font-bold',
      icon: <Activity size={19} className="text-[#338C26]" />,
      bgIcon: 'bg-emerald-50',
      cardBg: 'bg-white',
    },
    {
      title: 'Grants & Donations',
      value: stats?.donationsReceived || '₦245.3M',
      trend: '+21% endowment inflow',
      trendColor: 'text-[#8B5E00] font-bold',
      icon: <FileText size={19} className="text-[#8B5E00]" />,
      bgIcon: 'bg-amber-100/70',
      cardBg: 'bg-white',
    },
    {
      title: 'Communities Reached',
      value: stats?.communitiesReached || 86,
      trend: '36 States & FCT targeted',
      trendColor: 'text-[#5B2E19] font-bold',
      icon: <Building size={19} className="text-[#5B2E19]" />,
      bgIcon: 'bg-[#FAF0D4]',
      cardBg: 'bg-white',
    },
    {
      title: 'Scholarships Awarded',
      value: stats?.scholarships?.toLocaleString('en-US') || '2,340',
      trend: '100% tuition coverage',
      trendColor: 'text-[#0047BA] font-bold',
      icon: <GraduationCap size={19} className="text-[#0047BA]" />,
      bgIcon: 'bg-blue-50',
      cardBg: 'bg-white',
    },
    {
      title: 'Open Field Cases',
      value: stats?.openCases || 312,
      trend: 'Active caseworker follow-up',
      trendColor: 'text-amber-700 font-bold',
      icon: <Layers size={19} className="text-amber-700" />,
      bgIcon: 'bg-amber-50',
      cardBg: 'bg-white',
    },
    {
      title: 'Pending Approvals',
      value: stats?.pendingApprovals || 7,
      trend: 'Awaiting director review',
      trendColor: 'text-rose-600 font-black',
      icon: <Bell size={19} className="text-rose-600" />,
      bgIcon: 'bg-rose-50',
      cardBg: 'bg-white',
    },
  ];

  // 4 Official Strategic Pillars Data (Matching Brand Identity Image)
  const pillars = [
    {
      id: 'education',
      title: 'Education & Opportunity',
      tagline: 'Learn → Develop → Excel',
      description: 'Scholarships, academic infrastructure, and technical skill development across Nigeria.',
      color: '#0047BA',
      icon: BookOpen,
      iconBg: 'bg-[#0047BA]',
      pillBg: 'bg-blue-50 text-[#0047BA]',
      route: '/our-work/education',
    },
    {
      id: 'health',
      title: 'Health & Wellbeing',
      tagline: 'Prevent → Treat → Restore',
      description: 'Primary care access, maternal welfare, medical outreach, and disease prevention.',
      color: '#338C26',
      icon: Heart,
      iconBg: 'bg-[#338C26]',
      pillBg: 'bg-emerald-50 text-[#338C26]',
      route: '/our-work/health',
    },
    {
      id: 'humanitarian',
      title: 'Humanitarian Support',
      tagline: 'Relieve → Rebuild → Sustain',
      description: 'Emergency relief, food security, social safety nets, and community resilience.',
      color: '#5B2E19',
      icon: Users,
      iconBg: 'bg-[#5B2E19]',
      pillBg: 'bg-[#FAF0E6] text-[#5B2E19]',
      route: '/our-work/humanitarian-support',
    },
    {
      id: 'economic',
      title: 'Economic Empowerment',
      tagline: 'Empower → Produce → Thrive',
      description: 'Vocational trades, micro-credit, enterprise acceleration, and youth entrepreneurship.',
      color: '#FCCD37',
      icon: TrendingUp,
      iconBg: 'bg-[#FCCD37]',
      iconText: 'text-[#3D1E10]',
      pillBg: 'bg-amber-50 text-[#7A4F00]',
      route: '/our-work/economic-empowerment',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-7 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. WELCOME HEADLINE & DATE ROW
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DEC2] shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#338C26] animate-pulse" />
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#5B2E19]/70">
              Chief Michael Ade.Ojo Foundation • Executive Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-[1.85rem] font-black text-[#3D1E10] tracking-tight mt-1">
            Welcome back, Abiola
          </h1>
          <p className="text-xs sm:text-sm text-[#5B2E19]/70 font-medium mt-0.5">
            Operational governance, strategic pillar performance, and institutional impact tracking.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto bg-[#FAF6EE] px-3.5 py-2 rounded-xl border border-[#E8DEC2] text-xs font-bold text-[#5B2E19]">
          <Calendar size={14} className="text-[#5B2E19]" />
          <span>Monday, 6 Oct 2026</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. STRATEGIC IMPACT AREAS: FOUR OFFICIAL FOUNDATION PILLARS
             (Directly inspired by the official CMAOF Brand Design)
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#FAF6EE]/70 rounded-2xl p-5 sm:p-6 border border-[#E8DEC2] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#E8DEC2]">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-9 rounded-full bg-[#FCCD37]" />
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-[#5B2E19]/70">Strategic Impact Areas</p>
              <h2 className="text-lg sm:text-xl font-black text-[#3D1E10] tracking-tight">
                Four Official Foundation Pillars
              </h2>
            </div>
          </div>
          <Link
            to="/our-work"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E8DEC2] text-xs font-bold text-[#5B2E19] hover:bg-[#FAF0D4] transition-colors self-start sm:self-auto shadow-2xs"
          >
            <span>Framework Overview</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-white rounded-2xl p-4.5 sm:p-5 border border-[#E8DEC2] hover:border-[#5B2E19]/40 hover:shadow-sm transition-all duration-200 group flex items-start gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${pillar.iconBg} ${pillar.iconText || 'text-white'} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                >
                  <Icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#3D1E10] truncate">
                      {pillar.title}
                    </h3>
                    <ArrowRight
                      size={14}
                      className="text-[#5B2E19]/40 group-hover:text-[#5B2E19] group-hover:translate-x-0.5 transition-all shrink-0"
                    />
                  </div>
                  <div className="mt-1">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide ${pillar.pillBg}`}>
                      {pillar.tagline}
                    </span>
                  </div>
                  <p className="text-xs text-[#5B2E19]/75 mt-2 line-clamp-2 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-3.5 border-t border-[#E8DEC2] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#5B2E19]/70 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#338C26]" />
            <span className="font-semibold">Structured for generational impact across Nigeria</span>
          </div>
          <Link
            to="/our-work"
            target="_blank"
            className="text-[#5B2E19] font-bold hover:underline flex items-center gap-1"
          >
            <span>Explore Strategic Framework</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. 8 EXECUTIVE KPI CARDS
      ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#5B2E19]/80">Key Performance Indicators</h3>
          <span className="text-[11px] font-semibold text-[#5B2E19]/60">Real-time sync</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi, idx) => (
            <div
              key={idx}
              className={`${kpi.cardBg} rounded-2xl p-4 sm:p-4.5 border border-[#E8DEC2] shadow-2xs hover:shadow-md transition-shadow duration-200 flex items-start gap-3.5`}
            >
              <div className={`w-11 h-11 rounded-xl ${kpi.bgIcon} flex items-center justify-center shrink-0`}>
                {kpi.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-[#5B2E19]/70 uppercase tracking-tight truncate">
                  {kpi.title}
                </p>
                <p className="text-xl sm:text-[1.35rem] font-black text-[#3D1E10] tracking-tight leading-tight mt-0.5">
                  {kpi.value}
                </p>
                <p className={`text-[11px] mt-1 ${kpi.trendColor}`}>
                  {kpi.trend}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. TWO BIG ANALYTICS PANELS: PILLAR BREAKDOWN & MONTHLY DONATIONS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Donut Chart: Beneficiaries by 4 Pillars */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DEC2] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-[#5B2E19]/70">Demographic Distribution</p>
                <h3 className="text-base sm:text-lg font-black text-[#3D1E10] tracking-tight">
                  Beneficiaries by Pillar
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#FAF6EE] border border-[#E8DEC2] text-[11px] font-black text-[#5B2E19]">
                4 Pillars
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-2">
              <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#FAF6EE" strokeWidth="16" />
                  {/* Education: 42% = 100.27 of 238.76 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#0047BA"
                    strokeWidth="16"
                    strokeDasharray="100.27 238.76"
                    strokeDashoffset="0"
                  />
                  {/* Health: 33% = 78.79 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#338C26"
                    strokeWidth="16"
                    strokeDasharray="78.79 238.76"
                    strokeDashoffset="-100.27"
                  />
                  {/* Humanitarian: 15% = 35.81 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#5B2E19"
                    strokeWidth="16"
                    strokeDasharray="35.81 238.76"
                    strokeDashoffset="-179.06"
                  />
                  {/* Economic: 10% = 23.88 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#FCCD37"
                    strokeWidth="16"
                    strokeDasharray="23.88 238.76"
                    strokeDashoffset="-214.87"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-lg sm:text-xl font-black text-[#3D1E10] leading-tight">12,480</span>
                  <span className="text-[10px] font-bold text-[#5B2E19]/60 uppercase tracking-wider">Total Active</span>
                </div>
              </div>

              <div className="space-y-3 w-full sm:w-auto">
                <div className="flex items-start gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#0047BA] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#3D1E10] leading-tight">Education & Opportunity</p>
                    <p className="text-xs font-extrabold text-[#0047BA] mt-0.5">5,240 <span className="text-[#5B2E19]/50 font-medium">(42%)</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#338C26] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#3D1E10] leading-tight">Health & Wellbeing</p>
                    <p className="text-xs font-extrabold text-[#338C26] mt-0.5">4,120 <span className="text-[#5B2E19]/50 font-medium">(33%)</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#5B2E19] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#3D1E10] leading-tight">Humanitarian Support</p>
                    <p className="text-xs font-extrabold text-[#5B2E19] mt-0.5">1,870 <span className="text-[#5B2E19]/50 font-medium">(15%)</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#FCCD37] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#3D1E10] leading-tight">Economic Empowerment</p>
                    <p className="text-xs font-extrabold text-[#8B5E00] mt-0.5">1,250 <span className="text-[#5B2E19]/50 font-medium">(10%)</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-[#E8DEC2] flex items-center justify-between text-[11px] text-[#5B2E19]/70">
            <span>Verified field registrations</span>
            {onNavigateToBeneficiaries && (
              <button
                type="button"
                onClick={onNavigateToBeneficiaries}
                className="text-[#5B2E19] font-bold hover:underline cursor-pointer"
              >
                Open Register →
              </button>
            )}
          </div>
        </div>

        {/* Monthly Donations Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DEC2] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-[#5B2E19]/70">Inflow Trend</p>
                <h3 className="text-base sm:text-lg font-black text-[#3D1E10] tracking-tight">
                  Monthly Donations & Endowments (₦)
                </h3>
              </div>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-[#E8DEC2] bg-[#FAF6EE] text-xs font-bold text-[#5B2E19] cursor-pointer focus:outline-none focus:border-[#5B2E19]"
              >
                <option value="2026">FY 2026</option>
                <option value="2025">FY 2025</option>
              </select>
            </div>

            <div className="relative h-56 w-full pt-4">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] font-bold text-[#5B2E19]/40">
                <div className="flex items-center gap-2">
                  <span className="w-8 text-right">₦5.0M</span>
                  <div className="flex-1 border-b border-dashed border-[#E8DEC2]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-right">₦4.0M</span>
                  <div className="flex-1 border-b border-dashed border-[#E8DEC2]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-right">₦3.0M</span>
                  <div className="flex-1 border-b border-dashed border-[#E8DEC2]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-right">₦2.0M</span>
                  <div className="flex-1 border-b border-dashed border-[#E8DEC2]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-right">₦1.0M</span>
                  <div className="flex-1 border-b border-dashed border-[#E8DEC2]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-right">₦0</span>
                  <div className="flex-1 border-b border-[#E8DEC2]" />
                </div>
              </div>

              <div className="absolute inset-0 pl-12 flex items-end justify-between gap-1 sm:gap-2 pb-6">
                {activeMonthlyData.map((d, index) => {
                  const heightPercent = (d.value / maxBarValue) * 100;
                  const isHovered = hoveredBar === index;
                  return (
                    <div
                      key={d.month}
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                      className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                    >
                      {isHovered && (
                        <div className="absolute -top-7 bg-[#3D1E10] text-[#FAF6EE] font-bold text-[10px] px-2 py-0.5 rounded shadow z-10 whitespace-nowrap">
                          {d.month}: {d.label}
                        </div>
                      )}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`
                          w-full max-w-[28px] rounded-t-md transition-all duration-300
                          ${
                            isHovered
                              ? 'bg-[#FCCD37] scale-y-105 shadow-sm'
                              : 'bg-gradient-to-t from-[#5B2E19] to-[#8C4626]'
                          }
                        `}
                      />
                      <span className="absolute -bottom-5 text-[10px] font-bold text-[#5B2E19]/70">
                        {d.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-[#E8DEC2] flex items-center justify-between text-[11px] text-[#5B2E19]/70">
            <span>Zenith Bank & Flutterwave gateway synced</span>
            <a
              href="/api/donations"
              target="_blank"
              rel="noreferrer"
              className="text-[#5B2E19] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Export Audit Ledger</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewSection;
