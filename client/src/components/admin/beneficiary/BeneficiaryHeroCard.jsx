import React from 'react';
import {
  GraduationCap,
  User,
  Users,
  Calendar,
  MapPin,
  Phone,
  Lock,
  Edit2,
  Printer,
  ChevronDown,
  Sparkles,
  Award,
} from 'lucide-react';
import toast from 'react-hot-toast';

const BeneficiaryHeroCard = ({
  beneficiary,
  onEditProfile,
  onPrint,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5">
      {/* Top Identity Block */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
        
        {/* Left: Avatar + Details */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 flex-1">
          {/* Large Photo */}
          <div className="relative shrink-0">
            <img
              src={beneficiary.photo || '/images/banner_schoolgirl.jpg'}
              alt={beneficiary.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-slate-100 shadow-sm"
            />
          </div>

          {/* Core Info */}
          <div className="space-y-2 flex-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0B2D6E] tracking-tight">
                {beneficiary.name}
              </h1>
              <p className="text-xs sm:text-sm font-mono font-bold text-slate-500 mt-0.5">
                {beneficiary.code}
              </p>
            </div>

            {/* Badges Row matching Image 3 */}
            <div className="flex items-center gap-2 flex-wrap pt-0.5">
              {/* Type Badge (Student) */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200/80">
                <GraduationCap size={13} className="text-sky-600" />
                <span>{beneficiary.type || beneficiary.tag || 'Student'}</span>
              </span>

              {/* Gender Badge (Female) */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80">
                <User size={13} className="text-rose-600" />
                <span>{beneficiary.gender || 'Female'}</span>
              </span>

              {/* Age Badge (16 years) */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                <Users size={13} className="text-slate-500" />
                <span>{beneficiary.age || '16 years'}</span>
              </span>

              {/* Status Badge (Active) */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>{beneficiary.status || 'Active'}</span>
              </span>

              {/* Pillar Badge with Tagline */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200/80">
                <Award size={13} className="text-teal-700" />
                <span>{beneficiary.pillarFull || 'Education & Human Capital'}</span>
                {beneficiary.pillarTagline && (
                  <span className="text-[10px] text-teal-600 font-normal border-l border-teal-300 pl-1.5 ml-0.5">
                    {beneficiary.pillarTagline}
                  </span>
                )}
              </span>
            </div>

            {/* Contact & Registration Metadata */}
            <div className="flex items-center gap-4 flex-wrap pt-1 text-xs text-slate-600 font-semibold">
              <div className="flex items-center gap-1.5">
                <Phone size={13} className="text-slate-400" />
                <span className="font-mono">{beneficiary.phone || '0803 123 4567'}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-slate-400" />
                <span>{beneficiary.fullLocation || `${beneficiary.location}, ${beneficiary.state || 'State'}`}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar size={13} className="text-slate-400" />
                <span>Registered: {beneficiary.dateRegistered || '06 Oct 2026'}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <User size={13} className="text-slate-400" />
                <span>Assigned Officer: <strong className="text-slate-800">{beneficiary.assignedOfficer || 'Hauwa Bello'}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sensitive Information Warning Box matching Image 3 */}
        <div className="w-full xl:w-80 p-3.5 sm:p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs space-y-1.5 shrink-0">
          <div className="flex items-center gap-2 font-bold text-amber-800">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
              <Lock size={13} />
            </span>
            <span>Sensitive Information</span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-800/90 font-medium">
            This record contains sensitive personal information. Access is restricted based on user role.
          </p>
        </div>

      </div>
    </div>
  );
};

export default BeneficiaryHeroCard;
