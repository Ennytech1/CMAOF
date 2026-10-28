import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Upload,
  Calendar,
  User,
  Check,
  CheckCircle2,
  Save,
  Shield,
  FileText,
  DollarSign,
  Heart,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 1, label: 'Personal Details' },
  { id: 2, label: 'Household & Location' },
  { id: 3, label: 'Needs Assessment' },
  { id: 4, label: 'Programme & Eligibility' },
  { id: 5, label: 'Consent & Documents' },
  { id: 6, label: 'Review & Submit' },
];

const BeneficiaryRegistrationSection = ({ onSave, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: '',
    dob: '',
    gender: '',
    beneficiaryType: '',
    phone: '',
    email: '',
    photoPreview: null,

    // Step 1: Additional Information
    nationality: 'Nigeria',
    state: '',
    lga: '',
    community: '',

    // Step 2: Household & Location
    address: '',
    householdSize: '4',
    guardianName: '',
    guardianPhone: '',
    householdIncome: 'Low-income',

    // Step 3: Needs Assessment
    schoolStatus: 'Enrolled',
    currentClass: 'Primary 5',
    academicPerformance: 'Average',
    priorityLevel: 'High',
    needsNotes: '',

    // Step 4: Programme & Eligibility
    pillar: 'Education',
    programme: 'School Support Programme',
    grantEstimated: '180,000',

    // Step 5: Consent
    consentSigned: true,
    idType: 'National ID (NIN)',
    idNumber: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photoPreview: url }));
      toast.success('Beneficiary photo uploaded!');
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        toast.error('Please enter beneficiary full name');
        return;
      }
    }
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Final Submit
      if (onSave) {
        onSave({
          name: formData.fullName,
          age: formData.dob ? String(new Date().getFullYear() - parseInt(formData.dob.slice(-4))) || '16' : '16',
          gender: formData.gender || 'Female',
          pillar: formData.pillar || 'Education',
          type: formData.beneficiaryType || 'Individual',
          location: `${formData.lga || 'Ikeja'}, ${formData.state || 'Lagos'}`,
          phone: formData.phone || '+234 800 000 0000',
          status: 'Active',
          intervention: formData.programme || 'School Support Programme',
        });
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSaveDraft = () => {
    toast.success('Registration draft saved to session.');
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. BREADCRUMB NAVIGATION (Matches Screenshot 1)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-500">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1.5 hover:text-[#06402B] text-sky-600 transition-colors cursor-pointer"
          >
            <Home size={15} className="text-sky-600" />
            <span className="font-semibold text-sky-600">Beneficiaries</span>
          </button>
          <ChevronRight size={13} className="text-slate-300" />
          <span className="font-bold text-[#0B2D6E]">Register New Beneficiary</span>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#06402B] transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Directory</span>
          </button>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. 6-STEP PROGRESS TRACKER (Matches Screenshot 1)
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
                    onClick={() => setCurrentStep(step.id)}
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
          STEP 1: PERSONAL DETAILS (Matches First Screenshot Exact Layout)
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
          {/* Card 1: Personal Information */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Form Inputs (9 Cols) */}
              <div className="lg:col-span-9 space-y-4">
                {/* Row 1: Full Name, Date of Birth, Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter full name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Date of Birth <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.dob}
                        onChange={(e) => handleInputChange('dob', e.target.value)}
                        placeholder="DD/MM/YYYY"
                        className="w-full pl-3.5 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                      />
                      <Calendar
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Gender <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] cursor-pointer"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Beneficiary Type & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Beneficiary Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.beneficiaryType}
                      onChange={(e) => handleInputChange('beneficiaryType', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] cursor-pointer"
                    >
                      <option value="">Select type</option>
                      <option value="Individual">Individual</option>
                      <option value="Student">Student</option>
                      <option value="Youth (Fellow)">Youth (Fellow)</option>
                      <option value="Household">Household</option>
                      <option value="Vulnerable Elderly">Vulnerable Elderly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                    />
                  </div>
                </div>

                {/* Row 3: Email Address (if any) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address (if any)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                  />
                </div>
              </div>

              {/* Right Photo Upload Box (3 Cols) */}
              <div className="lg:col-span-3 flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 text-center">
                <div className="w-24 h-24 rounded-full bg-slate-200/80 flex items-center justify-center text-slate-400 overflow-hidden ring-4 ring-white shadow-xs mb-3">
                  {formData.photoPreview ? (
                    <img
                      src={formData.photoPreview}
                      alt="Uploaded avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={44} className="text-slate-400" />
                  )}
                </div>

                <label className="cursor-pointer">
                  <span className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-[#06402B] bg-white hover:bg-emerald-50 text-[#06402B] font-bold text-xs shadow-xs transition-colors">
                    Upload Photo
                  </span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-slate-400 mt-1.5">JPG, PNG (Max 2MB)</p>
              </div>
            </div>
          </div>

          {/* Card 2: Additional Information */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight">
              Additional Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nationality
                </label>
                <select
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] cursor-pointer"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  State <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] cursor-pointer"
                >
                  <option value="">Select</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Enugu">Enugu</option>
                  <option value="Kano">Kano</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Ondo">Ondo</option>
                  <option value="Rivers">Rivers</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  LGA <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.lga}
                  onChange={(e) => handleInputChange('lga', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] cursor-pointer"
                >
                  <option value="">Select</option>
                  <option value="Ajeromi-Ifelodun">Ajeromi-Ifelodun</option>
                  <option value="Lagos Island">Lagos Island</option>
                  <option value="Ikeja">Ikeja</option>
                  <option value="Zaria">Zaria</option>
                  <option value="Ibadan North">Ibadan North</option>
                  <option value="Ilara-Mokin LGA">Ilara-Mokin LGA</option>
                  <option value="Dawakin Kudu">Dawakin Kudu</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Community <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.community}
                  onChange={(e) => handleInputChange('community', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] cursor-pointer"
                >
                  <option value="">Select</option>
                  <option value="Ajegunle Central">Ajegunle Central</option>
                  <option value="Ilara-Mokin">Ilara-Mokin</option>
                  <option value="Zaria North">Zaria North</option>
                  <option value="Bodija">Bodija</option>
                  <option value="Bichi Village">Bichi Village</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 2: HOUSEHOLD & LOCATION
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
          <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight">
            Household Context & Residential Location
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1.5">Residential Street Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="e.g. 14 Boundary Road, Ajegunle, Lagos"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#06402B]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Household Size (Persons)</label>
              <input
                type="number"
                value={formData.householdSize}
                onChange={(e) => handleInputChange('householdSize', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#06402B]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Household Estimated Income Level</label>
              <select
                value={formData.householdIncome}
                onChange={(e) => handleInputChange('householdIncome', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#06402B]"
              >
                <option value="Extremely Low (Below Poverty Line)">Extremely Low (Below Poverty Line)</option>
                <option value="Low-income">Low-income</option>
                <option value="Lower-Middle">Lower-Middle</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Parent / Guardian Full Name</label>
              <input
                type="text"
                value={formData.guardianName}
                onChange={(e) => handleInputChange('guardianName', e.target.value)}
                placeholder="e.g. Mary Mohammed"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#06402B]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Guardian Phone Number</label>
              <input
                type="tel"
                value={formData.guardianPhone}
                onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                placeholder="+234 800 000 0000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#06402B]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 3: NEEDS ASSESSMENT
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
          <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight">
            Vulnerability & Needs Assessment
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Education / Enrollment Status</label>
              <select
                value={formData.schoolStatus}
                onChange={(e) => handleInputChange('schoolStatus', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#06402B]"
              >
                <option value="Enrolled">Currently Enrolled</option>
                <option value="Out of School">Out of School (At Risk)</option>
                <option value="Completed Secondary">Completed Secondary</option>
                <option value="Tertiary Undergraduate">Tertiary Undergraduate</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Priority Level</label>
              <select
                value={formData.priorityLevel}
                onChange={(e) => handleInputChange('priorityLevel', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#06402B]"
              >
                <option value="Critical">Critical Priority (Immediate)</option>
                <option value="High">High Priority</option>
                <option value="Standard">Standard Assessment</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1.5">Field Officer Needs Notes</label>
              <textarea
                rows={3}
                value={formData.needsNotes}
                onChange={(e) => handleInputChange('needsNotes', e.target.value)}
                placeholder="Key vulnerability factors, family socio-economic status, special healthcare needs..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#06402B] resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 4: PROGRAMME & ELIGIBILITY
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
          <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight">
            Assigned Programme & Intervention Package
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Strategic Pillar</label>
              <select
                value={formData.pillar}
                onChange={(e) => handleInputChange('pillar', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#06402B]"
              >
                <option value="Education">Education & Human Capital</option>
                <option value="Health">Health & Well-being</option>
                <option value="Community">Community Resilience</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Target Intervention</label>
              <input
                type="text"
                value={formData.programme}
                onChange={(e) => handleInputChange('programme', e.target.value)}
                placeholder="e.g. Tertiary STEM Scholarship or Free Cataract Surgery"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#06402B]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Estimated Grant Support (₦)</label>
              <input
                type="text"
                value={formData.grantEstimated}
                onChange={(e) => handleInputChange('grantEstimated', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#06402B]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 5: CONSENT & DOCUMENTS
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
          <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight">
            Safeguarding Consent & Verification Documentation
          </h2>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Identification Document Type</label>
                <select
                  value={formData.idType}
                  onChange={(e) => handleInputChange('idType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#06402B]"
                >
                  <option value="National ID (NIN)">National ID (NIN)</option>
                  <option value="Birth Certificate / Declaration">Birth Certificate / Declaration</option>
                  <option value="School ID Card">School ID Card</option>
                  <option value="Community Leader Endorsement">Community Leader Endorsement</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">ID / Reference Number</label>
                <input
                  type="text"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange('idNumber', e.target.value)}
                  placeholder="e.g. NIN-9284102849"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#06402B]"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentSigned}
                  onChange={(e) => handleInputChange('consentSigned', e.target.checked)}
                  className="mt-0.5 accent-[#06402B] w-4 h-4"
                />
                <span className="text-slate-700 font-medium leading-relaxed">
                  I confirm that the beneficiary (or their legal guardian) has provided informed consent for biometric data collection, profiling, and monitoring in compliance with the Nigeria Data Protection Regulation (NDPR) and CMAOF Safeguarding Charter.
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 6: REVIEW & SUBMIT
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 6 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
          <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight">
            Review Beneficiary Profile & Confirm Registration
          </h2>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-500 overflow-hidden shrink-0 ring-4 ring-white shadow-xs">
                {formData.photoPreview ? (
                  <img src={formData.photoPreview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User size={32} className="m-auto mt-3 text-slate-400" />
                )}
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">{formData.fullName || 'Untitled Beneficiary'}</h3>
                <p className="text-xs text-slate-500">
                  {formData.beneficiaryType || 'Individual'} • {formData.gender || 'Not specified'} • DOB: {formData.dob || 'N/A'}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-[#06402B]">
                  Pillar: {formData.pillar}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-3 border-t border-slate-200/80">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Location</span>
                <span className="font-bold text-slate-800">{formData.lga || 'Ikeja'}, {formData.state || 'Lagos'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Phone</span>
                <span className="font-bold text-slate-800">{formData.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Intervention</span>
                <span className="font-bold text-slate-800">{formData.programme}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Priority</span>
                <span className="font-bold text-emerald-600">{formData.priorityLevel}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM ACTION BAR (Matches Screenshot 1)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-2">
        <div>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrev}
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
            <span>{currentStep === 6 ? 'Confirm & Register' : 'Next'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryRegistrationSection;
