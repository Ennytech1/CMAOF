import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Layers,
  DollarSign,
  MapPin,
  Users,
  Calendar,
  CheckCircle2,
  Check,
  Save,
  Shield,
  FileText,
  Building,
  School,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 1, label: 'Core Overview' },
  { id: 2, label: 'Budget & Capital' },
  { id: 3, label: 'Locations & Reach' },
  { id: 4, label: 'Governance & Staff' },
  { id: 5, label: 'Review & Submit' },
];

const ProgrammeRegistrationSection = ({ initialData, onSave, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const isEditing = Boolean(initialData?.id);

  // Form State
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    pillar: initialData?.pillar || 'Education & Human Capital',
    objective: initialData?.objective || '',
    targetBeneficiaries: initialData?.targetBeneficiaries || 'Underserved pupils and marginalized households',
    
    // Step 2: Budget
    budgetFormatted: initialData?.budgetFormatted || '₦350,000,000',
    fundingType: 'Foundation Core Endowment',
    completionRate: initialData?.stats?.completionRate || '85%',
    budgetNotes: 'Full capital deployment approved across primary milestone gates.',
    
    // Step 3: Locations & Reach
    locations: initialData?.locations || 'Niger, Abuja, Lagos, Kano',
    locationsCount: initialData?.stats?.communities || initialData?.locationsCount || 18,
    schoolsCount: initialData?.stats?.schools || initialData?.schoolsCount || 12,
    beneficiariesCount: initialData?.stats?.beneficiaries || '4,500',
    
    // Step 4: Governance
    programmeManager: initialData?.programmeManager || 'Hauwa Bello',
    managerEmail: 'h.bello@cmaofoundation.org',
    managerPhone: '+234 803 456 7890',
    startDate: initialData?.startDate || '01 Jan 2025',
    endDate: initialData?.endDate || '31 Dec 2027',
    status: initialData?.status || 'Active',
    
    // Step 5: Verification
    complianceVerified: true,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        toast.error('Please enter the programme title');
        return;
      }
      if (!formData.objective.trim()) {
        toast.error('Please provide a strategic objective statement');
        return;
      }
    }

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final Submit
      if (onSave) {
        onSave(formData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = () => {
    toast.success('Programme parameters saved as local draft!');
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. BREADCRUMB NAVIGATION (Matches Register Beneficiary Design)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-500">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1.5 hover:text-[#06402B] text-sky-600 transition-colors cursor-pointer"
          >
            <Home size={15} className="text-sky-600" />
            <span className="font-semibold text-sky-600">Programmes</span>
          </button>
          <ChevronRight size={13} className="text-slate-300" />
          <span className="font-bold text-[#0B2D6E]">
            {isEditing ? `Edit: ${formData.name || 'Programme'}` : 'Launch Strategic Programme'}
          </span>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#06402B] transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Portfolio</span>
          </button>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. 5-STEP PROGRESS TRACKER (Matches Register Beneficiary Design)
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="relative overflow-x-auto pb-1">
          <div className="min-w-[620px]">
            {/* Connecting Line */}
            <div className="absolute top-[18px] left-10 right-10 h-0.5 bg-slate-200 -z-0" />

            <div className="relative z-10 flex items-center justify-between">
              {STEPS.map((step) => {
                const isPassed = currentStep > step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <div
                    key={step.id}
                    onClick={() => {
                      if (step.id < currentStep) setCurrentStep(step.id);
                    }}
                    className="flex flex-col items-center text-center px-1 cursor-pointer group"
                  >
                    {/* Step Number Circle */}
                    {isPassed ? (
                      <div className="w-9 h-9 rounded-full bg-[#06402B] text-white flex items-center justify-center shadow-xs ring-4 ring-white">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-9 h-9 rounded-full bg-[#06402B] text-white flex items-center justify-center font-black text-sm shadow-md ring-4 ring-emerald-100">
                        {step.id}
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-200 text-slate-400 font-bold text-sm flex items-center justify-center ring-4 ring-white group-hover:border-slate-300">
                        {step.id}
                      </div>
                    )}

                    {/* Step Label */}
                    <p
                      className={`text-xs mt-2 font-bold max-w-[100px] leading-tight ${
                        isCurrent
                          ? 'text-[#06402B]'
                          : isPassed
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STEP 1: CORE OVERVIEW & PILLAR (Matches Register Beneficiary Design)
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
          <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
            <Briefcase size={18} className="text-[#06402B]" />
            <span>Core Initiative Overview & Thematic Pillar</span>
          </h2>
          <p className="text-xs text-slate-500">
            Establish the institutional title, strategic pillar classification, and development objectives.
          </p>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Programme Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g. Niger State Clean Water & Solar Borehole Infrastructure"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Strategic Pillar Alignment <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.pillar}
                  onChange={(e) => handleInputChange('pillar', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                >
                  <option value="Education & Human Capital">Education & Human Capital (Pillar 1)</option>
                  <option value="Health & Well-being">Health & Well-being (Pillar 2)</option>
                  <option value="Community Resilience">Community Resilience (Pillar 3)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Target Beneficiary Profile <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.targetBeneficiaries}
                  onChange={(e) => handleInputChange('targetBeneficiaries', e.target.value)}
                  placeholder="e.g. Out-of-school girls, primary pupils, widow households"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Strategic Objective & Impact Statement <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.objective}
                onChange={(e) => handleInputChange('objective', e.target.value)}
                placeholder="Detail the developmental problem, proposed field solution, key milestones, and verified target outcome for the community..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 2: BUDGET & FINANCIAL ALLOCATION
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
          <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
            <DollarSign size={18} className="text-[#06402B]" />
            <span>Capital Budget & Financial Allocation</span>
          </h2>
          <p className="text-xs text-slate-500">
            Define the approved capital expenditure, funding source, and milestone deployment velocity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Approved Capital Budget (NGN) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.budgetFormatted}
                onChange={(e) => handleInputChange('budgetFormatted', e.target.value)}
                placeholder="e.g. ₦350,000,000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-mono text-xs sm:text-sm font-bold text-[#0B2D6E] focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Primary Funding Classification</label>
              <select
                value={formData.fundingType}
                onChange={(e) => handleInputChange('fundingType', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
              >
                <option value="Foundation Core Endowment">Foundation Core Endowment</option>
                <option value="Donor Designated Grant">Donor Designated Grant</option>
                <option value="Institutional Co-funding">Institutional Co-funding / Corporate CSR</option>
                <option value="Public Private Partnership">Public Private Partnership (PPP)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Target Completion Velocity</label>
              <input
                type="text"
                value={formData.completionRate}
                onChange={(e) => handleInputChange('completionRate', e.target.value)}
                placeholder="e.g. 85%"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-emerald-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Capital Deployment Strategy</label>
              <input
                type="text"
                value={formData.budgetNotes}
                onChange={(e) => handleInputChange('budgetNotes', e.target.value)}
                placeholder="e.g. Tranche 1 (40%) on site mobilization, Tranche 2 (60%) on audit sign-off"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 3: LOCATIONS & OPERATIONAL REACH
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
          <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
            <MapPin size={18} className="text-[#06402B]" />
            <span>Geographic Footprint & Target Beneficiaries</span>
          </h2>
          <p className="text-xs text-slate-500">
            Specify deployment states, local government councils, target communities, and verified individual reach.
          </p>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Target States & LGAs <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.locations}
                onChange={(e) => handleInputChange('locations', e.target.value)}
                placeholder="e.g. Niger (Chanchaga, Bida), Abuja (Kwali, Bwari), Lagos (Epe, Ikorodu)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Target Communities Count</label>
                <input
                  type="number"
                  value={formData.locationsCount}
                  onChange={(e) => handleInputChange('locationsCount', e.target.value)}
                  placeholder="18"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Schools / Facilities Count</label>
                <input
                  type="number"
                  value={formData.schoolsCount}
                  onChange={(e) => handleInputChange('schoolsCount', e.target.value)}
                  placeholder="12"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Target Individuals Reached</label>
                <input
                  type="text"
                  value={formData.beneficiariesCount}
                  onChange={(e) => handleInputChange('beneficiariesCount', e.target.value)}
                  placeholder="e.g. 5,000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-emerald-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 4: GOVERNANCE & KEY STAFF
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
          <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
            <Users size={18} className="text-[#06402B]" />
            <span>Governance, Leadership & Operational Timeline</span>
          </h2>
          <p className="text-xs text-slate-500">
            Assign accountable programme directors, operational lead officers, and active project timelines.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Lead Programme Manager <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.programmeManager}
                onChange={(e) => handleInputChange('programmeManager', e.target.value)}
                placeholder="e.g. Hauwa Bello"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Operational Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
              >
                <option value="Active">Active (Live in Field)</option>
                <option value="In Planning">In Planning / Community Mobilization</option>
                <option value="Completed">Completed & Audited</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Initiative Start Date</label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                placeholder="e.g. 01 Jan 2025"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Target Completion Date</label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                placeholder="e.g. 31 Dec 2027"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 5: REVIEW & SUBMIT
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
          <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
            <Shield size={18} className="text-[#06402B]" />
            <span>Review Initiative Dossier & Institutional Authorization</span>
          </h2>
          <p className="text-xs text-slate-500">
            Verify all operational parameters before launching this programme into active foundation management.
          </p>

          {/* Dossier Card Review Summary */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Programme Title</span>
                <p className="text-base font-extrabold text-[#0B2D6E]">{formData.name || 'Untitled Initiative'}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#06402B] border border-emerald-200 self-start sm:self-auto">
                {formData.pillar}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Capital Budget</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{formData.budgetFormatted}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Lead Manager</span>
                <span className="font-bold text-slate-900 text-sm">{formData.programmeManager}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Reach</span>
                <span className="font-mono font-bold text-emerald-800 text-sm">{formData.beneficiariesCount}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Footprint</span>
                <span className="font-bold text-slate-900 text-sm">{formData.locationsCount} Communities</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Strategic Objective</span>
              <p className="text-slate-600 leading-relaxed font-medium">{formData.objective || 'N/A'}</p>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span>Locations: {formData.locations}</span>
              <span>Active Period: {formData.startDate} – {formData.endDate}</span>
            </div>
          </div>

          {/* Compliance Confirmation */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3">
            <input
              type="checkbox"
              id="complianceCheck"
              checked={formData.complianceVerified}
              onChange={(e) => handleInputChange('complianceVerified', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
            />
            <label htmlFor="complianceCheck" className="text-xs text-slate-700 font-medium cursor-pointer">
              <span className="font-bold text-[#06402B]">Institutional Governance Sign-off:</span> I confirm that this initiative aligns with the CMAOF strategic pillars, approved operational budget, and statutory charity reporting guidelines.
            </label>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM ACTION BAR (Matches Register Beneficiary Design)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-2">
        <div>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Previous
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2D6E] hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
          >
            <span>{currentStep === 5 ? (isEditing ? 'Save Changes' : 'Confirm & Launch Programme') : 'Next'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgrammeRegistrationSection;
