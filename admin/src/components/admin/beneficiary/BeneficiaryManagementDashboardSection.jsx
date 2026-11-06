import React, { useState, useEffect, useMemo } from 'react';
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
  FileCheck2,
  GitBranch,
  Eye,
} from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const BeneficiaryManagementDashboardSection = () => {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState('2026 Fiscal Year');
  const [selectedStateFilter, setSelectedStateFilter] = useState('All States');
  const [liveBeneficiaries, setLiveBeneficiaries] = useState([]);
  const [liveStats, setLiveStats] = useState(null);

  // Fetch real database records and stats
  useEffect(() => {
    fetch('/api/beneficiaries?limit=10')
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res && res.success && Array.isArray(res.data)) {
          setLiveBeneficiaries(res.data);
        }
      })
      .catch(() => {});

    fetch('/api/beneficiaries/stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res && res.success && res.data) {
          setLiveStats(res.data);
        }
      })
      .catch(() => {});
  }, []);

  // Compute real case status distribution
  const caseStatusBars = useMemo(() => {
    const counts = {
      New: 0,
      Assessment: 0,
      Approved: 0,
      Active: 0,
      'Follow-up': 0,
      Outcome: 0,
      Closed: 0,
    };

    liveBeneficiaries.forEach((b) => {
      const s = b.status || b.caseTag || 'Active';
      if (counts[s] !== undefined) counts[s]++;
      else if (s.toLowerCase().includes('assess')) counts.Assessment++;
      else counts.Active++;
    });

    const max = Math.max(...Object.values(counts), 1);

    return [
      { label: 'New', count: counts.New, color: 'bg-rose-500', height: Math.max(15, (counts.New / max) * 100) },
      { label: 'Assessment', count: counts.Assessment, color: 'bg-orange-500', height: Math.max(15, (counts.Assessment / max) * 100) },
      { label: 'Approved', count: counts.Approved, color: 'bg-amber-500', height: Math.max(15, (counts.Approved / max) * 100) },
      { label: 'Active', count: counts.Active, color: 'bg-[#5B2E19]', height: Math.max(25, (counts.Active / max) * 100) },
      { label: 'Follow-up', count: counts['Follow-up'], color: 'bg-sky-500', height: Math.max(15, (counts['Follow-up'] / max) * 100) },
      { label: 'Outcome', count: counts.Outcome, color: 'bg-[#3D1E10]', height: Math.max(15, (counts.Outcome / max) * 100) },
      { label: 'Closed', count: counts.Closed, color: 'bg-slate-500', height: Math.max(15, (counts.Closed / max) * 100) },
    ];
  }, [liveBeneficiaries]);

  // Compute real pillar counts
  const pillarCounts = useMemo(() => {
    const counts = {
      Education: 0,
      Health: 0,
      Humanitarian: 0,
      Economic: 0,
    };
    liveBeneficiaries.forEach((b) => {
      const p = (b.pillar || '').toLowerCase();
      if (p.includes('edu')) counts.Education++;
      else if (p.includes('heal')) counts.Health++;
      else if (p.includes('hum') || p.includes('comm')) counts.Humanitarian++;
      else if (p.includes('eco') || p.includes('emp')) counts.Economic++;
      else counts.Education++;
    });
    return counts;
  }, [liveBeneficiaries]);

  const getPillarBadge = (pillar = '') => {
    const p = pillar.toLowerCase();
    if (p.includes('edu')) return 'bg-blue-50 text-blue-700 border border-blue-200';
    if (p.includes('heal')) return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (p.includes('hum') || p.includes('comm')) return 'bg-amber-50 text-[#5B2E19] border border-amber-200';
    return 'bg-amber-100 text-amber-800 border border-amber-300';
  };

  const getStatusBadge = (status = '') => {
    const s = status.toLowerCase();
    if (s.includes('active') || s.includes('enrolled')) return 'bg-emerald-50 text-emerald-800 border border-emerald-200';
    if (s.includes('assess')) return 'bg-amber-50 text-amber-800 border border-amber-200';
    if (s.includes('closed') || s.includes('grad')) return 'bg-purple-50 text-purple-800 border border-purple-200';
    return 'bg-sky-50 text-sky-800 border border-sky-200';
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER (Orange Accent Bar + Title & Subtitle + Date Dropdown)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <span className="w-1.5 h-8 sm:h-9 rounded-full bg-[#f97316] mt-0.5 shrink-0" />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#3D1E10] tracking-tight">
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
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-xs focus:outline-none focus:border-[#5B2E19] cursor-pointer"
          >
            <option value="Jan 2025 - Dec 2026">Jan 2025 - Dec 2026</option>
            <option value="2026 Fiscal Year">2026 Fiscal Year</option>
            <option value="Last 12 Months">Last 12 Months</option>
          </select>
        </div>
      </div>

      {/* Quick Beneficiary Hub Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#5B2E19] text-white shadow-xs cursor-default"
        >
          Overview Dashboard
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin/beneficiaries/directory')}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <Users size={13} className="text-emerald-700" />
          <span>Beneficiary Directory</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin/beneficiaries/assessments')}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-amber-50/70 text-slate-700 hover:text-amber-800 border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <FileCheck2 size={13} className="text-amber-600" />
          <span>Needs Assessment Hub</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin/beneficiaries/cases')}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-sky-50/70 text-slate-700 hover:text-[#3D1E10] border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <GitBranch size={13} className="text-[#3D1E10]" />
          <span>Case Management & Timelines</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. EXECUTIVE KPI METRIC CARDS (4 Spacious, Actionable Cards)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Beneficiaries */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-[#5B2E19] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <Users size={20} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">
              <TrendingUp size={12} />
              Live DB
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Beneficiaries
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#3D1E10] tracking-tight mt-1">
              {(liveStats?.totalBeneficiaries ?? liveBeneficiaries.length).toLocaleString('en-US')}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              Verified individuals across Nigerian States
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
            <p className="text-2xl sm:text-3xl font-black text-[#3D1E10] tracking-tight mt-1">
              {(liveStats?.activeCases ?? liveBeneficiaries.filter(b => b.status === 'Active' || b.caseTag === 'Active').length).toLocaleString('en-US')}
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
              Intake
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              New Registrations
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#3D1E10] tracking-tight mt-1">
              {(liveStats?.newRegistrations ?? liveBeneficiaries.length).toLocaleString('en-US')}
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
              100% Verified
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Completed Interventions
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#3D1E10] tracking-tight mt-1">
              {(liveStats?.completedInterventions ?? liveBeneficiaries.length).toLocaleString('en-US')}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
              Graduated or active support milestones
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
              <h3 className="text-sm sm:text-base font-black text-[#3D1E10]">
                Beneficiaries by Pillar
              </h3>
            </div>

            <div className="flex flex-col items-center justify-center pt-1">
              <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                {(() => {
                  const total = liveBeneficiaries.length || 1;
                  const c1 = (pillarCounts.Education / total) * 238.76;
                  const c2 = (pillarCounts.Health / total) * 238.76;
                  const c3 = (pillarCounts.Humanitarian / total) * 238.76;
                  const c4 = (pillarCounts.Economic / total) * 238.76;

                  return (
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="15" />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#0047BA"
                        strokeWidth="15"
                        strokeDasharray={`${c1} 238.76`}
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#338C26"
                        strokeWidth="15"
                        strokeDasharray={`${c2} 238.76`}
                        strokeDashoffset={`${-c1}`}
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#5B2E19"
                        strokeWidth="15"
                        strokeDasharray={`${c3} 238.76`}
                        strokeDashoffset={`${-(c1 + c2)}`}
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#FCCD37"
                        strokeWidth="15"
                        strokeDasharray={`${c4} 238.76`}
                        strokeDashoffset={`${-(c1 + c2 + c3)}`}
                      />
                    </svg>
                  );
                })()}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-lg font-black text-[#3D1E10] leading-tight">
                    {(liveStats?.totalBeneficiaries ?? liveBeneficiaries.length).toLocaleString('en-US')}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
                </div>
              </div>

              <div className="w-full space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0047BA]" />
                    <span className="text-slate-600 font-semibold">Education & Opportunity</span>
                  </div>
                  <span className="font-bold text-[#3D1E10]">
                    {pillarCounts.Education}{' '}
                    <span className="text-slate-400 font-normal">
                      ({Math.round((pillarCounts.Education / (liveBeneficiaries.length || 1)) * 100)}%)
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#338C26]" />
                    <span className="text-slate-600 font-semibold">Health & Wellbeing</span>
                  </div>
                  <span className="font-bold text-[#3D1E10]">
                    {pillarCounts.Health}{' '}
                    <span className="text-slate-400 font-normal">
                      ({Math.round((pillarCounts.Health / (liveBeneficiaries.length || 1)) * 100)}%)
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5B2E19]" />
                    <span className="text-slate-600 font-semibold">Humanitarian Support</span>
                  </div>
                  <span className="font-bold text-[#3D1E10]">
                    {pillarCounts.Humanitarian}{' '}
                    <span className="text-slate-400 font-normal">
                      ({Math.round((pillarCounts.Humanitarian / (liveBeneficiaries.length || 1)) * 100)}%)
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FCCD37]" />
                    <span className="text-slate-600 font-semibold">Economic Empowerment</span>
                  </div>
                  <span className="font-bold text-[#3D1E10]">
                    {pillarCounts.Economic}{' '}
                    <span className="text-slate-400 font-normal">
                      ({Math.round((pillarCounts.Economic / (liveBeneficiaries.length || 1)) * 100)}%)
                    </span>
                  </span>
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
                <h3 className="text-sm sm:text-base font-black text-[#3D1E10]">
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
                <span className="w-3 h-3 rounded-full bg-[#5B2E19]" />
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
                <h3 className="text-sm sm:text-base font-black text-[#3D1E10]">
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
                  stroke="#5B2E19"
                  strokeWidth="2.5"
                />
                {/* Registrations Dots */}
                <circle cx="10" cy="90" r="3" fill="#5B2E19" />
                <circle cx="70" cy="65" r="3" fill="#5B2E19" />
                <circle cx="130" cy="50" r="3" fill="#5B2E19" />
                <circle cx="190" cy="35" r="3" fill="#5B2E19" />
                <circle cx="250" cy="40" r="3" fill="#5B2E19" />
                <circle cx="290" cy="25" r="3" fill="#5B2E19" />

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
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Left Card: Recent Registrations Table */}
        <div className="xl:col-span-8 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-[#f97316]" />
                <h3 className="text-sm sm:text-base font-black text-[#3D1E10]">
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

            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-2.5 px-3">ID</th>
                    <th className="pb-2.5 px-3">Name</th>
                    <th className="pb-2.5 px-3">Pillar</th>
                    <th className="pb-2.5 px-3">Location</th>
                    <th className="pb-2.5 px-3">Type</th>
                    <th className="pb-2.5 px-3">Date</th>
                    <th className="pb-2.5 px-3">Status</th>
                    <th className="pb-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {liveBeneficiaries.slice(0, 6).map((r) => {
                    const id = r.code || r.altCode || r._id;
                    const dateFormatted = r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '02 Jan 2026';
                    return (
                      <tr
                        key={id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-600 group-hover:text-[#5B2E19] whitespace-nowrap">
                          <Link to={`/admin/beneficiaries/${id}`} className="hover:underline">
                            {id}
                          </Link>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                          <Link to={`/admin/beneficiaries/${id}`} className="hover:text-[#5B2E19]">
                            {r.name}
                          </Link>
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${getPillarBadge(r.pillar)}`}>
                            {r.pillar || 'Education'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                          {r.location || r.state || 'Lagos'}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                          {r.type || r.beneficiaryType || 'Individual'}
                        </td>
                        <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">
                          {dateFormatted}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(r.status || r.caseTag)}`}>
                            {r.status || r.caseTag || 'Active'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/admin/beneficiaries/${id}/assessment`}
                              className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 hover:bg-amber-600 hover:text-white text-[10px] font-bold border border-amber-200/80 transition-colors"
                              title="Needs Assessment"
                            >
                              Assessment
                            </Link>
                            <Link
                              to={`/admin/beneficiaries/${id}/cases`}
                              className="px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 hover:bg-[#3D1E10] hover:text-white text-[10px] font-bold border border-sky-200/80 transition-colors"
                              title="Case Timeline"
                            >
                              Cases
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {liveBeneficiaries.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-6 text-center text-slate-400">
                        No beneficiary records loaded from database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Card: Case Status Overview Bar Chart */}
        <div className="xl:col-span-4 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-4 rounded-full bg-[#f97316]" />
              <h3 className="text-sm sm:text-base font-black text-[#3D1E10]">
                Case Status Overview
              </h3>
            </div>

            {/* Vertical Bar Chart matching screenshot */}
            <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 px-1">
              {caseStatusBars.map((bar, idx) => (
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
            <span>Tallest: Active Cases ({(liveStats?.activeCases ?? liveBeneficiaries.filter(b => b.status === 'Active' || b.caseTag === 'Active').length)})</span>
            <span className="text-emerald-700 font-bold">Live Case Tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryManagementDashboardSection;
