import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const FAQS = [
  {
    id: 1,
    category: 'scholarships',
    question: 'How do I apply for a CMAOF educational scholarship or grant?',
    answer: 'CMAOF educational scholarships and bursaries are awarded based on verified academic merit and financial need. Application cycles are announced officially on our website and in national media. Applications are processed strictly through our online portal, and no physical forms are sold. You may write to scholarships@cmaofoundation.org to check eligibility windows.',
  },
  {
    id: 2,
    category: 'verification',
    question: 'Does CMAOF ever charge application or administrative processing fees?',
    answer: 'Absolutely not. All CMAOF scholarships, medical interventions, community relief initiatives, and agricultural support are 100% free of charge. Foundation personnel, trustees, or partner agents will never demand money, airtime, or gift items. Any solicitation is fraudulent and should be reported to safeguarding@cmaofoundation.org immediately.',
  },
  {
    id: 3,
    category: 'partnerships',
    question: 'How can corporate bodies and NGOs partner with CMAOF for CSR initiatives?',
    answer: 'We actively collaborate with vetted corporate organizations, multilateral development agencies, and registered NGOs whose missions align with our strategic pillars (Education, Health, and Community Resilience). Prospective partners can submit a formal concept note via our enquiry form selecting the "Corporate CSR & Grants" department or email partnerships@cmaofoundation.org.',
  },
  {
    id: 4,
    category: 'general',
    question: 'What is the standard turnaround time for inquiries sent to the Secretariat?',
    answer: 'Our Secretariat registers all official enquiries into our tracking system immediately upon submission, providing a unique reference code. Routine inquiries receive formal responses within 24 to 48 business hours. Urgent community relief appeals or partnership briefs are escalated within 12 hours.',
  },
  {
    id: 5,
    category: 'general',
    question: 'Can individuals or delegations visit the Ilara-Mokin Community Complex in person?',
    answer: 'Yes, visitors are welcomed at the Ilara-Mokin Community Complex during official secretariat hours (Monday through Friday, 8:00 AM to 5:00 PM). To ensure an officer from the relevant department is available to receive you, please book an appointment at least 48 hours in advance using our official contact form.',
  },
  {
    id: 6,
    category: 'partnerships',
    question: 'How are donations and philanthropic contributions acknowledged and audited?',
    answer: 'CMAOF adheres to international best practices in non-profit financial governance. All contributions receive official institutional receipts, and donors are provided with quarterly impact milestone reports detailing fund deployment and direct beneficiary outcomes. Comprehensive annual reports are independently audited and published.',
  },
];

const ContactFaqSection = ({ onScrollToForm }) => {
  const [activeId, setActiveId] = useState(1);
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredFaqs = filterCategory === 'all' 
    ? FAQS 
    : FAQS.filter(faq => faq.category === filterCategory);

  const toggleFaq = (id) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <section className="w-full">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
            <HelpCircle size={14} className="text-[#06402B]" />
            <span>QUICK ANSWERS & GUIDANCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D6E]">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Find immediate answers to common enquiries regarding scholarship eligibility, partnership procedures, and secretariat protocols.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Inquiries' },
              { id: 'scholarships', label: 'Scholarships & Grants' },
              { id: 'partnerships', label: 'Corporate CSR' },
              { id: 'verification', label: 'Ethics & Verification' },
              { id: 'general', label: 'Secretariat Visits' },
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  filterCategory === cat.id
                    ? 'bg-[#06402B] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Cards */}
        <div className="space-y-3">
          {filteredFaqs.map(faq => {
            const isOpen = activeId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-[#06402B]/60 shadow-md ring-1 ring-[#06402B]/10' 
                    : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`text-sm sm:text-base font-bold ${isOpen ? 'text-[#06402B]' : 'text-[#0B2D6E]'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                    isOpen ? 'bg-[#06402B]/10 text-[#06402B] rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100/80 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#06402B]/10 text-[#06402B] flex items-center justify-center shrink-0">
              <MessageSquare size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0B2D6E]">
                Have a question not addressed here?
              </h4>
              <p className="text-xs text-slate-500">
                Our secretariat team is prepared to assist you with tailored guidance.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onScrollToForm}
            className="px-5 py-2.5 rounded-full bg-[#0B2D6E] hover:bg-[#06402B] text-white text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-2xs inline-flex items-center gap-2"
          >
            <span>Write to Secretariat</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ContactFaqSection;
