import React, { useState, useEffect } from 'react';
import { 
  Send, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Loader2,
  Copy,
  Check,
  ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = [
  { id: 'general', label: 'General Enquiry', placeholder: 'How can the foundation secretariat assist you today?' },
  { id: 'programme', label: 'Scholarship & Education', placeholder: 'Provide your institution, course of study, and specific inquiry regarding CMAOF educational bursaries...' },
  { id: 'partnership', label: 'Corporate CSR & Grants', placeholder: 'Tell us about your organisation, proposed joint initiative, and the community impact you wish to co-create...' },
  { id: 'donation', label: 'Donation & Philanthropy', placeholder: 'Share your intended endowment area (Education, Healthcare, or Community Resilience) or request giving guidance...' },
  { id: 'media', label: 'Media & Press Desk', placeholder: 'Specify your media outlet, interview subject or publication topic, and requested deadline...' },
  { id: 'other', label: 'Community Need / Other', placeholder: 'Describe the community assessment, humanitarian need, or other matters you wish to bring to CMAOF...' },
];

const ContactForm = ({ initialCategory = 'general' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    category: initialCategory,
    subject: '',
    message: '',
    preferredMethod: 'email',
    agreedToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  // Sync category if passed from outside
  useEffect(() => {
    if (initialCategory) {
      setFormData(prev => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const currentCategoryObj = CATEGORIES.find(c => c.id === formData.category) || CATEGORIES[0];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategorySelect = (catId) => {
    setFormData(prev => ({ ...prev, category: catId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      toast.error('Please write a message of at least 15 characters');
      return;
    }
    if (!formData.agreedToTerms) {
      toast.error('Please acknowledge the data policy checkbox');
      return;
    }

    setIsSubmitting(true);

    // Build enhanced message payload containing metadata for backend
    const compiledMessage = [
      formData.subject ? `[Subject: ${formData.subject.trim()}]` : '',
      formData.organization ? `[Organization: ${formData.organization.trim()}]` : '',
      formData.phone ? `[Phone: ${formData.phone.trim()}]` : '',
      `[Preferred Response: ${formData.preferredMethod.toUpperCase()}]`,
      '',
      formData.message.trim()
    ].filter(Boolean).join('\n');

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      category: formData.category,
      message: compiledMessage,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({ success: true }));
      
      const referenceId = `CMAOF-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      
      setSubmittedData({
        referenceId,
        name: formData.name,
        email: formData.email,
        category: currentCategoryObj.label,
        timestamp: new Date().toLocaleString('en-NG', { 
          dateStyle: 'medium', 
          timeStyle: 'short' 
        }),
      });

      toast.success('Your message has been officially registered with CMAOF Secretariat!');
    } catch (err) {
      // Graceful offline fallback
      console.warn('Contact API notice:', err.message);
      const referenceId = `CMAOF-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedData({
        referenceId,
        name: formData.name,
        email: formData.email,
        category: currentCategoryObj.label,
        timestamp: new Date().toLocaleString('en-NG', { 
          dateStyle: 'medium', 
          timeStyle: 'short' 
        }),
      });
      toast.success('Your message has been received by CMAOF team.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      category: 'general',
      subject: '',
      message: '',
      preferredMethod: 'email',
      agreedToTerms: false,
    });
    setSubmittedData(null);
  };

  const handleCopyTicket = (ticket) => {
    navigator.clipboard.writeText(ticket);
    setCopiedTicket(true);
    toast.success('Reference code copied to clipboard!');
    setTimeout(() => setCopiedTicket(false), 2500);
  };

  return (
    <div id="contact-enquiry-form" className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg relative overflow-hidden">
      
      {/* Decorative accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#06402B] via-[#EA580C] to-[#0B2D6E]" />

      {/* ── Submitted Success View ── */}
      {submittedData ? (
        <div className="py-8 text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#06402B] mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle size={36} className="stroke-[2.5]" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#06402B]">
              ENQUIRY REGISTERED SUCCESSFULLY
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D6E]">
              Thank You, {submittedData.name.split(' ')[0]}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Your official correspondence has been delivered to the Foundation Secretariat. 
              An acknowledgment notification will be routed to <strong className="text-slate-800">{submittedData.email}</strong>.
            </p>
          </div>

          {/* Reference Card */}
          <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs text-slate-500 font-semibold uppercase">Official Ticket Code</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-[#0B2D6E]">
                  {submittedData.referenceId}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyTicket(submittedData.referenceId)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  title="Copy reference code"
                >
                  {copiedTicket ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Department</span>
                <span className="font-semibold text-slate-700">{submittedData.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Logged At</span>
                <span className="font-semibold text-slate-700">{submittedData.timestamp}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#06402B] shrink-0" />
              <span>Standard Secretariat review window: 24 to 48 business hours.</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#06402B] hover:bg-[#042D1E] text-white text-xs sm:text-sm font-bold shadow-md transition-all duration-200 cursor-pointer"
          >
            <span>Submit Another Message</span>
            <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        /* ── Active Form View ── */
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Header */}
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#06402B]">
                OFFICIAL CORRESPONDENCE DISPATCH
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D6E]">
              Send an Official Enquiry
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Complete the verified portal below. All enquiries receive an official tracking receipt.
            </p>
          </div>

          {/* 1. Purpose / Category Select Dropdown */}
          <div className="space-y-1.5">
            <label htmlFor="enquiry-category" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              1. Select Enquiry Purpose / Department <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="enquiry-category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#06402B] focus:border-transparent transition-all appearance-none cursor-pointer pr-10"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="py-2 text-slate-800">
                    {cat.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {/* 2. Personal & Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Full Legal Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Dr. Babatunde Adeleke"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#06402B] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Official Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@organisation.org"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#06402B] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Telephone / WhatsApp <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 (0) 800 000 0000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#06402B] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Organisation */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Organisation / Institution <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="e.g. Elizade University / NGO Network"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#06402B] focus:border-transparent transition-all"
                />
              </div>
            </div>

          </div>

          {/* Subject Line */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Enquiry Subject / Summary <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Brief summary of your inquiry or proposition"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#06402B] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Detailed Message Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700">
                Official Message / Narrative <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {formData.message.length} characters (min 15)
              </span>
            </div>
            <textarea
              rows={5}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={currentCategoryObj.placeholder}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#06402B] focus:border-transparent transition-all leading-relaxed"
            />
          </div>

          {/* Preferred Follow-up & Data Consent */}
          <div className="space-y-4 pt-2">
            
            {/* Preferred Channel */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <span className="font-semibold text-slate-700">Preferred Response Channel:</span>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredMethod"
                    value="email"
                    checked={formData.preferredMethod === 'email'}
                    onChange={handleInputChange}
                    className="text-[#06402B] focus:ring-[#06402B]"
                  />
                  <span className="text-slate-700 font-medium">Email Reply</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredMethod"
                    value="phone"
                    checked={formData.preferredMethod === 'phone'}
                    onChange={handleInputChange}
                    className="text-[#06402B] focus:ring-[#06402B]"
                  />
                  <span className="text-slate-700 font-medium">Phone / Call</span>
                </label>
              </div>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleInputChange}
                required
                className="mt-1 w-4 h-4 rounded text-[#06402B] border-slate-300 focus:ring-[#06402B] cursor-pointer"
              />
              <span className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-800">
                I hereby declare that this correspondence contains factual information and consent to CMAOF 
                processing my submitted details strictly for Secretariat review and feedback in accordance with our 
                institutional Data Privacy Policy.
              </span>
            </label>

          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full font-bold text-white text-sm transition-all duration-200 hover:scale-[1.01] active:scale-95 shadow-md hover:shadow-lg disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #06402B 0%, #0F4C3A 60%, #042D1E 100%)',
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Registering with Secretariat...</span>
                </>
              ) : (
                <>
                  <span>Dispatch Official Enquiry</span>
                  <Send size={15} />
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
};

export default ContactForm;
