import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const DonateModal = ({ isOpen, onClose }) => {
  const [frequency, setFrequency] = useState('one-time');
  const [amount, setAmount] = useState('25000');
  const [customAmount, setCustomAmount] = useState('');
  const [pillar, setPillar] = useState('general');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorInfo, setDonorInfo] = useState({ name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const presetAmounts = ['5000', '10000', '25000', '50000', '100000'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = amount === 'custom' ? customAmount : amount;
    if (!finalAmount || Number(finalAmount) <= 0) {
      toast.error('Please enter a valid donation amount.');
      return;
    }
    setIsSubmitted(true);
    toast.success('Thank you for initiating your donation to CMAOF!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X size={22} />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Modal Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-[#F59E0B] flex items-center justify-center mx-auto">
                <Heart size={24} className="fill-amber-500" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#0D1B2A]">
                Support CMAOF Initiatives
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                Your contribution directly creates pathways for education, healthcare, and community resilience in Nigeria.
              </p>
            </div>

            {/* Frequency Toggle */}
            <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-full text-xs font-bold">
              <button
                type="button"
                onClick={() => setFrequency('one-time')}
                className={`py-2 rounded-full transition-all ${
                  frequency === 'one-time'
                    ? 'bg-[#0F4C3A] text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                One-Time Giving
              </button>
              <button
                type="button"
                onClick={() => setFrequency('recurring')}
                className={`py-2 rounded-full transition-all ${
                  frequency === 'recurring'
                    ? 'bg-[#0F4C3A] text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Partner
              </button>
            </div>

            {/* Select Purpose / Pillar */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Designate Purpose
              </label>
              <select
                value={pillar}
                onChange={(e) => setPillar(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <option value="general">Where Need is Greatest (General Endowment)</option>
                <option value="education">Education & Human Capital (Scholarships & Schools)</option>
                <option value="health">Health & Well-being (Maternal & Community Clinics)</option>
                <option value="community">Community Resilience (Clean Water & Food Security)</option>
              </select>
            </div>

            {/* Amount Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Select Amount (₦ NGN)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-sm font-bold transition-all ${
                      amount === amt
                        ? 'border-[#0F4C3A] bg-emerald-50 text-[#0F4C3A] shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    ₦{Number(amt).toLocaleString()}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setAmount('custom')}
                  className={`py-2.5 px-3 rounded-xl border text-sm font-bold transition-all ${
                    amount === 'custom'
                      ? 'border-[#0F4C3A] bg-emerald-50 text-[#0F4C3A]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Custom
                </button>
              </div>

              {amount === 'custom' && (
                <div className="pt-1">
                  <input
                    type="number"
                    placeholder="Enter custom amount in ₦"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    required
                  />
                </div>
              )}
            </div>

            {/* Donor Information */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Donor Information
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={donorInfo.name}
                  onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  required={!isAnonymous}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={donorInfo.email}
                  onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anon"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-700"
                />
                <label htmlFor="anon" className="text-xs text-slate-600 font-medium cursor-pointer">
                  Make this an anonymous donation
                </label>
              </div>
            </div>

            {/* Submit Button & Security Guarantee */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white py-3.5 rounded-full font-bold text-base shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Heart size={18} className="fill-white/30" />
                <span>Complete Donation — ₦{Number(amount === 'custom' ? customAmount || 0 : amount).toLocaleString()}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Lock size={14} className="text-emerald-700" />
                <span>256-bit SSL Encrypted Secure Philanthropic Transaction</span>
              </div>
            </div>

          </form>
        ) : (
          /* Success Receipt View */
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0F4C3A] flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-[#0D1B2A]">
                Donation Received with Thanks!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Your generous gift of <strong className="text-[#0F4C3A]">₦{Number(amount === 'custom' ? customAmount : amount).toLocaleString()}</strong> enables CMAOF to continue empowering people and building brighter communities.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 text-left max-w-sm mx-auto space-y-1">
              <div><strong>Reference ID:</strong> CMAOF-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
              <div><strong>Purpose:</strong> {pillar.toUpperCase()}</div>
              <div><strong>Receipt:</strong> Sent to {donorInfo.email || 'your email'}</div>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="bg-[#0F4C3A] text-white px-8 py-3 rounded-full font-bold text-sm shadow hover:bg-[#14634C] transition-colors"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default DonateModal;
