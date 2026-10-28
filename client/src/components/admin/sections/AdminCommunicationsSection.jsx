import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Mail,
  Users,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Download,
  Eye,
  Trash2,
  Bell,
  Sparkles,
  Home,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Save,
  Shield,
  FileText,
  Radio,
} from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_CAMPAIGNS = [
  {
    id: 1,
    title: 'Q3 2026 Foundation Impact Digest & Back-to-School Briefing',
    audience: 'All Subscribers (14,200)',
    status: 'Sent',
    sentDate: '24 Oct 2026',
    openRate: '42.8%',
    clickRate: '12.4%',
    type: 'Newsletter',
  },
  {
    id: 2,
    title: 'Urgent Flood Relief & Clean Water Distribution Update: Ondo State',
    audience: 'Donors & Partners (3,450)',
    status: 'Sent',
    sentDate: '18 Oct 2026',
    openRate: '58.2%',
    clickRate: '21.5%',
    type: 'Field Emergency Bulletin',
  },
  {
    id: 3,
    title: 'Chief Michael Ade.Ojo 2026 Annual Healthcare Fellows Announcement',
    audience: 'Medical Partners & Alumni',
    status: 'Scheduled',
    sentDate: '01 Nov 2026',
    openRate: '-',
    clickRate: '-',
    type: 'Official Press Release',
  },
  {
    id: 4,
    title: 'Monthly Supporter Gratitude & Beneficiary Spotlight: Amina Bello',
    audience: 'Recurring Donors (1,280)',
    status: 'Draft',
    sentDate: 'Draft Mode',
    openRate: '-',
    clickRate: '-',
    type: 'Donor Care',
  },
];

const COMPOSE_STEPS = [
  { id: 1, label: 'Audience & Channel' },
  { id: 2, label: 'Message & Narrative' },
  { id: 3, label: 'Review & Dispatch' },
];

