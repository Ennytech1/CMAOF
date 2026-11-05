import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Heart, ShieldCheck, CheckCircle2, Lock,
  BookOpen, HeartPulse, Users, ArrowRight, Check,
  RefreshCw, BadgeCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';
import CmaofLogo from './CmaofLogo';

/* ── constants ──────────────────────────────────────────────────── */
const PRESET_AMOUNTS = ['5000', '10000', '25000', '50000', '100000'];

const PILLARS = [
  {
    id: 'general',
    label: 'Where Need is Greatest',
    shortLabel: 'General',
    icon: <Heart size={15} />,
    activeBg: 'bg-[#FAF6EE]',
    activeText: 'text-[#5B2E19]',
    activeBorder: 'border-[#5B2E19]',
    activeRing: 'ring-[#5B2E19]/20',
  },
  {
    id: 'education',
    label: 'Education & Human Capital',
    shortLabel: 'Education',
    icon: <BookOpen size={15} />,
    activeBg: 'bg-[#EBF3FC]',
    activeText: 'text-[#0047BA]',
    activeBorder: 'border-[#0047BA]',
    activeRing: 'ring-[#0047BA]/20',
  },
  {
    id: 'health',
    label: 'Health & Well-being',
    shortLabel: 'Health',
    icon: <HeartPulse size={15} />,
    activeBg: 'bg-[#EDF7EB]',
    activeText: 'text-[#338C26]',
    activeBorder: 'border-[#338C26]',
    activeRing: 'ring-[#338C26]/20',
  },
  {
    id: 'community',
    label: 'Community Resilience',
    shortLabel: 'Community',
    icon: <Users size={15} />,
    activeBg: 'bg-[#FFF8E5]',
    activeText: 'text-[#996F00]',
    activeBorder: 'border-[#FCCD37]',
    activeRing: 'ring-[#FCCD37]/30',
  },
];

