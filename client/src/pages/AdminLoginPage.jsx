import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Check,
  Lock,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Mail,
  KeyRound,
  Users,
  DollarSign,
  FileText,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import CmaofLogo from '../components/CmaofLogo';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login, verifyOtp, isAuthenticated, isAdmin } = useAuth();

  // Step 1: Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Step 2: MFA State
  const [otp, setOtp] = useState(['2', '6', '4', '8', '1', '0']);
  const [trustDevice, setTrustDevice] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // 1 = Login ONLY, 2 = MFA ONLY, 3 = Authenticated Dashboard
  const [mfaMethodModal, setMfaMethodModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('authenticator'); // authenticator, sms, email, backup

  // Forgot password modal state
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitting, setForgotSubmitting] = useState(false);

  // Authenticated admin session & live stats
  const [adminUser, setAdminUser] = useState(null);
  const [stats, setStats] = useState(null);

  // Auto-redirect if already logged in as admin
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Refs for OTP input elements
  const otpInputRefs = useRef([]);

  // Fetch live stats in background for portal preview
  useEffect(() => {
    fetch('/api/donations/stats')
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setStats(res.data);
      })
      .catch(() => {});
  }, []);

  // Quick Demo Auto-Fill
  const handleQuickFill = () => {
    setEmail('admin@cmaof.org');
    setPassword('admin123');
    setRememberMe(true);
    setOtp(['2', '6', '4', '8', '1', '0']);
    toast.success('Admin demo credentials populated!');
  };

  // Handle Step 1: Sign In -> Advance to Step 2 (MFA)
  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid administrator email address.');
      return;
    }
    if (!password) {
      toast.error('Please enter your password.');
      return;
    }

    setIsLoggingIn(true);

    try {
      const res = await login(email.trim(), password);

      if (res.requireMfa) {
        setAdminUser({ name: res.name || 'Foundation Administrator', email: res.email });
        toast.success(res.message || 'Credentials verified. Enter your 6-digit MFA code.');
        setActiveStep(2);
        setTimeout(() => {
          if (otpInputRefs.current[0]) otpInputRefs.current[0].focus();
        }, 150);
      } else {
        toast.success('Authentication successful! Welcome to CMAOF Portal.');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      toast.error(err.message || 'Invalid administrator email or password.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle OTP Input Changes
  const handleOtpChange = (index, value) => {
    const cleaned = value.replace(/\D/g, '');
    const newOtp = [...otp];

    if (cleaned.length > 0) {
      newOtp[index] = cleaned[cleaned.length - 1];
      setOtp(newOtp);
      if (index < 5 && otpInputRefs.current[index + 1]) {
        otpInputRefs.current[index + 1].focus();
      }
    } else {
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  // Handle OTP Keydown (Backspace support)
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  // Handle OTP Paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasteData) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
      const focusIndex = Math.min(pasteData.length, 5);
      if (otpInputRefs.current[focusIndex]) {
        otpInputRefs.current[focusIndex].focus();
      }
    }
  };

  // Handle Step 2: MFA Verify
  // Handle Step 2: MFA Verify
  const handleVerifySubmit = async (e) => {
    if (e) e.preventDefault();

    const fullCode = otp.join('');
    if (fullCode.length < 6) {
      toast.error('Please enter the complete 6-digit authentication code.');
      return;
    }

    setIsVerifying(true);

    try {
      const res = await verifyOtp(email.trim(), fullCode);
      toast.success(res.message || 'Authentication successful! Welcome to CMAOF Portal.', {
        duration: 4000,
      });
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.message || 'Invalid or expired 6-digit code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle Forgot Password
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      toast.error('Please enter a valid administrator email.');
      return;
    }
    setForgotSubmitting(true);
    try {
      await fetch('/api/users/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim() }),
      });
      toast.success('Password reset instructions sent to your email.');
      setForgotModal(false);
      setForgotEmail('');
    } catch {
      toast.success('Password reset instructions sent to your email.');
      setForgotModal(false);
    } finally {
      setForgotSubmitting(false);
    }
  };

  // Logout from dashboard
  const handleLogout = () => {
    localStorage.removeItem('cmaof_admin_token');
    setAdminUser(null);
    setActiveStep(1);
    toast.success('Logged out successfully.');
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen max-h-screen overflow-hidden bg-cover bg-center flex flex-col justify-between selection:bg-[#06402B] selection:text-white z-40"
      style={{
        backgroundImage: `url('/images/admin_campus_bg.jpg')`,
      }}
    >
      {/* ── Soft Ambient Overlay for Optimal Contrast ── */}
      <div className="absolute inset-0 bg-slate-900/15 backdrop-blur-[0.5px] pointer-events-none" />

      {/* ── Top Header Navigation Bar ── */}
      <header className="relative z-20 w-full px-4 sm:px-6 pt-3 sm:pt-3.5 pb-1 flex items-center justify-between shrink-0">
        {/* Pill Badge matching design screenshot */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#06402B] text-white shadow-md border border-emerald-800/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-extrabold text-xs sm:text-[13px] tracking-tight">
            {activeStep === 1 ? '1. Login & MFA' : activeStep === 2 ? '2. Two-Factor Verification' : 'Admin Portal'}
          </span>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {activeStep === 1 && (
            <button
              type="button"
              onClick={handleQuickFill}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#06402B] text-xs font-bold shadow-sm transition-all border border-slate-200 cursor-pointer hover:scale-[1.02]"
              title="Auto-fill demo credentials"
            >
              <KeyRound size={13} className="text-[#EA580C]" />
              <span>Fill Demo</span>
            </button>
          )}

          {activeStep === 2 && (
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-700 hover:text-[#06402B] text-xs font-bold shadow-sm transition-all border border-slate-200 cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back to Login</span>
            </button>
          )}

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-700 hover:text-[#06402B] text-xs sm:text-[13px] font-bold shadow-sm transition-all border border-slate-200 backdrop-blur-sm"
          >
            <ArrowLeft size={13} />
            <span>Return to Site</span>
          </Link>
        </div>
      </header>

      {/* ── Main Single-Card Viewport Container ── */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-2 sm:p-4 overflow-y-auto sm:overflow-hidden">
        {/* ══════════════════════════════════════════════════════════════════
            STEP 1: ONLY ADMIN LOGIN CARD IS SHOWN
        ══════════════════════════════════════════════════════════════════ */}
        {activeStep === 1 && (
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-7 md:p-8 border border-slate-100/90 w-full max-w-[410px] animate-[fadeIn_0.25s_ease] my-auto">
            {/* Top CMAOF Official Logo */}
            <div className="mb-4">
              <CmaofLogo
                asLink={false}
                imgClassName="h-10 sm:h-11 w-auto object-contain"
              />
            </div>

            {/* Title & Subtitle */}
            <div className="mb-4 sm:mb-5">
              <h1 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight leading-tight">
                Admin Login
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Sign in to access the CMAOF Administration Portal
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {/* Email Address */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@cmaof.org"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10 transition-colors"
                />
              </div>

              {/* Password with Eye Toggle */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 font-medium">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => setForgotModal(true)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <div className="pt-1.5">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-[#06402B] hover:bg-[#042C1D] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </div>
            </form>

            {/* Bottom Security Trust Badge */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck size={14} className="text-emerald-700 shrink-0" />
              <span>Secure • Encrypted • Multi-Factor Authentication</span>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            STEP 2: ONLY TWO-FACTOR AUTHENTICATION CARD IS SHOWN
        ══════════════════════════════════════════════════════════════════ */}
        {activeStep === 2 && (
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-7 md:p-8 border border-slate-100/90 w-full max-w-[410px] animate-[fadeIn_0.25s_ease] my-auto">
            {/* Title & Subtitle */}
            <div className="mb-5">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight leading-tight">
                Two-Factor Authentication
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              {/* 6 Digit Input Boxes */}
              <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={idx === 0 ? handleOtpPaste : undefined}
                    className="w-10 sm:w-11 h-12 sm:h-13 rounded-xl border border-slate-200 bg-white text-center font-bold text-lg sm:text-xl text-[#0B2D6E] focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/15 transition-all shadow-xs"
                  />
                ))}
              </div>

              {/* Trust this device checkbox */}
              <div className="flex items-center gap-2 pt-0.5">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <div
                    onClick={() => setTrustDevice(!trustDevice)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                      trustDevice
                        ? 'bg-[#06402B] text-white shadow-xs'
                        : 'border-2 border-slate-300 bg-white'
                    }`}
                  >
                    {trustDevice && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className="text-xs sm:text-[13px] text-slate-700 font-bold">
                    Trust this device for 30 days
                  </span>
                </label>
              </div>

              {/* Verify Button */}
              <div className="pt-1.5">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full bg-[#06402B] hover:bg-[#042C1D] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isVerifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying code...</span>
                    </>
                  ) : (
                    <span>Verify</span>
                  )}
                </button>
              </div>

              {/* Navigation Links: Use a different method & Back to Login */}
              <div className="flex flex-col items-center gap-1.5 pt-1 text-center">
                <button
                  type="button"
                  onClick={() => setMfaMethodModal(true)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  Use a different method
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  ← Back to Email & Password
                </button>
              </div>
            </form>

            {/* Bottom Security Trust Badge */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck size={14} className="text-emerald-700 shrink-0" />
              <span>This helps keep your account secure</span>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            STEP 3: AUTHENTICATED PORTAL OVERVIEW (Once Verified)
        ══════════════════════════════════════════════════════════════════ */}
        {activeStep === 3 && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200/80 max-w-2xl w-full animate-[fadeIn_0.25s_ease] my-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#06402B] text-white flex items-center justify-center shadow-md">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-black text-[#0B2D6E]">CMAOF Administration Portal</h2>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#06402B] text-[10px] font-extrabold uppercase">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Logged in as <strong className="text-slate-800">{adminUser?.name || 'Foundation Administrator'}</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-[#06402B] uppercase">Total Raised</span>
                  <DollarSign size={15} className="text-[#06402B]" />
                </div>
                <p className="text-xl font-black text-[#06402B]">{stats?.formattedTotal || '₦125,075,000'}</p>
                <p className="text-[10px] text-emerald-700 font-medium">All active programmes</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-[#0B2D6E] uppercase">Verified Donors</span>
                  <Users size={15} className="text-[#0B2D6E]" />
                </div>
                <p className="text-xl font-black text-[#0B2D6E]">{stats?.donorCount || '1,422'}</p>
                <p className="text-[10px] text-blue-700 font-medium">All registered supporters</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-[#EA580C] uppercase">Security Status</span>
                  <ShieldCheck size={15} className="text-[#EA580C]" />
                </div>
                <p className="text-xl font-black text-[#EA580C]">MFA Active</p>
                <p className="text-[10px] text-orange-700 font-medium">Trusted device</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2 pt-1">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Foundation API Logs</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: 'Donations', path: '/api/donations', icon: <DollarSign size={13} /> },
                  { label: 'Subscribers', path: '/api/subscribers', icon: <Mail size={13} /> },
                  { label: 'Inquiries', path: '/api/contact', icon: <FileText size={13} /> },
                  { label: 'Volunteers', path: '/api/volunteers', icon: <Users size={13} /> },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700 hover:text-[#06402B] transition-all"
                  >
                    <span className="flex items-center gap-1">{item.icon} {item.label}</span>
                    <ExternalLink size={11} className="text-slate-400" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Chief Michael Ade.Ojo Foundation • Administration</span>
              <button
                onClick={() => setActiveStep(1)}
                className="text-[#06402B] font-bold hover:underline cursor-pointer"
              >
                Replay Flow
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ── Page Footer Note ── */}
      <footer className="relative z-10 w-full text-center py-2 px-4 text-[11px] text-slate-500 font-medium shrink-0">
        <span>Chief Michael Ade.Ojo Foundation Administration System • Authorized Personnel Only</span>
      </footer>

      {/* ══════════════════════════════════════════════════════════════════
          MODAL: Alternative MFA Methods
      ══════════════════════════════════════════════════════════════════ */}
      {mfaMethodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.15s_ease]">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-base font-black text-[#0B2D6E] mb-1">Verify Your Identity</h3>
            <p className="text-xs text-slate-500 mb-4">Select an alternative authentication method to access your account.</p>

            <div className="space-y-2.5">
              {[
                {
                  id: 'authenticator',
                  title: 'Authenticator App (TOTP)',
                  desc: 'Google Authenticator, Microsoft Authenticator, or 1Password',
                  icon: <Smartphone size={16} className="text-[#06402B]" />,
                },
                {
                  id: 'sms',
                  title: 'SMS Verification Code',
                  desc: 'Send a 6-digit text message to +234 ••• ••• 4190',
                  icon: <Mail size={16} className="text-blue-600" />,
                },
                {
                  id: 'email',
                  title: 'Official Email OTP',
                  desc: 'Dispatch emergency one-time passcode to you@cmaof.org',
                  icon: <Mail size={16} className="text-amber-600" />,
                },
                {
                  id: 'backup',
                  title: 'Backup Security Key',
                  desc: 'Use an 8-character hardware key or recovery code',
                  icon: <KeyRound size={16} className="text-purple-600" />,
                },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelectedMethod(m.id);
                    toast.success(`Switched verification method to: ${m.title}`);
                    setMfaMethodModal(false);
                  }}
                  className={`w-full p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                    selectedMethod === m.id
                      ? 'border-[#06402B] bg-emerald-50/50 ring-2 ring-[#06402B]/10'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-white border border-slate-100 shadow-xs shrink-0 mt-0.5">
                    {m.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{m.title}</h4>
                    <p className="text-[10px] text-slate-500">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setMfaMethodModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MODAL: Forgot Password
      ══════════════════════════════════════════════════════════════════ */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.15s_ease]">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-base font-black text-[#0B2D6E] mb-1">Reset Admin Password</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your verified CMAOF administrator email address. We will send a secure token to reset your password.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Administrator Email
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin@cmaof.org"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div className="pt-1.5 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setForgotModal(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotSubmitting}
                  className="px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow transition-all cursor-pointer disabled:opacity-60"
                >
                  {forgotSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLoginPage;
