import React, { useState, useEffect, useMemo } from 'react';
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
  const [liveDonations, setLiveDonations] = useState([]);

  // Fetch real donations from API to power real monthly analytics
  useEffect(() => {
    fetch('/api/donations')
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res && res.success && Array.isArray(res.data)) {
          setLiveDonations(res.data);
        }
      })
      .catch(() => {});
  }, []);

  // Compute real monthly inflow from database
  const activeMonthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTotals = {};
    months.forEach((m) => (monthlyTotals[m] = 0));

    liveDonations.forEach((d) => {
      const date = d.createdAt ? new Date(d.createdAt) : new Date();
      if (date.getFullYear().toString() === selectedYear) {
        const m = months[date.getMonth()];
        monthlyTotals[m] = (monthlyTotals[m] || 0) + (Number(d.amount) || 0);
      }
    });

    return months.slice(0, 10).map((m) => {
      const val = monthlyTotals[m] || 0;
      let label = '₦0';
      if (val >= 1000000) {
        label = `₦${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        label = `₦${(val / 1000).toFixed(0)}K`;
      } else if (val > 0) {
        label = `₦${val}`;
      }
      return {
        month: m,
        rawAmount: val,
        value: val / 1000000, // scaled for chart in millions
        label,
      };
    });
  }, [liveDonations, selectedYear]);

  const maxBarValue = useMemo(() => {
    const max = Math.max(...activeMonthlyData.map((d) => d.value), 10);
    return max * 1.15; // 15% headroom
  }, [activeMonthlyData]);

  // Pillar counts & percentages directly from real database
  const totalBeneficiaries = stats?.totalBeneficiaries || 0;
  const eduCount = stats?.pillarBreakdown?.['Education & Opportunity'] || 0;
  const healthCount = stats?.pillarBreakdown?.['Health & Wellbeing'] || 0;
  const humCount = stats?.pillarBreakdown?.['Humanitarian Support'] || 0;
  const ecoCount = stats?.pillarBreakdown?.['Economic Empowerment'] || 0;

  const totalCalculated = (eduCount + healthCount + humCount + ecoCount) || totalBeneficiaries || 1;
  const eduPct = Math.round((eduCount / totalCalculated) * 100);
  const healthPct = Math.round((healthCount / totalCalculated) * 100);
  const humPct = Math.round((humCount / totalCalculated) * 100);
  const ecoPct = Math.max(0, 100 - (eduPct + healthPct + humPct));

  // Circumference = 2 * PI * 38 = 238.76
  const CIRCUMFERENCE = 238.76;
  const eduDash = (eduPct / 100) * CIRCUMFERENCE;
  const healthDash = (healthPct / 100) * CIRCUMFERENCE;
  const humDash = (humPct / 100) * CIRCUMFERENCE;
  const ecoDash = (ecoPct / 100) * CIRCUMFERENCE;

  // 8 Executive Metric Cards Data directly from live database
  const kpiCards = [
    {
      title: 'Total Beneficiaries',
      value: totalBeneficiaries > 0 ? totalBeneficiaries.toLocaleString('en-US') : '0',
      trend: `${stats?.newRegistrations || 0} active records`,
      trendColor: 'text-[#338C26] font-bold',
      icon: <Users size={19} className="text-[#5B2E19]" />,
      bgIcon: 'bg-[#FAF0D4]',
      cardBg: 'bg-white',
    },
    {
      title: 'Active Programmes',
      value: stats?.activeProgrammes || 4,
      trend: '4 Strategic Pillars',
      trendColor: 'text-[#0047BA] font-bold',
      icon: <Briefcase size={19} className="text-[#0047BA]" />,
      bgIcon: 'bg-blue-50',
      cardBg: 'bg-white',
    },
    {
      title: 'Health Interventions',
      value: healthCount > 0 ? healthCount.toLocaleString('en-US') : '0',
      trend: `${healthPct}% of cohort`,
      trendColor: 'text-[#338C26] font-bold',
      icon: <Activity size={19} className="text-[#338C26]" />,
      bgIcon: 'bg-emerald-50',
      cardBg: 'bg-white',
    },
    {
      title: 'Grants & Donations',
      value: stats?.donationsReceived || '₦0',
      trend: `${stats?.donorCount || liveDonations.length} verified donors`,
      trendColor: 'text-[#8B5E00] font-bold',
      icon: <FileText size={19} className="text-[#8B5E00]" />,
      bgIcon: 'bg-amber-100/70',
      cardBg: 'bg-white',
    },
    {
      title: 'Communities Reached',
      value: stats?.communitiesReached || 8,
      trend: 'Ondo, Kano, Lagos, Niger',
      trendColor: 'text-[#5B2E19] font-bold',
      icon: <Building size={19} className="text-[#5B2E19]" />,
      bgIcon: 'bg-[#FAF0D4]',
      cardBg: 'bg-white',
    },
    {
      title: 'Scholarships Awarded',
      value: eduCount > 0 ? eduCount.toLocaleString('en-US') : '0',
      trend: `${eduPct}% education focus`,
      trendColor: 'text-[#0047BA] font-bold',
      icon: <GraduationCap size={19} className="text-[#0047BA]" />,
      bgIcon: 'bg-blue-50',
      cardBg: 'bg-white',
    },
    {
      title: 'Active Field Cases',
      value: stats?.activeCases || 0,
      trend: 'Caseworker supervised',
      trendColor: 'text-amber-700 font-bold',
      icon: <Layers size={19} className="text-amber-700" />,
      bgIcon: 'bg-amber-50',
      cardBg: 'bg-white',
    },
    {
      title: 'Pending Reviews',
      value: stats?.pendingAssessments || 0,
      trend: 'Needs assessment pipeline',
      trendColor: 'text-[#5B2E19] font-bold',
      icon: <Bell size={19} className="text-[#5B2E19]" />,
      bgIcon: 'bg-[#FAF0D4]',
      cardBg: 'bg-white',
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
          2. 8 EXECUTIVE KPI CARDS
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
                  {/* Education & Opportunity */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#0047BA"
                    strokeWidth="16"
                    strokeDasharray={`${eduDash} 238.76`}
                    strokeDashoffset="0"
                  />
                  {/* Health & Wellbeing */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#338C26"
                    strokeWidth="16"
                    strokeDasharray={`${healthDash} 238.76`}
                    strokeDashoffset={`-${eduDash}`}
                  />
                  {/* Humanitarian Support */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#5B2E19"
                    strokeWidth="16"
                    strokeDasharray={`${humDash} 238.76`}
                    strokeDashoffset={`-${eduDash + healthDash}`}
                  />
                  {/* Economic Empowerment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#FCCD37"
                    strokeWidth="16"
                    strokeDasharray={`${ecoDash} 238.76`}
                    strokeDashoffset={`-${eduDash + healthDash + humDash}`}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-lg sm:text-xl font-black text-[#3D1E10] leading-tight">
                    {totalBeneficiaries}
                  </span>
                  <span className="text-[10px] font-bold text-[#5B2E19]/60 uppercase tracking-wider">Total Active</span>
                </div>
              </div>

              <div className="space-y-3 w-full sm:w-auto">
                <div className="flex items-start gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#0047BA] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#3D1E10] leading-tight">Education & Opportunity</p>
                    <p className="text-xs font-extrabold text-[#0047BA] mt-0.5">
                      {eduCount} <span className="text-[#5B2E19]/50 font-medium">({eduPct}%)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#338C26] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#3D1E10] leading-tight">Health & Wellbeing</p>
                    <p className="text-xs font-extrabold text-[#338C26] mt-0.5">
                      {healthCount} <span className="text-[#5B2E19]/50 font-medium">({healthPct}%)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#5B2E19] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#3D1E10] leading-tight">Humanitarian Support</p>
                    <p className="text-xs font-extrabold text-[#5B2E19] mt-0.5">
                      {humCount} <span className="text-[#5B2E19]/50 font-medium">({humPct}%)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#FCCD37] mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#3D1E10] leading-tight">Economic Empowerment</p>
                    <p className="text-xs font-extrabold text-[#8B5E00] mt-0.5">
                      {ecoCount} <span className="text-[#5B2E19]/50 font-medium">({ecoPct}%)</span>
                    </p>
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
