import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  CalendarCheck, 
  ShieldCheck, 
  Car, 
  ExternalLink,
  Building,
  Compass
} from 'lucide-react';

const MAP_LOCATIONS = [
  {
    id: 'ilaramokin',
    name: 'Ilara-Mokin National Secretariat',
    state: 'Ondo State',
    description: 'Community Complex, Philanthropy Centre & University Outreach Corridor',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15814.996160161476!2d5.0934!3d7.3487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103788730b2011b1%3A0xb3a8bbd83cf99ee3!2sIlara-Mokin%2C%20Ondo!5e0!3m2!1sen!2sng!4v1710000000000!5m2!1sen!2sng',
    gps: '7.3487° N, 5.0934° E',
    externalMapUrl: 'https://maps.google.com/?q=Ilara-Mokin+Ondo+State+Nigeria',
  },
  {
    id: 'lagos',
    name: 'Lagos Corporate Liaison Office',
    state: 'Lagos State',
    description: 'Executive Boardroom, Institutional Donors & High-Level Strategic Desk',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7175811776517!2d3.4243!3d6.4312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5306e987c2f%3A0xb7174db8cf625da!2sAdeola%20Odeku%20St%2C%20Victoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1710000000000!5m2!1sen!2sng',
    gps: '6.4312° N, 3.4243° E',
    externalMapUrl: 'https://maps.google.com/?q=Adeola+Odeku+Street+Victoria+Island+Lagos',
  },
];

const ContactMapSection = () => {
  const [selectedMapId, setSelectedMapId] = useState('ilaramokin');
  const activeLocation = MAP_LOCATIONS.find(loc => loc.id === selectedMapId) || MAP_LOCATIONS[0];

  return (
    <section className="w-full">
      
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 mb-2">
            <Compass size={13} className="text-[#06402B]" />
            <span>CAMPUS & LIAISON NAVIGATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D6E]">
            Interactive Secretariat Locations
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Navigate our physical campuses and review official visitor clearance protocols before your arrival.
          </p>
        </div>

        {/* Location selector toggle */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 self-start md:self-auto">
          {MAP_LOCATIONS.map(loc => {
            const isSelected = loc.id === selectedMapId;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => setSelectedMapId(loc.id)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {loc.name.split(' ')[0]} ({loc.state.split(' ')[0]})
              </button>
            );
          })}
        </div>
      </div>

      {/* Map & Protocol Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Interactive Map Iframe Container (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm flex flex-col justify-between">
          
          {/* Map Top Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50">
            <div>
              <h4 className="text-sm font-bold text-[#0B2D6E]">
                {activeLocation.name}
              </h4>
              <p className="text-xs text-slate-500">
                {activeLocation.description}
              </p>
            </div>

            <a
              href={activeLocation.externalMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0B2D6E] hover:text-[#06402B] hover:border-[#06402B] shadow-2xs transition-colors shrink-0"
            >
              <Navigation size={13} />
              <span>Open in Google Maps</span>
              <ExternalLink size={12} className="text-slate-400" />
            </a>
          </div>

          {/* Map Iframe */}
          <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-100">
            <iframe
              title={`Map of ${activeLocation.name}`}
              src={activeLocation.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-[1.1]"
            />
          </div>

          {/* Map Bottom Metadata Footer */}
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#06402B]" />
              <span>GPS Coordinates: <strong className="text-slate-700 font-mono">{activeLocation.gps}</strong></span>
            </div>
            <span className="text-[#06402B] font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              Visitor Gate Clearance Active
            </span>
          </div>

        </div>

        {/* Visitor Guidelines & Protocols (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#EA580C]">
                VISITATION CLEARANCE
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#0B2D6E]">
                Visitor Protocols & Guidelines
              </h3>
              <p className="text-xs text-slate-500">
                To guarantee security and timely reception, guests are kindly requested to note:
              </p>
            </div>

            <div className="space-y-4">
              
              {/* Protocol 1 */}
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <CalendarCheck size={18} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Advance Meeting Appointments
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                    Executive consultations and institutional partnership meetings require at least 48 hours advance notice via our enquiry form.
                  </p>
                </div>
              </div>

              {/* Protocol 2 */}
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#06402B] flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Identity Verification at Security Gate
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                    Visitors must present a valid government-issued ID card (NIN, Driver's License, or International Passport) or official student ID.
                  </p>
                </div>
              </div>

              {/* Protocol 3 */}
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Car size={18} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Designated Parking & Accessibility
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                    Secure visitor vehicle bays and barrier-free wheelchair accessibility ramps are available at both Ilara-Mokin and Lagos complexes.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-gradient-to-br from-[#0B2D6E] to-[#06402B] text-white p-6 rounded-3xl shadow-sm flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] uppercase font-bold text-[#D4AF37] tracking-wider">
                NEED ACCESS GUIDANCE?
              </span>
              <h4 className="text-sm font-bold">
                Secretariat Reception Desk
              </h4>
              <p className="text-xs text-slate-200">
                Call our gate reception for arrival directions:
              </p>
            </div>
            <a
              href="tel:+2348002626363"
              className="px-4 py-2.5 rounded-xl bg-white text-[#0B2D6E] font-bold text-xs hover:bg-emerald-50 transition-colors shrink-0 shadow-xs"
            >
              Call Reception
            </a>
          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactMapSection;
