import React, { useState } from 'react';
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
} from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_ADMIN_EVENTS = [
  {
    id: 'evt-001',
    title: 'CMAOF Annual Philanthropy Summit 2026',
    date: '15 - 17 Apr 2026',
    time: '09:00 AM WAT',
    location: 'Grand Ballroom, Eko Hotels & Suites, Victoria Island, Lagos',
    category: 'Flagship Summit',
    status: 'Upcoming',
    registered: 480,
    capacity: 500,
    pillar: 'Multi-Pillar Stakeholder',
    leadCoordinator: 'Hauwa Bello',
  },
  {
    id: 'evt-002',
    title: 'Free Cataract Surgeries & Maternal Health Clinic',
    date: '12 Nov 2026',
    time: '08:00 AM WAT',
    location: 'Adeoyo Maternity Hospital, Ibadan, Oyo State',
    category: 'Medical Outreach',
    status: 'Upcoming',
    registered: 620,
    capacity: 750,
    pillar: 'Health & Well-being',
    leadCoordinator: 'Dr. Kelechi Nwosu',
  },
  {
    id: 'evt-003',
    title: 'Chief Michael Ade.Ojo 2026 STEM Scholars Induction',
    date: '05 Dec 2026',
    time: '10:30 AM WAT',
    location: 'Elizade University Auditorium, Ilara-Mokin, Ondo State',
    category: 'Education Award',
    status: 'Upcoming',
    registered: 350,
    capacity: 400,
    pillar: 'Education & Human Capital',
    leadCoordinator: 'Babatunde Adeleke',
  },
  {
    id: 'evt-004',
    title: 'Kano State Clean Water Borehole Commissioning Tour',
    date: '18 Jan 2027',
    time: '11:00 AM WAT',
    location: 'Bichi & Dawakin Kudu LGAs, Kano State',
    category: 'Community Infrastructure',
    status: 'Draft',
    registered: 45,
    capacity: 100,
    pillar: 'Community Resilience',
    leadCoordinator: 'Musa Garba',
  },
  {
    id: 'evt-005',
    title: 'Youth Agritech Micro-Grants Demo Day',
    date: '28 Sep 2026',
    time: '09:00 AM WAT',
    location: 'Civic Innovation Hub, Port Harcourt, Rivers State',
    category: 'Livelihoods',
    status: 'Completed',
    registered: 210,
    capacity: 200,
    pillar: 'Community Resilience',
    leadCoordinator: 'Chidinma Okey',
  },
];

const SCHEDULE_STEPS = [
  { id: 1, label: 'Event Details & Venue' },
  { id: 2, label: 'Capacity & Pillar' },
  { id: 3, label: 'Review & Authorize' },
];

