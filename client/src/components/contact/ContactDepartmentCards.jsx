import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  GraduationCap, 
  Handshake, 
  Building2, 
  Megaphone, 
  Copy, 
  Check, 
  ArrowRight,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const DEPARTMENTS = [
  {
    id: 'general',
    title: 'General Secretariat',
    categoryKey: 'general',
    badge: 'Public Desk',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Building2,
    iconBg: 'bg-[#0A5C36]/10 text-[#0A5C36]',
    description: 'General information, visiting arrangements, official correspondences, and foundation governance.',
    email: 'info@cmaofoundation.org',
    phone: '+234 (0) 800 2626 363',
    tollFree: true,
    hours: 'Mon - Fri • 8:00 AM - 5:00 PM',
  },
  {
    id: 'programme',
    title: 'Scholarships & Education Desk',
    categoryKey: 'programme',
    badge: 'Academic Support',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: GraduationCap,
    iconBg: 'bg-[#0F2B5B]/10 text-[#0F2B5B]',
    description: 'Undergraduate bursary applications, vocational training grants, and beneficiary verification status.',
    email: 'scholarships@cmaofoundation.org',
    phone: '+234 (0) 803 100 2626',
    tollFree: false,
    hours: 'Mon - Fri • 8:30 AM - 4:30 PM',
  },
  {
    id: 'partnership',
    title: 'Institutional Partnerships & CSR',
    categoryKey: 'partnership',
    badge: 'Corporate & Grants',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    icon: Handshake,
    iconBg: 'bg-[#EA580C]/10 text-[#EA580C]',
    description: 'Corporate philanthropic co-funding, NGO coalitions, institutional donor governance, and community impact.',
    email: 'partnerships@cmaofoundation.org',
    phone: '+234 (0) 802 555 3636',
    tollFree: false,
    hours: 'Mon - Fri • 9:00 AM - 5:00 PM',
  },
  {
    id: 'media',
    title: 'Media & Corporate Communications',
    categoryKey: 'media',
    badge: 'Press & Gazette',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: Megaphone,
    iconBg: 'bg-purple-600/10 text-purple-700',
    description: 'Press inquiries, executive interview requests, foundation publications, photo archive, and event accreditations.',
    email: 'media@cmaofoundation.org',
    phone: '+234 (0) 809 444 2626',
    tollFree: false,
    hours: 'Mon - Fri • 9:00 AM - 5:00 PM',
  },
];

const ContactDepartmentCards = ({ onSelectCategory }) => {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopyEmail = (email, id) => {
    navigator.clipboard.writeText(email);
    setCopiedKey(id);
    toast.success(`Copied ${email} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCardClick = (categoryKey) => {
    if (onSelectCategory) {
      onSelectCategory(categoryKey);
    }
    const formElement = document.getElementById('contact-enquiry-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
          <span>DIRECT CONTACT DESKS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2B5B]">
          Direct Lines to Foundation Departments
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Reach our dedicated focal officers directly for expedited response and assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DEPARTMENTS.map((dept) => {
          const IconComponent = dept.icon;
          const isCopied = copiedKey === dept.id;

          return (
            <div
              key={dept.id}
              className="group bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div>
                {/* Header row with icon & badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${dept.iconBg} transition-transform group-hover:scale-105`}>
                    <IconComponent size={22} strokeWidth={2.2} />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${dept.badgeColor}`}>
                    {dept.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#0F2B5B] leading-snug mb-2 group-hover:text-[#0A5C36] transition-colors">
                  {dept.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  {dept.description}
                </p>

                {/* Contact Points */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs">
                  {/* Email with copy button */}
                  <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100/80 transition-colors">
                    <div className="flex items-center gap-2 min-w-0">
                      <Mail size={14} className="text-[#0A5C36] shrink-0" />
                      <a 
                        href={`mailto:${dept.email}`} 
                        className="truncate text-slate-800 font-semibold hover:text-[#0A5C36] transition-colors"
                        title={dept.email}
                      >
                        {dept.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyEmail(dept.email, dept.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-white transition-colors cursor-pointer shrink-0"
                      title="Copy email address"
                    >
                      {isCopied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-[#EA580C] shrink-0" />
                      <a 
                        href={`tel:${dept.phone.replace(/[^0-9+]/g, '')}`} 
                        className="text-slate-800 font-semibold hover:text-[#0A5C36] transition-colors"
                      >
                        {dept.phone}
                      </a>
                    </div>
                    {dept.tollFree && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                        Toll-Free
                      </span>
                    )}
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 px-1 pt-1">
                    <Clock size={12} className="text-slate-400 shrink-0" />
                    <span>{dept.hours}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleCardClick(dept.categoryKey)}
                className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-[#0F2B5B] bg-slate-100 hover:bg-[#0A5C36] hover:text-white transition-all duration-200 cursor-pointer"
              >
                <span>Write to this Desk</span>
                <ArrowRight size={13} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactDepartmentCards;
