import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterBeneficiaryModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    pillar: 'Education',
    location: 'Lagos',
    status: 'Active',
    phone: '',
    gender: 'Female',
    intervention: '',
  });

  // Body scroll lock and Escape key listener
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Please enter the beneficiary full name');
      return;
    }

    onSave(formData);
    setFormData({
      name: '',
      pillar: 'Education',
      location: 'Lagos',
      status: 'Active',
      phone: '',
      gender: 'Female',
      intervention: '',
    });
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-[#0B2D6E]">Register New Beneficiary</h3>
            <p className="text-xs text-slate-500">Add an individual to the CMAOF foundation database.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Oluwaseun Adeleke"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:border-[#06402B]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Programme Pillar</label>
              <select
                value={formData.pillar}
                onChange={(e) => setFormData({ ...formData, pillar: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:border-[#06402B] cursor-pointer"
              >
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Community">Community</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Location / State</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:border-[#06402B] cursor-pointer"
              >
                <option value="Kaduna">Kaduna</option>
                <option value="Lagos">Lagos</option>
                <option value="Oyo">Oyo</option>
                <option value="Enugu">Enugu</option>
                <option value="Kano">Kano</option>
                <option value="Abuja">Abuja</option>
                <option value="Imo">Imo</option>
                <option value="Sokoto">Sokoto</option>
                <option value="Rivers">Rivers</option>
                <option value="Delta">Delta</option>
                <option value="Ondo">Ondo (Ilara-Mokin)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 800 000 0000"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:border-[#06402B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Initial Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:border-[#06402B] cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Assessment">Assessment</option>
                <option value="Approved">Approved</option>
                <option value="New">New</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Approved Intervention Details</label>
            <textarea
              rows={2}
              value={formData.intervention}
              onChange={(e) => setFormData({ ...formData, intervention: e.target.value })}
              placeholder="e.g. Tertiary tuition scholarship or medical intervention"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:border-[#06402B]"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <UserPlus size={14} />
              <span>Save Beneficiary</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default RegisterBeneficiaryModal;
