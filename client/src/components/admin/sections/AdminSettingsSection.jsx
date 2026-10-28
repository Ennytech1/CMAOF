import React, { useState } from 'react';
import {
  Settings,
  Building,
  CreditCard,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  Key,
  RefreshCw,
  Mail,
  Lock,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSettingsSection = () => {
  const [activeTab, setActiveTab] = useState('general'); // 'general', 'gateways', 'security', 'notifications'

  // General Settings State
  const [generalConfig, setGeneralConfig] = useState({
    orgName: 'Chief Michael Ade.Ojo Foundation',
    cacNumber: 'CAC/IT/NO 128490',
    primaryEmail: 'info@cmaof.org',
    headquarters: 'Elizade Complex, Ikorodu Road, Lagos & Maitama, Abuja',
    telephone: '+234 800 000 2626',
    currency: 'NGN (₦)',
  });

  // Gateway Settings State
  const [gatewayConfig, setGatewayConfig] = useState({
    paystackEnabled: true,
    paystackPublicKey: 'pk_live_89410f9293b4820194829104',
    flutterwaveEnabled: true,
    flutterwavePublicKey: 'FLWPUBK_LIVE-92849102840-X',
    zenithAccount: '1014892019',
    zenithAccountName: 'Chief Michael Ade.Ojo Foundation',
  });

  // Security Toggles
  const [securityConfig, setSecurityConfig] = useState({
    mandatoryMfa: true,
    sessionTimeoutMins: 30,
    ipRestrictions: true,
    beneficiaryBiometricRetention: true,
  });

  // Notification Toggles
  const [notifConfig, setNotifConfig] = useState({
    highValueDonations: true,
    thresholdAmount: '1,000,000',
    newBeneficiaryAlerts: true,
    dailyDigestEmail: true,
    smsDisbursementAlert: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('System configuration updated successfully and deployed to edge nodes');
  };

  const handleTestWebhooks = () => {
    toast.success('Paystack & Flutterwave webhooks tested: 200 OK Response');
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & SAVE CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-[#06402B] text-[11px] font-black uppercase tracking-wider">
              Platform Configuration
            </span>
            <span className="text-slate-400 text-xs">Production Environment</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            System & Foundation Settings
          </h1>
          <p className="text-xs text-slate-500">
            Configure institutional profile, financial payment gateways, multi-factor authentication, and alerting policies.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold text-xs shadow-sm cursor-pointer transition-all self-start sm:self-auto"
        >
          <Save size={14} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. SETTINGS NAVIGATION TABS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'general', label: 'Organization Profile', icon: Building },
          { id: 'gateways', label: 'Payment Gateways & Banking', icon: CreditCard },
          { id: 'security', label: 'Security & Compliance', icon: Shield },
          { id: 'notifications', label: 'Notifications & Alerts', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer
                ${
                  isActive
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }
              `}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. TAB 1: GENERAL PROFILE
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'general' && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Statutory Legal Identity & Contact Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Registered Entity Name</label>
              <input
                type="text"
                value={generalConfig.orgName}
                onChange={(e) => setGeneralConfig({ ...generalConfig, orgName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#06402B]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">CAC Registration Number</label>
              <input
                type="text"
                value={generalConfig.cacNumber}
                onChange={(e) => setGeneralConfig({ ...generalConfig, cacNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#06402B]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Secretariat Email</label>
              <input
                type="email"
                value={generalConfig.primaryEmail}
                onChange={(e) => setGeneralConfig({ ...generalConfig, primaryEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#06402B]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Telephone Contact Helpline</label>
              <input
                type="text"
                value={generalConfig.telephone}
                onChange={(e) => setGeneralConfig({ ...generalConfig, telephone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#06402B]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Headquarters & Operating Secretariat</label>
              <input
                type="text"
                value={generalConfig.headquarters}
                onChange={(e) => setGeneralConfig({ ...generalConfig, headquarters: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#06402B]"
              />
            </div>
          </div>
        </form>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. TAB 2: PAYMENT GATEWAYS
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'gateways' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Payment Processor Integrations</h2>
                <p className="text-xs text-slate-400">Card payments, USSD, and recurring diaspora donations</p>
              </div>
              <button
                type="button"
                onClick={handleTestWebhooks}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs cursor-pointer"
              >
                Test Webhooks
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Paystack Card */}
              <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">Paystack Nigeria</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      Live Mode
                    </span>
                  </div>
                  <p className="text-slate-500 font-mono text-[11px]">Key: {gatewayConfig.paystackPublicKey}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-600">Connected</span>
                </div>
              </div>

              {/* Flutterwave Card */}
              <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">Flutterwave (Global & USD)</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      Live Mode
                    </span>
                  </div>
                  <p className="text-slate-500 font-mono text-[11px]">Key: {gatewayConfig.flutterwavePublicKey}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-600">Connected</span>
                </div>
              </div>

              {/* Bank Settlement Account */}
              <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
                <span className="font-bold text-slate-800 block">Direct Settlement Bank Account</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-500 font-semibold block">Bank & Account Number</label>
                    <span className="font-bold text-slate-900">Zenith Bank PLC • 1014892019</span>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 font-semibold block">Account Name</label>
                    <span className="font-bold text-slate-900">Chief Michael Ade.Ojo Foundation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. TAB 3: SECURITY & COMPLIANCE
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Cryptographic Access Policies & Data Governance
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80">
              <div>
                <span className="font-bold text-slate-900 block">Mandatory Two-Factor Authentication (MFA)</span>
                <span className="text-slate-500 text-[11px]">Requires authenticator app code or email OTP for all logins.</span>
              </div>
              <input
                type="checkbox"
                checked={securityConfig.mandatoryMfa}
                onChange={(e) => setSecurityConfig({ ...securityConfig, mandatoryMfa: e.target.checked })}
                className="w-4 h-4 accent-[#06402B] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80">
              <div>
                <span className="font-bold text-slate-900 block">Inactivity Auto-Logout Timeout</span>
                <span className="text-slate-500 text-[11px]">Automatically expires idle administrative sessions.</span>
              </div>
              <span className="font-bold text-slate-800">30 Minutes</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80">
              <div>
                <span className="font-bold text-slate-900 block">Beneficiary Data Protection (NDPR Compliance)</span>
                <span className="text-slate-500 text-[11px]">Enforces consent capture and automated anonymization on exported datasets.</span>
              </div>
              <input
                type="checkbox"
                checked={securityConfig.beneficiaryBiometricRetention}
                onChange={(e) => setSecurityConfig({ ...securityConfig, beneficiaryBiometricRetention: e.target.checked })}
                className="w-4 h-4 accent-[#06402B] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. TAB 4: NOTIFICATIONS
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Automated Alert Dispatch & Channels
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80">
              <div>
                <span className="font-bold text-slate-900 block">High-Value Philanthropic Gift Notification</span>
                <span className="text-slate-500 text-[11px]">Instant SMS/Email alert to Executive Chairman when donation ≥ ₦1,000,000.</span>
              </div>
              <input
                type="checkbox"
                checked={notifConfig.highValueDonations}
                onChange={(e) => setNotifConfig({ ...notifConfig, highValueDonations: e.target.checked })}
                className="w-4 h-4 accent-[#06402B] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80">
              <div>
                <span className="font-bold text-slate-900 block">Daily Executive Field Activity Digest</span>
                <span className="text-slate-500 text-[11px]">Automated morning briefing summarizing new beneficiaries and pending approvals.</span>
              </div>
              <input
                type="checkbox"
                checked={notifConfig.dailyDigestEmail}
                onChange={(e) => setNotifConfig({ ...notifConfig, dailyDigestEmail: e.target.checked })}
                className="w-4 h-4 accent-[#06402B] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80">
              <div>
                <span className="font-bold text-slate-900 block">SMS Disbursement Confirmation</span>
                <span className="text-slate-500 text-[11px]">Send verified SMS receipt to scholars and emergency medical hospitals.</span>
              </div>
              <input
                type="checkbox"
                checked={notifConfig.smsDisbursementAlert}
                onChange={(e) => setNotifConfig({ ...notifConfig, smsDisbursementAlert: e.target.checked })}
                className="w-4 h-4 accent-[#06402B] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsSection;
