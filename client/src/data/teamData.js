// Chief Michael Ade.Ojo Foundation (CMAOF) - Institutional Team & Staff Dataset
// Real users loaded dynamically from MongoDB Atlas database API (/api/users)

export const TEAM_ROLES = [
  { id: 'board', label: 'Executive Governance & Administration', badgeBg: 'bg-amber-50', badgeText: 'text-amber-800' },
  { id: 'director', label: 'Director of Programmes', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-800' },
  { id: 'education', label: 'Head of Education & STEM', badgeBg: 'bg-blue-50', badgeText: 'text-blue-800' },
  { id: 'medical', label: 'Chief Medical Outreach Officer', badgeBg: 'bg-rose-50', badgeText: 'text-rose-800' },
  { id: 'field', label: 'Regional Field Coordinator', badgeBg: 'bg-purple-50', badgeText: 'text-purple-800' },
  { id: 'grants', label: 'Grants & Donor Relations Lead', badgeBg: 'bg-sky-50', badgeText: 'text-sky-800' },
];

export const DEPARTMENTS = [
  'Executive Governance & Board',
  'Strategic Interventions',
  'Education Interventions',
  'Health & Well-being',
  'Partnerships & Philanthropy',
  'Compliance & Administration',
];

export const OPERATIONAL_BASES = [
  'Lagos Headquarters',
  'Abuja Liaison Base',
  'Ilara-Mokin Campus Base',
  'Ibadan Operations Hub',
  'Kano Operations Base',
];

export const INITIAL_TEAM_MEMBERS = [
  {
    id: 'admin-01',
    name: 'Foundation Administrator',
    email: 'admin@cmaof.org',
    role: 'Executive Administrator',
    roleId: 'board',
    department: 'Executive Governance & Board',
    location: 'Lagos Headquarters',
    pillar: 'All Strategic Pillars',
    status: 'Active',
    mfaEnabled: false,
    lastActive: 'Active Now',
    avatar: 'FA',
    isSuperAdmin: true,
    joinedYear: '2026',
    permissions: [
      'Beneficiaries: Full Control',
      'Donations: Full Control',
      'Programmes: Full Control',
      'Audit Logs: View & Export',
      'Platform Settings: Full Control',
    ],
  },
];