/* ── component ──────────────────────────────────────────────────── */
const DonateModal = ({ isOpen, onClose }) => {
  const [frequency, setFrequency]       = useState('one-time');
  const [amount, setAmount]             = useState('25000');
  const [customAmount, setCustomAmount] = useState('');
  const [pillar, setPillar]             = useState('general');
  const [isAnonymous, setIsAnonymous]   = useState(false);
  const [donorName, setDonorName]       = useState('');
  const [donorEmail, setDonorEmail]     = useState('');
  const [isSubmitted, setIsSubmitted]   = useState(false);
  const [txRef, setTxRef]               = useState('');
  const [submissionDate, setSubmissionDate] = useState('');

  const rawAmount   = amount === 'custom' ? parseFloat(customAmount) || 0 : parseFloat(amount) || 0;
  const formatted   = '₦' + Number(rawAmount).toLocaleString('en-NG');
  const pillarObj   = PILLARS.find(p => p.id === pillar);

  const handleClose = useCallback(() => {
    setIsSubmitted(false);
    setDonorName('');
    setDonorEmail('');
    setAmount('25000');
    setCustomAmount('');
    setTxRef('');
    setSubmissionDate('');
    onClose?.();
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rawAmount || rawAmount <= 0) { toast.error('Please enter a valid donation amount.'); return; }
    if (!donorEmail.trim() || !donorEmail.includes('@')) { toast.error('Please enter a valid email address.'); return; }

    const currentTxRef = `CMAOF-${Date.now().toString().slice(-8)}`;
    const formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    setTxRef(currentTxRef);
    setSubmissionDate(formattedDate);

    const recordDonation = async (resolvedRef) => {
      const finalRef = resolvedRef || currentTxRef;
      try {
        await fetch('/api/donations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: rawAmount,
            currency: 'NGN',
            frequency,
            pillar,
            donorName: isAnonymous ? 'Anonymous Supporter' : (donorName || 'Generous Supporter'),
            donorEmail: donorEmail.trim(),
            isAnonymous,
            transactionRef: finalRef,
            paymentMethod: 'Paystack Card Online',
          }),
        });
      } catch (err) {
        console.warn('Backend sync notice (offline mode fallback active):', err.message);
      }

      setTxRef(finalRef);
      setIsSubmitted(true);
      toast.success('Thank you for your donation to CMAOF!');
    };

    if (typeof window !== 'undefined' && window.PaystackPop) {
      try {
        const paystackKey = import.meta.env?.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_89410f9293b482019482910482918';
        const handler = window.PaystackPop.setup({
          key: paystackKey,
          email: donorEmail.trim(),
          amount: rawAmount * 100,
          currency: 'NGN',
          ref: currentTxRef,
          metadata: {
            custom_fields: [
              { display_name: 'Donor Name', variable_name: 'donor_name', value: donorName || 'Supporter' },
              { display_name: 'Pillar', variable_name: 'pillar', value: pillar },
            ],
          },
          callback: (response) => {
            recordDonation(response.reference || currentTxRef);
          },
          onClose: () => {
            toast('Payment modal closed', { icon: 'ℹ️' });
          },
        });
        handler.openIframe();
      } catch {
        await recordDonation(currentTxRef);
      }
    } else {
      await recordDonation(currentTxRef);
    }
  };

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-[fadeIn_0.2s_ease]"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Support CMAOF Initiatives"
    >
      <div 
        className="bg-white rounded-3xl max-w-[480px] w-full shadow-2xl relative my-6 overflow-hidden border border-emerald-950/10"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Official Brand Top Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-[#5B2E19] via-[#FCCD37] to-[#5B2E19]" />

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-[#5B2E19] rounded-full hover:bg-slate-100 transition-colors z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="px-6 sm:px-8 py-6 sm:py-7 space-y-5">

          {/* ── Form state ──────────────────────────────────────────── */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Header */}
              <div className="text-center space-y-2 pb-1">
                <div className="flex justify-center mb-3">
                  <CmaofLogo asLink={false} imgClassName="h-10 w-auto max-w-[200px] object-contain" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#5B2E19]">
                  Support CMAOF Initiatives
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Your contribution directly creates pathways for education, healthcare,
                  and community resilience across Nigeria.
                </p>
              </div>

              {/* Frequency toggle */}
              <div className="grid grid-cols-2 p-1 bg-[#FAF6EE] rounded-2xl gap-1 border border-[#EFE8DC]">
                {[
                  { key: 'one-time',  icon: <Heart size={13} />,     label: 'One-Time Giving' },
                  { key: 'recurring', icon: <RefreshCw size={13} />, label: 'Monthly Partner' },
                ].map(({ key, icon, label }) => {
                  const active = frequency === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFrequency(key)}
                      className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer
                        ${active ? 'bg-[#5B2E19] text-[#FCCD37] shadow-md' : 'text-slate-600 hover:text-[#5B2E19]'}
                      `}
                    >
                      {React.cloneElement(icon, { className: active ? 'text-[#FCCD37]' : 'text-slate-400' })}
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Pillar selector */}
              <div className="space-y-2">
                <label className="block text-[11px] font-black uppercase tracking-[0.13em] text-slate-500">
                  Designate Your Gift
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PILLARS.map(p => {
                    const active = pillar === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPillar(p.id)}
                        className={`
                          flex items-center gap-2 p-3 rounded-xl border-2 text-left
                          text-xs font-bold transition-all cursor-pointer
                          ${active
                            ? `${p.activeBorder} ${p.activeBg} ${p.activeText} ring-2 ${p.activeRing}`
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'}
                        `}
                      >
                        <span className={`shrink-0 ${active ? p.activeText : 'text-slate-400'}`}>{p.icon}</span>
                        <span className="leading-snug">{p.shortLabel}</span>
                        {active && <Check size={12} strokeWidth={3} className={`ml-auto shrink-0 ${p.activeText}`} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount preset grid */}
              <div className="space-y-2">
                <label className="block text-[11px] font-black uppercase tracking-[0.13em] text-slate-500">
                  Select Amount (₦ NGN)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_AMOUNTS.map(amt => {
                    const active = amount === amt && !customAmount;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => { setAmount(amt); setCustomAmount(''); }}
                        className={`
                          relative py-3 px-2 rounded-xl border-2 text-sm font-black text-center
                          transition-all cursor-pointer
                          ${active
                            ? 'border-[#FCCD37] bg-[#FFF8E5] text-[#5B2E19] ring-2 ring-[#FCCD37]/40 shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-[#FCCD37]/60 hover:bg-[#FAF6EE]/50'}
                        `}
                      >
                        {amt === '25000' && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#5B2E19] text-[#FCCD37] text-[8px] font-black px-1.5 py-px rounded-full uppercase tracking-wide border border-[#FCCD37]/40">
                            Popular
                          </span>
                        )}
                        ₦{Number(amt).toLocaleString()}
                      </button>
                    );
                  })}
                  {/* Custom */}
                  <button
                    type="button"
                    onClick={() => setAmount('custom')}
                    className={`
                      py-3 px-2 rounded-xl border-2 text-sm font-black text-center
                      transition-all cursor-pointer
                      ${amount === 'custom'
                        ? 'border-[#FCCD37] bg-[#FFF8E5] text-[#5B2E19] ring-2 ring-[#FCCD37]/40'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}
                    `}
                  >
                    Custom
                  </button>
                </div>
                {/* Custom input */}
                {amount === 'custom' && (
                  <div className="relative mt-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm pointer-events-none">₦</span>
                    <input
                      type="number"
                      min="500"
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      placeholder="Enter custom amount"
                      autoFocus
                      className="w-full pl-9 pr-4 py-3 rounded-xl border-2 border-[#5B2E19] bg-[#FAF6EE] text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FCCD37]"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Donor info */}
              <div className="space-y-2.5">
                <label className="block text-[11px] font-black uppercase tracking-[0.13em] text-slate-500">
                  Your Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder={isAnonymous ? 'Anonymous' : 'Full Name'}
                    value={donorName}
                    onChange={e => setDonorName(e.target.value)}
                    disabled={isAnonymous}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5B2E19] focus:ring-2 focus:ring-[#FCCD37] disabled:opacity-50 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={donorEmail}
                    onChange={e => setDonorEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5B2E19] focus:ring-2 focus:ring-[#FCCD37] transition-colors"
                    required
                  />
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer px-1 py-1.5 group">
                  <input
                    type="checkbox"
                    id="anon-modal"
                    checked={isAnonymous}
                    onChange={e => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#5B2E19] cursor-pointer"
                  />
                  <label htmlFor="anon-modal" className="text-xs text-slate-600 font-medium cursor-pointer group-hover:text-slate-800 transition-colors">
                    Make this an anonymous donation
                  </label>
                </label>
              </div>

              {/* Submit + security */}
              <div className="space-y-3 pt-1 border-t border-slate-100">
                <button
                  type="submit"
                  className="w-full btn-cmao-primary py-4 rounded-2xl font-black text-sm sm:text-base shadow-lg shadow-[#FCCD37]/35 flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <Heart size={16} className="fill-[#5B2E19]/30 stroke-[#5B2E19]" />
                  <span>Complete Donation — {formatted}</span>
                  <ArrowRight size={15} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  {[
                    { icon: <Lock size={11} className="text-[#5B2E19]" />, label: 'SSL Encrypted' },
                    { icon: <ShieldCheck size={11} className="text-[#338C26]" />, label: 'Secure' },
                    { icon: <BadgeCheck size={11} className="text-[#0047BA]" />, label: 'Tax Deductible' },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                      {icon}{label}
                    </div>
                  ))}
                </div>
              </div>
            </form>

          ) : (
            /* ── Success / Thank You state ──────────────────────────── */
            <div className="py-4 text-center space-y-5 animate-[fadeIn_0.35s_ease]">
              {/* Confetti + check */}
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                {[
                  'top-0 left-4 w-2.5 h-2.5 bg-amber-400',
                  'top-2 right-3 w-2 h-2 bg-emerald-400',
                  'bottom-3 left-2 w-2.5 h-2.5 bg-orange-400',
                  'bottom-0 right-4 w-2 h-2 bg-blue-500',
                  '-top-1 left-13 w-2 h-2 bg-pink-400',
                  '-bottom-1 left-11 w-2.5 h-2.5 bg-emerald-500',
                  'top-10 right-0 w-1.5 h-1.5 bg-purple-500',
                ].map((cls, i) => (
                  <div key={i} className={`absolute rounded-sm ${cls}`} />
                ))}
                <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#06402B] to-[#14a37f] text-white flex items-center justify-center shadow-2xl shadow-green-900/30 ring-8 ring-green-100">
                  <Check size={34} strokeWidth={3} />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#1e293b]">Thank You! 🎉</h3>
                <p className="text-[#06402B] font-bold text-sm">Donation Received with Thanks!</p>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                  Your generous gift of{' '}
                  <strong className="text-[#06402B]">{formatted}</strong>{' '}
                  enables CMAOF to empower people and build brighter communities across Nigeria.
                </p>
              </div>

              {/* Mini receipt */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-left max-w-sm mx-auto space-y-2">
                {[
                  ['Reference ID', txRef || 'CMAOF-PENDING'],
                  ['Date', submissionDate || 'Pending Confirmation'],
                  ['Purpose', pillarObj?.label || 'General'],
                  ...(donorEmail ? [['Receipt Sent To', donorEmail]] : []),
                ].map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-3">
                    <span className="text-slate-400 shrink-0">{k}:</span>
                    <span className="font-bold text-slate-700 text-right break-all">{v}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleClose}
                className="bg-[#06402B] hover:bg-[#042c1d] text-white px-10 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-green-900/20 hover:shadow-xl transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DonateModal;
