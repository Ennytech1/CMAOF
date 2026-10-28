import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Users,
  UserPlus,
  Activity,
  Award,
  Sparkles,
  FileText,
  Bell,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Calendar,
  ChevronDown,
  TrendingUp,
  MapPin,
  ClipboardList,
} from 'lucide-react';

const RECENT_REGISTRATIONS = [
  {
    id: 'B-2026-001',
    name: 'Aisha Mohammed',
    pillar: 'Education',
    location: 'Kano',
    type: 'Student',
    date: '06 Oct 2026',
    status: 'Assessment',
    statusClass: 'bg-amber-100 text-amber-800 font-bold',
    pillarClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
  },
  {
    id: 'B-2026-002',
    name: 'Chinedu Okafor',
    pillar: 'Health',
    location: 'Lagos',
    type: 'Individual',
    date: '06 Oct 2026',
    status: 'New',
    statusClass: 'bg-sky-100 text-sky-800 font-bold',
    pillarClass: 'bg-rose-50 text-rose-600 border border-rose-200/60',
  },
  {
    id: 'B-2026-003',
    name: 'Fatima Yusuf',
    pillar: 'Community',
    location: 'Kaduna',
    type: 'Household',
    date: '05 Oct 2026',
    status: 'Active',
    statusClass: 'bg-emerald-100 text-emerald-800 font-bold',
    pillarClass: 'bg-amber-50 text-amber-700 border border-amber-200/60',
  },
  {
    id: 'B-2026-004',
    name: 'Ibrahim Musa',
    pillar: 'Health',
    location: 'Oyo',
    type: 'Individual',
    date: '05 Oct 2026',
    status: 'Assessment',
    statusClass: 'bg-amber-100 text-amber-800 font-bold',
    pillarClass: 'bg-rose-50 text-rose-600 border border-rose-200/60',
  },
  {
    id: 'B-2026-005',
    name: 'Grace Eze',
    pillar: 'Education',
    location: 'Enugu',
    type: 'Student',
    date: '04 Oct 2026',
    status: 'Approved',
    statusClass: 'bg-teal-100 text-teal-800 font-bold',
    pillarClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
  },
];

