import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  ShieldCheck,
  ShieldAlert,
  Key,
  Mail,
  MapPin,
  Lock,
  CheckCircle2,
  Filter,
  MoreVertical,
  Trash2,
  RefreshCw,
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Save,
  Check,
  Shield,
  UserCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_USERS = [
  {
    id: 'usr-01',
    name: 'Chief Michael Ade.Ojo, OON',
    email: 'm.adeojo@cmaof.org',
    role: 'Founder & Board Chairman',
    department: 'Executive Governance & Board',
    location: 'Lagos Headquarters',
    status: 'Active',
    mfaEnabled: true,
    lastActive: '12 mins ago',
    avatar: 'MA',
    isSuperAdmin: true,
  },
  {
    id: 'usr-02',
    name: 'Hauwa Bello',
    email: 'h.bello@cmaof.org',
    role: 'Director of Programmes & Field Operations',
    department: 'Strategic Interventions',
    location: 'Abuja Liaison Base',
    status: 'Active',
    mfaEnabled: true,
    lastActive: 'Just now',
    avatar: 'HB',
    isSuperAdmin: true,
  },
  {
    id: 'usr-03',
    name: 'Babatunde Adeleke',
    email: 'b.adeleke@cmaof.org',
    role: 'Head of Education Pillar & STEM Grants',
    department: 'Education Interventions',
    location: 'Ilara-Mokin Campus Base',
    status: 'Active',
    mfaEnabled: true,
    lastActive: '2 hrs ago',
    avatar: 'BA',
  },
  {
    id: 'usr-04',
    name: 'Dr. Kelechi Nwosu',
    email: 'k.nwosu@cmaof.org',
    role: 'Chief Medical Outreach Officer',
    department: 'Health & Well-being',
    location: 'Ibadan Medical Hub',
    status: 'Active',
    mfaEnabled: true,
    lastActive: '4 hrs ago',
    avatar: 'KN',
  },
  {
    id: 'usr-05',
    name: 'Musa Garba',
    email: 'musa.g@cmaof.org',
    role: 'Regional Field Coordinator',
    department: 'Northern Interventions',
    location: 'Kano Operations Base',
    status: 'Active',
    mfaEnabled: false,
    lastActive: 'Yesterday',
    avatar: 'MG',
  },
  {
    id: 'usr-06',
    name: 'Chidinma Okey',
    email: 'chidinma.o@cmaof.org',
    role: 'Grants & Donor Relations Lead',
    department: 'Partnerships & Philanthropy',
    location: 'Lagos HQ',
    status: 'Active',
    mfaEnabled: true,
    lastActive: 'Yesterday',
    avatar: 'CO',
  },
];

const INVITE_STEPS = [
  { id: 1, label: 'Identity & Credentials' },
  { id: 2, label: 'Role & Security Policy' },
  { id: 3, label: 'Review & Authorize' },
];

