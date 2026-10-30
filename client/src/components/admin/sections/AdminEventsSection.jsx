import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Search,
  Plus,
  Filter,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  ExternalLink,
  Edit,
  Trash2,
  ChevronRight,
  Eye,
  Sparkles,
  Share2,
  Home,
  ArrowLeft,
  ArrowRight,
  Save,
  Check,
  Shield,
  Briefcase,
  LayoutGrid,
  Table as TableIcon,
  Download,
  X,
  Copy,
  Radio,
  Star,
  Tag,
  Image as ImageIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  INITIAL_EVENTS,
  EVENT_COVERS,
  EVENT_CATEGORIES,
} from '../../../data/eventsData';

const SCHEDULE_STEPS = [
  { id: 1, label: 'Identity & Visual Cover' },
  { id: 2, label: 'Date, Venue & Pillar' },
  { id: 3, label: 'Capacity & Live Preview' },
];

const PRESET_TAG_OPTIONS = [
  { label: 'Flagship Event', bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]' },
  { label: 'Stakeholder Engagement', bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]' },
  { label: 'Medical Outreach', bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]' },
  { label: 'Community Health', bg: 'bg-[#E0F2FE]', text: 'text-[#0369A1]' },
  { label: 'Education Support', bg: 'bg-[#E0F2FE]', text: 'text-[#0369A1]' },
  { label: 'Children & Youth', bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]' },
  { label: 'Community Resilience', bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]' },
  { label: 'WASH Initiative', bg: 'bg-[#DCFCE7]', text: 'text-[#166534]' },
];

