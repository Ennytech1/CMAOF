import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', category: 'general', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your message has been received by CMAOF team.');
    setFormData({ name: '', email: '', category: 'general', message: '' });
  };

  return (
    <div className="py-12 lg:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#0F4C3A] text-xs font-extrabold uppercase tracking-wider">
          Get In Touch
        </span>
        <h1 className="text-4xl font-extrabold text-[#0D1B2A]">Contact Chief Michael Ade.Ojo Foundation</h1>
      </div>

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
  );
};

export default ContactPage;
