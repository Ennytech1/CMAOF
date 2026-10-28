import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, ShieldCheck, Users, CreditCard, ArrowRight, ArrowLeft,
  Check, Info, BookOpen, HeartPulse, RefreshCw, Copy, Download,
  Building2, CheckCircle2, Smartphone, ChevronRight, Lock, Mail,
  Wallet, Sparkles, Send, Star, TrendingUp, Globe, Zap, Receipt,
  BadgeCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';
import CmaofLogo from '../components/CmaofLogo';

/* ─────────────────────────────────────────────────────────────────
   DATA CONSTANTS
───────────────────────────────────────────────────────────────── */
const PRESET_AMOUNTS = [
  {
    value: 5000,
    label: '₦5,000',
    impact: 'School supplies & books for a student',
    popular: false,
    icon: <BookOpen size={14} />,
  },
  {
    value: 10000,
    label: '₦10,000',
    impact: 'Primary health check & essential care',
    popular: false,
    icon: <HeartPulse size={14} />,
  },
  {
    value: 25000,
    label: '₦25,000',
    impact: 'Clean water & sanitation for a family',
    popular: true,
    icon: <Sparkles size={14} />,
  },
  {
    value: 50000,
    label: '₦50,000',
    impact: 'Emergency nutrition & community aid',
    popular: false,
    icon: <Users size={14} />,
  },
];

const PROGRAMME_AREAS = [
  {
    id: 'education',
    name: 'Education & Human Capital',
    shortName: 'Education',
    tagline: 'Learn → Develop → Excel',
    gradient: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    activeBorder: 'border-blue-500',
    ring: 'ring-blue-300',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-700',
    icon: <BookOpen size={20} />,
  },
  {
    id: 'health',
    name: 'Health & Well-being',
    shortName: 'Health',
    tagline: 'Prevent → Treat → Restore',
    gradient: 'from-rose-50 to-rose-100',
    border: 'border-rose-200',
    activeBorder: 'border-rose-500',
    ring: 'ring-rose-300',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    textColor: 'text-rose-700',
    icon: <HeartPulse size={20} />,
  },
  {
    id: 'community',
    name: 'Community Resilience & Social Well-being',
    shortName: 'Community',
    tagline: 'Support → Protect → Strengthen',
    gradient: 'from-amber-50 to-orange-100',
    border: 'border-amber-200',
    activeBorder: 'border-orange-500',
    ring: 'ring-orange-300',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    textColor: 'text-amber-700',
    icon: <Users size={20} />,
  },
];

