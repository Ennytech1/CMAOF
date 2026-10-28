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
} from 'lucide-react';

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

  // 8 Metric Cards Data matching reference image
  const kpiCards = [
    {
      title: 'Total Beneficiaries',
      value: stats?.totalBeneficiaries?.toLocaleString('en-US') || '12,480',
      trend: '+ 12% this year',
      trendColor: 'text-emerald-700 font-bold',
      icon: <Users size={20} className="text-emerald-700" />,
      bgIcon: 'bg-emerald-100',
    },
    {
      title: 'Active Programmes',
      value: stats?.activeProgrammes || 28,
      trend: '+ 4 new',
      trendColor: 'text-emerald-700 font-bold',
      icon: <Briefcase size={20} className="text-blue-600" />,
      bgIcon: 'bg-blue-100',
    },
    {
      title: 'Medical Interventions',
      value: stats?.medicalInterventions?.toLocaleString('en-US') || '8,520',
      trend: '+ 18%',
      trendColor: 'text-emerald-700 font-bold',
      icon: <Heart size={20} className="text-rose-500 fill-rose-500" />,
      bgIcon: 'bg-rose-100',
    },
    {
      title: 'Donations Received',
      value: stats?.donationsReceived || '₦245.3M',
      trend: '+ 21% this year',
      trendColor: 'text-emerald-700 font-bold',
      icon: <FileText size={20} className="text-amber-600" />,
      bgIcon: 'bg-amber-100',
    },
    {
      title: 'Communities Reached',
      value: stats?.communitiesReached || 86,
      trend: '+ 6 this year',
      trendColor: 'text-emerald-700 font-bold',
      icon: <Users size={20} className="text-indigo-700" />,
      bgIcon: 'bg-indigo-100',
    },
    {
      title: 'Scholarships',
      value: stats?.scholarships?.toLocaleString('en-US') || '2,340',
      trend: '+ 15%',
      trendColor: 'text-emerald-700 font-bold',
      icon: <GraduationCap size={20} className="text-emerald-700" />,
      bgIcon: 'bg-emerald-100',
    },
    {
      title: 'Open Cases',
      value: stats?.openCases || 312,
      trend: '+ 8%',
      trendColor: 'text-emerald-700 font-bold',
      icon: <FileText size={20} className="text-orange-600" />,
      bgIcon: 'bg-orange-100',
    },
    {
      title: 'Pending Approvals',
      value: stats?.pendingApprovals || 7,
      trend: 'Requires action',
      trendColor: 'text-rose-600 font-black',
      icon: <Bell size={20} className="text-amber-600 fill-amber-600" />,
      bgIcon: 'bg-amber-100',
    },
  ];

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* Welcome Headline & Date Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-[1.75rem] font-black text-[#0B2D6E] tracking-tight">
            Welcome back, Abiola
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Here's what's happening at CMAOF today.
          </p>
        </div>

        <div className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-2">
          <Calendar size={14} className="text-slate-400" />
          <span>Monday, 6 Oct 2026</span>
        </div>
      </div>

      {/* 8 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
        {kpiCards.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow duration-200 flex items-start gap-3.5"
          >
            <div className={`w-11 h-11 rounded-full ${kpi.bgIcon} flex items-center justify-center shrink-0`}>
              {kpi.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight truncate">
                {kpi.title}
              </p>
              <p className="text-xl sm:text-[1.35rem] font-black text-[#0B2D6E] tracking-tight leading-tight mt-0.5">
                {kpi.value}
              </p>
              <p className={`text-[11px] mt-1 ${kpi.trendColor}`}>
                {kpi.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Two Big Analytics Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Donut Chart: Beneficiaries by Pillar */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight mb-4">
              Beneficiaries by Pillar
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-2">
              <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="16" />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="16"
                    strokeDasharray="100.2 238.76"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="16"
                    strokeDasharray="78.79 238.76"
                    strokeDashoffset="-100.2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#06402B"
                    strokeWidth="16"
                    strokeDasharray="59.69 238.76"
                    strokeDashoffset="-178.99"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-lg sm:text-xl font-black text-[#0B2D6E] leading-tight">12,480</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
                </div>
              </div>

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
            <span>Field beneficiary records</span>
            {onNavigateToBeneficiaries && (
              <button
                type="button"
                onClick={onNavigateToBeneficiaries}
                className="text-[#06402B] font-bold hover:underline cursor-pointer"
              >
                Open Directory →
              </button>
            )}
          </div>
        </div>

        {/* Monthly Donations Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight">
                Monthly Donations (₦)
              </h3>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer focus:outline-none focus:border-[#06402B]"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
            </div>

            <div className="relative h-56 w-full pt-4">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] font-bold text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-8 text-right">5000</span>
                  <div className="flex-1 border-b border-dashed border-slate-200" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-right">4000</span>
                  <div className="flex-1 border-b border-dashed border-slate-200" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-right">3000</span>
                  <div className="flex-1 border-b border-dashed border-slate-200" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-right">2000</span>
                  <div className="flex-1 border-b border-dashed border-slate-200" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-right">1000</span>
                  <div className="flex-1 border-b border-dashed border-slate-200" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-right">0</span>
                  <div className="flex-1 border-b border-slate-300" />
                </div>
              </div>

              <div className="absolute inset-0 pl-10 flex items-end justify-between gap-1 sm:gap-2 pb-6">
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
                        <div className="absolute -top-7 bg-slate-900 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow z-10 whitespace-nowrap">
                          {d.month}: {d.label}
                        </div>
                      )}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`
                          w-full max-w-[28px] rounded-t-md transition-all duration-300
                          ${
                            isHovered
                              ? 'bg-[#14634C] scale-y-105'
                              : 'bg-gradient-to-t from-[#06402B] to-[#0D5C3E]'
                          }
                        `}
                      />
                      <span className="absolute -bottom-5 text-[10px] font-bold text-slate-500">
                        {d.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Zenith Bank Plc records</span>
            <a
              href="/api/donations"
              target="_blank"
              rel="noreferrer"
              className="text-[#06402B] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Export Report</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewSection;