const AdminUsersSection = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // View state: 'directory' | 'invite' (NO POPUP)
  const [currentView, setCurrentView] = useState('directory');
  const [inviteStep, setInviteStep] = useState(1);

  // New User Form State
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Field Coordinator',
    department: 'Community Resilience',
    location: 'Lagos HQ',
    mfaEnforced: true,
  });

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'All' || u.role.toLowerCase().includes(roleFilter.toLowerCase());
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleInviteSubmit = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      toast.error('Please enter name and institutional email');
      return;
    }

    const created = {
      id: `usr-${Date.now()}`,
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      role: newUser.role,
      department: newUser.department,
      location: newUser.location,
      status: 'Active',
      mfaEnabled: false,
      lastActive: 'Pending First Login',
      avatar: newUser.name.slice(0, 2).toUpperCase(),
    };

    setUsers([created, ...users]);
    toast.success(`Invitation with onboarding MFA link sent to ${created.email}`);
    setCurrentView('directory');
    setInviteStep(1);
    setNewUser({
      name: '',
      email: '',
      role: 'Field Coordinator',
      department: 'Community Resilience',
      location: 'Lagos HQ',
      mfaEnforced: true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRevoke = (id, name) => {
    if (window.confirm(`Are you sure you want to revoke system credentials for ${name}?`)) {
      setUsers(users.filter((u) => u.id !== id));
      toast.success(`Access credentials for ${name} revoked.`);
    }
  };

  // ── IN-PLACE DEDICATED STAFF AUTHORIZATION VIEW (NO POPUP) ──
  if (currentView === 'invite') {
    return (
      <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span
              className="flex items-center gap-1 hover:text-[#06402B] cursor-pointer"
              onClick={() => setCurrentView('directory')}
            >
              <Home size={13} />
              <span>Home</span>
            </span>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="hover:text-[#06402B] cursor-pointer" onClick={() => setCurrentView('directory')}>
              Staff & Governance
            </span>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-slate-900 font-bold">Authorize Foundation Staff</span>
          </div>

          <button
            type="button"
            onClick={() => setCurrentView('directory')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft size={14} />
            <span>Back to Staff Directory</span>
          </button>
        </div>

        {/* Section Header */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="w-1.5 h-10 rounded-full bg-[#f97316] mt-0.5 shrink-0" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight">
                Authorize New Foundation Personnel
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Issue role-based credentials, configure audit privileges, and enforce institutional MFA protocols.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#06402B] border border-emerald-200 self-start sm:self-auto">
            Phase {inviteStep} of 3: {INVITE_STEPS[inviteStep - 1].label}
          </span>
        </div>

        {/* Stepper matching Register Beneficiary design */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-between min-w-[500px]">
            {INVITE_STEPS.map((step, idx) => {
              const isCompleted = step.id < inviteStep;
              const isCurrent = step.id === inviteStep;

              return (
                <React.Fragment key={step.id}>
                  <div
                    onClick={() => {
                      if (step.id < inviteStep) setInviteStep(step.id);
                    }}
                    className={`flex flex-col items-center gap-1.5 ${step.id < inviteStep ? 'cursor-pointer hover:opacity-80' : ''}`}
                  >
                    <div
                      className={`
                        w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shadow-xs transition-all
                        ${
                          isCompleted
                            ? 'bg-[#06402B] text-white'
                            : isCurrent
                            ? 'bg-[#0B2D6E] text-white ring-4 ring-blue-100 scale-105'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }
                      `}
                    >
                      {isCompleted ? <Check size={16} strokeWidth={3} /> : step.id}
                    </div>
                    <span
                      className={`text-[11px] font-bold ${
                        isCurrent ? 'text-[#0B2D6E] font-black' : isCompleted ? 'text-[#06402B]' : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {idx < INVITE_STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 transition-all ${
                        step.id < inviteStep ? 'bg-[#06402B]' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form Content Cards */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          {inviteStep === 1 && (
            <div className="space-y-5 text-xs animate-[fadeIn_0.2s_ease]">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-black text-[#0B2D6E]">Personnel Identity & Institutional Credentials</h2>
                <p className="text-slate-500">Provide official staff name and foundation email address.</p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Official Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adebayo Ogunlesi"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm font-semibold focus:outline-none focus:border-[#06402B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Institutional Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. adebayo.o@cmaof.org"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Assigned Operational Base</label>
                  <input
                    type="text"
                    value={newUser.location}
                    onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                    placeholder="e.g. Abuja Liaison Base"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                  />
                </div>
              </div>
            </div>
          )}

          {inviteStep === 2 && (
            <div className="space-y-5 text-xs animate-[fadeIn_0.2s_ease]">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-black text-[#0B2D6E]">Role-Based Access Control (RBAC) & Security</h2>
                <p className="text-slate-500">Assign operational permissions and enforce multi-factor authentication.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">System Access Role *</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                  >
                    <option value="Programme Manager">Programme Manager (Portfolio & Budgets)</option>
                    <option value="MEAL Officer">MEAL Officer (Impact & Indicators)</option>
                    <option value="Field Coordinator">Field Coordinator (Intake & Distribution)</option>
                    <option value="Finance & Grants Officer">Finance & Grants Officer (Ledgers & Receipts)</option>
                    <option value="Medical Officer">Medical Officer (Health Outreach Dossiers)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Department Unit</label>
                  <select
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                  >
                    <option value="Education Interventions">Education Interventions</option>
                    <option value="Health & Well-being">Health & Well-being</option>
                    <option value="Community Resilience">Community Resilience</option>
                    <option value="Partnerships & Philanthropy">Partnerships & Philanthropy</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="font-bold text-slate-800 block text-xs">Security & Compliance Safeguards</span>
                <p className="text-slate-600 leading-relaxed">
                  Upon issuance, a secure onboarding OTP link will be transmitted to the staff email. Hardware or app-based Multi-Factor Authentication (MFA) is strictly mandated before access to beneficiary dossiers is unlocked.
                </p>
              </div>
            </div>
          )}

          {inviteStep === 3 && (
            <div className="space-y-5 text-xs animate-[fadeIn_0.2s_ease]">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-black text-[#0B2D6E]">Review Authorization Dossier</h2>
                <p className="text-slate-500">Confirm personnel credentials prior to dispatching onboarding invitation.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Staff Name</span>
                    <p className="text-base font-extrabold text-[#0B2D6E]">{newUser.name || 'Unnamed Personnel'}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#06402B] border border-emerald-200 self-start sm:self-auto">
                    {newUser.role}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Address</span>
                    <span className="font-bold text-slate-800">{newUser.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Department</span>
                    <span className="font-bold text-slate-800">{newUser.department}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Base</span>
                    <span className="font-bold text-slate-800">{newUser.location}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Footer Controls */}
          <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={() => setCurrentView('directory')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => toast.success('Staff authorization draft saved!')}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold cursor-pointer flex items-center gap-1.5"
              >
                <Save size={14} />
                <span>Save Draft</span>
              </button>

              {inviteStep > 1 && (
                <button
                  type="button"
                  onClick={() => setInviteStep((prev) => prev - 1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  if (inviteStep < 3) {
                    if (inviteStep === 1 && (!newUser.name.trim() || !newUser.email.trim())) {
                      toast.error('Please enter name and institutional email');
                      return;
                    }
                    setInviteStep((prev) => prev + 1);
                  } else {
                    handleInviteSubmit();
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white font-bold cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <span>{inviteStep === 3 ? 'Confirm & Issue Authorization' : 'Next Step'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-[#06402B] text-[11px] font-black uppercase tracking-wider">
              Governance & RBAC
            </span>
            <span className="text-slate-400 text-xs">Role-Based Security</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Institutional Staff & Access Governance
          </h1>
          <p className="text-xs text-slate-500">
            Control access privileges, monitor security compliance, and authorize field intervention coordinators.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentView('invite');
            setInviteStep(1);
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold text-xs shadow-sm cursor-pointer transition-all self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Authorize Staff</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Total Authorized Officers</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">{users.length} Active</div>
          <span className="text-[11px] text-emerald-600 font-bold">100% Verified Identity</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">MFA Compliance Rate</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {Math.round((users.filter((u) => u.mfaEnabled).length / users.length) * 100)}%
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">Institutional policy active</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Super Admins</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {users.filter((u) => u.isSuperAdmin).length} Accounts
          </div>
          <span className="text-[11px] text-slate-500">Board & Executive Director</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Regional Bases Covered</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">5 Locations</div>
          <span className="text-[11px] text-emerald-600 font-bold">Lagos, Abuja, Ondo, Kano, Oyo</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. USERS TABLE
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['All', 'Manager', 'Coordinator', 'Medical', 'Officer'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  roleFilter === role
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="relative flex-1 sm:w-72">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search staff, email or base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:outline-none focus:border-[#06402B] focus:bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-3">Role & Department</th>
                <th className="py-3 px-3">Assigned Base</th>
                <th className="py-3 px-3">MFA Status</th>
                <th className="py-3 px-3">Last Active</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#06402B]/10 text-[#06402B] font-black flex items-center justify-center text-xs shrink-0">
                        {u.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{u.name}</p>
                        <span className="text-[11px] text-slate-400">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-800">{u.role}</p>
                    <span className="text-[11px] text-slate-400">{u.department}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{u.location}</td>
                  <td className="py-3 px-3">
                    {u.mfaEnabled ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <ShieldCheck size={11} />
                        <span>Enforced</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        <ShieldAlert size={11} />
                        <span>Pending Setup</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{u.lastActive}</td>
                  <td className="py-3 px-4 text-right">
                    {!u.isSuperAdmin ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => toast.success(`MFA reset link resent to ${u.email}`)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                          title="Reset Password & MFA"
                        >
                          <RefreshCw size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRevoke(u.id, u.name)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 cursor-pointer"
                          title="Revoke Credentials"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold pr-2">Primary</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersSection;