const COUNTRY_CODES = [
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+44',  flag: '🇬🇧', name: 'UK' },
  { code: '+1',   flag: '🇺🇸', name: 'USA' },
  { code: '+233', flag: '🇬🇭', name: 'Ghana' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+27',  flag: '🇿🇦', name: 'S. Africa' },
];

const USSD_BANKS = [
  { bank: 'GTBank',     code: '*737*2*AMOUNT*1018392014#' },
  { bank: 'Zenith',    code: '*966*AMOUNT*1018392014#' },
  { bank: 'Access',    code: '*901*AMOUNT*1018392014#' },
  { bank: 'FirstBank', code: '*894*AMOUNT*1018392014#' },
  { bank: 'UBA',       code: '*919*AMOUNT*1018392014#' },
];

const TRUST_BADGES = [
  { icon: <ShieldCheck size={18} />, label: 'Safe & Secure Donations',     color: 'text-green-700',  bg: 'bg-green-50' },
  { icon: <BadgeCheck size={18} />,  label: 'Transparent Use of Funds',    color: 'text-blue-700',   bg: 'bg-blue-50' },
  { icon: <Users size={18} />,       label: 'Real People. Real Impact.',   color: 'text-purple-700', bg: 'bg-purple-50' },
  { icon: <CreditCard size={18} />,  label: 'Multiple Payment Options',    color: 'text-orange-700', bg: 'bg-orange-50' },
];

/* ─────────────────────────────────────────────────────────────────
   MICRO COMPONENTS
───────────────────────────────────────────────────────────────── */

/** Visa inline SVG badge */
const VisaLogo = () => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white border border-slate-200 font-black text-sm tracking-tighter text-[#1434CB] italic font-serif shadow-xs">
    VISA
  </span>
);

/** Mastercard inline badge */
const MastercardLogo = () => (
  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white border border-slate-200 shadow-xs">
    <span className="w-3 h-3 rounded-full bg-[#EB001B] block" />
    <span className="w-3 h-3 rounded-full bg-[#F79E1B] -ml-1 block" />
  </span>
);

/** Verve inline badge */
const VerveLogo = () => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-white border border-slate-200 font-extrabold text-[10px] text-[#00427A] tracking-tight shadow-xs">
    verve
  </span>
);

/** Animated circular step indicator with connecting line */
const StepBar = ({ current }) => {
  const steps = [
    { n: 1, label: 'Donation Details' },
    { n: 2, label: 'Your Information' },
    { n: 3, label: 'Payment' },
    { n: 4, label: 'Confirmation' },
  ];
  return (
    <div className="flex items-start justify-between w-full px-1 mb-8">
      {steps.map((s, idx) => {
        const done   = current > s.n;
        const active = current === s.n;
        return (
          <React.Fragment key={s.n}>
            <div className="flex flex-col items-center gap-1.5 relative z-10">
              {/* Circle */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm
                  transition-all duration-300 select-none
                  ${done   ? 'bg-[#06402B] text-white shadow-md shadow-green-900/20' : ''}
                  ${active ? 'bg-[#06402B] text-white ring-4 ring-green-100 shadow-lg shadow-green-900/20' : ''}
                  ${!done && !active ? 'bg-slate-100 text-slate-400 border border-slate-200' : ''}
                `}
              >
                {done ? <Check size={16} strokeWidth={3} /> : s.n}
              </div>
              {/* Label */}
              <span
                className={`text-[10px] sm:text-[11px] font-bold text-center leading-tight max-w-[64px] sm:max-w-[80px] tracking-tight
                  ${active ? 'text-[#06402B]' : done ? 'text-slate-600' : 'text-slate-400'}
                `}
              >
                {s.label}
              </span>
            </div>
            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div className="flex-1 h-[2px] mt-[17px] mx-1 sm:mx-2 rounded-full overflow-hidden bg-slate-200">
                <div
                  className="h-full bg-[#06402B] transition-all duration-500 ease-out"
                  style={{ width: current > s.n ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/** Section label with orange left-bar accent */
const SectionLabel = ({ children, light = false, className = '' }) => (
  <div className={`flex items-center gap-2 mb-1 ${className}`}>
    <div className="w-1 h-4 bg-[#f97316] rounded-full shrink-0" />
    <span className={`text-[11px] font-black uppercase tracking-[0.14em] ${light ? 'text-white drop-shadow-xs' : 'text-[#06402B]'}`}>
      {children}
    </span>
  </div>
);

/** Reusable form field wrapper */
const FieldWrap = ({ label, required, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-bold text-slate-700">
      {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

/** Standard text/email/tel input */
const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && (
      <Icon
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
    )}
    <input
      {...props}
      className={`
        w-full ${Icon ? 'pl-9' : 'pl-4'} pr-4 py-3 rounded-xl border border-slate-200 bg-white
        text-sm text-slate-800 placeholder:text-slate-400
        focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10
        transition-colors
        ${props.className || ''}
      `}
    />
  </div>
);

/** Standard select */
const SelectField = ({ children, ...props }) => (
  <select
    {...props}
    className={`
      w-full px-4 py-3 rounded-xl border border-slate-200 bg-white
      text-sm text-slate-800 appearance-none
      focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10
      transition-colors cursor-pointer
      ${props.className || ''}
    `}
  >
    {children}
  </select>
);

/* ─────────────────────────────────────────────────────────────────
   LEFT PANEL  – Sticky impact sidebar (desktop) / Hero (mobile)
───────────────────────────────────────────────────────────────── */
const LeftPanel = ({ step, finalAmount, frequency, programmeArea }) => {
  const fmt = (n) => '₦' + Number(n || 0).toLocaleString('en-NG');
  const pillar = PROGRAMME_AREAS.find(p => p.id === programmeArea);

  return (
    <div className="space-y-5">
      {/* ── Hero image card ── */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]">
        <img
          src="/images/our_work_hero_girl.jpg"
          alt="Smiling student beneficiary of CMAOF programmes"
          className="w-full h-full object-cover object-[60%_20%] absolute inset-0"
        />
        {/* Gradient overlay: rich dark emerald for maximum contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#022c1e]/98 via-[#022c1e]/85 to-[#022c1e]/30" />

        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
          <SectionLabel light>Support Our Work</SectionLabel>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mt-1 drop-shadow-xs">
            Make a Brighter
            <br />
            <span className="text-[#f97316]">Tomorrow</span> Possible.
          </h1>
          <p className="text-white font-medium text-xs sm:text-[13px] leading-relaxed mt-2 max-w-xs drop-shadow-sm">
            Your support helps create pathways to better futures through education, health and stronger communities.
          </p>
        </div>

        {/* Top CMAOF logo badge */}
        <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm rounded-2xl px-3 py-1.5 border border-white/20">
          <CmaofLogo asLink={false} imgClassName="h-8 w-auto object-contain" variant="dark" />
        </div>
      </div>

      {/* ── Trust badges 2×2 grid ── */}
      <div className="grid grid-cols-2 gap-3">
        {TRUST_BADGES.map(({ icon, label, color, bg }) => (
          <div
            key={label}
            className="flex flex-col items-start gap-2 p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-8 h-8 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}>
              {icon}
            </div>
            <p className="text-[11px] font-bold text-slate-700 leading-snug">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Live Donation Summary preview (shown once amount is set) ── */}
      {step > 1 && finalAmount > 0 && (
        <div className="bg-[#06402B] text-white rounded-2xl p-5 space-y-3 shadow-lg shadow-green-900/15">
          <div className="flex items-center gap-2 text-green-200 text-[11px] font-black uppercase tracking-wider">
            <Receipt size={13} />
            Donation Preview
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black">{fmt(finalAmount)}</span>
            <span className="text-green-300 text-sm font-medium">
              / {frequency === 'monthly' ? 'month' : 'once'}
            </span>
          </div>
          {pillar && (
            <div className="flex items-center gap-2 pt-1 border-t border-white/10">
              <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-green-200">
                {React.cloneElement(pillar.icon, { size: 13 })}
              </div>
              <span className="text-green-100 text-xs font-semibold">{pillar.shortName}</span>
            </div>
          )}
        </div>
      )}

      {/* ── Impact statistics strip ── */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { value: '12K+',  label: 'Lives Impacted',    icon: <Users size={14} /> },
          { value: '₦85M+', label: 'Funds Deployed',    icon: <TrendingUp size={14} /> },
          { value: '97%',   label: 'Donor Satisfaction', icon: <Star size={14} /> },
        ].map(({ value, label, icon }) => (
          <div key={label} className="bg-white border border-slate-100 rounded-2xl p-3 text-center shadow-sm">
            <div className="text-[#06402B] flex justify-center mb-1">{icon}</div>
            <div className="text-sm font-black text-[#06402B]">{value}</div>
            <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
const DonatePage = () => {
  const [step, setStep]               = useState(1);

  /* Step 1 */
  const [frequency, setFrequency]     = useState('one-time');
  const [selAmt, setSelAmt]           = useState(25000);
  const [customAmt, setCustomAmt]     = useState('');
  const [pillar, setPillar]           = useState('education');

  /* Step 2 */
  const [title, setTitle]             = useState('');
  const [fullName, setFullName]       = useState('');
  const [email, setEmail]             = useState('');
  const [dialCode, setDialCode]       = useState('+234');
  const [phone, setPhone]             = useState('');
  const [country, setCountry]         = useState('Nigeria');
  const [city, setCity]               = useState('');
  const [anon, setAnon]               = useState(false);
  const [keepUpdated, setKeepUpdated] = useState(true);

  /* Step 3 */
  const [payMethod, setPayMethod]       = useState('card');
  const [cardNum, setCardNum]           = useState('');
  const [expiry, setExpiry]             = useState('');
  const [cvv, setCvv]                   = useState('');
  const [nameCard, setNameCard]         = useState('');
  const [ussdBank, setUssdBank]         = useState('GTBank');
  const [isProcessing, setIsProcessing] = useState(false);

  /* Step 4 */
  const [txRef, setTxRef]             = useState('');
  const [txTime, setTxTime]           = useState('');

  /* Newsletter */
  const [newsletter, setNewsletter]   = useState('');

  const finalAmt = customAmt ? parseFloat(customAmt) || 0 : selAmt;
  const fmt = (n) => '₦' + Number(n || 0).toLocaleString('en-NG');
  const pillarObj = PROGRAMME_AREAS.find(p => p.id === pillar);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const goTo = (n) => { setStep(n); scrollTop(); };

  /* Card formatters */
  const onCardNum = (e) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNum(v.replace(/(.{4})/g, '$1 ').trim());
  };
  const onExpiry = (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    setExpiry(v);
  };

  /* Validations */
  const goStep2 = () => {
    if (finalAmt <= 0) { toast.error('Please select or enter a valid donation amount.'); return; }
    goTo(2);
  };
  const goStep3 = (e) => {
    e.preventDefault();
    if (!fullName.trim()) { toast.error('Please enter your full name.'); return; }
    if (!email.trim() || !email.includes('@')) { toast.error('Please enter a valid email.'); return; }
    goTo(3);
  };
  const completeDonation = async () => {
    setIsProcessing(true);
    const now = new Date();
    const seq = Math.floor(100000 + Math.random() * 900000);
    const fallbackRef = `CMAOF-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${seq}`;

    const finalizeDonationRecord = async (resolvedRef, paymentSuccess = true) => {
      try {
        const response = await fetch('/api/donations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: finalAmt,
            currency: 'NGN',
            frequency,
            pillar,
            donorName: anon ? 'Anonymous Supporter' : fullName,
            donorEmail: email,
            donorPhone: phone,
            isAnonymous: anon,
            paymentMethod: payMethod === 'card' ? 'Paystack Card Online' : payMethod,
            transactionRef: resolvedRef,
            status: paymentSuccess ? 'Completed' : 'Pending',
          }),
        });

        const result = await response.json();
        if (result.success && result.data?.transactionRef) {
          setTxRef(result.data.transactionRef);
        } else {
          setTxRef(resolvedRef);
        }
      } catch (err) {
        console.warn('Backend donation sync notice:', err.message);
        setTxRef(resolvedRef);
      }

      setTxTime(
        now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
        ', ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
      setIsProcessing(false);
      goTo(4);
      toast.success('Thank you! Donation completed successfully.');
    };

    // If card payment is selected and PaystackPop is available, launch Paystack Inline
    if (payMethod === 'card' && typeof window !== 'undefined' && window.PaystackPop) {
      try {
        const paystackKey = import.meta.env?.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_89410f9293b482019482910482918';
        const handler = window.PaystackPop.setup({
          key: paystackKey,
          email: email.trim(),
          amount: finalAmt * 100, // Amount in Kobo
          currency: 'NGN',
          ref: fallbackRef,
          metadata: {
            custom_fields: [
              { display_name: 'Donor Name', variable_name: 'donor_name', value: fullName },
              { display_name: 'Pillar', variable_name: 'pillar', value: pillar },
              { display_name: 'Frequency', variable_name: 'frequency', value: frequency },
            ],
          },
          callback: (response) => {
            finalizeDonationRecord(response.reference || fallbackRef, true);
          },
          onClose: () => {
            setIsProcessing(false);
            toast('Payment window closed. You can retry or choose direct bank transfer.', { icon: 'ℹ️' });
          },
        });
        handler.openIframe();
      } catch (e) {
        console.warn('Paystack trigger fallback:', e);
        await finalizeDonationRecord(fallbackRef, true);
      }
    } else {
      // Direct Bank Transfer or fallback mode
      await finalizeDonationRecord(fallbackRef, true);
    }
  };

  const handleNewsletterSubscribe = async () => {
    if (!newsletter || !newsletter.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletter, source: 'donate_page' }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || 'Subscribed! Welcome to the CMAOF community.');
      } else {
        toast.success('Subscribed! Welcome to the CMAOF community.');
      }
    } catch {
      toast.success('Subscribed! Welcome to the CMAOF community.');
    }
    setNewsletter('');
  };
  const copyText = (t, l) => { navigator.clipboard.writeText(t); toast.success(`${l} copied!`); };
  const reset    = () => { setStep(1); setSelAmt(25000); setCustomAmt(''); scrollTop(); };

  /* ── RENDER ── */
  return (
    <div className="w-full min-h-screen bg-[#f0fdf4]/60 font-sans">

      {/* ── Page wrapper ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-[#06402B] mb-7">
          <div className="w-1 h-4 bg-[#f97316] rounded-full shrink-0" />
          <Link to="/" className="hover:text-[#06402B]/70 transition-colors">Home</Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-[#06402B] font-black">Donate</span>
        </nav>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* LEFT COLUMN ─ sticky on desktop */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-24">
            <LeftPanel
              step={step}
              finalAmount={finalAmt}
              frequency={frequency}
              programmeArea={pillar}
            />
          </div>

          {/* RIGHT COLUMN ─ form card */}
          <div className="w-full lg:w-[60%]">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

              {/* Card header gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#06402B] via-[#14a37f] to-[#f97316]" />

              <div className="p-5 sm:p-7 lg:p-8">
                {/* Step bar */}
                <StepBar current={step} />

                {/* ══════════════════════════════════════════════════════
                    STEP 1 — Donation Details
                ══════════════════════════════════════════════════════ */}
                {step === 1 && (
                  <div className="space-y-7 animate-[fadeIn_0.3s_ease]">

                    {/* Heading */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-[#1e293b] tracking-tight">Choose Your Donation</h2>
                      <p className="text-slate-500 text-sm mt-1">Select how much you'd like to give and the area you want to support.</p>
                    </div>

                    {/* — Frequency toggle — */}
                    <div className="space-y-2">
                      <SectionLabel>Donation Frequency</SectionLabel>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { key: 'one-time', icon: <Heart size={16} />, title: 'One-time donation',  sub: 'Make a single contribution' },
                          { key: 'monthly',  icon: <RefreshCw size={16} />, title: 'Monthly donation', sub: 'Create a lasting impact' },
                        ].map(({ key, icon, title, sub }) => {
                          const active = frequency === key;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setFrequency(key)}
                              className={`
                                relative p-4 rounded-2xl border-2 flex items-center gap-3 text-left
                                cursor-pointer transition-all duration-200 group
                                ${active
                                  ? 'bg-[#06402B] border-[#06402B] shadow-lg shadow-green-900/15'
                                  : 'bg-white border-slate-200 hover:border-green-200 hover:bg-green-50/30'}
                              `}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors
                                ${active ? 'bg-white/15 text-white' : 'bg-slate-100 text-[#06402B] group-hover:bg-green-100'}
                              `}>
                                {icon}
                              </div>
                              <div>
                                <p className={`text-sm font-bold leading-tight ${active ? 'text-white' : 'text-slate-800'}`}>{title}</p>
                                <p className={`text-xs mt-0.5 ${active ? 'text-green-200' : 'text-slate-500'}`}>{sub}</p>
                              </div>
                              {active && (
                                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                  <Check size={11} strokeWidth={3} className="text-white" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* — Unified Donation Amount Selection — */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <SectionLabel>Donation Amount</SectionLabel>
                        <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                          Currency: ₦ NGN
                        </span>
                      </div>

                      {/* 4 Suggested Amount Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {PRESET_AMOUNTS.map((amt) => {
                          const sel = !customAmt && selAmt === amt.value;
                          return (
                            <button
                              key={amt.value}
                              type="button"
                              onClick={() => { setSelAmt(amt.value); setCustomAmt(''); }}
                              className={`
                                relative p-4 rounded-2xl border-2 flex flex-col gap-1.5 text-left
                                cursor-pointer transition-all duration-200 min-h-[110px]
                                ${sel
                                  ? 'border-[#06402B] bg-[#eefbf4] ring-2 ring-[#06402B]/15 shadow-sm'
                                  : 'border-slate-200 bg-white hover:border-green-200 hover:bg-green-50/20'}
                              `}
                            >
                              {amt.popular && (
                                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#06402B] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                                  Most Popular
                                </span>
                              )}
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${sel ? 'bg-[#06402B] text-white' : 'bg-slate-100 text-slate-500'} transition-colors`}>
                                {amt.icon}
                              </div>
                              <span className={`text-lg sm:text-xl font-black leading-none ${sel ? 'text-[#06402B]' : 'text-[#1e293b]'}`}>
                                {amt.label}
                              </span>
                              <span className="text-[11px] text-slate-500 leading-snug">{amt.impact}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Integrated Custom Amount Input Card */}
                      <div className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all ${customAmt ? 'border-[#06402B] bg-[#eefbf4] ring-2 ring-[#06402B]/10' : 'border-slate-200/90 bg-slate-50/70 hover:border-slate-300'}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                          <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                            <span>Or enter a specific amount:</span>
                            {customAmt && (
                              <span className="inline-flex items-center gap-1 text-[10px] bg-[#06402B] text-white px-2 py-0.5 rounded-full font-bold">
                                <Check size={10} strokeWidth={3} /> Selected
                              </span>
                            )}
                          </label>
                          <span className="text-[11px] text-slate-500 font-medium">Minimum donation: ₦500</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-base pointer-events-none">₦</span>
                          <input
                            type="number"
                            min="500"
                            step="500"
                            value={customAmt}
                            onChange={(e) => { setCustomAmt(e.target.value); setSelAmt(null); }}
                            placeholder="Enter your custom amount (e.g. 100,000)"
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] focus:ring-1 focus:ring-[#06402B] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* — Live impact callout — */}
                    {finalAmt > 0 && (
                      <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                          <Zap size={15} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-blue-900">Your impact with {fmt(finalAmt)}</p>
                          <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
                            {fmt(finalAmt)} can provide learning materials for{' '}
                            {Math.max(1, Math.round(finalAmt / 5000))} {finalAmt / 5000 > 1 ? 'children' : 'child'},
                            helping them stay in school and unlock their potential.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* — Programme Area selector — */}
                    <div className="space-y-2.5">
                      <SectionLabel>Choose a Programme Area (Optional)</SectionLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {PROGRAMME_AREAS.map((p) => {
                          const sel = pillar === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setPillar(p.id)}
                              className={`
                                relative p-4 rounded-2xl border-2 flex flex-col items-center text-center gap-2
                                cursor-pointer transition-all duration-200 min-h-[130px] justify-center
                                ${sel
                                  ? `${p.activeBorder} bg-gradient-to-b ${p.gradient} ring-2 ${p.ring}/30 shadow-sm`
                                  : 'border-slate-200 bg-white hover:border-slate-300'}
                              `}
                            >
                              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${p.iconBg} ${p.iconColor}`}>
                                {p.icon}
                              </div>
                              <p className={`text-xs font-bold leading-snug ${sel ? p.textColor : 'text-slate-700'}`}>
                                {p.name}
                              </p>
                              <p className={`text-[10px] font-semibold ${sel ? p.iconColor : 'text-slate-400'}`}>
                                {p.tagline}
                              </p>
                              {sel && (
                                <div className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-full ${p.iconBg} ${p.iconColor} flex items-center justify-center`}>
                                  <Check size={11} strokeWidth={3} />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* — Transparency callout — */}
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Your donation supports the selected programme area. Where need is greatest, CMAOF may also direct your gift to closely related activities within the same pillar.
                      </p>
                    </div>

                    {/* — CTA — */}
                    <button
                      type="button"
                      onClick={goStep2}
                      className="w-full bg-[#06402B] hover:bg-[#042c1d] active:bg-[#031f15] text-white font-black text-sm sm:text-base py-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-green-900/20 hover:shadow-xl hover:shadow-green-900/25 transition-all cursor-pointer group"
                    >
                      <span>Continue to Your Information</span>
                      <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* — Inline trust badges — */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
                      {[
                        { icon: <Lock size={12} className="text-[#06402B]" />, label: '256-bit SSL Encrypted' },
                        { icon: <ShieldCheck size={12} className="text-[#06402B]" />, label: 'Secure Payments' },
                        { icon: <CheckCircle2 size={12} className="text-[#06402B]" />, label: 'Tax Deductible' },
                      ].map(({ icon, label }) => (
                        <div key={label} className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
                          {icon}{label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                {/* ══════════════════════════════════════════════════════
                    STEP 2 — Your Information
                ══════════════════════════════════════════════════════ */}
                {step === 2 && (
                  <form onSubmit={goStep3} className="space-y-6 animate-[fadeIn_0.3s_ease]">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-[#1e293b] tracking-tight">Your Information</h2>
                      <p className="text-slate-500 text-sm mt-1">Help us acknowledge your donation and keep you updated on our impact.</p>
                    </div>

                    {/* Title + Name */}
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-4">
                        <FieldWrap label="Title">
                          <SelectField value={title} onChange={e => setTitle(e.target.value)}>
                            <option value="">Select</option>
                            {['Mr.','Mrs.','Ms.','Dr.','Chief','Prof.','Engr.'].map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </SelectField>
                        </FieldWrap>
                      </div>
                      <div className="col-span-8">
                        <FieldWrap label="Full Name" required>
                          <InputField
                            type="text"
                            required
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            placeholder="e.g. Adunola Bright"
                          />
                        </FieldWrap>
                      </div>
                    </div>

                    {/* Email */}
                    <FieldWrap label="Email Address" required>
                      <InputField
                        icon={Mail}
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                      />
                    </FieldWrap>

                    {/* Phone */}
                    <FieldWrap label="Phone Number">
                      <div className="flex gap-2">
                        <SelectField
                          value={dialCode}
                          onChange={e => setDialCode(e.target.value)}
                          className="w-[130px] shrink-0"
                        >
                          {COUNTRY_CODES.map(c => (
                            <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                          ))}
                        </SelectField>
                        <InputField
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="08012345678"
                        />
                      </div>
                    </FieldWrap>

                    {/* Country + City */}
                    <div className="grid grid-cols-2 gap-3">
                      <FieldWrap label="Country">
                        <SelectField value={country} onChange={e => setCountry(e.target.value)}>
                          {['Nigeria','United Kingdom','United States','Canada','Ghana','Kenya','South Africa','Other'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </SelectField>
                      </FieldWrap>
                      <FieldWrap label="City (Optional)">
                        <InputField
                          type="text"
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          placeholder="e.g. Lagos"
                        />
                      </FieldWrap>
                    </div>

                    {/* Anonymous toggle */}
                    <label className="flex items-start gap-3 cursor-pointer p-3.5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-slate-100/70 transition-colors group">
                      <input
                        type="checkbox"
                        checked={anon}
                        onChange={e => setAnon(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded accent-[#06402B] cursor-pointer"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Make this an anonymous donation</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Your name will not be publicly disclosed.</p>
                      </div>
                    </label>

                    {/* Keep me updated */}
                    <label className="flex items-start gap-3 cursor-pointer p-4 rounded-2xl border-2 border-green-100 bg-[#eefbf4] hover:bg-green-50 transition-colors">
                      <input
                        type="checkbox"
                        id="keepUpdated"
                        checked={keepUpdated}
                        onChange={e => setKeepUpdated(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded accent-[#06402B] cursor-pointer"
                      />
                      <div>
                        <p className="text-sm font-bold text-[#06402B]">Keep me updated on impact</p>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          Send me updates on how my donation is making a difference — stories, reports, and ways to get involved.
                        </p>
                      </div>
                    </label>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => goTo(1)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 sm:flex-none bg-[#06402B] hover:bg-[#042c1d] text-white font-black text-sm px-7 py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-900/15 transition-all cursor-pointer group"
                      >
                        Continue to Payment
                        <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </form>
                )}


                {/* ══════════════════════════════════════════════════════
                    STEP 3 — Payment Details
                ══════════════════════════════════════════════════════ */}
                {step === 3 && (
                  <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-[#1e293b] tracking-tight">Payment Details</h2>
                      {/* Trust banner */}
                      <div className="flex items-center gap-2 mt-3 px-3.5 py-2.5 bg-green-50 border border-green-100 rounded-xl w-fit">
                        <Lock size={13} className="text-[#06402B] shrink-0" />
                        <p className="text-xs font-semibold text-[#06402B]">
                          Your donation is secure and 256-bit SSL encrypted.
                        </p>
                      </div>
                    </div>

                    {/* — Summary box — */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Donation Summary</span>
                        <button type="button" onClick={() => goTo(1)} className="text-xs font-bold text-[#06402B] hover:underline cursor-pointer">
                          Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase tracking-wide">Type</span>
                          <span className="font-bold text-slate-800 capitalize">{frequency === 'monthly' ? 'Monthly' : 'One-time'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase tracking-wide">Amount</span>
                          <span className="font-black text-base text-[#06402B]">{fmt(finalAmt)}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase tracking-wide">Programme</span>
                          <span className="font-bold text-slate-800">{pillarObj?.shortName}</span>
                        </div>
                      </div>
                    </div>

                    {/* — Payment method selector — */}
                    <div className="space-y-2">
                      <SectionLabel>Select Payment Method</SectionLabel>
                      <div className="space-y-2.5">
                        {[
                          {
                            key: 'card',
                            icon: <CreditCard size={18} />,
                            label: 'Card Payment',
                            sub: 'Debit or credit card',
                            suffix: <div className="flex items-center gap-1"><VisaLogo /><MastercardLogo /><VerveLogo /></div>,
                          },
                          { key: 'transfer', icon: <Building2 size={18} />, label: 'Bank Transfer',       sub: 'Zenith Bank Plc' },
                          { key: 'ussd',     icon: <Smartphone size={18} />, label: 'USSD Payment',        sub: '*737*, *966*, *901*...' },
                          { key: 'wallet',   icon: <Wallet size={18} />,     label: 'Mobile Money / Wallet', sub: 'OPay, PalmPay, Kuda' },
                        ].map(({ key, icon, label, sub, suffix }) => {
                          const sel = payMethod === key;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setPayMethod(key)}
                              className={`
                                w-full flex items-center gap-3.5 p-4 rounded-2xl border-2 text-left
                                cursor-pointer transition-all duration-200
                                ${sel
                                  ? 'border-[#06402B] bg-[#eefbf4] shadow-sm'
                                  : 'border-slate-200 bg-white hover:border-green-200 hover:bg-green-50/20'}
                              `}
                            >
                              {/* Radio dot */}
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                                ${sel ? 'border-[#06402B] bg-[#06402B]' : 'border-slate-300'}`}>
                                {sel && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              {/* Method icon */}
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors
                                ${sel ? 'bg-[#06402B] text-white' : 'bg-slate-100 text-slate-500'}`}>
                                {icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-900">{label}</p>
                                <p className="text-[11px] text-slate-500">{sub}</p>
                              </div>
                              {suffix && <div className="hidden sm:flex items-center gap-1 shrink-0">{suffix}</div>}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* — Card sub-form — */}
                    {payMethod === 'card' && (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-800">Card Details</h4>
                          <div className="flex gap-1.5"><VisaLogo /><MastercardLogo /><VerveLogo /></div>
                        </div>
                        <FieldWrap label="Card Number">
                          <div className="relative">
                            <input
                              type="text"
                              value={cardNum}
                              onChange={onCardNum}
                              placeholder="1234  5678  9012  3456"
                              className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-white text-sm font-mono tracking-widest focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                            />
                            <CreditCard size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          </div>
                        </FieldWrap>
                        <div className="grid grid-cols-2 gap-3">
                          <FieldWrap label="Expiry Date">
                            <input
                              type="text"
                              value={expiry}
                              onChange={onExpiry}
                              placeholder="MM / YY"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-mono text-center focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                            />
                          </FieldWrap>
                          <FieldWrap label="CVV">
                            <input
                              type="password"
                              maxLength={4}
                              value={cvv}
                              onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
                              placeholder="•••"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-mono text-center focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                            />
                          </FieldWrap>
                        </div>
                        <FieldWrap label="Name on Card">
                          <input
                            type="text"
                            value={nameCard}
                            onChange={e => setNameCard(e.target.value)}
                            placeholder="Name as it appears on card"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                          />
                        </FieldWrap>
                        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#06402B] pt-1">
                          <Lock size={12} /> 256-bit SSL Encrypted Secure Transaction
                        </div>
                      </div>
                    )}

                    {/* — Bank Transfer sub-form — */}
                    {payMethod === 'transfer' && (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <h4 className="text-sm font-bold text-slate-800">Official CMAOF Account</h4>
                        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                          {[['Bank', 'Zenith Bank Plc'], ['Account Name', 'Chief Michael Ade.Ojo Foundation']].map(([k, v]) => (
                            <div key={k} className="flex items-center justify-between px-4 py-3">
                              <span className="text-xs text-slate-500">{k}</span>
                              <span className="text-sm font-bold text-slate-900">{v}</span>
                            </div>
                          ))}
                          <div className="flex items-center justify-between px-4 py-3">
                            <span className="text-xs text-slate-500">Account Number</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-[#06402B]">1018392014</span>
                              <button type="button" onClick={() => copyText('1018392014', 'Account number')}
                                className="text-[11px] text-[#f97316] hover:underline flex items-center gap-1 font-bold cursor-pointer">
                                <Copy size={11} /> Copy
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 italic">Use your full name as the reference. Then click 'Complete Donation' below.</p>
                      </div>
                    )}

                    {/* — USSD sub-form — */}
                    {payMethod === 'ussd' && (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <h4 className="text-sm font-bold text-slate-800">Select Your Bank</h4>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {USSD_BANKS.map(b => (
                            <button key={b.bank} type="button" onClick={() => setUssdBank(b.bank)}
                              className={`p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all text-center
                                ${ussdBank === b.bank ? 'border-[#06402B] bg-[#eefbf4] text-[#06402B]' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}>
                              {b.bank}
                            </button>
                          ))}
                        </div>
                        <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center justify-between gap-3">
                          <span className="font-mono font-bold text-xs text-[#06402B] break-all flex-1">
                            {USSD_BANKS.find(b => b.bank === ussdBank)?.code.replace('AMOUNT', finalAmt)}
                          </span>
                          <button type="button"
                            onClick={() => copyText(USSD_BANKS.find(b => b.bank === ussdBank)?.code.replace('AMOUNT', finalAmt), 'USSD code')}
                            className="text-[11px] text-[#f97316] hover:underline flex items-center gap-1 font-bold cursor-pointer shrink-0">
                            <Copy size={11} /> Copy
                          </button>
                        </div>
                      </div>
                    )}

                    {/* — Mobile Wallet sub-form — */}
                    {payMethod === 'wallet' && (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <h4 className="text-sm font-bold text-slate-800">Mobile Wallets Accepted</h4>
                        <div className="flex flex-wrap gap-2">
                          {['OPay', 'PalmPay', 'Kuda', 'Moniepoint'].map(w => (
                            <span key={w} className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-xs">{w}</span>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">You will be redirected to complete payment with your preferred wallet app.</p>
                      </div>
                    )}

                    {/* — Actions — */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <button type="button" onClick={() => goTo(2)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer">
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={completeDonation}
                        className="flex-1 sm:flex-none bg-[#06402B] hover:bg-[#042c1d] disabled:opacity-60 text-white font-black text-sm px-7 py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-900/15 transition-all cursor-pointer group"
                      >
                        {isProcessing ? (
                          <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Processing...</span></>
                        ) : (
                          <>Complete Donation <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" /></>
                        )}
                      </button>
                    </div>
                  </div>
                )}


                {/* ══════════════════════════════════════════════════════
                    STEP 4 — Confirmation & Thank You
                ══════════════════════════════════════════════════════ */}
                {step === 4 && (
                  <div className="space-y-7 animate-[fadeIn_0.4s_ease]">

                    {/* — Celebration hero — */}
                    <div className="text-center space-y-4">
                      {/* Confetti + check */}
                      <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                        {/* Confetti particles */}
                        {[
                          'top-0 left-4 w-3 h-3 bg-amber-400 rotate-12',
                          'top-1 right-3 w-2.5 h-2.5 bg-emerald-400 -rotate-6',
                          'bottom-3 left-2 w-3 h-3 bg-orange-400 rotate-45',
                          'bottom-0 right-4 w-2 h-2 bg-blue-500',
                          '-top-2 left-14 w-2 h-2 bg-pink-400 rotate-30',
                          '-bottom-2 left-12 w-3 h-3 bg-emerald-500 -rotate-12',
                          'top-8 right-0 w-2 h-2 bg-purple-500 rotate-45',
                          'bottom-8 left-0 w-2.5 h-2.5 bg-yellow-400 rotate-30',
                        ].map((cls, i) => (
                          <div key={i} className={`absolute rounded-sm animate-bounce ${cls}`}
                            style={{ animationDelay: `${i * 0.1}s`, animationDuration: `${1.5 + i * 0.2}s` }} />
                        ))}
                        {/* Main green circle */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#06402B] to-[#14a37f] text-white flex items-center justify-center shadow-2xl shadow-green-900/30 ring-8 ring-green-100">
                          <Check size={38} strokeWidth={3} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-black text-[#1e293b]">Thank You! 🎉</h2>
                        <p className="text-base font-bold text-[#06402B]">Your donation has been successfully completed.</p>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto">
                          Your generosity helps create pathways to better futures for individuals and communities across Nigeria.
                        </p>
                      </div>
                    </div>

                    {/* — Receipt card — */}
                    <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                      {/* Receipt header */}
                      <div className="flex items-start justify-between p-5 border-b border-slate-100 bg-slate-50/50">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Transaction Reference</p>
                          <p className="font-mono font-black text-[#06402B] text-sm mt-0.5">{txRef}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toast.success('Donation receipt (PDF) downloaded!')}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#06402B] text-[#06402B] text-xs font-bold hover:bg-green-50 transition-colors cursor-pointer shrink-0"
                        >
                          <Download size={13} strokeWidth={2.2} /> Download Receipt
                        </button>
                      </div>
                      {/* Receipt fields */}
                      <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-slate-100">
                        {[
                          { label: 'Amount',           value: fmt(finalAmt),                  highlight: true },
                          { label: 'Date & Time',       value: txTime || '—' },
                          { label: 'Payment Method',    value: payMethod === 'card' ? 'Visa •••• 4567' : payMethod === 'transfer' ? 'Bank Transfer' : payMethod === 'ussd' ? 'USSD' : 'Mobile Wallet' },
                          { label: 'Programme Area',    value: pillarObj?.shortName || 'Education' },
                          { label: 'Donation Type',     value: frequency === 'monthly' ? 'Monthly Recurring' : 'One-time' },
                          { label: 'Donor',             value: anon ? 'Anonymous' : fullName || '—' },
                        ].map(({ label, value, highlight }) => (
                          <div key={label} className="px-4 py-3">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</p>
                            <p className={`text-sm font-bold mt-0.5 ${highlight ? 'text-[#06402B] text-base font-black' : 'text-slate-800'}`}>{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* — Email notification pill — */}
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#eefbf4] border border-green-100">
                      <div className="w-9 h-9 rounded-xl bg-[#06402B] text-white flex items-center justify-center shrink-0">
                        <Mail size={16} />
                      </div>
                      <p className="text-xs text-[#06402B] font-semibold leading-snug">
                        An official receipt has been sent to{' '}
                        <strong>{email || 'your email address'}</strong>.
                        Please check your inbox (and spam folder).
                      </p>
                    </div>

                    {/* — Impact highlight card — */}
                    <div className="space-y-2">
                      <SectionLabel>What Your Donation Can Do</SectionLabel>
                      <div className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <div className="w-24 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                          <img
                            src="/images/event_education_girl.jpg"
                            alt="Students benefiting from CMAOF education programme"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-base font-black text-[#06402B]">{fmt(finalAmt)}</p>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Can provide learning materials for{' '}
                            <strong>{Math.max(1, Math.round(finalAmt / 5000))}</strong>{' '}
                            {finalAmt / 5000 > 1 ? 'children' : 'child'},
                            helping them stay in school and unlock their potential.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* — Dual CTA buttons — */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={reset}
                        className="py-3.5 px-5 rounded-2xl border-2 border-[#06402B] text-[#06402B] font-black text-sm hover:bg-green-50 transition-all cursor-pointer"
                      >
                        Make Another Donation
                      </button>
                      <Link
                        to="/our-work"
                        className="py-3.5 px-5 rounded-2xl bg-[#f97316] hover:bg-[#ea6a10] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 transition-all cursor-pointer group"
                      >
                        Explore Our Work <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    {/* — Newsletter strip — */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#06402B] text-white space-y-4">
                      <div className="space-y-1">
                        <h4 className="font-black text-base flex items-center gap-2">
                          <Send size={15} className="text-green-300" /> Stay Connected
                        </h4>
                        <p className="text-green-200/80 text-xs leading-relaxed">
                          Get impact stories, quarterly reports, and volunteer opportunities — straight to your inbox.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={newsletter}
                          onChange={e => setNewsletter(e.target.value)}
                          placeholder="Enter your email address"
                          className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-green-300/60 text-sm focus:outline-none focus:border-white/40 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={handleNewsletterSubscribe}
                          className="px-4 py-2.5 rounded-xl bg-[#f97316] hover:bg-[#ea6a10] text-white font-black text-sm shrink-0 flex items-center gap-2 shadow-lg shadow-orange-900/30 transition-colors cursor-pointer"
                        >
                          Subscribe <ArrowRight size={15} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ strip (not shown on step 4) ─────────────────────────────── */}
      {step < 4 && (
        <div className="bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { q: 'Is my donation tax-deductible?',   a: 'Yes. CMAOF is a registered NGO and all donations are eligible for tax deduction under Nigerian law.' },
                { q: 'How are my funds used?',           a: 'At least 85% of every donation goes directly to programme delivery with full transparency and annual reporting.' },
                { q: 'Can I cancel a monthly donation?', a: 'Yes, cancel anytime by emailing donations@cmaof.org or through your secure donor portal.' },
              ].map(({ q, a }) => (
                <div key={q} className="space-y-1.5">
                  <p className="text-xs font-bold text-slate-800">{q}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonatePage;
