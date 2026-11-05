import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  Building, 
  Navigation,
  Globe
} from 'lucide-react';

// Social Media Icons
const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
  </svg>
);

const OFFICES = [
  {
    id: 'ilara-mokin',
    name: 'Ilara-Mokin National Secretariat',
    label: 'National Headquarters & Community Complex',
    status: 'Primary Hub',
    address: 'CMAOF Community & Philanthropy Complex, Off Akure-Ilesha Expressway, Ilara-Mokin, Ondo State, Nigeria',
    landmark: 'Adjacent to Elizade University Campus Entrance',
    phone: '+234 (0) 34 200 4500',
    email: 'ilaramokin@cmaofoundation.org',
    hours: 'Mon – Fri: 8:00 AM – 5:00 PM (WAT)',
    image: '/images/admin_campus_bg.jpg',
    mapUrl: 'https://maps.google.com/?q=Ilara-Mokin+Ondo+State+Nigeria',
    services: [
      'Beneficiary Verification & Enrollment',
      'Scholarship Documentation Desk',
      'Community Outreach Coordination',
      'Philanthropic Archive & Reading Room'
    ]
  },
  {
    id: 'lagos',
    name: 'Lagos Corporate Liaison Office',
    label: 'Strategic Partnerships & Donor Relations',
    status: 'Executive Secretariat',
    address: 'Plot 12B, Adeola Odeku Commercial Corridor, Victoria Island, Lagos State, Nigeria',
    landmark: 'Near Victoria Island Financial District',
    phone: '+234 (0) 1 454 8890',
    email: 'lagos@cmaofoundation.org',
    hours: 'Mon – Fri: 8:30 AM – 5:30 PM (WAT)',
    image: '/images/gallery_facility_aerial.jpg',
    mapUrl: 'https://maps.google.com/?q=Adeola+Odeku+Victoria+Island+Lagos',
    services: [
      'Corporate CSR & Institutional Grants',
      'Donor Governance & Audit Desk',
      'High-Level Philanthropic Advisory',
      'Media & Press Briefing Room'
    ]
  },
  {
    id: 'abuja',
    name: 'Abuja Federal Liaison Desk',
    label: 'Policy, Regulatory & Northern Operations',
    status: 'Federal Liaison',
    address: 'Suite 404, Transcorp Commercial Annex, Central Business District, Abuja FCT, Nigeria',
    landmark: 'Adjacent to Federal Ministry of Education',
    phone: '+234 (0) 9 872 1100',
    email: 'abuja@cmaofoundation.org',
    hours: 'Mon – Fri: 9:00 AM – 4:30 PM (WAT)',
    image: '/images/gallery_partners_meeting.jpg',
    mapUrl: 'https://maps.google.com/?q=Central+Business+District+Abuja+Nigeria',
    services: [
      'National Inter-Agency Alignment',
      'Federal Ministry Liaison',
      'Northern State Relief Operations Desk',
      'Development Partner Coordination'
    ]
  }
];

