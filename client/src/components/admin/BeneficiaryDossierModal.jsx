import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, MapPin, Phone, Calendar, Award, CheckCircle2, Shield } from 'lucide-react';

export const getPillarBadge = (pillar) => {
  switch (pillar?.toLowerCase()) {
    case 'education':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200/80';
    case 'health':
      return 'bg-rose-50 text-rose-600 border border-rose-200/80';
    case 'community':
      return 'bg-amber-50 text-amber-700 border border-amber-200/80';
    default:
      return 'bg-slate-50 text-slate-700 border border-slate-200';
  }
};

export const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-emerald-100 text-emerald-800 font-bold';
    case 'assessment':
      return 'bg-amber-100 text-amber-800 font-bold';
    case 'approved':
      return 'bg-blue-100 text-blue-800 font-bold';
    case 'follow-up':
      return 'bg-orange-100 text-orange-800 font-bold';
    case 'outcome measured':
      return 'bg-sky-100 text-sky-800 font-bold';
    case 'new':
      return 'bg-purple-100 text-purple-800 font-bold';
    case 'closed':
      return 'bg-slate-100 text-slate-700 font-bold';
    default:
      return 'bg-slate-100 text-slate-800 font-bold';
  }
};

const BeneficiaryDossierModal = ({ beneficiary, onClose }) => {
  // Body scroll lock and Escape key listener
  useEffect(() => {
    if (beneficiary) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [beneficiary, onClose]);

  if (!beneficiary || typeof document === 'undefined') return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Profile Section */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <img
              src={beneficiary.photo}
              alt={beneficiary.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-700/20 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-[#0B2D6E]">{beneficiary.name}</h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  <Shield size={11} /> Verified
                </span>
              </div>
              <p className="text-xs font-mono font-semibold text-slate-500 mt-0.5">
                ID: {beneficiary.code}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close Dossier"
          >
            <X size={18} />
          </button>
        </div>

        {/* Detailed Fields */}
        <div className="space-y-3.5 py-4 text-xs sm:text-[13px]">
          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Programme Pillar
              </span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getPillarBadge(beneficiary.pillar)}`}>
                {beneficiary.pillar}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Lifecycle Status
              </span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusBadge(beneficiary.status)}`}>
                {beneficiary.status}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-medium flex items-center gap-2">
              <MapPin size={14} className="text-slate-400" /> Location / State
            </span>
            <span className="font-bold text-slate-800">{beneficiary.location}, Nigeria</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-medium flex items-center gap-2">
              <Phone size={14} className="text-slate-400" /> Phone Contact
            </span>
            <span className="font-mono font-semibold text-slate-800">{beneficiary.phone}</span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500 font-medium flex items-center gap-2">
              <Calendar size={14} className="text-slate-400" /> Date Registered
            </span>
            <span className="font-bold text-slate-800">{beneficiary.dateRegistered}</span>
          </div>

          <div className="pt-2">
            <span className="text-slate-500 font-semibold block mb-1.5 flex items-center gap-1.5">
              <Award size={14} className="text-emerald-700" /> Approved Foundation Intervention
            </span>
            <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-slate-800 font-medium text-xs leading-relaxed">
              {beneficiary.intervention || 'Field outreach assessment and community development program grant.'}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <CheckCircle2 size={13} className="text-emerald-600" /> Synchronized with CMAOF Core
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BeneficiaryDossierModal;