const AdminCommunicationsSection = () => {
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [activeTab, setActiveTab] = useState('campaigns'); // campaigns, subscribers, press
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dedicated View State: 'list' | 'compose' (NO POPUP MODAL)
  const [currentView, setCurrentView] = useState('list');
  const [currentStep, setCurrentStep] = useState(1);

  // New Broadcast Form
  const [newBroadcast, setNewBroadcast] = useState({
    title: '',
    audience: 'All Subscribers (14,200)',
    type: 'Newsletter',
    priority: 'Standard',
    previewText: 'Key milestones, field updates, and community impact reports from CMAOF.',
    message: '',
    senderIdentity: 'Executive Office <press@cmaofoundation.org>',
  });

  const handleSend = () => {
    if (!newBroadcast.title.trim()) {
      toast.error('Please enter broadcast subject header');
      return;
    }

    const created = {
      id: Date.now(),
      title: newBroadcast.title,
      audience: newBroadcast.audience,
      status: 'Sent',
      sentDate: 'Just Now',
      openRate: '0.0%',
      clickRate: '0.0%',
      type: newBroadcast.type,
    };

    setCampaigns([created, ...campaigns]);
    toast.success(`Official broadcast "${created.title}" dispatched successfully!`);
    setCurrentView('list');
    setCurrentStep(1);
    setNewBroadcast({
      title: '',
      audience: 'All Subscribers (14,200)',
      type: 'Newsletter',
      priority: 'Standard',
      previewText: 'Key milestones, field updates, and community impact reports from CMAOF.',
      message: '',
      senderIdentity: 'Executive Office <press@cmaofoundation.org>',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    toast.success('Broadcast campaign draft saved successfully.');
  };

  // ─────────────────────────────────────────────────────────────
  // DEDICATED IN-PLACE COMPOSE VIEW (Matches Register Beneficiary Design)
  // ─────────────────────────────────────────────────────────────
  if (currentView === 'compose') {
    return (
      <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-500">
            <button
              type="button"
              onClick={() => {
                setCurrentView('list');
                setCurrentStep(1);
              }}
              className="flex items-center gap-1.5 hover:text-[#06402B] text-sky-600 transition-colors cursor-pointer"
            >
              <Home size={15} className="text-sky-600" />
              <span className="font-semibold text-sky-600">Communications</span>
            </button>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="font-bold text-[#0B2D6E]">Compose Official Broadcast</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setCurrentView('list');
              setCurrentStep(1);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#06402B] transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Campaigns</span>
          </button>
        </div>

        {/* 3-Step Progress Tracker */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="relative overflow-x-auto pb-1">
            <div className="min-w-[420px]">
              <div className="absolute top-[18px] left-10 right-10 h-0.5 bg-slate-200 -z-0" />
              <div className="relative z-10 flex items-center justify-between">
                {COMPOSE_STEPS.map((step) => {
                  const isPassed = currentStep > step.id;
                  const isCurrent = currentStep === step.id;

                  return (
                    <div
                      key={step.id}
                      onClick={() => {
                        if (step.id < currentStep) setCurrentStep(step.id);
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

        {/* STEP 1: Audience & Channels */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Users size={18} className="text-[#06402B]" />
              <span>Target Audience, Sender & Channel Configuration</span>
            </h2>
            <p className="text-xs text-slate-500">
              Select verified subscriber segments and configure delivery protocol clearance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Target Audience Segment <span className="text-rose-500">*</span>
                </label>
                <select
                  value={newBroadcast.audience}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, audience: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                >
                  <option value="All Subscribers (14,200)">All Verified Subscribers (14,200 contacts)</option>
                  <option value="Donors & Partners (3,450)">Philanthropic Donors & CSR Partners (3,450)</option>
                  <option value="Medical Outreach Teams (480)">Medical Outreach & Field Staff (480)</option>
                  <option value="Board & Leadership (18)">Board of Trustees & Advisory Council (18)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Channel Format <span className="text-rose-500">*</span>
                </label>
                <select
                  value={newBroadcast.type}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                >
                  <option value="Newsletter">Impact Digest Newsletter (Responsive HTML)</option>
                  <option value="Field Emergency Bulletin">Field Emergency & Crisis Bulletin</option>
                  <option value="Official Press Release">Official Foundation Press Release</option>
                  <option value="Donor Care">Donor Gratitude & Financial Stewardship</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Sender Identity</label>
                <input
                  type="text"
                  value={newBroadcast.senderIdentity}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, senderIdentity: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Dispatch Priority</label>
                <select
                  value={newBroadcast.priority}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, priority: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                >
                  <option value="Standard">Standard Delivery (Immediate Queue)</option>
                  <option value="High Priority">High Priority (Bypass Throttle)</option>
                  <option value="Scheduled">Scheduled for Weekend Digest</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Message & Narrative */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <FileText size={18} className="text-[#06402B]" />
              <span>Broadcast Copy, Subject Header & Narrative Content</span>
            </h2>
            <p className="text-xs text-slate-500">
              Draft the official notification body, header tags, and preview summary snippet.
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Subject Header <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newBroadcast.title}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, title: e.target.value })}
                  placeholder="e.g. Q4 2026 Executive Progress Update & Ondo Clean Water Milestone"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Inbox Preview Snippet</label>
                <input
                  type="text"
                  value={newBroadcast.previewText}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, previewText: e.target.value })}
                  placeholder="Short 1-line teaser displayed in email inbox..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Official Message Body <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={newBroadcast.message}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, message: e.target.value })}
                  placeholder="Draft your full message, foundation updates, links, or field announcements..."
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Dispatch */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Shield size={18} className="text-[#06402B]" />
              <span>Review Audience Clearance & Confirm Dispatch</span>
            </h2>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subject</span>
                  <p className="text-base font-extrabold text-[#0B2D6E]">{newBroadcast.title || 'Untitled Broadcast'}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#06402B] border border-emerald-200 self-start sm:self-auto">
                  {newBroadcast.type}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Recipient Segment</span>
                  <span className="font-bold text-slate-900 text-sm">{newBroadcast.audience}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Sender Identity</span>
                  <span className="font-mono text-slate-800 text-xs">{newBroadcast.senderIdentity}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Priority Gate</span>
                  <span className="font-bold text-emerald-800 text-xs">{newBroadcast.priority}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Message Preview</span>
                <p className="text-slate-600 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-slate-200/80">
                  {newBroadcast.message || 'No content drafted.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Action Bar */}
        <div className="flex items-center justify-between pt-2">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Previous
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2D6E] hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => {
                if (currentStep < 3) {
                  if (currentStep === 1 && !newBroadcast.audience) {
                    toast.error('Select an audience segment');
                    return;
                  }
                  if (currentStep === 2 && !newBroadcast.title.trim()) {
                    toast.error('Subject header is required');
                    return;
                  }
                  setCurrentStep((prev) => prev + 1);
                } else {
                  handleSend();
                }
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              <span>{currentStep === 3 ? 'Dispatch Broadcast Now' : 'Next'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT CAMPAIGNS LIST VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#06402B]">
            <MessageSquare size={15} />
            <span>Communications & Media Outreach</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-0.5">
            Content & Broadcast Center
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            Dispatch newsletters, publish official releases, manage subscriber lists, and monitor open engagement rates.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCurrentView('compose');
            setCurrentStep(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Send size={15} />
          <span>New Broadcast</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Total Subscribers</span>
          <p className="text-2xl font-black text-slate-800">14,280</p>
          <p className="text-[11px] text-emerald-600 font-bold">+640 this month</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Avg Open Rate</span>
          <p className="text-2xl font-black text-slate-800">50.5%</p>
          <p className="text-[11px] text-emerald-600 font-bold">+4.2% industry avg</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Active Bulletins</span>
          <p className="text-2xl font-black text-slate-800">{campaigns.length}</p>
          <p className="text-[11px] text-blue-600 font-bold">4 sent this quarter</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Click Through</span>
          <p className="text-2xl font-black text-slate-800">16.9%</p>
          <p className="text-[11px] text-emerald-600 font-bold">High engagement</p>
        </div>
      </div>

      {/* Tab Filter */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {['campaigns', 'subscribers', 'press'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-[#06402B] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab === 'campaigns' ? 'Broadcast Campaigns' : tab === 'subscribers' ? 'Subscriber Directory' : 'Press Releases'}
          </button>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search campaigns, audiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#06402B]"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer self-end sm:self-auto"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="py-3 px-4">Campaign Title & Channel</th>
                <th className="py-3 px-4">Audience Segment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Sent Date</th>
                <th className="py-3 px-4">Open Rate</th>
                <th className="py-3 px-4">Click Rate</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {campaigns
                .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      <div>{c.title}</div>
                      <span className="text-[10px] font-normal text-slate-400">{c.type}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{c.audience}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'Sent'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : c.status === 'Scheduled'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{c.sentDate}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{c.openRate}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{c.clickRate}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => toast.success(`Viewing campaign dossier: ${c.title}`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
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

export default AdminCommunicationsSection;