/* ─────────────────────────────────────────────────────────────────
   EVENT DOSSIER & ATTENDEES SLIDE-OVER DRAWER
───────────────────────────────────────────────────────────────── */
const EventDossierDrawer = ({ event, onClose, onDelete }) => {
  if (!event) return null;

  const copyEventLink = () => {
    const link = `${window.location.origin}/events#${event.id}`;
    navigator.clipboard.writeText(link);
    toast.success(`Copied public event link to clipboard!`);
  };

  const handleExportAttendeesCSV = () => {
    if (!event.attendees || event.attendees.length === 0) {
      toast('No registered attendees to export yet.', { icon: 'ℹ️' });
      return;
    }
    const headers = ['Ticket Ref', 'Name', 'Email', 'Organization', 'Registration Date'];
    const rows = event.attendees.map((a) => [
      `"${a.ticketRef}"`,
      `"${a.name}"`,
      `"${a.email}"`,
      `"${a.org}"`,
      `"${a.date}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${event.id}_attendees.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Attendee roster exported as CSV!');
  };

  const capacityPct = Math.min(100, Math.round((event.registered / event.capacity) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-[slideInRight_0.25s_ease]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70 sticky top-0 z-10 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-[#0B2D6E] px-2.5 py-1 rounded-md bg-white border border-slate-200">
                {event.id}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  event.status === 'Upcoming'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : event.status === 'Draft'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {event.status === 'Upcoming' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />}
                {event.status}
              </span>
            </div>
            <h2 className="text-base font-black text-slate-900">Assembly Logistics Dossier</h2>
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
          {/* Hero Banner with Floating Date Badge */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-md border border-slate-200/80">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs rounded-xl px-2.5 py-1.5 shadow-md border border-white/80 text-center select-none min-w-[56px]">
              <span className="block text-base font-black text-[#06402B] leading-none">{event.dateDay}</span>
              <span className="block text-[10px] font-extrabold uppercase text-slate-700 tracking-wider leading-none mt-1">
                {event.dateMonthYear}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">{event.category}</span>
              <h3 className="text-base font-black leading-snug">{event.title}</h3>
            </div>
          </div>

          {/* Logistics Specs Grid */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Logistics & Venue Specifications</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Date & Time</span>
                <span className="font-bold text-slate-800">{event.date} • {event.time}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Strategic Pillar</span>
                <span className="font-bold text-[#06402B]">{event.pillar}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Venue & Assembly Point</span>
                <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  <MapPin size={13} className="text-[#EA580C] shrink-0" />
                  {event.location}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Lead Coordinator</span>
                <span className="font-bold text-slate-800">{event.leadCoordinator}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Delegate Capacity</span>
                <span className="font-mono font-black text-slate-800">{event.registered} / {event.capacity} ({capacityPct}%)</span>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div className="space-y-1 pt-1 border-t border-slate-200">
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full bg-[#06402B]" style={{ width: `${capacityPct}%` }} />
              </div>
            </div>
          </div>

          {/* Registered Attendees Roster */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Confirmed Delegates ({event.attendees ? event.attendees.length : 0})
              </h4>
              <button
                type="button"
                onClick={handleExportAttendeesCSV}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#06402B] hover:underline cursor-pointer"
              >
                <Download size={11} />
                <span>Export CSV</span>
              </button>
            </div>

            {event.attendees && event.attendees.length > 0 ? (
              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 bg-white">
                {event.attendees.map((att, idx) => (
                  <div key={idx} className="p-3 text-xs flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-900">{att.name}</p>
                      <span className="text-[10px] text-slate-400 block">{att.org} • {att.email}</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#06402B] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                      {att.ticketRef}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400 font-medium">
                No individual RSVP delegates recorded in this dossier yet.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 sticky bottom-0 z-10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={copyEventLink}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Copy size={13} />
            <span>Copy Event Link</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onDelete(event.id, event.title);
            }}
            className="p-2.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 cursor-pointer transition-colors"
            title="Delete Event"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN ADMIN EVENTS SECTION
───────────────────────────────────────────────────────────────── */
const AdminEventsSection = () => {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventDossier, setSelectedEventDossier] = useState(null);

  // View state: 'events' | 'schedule'
  const [currentView, setCurrentView] = useState('events');
  const [scheduleStep, setScheduleStep] = useState(1);

  // New Event Form State with rich visual cover photo and tags
  const [newEvent, setNewEvent] = useState({
    title: '',
    image: '/images/event_summit_stage.jpg',
    dateDay: '15 - 17',
    dateMonthYear: 'APR 2026',
    date: '15 - 17 Apr 2026',
    time: '09:00 AM – 04:30 PM WAT',
    location: '',
    category: 'Flagship Summit',
    categoryId: 'foundation',
    capacity: 500,
    pillar: 'Education & Human Capital',
    leadCoordinator: 'Hauwa Bello',
    description: '',
    tags: [
      { label: 'Flagship Event', bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]' },
      { label: 'Stakeholder Engagement', bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]' },
    ],
    buttonText: 'Register Now',
    buttonType: 'register',
  });

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.pillar.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [events, searchQuery, statusFilter, categoryFilter]);

  const handleCreateEvent = () => {
    if (!newEvent.title.trim() || !newEvent.location.trim()) {
      toast.error('Please enter the event title and location');
      return;
    }

    const created = {
      id: `evt-${Date.now()}`,
      title: newEvent.title.trim(),
      date: newEvent.date || `${newEvent.dateDay} ${newEvent.dateMonthYear}`,
      dateDay: newEvent.dateDay || '12',
      dateMonthYear: newEvent.dateMonthYear || 'NOV 2026',
      time: newEvent.time,
      location: newEvent.location.trim(),
      image: newEvent.image || '/images/event_summit_stage.jpg',
      category: newEvent.category,
      categoryId: newEvent.categoryId || 'foundation',
      status: 'Upcoming',
      registered: 0,
      capacity: Number(newEvent.capacity) || 300,
      pillar: newEvent.pillar,
      leadCoordinator: newEvent.leadCoordinator || 'CMAOF Secretariat',
      description: newEvent.description || 'Strategic assembly supporting Nigerian community resilience.',
      tags: newEvent.tags.length > 0 ? newEvent.tags : [
        { label: newEvent.category, bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]' }
      ],
      buttonText: newEvent.buttonText || 'Register Now',
      buttonType: newEvent.buttonType || 'register',
      attendees: [],
    };

    setEvents([created, ...events]);
    toast.success(`Event "${created.title}" successfully published to calendar!`);
    setCurrentView('events');
    setScheduleStep(1);
    setNewEvent({
      title: '',
      image: '/images/event_summit_stage.jpg',
      dateDay: '15 - 17',
      dateMonthYear: 'APR 2026',
      date: '15 - 17 Apr 2026',
      time: '09:00 AM – 04:30 PM WAT',
      location: '',
      category: 'Flagship Summit',
      categoryId: 'foundation',
      capacity: 500,
      pillar: 'Education & Human Capital',
      leadCoordinator: 'Hauwa Bello',
      description: '',
      tags: [
        { label: 'Flagship Event', bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]' },
      ],
      buttonText: 'Register Now',
      buttonType: 'register',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteEvent = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the active schedule?`)) {
      setEvents(events.filter((e) => e.id !== id));
      toast.success(`"${title}" removed from schedule.`);
    }
  };

  const handleShareEventLink = (event, e) => {
    if (e) e.stopPropagation();
    const link = `${window.location.origin}/events#${event.id}`;
    navigator.clipboard.writeText(link);
    toast.success(`Public event link for "${event.title}" copied!`);
  };

  // ─────────────────────────────────────────────────────────────
  // VIEW: 3-STEP IN-PLACE SCHEDULE EVENT WIZARD (WITH LIVE PREVIEW)
  // ─────────────────────────────────────────────────────────────
  if (currentView === 'schedule') {
    return (
      <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-500">
            <button
              type="button"
              onClick={() => {
                setCurrentView('events');
                setScheduleStep(1);
              }}
              className="flex items-center gap-1.5 hover:text-[#06402B] text-sky-600 transition-colors cursor-pointer"
            >
              <Home size={15} className="text-sky-600" />
              <span className="font-semibold text-sky-600">Events</span>
            </button>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="font-bold text-[#0B2D6E]">Schedule Strategic Assembly</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setCurrentView('events');
              setScheduleStep(1);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#06402B] transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Events Calendar</span>
          </button>
        </div>

        {/* 3-Step Stepper Tracker */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="relative overflow-x-auto pb-1">
            <div className="min-w-[420px]">
              <div className="absolute top-[18px] left-10 right-10 h-0.5 bg-slate-200 -z-0" />
              <div className="relative z-10 flex items-center justify-between">
                {SCHEDULE_STEPS.map((step) => {
                  const isPassed = scheduleStep > step.id;
                  const isCurrent = scheduleStep === step.id;

                  return (
                    <div
                      key={step.id}
                      onClick={() => {
                        if (step.id < scheduleStep) setScheduleStep(step.id);
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
                        className={`text-xs mt-2 font-bold max-w-[120px] leading-tight ${
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

        {/* Form Grid with Live Event Card Preview on Step 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Steps */}
          <div className={`${scheduleStep === 3 ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-6`}>
            {/* STEP 1: Identity & Visual Cover */}
            {scheduleStep === 1 && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
                <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
                  <Sparkles size={18} className="text-[#06402B]" />
                  <span>Assembly Identity, Cover Photo & Summary</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Select a high-resolution cover image and define the public symposium description.
                </p>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Official Assembly Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2026 Ilara-Mokin Community Townhall & Free Health Screenings"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                    />
                  </div>

                  {/* Visual Cover Photo Selector */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                      <ImageIcon size={14} className="text-[#06402B]" />
                      <span>Select Cover Photo Preset (Matching Public Card)</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {EVENT_COVERS.map((cov) => {
                        const isSelected = newEvent.image === cov.url;
                        return (
                          <div
                            key={cov.id}
                            onClick={() => setNewEvent({ ...newEvent, image: cov.url })}
                            className={`rounded-2xl overflow-hidden border-2 cursor-pointer transition-all relative group ${
                              isSelected ? 'border-[#06402B] ring-2 ring-[#06402B]/20 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                              <img src={cov.url} alt={cov.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="p-2 bg-white text-[11px] font-bold text-slate-800 truncate">
                              {cov.label}
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#06402B] text-white flex items-center justify-center shadow-xs">
                                <Check size={11} strokeWidth={3} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary / Description */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Public Overview & Description</label>
                    <textarea
                      rows={3}
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="e.g. Flagship gathering bringing together civic leaders, traditional institutions, and development partners to advance healthcare and education..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Date, Venue & Pillar */}
            {scheduleStep === 2 && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
                <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
                  <CalendarIcon size={18} className="text-[#06402B]" />
                  <span>Date, Schedule, Venue & Pillar Alignment</span>
                </h2>

                <div className="space-y-4 text-xs">
                  {/* Floating Date Badge inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Date Days (Floating Badge) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 15 - 17 or 12"
                        value={newEvent.dateDay}
                        onChange={(e) => setNewEvent({ ...newEvent, dateDay: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-900 focus:outline-none focus:border-[#06402B]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Month & Year (Floating Badge) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. APR 2026 or NOV 2026"
                        value={newEvent.dateMonthYear}
                        onChange={(e) => setNewEvent({ ...newEvent, dateMonthYear: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-900 focus:outline-none focus:border-[#06402B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">Time & Timezone</label>
                      <input
                        type="text"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        placeholder="e.g. 09:00 AM – 04:30 PM WAT"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">Event Category</label>
                      <select
                        value={newEvent.category}
                        onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                      >
                        <option value="Flagship Summit">Flagship Summit</option>
                        <option value="Medical Outreach">Medical Outreach</option>
                        <option value="Education Award">Education Award</option>
                        <option value="Community Infrastructure">Community Infrastructure</option>
                        <option value="Livelihoods Demo">Livelihoods Demo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Venue & Location Description <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grand Ballroom, Eko Hotels & Suites, Victoria Island, Lagos"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">Strategic Pillar</label>
                      <select
                        value={newEvent.pillar}
                        onChange={(e) => setNewEvent({ ...newEvent, pillar: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                      >
                        <option value="Education & Human Capital">Education & Human Capital</option>
                        <option value="Health & Well-being">Health & Well-being</option>
                        <option value="Community Resilience">Community Resilience</option>
                        <option value="Multi-Pillar Stakeholder">Multi-Pillar Stakeholder</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">Lead Logistics Coordinator</label>
                      <input
                        type="text"
                        value={newEvent.leadCoordinator}
                        onChange={(e) => setNewEvent({ ...newEvent, leadCoordinator: e.target.value })}
                        placeholder="e.g. Hauwa Bello / Dr. Kelechi Nwosu"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Capacity, Button Type & Authorization */}
            {scheduleStep === 3 && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
                <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
                  <Shield size={18} className="text-[#06402B]" />
                  <span>Capacity, Action Buttons & Authorization</span>
                </h2>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">Delegate Capacity (Seats)</label>
                      <input
                        type="number"
                        value={newEvent.capacity}
                        onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono font-bold text-sm focus:outline-none focus:border-[#06402B]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">Action Button Label</label>
                      <select
                        value={newEvent.buttonText}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNewEvent({
                            ...newEvent,
                            buttonText: val,
                            buttonType: val.includes('Register') ? 'register' : 'learn_more',
                          });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                      >
                        <option value="Register Now">Register Now (Opens RSVP Form)</option>
                        <option value="Learn More">Learn More (Opens Event Details)</option>
                        <option value="View Report">View Report (Post-Mission Brief)</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#06402B] shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      Publishing this assembly will immediately synchronize it across the <strong>Home Page</strong> and <strong>Events Page</strong>, enabling online attendee registrations and public calendar syndication.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Bottom Controls */}
            <div className="flex items-center justify-between pt-2">
              <div>
                {scheduleStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setScheduleStep((prev) => prev - 1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Previous Step
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toast.success('Event draft saved to session.')}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2D6E] hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
                >
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (scheduleStep < 3) {
                      if (scheduleStep === 1 && !newEvent.title.trim()) {
                        toast.error('Event title is required');
                        return;
                      }
                      if (scheduleStep === 2 && !newEvent.location.trim()) {
                        toast.error('Venue location is required');
                        return;
                      }
                      setScheduleStep((prev) => prev + 1);
                    } else {
                      handleCreateEvent();
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                >
                  <span>{scheduleStep === 3 ? 'Publish Event to Calendar' : 'Next Step'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Event Card Preview (Shown on Step 3) */}
          {scheduleStep === 3 && (
            <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  Live Public Card Preview
                </span>
                <Eye size={16} className="text-emerald-700" />
              </div>

              {/* Exact Card matching public Events Page */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img src={newEvent.image} alt={newEvent.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs rounded-xl px-2.5 py-1.5 shadow-md border border-white/80 text-center select-none min-w-[56px]">
                      <span className="block text-base font-black text-[#06402B] leading-none">{newEvent.dateDay || '15 - 17'}</span>
                      <span className="block text-[10px] font-extrabold uppercase text-slate-700 tracking-wider leading-none mt-1">
                        {newEvent.dateMonthYear || 'APR 2026'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5 text-xs">
                    <h4 className="font-extrabold text-[#0B2D6E] text-sm leading-snug line-clamp-2">
                      {newEvent.title || 'Untitled Assembly'}
                    </h4>
                    <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                      {newEvent.description || 'Description of the strategic assembly and community objectives.'}
                    </p>

                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold pt-1">
                      <Clock size={12} className="text-[#06402B] shrink-0" />
                      <span className="truncate">{newEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin size={12} className="text-[#EA580C] shrink-0" />
                      <span className="truncate">{newEvent.location || 'Venue location'}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FEE2E2] text-[#991B1B]">
                        {newEvent.category}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#E0F2FE] text-[#0369A1]">
                        {newEvent.pillar}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="w-full py-2 px-3 rounded-xl font-bold text-white text-xs bg-[#06402B] flex items-center justify-center gap-1.5">
                    <span>{newEvent.buttonText}</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT: EVENTS LISTING VIEW (GRID CARDS & TABLE MODES)
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. EXECUTIVE HEADER & CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-1.5 h-7 rounded-full bg-[#f97316]" />
            <h1 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight">
              Events & Outreach Assemblies
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span>{events.filter((e) => e.status === 'Upcoming').length} Active Field Operations Scheduled</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium pl-4">
            Coordinate public symposiums, medical intervention camps, and community infrastructure handovers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentView('schedule');
            setScheduleStep(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Schedule Strategic Event</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. 4 EXECUTIVE LOGISTICS KPI CARDS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
            Upcoming Assemblies
          </span>
          <div className="text-2xl font-black text-[#0B2D6E] font-mono">
            {events.filter((e) => e.status === 'Upcoming').length} Active
          </div>
          <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <CheckCircle2 size={12} /> 100% on schedule
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
            Total RSVPs & Delegates
          </span>
          <div className="text-2xl font-black text-[#0B2D6E] font-mono">
            {events.reduce((sum, e) => sum + e.registered, 0).toLocaleString()} Registered
          </div>
          <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <Sparkles size={12} /> +28% RSVP velocity
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
            Completed Missions
          </span>
          <div className="text-2xl font-black text-[#0B2D6E] font-mono">
            {events.filter((e) => e.status === 'Completed').length} Audited
          </div>
          <p className="text-[11px] text-slate-500 font-semibold">100% MEAL verified</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
            Average Capacity Ratio
          </span>
          <div className="text-2xl font-black text-[#0B2D6E] font-mono">92.4%</div>
          <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <CheckCircle2 size={12} /> High civic participation
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. FILTERS, SEARCH & VIEW MODE SWITCHER
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {['All', 'Upcoming', 'Draft', 'Completed'].map((status) => {
              const count = status === 'All' ? events.length : events.filter((e) => e.status === status).length;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`
                    px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5
                    ${
                      statusFilter === status
                        ? 'bg-[#06402B] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }
                  `}
                >
                  <span>{status}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      statusFilter === status ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search, Category Filter & View Toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 sm:w-56">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search assembly, venue, pillar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-7 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#06402B] focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Flagship Summit">Flagship Summit</option>
              <option value="Medical Outreach">Medical Outreach</option>
              <option value="Education Award">Education Award</option>
              <option value="Community Infrastructure">Community Infrastructure</option>
              <option value="Livelihoods Demo">Livelihoods Demo</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#0B2D6E] shadow-2xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Cards Grid View"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#0B2D6E] shadow-2xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Table Ledger View"
              >
                <TableIcon size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. EVENTS CARDS GRID VIEW OR TABLE VIEW
        ───────────────────────────────────────────────────────────── */}
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-medium">
            No events found matching your filter parameters.
          </div>
        ) : viewMode === 'grid' ? (
          /* Cards Grid View (Matching Public Events Page Card Quality!) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
            {filteredEvents.map((evt) => {
              const capacityPct = Math.min(100, Math.round((evt.registered / evt.capacity) * 100));

              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEventDossier(evt)}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Cover Image with Floating Date Badge & Status */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <img
                        src={evt.image}
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Floating Date Badge */}
                      <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs rounded-xl px-2.5 py-1.5 shadow-md border border-white/80 text-center select-none min-w-[56px]">
                        <span className="block text-base sm:text-lg font-black text-[#06402B] leading-none">
                          {evt.dateDay}
                        </span>
                        <span className="block text-[10px] font-extrabold uppercase text-slate-700 tracking-wider leading-none mt-1">
                          {evt.dateMonthYear}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs backdrop-blur-xs ${
                          evt.status === 'Upcoming'
                            ? 'bg-emerald-500/90 text-white'
                            : evt.status === 'Draft'
                            ? 'bg-amber-500/90 text-white'
                            : 'bg-slate-700/90 text-white'
                        }`}
                      >
                        {evt.status}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-base sm:text-[17px] font-extrabold text-[#0B2D6E] leading-snug group-hover:text-[#06402B] transition-colors line-clamp-2">
                        {evt.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                        {evt.description}
                      </p>

                      <div className="space-y-1.5 pt-1 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                          <Clock size={13} className="text-[#06402B] shrink-0" />
                          <span className="truncate">{evt.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin size={13} className="text-[#EA580C] shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {evt.tags && evt.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${tag.bg} ${tag.text}`}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>

                      {/* Capacity Progress Bar */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-800">{evt.registered} RSVPs</span>
                          <span className="text-slate-400 font-normal">Cap: {evt.capacity} ({capacityPct}%)</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full bg-[#06402B]" style={{ width: `${capacityPct}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100/80 pt-3">
                    <span className="text-[11px] text-slate-400 font-medium truncate">
                      Coord: <strong className="text-slate-700">{evt.leadCoordinator}</strong>
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleShareEventLink(evt, e)}
                        className="p-1.5 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                        title="Copy Public Link"
                      >
                        <Share2 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEventDossier(evt);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#06402B] hover:text-white text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Eye size={12} />
                        <span>Dossier</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table Ledger View */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="py-3 px-4">Assembly Title & Category</th>
                  <th className="py-3 px-3">Date & Time</th>
                  <th className="py-3 px-3">Venue / Location</th>
                  <th className="py-3 px-3">Strategic Pillar</th>
                  <th className="py-3 px-3">Attendance Capacity</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredEvents.map((evt) => (
                  <tr
                    key={evt.id}
                    onClick={() => setSelectedEventDossier(evt)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-8 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                          <img src={evt.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-[#06402B] transition-colors">
                            {evt.title}
                          </p>
                          <span className="text-[10px] text-slate-400">{evt.category}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <Clock size={12} className="text-[#06402B]" />
                        <span>{evt.date}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{evt.time}</span>
                    </td>

                    <td className="py-3.5 px-3 max-w-[200px]">
                      <div className="flex items-start gap-1 text-slate-600">
                        <MapPin size={12} className="text-[#EA580C] shrink-0 mt-0.5" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {evt.pillar}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 min-w-[130px]">
                      <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                        <span className="text-slate-800">{evt.registered}</span>
                        <span className="text-slate-400 font-normal">Cap: {evt.capacity}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#06402B]"
                          style={{ width: `${Math.min((evt.registered / evt.capacity) * 100, 100)}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          evt.status === 'Upcoming'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : evt.status === 'Draft'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {evt.status === 'Upcoming' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                        {evt.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleShareEventLink(evt, e)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                          title="Copy Event Link"
                        >
                          <Share2 size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEvent(evt.id, evt.title);
                          }}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 cursor-pointer"
                          title="Delete Event"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Event Logistics Dossier Drawer */}
      {selectedEventDossier && (
        <EventDossierDrawer
          event={selectedEventDossier}
          onClose={() => setSelectedEventDossier(null)}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
};

export default AdminEventsSection;
