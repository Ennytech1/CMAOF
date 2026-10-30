import React, { useState, useMemo } from 'react';
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
  Check,
  Save,
  Shield,
  UserCheck,
  Phone,
  LayoutGrid,
  Table as TableIcon,
  X,
  Award,
  Briefcase,
  Building,
  Sparkles,
  Eye,
  Copy,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  INITIAL_TEAM_MEMBERS,
  TEAM_ROLES,
  DEPARTMENTS,
  OPERATIONAL_BASES,
} from '../../../data/teamData';

const INVITE_STEPS = [
  { id: 1, label: 'Identity & Contact' },
  { id: 2, label: 'Role & Pillar Clearance' },
  { id: 3, label: 'Security & Live Badge' },
];

/* ─────────────────────────────────────────────────────────────────
   TEAM MEMBER DOSSIER SLIDE-OVER DRAWER
───────────────────────────────────────────────────────────────── */
const TeamMemberDossierDrawer = ({ member, onClose, onRevoke, onResetMfa }) => {
  if (!member) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText(member.email);
    toast.success(`Copied ${member.email} to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-[slideInRight_0.25s_ease]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70 sticky top-0 z-10 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-[#0B2D6E] px-2.5 py-1 rounded-md bg-white border border-slate-200">
                {member.id}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  member.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {member.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />}
                {member.status}
              </span>
              {member.isSuperAdmin && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  Super Admin
                </span>
              )}
            </div>
            <h2 className="text-base font-black text-slate-900">Personnel Clearance Dossier</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 text-xs sm:text-sm">
          {/* Profile Card Banner */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 border-2 border-white shadow-md shrink-0 relative">
              {member.photo ? (
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#06402B] text-white font-black text-lg flex items-center justify-center">
                  {member.avatar}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="text-base sm:text-lg font-black text-[#0B2D6E] leading-snug truncate">
                {member.name}
              </h3>
              <p className="text-xs font-bold text-[#06402B] truncate">{member.role}</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-0.5">
                <MapPin size={12} className="shrink-0 text-slate-400" />
                <span className="truncate">{member.location}</span>
                <span>•</span>
                <span className="truncate">{member.joinedYear}</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Contact & Base Allocation</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Official Email</span>
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span className="truncate">{member.email}</span>
                  <button type="button" onClick={copyEmail} className="text-slate-400 hover:text-[#06402B] cursor-pointer" title="Copy">
                    <Copy size={12} />
                  </button>
                </div>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Phone Line</span>
                <span className="font-bold text-slate-800">{member.phone || '+234 800 000 0000'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Department Unit</span>
                <span className="font-bold text-[#0B2D6E]">{member.department}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Strategic Pillar</span>
                <span className="font-bold text-[#06402B]">{member.pillar}</span>
              </div>
            </div>
          </div>

          {/* Biographical Background */}
          {member.bio && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Institutional Profile & Scope</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                {member.bio}
              </p>
            </div>
          )}

          {/* Role Privileges & Access Checklist */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Authorized System Privileges</h4>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              {(member.permissions || [
                'Beneficiary Registry Authorization',
                'Intervention Milestone Reporting',
                'General Operational Coordination',
              ]).map((perm, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#06402B] flex items-center justify-center shrink-0">
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span>{perm}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security & MFA Status */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Security Clearance</span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                {member.mfaEnabled ? (
                  <>
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>MFA Authenticator Enforced</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert size={14} className="text-amber-600" />
                    <span>MFA Setup Pending</span>
                  </>
                )}
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Last active {member.lastActive}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          {!member.isSuperAdmin ? (
            <button
              type="button"
              onClick={() => onRevoke(member.id, member.name)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer"
            >
              <Trash2 size={14} />
              <span>Revoke Credentials</span>
            </button>
          ) : (
            <span className="text-xs font-bold text-slate-400">Permanent Governance Account</span>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onResetMfa(member.email)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
            >
              <RefreshCw size={13} />
              <span>Reset MFA OTP</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN ADMIN TEAM & STAFF COMPONENT
───────────────────────────────────────────────────────────────── */
const AdminUsersSection = () => {
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [activeDossierMember, setActiveDossierMember] = useState(null);

  // View state: 'directory' | 'invite'
  const [currentView, setCurrentView] = useState('directory');
  const [inviteStep, setInviteStep] = useState(1);

  // New Team Member Form State
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Regional Field Coordinator',
    department: 'Strategic Interventions',
    location: 'Lagos Headquarters',
    pillar: 'Community Resilience',
    bio: '',
    mfaEnforced: true,
  });

  const filteredMembers = useMemo(() => {
    return teamMembers.filter((m) => {
      const matchesDept =
        departmentFilter === 'All' ||
        m.department.toLowerCase().includes(departmentFilter.toLowerCase()) ||
        m.role.toLowerCase().includes(departmentFilter.toLowerCase());

      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDept && matchesSearch;
    });
  }, [teamMembers, searchQuery, departmentFilter]);

  const handleRevoke = (id, name) => {
    if (window.confirm(`Are you sure you want to revoke system credentials for ${name}?`)) {
      setTeamMembers((prev) => prev.filter((m) => m.id !== id));
      toast.success(`Access credentials for ${name} revoked.`);
      if (activeDossierMember && activeDossierMember.id === id) {
        setActiveDossierMember(null);
      }
    }
  };

  const handleResetMfa = (email) => {
    toast.success(`Secure onboarding OTP and MFA reset link sent to ${email}`, {
      icon: '🔐',
    });
  };

  const handleAuthorizeMember = () => {
    if (!newMember.name.trim() || !newMember.email.trim()) {
      toast.error('Please enter personnel name and institutional email');
      return;
    }

    const created = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: newMember.name.trim(),
      email: newMember.email.trim(),
      phone: newMember.phone.trim() || '+234 800 000 0000',
      role: newMember.role,
      roleId: 'field',
      department: newMember.department,
      location: newMember.location,
      pillar: newMember.pillar,
      status: 'Active',
      mfaEnabled: true,
      lastActive: 'Pending First Login',
      avatar: newMember.name.slice(0, 2).toUpperCase(),
      photo: null,
      isSuperAdmin: false,
      joinedYear: '2026',
      bio: newMember.bio || 'Authorized foundation personnel appointed to execute grassroots community interventions.',
      permissions: [
        'Beneficiary Registry Authorization',
        'Field Logistics Reporting',
        'Standard Operations Privileges',
      ],
    };

    setTeamMembers([created, ...teamMembers]);
    toast.success(`Team member ${created.name} successfully authorized with MFA link sent to ${created.email}!`, {
      icon: '🎉',
    });
    setCurrentView('directory');
    setInviteStep(1);
    setNewMember({
      name: '',
      email: '',
      phone: '',
      role: 'Regional Field Coordinator',
      department: 'Strategic Interventions',
      location: 'Lagos Headquarters',
      pillar: 'Community Resilience',
      bio: '',
      mfaEnforced: true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRoleBadgeStyle = (role) => {
    if (role.includes('Chairman') || role.includes('Founder')) return 'bg-amber-50 text-amber-800 border-amber-200';
    if (role.includes('Director')) return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (role.includes('Education') || role.includes('STEM')) return 'bg-blue-50 text-blue-800 border-blue-200';
    if (role.includes('Medical')) return 'bg-rose-50 text-rose-800 border-rose-200';
    if (role.includes('Northern') || role.includes('Coordinator')) return 'bg-purple-50 text-purple-800 border-purple-200';
    if (role.includes('Grants') || role.includes('Donor')) return 'bg-sky-50 text-sky-800 border-sky-200';
    return 'bg-slate-100 text-slate-800 border-slate-200';
  };

  // ─────────────────────────────────────────────────────────────
  // 3-STEP IN-PLACE TEAM MEMBER AUTHORIZATION WIZARD
  // ─────────────────────────────────────────────────────────────
  if (currentView === 'invite') {
    return (
      <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-500">
            <button
              type="button"
              onClick={() => {
                setCurrentView('directory');
                setInviteStep(1);
              }}
              className="flex items-center gap-1.5 hover:text-[#06402B] text-sky-600 transition-colors cursor-pointer"
            >
              <Home size={15} className="text-sky-600" />
              <span className="font-semibold text-sky-600">Team</span>
            </button>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="font-bold text-[#0B2D6E]">Authorize Foundation Personnel</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setCurrentView('directory');
              setInviteStep(1);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#06402B] transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Team Directory</span>
          </button>
        </div>

        {/* 3-Step Progress Tracker */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="relative overflow-x-auto pb-1">
            <div className="min-w-[420px]">
              <div className="absolute top-[18px] left-10 right-10 h-0.5 bg-slate-200 -z-0" />
              <div className="relative z-10 flex items-center justify-between">
                {INVITE_STEPS.map((step) => {
                  const isPassed = inviteStep > step.id;
                  const isCurrent = inviteStep === step.id;

                  return (
                    <div
                      key={step.id}
                      onClick={() => {
                        if (step.id < inviteStep) setInviteStep(step.id);
                      }}
                      className="flex flex-col items-center text-center px-1 cursor-pointer group"
                    >
                      {isPassed ? (
                        <div className="w-9 h-9 rounded-full bg-[#06402B] text-white flex items-center justify-center shadow-xs ring-4 ring-white">
                          <Check size={16} strokeWidth={3} />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-9 h-9 rounded-full bg-[#06402B] text-white flex items-center justify-center font-black text-sm shadow-md ring-4 ring-emerald-100">
                          {step.id}
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-white border-2 border-slate-200 text-slate-400 font-bold text-sm flex items-center justify-center ring-4 ring-white group-hover:border-slate-300">
                          {step.id}
                        </div>
                      )}

                      <p
                        className={`text-xs mt-2 font-bold max-w-[140px] leading-tight ${
                          isCurrent
                            ? 'text-[#06402B]'
                            : isPassed
                            ? 'text-slate-800'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 1: Identity & Contact */}
        {inviteStep === 1 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Users size={18} className="text-[#06402B]" />
              <span>Personnel Identity & Official Contact Details</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Official Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adebayo Ogunlesi"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Institutional Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. adebayo.o@cmaof.org"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Direct Mobile Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. +234 803 124 5590"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Assigned Operational Base</label>
                <select
                  value={newMember.location}
                  onChange={(e) => setNewMember({ ...newMember, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] cursor-pointer"
                >
                  {OPERATIONAL_BASES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Professional Background & Scope</label>
                <textarea
                  rows={3}
                  value={newMember.bio}
                  onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                  placeholder="Summary of experience, academic qualifications, and field responsibility..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#06402B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Role & Pillar Clearance */}
        {inviteStep === 2 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Briefcase size={18} className="text-[#06402B]" />
              <span>Role-Based Access Control (RBAC) & Strategic Pillar Alignment</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">System Access Role *</label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] cursor-pointer"
                  >
                    <option value="Director of Programmes">Director of Programmes (Full Operations)</option>
                    <option value="Head of Education Pillar & STEM Grants">Head of Education & STEM Grants</option>
                    <option value="Chief Medical Outreach Officer">Chief Medical Outreach Officer</option>
                    <option value="Regional Field Coordinator">Regional Field Coordinator (Field & Intake)</option>
                    <option value="Grants & Donor Relations Lead">Grants & Donor Relations Lead</option>
                    <option value="Infrastructure & Solar WASH Lead">Infrastructure & Solar WASH Lead</option>
                    <option value="Safeguarding & PSEA Officer">Safeguarding & PSEA Officer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Department Directorate</label>
                  <select
                    value={newMember.department}
                    onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] cursor-pointer"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Assigned Strategic Pillar</label>
                <select
                  value={newMember.pillar}
                  onChange={(e) => setNewMember({ ...newMember, pillar: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] cursor-pointer"
                >
                  <option value="Education & Human Capital">Education & Human Capital</option>
                  <option value="Health & Well-being">Health & Well-being</option>
                  <option value="Community Resilience">Community Resilience</option>
                  <option value="Strategic Interventions">Strategic Interventions</option>
                  <option value="Governance & Accountability">Governance & Accountability</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="font-bold text-slate-800 block text-xs">Security & Cryptographic Safeguards</span>
                <p className="text-slate-600 leading-relaxed">
                  Upon issuance, a secure 256-bit onboarding OTP activation link will be dispatched to the officer's institutional email. Multi-Factor Authentication (MFA) via authenticator app is mandatory prior to accessing confidential beneficiary dossiers.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Security & Real-Time Live Badge Preview */}
        {inviteStep === 3 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Shield size={18} className="text-[#06402B]" />
              <span>Review Authorization & Real-Time Live Staff Badge Preview</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Form & Confirmation */}
              <div className="lg:col-span-7 space-y-4 text-xs">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Officer Authorization Summary
                  </span>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500">Official Name:</span>
                    <span className="font-bold text-slate-900">{newMember.name || 'Unnamed Personnel'}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500">Role & Department:</span>
                    <span className="font-bold text-[#0B2D6E]">{newMember.role}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500">Assigned Base:</span>
                    <span className="font-bold text-slate-800">{newMember.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Institutional Email:</span>
                    <span className="font-mono font-bold text-slate-800">{newMember.email}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="memberVerify"
                    checked={newMember.mfaEnforced}
                    onChange={(e) => setNewMember({ ...newMember, mfaEnforced: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                  />
                  <label htmlFor="memberVerify" className="text-xs text-slate-700 font-medium cursor-pointer">
                    <span className="font-bold text-[#06402B]">Governance Clearance:</span> I certify that this personnel authorization complies with CMAOF trustee charters, safeguarding guidelines, and data confidentiality standards.
                  </label>
                </div>
              </div>

              {/* Right Column: Interactive Live Staff Badge Preview */}
              <div className="lg:col-span-5 bg-slate-100/80 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-amber-500" />
                    <span>Real-Time Staff Badge Preview</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    Live Preview
                  </span>
                </div>

                {/* Team Card Mockup */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#06402B] text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0">
                      {newMember.name ? newMember.name.slice(0, 2).toUpperCase() : 'TM'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-sm text-[#0B2D6E] truncate">
                        {newMember.name || 'Personnel Name'}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400 truncate">{newMember.email || 'email@cmaof.org'}</p>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-slate-100 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Role:</span>
                      <span className="font-bold text-[#06402B]">{newMember.role}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Base:</span>
                      <span className="font-semibold text-slate-700">{newMember.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">MFA Status:</span>
                      <span className="font-bold text-emerald-700">Enforced</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div>
            {inviteStep > 1 && (
              <button
                type="button"
                onClick={() => setInviteStep((prev) => prev - 1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Previous
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toast.success('Staff authorization draft saved.')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2D6E] hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => {
                if (inviteStep < 3) {
                  if (inviteStep === 1 && (!newMember.name.trim() || !newMember.email.trim())) {
                    toast.error('Name and institutional email are required');
                    return;
                  }
                  setInviteStep((prev) => prev + 1);
                } else {
                  handleAuthorizeMember();
                }
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              <span>{inviteStep === 3 ? 'Confirm & Authorize Staff' : 'Next Step'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT TEAM DIRECTORY OVERVIEW VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      
      {/* 1. Header with Clear Simple Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#06402B]">
            <Users size={15} />
            <span>Team & Governance Directory</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-0.5">
            Foundation Leadership & Field Team
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            Manage executive leadership, regional operations coordinators, medical officers, and role-based security clearance.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentView('invite');
            setInviteStep(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus size={16} />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* 2. 4 Strategic Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Total Officers</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-[#06402B]">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">{teamMembers.length} Active</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-700 font-bold">
              <CheckCircle2 size={13} />
              <span>100% Identity Verified</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">MFA Compliance</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0B2D6E]">
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-[#0B2D6E]">
              {Math.round((teamMembers.filter((m) => m.mfaEnabled).length / teamMembers.length) * 100)}%
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-blue-700 font-bold">
              <Key size={13} />
              <span>Hardware & Authenticator</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Super Admins</span>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
              <Award size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">
              {teamMembers.filter((m) => m.isSuperAdmin).length} Accounts
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-purple-700 font-bold">
              <Shield size={13} />
              <span>Chairman & Executive Director</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Operations Hubs</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <MapPin size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">5 Hubs</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-amber-800 font-bold">
              <Building size={13} />
              <span>Lagos, Abuja, Ilara, Kano, Oyo</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar & View Mode Toggle */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search team by name, role, base..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#06402B] focus:ring-1 focus:ring-[#06402B]/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">Role Filter:</span>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#06402B] cursor-pointer"
          >
            <option value="All">All Departments & Roles</option>
            <option value="Governance">Board Governance</option>
            <option value="Director">Directorate</option>
            <option value="Education">Education & STEM</option>
            <option value="Health">Health & Medical</option>
            <option value="Northern">Northern Field Coordinator</option>
            <option value="Philanthropy">Philanthropy & Grants</option>
          </select>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#06402B] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">Cards Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#06402B] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <TableIcon size={14} />
              <span className="hidden sm:inline">Table View</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Content View: Cards Grid vs Table View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredMembers.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between group hover:-translate-y-1 space-y-4"
            >
              {/* Member Upper Section */}
              <div className="space-y-3.5">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-sm">
                      {m.photo ? (
                        <img src={m.photo} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-[#06402B] text-white font-black text-sm flex items-center justify-center">
                          {m.avatar}
                        </div>
                      )}
                    </div>
                    {/* Active pulse ring */}
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getRoleBadgeStyle(m.role)}`}>
                    {m.isSuperAdmin ? 'Super Admin' : 'Staff'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3
                    onClick={() => setActiveDossierMember(m)}
                    className="font-bold text-[14.5px] text-[#0B2D6E] leading-snug group-hover:text-[#06402B] transition-colors cursor-pointer line-clamp-1"
                  >
                    {m.name}
                  </h3>
                  <p className="text-xs font-bold text-[#06402B] line-clamp-1">{m.role}</p>
                  <p className="text-[11px] font-mono text-slate-400 truncate">{m.email}</p>
                </div>

                {/* Location & Pillar Chips */}
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <MapPin size={12} className="text-slate-400 shrink-0" />
                    <span className="truncate">{m.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#0B2D6E] font-medium">
                    <Briefcase size={12} className="text-blue-500 shrink-0" />
                    <span className="truncate">{m.pillar}</span>
                  </div>
                </div>
              </div>

              {/* Security & Actions Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                {m.mfaEnabled ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <ShieldCheck size={11} />
                    <span>MFA Enforced</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    <ShieldAlert size={11} />
                    <span>MFA Pending</span>
                  </span>
                )}

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveDossierMember(m)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#06402B] hover:bg-emerald-50 transition-colors cursor-pointer"
                    title="View Member Dossier"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResetMfa(m.email)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B2D6E] hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Reset Password / MFA"
                  >
                    <RefreshCw size={14} />
                  </button>
                  {!m.isSuperAdmin && (
                    <button
                      type="button"
                      onClick={() => handleRevoke(m.id, m.name)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Revoke Credentials"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Table Ledger View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="py-3 px-4">Officer & Email</th>
                  <th className="py-3 px-4">Role & Directorate</th>
                  <th className="py-3 px-4">Operational Base</th>
                  <th className="py-3 px-4">Strategic Pillar</th>
                  <th className="py-3 px-4">MFA Security</th>
                  <th className="py-3 px-4">Last Active</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          {m.photo ? (
                            <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[#06402B] text-white font-black text-xs flex items-center justify-center">
                              {m.avatar}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p
                            onClick={() => setActiveDossierMember(m)}
                            className="font-bold text-slate-900 hover:text-[#06402B] cursor-pointer"
                          >
                            {m.name}
                          </p>
                          <span className="text-[10px] font-mono text-slate-400 block">{m.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-800">{m.role}</p>
                      <span className="text-[10px] text-slate-400">{m.department}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{m.location}</td>
                    <td className="py-3 px-4 text-[#06402B] font-semibold">{m.pillar}</td>
                    <td className="py-3 px-4">
                      {m.mfaEnabled ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <ShieldCheck size={11} />
                          <span>Enforced</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <ShieldAlert size={11} />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-500">{m.lastActive}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setActiveDossierMember(m)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#06402B] hover:bg-emerald-50 cursor-pointer"
                          title="View Dossier"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleResetMfa(m.email)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#0B2D6E] hover:bg-blue-50 cursor-pointer"
                          title="Reset MFA"
                        >
                          <RefreshCw size={14} />
                        </button>
                        {!m.isSuperAdmin && (
                          <button
                            type="button"
                            onClick={() => handleRevoke(m.id, m.name)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                            title="Revoke"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-8 space-y-3 shadow-xs">
          <Users size={36} className="mx-auto text-slate-300" />
          <h4 className="text-base font-bold text-slate-700">No personnel found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or clearing the department filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setDepartmentFilter('All');
            }}
            className="text-xs font-bold text-[#06402B] hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* 5. Slide-Over Team Member Dossier Drawer */}
      <TeamMemberDossierDrawer
        member={activeDossierMember}
        onClose={() => setActiveDossierMember(null)}
        onRevoke={handleRevoke}
        onResetMfa={handleResetMfa}
      />

    </div>
  );
};

export default AdminUsersSection;
