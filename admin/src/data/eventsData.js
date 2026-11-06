// CMAOF Strategic Events & Outreach Dataset
// Real events loaded dynamically from MongoDB Atlas database API (/api/events)

export const EVENT_COVERS = [
  { id: 'summit', label: 'Summit & Symposium Stage', url: '/images/event_summit_stage.jpg' },
  { id: 'medical', label: 'Medical Clinic & Health Outreach', url: '/images/event_medical_doctor.jpg' },
  { id: 'education', label: 'Education & STEM Scholars', url: '/images/event_education_girl.jpg' },
  { id: 'community', label: 'Community Dialogue & Traditional Rulers', url: '/images/event_community_leaders.jpg' },
  { id: 'water', label: 'Clean Water & Solar Boreholes', url: '/images/past_event_clean_water.jpg' },
  { id: 'school', label: 'School Supply & Learning Kits', url: '/images/past_event_school_support.jpg' },
];

export const EVENT_CATEGORIES = [
  { id: 'foundation', name: 'Flagship Summit', badgeBg: 'bg-rose-50', badgeText: 'text-rose-700' },
  { id: 'medical', name: 'Medical Outreach', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-700' },
  { id: 'education', name: 'Education Award', badgeBg: 'bg-blue-50', badgeText: 'text-blue-700' },
  { id: 'community', name: 'Community Infrastructure', badgeBg: 'bg-amber-50', badgeText: 'text-amber-700' },
  { id: 'stakeholder', name: 'Stakeholder Forum', badgeBg: 'bg-purple-50', badgeText: 'text-purple-700' },
];

export const INITIAL_EVENTS = [];
