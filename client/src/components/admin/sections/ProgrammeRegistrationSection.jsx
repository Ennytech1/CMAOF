import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  DollarSign,
  MapPin,
  Users,
  Calendar,
  CheckCircle2,
  Check,
  Save,
  Shield,
  FileText,
  School,
  Sparkles,
  Plus,
  Trash2,
  Image as ImageIcon,
  Target,
  Layers,
} from 'lucide-react';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 1, label: 'Core & Objectives' },
  { id: 2, label: 'Budget & Partners' },
  { id: 3, label: 'Locations & Reach' },
  { id: 4, label: 'Activities & KPIs' },
  { id: 5, label: 'Media & Documents' },
  { id: 6, label: 'Review & Launch' },
];

const ProgrammeRegistrationSection = ({ initialData, onSave, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const isEditing = Boolean(initialData?.id);

  // Form State
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    pillar: initialData?.pillar || 'Education & Human Capital',
    objective:
      initialData?.objective ||
      'Provide comprehensive developmental support and institutional assistance to underserved communities.',
    targetBeneficiaries:
      initialData?.targetBeneficiaries || 'Underserved pupils, vulnerable women, and marginalized households',

    // Objectives (Dimension 1)
    objectivesList: initialData?.objectivesList?.length
      ? [...initialData.objectivesList]
      : [
          'Increase net baseline access and retention by 35% in targeted rural and peri-urban clusters.',
          'Reduce economic barriers through direct sponsorship grants, tools, and learning kits.',
          'Establish continuous monitoring and evaluation with institutional and statutory state partners.',
        ],

    // Budget & Partners (Dimension 2 & Dimension 5)
    budgetFormatted: initialData?.budgetFormatted || '₦350,000,000',
    fundingType: 'Foundation Core Endowment',
    completionRate: initialData?.stats?.completionRate || '85%',
    budgetNotes: 'Full capital deployment approved across primary milestone gates.',
    partners: initialData?.partners?.length
      ? [...initialData.partners]
      : [
          {
            name: 'State Universal Basic Education Board / Ministry',
            role: 'Accreditation, School Access & Quality Assurance',
            tier: 'Strategic Government Partner',
            contactPerson: 'Director of Operations',
            mouStatus: 'Active MoU',
          },
          {
            name: 'Community Advisory & Elders Council',
            role: 'Local Field Access, Community Mobilization & Child Safeguarding',
            tier: 'Community Partner',
            contactPerson: 'Community Secretary',
            mouStatus: 'Signed & Valid',
          },
        ],

    // Locations & Beneficiaries (Dimension 3 & Dimension 4)
    locations: initialData?.locations || 'Niger, Abuja, Lagos, Kano',
    locationsCount: initialData?.stats?.communities || initialData?.locationsCount || 18,
    schoolsCount: initialData?.stats?.schools || initialData?.schoolsCount || 12,
    beneficiariesCount: initialData?.stats?.beneficiaries || '4,500',
    locationsList: initialData?.locationsList?.length
      ? [...initialData.locationsList]
      : [
          {
            state: 'Lagos State',
            lga: 'Ajeromi-Ifelodun & Epe',
            hubName: 'Coastal Operations Hub',
            schoolsCount: 8,
            pupilsCount: 1800,
            leadCoordinator: 'Mrs. Funke Balogun',
            contact: '+234 802 334 1122',
            status: 'Fully Operational',
          },
          {
            state: 'Kano State',
            lga: 'Dala & Fagge LGAs',
            hubName: 'Northern Field Cluster',
            schoolsCount: 6,
            pupilsCount: 1400,
            leadCoordinator: 'Mallam Ibrahim Datti',
            contact: '+234 803 556 7788',
            status: 'Fully Operational',
          },
        ],

    // Activities & KPIs (Dimension 2 & Dimension 6)
    activities: initialData?.activities?.length
      ? [...initialData.activities]
      : [
          {
            title: 'Baseline Field Assessment & Community Mobilization',
            frequency: 'Termly',
            status: 'Ongoing',
            lead: 'Field Operations Unit',
            targetDate: 'Term Start',
            budgetShare: '30%',
          },
          {
            title: 'Direct Material & Sponsorship Distribution',
            frequency: 'Bi-annual',
            status: 'Active',
            lead: 'Logistics Directorate',
            targetDate: 'Mid-Term',
            budgetShare: '45%',
          },
          {
            title: 'Periodic Stakeholder & M&E Performance Audit',
            frequency: 'Quarterly',
            status: 'Scheduled',
            lead: 'Independent M&E Team',
            targetDate: 'Quarter End',
            budgetShare: '25%',
          },
        ],
    kpis: initialData?.kpis?.length
      ? [...initialData.kpis]
      : [
          {
            indicator: 'Total Verified Individuals Reached',
            baseline: '0',
            target: '4,500',
            achieved: '3,850',
            unit: 'Individuals',
            status: 'On Track',
            trend: '+85% of Goal',
            verification: 'Field Rosters Signed',
          },
          {
            indicator: 'Target Retention & Service Completion Rate',
            baseline: '45%',
            target: '90%',
            achieved: '85%',
            unit: 'Percentage',
            status: 'On Track',
            trend: '+40% vs Baseline',
            verification: 'M&E Quarterly Audit',
          },
        ],

    // Media & Documents (Dimension 7 & Dimension 8)
    thumbnail: initialData?.thumbnail || '/images/past_event_school_support.jpg',
    featuredImage: initialData?.featuredImage || '/images/gallery_girl_writing.jpg',
    mediaList: initialData?.mediaList?.length
      ? [...initialData.mediaList]
      : [
          {
            title: 'Active Field Outreach Session',
            url: '/images/past_event_school_support.jpg',
            tag: 'Field Operations',
            date: '15 Oct 2026',
            caption: 'Coordinators facilitating direct service distribution to beneficiaries.',
          },
          {
            title: 'Community Stakeholder Townhall',
            url: '/images/past_event_community_hall.jpg',
            tag: 'Community',
            date: '02 Sep 2026',
            caption: 'Parents and community elders reviewing project milestones.',
          },
        ],
    documentsList: initialData?.documentsList?.length
      ? [...initialData.documentsList]
      : [
          {
            title: 'Programme Strategic Charter & Operational Framework',
            type: 'PDF',
            category: 'Governance & Framework',
            size: '3.4 MB',
            date: '15 Jan 2025',
            version: 'v2.0 Final',
            status: 'Approved by BoT',
          },
          {
            title: 'Inter-Agency Delivery MoU & Child Safeguarding Policy',
            type: 'PDF',
            category: 'Institutional MoU',
            size: '2.1 MB',
            date: '02 Feb 2025',
            version: 'Signed',
            status: 'Active Legal Agreement',
          },
        ],

    // Leadership & Timeline
    programmeManager: initialData?.programmeManager || 'Hauwa Bello',
    managerEmail: 'h.bello@cmaofoundation.org',
    managerPhone: '+234 803 456 7890',
    startDate: initialData?.startDate || '01 Jan 2025',
    endDate: initialData?.endDate || '31 Dec 2027',
    status: initialData?.status || 'Active',

    complianceVerified: true,
  });

  // Dynamic Add State Handlers
  const [newObjInput, setNewObjInput] = useState('');
  const [newPartnerInput, setNewPartnerInput] = useState({ name: '', role: '', tier: 'Strategic Government Partner' });
  const [newLocationInput, setNewLocationInput] = useState({ state: '', lga: '', hubName: '', pupilsCount: '' });
  const [newActivityInput, setNewActivityInput] = useState({ title: '', frequency: 'Termly', lead: 'Operations Unit', status: 'Scheduled' });
  const [newKpiInput, setNewKpiInput] = useState({ indicator: '', baseline: '0', target: '100', unit: 'Percentage' });
  const [newMediaInput, setNewMediaInput] = useState({ title: '', url: '/images/gallery_group_children.jpg', tag: 'Field Operations' });
  const [newDocInput, setNewDocInput] = useState({ title: '', type: 'PDF', category: 'Governance & Framework' });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Add Items
  const handleAddObjective = () => {
    if (!newObjInput.trim()) return;
    setFormData((prev) => ({ ...prev, objectivesList: [...prev.objectivesList, newObjInput.trim()] }));
    setNewObjInput('');
    toast.success('Objective added');
  };

  const handleRemoveObjective = (index) => {
    setFormData((prev) => ({
      ...prev,
      objectivesList: prev.objectivesList.filter((_, i) => i !== index),
    }));
  };

  const handleAddPartner = () => {
    if (!newPartnerInput.name.trim()) return;
    setFormData((prev) => ({
      ...prev,
      partners: [...prev.partners, { ...newPartnerInput, mouStatus: 'Signed & Valid' }],
    }));
    setNewPartnerInput({ name: '', role: '', tier: 'Strategic Government Partner' });
    toast.success('Partner added');
  };

  const handleRemovePartner = (index) => {
    setFormData((prev) => ({
      ...prev,
      partners: prev.partners.filter((_, i) => i !== index),
    }));
  };

  const handleAddLocation = () => {
    if (!newLocationInput.state.trim() || !newLocationInput.hubName.trim()) return;
    setFormData((prev) => ({
      ...prev,
      locationsList: [
        ...prev.locationsList,
        {
          state: newLocationInput.state,
          lga: newLocationInput.lga || 'Central',
          hubName: newLocationInput.hubName,
          schoolsCount: 4,
          pupilsCount: Number(newLocationInput.pupilsCount) || 500,
          leadCoordinator: formData.programmeManager || 'Field Coordinator',
          contact: '+234 800 000 0000',
          status: 'Fully Operational',
        },
      ],
    }));
    setNewLocationInput({ state: '', lga: '', hubName: '', pupilsCount: '' });
    toast.success('Location hub added');
  };

  const handleRemoveLocation = (index) => {
    setFormData((prev) => ({
      ...prev,
      locationsList: prev.locationsList.filter((_, i) => i !== index),
    }));
  };

  const handleAddActivity = () => {
    if (!newActivityInput.title.trim()) return;
    setFormData((prev) => ({
      ...prev,
      activities: [
        ...prev.activities,
        {
          ...newActivityInput,
          targetDate: 'Rolling',
          budgetShare: '15%',
        },
      ],
    }));
    setNewActivityInput({ title: '', frequency: 'Termly', lead: 'Operations Unit', status: 'Scheduled' });
    toast.success('Activity added');
  };

  const handleRemoveActivity = (index) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  };

  const handleAddKpi = () => {
    if (!newKpiInput.indicator.trim()) return;
    setFormData((prev) => ({
      ...prev,
      kpis: [
        ...prev.kpis,
        {
          ...newKpiInput,
          achieved: '0',
          status: 'On Track',
          trend: 'In Progress',
          verification: 'M&E Field Audited',
        },
      ],
    }));
    setNewKpiInput({ indicator: '', baseline: '0', target: '100', unit: 'Percentage' });
    toast.success('KPI added');
  };

  const handleRemoveKpi = (index) => {
    setFormData((prev) => ({
      ...prev,
      kpis: prev.kpis.filter((_, i) => i !== index),
    }));
  };

  const handleAddMedia = () => {
    if (!newMediaInput.title.trim()) return;
    setFormData((prev) => ({
      ...prev,
      mediaList: [
        ...prev.mediaList,
        {
          ...newMediaInput,
          date: 'Nov 2026',
          caption: `${newMediaInput.title} captured during field deployment.`,
        },
      ],
    }));
    setNewMediaInput({ title: '', url: '/images/gallery_group_children.jpg', tag: 'Field Operations' });
    toast.success('Media asset added');
  };

  const handleRemoveMedia = (index) => {
    setFormData((prev) => ({
      ...prev,
      mediaList: prev.mediaList.filter((_, i) => i !== index),
    }));
  };

  const handleAddDoc = () => {
    if (!newDocInput.title.trim()) return;
    setFormData((prev) => ({
      ...prev,
      documentsList: [
        ...prev.documentsList,
        {
          ...newDocInput,
          size: '2.5 MB',
          date: 'Nov 2026',
          version: 'v1.0',
          status: 'Approved',
        },
      ],
    }));
    setNewDocInput({ title: '', type: 'PDF', category: 'Governance & Framework' });
    toast.success('Document attached');
  };

  const handleRemoveDoc = (index) => {
    setFormData((prev) => ({
      ...prev,
      documentsList: prev.documentsList.filter((_, i) => i !== index),
    }));
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

    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final Submit: pass full dataset with all 8 dimensions
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

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. BREADCRUMB NAVIGATION
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
          2. 6-STEP PROGRESS TRACKER (Covers all 8 dimensions)
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="relative overflow-x-auto pb-1">
          <div className="min-w-[700px]">
            {/* Connecting Line */}
            <div className="absolute top-[18px] left-8 right-8 h-0.5 bg-slate-200 -z-0" />

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

                    <p
                      className={`text-xs mt-2 font-bold max-w-[110px] leading-tight ${
                        isCurrent ? 'text-[#06402B]' : isPassed ? 'text-slate-800' : 'text-slate-400'
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
          STEP 1: CORE OVERVIEW & STRATEGIC OBJECTIVES
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Briefcase size={18} className="text-[#06402B]" />
              <span>Core Initiative Overview & Strategic Objectives</span>
            </h2>
            <p className="text-xs text-slate-500">
              Establish the institutional title, thematic pillar, primary goal, and discrete strategic objectives.
            </p>
          </div>

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
                placeholder="e.g. School Support Programme / Clean Water & Community Resilience"
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
                  Target Beneficiary Group Profile <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.targetBeneficiaries}
                  onChange={(e) => handleInputChange('targetBeneficiaries', e.target.value)}
                  placeholder="e.g. Children (6–18 yrs), smallholder female farmers, rural households"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Strategic Objective & Executive Statement <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.objective}
                onChange={(e) => handleInputChange('objective', e.target.value)}
                placeholder="Detail the developmental problem, proposed field solution, key milestones, and verified target outcome for the community..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
              />
            </div>

            {/* Strategic Objectives List (Dimension 1) */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#0B2D6E] uppercase tracking-wider">
                    Discrete Strategic Objectives ({formData.objectivesList.length})
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Specific targets that will be tracked under the Objectives tab.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {formData.objectivesList.map((obj, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs font-medium text-slate-800">{obj}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveObjective(i)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Objective input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newObjInput}
                  onChange={(e) => setNewObjInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddObjective();
                    }
                  }}
                  placeholder="Add another strategic objective..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#06402B]"
                />
                <button
                  type="button"
                  onClick={handleAddObjective}
                  className="px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042A1D] text-white text-xs font-bold cursor-pointer shrink-0"
                >
                  + Add Objective
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 2: BUDGET & STRATEGIC DELIVERY PARTNERS
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <DollarSign size={18} className="text-[#06402B]" />
              <span>Capital Budget & Institutional Delivery Partners</span>
            </h2>
            <p className="text-xs text-slate-500">
              Define the approved capital expenditure, funding source, and strategic partners collaborating on delivery.
            </p>
          </div>

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

          {/* Strategic Partners (Dimension 5) */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-[#0B2D6E] uppercase tracking-wider">
              Strategic Delivery & Funding Partners ({formData.partners.length})
            </h3>

            <div className="space-y-2">
              {formData.partners.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-800">{p.name}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">
                        {p.tier}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Role: {p.role}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePartner(i)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Partner Form */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <input
                type="text"
                placeholder="Partner Organization Name"
                value={newPartnerInput.name}
                onChange={(e) => setNewPartnerInput({ ...newPartnerInput, name: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
              />
              <input
                type="text"
                placeholder="Collaboration Scope / Role"
                value={newPartnerInput.role}
                onChange={(e) => setNewPartnerInput({ ...newPartnerInput, role: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
              />
              <div className="flex items-center gap-2">
                <select
                  value={newPartnerInput.tier}
                  onChange={(e) => setNewPartnerInput({ ...newPartnerInput, tier: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                >
                  <option value="Strategic Government Partner">Government Partner</option>
                  <option value="Corporate CSR Co-Funder">Corporate Co-Funder</option>
                  <option value="Academic Partner">Academic Partner</option>
                  <option value="Technical Partner">Technical Partner</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddPartner}
                  className="px-3 py-2 rounded-xl bg-[#06402B] text-white font-bold cursor-pointer shrink-0"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 3: GEOGRAPHIC LOCATIONS & BENEFICIARIES REACH
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <MapPin size={18} className="text-[#06402B]" />
              <span>Geographic Locations & Beneficiary Footprint</span>
            </h2>
            <p className="text-xs text-slate-500">
              Specify deployment states, target communities, and registered field operating centers.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Target States & LGAs Summary <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.locations}
                onChange={(e) => handleInputChange('locations', e.target.value)}
                placeholder="e.g. Lagos, Kano, Oyo, Kaduna, Enugu"
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

            {/* Operating Hubs Breakdown (Dimension 4) */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-[#0B2D6E] uppercase tracking-wider">
                Operating Field Hubs & Centers ({formData.locationsList.length})
              </h3>

              <div className="space-y-2">
                {formData.locationsList.map((loc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{loc.hubName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                          {loc.state}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        LGA: {loc.lga} • Reach: {loc.pupilsCount} individuals
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveLocation(i)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Location Form */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1 text-xs">
                <input
                  type="text"
                  placeholder="State (e.g. Oyo State)"
                  value={newLocationInput.state}
                  onChange={(e) => setNewLocationInput({ ...newLocationInput, state: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
                <input
                  type="text"
                  placeholder="LGA Coverage"
                  value={newLocationInput.lga}
                  onChange={(e) => setNewLocationInput({ ...newLocationInput, lga: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
                <input
                  type="text"
                  placeholder="Hub / Center Name"
                  value={newLocationInput.hubName}
                  onChange={(e) => setNewLocationInput({ ...newLocationInput, hubName: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Enrolled Count"
                    value={newLocationInput.pupilsCount}
                    onChange={(e) => setNewLocationInput({ ...newLocationInput, pupilsCount: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                  />
                  <button
                    type="button"
                    onClick={handleAddLocation}
                    className="px-3 py-2 rounded-xl bg-[#06402B] text-white font-bold cursor-pointer shrink-0"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 4: ACTIVITIES & KPIS / OUTCOMES
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Calendar size={18} className="text-[#06402B]" />
              <span>Core Activities Schedule & Outcome KPIs</span>
            </h2>
            <p className="text-xs text-slate-500">
              Establish field implementation cadence and measurable developmental impact indicators.
            </p>
          </div>

          {/* Activities (Dimension 2) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#0B2D6E] uppercase tracking-wider">
              Core Activities & Implementation Schedule ({formData.activities.length})
            </h3>

            <div className="space-y-2">
              {formData.activities.map((act, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{act.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold">
                        {act.frequency}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Lead: {act.lead} • Status: {act.status}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveActivity(i)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Activity Form */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <input
                type="text"
                placeholder="Activity Title (e.g. Tutoring Sessions)"
                value={newActivityInput.title}
                onChange={(e) => setNewActivityInput({ ...newActivityInput, title: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
              />
              <select
                value={newActivityInput.frequency}
                onChange={(e) => setNewActivityInput({ ...newActivityInput, frequency: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
              >
                <option value="Weekly">Weekly</option>
                <option value="Termly">Termly</option>
                <option value="Bi-annual">Bi-annual</option>
                <option value="Monthly">Monthly</option>
                <option value="Annual">Annual</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Lead Unit"
                  value={newActivityInput.lead}
                  onChange={(e) => setNewActivityInput({ ...newActivityInput, lead: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
                <button
                  type="button"
                  onClick={handleAddActivity}
                  className="px-3 py-2 rounded-xl bg-[#06402B] text-white font-bold cursor-pointer shrink-0"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Outcome KPIs (Dimension 6) */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-[#0B2D6E] uppercase tracking-wider">
              Outcome KPIs & Target Milestones ({formData.kpis.length})
            </h3>

            <div className="space-y-2">
              {formData.kpis.map((kpi, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-800">{kpi.indicator}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Baseline: {kpi.baseline} → Target: {kpi.target} ({kpi.unit})
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveKpi(i)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add KPI Form */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <input
                type="text"
                placeholder="Indicator (e.g. Net Retention Rate)"
                value={newKpiInput.indicator}
                onChange={(e) => setNewKpiInput({ ...newKpiInput, indicator: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
              />
              <input
                type="text"
                placeholder="Baseline (e.g. 40%)"
                value={newKpiInput.baseline}
                onChange={(e) => setNewKpiInput({ ...newKpiInput, baseline: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
              />
              <input
                type="text"
                placeholder="Target Goal (e.g. 85%)"
                value={newKpiInput.target}
                onChange={(e) => setNewKpiInput({ ...newKpiInput, target: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Unit (e.g. Pupils)"
                  value={newKpiInput.unit}
                  onChange={(e) => setNewKpiInput({ ...newKpiInput, unit: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                />
                <button
                  type="button"
                  onClick={handleAddKpi}
                  className="px-3 py-2 rounded-xl bg-[#06402B] text-white font-bold cursor-pointer shrink-0"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 5: MEDIA ASSETS & GOVERNANCE DOCUMENTS
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <ImageIcon size={18} className="text-[#06402B]" />
              <span>Media Assets, Documents & Accountability</span>
            </h2>
            <p className="text-xs text-slate-500">
              Attach field photography, project charters, legal MoUs, and designate the lead manager.
            </p>
          </div>

          {/* Media Assets (Dimension 7) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#0B2D6E] uppercase tracking-wider">
              Field Media Gallery Assets ({formData.mediaList.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formData.mediaList.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                >
                  <img
                    src={m.url}
                    alt={m.title}
                    className="w-12 h-12 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">{m.title}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      {m.tag}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMedia(i)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Media Input */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <input
                type="text"
                placeholder="Photo Title / Description"
                value={newMediaInput.title}
                onChange={(e) => setNewMediaInput({ ...newMediaInput, title: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newMediaInput.url}
                onChange={(e) => setNewMediaInput({ ...newMediaInput, url: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
              />
              <div className="flex items-center gap-2">
                <select
                  value={newMediaInput.tag}
                  onChange={(e) => setNewMediaInput({ ...newMediaInput, tag: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                >
                  <option value="Field Operations">Field Operations</option>
                  <option value="Community">Community</option>
                  <option value="Distribution">Distribution</option>
                  <option value="Training">Training</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddMedia}
                  className="px-3 py-2 rounded-xl bg-[#06402B] text-white font-bold cursor-pointer shrink-0"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Governance Documents (Dimension 8) */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-[#0B2D6E] uppercase tracking-wider">
              Governance & Audit Documents ({formData.documentsList.length})
            </h3>

            <div className="space-y-2">
              {formData.documentsList.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded bg-rose-100 text-rose-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                      {doc.type}
                    </span>
                    <div>
                      <p className="font-bold text-slate-800">{doc.title}</p>
                      <span className="text-[10px] text-slate-400">{doc.category}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveDoc(i)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Document Input */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <input
                type="text"
                placeholder="Document Title (e.g. M&E Framework)"
                value={newDocInput.title}
                onChange={(e) => setNewDocInput({ ...newDocInput, title: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
              />
              <select
                value={newDocInput.category}
                onChange={(e) => setNewDocInput({ ...newDocInput, category: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
              >
                <option value="Governance & Framework">Governance & Framework</option>
                <option value="Institutional MoU">Institutional MoU</option>
                <option value="Monitoring & Evaluation">Monitoring & Evaluation</option>
                <option value="Financial Audit">Financial Audit</option>
              </select>
              <div className="flex items-center gap-2">
                <select
                  value={newDocInput.type}
                  onChange={(e) => setNewDocInput({ ...newDocInput, type: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
                >
                  <option value="PDF">PDF</option>
                  <option value="XLSX">XLSX</option>
                  <option value="DOCX">DOCX</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddDoc}
                  className="px-3 py-2 rounded-xl bg-[#06402B] text-white font-bold cursor-pointer shrink-0"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Lead Manager & Operational Dates */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Lead Programme Manager *</label>
              <input
                type="text"
                value={formData.programmeManager}
                onChange={(e) => handleInputChange('programmeManager', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:outline-none focus:border-[#06402B]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Start Date</label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target End Date</label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#06402B]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 6: REVIEW & INSTITUTIONAL AUTHORIZATION (ALL 8 DIMS)
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 6 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Shield size={18} className="text-[#06402B]" />
              <span>Comprehensive 8-Dimension Dossier Review</span>
            </h2>
            <p className="text-xs text-slate-500">
              Confirm that all 8 operational sub-tabs have been populated with governance integrity.
            </p>
          </div>

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

            {/* 8 Dimensions Check-off Grid */}
            <div className="pt-3 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Objectives</span>
                <p className="font-black text-[#0B2D6E] text-sm">{formData.objectivesList.length} Defined</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Activities</span>
                <p className="font-black text-[#0B2D6E] text-sm">{formData.activities.length} Scheduled</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Operating Hubs</span>
                <p className="font-black text-[#0B2D6E] text-sm">{formData.locationsList.length} Field Hubs</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Delivery Partners</span>
                <p className="font-black text-[#0B2D6E] text-sm">{formData.partners.length} Attached</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Outcome KPIs</span>
                <p className="font-black text-[#0B2D6E] text-sm">{formData.kpis.length} Indicators</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Media Assets</span>
                <p className="font-black text-[#0B2D6E] text-sm">{formData.mediaList.length} Photos</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Documents</span>
                <p className="font-black text-[#0B2D6E] text-sm">{formData.documentsList.length} Charters/MoUs</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Beneficiaries</span>
                <p className="font-black text-emerald-800 text-sm">Target {formData.beneficiariesCount}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Objective Statement</span>
              <p className="text-slate-600 leading-relaxed font-medium">{formData.objective || 'N/A'}</p>
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
              <span className="font-bold text-[#06402B]">Institutional Governance Sign-off:</span> I confirm that all
              8 sub-tabs (Objectives, Activities, Beneficiaries, Locations, Partners, KPIs & Outcomes, Media, Documents)
              have been populated in accordance with CMAOF standards.
            </label>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM ACTION BAR
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
            onClick={() => toast.success('Programme parameters saved as local draft!')}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2D6E] hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
          >
            <span>{currentStep === 6 ? (isEditing ? 'Save Changes' : 'Confirm & Launch Programme') : 'Next'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgrammeRegistrationSection;
