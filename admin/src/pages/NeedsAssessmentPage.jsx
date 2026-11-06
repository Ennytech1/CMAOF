import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Check,
  Save,
  BookOpen,
  Heart,
  Users,
  FileCheck2,
} from 'lucide-react';
import toast from 'react-hot-toast';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import { getBeneficiaryByIdOrCode } from '../data/beneficiariesData';

const STEPS = [
  { id: 1, label: 'Education', icon: BookOpen },
  { id: 2, label: 'Health', icon: Heart },
  { id: 3, label: 'Community & Social', icon: Users },
  { id: 4, label: 'Summary', icon: FileCheck2 },
];

const NeedsAssessmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const beneficiary = getBeneficiaryByIdOrCode(id || 'B-2026-001');

  const [currentStep, setCurrentStep] = useState(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Step 1: Education Form Fields matching Image 4
  const [schoolStatus, setSchoolStatus] = useState('In School');
  const [classLevel, setClassLevel] = useState('SS2');
  const [academicPerformance, setAcademicPerformance] = useState('Good');
  const [priorityLevel, setPriorityLevel] = useState('High');
  const [additionalNotes, setAdditionalNotes] = useState(
    'Needs support with school fees and learning materials for SS2.'
  );

  const [selectedNeeds, setSelectedNeeds] = useState({
    feesSupport: true,
    learningMaterials: true,
    schoolUniform: false,
    digitalDevice: false,
    tutoring: false,
    careerGuidance: false,
    other: false,
  });

  const [recommendedSupport, setRecommendedSupport] = useState({
    schoolSupportProgramme: true,
    additionalReferral: false,
  });

  // Step 2: Health Fields
  const [healthStatus, setHealthStatus] = useState('Good');
  const [healthNotes, setHealthNotes] = useState('No chronic illness reported. Annual checkup passed.');

  // Step 3: Community Fields
  const [housingStatus, setHousingStatus] = useState('Stable');
  const [communityNotes, setCommunityNotes] = useState('Household verified resident in Kano North LGA.');

  const toggleNeed = (key) => {
    setSelectedNeeds((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleRecommended = (key) => {
    setRecommendedSupport((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveDraft = () => {
    toast.success('Assessment draft saved successfully.');
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.success(`Needs assessment successfully finalized for ${beneficiary.name}!`);
      navigate(`/admin/beneficiaries/${beneficiary.code}`);
    }
  };

  const handleTabSwitch = (tabId, subItem) => {
    setMobileSidebarOpen(false);
    if (tabId === 'beneficiaries') {
      if (subItem === 'beneficiaries-directory') navigate('/admin/beneficiaries/directory');
      else if (subItem === 'beneficiaries-assessments') navigate('/admin/beneficiaries/assessments');
      else if (subItem === 'beneficiaries-cases') navigate('/admin/beneficiaries/cases');
      else if (subItem === 'beneficiaries-register') navigate('/admin/beneficiaries/register');
      else navigate('/admin/beneficiaries');
    } else if (tabId === 'dashboard') {
      navigate('/admin/dashboard');
    } else {
      navigate(`/admin/${tabId}`);
    }
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex overflow-hidden font-sans selection:bg-[#06402B] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. FIXED 100VH LEFT SIDEBAR
      ───────────────────────────────────────────────────────────── */}
      <AdminSidebar
        activeTab="beneficiaries"
        activeSubItem="beneficiaries-assessments"
        onTabChange={handleTabSwitch}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        onSignOut={() => {
          localStorage.removeItem('cmaof_admin_token');
          toast.success('Signed out');
          navigate('/admin');
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          2. RIGHT MAIN CONTENT AREA
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 lg:pl-64 h-screen flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <AdminHeader
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onSignOut={() => {
            localStorage.removeItem('cmaof_admin_token');
            navigate('/admin');
          }}
          onOpenSettings={() => navigate('/admin/dashboard')}
        />

        {/* Scrollable Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6">
          {/* Top Title & Breadcrumb matching Image 4 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-7 rounded-full bg-[#f97316]" />
                <h1 className="text-2xl sm:text-[1.65rem] font-black text-[#0B2D6E] tracking-tight">
                  Needs Assessment
                </h1>
              </div>

              {/* Breadcrumb: 🏠 Beneficiaries > B-2026-001 > Needs Assessment */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mt-1">
                <Link
                  to="/admin/beneficiaries"
                  className="flex items-center gap-1 hover:text-[#06402B] transition-colors"
                >
                  <Home size={13} className="text-slate-400" />
                  <span>Beneficiaries</span>
                </Link>
                <ChevronRight size={13} className="text-slate-300" />
                <Link
                  to={`/admin/beneficiaries/${beneficiary.code}`}
                  className="font-mono text-slate-700 hover:text-[#06402B]"
                >
                  {beneficiary.code}
                </Link>
                <ChevronRight size={13} className="text-slate-300" />
                <span className="font-bold text-[#06402B]">Needs Assessment</span>
              </div>
            </div>

            <Link
              to={`/admin/beneficiaries/${beneficiary.code}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#06402B] transition-colors self-start sm:self-auto"
            >
              <ArrowLeft size={13} />
              <span>Back to Profile</span>
            </Link>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              3. 4-STEP WIZARD PROGRESS BAR matching Image 4
          ───────────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
            <div className="max-w-3xl mx-auto flex items-center justify-between relative">
              {/* Connected Line */}
              <div className="absolute left-8 right-8 top-4 h-0.5 bg-slate-200 -z-0" />
              <div
                className="absolute left-8 top-4 h-0.5 bg-[#06402B] transition-all duration-300 -z-0"
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              />

              {STEPS.map((step) => {
                const isPassed = step.id < currentStep;
                const isCurrent = step.id === currentStep;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setCurrentStep(step.id)}
                    className="flex flex-col items-center gap-2 relative z-10 group cursor-pointer focus:outline-none"
                  >
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs
                        ${
                          isCurrent
                            ? 'bg-[#06402B] text-white ring-4 ring-emerald-100 scale-110 font-black'
                            : isPassed
                            ? 'bg-[#06402B] text-white'
                            : 'bg-white border-2 border-slate-300 text-slate-500 group-hover:border-slate-400'
                        }
                      `}
                    >
                      {isPassed ? <Check size={14} strokeWidth={3} /> : step.id}
                    </div>
                    <span
                      className={`
                        text-xs font-bold transition-colors
                        ${isCurrent ? 'text-[#06402B] font-black' : isPassed ? 'text-slate-800' : 'text-slate-400'}
                      `}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              4. STEP 1: EDUCATION NEEDS ASSESSMENT matching Image 4
          ───────────────────────────────────────────────────────────── */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-7 animate-[fadeIn_0.2s_ease]">
              {/* Header */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <span className="w-1.5 h-5 rounded-full bg-[#f97316]" />
                <h2 className="text-base sm:text-lg font-black text-[#0B2D6E]">
                  Education Needs Assessment
                </h2>
              </div>

              {/* 3 Dropdowns Grid: School Status, Class/Level, Academic Performance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current School Status
                  </label>
                  <select
                    value={schoolStatus}
                    onChange={(e) => setSchoolStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 cursor-pointer"
                  >
                    <option>In School</option>
                    <option>Out of School</option>
                    <option>At Risk of Dropping Out</option>
                    <option>Graduated / Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Class/Level
                  </label>
                  <select
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 cursor-pointer"
                  >
                    <option>SS2</option>
                    <option>SS1</option>
                    <option>SS3</option>
                    <option>JSS 1 - 3</option>
                    <option>Primary 1 - 6</option>
                    <option>Tertiary (Undergraduate)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Academic Performance
                  </label>
                  <select
                    value={academicPerformance}
                    onChange={(e) => setAcademicPerformance(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 cursor-pointer"
                  >
                    <option>Good</option>
                    <option>Excellent</option>
                    <option>Average</option>
                    <option>Below Average</option>
                    <option>Needs Remedial Tutoring</option>
                  </select>
                </div>
              </div>

              {/* Key Education Needs Checkboxes (3 Columns) matching Image 4 */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Key Education Needs (select all that apply)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-1">
                  {/* Column 1 */}
                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white transition-all cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedNeeds.feesSupport}
                      onChange={() => toggleNeed('feesSupport')}
                      className="w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-800">School fees support</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white transition-all cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedNeeds.schoolUniform}
                      onChange={() => toggleNeed('schoolUniform')}
                      className="w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                    />
                    <span className="text-xs font-medium text-slate-700">School uniform</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white transition-all cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedNeeds.other}
                      onChange={() => toggleNeed('other')}
                      className="w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                    />
                    <span className="text-xs font-medium text-slate-700">Other (specify)</span>
                  </label>

                  {/* Column 2 */}
                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white transition-all cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedNeeds.learningMaterials}
                      onChange={() => toggleNeed('learningMaterials')}
                      className="w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-800">Learning materials</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white transition-all cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedNeeds.digitalDevice}
                      onChange={() => toggleNeed('digitalDevice')}
                      className="w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                    />
                    <span className="text-xs font-medium text-slate-700">Digital device support</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white transition-all cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedNeeds.tutoring}
                      onChange={() => toggleNeed('tutoring')}
                      className="w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                    />
                    <span className="text-xs font-medium text-slate-700">Tutoring / remedial support</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white transition-all cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedNeeds.careerGuidance}
                      onChange={() => toggleNeed('careerGuidance')}
                      className="w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                    />
                    <span className="text-xs font-medium text-slate-700">Career guidance</span>
                  </label>
                </div>
              </div>

              {/* Priority Level & Additional Notes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Priority Level
                  </label>
                  <select
                    value={priorityLevel}
                    onChange={(e) => setPriorityLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 cursor-pointer"
                  >
                    <option>High</option>
                    <option>Urgent</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Additional Notes
                  </label>
                  <textarea
                    rows={2}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Enter additional assessment findings..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 font-medium"
                  />
                </div>
              </div>

              {/* Section 2: Recommended Support matching Image 4 */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-5 rounded-full bg-[#f97316]" />
                  <h3 className="text-base font-bold text-[#0B2D6E]">Recommended Support</h3>
                </div>

                <div className="space-y-2.5 pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={recommendedSupport.schoolSupportProgramme}
                      onChange={() => toggleRecommended('schoolSupportProgramme')}
                      className="w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      Include in School Support Programme
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={recommendedSupport.additionalReferral}
                      onChange={() => toggleRecommended('additionalReferral')}
                      className="w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                    />
                    <span className="text-xs font-medium text-slate-700">
                      Refer for additional support (e.g. counselling, mentorship)
                    </span>
                  </label>
                </div>
              </div>

              {/* Action Buttons matching Image 4: Save Draft + Next: Health Assessment */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[#0B2D6E] text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  <span>Next: Health Assessment</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: HEALTH ASSESSMENT */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <span className="w-1.5 h-5 rounded-full bg-[#f97316]" />
                <h2 className="text-base sm:text-lg font-black text-[#0B2D6E]">
                  Health Assessment
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    General Health Condition
                  </label>
                  <select
                    value={healthStatus}
                    onChange={(e) => setHealthStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#06402B]/20"
                  >
                    <option>Good</option>
                    <option>Minor Ailment</option>
                    <option>Chronic Condition</option>
                    <option>Under Active Treatment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Clinical Notes & Observations
                  </label>
                  <textarea
                    rows={2}
                    value={healthNotes}
                    onChange={(e) => setHealthNotes(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#06402B]/20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold"
                >
                  Back
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[#0B2D6E] text-xs font-bold"
                  >
                    Save Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold"
                  >
                    <span>Next: Community & Social</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: COMMUNITY & SOCIAL */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <span className="w-1.5 h-5 rounded-full bg-[#f97316]" />
                <h2 className="text-base sm:text-lg font-black text-[#0B2D6E]">
                  Community & Social Assessment
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Household Living & Tenure
                  </label>
                  <select
                    value={housingStatus}
                    onChange={(e) => setHousingStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-slate-800"
                  >
                    <option>Stable</option>
                    <option>Temporary Shelter</option>
                    <option>Rented Room</option>
                    <option>Informal Settlement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Community Integration Notes
                  </label>
                  <textarea
                    rows={2}
                    value={communityNotes}
                    onChange={(e) => setCommunityNotes(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold"
                >
                  Back
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[#0B2D6E] text-xs font-bold"
                  >
                    Save Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold"
                  >
                    <span>Next: Assessment Summary</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUMMARY */}
          {currentStep === 4 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <span className="w-1.5 h-5 rounded-full bg-[#f97316]" />
                <h2 className="text-base sm:text-lg font-black text-[#0B2D6E]">
                  Assessment Summary & Recommendation
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle2 size={16} className="text-[#06402B]" />
                  <span>Readiness Confirmed for School Support Programme</span>
                </div>
                <p className="text-slate-600">
                  Beneficiary {beneficiary.name} ({beneficiary.code}) is approved for full academic sponsorship and learning resource distribution.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-sm"
                >
                  <CheckCircle2 size={15} />
                  <span>Submit & Finalize Assessment</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NeedsAssessmentPage;
