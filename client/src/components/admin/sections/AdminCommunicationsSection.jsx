import React, { useState, useMemo } from 'react';
import {
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
  LayoutGrid,
  Table as TableIcon,
  X,
  Copy,
  BarChart3,
  TrendingUp,
  Clock,
  Share2,
  MessageSquare,
  Award,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  INITIAL_CAMPAIGNS,
  INITIAL_SUBSCRIBERS,
  INITIAL_PRESS_RELEASES,
  BROADCAST_CHANNELS,
  AUDIENCE_SEGMENTS,
} from '../../../data/communicationsData';

const COMPOSE_STEPS = [
  { id: 1, label: 'Audience & Channel' },
  { id: 2, label: 'Narrative & Content' },
  { id: 3, label: 'Schedule & Live Preview' },
];

/* ─────────────────────────────────────────────────────────────────
   BROADCAST DOSSIER SLIDE-OVER DRAWER
───────────────────────────────────────────────────────────────── */
const BroadcastDossierDrawer = ({ campaign, onClose, onDelete }) => {
  if (!campaign) return null;

  const copyEmailContent = () => {
    navigator.clipboard.writeText(`${campaign.title}\n\n${campaign.narrative}`);
    toast.success('Broadcast narrative copied to clipboard!');
  };

  const exportAnalyticsCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,Metric,Value\nCampaign ID,"${campaign.id}"\nTitle,"${campaign.title}"\nChannel,"${campaign.channel}"\nAudience,"${campaign.audience}"\nSent Date,"${campaign.sentDate}"\nDelivered,"${campaign.deliveredCount || 0}"\nOpen Rate,"${campaign.openRate}"\nClick Rate,"${campaign.clickRate}"`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${campaign.id}_analytics.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Engagement analytics exported as CSV!');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.15s_ease]">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-[slideInRight_0.25s_ease]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70 sticky top-0 z-10 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-[#0B2D6E] px-2.5 py-1 rounded-md bg-white border border-slate-200">
                {campaign.id}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  campaign.status === 'Sent'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : campaign.status === 'Scheduled'
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {campaign.status === 'Sent' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />}
                {campaign.status}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                {campaign.channel || campaign.type}
              </span>
            </div>
            <h2 className="text-base font-black text-slate-900">Broadcast Campaign Intelligence</h2>
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
          {/* Title & Preview Banner */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Subject Line & Header
            </span>
            <h3 className="text-base font-black text-[#0B2D6E] leading-snug">{campaign.title}</h3>
            {campaign.subtitle && (
              <p className="text-xs text-slate-600 leading-relaxed">{campaign.subtitle}</p>
            )}
          </div>

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Delivered</span>
              <span className="text-base font-black text-[#06402B]">
                {campaign.deliveredCount?.toLocaleString() || campaign.totalRecipients?.toLocaleString() || '14,280'}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Open Rate</span>
              <span className="text-base font-black text-slate-900">{campaign.openRate || '0.0%'}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Click Rate</span>
              <span className="text-base font-black text-[#0B2D6E]">{campaign.clickRate || '0.0%'}</span>
            </div>
          </div>

          {/* Logistics Specs Grid */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3.5 text-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Dispatch Specifications</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Audience Segment</span>
                <span className="font-bold text-slate-800">{campaign.audience}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Dispatch Date</span>
                <span className="font-bold text-slate-800">{campaign.sentDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Sender Identity</span>
                <span className="font-bold text-[#06402B] truncate block">{campaign.senderIdentity || 'Executive Office'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Channel Carrier</span>
                <span className="font-bold text-slate-800">{campaign.channel || 'Email'}</span>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Dispatched Message Narrative</h4>
              <button
                type="button"
                onClick={copyEmailContent}
                className="text-xs font-bold text-[#06402B] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Copy size={12} />
                <span>Copy Body</span>
              </button>
            </div>
            <div className="bg-white p-4.5 rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-sans text-xs whitespace-pre-line shadow-2xs">
              {campaign.narrative || campaign.previewText || 'No message narrative recorded.'}
            </div>
          </div>

          {/* Tags */}
          {campaign.tags && campaign.tags.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Thematic Tags</span>
              <div className="flex flex-wrap gap-1.5">
                {campaign.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/80">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete broadcast "${campaign.title}"?`)) {
                onDelete(campaign.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportAnalyticsCSV}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={() => {
                toast.success('Retargeting un-opened recipients (4,230 subscribers queued)...', { icon: '🚀' });
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              <Send size={13} />
              <span>Resend to Unopened</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   MAIN ADMIN COMMUNICATIONS / BROADCASTS COMPONENT
───────────────────────────────────────────────────────────────── */
const AdminCommunicationsSection = () => {
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [subscribers, setSubscribers] = useState(INITIAL_SUBSCRIBERS);
  const [pressReleases, setPressReleases] = useState(INITIAL_PRESS_RELEASES);

  // Tab State: 'campaigns' | 'subscribers' | 'press'
  const [activeTab, setActiveTab] = useState('campaigns');
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [activeDossierCampaign, setActiveDossierCampaign] = useState(null);

  // Dedicated View State: 'list' | 'compose'
  const [currentView, setCurrentView] = useState('list');
  const [currentStep, setCurrentStep] = useState(1);

  // New Broadcast Form State
  const [newBroadcast, setNewBroadcast] = useState({
    title: '',
    subtitle: '',
    audience: 'All Subscribers (14,280)',
    audienceSegment: 'all',
    type: 'Newsletter',
    channel: 'Email Newsletter',
    priority: 'Standard',
    previewText: 'Key milestones, field updates, and community impact reports from CMAOF.',
    message: '',
    ctaLabel: 'Read Audited Field Report',
    ctaUrl: 'https://cmaofoundation.org/resources',
    senderIdentity: 'CMAOF Directorate <newsletters@cmaofoundation.org>',
    complianceApproved: true,
  });

  // KPI Metrics Calculation
  const totalSubscribersCount = 14280;
  const avgOpenRate = '50.5%';
  const avgClickRate = '16.9%';
  const sentCount = campaigns.filter((c) => c.status === 'Sent').length;

  // Filtered Campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.audience.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.narrative && c.narrative.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesChannel =
        channelFilter === 'All' ||
        c.channel?.toLowerCase().includes(channelFilter.toLowerCase()) ||
        c.type?.toLowerCase().includes(channelFilter.toLowerCase());

      return matchesSearch && matchesChannel;
    });
  }, [campaigns, searchQuery, channelFilter]);

  // Filtered Subscribers
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((s) => {
      return (
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.segment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [subscribers, searchQuery]);

  const handleDeleteCampaign = (id) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    toast.success('Broadcast campaign removed.');
  };

  const handleSendBroadcast = () => {
    if (!newBroadcast.title.trim()) {
      toast.error('Please enter the broadcast subject header');
      return;
    }

    const created = {
      id: `camp-${Date.now().toString().slice(-4)}`,
      title: newBroadcast.title.trim(),
      subtitle: newBroadcast.subtitle.trim() || newBroadcast.previewText,
      audience: newBroadcast.audience,
      audienceSegment: newBroadcast.audienceSegment,
      type: newBroadcast.type,
      channel: newBroadcast.channel,
      status: 'Sent',
      sentDate: 'Just Now',
      openRate: '0.0%',
      clickRate: '0.0%',
      totalRecipients: newBroadcast.audience.includes('14,280') ? 14280 : 3450,
      deliveredCount: newBroadcast.audience.includes('14,280') ? 14250 : 3440,
      senderIdentity: newBroadcast.senderIdentity,
      previewText: newBroadcast.previewText,
      narrative: newBroadcast.message || 'Official communication dispatched from the Chief Michael Ade.Ojo Foundation.',
      tags: ['Broadcast', 'Direct Dispatch'],
    };

    setCampaigns([created, ...campaigns]);
    toast.success(`Broadcast "${created.title}" dispatched successfully to ${created.audience}!`, {
      icon: '📨',
      duration: 4000,
    });
    setCurrentView('list');
    setCurrentStep(1);
    setNewBroadcast({
      title: '',
      subtitle: '',
      audience: 'All Subscribers (14,280)',
      audienceSegment: 'all',
      type: 'Newsletter',
      channel: 'Email Newsletter',
      priority: 'Standard',
      previewText: 'Key milestones, field updates, and community impact reports from CMAOF.',
      message: '',
      ctaLabel: 'Read Audited Field Report',
      ctaUrl: 'https://cmaofoundation.org/resources',
      senderIdentity: 'CMAOF Directorate <newsletters@cmaofoundation.org>',
      complianceApproved: true,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportSubscribersCSV = () => {
    const headers = ['Subscriber ID', 'Full Name', 'Email Address', 'Audience Segment', 'Location', 'Joined Date', 'Opens'];
    const rows = subscribers.map((s) => [
      `"${s.id}"`,
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.segment}"`,
      `"${s.location}"`,
      `"${s.joinedDate}"`,
      s.openCount,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cmaof_subscribers_directory.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Subscriber directory exported as CSV!');
  };

  // ─────────────────────────────────────────────────────────────
  // 3-STEP IN-PLACE BROADCAST COMPOSER WIZARD
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
              <span className="font-semibold text-sky-600">Broadcasts</span>
            </button>
            <ChevronRight size={13} className="text-slate-300" />
            <span className="font-bold text-[#0B2D6E]">Compose New Broadcast & Newsletter</span>
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
            <span>Back to Broadcasts</span>
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

        {/* STEP 1: Audience & Channel */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Radio size={18} className="text-[#06402B]" />
              <span>Target Audience, Channel Carrier & Subject Line</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Broadcast Subject Line <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newBroadcast.title}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, title: e.target.value })}
                  placeholder="e.g. Q4 Foundation Impact Report: 4 New Solar Boreholes Handover"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Preheader Snippet</label>
                <input
                  type="text"
                  value={newBroadcast.previewText}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, previewText: e.target.value })}
                  placeholder="Short line preview visible in user inboxes..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10"
                />
              </div>

              {/* Channel Picker Cards */}
              <div className="space-y-2 pt-1">
                <label className="block font-bold text-slate-700">Select Communication Channel</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {BROADCAST_CHANNELS.map((ch) => {
                    const isSelected = newBroadcast.channel === ch.label;
                    return (
                      <div
                        key={ch.id}
                        onClick={() => setNewBroadcast({ ...newBroadcast, channel: ch.label, type: ch.label.includes('SMS') ? 'Field Emergency' : ch.label.includes('Press') ? 'Official Press Release' : 'Newsletter' })}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-1.5 ${
                          isSelected
                            ? 'border-[#06402B] bg-emerald-50/50 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-xs text-[#0B2D6E]">{ch.label}</span>
                          {isSelected && <Check size={14} className="text-[#06402B]" strokeWidth={3} />}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">{ch.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Recipient Audience Segment</label>
                  <select
                    value={newBroadcast.audience}
                    onChange={(e) => {
                      const val = e.target.value;
                      const segment = AUDIENCE_SEGMENTS.find((s) => s.label === val);
                      setNewBroadcast({
                        ...newBroadcast,
                        audience: val,
                        audienceSegment: segment ? segment.id : 'all',
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] cursor-pointer"
                  >
                    {AUDIENCE_SEGMENTS.map((seg) => (
                      <option key={seg.id} value={seg.label}>
                        {seg.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Priority Dispatch Tier</label>
                  <select
                    value={newBroadcast.priority}
                    onChange={(e) => setNewBroadcast({ ...newBroadcast, priority: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:border-[#06402B] cursor-pointer"
                  >
                    <option value="Standard">Standard Delivery (Immediate Queue)</option>
                    <option value="Urgent">Urgent Field Priority (Bypass Throttle)</option>
                    <option value="Scheduled">Scheduled Specific Embargo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Narrative & Content */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Mail size={18} className="text-[#06402B]" />
              <span>Broadcast Narrative, Sender Identity & Call-to-Action</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Official Sender Identity</label>
                <input
                  type="text"
                  value={newBroadcast.senderIdentity}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, senderIdentity: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-mono focus:outline-none focus:border-[#06402B]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Message Body & Narrative <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={8}
                  value={newBroadcast.message}
                  onChange={(e) => setNewBroadcast({ ...newBroadcast, message: e.target.value })}
                  placeholder="Compose the full institutional message, field testimonials, milestone figures, and executive signature..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B] focus:ring-2 focus:ring-[#06402B]/10 font-sans leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Primary Call-to-Action Button Label</label>
                  <input
                    type="text"
                    value={newBroadcast.ctaLabel}
                    onChange={(e) => setNewBroadcast({ ...newBroadcast, ctaLabel: e.target.value })}
                    placeholder="e.g. Read Audited Field Report"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#06402B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Button Target URL</label>
                  <input
                    type="text"
                    value={newBroadcast.ctaUrl}
                    onChange={(e) => setNewBroadcast({ ...newBroadcast, ctaUrl: e.target.value })}
                    placeholder="https://cmaofoundation.org/resources"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 font-mono focus:outline-none focus:border-[#06402B]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Schedule & Real-Time Live Preview */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 animate-[fadeIn_0.2s_ease]">
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight flex items-center gap-2">
              <Sparkles size={18} className="text-[#06402B]" />
              <span>Dispatch Review & Real-Time Live Email Digest Preview</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Dispatch parameters */}
              <div className="lg:col-span-6 space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Transmission Parameters
                  </span>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500">Carrier Channel:</span>
                    <span className="font-bold text-[#06402B]">{newBroadcast.channel}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500">Audience Cohort:</span>
                    <span className="font-bold text-slate-900">{newBroadcast.audience}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500">Dispatch Priority:</span>
                    <span className="font-bold text-slate-800">{newBroadcast.priority}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Sender Authority:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[200px]">{newBroadcast.senderIdentity}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="broadcastVerify"
                    checked={newBroadcast.complianceApproved}
                    onChange={(e) => setNewBroadcast({ ...newBroadcast, complianceApproved: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#06402B] focus:ring-[#06402B] cursor-pointer"
                  />
                  <label htmlFor="broadcastVerify" className="text-xs text-slate-700 font-medium cursor-pointer">
                    <span className="font-bold text-[#06402B]">Governance Clearance:</span> I certify that this message narrative complies with institutional communications standards, contains authorized donor disclosures, and has been approved for distribution.
                  </label>
                </div>
              </div>

              {/* Right Column: Real-Time Live Email Digest Card Preview */}
              <div className="lg:col-span-6 bg-slate-100/80 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Mail size={13} className="text-[#06402B]" />
                    <span>Live In-Inbox Preview</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    Responsive Preview
                  </span>
                </div>

                {/* Email Mockup Container */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs">
                  {/* Top Email Header */}
                  <div className="bg-[#06402B] p-4 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white text-xs">
                        C
                      </div>
                      <span className="font-black text-xs tracking-tight">CHIEF MICHAEL ADE.OJO FOUNDATION</span>
                    </div>
                    <span className="text-[10px] text-emerald-200 font-semibold">{newBroadcast.type}</span>
                  </div>

                  {/* Email Body */}
                  <div className="p-5 space-y-3 text-slate-700">
                    <span className="text-[10px] text-slate-400 font-mono block">
                      From: {newBroadcast.senderIdentity}
                    </span>
                    <h4 className="text-sm font-black text-[#0B2D6E] leading-snug">
                      {newBroadcast.title || 'Untitled Broadcast Subject'}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {newBroadcast.message || newBroadcast.previewText || 'Your message narrative will appear here for recipients...'}
                    </p>

                    {newBroadcast.ctaLabel && (
                      <div className="pt-2 text-center sm:text-left">
                        <span className="inline-block px-5 py-2.5 rounded-xl bg-[#EA580C] text-white font-bold text-xs shadow-xs">
                          {newBroadcast.ctaLabel}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Email Footer */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 text-center">
                    Chief Michael Ade.Ojo Foundation • Ilara-Mokin & Lagos, Nigeria • Unsubscribe
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
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
              onClick={() => toast.success('Broadcast campaign draft saved.')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0B2D6E] hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => {
                if (currentStep < 3) {
                  if (currentStep === 1 && !newBroadcast.title.trim()) {
                    toast.error('Subject line is required');
                    return;
                  }
                  setCurrentStep((prev) => prev + 1);
                } else {
                  handleSendBroadcast();
                }
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              <span>{currentStep === 3 ? 'Dispatch Broadcast Now' : 'Next Step'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT BROADCASTS OVERVIEW VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      
      {/* 1. Header with Clear Simple Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#06402B]">
            <Send size={15} />
            <span>Broadcasts & Newsletters</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-0.5">
            Newsletters & Public Broadcasts
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
            Dispatch newsletters, publish official releases, manage 14,280+ subscribers, and track recipient engagement.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleExportSubscribersCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Download size={14} />
            <span>Export Subscribers</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentView('compose');
              setCurrentStep(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#06402B] hover:bg-[#042c1d] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Send size={15} />
            <span>New Broadcast</span>
          </button>
        </div>
      </div>

      {/* 2. 4 Strategic Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Subscribers</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-[#06402B]">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">{totalSubscribersCount.toLocaleString()}</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-700 font-bold">
              <TrendingUp size={13} />
              <span>+640 added this month</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Average Open Rate</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0B2D6E]">
              <Mail size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-[#0B2D6E]">{avgOpenRate}</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-blue-700 font-bold">
              <CheckCircle2 size={13} />
              <span>+14.2% vs NGO benchmark</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Dispatched Campaigns</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <Send size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">{sentCount}</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-amber-800 font-bold">
              <Sparkles size={13} />
              <span>100% Deliverability</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Click Velocity</span>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
              <BarChart3 size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-800">{avgClickRate}</span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-purple-700 font-bold">
              <Award size={13} />
              <span>High Reader Engagement</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('campaigns')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'campaigns'
              ? 'bg-[#06402B] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Broadcast Campaigns</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
            activeTab === 'campaigns' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
          }`}>
            {campaigns.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('subscribers')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'subscribers'
              ? 'bg-[#06402B] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Subscriber Directory</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
            activeTab === 'subscribers' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
          }`}>
            14.2k
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('press')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'press'
              ? 'bg-[#06402B] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Official Press Releases</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
            activeTab === 'press' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
          }`}>
            {pressReleases.length}
          </span>
        </button>
      </div>

      {/* 4. Tab 1: Broadcast Campaigns Content */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          {/* Controls: Search, Channel & View Mode */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search subject lines, audiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#06402B] focus:ring-1 focus:ring-[#06402B]/20"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">Channel:</span>
              <select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#06402B] cursor-pointer"
              >
                <option value="All">All Channels</option>
                <option value="Email">Email Newsletter</option>
                <option value="SMS">SMS Emergency Alert</option>
                <option value="Press">Official Press Wire</option>
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

          {/* Campaigns Rendering */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCampaigns.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between group hover:-translate-y-1 space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {c.channel || c.type}
                      </span>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'Sent'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : c.status === 'Scheduled'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    <h3
                      onClick={() => setActiveDossierCampaign(c)}
                      className="font-bold text-sm text-[#0B2D6E] leading-snug group-hover:text-[#06402B] transition-colors cursor-pointer line-clamp-2"
                    >
                      {c.title}
                    </h3>

                    <p className="text-slate-500 text-xs font-normal leading-relaxed line-clamp-2">
                      {c.subtitle || c.previewText}
                    </p>
                  </div>

                  {/* Metrics bar */}
                  <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl">
                      <div>
                        <span className="text-slate-400 block font-bold uppercase text-[9px]">Open Rate</span>
                        <span className="font-black text-[#06402B] text-xs">{c.openRate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-bold uppercase text-[9px]">Click Rate</span>
                        <span className="font-black text-[#0B2D6E] text-xs">{c.clickRate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span className="truncate max-w-[170px]">{c.audience}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setActiveDossierCampaign(c)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#06402B] hover:bg-emerald-50 cursor-pointer"
                          title="View Intelligence"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete "${c.title}"?`)) {
                              handleDeleteCampaign(c.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-bold">
                    <tr>
                      <th className="py-3 px-4">Broadcast Subject & Channel</th>
                      <th className="py-3 px-4">Audience Segment</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Sent Date</th>
                      <th className="py-3 px-4">Open Rate</th>
                      <th className="py-3 px-4">Click Rate</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredCampaigns.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-800 max-w-sm">
                          <div
                            onClick={() => setActiveDossierCampaign(c)}
                            className="truncate text-[#0B2D6E] font-bold hover:text-[#06402B] cursor-pointer"
                          >
                            {c.title}
                          </div>
                          <span className="text-[10px] font-normal text-slate-400">{c.channel || c.type}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{c.audience}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              c.status === 'Sent'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : c.status === 'Scheduled'
                                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{c.sentDate}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">{c.openRate}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">{c.clickRate}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setActiveDossierCampaign(c)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-[#06402B] hover:bg-emerald-50 cursor-pointer"
                              title="View Dossier"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete "${c.title}"?`)) {
                                  handleDeleteCampaign(c.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Tab 2: Subscriber Directory Content */}
      {activeTab === 'subscribers' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search subscribers by name, email, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#06402B]"
              />
            </div>
            <button
              type="button"
              onClick={handleExportSubscribersCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer self-end sm:self-auto"
            >
              <Download size={14} />
              <span>Export Roster CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="py-3 px-4">Subscriber Name & Email</th>
                  <th className="py-3 px-4">Segment Cohort</th>
                  <th className="py-3 px-4">Geographic Location</th>
                  <th className="py-3 px-4">Subscribed Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Lifetime Opens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredSubscribers.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800">
                      <div>{s.name}</div>
                      <span className="text-[10px] font-mono font-normal text-slate-400">{s.email}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {s.segment}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{s.location}</td>
                    <td className="py-3 px-4 text-slate-500">{s.joinedDate}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-800">{s.openCount} opens</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. Tab 3: Official Press Releases Content */}
      {activeTab === 'press' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pressReleases.map((pr) => (
            <div
              key={pr.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[10px] font-bold text-[#06402B]">{pr.id}</span>
                  <span>{pr.date}</span>
                </div>
                <h3 className="font-bold text-sm text-[#0B2D6E] leading-snug">{pr.headline}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{pr.summary}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-[#06402B]">{pr.circulationCount}</span>
                <button
                  type="button"
                  onClick={() => toast.success(`Downloading official press release: ${pr.fileRef}`, { icon: '📄' })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Download size={13} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 7. Slide-Over Broadcast Dossier Drawer */}
      <BroadcastDossierDrawer
        campaign={activeDossierCampaign}
        onClose={() => setActiveDossierCampaign(null)}
        onDelete={handleDeleteCampaign}
      />

    </div>
  );
};

export default AdminCommunicationsSection;