const CASE_STATUS_BARS = [
  { label: 'New', count: 320, color: 'bg-rose-500', height: 18 },
  { label: 'Assessment', count: 450, color: 'bg-orange-500', height: 26 },
  { label: 'Approved', count: 680, color: 'bg-amber-500', height: 38 },
  { label: 'Active', count: 3260, color: 'bg-[#06402B]', height: 100 },
  { label: 'Follow-up', count: 1540, color: 'bg-sky-500', height: 58 },
  { label: 'Outcome', count: 2180, color: 'bg-[#0B2D6E]', height: 74 },
  { label: 'Closed', count: 2050, color: 'bg-slate-500', height: 70 },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const REGISTRATIONS_DATA = [450, 680, 890, 1100, 1050, 1420, 1380, 1450, 1480, 1390, 1480, 1620];
const INTERVENTIONS_DATA = [210, 340, 520, 610, 780, 950, 890, 980, 1050, 1080, 1150, 1220];

const BeneficiaryManagementDashboardSection = () => {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState('Jan 2025 - Dec 2026');
  const [selectedStateFilter, setSelectedStateFilter] = useState('All States');

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER (Orange Accent Bar + Title & Subtitle + Date Dropdown)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <span className="w-1.5 h-8 sm:h-9 rounded-full bg-[#f97316] mt-0.5 shrink-0" />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight">
              Beneficiary Management Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Identify. Understand. Support. Follow Up. Measure. Learn.
            </p>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-xs focus:outline-none focus:border-[#06402B] cursor-pointer"
          >
            <option value="Jan 2025 - Dec 2026">Jan 2025 - Dec 2026</option>
            <option value="2026 Fiscal Year">2026 Fiscal Year</option>
            <option value="Last 12 Months">Last 12 Months</option>
          </select>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. EXECUTIVE KPI METRIC CARDS (4 Spacious, Actionable Cards)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Beneficiaries */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-[#06402B] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <Users size={20} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">
              <TrendingUp size={12} />
              +18.4% YoY
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Beneficiaries
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              12,480
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              Verified individuals across 14 LGAs
            </p>
          </div>
        </div>

        {/* Card 2: Active Enrollment */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <Activity size={20} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-100">
              Ongoing Care
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Beneficiaries
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              3,260
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
              Receiving continuous aid & monitoring
            </p>
          </div>
        </div>

        {/* Card 3: New Registrations */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <UserPlus size={20} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-100">
              <TrendingUp size={12} />
              +22% intake
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              New Registrations
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              1,245
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              Newly enrolled in current fiscal cycle
            </p>
          </div>
        </div>

        {/* Card 4: Completed Interventions */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <Award size={20} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">
              94.2% Success
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Completed Interventions
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              4,820
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
              Graduated to self-reliance & stability
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MIDDLE ROW (3 PANELS): DONUT + MAP + MONTHLY TREND LINE
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Panel 1 (4 Cols): Beneficiaries by Pillar */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-4 rounded-full bg-[#f97316]" />
              <h3 className="text-sm sm:text-base font-black text-[#0B2D6E]">
                Beneficiaries by Pillar
              </h3>
            </div>

            <div className="flex flex-col items-center justify-center pt-1">
              <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="15" />
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
                  <span className="text-lg font-black text-[#0B2D6E] leading-tight">12,480</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
                </div>
              </div>

              <div className="w-full space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                    <span className="text-slate-600 font-semibold">Education & Human Capital</span>
                  </div>
                  <span className="font-bold text-[#0B2D6E]">5,240 <span className="text-slate-400 font-normal">(42%)</span></span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                    <span className="text-slate-600 font-semibold">Health & Well-being</span>
                  </div>
                  <span className="font-bold text-[#0B2D6E]">4,120 <span className="text-slate-400 font-normal">(33%)</span></span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#06402B]" />
                    <span className="text-slate-600 font-semibold">Community Resilience</span>
                  </div>
                  <span className="font-bold text-[#0B2D6E]">3,120 <span className="text-slate-400 font-normal">(25%)</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2 (4 Cols): Beneficiaries by Location (Map) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-[#f97316]" />
                <h3 className="text-sm sm:text-base font-black text-[#0B2D6E]">
                  Beneficiaries by Location
                </h3>
              </div>
              <select
                value={selectedStateFilter}
                onChange={(e) => setSelectedStateFilter(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-700 cursor-pointer"
              >
                <option value="All States">All States</option>
                <option value="Lagos">Lagos</option>
                <option value="Kano">Kano</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Oyo">Oyo</option>
              </select>
            </div>

            <div className="relative min-h-[190px] flex items-center justify-center p-2 rounded-2xl bg-slate-50/70 border border-slate-100">
              <img
                src="/images/nigeria_geographic_map.jpg"
                alt="Nigeria Geographic Reach"
                className="w-full h-auto max-h-[180px] object-contain opacity-90"
              />
            </div>

            {/* Legend */}
            <div className="flex items-center justify-around pt-3 text-[11px] font-bold text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#06402B]" />
                <span>High (500+)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#10b981]" />
                <span>Medium (100–500)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#a7f3d0]" />
                <span>Low (&lt;100)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3 (4 Cols): Monthly Trend (Line/Comparison) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-[#f97316]" />
                <h3 className="text-sm sm:text-base font-black text-[#0B2D6E]">
                  Monthly Trend
                </h3>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-bold">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                  <span>Registrations</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span>Interventions</span>
                </div>
              </div>
            </div>

            {/* Simulated Line Chart Canvas with SVG */}
            <div className="relative h-44 w-full pt-3">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120">
                {/* Horizontal Gridlines */}
                <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="300" y2="80" stroke="#f1f5f9" strokeDasharray="3 3" />
                <line x1="0" y1="110" x2="300" y2="110" stroke="#e2e8f0" />

                {/* Registrations Green Path */}
                <path
                  d="M 10 90 Q 40 75, 70 65 T 130 50 T 190 35 T 250 40 T 290 25"
                  fill="none"
                  stroke="#06402B"
                  strokeWidth="2.5"
                />
                {/* Registrations Dots */}
                <circle cx="10" cy="90" r="3" fill="#06402B" />
                <circle cx="70" cy="65" r="3" fill="#06402B" />
                <circle cx="130" cy="50" r="3" fill="#06402B" />
                <circle cx="190" cy="35" r="3" fill="#06402B" />
                <circle cx="250" cy="40" r="3" fill="#06402B" />
                <circle cx="290" cy="25" r="3" fill="#06402B" />

                {/* Interventions Orange Path */}
                <path
                  d="M 10 105 Q 40 95, 70 85 T 130 75 T 190 60 T 250 55 T 290 45"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2.5"
                />
                {/* Interventions Dots */}
                <circle cx="10" cy="105" r="3" fill="#f97316" />
                <circle cx="70" cy="85" r="3" fill="#f97316" />
                <circle cx="130" cy="75" r="3" fill="#f97316" />
                <circle cx="190" cy="60" r="3" fill="#f97316" />
                <circle cx="250" cy="55" r="3" fill="#f97316" />
                <circle cx="290" cy="45" r="3" fill="#f97316" />
              </svg>

              <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold mt-1 px-1">
                {MONTHS.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM ROW: RECENT REGISTRATIONS TABLE + CASE STATUS OVERVIEW
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Left Card (7 Cols): Recent Registrations Table */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-[#f97316]" />
                <h3 className="text-sm sm:text-base font-black text-[#0B2D6E]">
                  Recent Registrations
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate('/admin/beneficiaries/directory')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                    <th className="pb-2">ID</th>
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Pillar</th>
                    <th className="pb-2">Location</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECENT_REGISTRATIONS.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => navigate(`/admin/beneficiaries/${r.id}`)}
                      className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <td className="py-2.5 font-mono font-bold text-slate-600 group-hover:text-[#06402B]">
                        {r.id}
                      </td>
                      <td className="py-2.5 font-bold text-slate-900">
                        {r.name}
                      </td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] ${r.pillarClass}`}>
                          {r.pillar}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-600">{r.location}</td>
                      <td className="py-2.5 text-slate-500">{r.type}</td>
                      <td className="py-2.5 text-slate-500 whitespace-nowrap">{r.date}</td>
                      <td className="py-2.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] ${r.statusClass}`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Card (5 Cols): Case Status Overview Bar Chart */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-4 rounded-full bg-[#f97316]" />
              <h3 className="text-sm sm:text-base font-black text-[#0B2D6E]">
                Case Status Overview
              </h3>
            </div>

            {/* Vertical Bar Chart matching screenshot */}
            <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 px-1">
              {CASE_STATUS_BARS.map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
                  <span className="text-[10px] font-black text-slate-700 mb-1 group-hover:scale-110 transition-transform">
                    {bar.count >= 1000 ? bar.count.toLocaleString('en-US') : bar.count}
                  </span>
                  <div
                    style={{ height: `${bar.height}%` }}
                    className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${bar.color}`}
                  />
                  <span className="text-[9px] font-bold text-slate-500 mt-1.5 truncate max-w-[42px] text-center">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Tallest: Active Cases (3,260)</span>
            <span className="text-emerald-700 font-bold">Health & Education leading</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryManagementDashboardSection;