const AdminEventsSection = () => {
  const [events, setEvents] = useState(INITIAL_ADMIN_EVENTS);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // View state: 'events' | 'schedule' (NO POPUP)
  const [currentView, setCurrentView] = useState('events');
  const [scheduleStep, setScheduleStep] = useState(1);

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '09:00 AM WAT',
    location: '',
    category: 'Flagship Summit',
    capacity: 300,
    pillar: 'Education & Human Capital',
    leadCoordinator: 'Hauwa Bello',
    description: '',
  });

  const filteredEvents = events.filter((e) => {
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.pillar.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateEvent = () => {
    if (!newEvent.title.trim() || !newEvent.location.trim()) {
      toast.error('Please enter the event title and location');
      return;
    }

    const created = {
      id: `evt-${Date.now()}`,
      title: newEvent.title.trim(),
      date: newEvent.date || 'To be scheduled',
      time: newEvent.time,
      location: newEvent.location.trim(),
      category: newEvent.category,
      status: 'Upcoming',
      registered: 0,
      capacity: Number(newEvent.capacity) || 200,
      pillar: newEvent.pillar,
      leadCoordinator: newEvent.leadCoordinator,
    };

    setEvents([created, ...events]);
    toast.success(`Event "${created.title}" successfully scheduled!`);
    setCurrentView('events');
    setScheduleStep(1);
    setNewEvent({
      title: '',
      date: '',
      time: '09:00 AM WAT',
      location: '',
      category: 'Flagship Summit',
      capacity: 300,
      pillar: 'Education & Human Capital',
      leadCoordinator: 'Hauwa Bello',
      description: '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteEvent = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the schedule?`)) {
      setEvents(events.filter((e) => e.id !== id));
      toast.success(`"${title}" removed from schedule`);
    }
  };

  // ── IN-PLACE DEDICATED EVENT REGISTRATION VIEW (NO POPUP) ──
  if (currentView === 'schedule') {
    return (
      <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span
              className="flex items-center gap-1 hover:text-[#06402B] cursor-pointer"
              onClick={() => setCurrentView('events')}
            >
              <Home size={13} />
              <span>Home</span>
            </span>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="hover:text-[#06402B] cursor-pointer" onClick={() => setCurrentView('events')}>
              Events & Outreach
            </span>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-slate-900 font-bold">Schedule Strategic Event</span>
          </div>

          <button
            type="button"
            onClick={() => setCurrentView('events')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft size={14} />
            <span>Back to Events Calendar</span>
          </button>
        </div>

        {/* Section Header */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="w-1.5 h-10 rounded-full bg-[#f97316] mt-0.5 shrink-0" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0B2D6E] tracking-tight">
                Schedule Strategic Outreach & Assembly
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Register symposiums, medical intervention camps, and community infrastructure handovers.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#06402B] border border-emerald-200 self-start sm:self-auto">
            Phase {scheduleStep} of 3: {SCHEDULE_STEPS[scheduleStep - 1].label}
          </span>
        </div>

        {/* Stepper matching Register Beneficiary design */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-between min-w-[500px]">
            {SCHEDULE_STEPS.map((step, idx) => {
              const isCompleted = step.id < scheduleStep;
              const isCurrent = step.id === scheduleStep;

              return (
                <React.Fragment key={step.id}>
                  <div
                    onClick={() => {
                      if (step.id < scheduleStep) setScheduleStep(step.id);
                    }}
                    className={`flex flex-col items-center gap-1.5 ${step.id < scheduleStep ? 'cursor-pointer hover:opacity-80' : ''}`}
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

                  {idx < SCHEDULE_STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 transition-all ${
                        step.id < scheduleStep ? 'bg-[#06402B]' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Panels */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          {scheduleStep === 1 && (
            <div className="space-y-5 text-xs animate-[fadeIn_0.2s_ease]">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-black text-[#0B2D6E]">Event Overview & Venue Information</h2>
                <p className="text-slate-500">Provide official summit title, date, time, and physical venue location.</p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Official Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026 Ilara-Mokin Community Townhall & Free Screenings"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm font-semibold focus:outline-none focus:border-[#06402B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Date *</label>
                  <input
                    type="text"
                    placeholder="e.g. 18 Nov 2026"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Time & Timezone</label>
                  <input
                    type="text"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Location / Venue Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adeoyo Maternity Hospital, Ibadan, Oyo State"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                />
              </div>
            </div>
          )}

          {scheduleStep === 2 && (
            <div className="space-y-5 text-xs animate-[fadeIn_0.2s_ease]">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-black text-[#0B2D6E]">Capacity, Pillar & Leadership</h2>
                <p className="text-slate-500">Assign strategic category, guest capacity, and lead staff coordinator.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Event Category</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                  >
                    <option value="Flagship Summit">Flagship Summit</option>
                    <option value="Medical Outreach">Medical Outreach</option>
                    <option value="Education Award">Education Award</option>
                    <option value="Community Infrastructure">Community Infrastructure</option>
                    <option value="Livelihoods">Livelihoods Demo</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Delegate Capacity (Seats)</label>
                  <input
                    type="number"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold focus:outline-none focus:border-[#06402B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Strategic Pillar Alignment</label>
                  <select
                    value={newEvent.pillar}
                    onChange={(e) => setNewEvent({ ...newEvent, pillar: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-[#06402B]"
                  />
                </div>
              </div>
            </div>
          )}

          {scheduleStep === 3 && (
            <div className="space-y-5 text-xs animate-[fadeIn_0.2s_ease]">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-black text-[#0B2D6E]">Review Event Dossier & Publish</h2>
                <p className="text-slate-500">Confirm all logistics details prior to making this assembly active.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Event Title</span>
                    <p className="text-base font-extrabold text-[#0B2D6E]">{newEvent.title || 'Untitled Assembly'}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#06402B] border border-emerald-200 self-start sm:self-auto">
                    {newEvent.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Date & Time</span>
                    <span className="font-bold text-slate-800">{newEvent.date} ({newEvent.time})</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Venue</span>
                    <span className="font-bold text-slate-800 truncate block">{newEvent.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Pillar</span>
                    <span className="font-bold text-slate-800">{newEvent.pillar}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Lead Coordinator</span>
                    <span className="font-bold text-slate-800">{newEvent.leadCoordinator}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Footer Controls */}
          <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={() => setCurrentView('events')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => toast.success('Event draft saved!')}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold cursor-pointer flex items-center gap-1.5"
              >
                <Save size={14} />
                <span>Save Draft</span>
              </button>

              {scheduleStep > 1 && (
                <button
                  type="button"
                  onClick={() => setScheduleStep((prev) => prev - 1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  if (scheduleStep < 3) {
                    if (scheduleStep === 1 && (!newEvent.title.trim() || !newEvent.location.trim())) {
                      toast.error('Please enter the event title and location');
                      return;
                    }
                    setScheduleStep((prev) => prev + 1);
                  } else {
                    handleCreateEvent();
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white font-bold cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <span>{scheduleStep === 3 ? 'Confirm & Publish Event' : 'Next Step'}</span>
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
              Field Activities & Assemblies
            </span>
            <span className="text-slate-400 text-xs">Calendar 2026/27</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Events & Outreach Logistics
          </h1>
          <p className="text-xs text-slate-500">
            Coordinate public symposiums, medical intervention camps, and community infrastructure handovers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentView('schedule');
            setScheduleStep(1);
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold text-xs shadow-sm cursor-pointer transition-all self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Schedule New Event</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Upcoming Assemblies</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {events.filter((e) => e.status === 'Upcoming').length} Active
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">100% on schedule</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Total Delegates & Attendees</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {events.reduce((sum, e) => sum + e.registered, 0).toLocaleString()} Registered
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">+28% RSVP velocity</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Completed Field Missions</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {events.filter((e) => e.status === 'Completed').length} Audited
          </div>
          <span className="text-[11px] text-slate-500">100% MEAL verified</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
          <span className="text-xs font-semibold text-slate-400">Average Capacity Ratio</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900">89.4%</div>
          <span className="text-[11px] text-emerald-600 font-bold">High civic attendance</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FILTERS & SEARCH BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['All', 'Upcoming', 'Draft', 'Completed'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-[#06402B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, location or pillar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:outline-none focus:border-[#06402B] focus:bg-white"
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. EVENTS TABLE
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3 px-4">Event & Category</th>
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-3">Venue / Location</th>
                <th className="py-3 px-3">Pillar</th>
                <th className="py-3 px-3">Attendance Capacity</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{evt.title}</p>
                    <span className="text-[11px] text-slate-400 font-normal">{evt.category}</span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                      <Clock size={12} className="text-[#06402B]" />
                      <span>{evt.date}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{evt.time}</span>
                  </td>
                  <td className="py-3 px-3 max-w-[220px]">
                    <div className="flex items-start gap-1 text-slate-600">
                      <MapPin size={12} className="text-slate-400 shrink-0 mt-0.5" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {evt.pillar}
                    </span>
                  </td>
                  <td className="py-3 px-3 min-w-[130px]">
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                      <span className="text-slate-700">{evt.registered} RSVP</span>
                      <span className="text-slate-400 font-normal">Cap: {evt.capacity}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#06402B]"
                        style={{ width: `${Math.min((evt.registered / evt.capacity) * 100, 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        evt.status === 'Upcoming'
                          ? 'bg-emerald-100 text-emerald-800'
                          : evt.status === 'Completed'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {evt.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => toast.success(`Viewing logistics pack for ${evt.title}`)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                        title="View Logistics Pack"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(evt.id, evt.title)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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

export default AdminEventsSection;
