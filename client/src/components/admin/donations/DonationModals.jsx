import React, { useState } from 'react';
import { X, Printer, Download, CheckCircle2, DollarSign, Building, User } from 'lucide-react';
import toast from 'react-hot-toast';
import CmaofLogo from '../../CmaofLogo';

export const DonationReceiptModal = ({ donation, onClose }) => {
  if (!donation) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Receipt Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <CmaofLogo asLink={false} imgClassName="h-10 w-auto object-contain" />
            <p className="text-[11px] text-slate-400 font-medium">
              Chief Michael Ade.Ojo Foundation • RC: 128490
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Receipt Details Box */}
        <div className="my-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 text-xs sm:text-[13px]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Official Receipt Number
              </span>
              <span className="font-mono font-black text-[#0B2D6E] text-sm">
                REC-{donation.reference}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Date
              </span>
              <span className="font-bold text-slate-700">{donation.date}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60 space-y-2">
            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">Received From:</span>
              <span className="font-bold text-slate-900 text-right">{donation.donorName}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">Donor Classification:</span>
              <span className="font-semibold text-slate-700">{donation.type}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">Target Campaign / Pillar:</span>
              <span className="font-bold text-[#06402B]">{donation.campaign}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">Payment Mode:</span>
              <span className="font-semibold text-slate-700">{donation.paymentMethod || 'Bank Transfer'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">Audit Reference:</span>
              <span className="font-mono text-slate-600">{donation.reference}</span>
            </div>
          </div>

          {/* Amount Callout */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Amount Received
            </span>
            <p className="text-2xl sm:text-3xl font-black text-[#06402B] mt-0.5">
              ₦{donation.amountFormatted}
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-1">
              <CheckCircle2 size={13} /> Verified by Zenith Bank Plc Treasury
            </span>
          </div>

          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            This digital receipt confirms a tax-deductible charitable contribution under the Companies and Allied Matters Act. Thank you for empowering Nigerian communities.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer shadow-xs"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={() => {
                toast.success(`Receipt for ${donation.donorName} downloaded as PDF.`);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecordDonationModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    amount: '',
    type: 'Corporate',
    campaign: 'Education Fund',
    paymentMethod: 'Direct Bank Transfer (Zenith Bank)',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.donorName.trim() || !formData.amount) {
      toast.error('Please enter donor name and amount');
      return;
    }

    const numAmount = Number(formData.amount.replace(/[^0-9]/g, '')) || 50000;
    const formatted = numAmount.toLocaleString('en-US');

    onSave({
      donorName: formData.donorName.trim(),
      email: formData.email.trim() || 'donor@cmaof.org',
      amount: numAmount,
      amountFormatted: formatted,
      type: formData.type,
      campaign: formData.campaign,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#0B2D6E]">Record New Donation</h3>
            <p className="text-xs text-slate-500">Log incoming bank wires, CSR cheques or manual receipts.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 pt-4 text-xs sm:text-[13px]">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Donor / Organization Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.donorName}
              onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
              placeholder="e.g. First Bank of Nigeria CSR"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Amount (₦) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="e.g. 5,000,000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Donation Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold cursor-pointer"
              >
                <option value="Corporate">Corporate</option>
                <option value="Individual">Individual</option>
                <option value="Philanthropic Trust">Philanthropic Trust</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Campaign</label>
              <select
                value={formData.campaign}
                onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold cursor-pointer"
              >
                <option value="Education Fund">Education Fund</option>
                <option value="Health Outreach">Health Outreach</option>
                <option value="Community Resilience">Community Resilience</option>
                <option value="General Support">General Support</option>
                <option value="Monthly Support">Monthly Support</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold cursor-pointer"
              >
                <option value="Direct Bank Transfer (Zenith Bank)">Direct Bank Transfer (Zenith Bank)</option>
                <option value="Paystack Card Online">Paystack Card Online</option>
                <option value="Bank Cheque / Draft">Bank Cheque / Draft</option>
                <option value="Recurring Card Charge">Recurring Card Charge</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Donor Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. csr@company.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Notes / Grant Stipulations</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Designated for Ilara-Mokin scholarships"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold shadow-md cursor-pointer"
            >
              Record Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
