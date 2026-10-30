import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Eye,
  Plus,
  BookOpen,
  Heart,
  Users,
  Sparkles,
  ChevronRight,
  Home,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { BENEFICIARIES_DATA } from '../../../data/beneficiariesData';

const BeneficiaryAssessmentsSection = ({ onNavigateToDirectory, onNavigateToCases }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatusTab, setSelectedStatusTab] = useState('all'); // 'all', 'pending', 'completed', 'high-priority'

  // Augmented list with assessment diagnostic details
  const assessmentsList = BENEFICIARIES_DATA.map((b, idx) => {
    const isOdd = idx % 2 === 1;
    const isThird = idx % 3 === 0;

    const status = isThird
      ? 'Pending Assessment'
      : isOdd
      ? 'Under Assessment'
      : 'Assessment Completed';

    const priority = isThird ? 'Critical' : isOdd ? 'High' : 'Standard';

    const evaluatedNeeds =
      b.pillar === 'Education'
        ? ['Tuition Support', 'Textbooks & Uniforms', 'Digital Learning Device']
        : b.pillar === 'Health'
        ? ['Primary Healthcare', 'Nutritional Supplementation', 'Optical Examination']
        : ['Family Economic Grants', 'Clean Water Access', 'Shelter Stabilization'];

    return {
      ...b,
      assessmentStatus: status,
      priority,
      evaluatedNeeds,
      score: isThird ? '92/100 (Extreme Vulnerability)' : isOdd ? '76/100 (High Need)' : '58/100 (Moderate Need)',
      lastAssessedDate: isThird ? 'Pending Review' : '14 Oct 2026',
    };
  });

  const filtered = assessmentsList.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q);

    const matchesPillar =
      selectedPillar === 'All' || item.pillar.toLowerCase() === selectedPillar.toLowerCase();

    const matchesPriority =
      selectedPriority === 'All' || item.priority.toLowerCase() === selectedPriority.toLowerCase();

    let matchesTab = true;
    if (selectedStatusTab === 'pending') {
      matchesTab = item.assessmentStatus.includes('Pending') || item.assessmentStatus.includes('Under');
    } else if (selectedStatusTab === 'completed') {
      matchesTab = item.assessmentStatus === 'Assessment Completed';
    } else if (selectedStatusTab === 'high-priority') {
      matchesTab = item.priority === 'Critical' || item.priority === 'High';
    }

    return matchesSearch && matchesPillar && matchesPriority && matchesTab;
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
              <FileCheck2 size={15} />
              <span>Diagnostic Intake & Triage</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight mt-0.5">
              Needs Assessment Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Multi-pillar vulnerability evaluation, socio-economic diagnostic scoring, and intervention recommendation.
            </p>
          </div>
        </div>

        {/* Quick Nav Toggles */}
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

          {onNavigateToCases && (
            <button
              type="button"
              onClick={onNavigateToCases}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#0B2D6E] text-xs font-bold transition-all cursor-pointer"
            >
              Case Timelines →
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              const pending = assessmentsList.find((a) => a.assessmentStatus.includes('Pending')) || assessmentsList[0];
              toast.success(`Launching Needs Assessment for ${pending.name} (${pending.code})`);
              navigate(`/admin/beneficiaries/${pending.code}/assessment`);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Launch Assessment</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. 4 EXECUTIVE KPI DIAGNOSTIC METRIC CARDS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Completed Assessments */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#06402B] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <CheckCircle2 size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">
              96.4% Verified
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Completed Assessments
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              4,890
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              Full multi-pillar diagnostics verified
            </p>
          </div>
        </div>

        {/* Card 2: Pending Intake Diagnostic */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <Clock size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-100">
              Field Queue
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pending Intake
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              320
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              Awaiting officer home or school visit
            </p>
          </div>
        </div>

        {/* Card 3: Critical Priority Need */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <AlertTriangle size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-100">
              Immediate
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Critical Vulnerability
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              45
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
              Score &gt;85% requiring fast-track relief
            </p>
          </div>
        </div>

        {/* Card 4: Average Turnaround */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#0B2D6E] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <ShieldCheck size={18} />
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#0B2D6E] border border-blue-100">
              SLA Standard
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Diagnostic Turnaround
            </p>
            <p className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight mt-1">
              2.1 Days
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
              From registration to finalized dossier
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. TABS & FILTER BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Evaluations' },
              { id: 'pending', label: 'Pending Intake (320)' },
              { id: 'completed', label: 'Completed (4,890)' },
              { id: 'high-priority', label: 'High / Critical Need' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedStatusTab(tab.id)}
                className={`
                  px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer
                  ${
                    selectedStatusTab === tab.id
                      ? 'bg-[#06402B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search code, name, LGA..."
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

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Priority</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. ASSESSMENTS TABLE
        ───────────────────────────────────────────────────────────── */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="py-3 px-3">Beneficiary Code & Identity</th>
                <th className="py-3 px-3">Pillar & Location</th>
                <th className="py-3 px-3">Assessment Status</th>
                <th className="py-3 px-3">Vulnerability Priority</th>
                <th className="py-3 px-3">Identified Needs</th>
                <th className="py-3 px-3">Assessing Officer</th>
                <th className="py-3 px-3 text-right sticky right-0 bg-slate-50/95 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-medium">
                    No assessment records matching your filter parameters.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const isPending = item.assessmentStatus.includes('Pending') || item.assessmentStatus.includes('Under');
                  return (
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

                      {/* Pillar & Location */}
                      <td className="py-3.5 px-3">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {item.pillar}
                        </span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">{item.location}</span>
                      </td>

                      {/* Assessment Status */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            item.assessmentStatus === 'Assessment Completed'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : isPending
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-sky-50 text-sky-800 border border-sky-200'
                          }`}
                        >
                          {item.assessmentStatus === 'Assessment Completed' ? (
                            <CheckCircle2 size={11} className="text-emerald-600" />
                          ) : (
                            <Clock size={11} className="text-amber-600" />
                          )}
                          <span>{item.assessmentStatus}</span>
                        </span>
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            item.priority === 'Critical'
                              ? 'bg-rose-100 text-rose-800'
                              : item.priority === 'High'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {item.priority}
                        </span>
                        <span className="block text-[10px] text-slate-400 mt-0.5 font-mono">{item.score}</span>
                      </td>

                      {/* Identified Needs */}
                      <td className="py-3.5 px-3 max-w-[200px]">
                        <div className="flex flex-wrap gap-1">
                          {item.evaluatedNeeds.map((need, nIdx) => (
                            <span
                              key={nIdx}
                              className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-medium truncate"
                            >
                              {need}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Officer */}
                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-slate-800 text-[11px] block">{item.assignedOfficer || 'Hauwa Bello'}</span>
                        <span className="text-[10px] text-slate-400">{item.lastAssessedDate}</span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-3 text-right sticky right-0 bg-white/95 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)] min-w-[230px]">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Dedicated Action: Needs Assessment Form */}
                          <Link
                            to={`/admin/beneficiaries/${item.code}/assessment`}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold text-xs transition-all shadow-2xs border ${
                              isPending
                                ? 'bg-[#06402B] hover:bg-[#042c1d] text-white border-transparent'
                                : 'bg-amber-50 text-amber-800 hover:bg-amber-600 hover:text-white border-amber-200/80'
                            }`}
                            title={isPending ? 'Conduct Needs Assessment' : 'Update Needs Assessment'}
                          >
                            <FileCheck2 size={13} />
                            <span>{isPending ? 'Conduct' : 'Review'}</span>
                          </Link>

                          {/* Case Timeline Link */}
                          <Link
                            to={`/admin/beneficiaries/${item.code}/cases`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-800 hover:bg-[#0B2D6E] hover:text-white font-bold text-xs transition-all border border-sky-200/70"
                            title="View Case Timeline"
                          >
                            <span>Cases</span>
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryAssessmentsSection;
