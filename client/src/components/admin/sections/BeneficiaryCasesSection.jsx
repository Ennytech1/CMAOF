import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GitBranch,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  Calendar,
  Layers,
  Sparkles,
  Milestone,
  ShieldCheck,
  UserCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { BENEFICIARIES_DATA } from '../../../data/beneficiariesData';

const PIPELINE_STAGES = [
  { id: 'all', label: 'All Lifecycle Stages' },
  { id: 'registration', label: '1. Registration' },
  { id: 'assessment', label: '2. Assessment' },
  { id: 'approval', label: '3. Approval' },
  { id: 'intervention', label: '4. Intervention' },
  { id: 'referral', label: '5. Referral' },
  { id: 'follow-up', label: '6. Follow-up' },
  { id: 'outcome', label: '7. Outcome' },
  { id: 'closure', label: '8. Closure' },
];

const BeneficiaryCasesSection = ({ onNavigateToDirectory, onNavigateToAssessments }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('All');
  const [selectedStage, setSelectedStage] = useState('all');

  // Enriched case data
  const casesList = BENEFICIARIES_DATA.map((b, idx) => {
    // Distribute cases across lifecycle milestones
    const stageNames = [
      'Registration',
      'Assessment',
      'Approval',
      'Intervention',
      'Referral',
      'Follow-up',
      'Outcome Measurement',
      'Closure',
    ];
    const stageIdx = (idx % 7) + 1; // 1 to 7
    const stageName = stageNames[stageIdx - 1];
    const progressPct = Math.round((stageIdx / 8) * 100);

    const nextMilestoneDate = ['15 Nov 2026', '20 Nov 2026', '02 Dec 2026', '12 Dec 2026'][idx % 4];

    return {
      ...b,
      currentMilestoneStage: stageName,
      milestoneIndex: stageIdx,
      progressPct,
      nextMilestoneDate,
      caseUrgency: idx % 3 === 0 ? 'Urgent' : idx % 2 === 0 ? 'Standard' : 'Low',
    };
  });

  const filtered = casesList.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.assignedOfficer?.toLowerCase().includes(q) ||
      item.programme?.toLowerCase().includes(q);

    const matchesPillar =
      selectedPillar === 'All' || item.pillar.toLowerCase() === selectedPillar.toLowerCase();

    const matchesStage =
      selectedStage === 'all' ||
      item.currentMilestoneStage.toLowerCase().includes(selectedStage.toLowerCase());

    return matchesSearch && matchesPillar && matchesStage;
  });

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER WITH ACCENT BAR & QUICK ACTIONS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-start gap-3">
          <span className="w-1.5 h-10 rounded-full bg-[#f97316] shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#06402B] uppercase tracking-wider">
              <GitBranch size={15} />
              <span>Full Lifecycle & Milestones</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight mt-0.5">
              Case Management & Timelines Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Monitor 8-stage intervention progress, track officer follow-ups, and guide beneficiaries toward self-sufficiency.
            </p>
          </div>
        </div>

        {/* Quick Nav Controls */}
        <div className="flex items-center gap-2 self-start lg:self-auto shrink-0">
          {onNavigateToDirectory && (
            <button
              type="button"
              onClick={onNavigateToDirectory}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              Beneficiary Directory
            </button>
          )}

          {onNavigateToAssessments && (
            <button
              type="button"
              onClick={onNavigateToAssessments}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-amber-800 text-xs font-bold transition-all cursor-pointer"
            >
              Needs Assessments →
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              const firstCase = casesList[0];
              toast.success(`Opening Case Timeline for ${firstCase.name} (${firstCase.code})`);
              navigate(`/admin/beneficiaries/${firstCase.code}/cases`);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <GitBranch size={14} />
            <span>Open Active Timeline</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. 8-STAGE VISUAL LIFECYCLE SUMMARY PIPELINE
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B2D6E] uppercase tracking-wider">
            <Layers size={14} className="text-[#f97316]" />
            <span>Standard 8-Stage Beneficiary Progression Framework</span>
          </div>
          <span className="text-xs font-semibold text-slate-400">Total Enrolled: 12,480</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
          {[
            { step: 1, name: 'Registration', count: '12,480', color: 'bg-emerald-500' },
            { step: 2, name: 'Assessment', count: '450', color: 'bg-amber-500' },
            { step: 3, name: 'Approval', count: '680', color: 'bg-teal-500' },
            { step: 4, name: 'Intervention', count: '4,820', color: 'bg-sky-500' },
            { step: 5, name: 'Referral', count: '186', color: 'bg-orange-500' },
            { step: 6, name: 'Follow-up', count: '1,540', color: 'bg-blue-500' },
            { step: 7, name: 'Outcome', count: '2,180', color: 'bg-indigo-500' },
            { step: 8, name: 'Closure', count: '2,050', color: 'bg-slate-500' },
          ].map((s) => (
            <div
              key={s.step}
              onClick={() => setSelectedStage(s.name.toLowerCase())}
              className={`p-3 rounded-xl border transition-all cursor-pointer text-center group ${
                selectedStage.toLowerCase().includes(s.name.toLowerCase())
                  ? 'border-[#06402B] bg-emerald-50/60 shadow-xs'
                  : 'border-slate-200/80 hover:border-slate-300 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 mb-1.5">
                <span className={`w-2 h-2 rounded-full ${s.color}`} />
                <span className="text-[10px] font-bold text-slate-400">Step {s.step}</span>
              </div>
              <p className="text-xs font-black text-slate-800 truncate">{s.name}</p>
              <p className="text-xs font-bold text-[#06402B] mt-0.5">{s.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. FILTER & SEARCH CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {PIPELINE_STAGES.slice(0, 5).map((stage) => (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedStage(stage.id === 'all' ? 'all' : stage.label.split('. ')[1].toLowerCase())}
                className={`
                  px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer
                  ${
                    (stage.id === 'all' && selectedStage === 'all') ||
                    selectedStage.toLowerCase().includes(stage.id.toLowerCase())
                      ? 'bg-[#06402B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }
                `}
              >
                {stage.label}
              </button>
            ))}
            {selectedStage !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedStage('all')}
                className="px-2 py-1 text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search beneficiary, officer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#06402B] focus:bg-white"
              />
            </div>

            <select
              value={selectedPillar}
              onChange={(e) => setSelectedPillar(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Pillars</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Community">Community</option>
            </select>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. CASES TABLE
        ───────────────────────────────────────────────────────────── */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="py-3 px-3">Beneficiary Code & Identity</th>
                <th className="py-3 px-3">Pillar & Active Programme</th>
                <th className="py-3 px-3">Current Milestone & Progress</th>
                <th className="py-3 px-3">Case Officer</th>
                <th className="py-3 px-3">Next Action Due</th>
                <th className="py-3 px-3 text-right sticky right-0 bg-slate-50/95 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                    No active cases matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Identity */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.photo || '/images/story_amina.jpg'}
                          alt={item.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{item.name}</span>
                          <span className="font-mono text-[10px] text-slate-400 font-semibold">{item.code}</span>
                        </div>
                      </div>
                    </td>

                    {/* Programme & Pillar */}
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-[#0B2D6E] block">{item.programme || 'Core Support Programme'}</span>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 mt-1">
                        {item.pillar}
                      </span>
                    </td>

                    {/* Milestone Progress Bar */}
                    <td className="py-3.5 px-3 min-w-[200px]">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-800">
                            Stage {item.milestoneIndex}/8: {item.currentMilestoneStage}
                          </span>
                          <span className="text-[#06402B] font-mono">{item.progressPct}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#06402B] transition-all"
                            style={{ width: `${item.progressPct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Officer */}
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-slate-800 block">{item.assignedOfficer || 'Hauwa Bello'}</span>
                      <span className="text-[10px] text-slate-400">{item.location}</span>
                    </td>

                    {/* Next Action Due */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                        <Calendar size={13} className="text-slate-400" />
                        <span>{item.nextMilestoneDate}</span>
                      </div>
                      <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mt-1">
                        Review Scheduled
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 text-right sticky right-0 bg-white/95 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)] min-w-[240px]">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* 1-Click Action: Open Case Timeline */}
                        <Link
                          to={`/admin/beneficiaries/${item.code}/cases`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-800 hover:bg-[#0B2D6E] hover:text-white font-bold text-xs transition-all border border-sky-200/80 shadow-2xs"
                          title="Open Interactive Case Timeline"
                        >
                          <GitBranch size={13} />
                          <span>Timeline</span>
                        </Link>

                        {/* Needs Assessment Form */}
                        <Link
                          to={`/admin/beneficiaries/${item.code}/assessment`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-600 hover:text-white font-bold text-xs transition-all border border-amber-200/80"
                          title="Open Needs Assessment"
                        >
                          <span>Assessment</span>
                        </Link>

                        {/* View Profile */}
                        <Link
                          to={`/admin/beneficiaries/${item.code}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          title="View Full Profile"
                        >
                          <Eye size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryCasesSection;
