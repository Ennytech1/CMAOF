import React, { useState } from 'react';
import { X, CheckCircle2, FileText, UserPlus, CalendarPlus, FolderPlus } from 'lucide-react';
import toast from 'react-hot-toast';

export const EditProfileModal = ({ isOpen, onClose, beneficiary, onSave }) => {
  const [formData, setFormData] = useState({
    name: beneficiary?.name || '',
    phone: beneficiary?.phone || '',
    address: beneficiary?.address || '',
    school: beneficiary?.school || '',
    guardian: beneficiary?.guardian || '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    toast.success(`Profile for ${formData.name || beneficiary.name} updated!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-black text-[#0B2D6E]">Edit Beneficiary Profile</h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 pt-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Residential Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">School / Institution</label>
            <input
              type="text"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Guardian / Primary Contact</label>
            <input
              type="text"
              value={formData.guardian}
              onChange={(e) => setFormData({ ...formData, guardian: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#06402B] text-white font-bold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const RegisterInterventionModal = ({ isOpen, onClose, beneficiary }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FolderPlus className="text-[#06402B]" size={20} />
            <h3 className="text-base font-black text-[#0B2D6E]">Register Intervention</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3 pt-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Intervention Category</label>
            <select className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white">
              <option>Tuition & Scholastic Support</option>
              <option>Medical Treatment Grant</option>
              <option>Nutrition & Sustenance Kit</option>
              <option>Vocational & Digital Skills Fellowship</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Estimated Approved Amount (₦)</label>
            <input type="text" defaultValue="₦180,000" className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Disbursement Vendor / School</label>
            <input type="text" defaultValue={beneficiary?.school || 'Ajegunle Primary School'} className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                toast.success('Intervention registered and queued for finance disbursement.');
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-[#06402B] text-white font-bold"
            >
              Approve Intervention
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