const ContactSecretariatHub = () => {
  const [activeOfficeId, setActiveOfficeId] = useState('ilara-mokin');
  const activeOffice = OFFICES.find(o => o.id === activeOfficeId) || OFFICES[0];

  return (
    <div className="space-y-6">
      
      {/* ── Main Secretariat Card ── */}
      <div className="bg-gradient-to-b from-[#241007] via-[#3D1E10] to-[#5B2E19] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#8C4A26]/50 relative overflow-hidden">
        
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FCCD37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#5B2E19]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#8C4A26]/50">
            <div>
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#FCCD37]">
                FOUNDATION PRESENCE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Secretariat Locations
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-[#FCCD37]/30 text-[#FCCD37] text-xs font-semibold self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#338C26] animate-pulse" />
              <span>All Desks Operational</span>
            </span>
          </div>

          {/* Interactive Office Switcher Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-black/30 rounded-2xl border border-[#8C4A26]/50">
            {OFFICES.map((office) => {
              const isSelected = office.id === activeOfficeId;
              return (
                <button
                  key={office.id}
                  type="button"
                  onClick={() => setActiveOfficeId(office.id)}
                  className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer text-center ${
                    isSelected
                      ? 'bg-[#FCCD37] text-[#5B2E19] shadow-md font-black'
                      : 'text-amber-100/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {office.name.split(' ')[0]} Hub
                </button>
              );
            })}
          </div>

          {/* Active Office Detailed Preview */}
          <div className="space-y-4 pt-2">
            
            {/* Office Image Banner */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-[#8C4A26]/50">
              <img
                src={activeOffice.image}
                alt={activeOffice.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241007] via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                <div>
                  <span className="inline-block text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded bg-black/60 text-[#FCCD37] backdrop-blur-xs mb-1">
                    {activeOffice.status}
                  </span>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {activeOffice.name}
                  </h4>
                  <p className="text-[11px] text-amber-100/80">
                    {activeOffice.label}
                  </p>
                </div>
                
                <a
                  href={activeOffice.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-[#FCCD37] hover:bg-[#e5b722] text-[#5B2E19] text-[11px] font-black flex items-center gap-1 transition-colors shrink-0 shadow-sm"
                >
                  <Navigation size={12} />
                  <span>Directions</span>
                </a>
              </div>
            </div>

            {/* Address & Contact Row */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-black/25 border border-[#8C4A26]/40">
                <MapPin className="text-[#FCCD37] shrink-0 mt-0.5" size={18} />
                <div className="space-y-0.5">
                  <strong className="block text-white font-semibold">Physical Address</strong>
                  <span className="text-stone-200 text-xs leading-relaxed block">{activeOffice.address}</span>
                  <span className="text-[11px] text-[#FCCD37] block font-medium">Landmark: {activeOffice.landmark}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/25 border border-[#8C4A26]/40">
                  <Phone className="text-[#FCCD37] shrink-0" size={16} />
                  <div className="min-w-0">
                    <span className="block text-[10px] uppercase text-stone-300 font-bold">Direct Desk</span>
                    <a href={`tel:${activeOffice.phone.replace(/[^0-9+]/g, '')}`} className="text-white text-xs font-semibold hover:text-[#FCCD37] transition-colors">
                      {activeOffice.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/25 border border-[#8C4A26]/40">
                  <Mail className="text-[#FCCD37] shrink-0" size={16} />
                  <div className="min-w-0 truncate">
                    <span className="block text-[10px] uppercase text-stone-300 font-bold">Secretariat Desk</span>
                    <a href={`mailto:${activeOffice.email}`} className="text-white text-xs font-semibold hover:text-[#FCCD37] transition-colors truncate block">
                      {activeOffice.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* On-Site Services Accordion / List */}
            <div className="pt-2">
              <span className="block text-[11px] uppercase tracking-wider font-bold text-[#FCCD37] mb-2">
                Available On-Site Services:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeOffice.services.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-stone-200">
                    <CheckCircle2 size={13} className="text-[#338C26] shrink-0" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Social Channels Strip */}
          <div className="pt-4 border-t border-[#8C4A26]/50 flex items-center justify-between gap-4">
            <span className="text-xs text-stone-300 font-medium">Follow Foundation Gazette:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black/30 border border-[#8C4A26]/60 hover:bg-[#FCCD37] text-stone-300 hover:text-[#5B2E19] flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black/30 border border-[#8C4A26]/60 hover:bg-[#FCCD37] text-stone-300 hover:text-[#5B2E19] flex items-center justify-center transition-colors"
                title="X (Twitter)"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black/30 border border-[#8C4A26]/60 hover:bg-[#FCCD37] text-stone-300 hover:text-[#5B2E19] flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-black/30 border border-[#8C4A26]/60 hover:bg-[#FCCD37] text-stone-300 hover:text-[#5B2E19] flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Anti-Fraud & Ethics Callout Card ── */}
      <div className="bg-[#FFF8E5] border border-[#FCCD37]/60 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-[#5B2E19]/10 text-[#5B2E19] flex items-center justify-center shrink-0 mt-0.5">
          <ShieldAlert size={22} strokeWidth={2.2} />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs sm:text-sm font-extrabold text-[#5B2E19] uppercase tracking-wide">
            Official Anti-Fraud & Zero-Fee Notice
          </h4>
          <p className="text-xs text-[#5B2E19]/80 leading-relaxed">
            All CMAOF scholarship opportunities, healthcare interventions, and community grants are <strong>100% free</strong>. 
            No official representative will ever request processing fees, application charges, or payments into personal accounts. 
            Report any solicitation to <a href="mailto:safeguarding@cmaofoundation.org" className="underline font-bold hover:text-[#3D1E10]">safeguarding@cmaofoundation.org</a>.
          </p>
        </div>
      </div>

    </div>
  );
};

export default ContactSecretariatHub;
