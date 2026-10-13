import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', category: 'general', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your message has been received by CMAOF team.');
    setFormData({ name: '', email: '', category: 'general', message: '' });
  };

  return (
    <div className="w-full bg-white space-y-16 animate-fade-in pb-16">
      
      {/* ── Hero Section matching Hero.jsx and AboutHero.jsx ── */}
      <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: '520px' }}>
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-[position:82%_center] bg-no-repeat"
          style={{ backgroundImage: `url('/images/hero_composite.jpg')` }}
          aria-hidden="true"
        />

        {/* ── Exact Linear Gradient Overlay matching reference screenshot ── */}
        <div
          className="absolute inset-0 hidden md:block pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.78) 8%, rgba(255,255,255,0.97) 20%, rgba(255,255,255,0.97) 38%, rgba(255,255,255,0.75) 48%, rgba(255,255,255,0.25) 58%, transparent 68%)',
          }}
          aria-hidden="true"
        />
        {/* Mobile vertical gradient fallback */}
        <div
          className="absolute inset-0 md:hidden pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.92) 60%, rgba(255,255,255,0.40) 100%)',
          }}
          aria-hidden="true"
        />

        {/* ── Content wrapper with balanced padding matching Home Hero & About Hero ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[98px] sm:pt-[115px] lg:pt-[128px] pb-14 sm:pb-16 lg:pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0F2B5B]">
                <div className="w-1 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                <Link to="/" className="hover:text-[#0F4C3A] transition-colors">Home</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <span className="text-[#0F2B5B]">Contact Us</span>
              </div>

              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#EA580C] rounded-full shrink-0" />
                <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#0F4C3A]">
                  GET IN TOUCH
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.12] text-[#0F2B5B]">
                Contact Chief Michael Ade.Ojo Foundation
              </h1>

              {/* Subtitle */}
              <p className="text-[#1E355E] text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-medium">
                We welcome enquiries from individuals, community leaders, partner organisations, and institutional benefactors.
              </p>

            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 bg-[#0D1B2A] text-white p-8 sm:p-10 rounded-3xl space-y-8 shadow-xl">
          <div>
            <h3 className="text-2xl font-bold font-serif mb-2">Foundation Secretariat</h3>
            <p className="text-slate-300 text-xs">We welcome enquiries from individuals, community leaders, and institutional partners.</p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="text-emerald-400 shrink-0 mt-1" size={20} />
              <div>
                <strong className="block text-white">Main Secretariat Address</strong>
                <span className="text-slate-300 text-xs">Ilara-Mokin Community Complex & Victoria Island, Lagos, Nigeria</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-emerald-400 shrink-0" size={20} />
              <div>
                <strong className="block text-white">Telephone Support</strong>
                <span className="text-slate-300 text-xs">+234 (0) 800 2626 363</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-emerald-400 shrink-0" size={20} />
              <div>
                <strong className="block text-white">Email Address</strong>
                <span className="text-slate-300 text-xs">info@cmaofoundation.org</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-2xl font-bold text-[#0D1B2A]">Send an Official Enquiry</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                required
              />
            </div>

            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="general">General Enquiry</option>
              <option value="partnership">Corporate CSR & Institutional Partnership</option>
              <option value="donation">Donation & Giving Support</option>
              <option value="programme">Programme & Scholarship Enquiry</option>
              <option value="media">Media & Press</option>
            </select>

            <textarea
              rows={4}
              placeholder="Write your message here..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              required
            />

            <button
              type="submit"
              className="bg-[#0F4C3A] hover:bg-[#14634C] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow flex items-center justify-center gap-2 transition-colors"
            >
              <span>Submit Message</span>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};

export default ContactPage;
