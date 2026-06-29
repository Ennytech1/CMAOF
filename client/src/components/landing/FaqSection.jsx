import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: 'Is CareerMAX accredited, and are CareerMAX certificates recognized by employers?',
      a: 'Yes. CareerMAX aligns fully with the regulatory guidelines of the Equipment Leasing Registration Authority (ELRA) and the Association of Credit & Leasing Council (ACC). Our credentials are authenticated under national compliance registries, ensuring corporate recognition and verified security.'
    },
    {
      q: 'What is CareerMAX Pro, and is it worth it?',
      a: 'CareerMAX Pro is a monthly subscription giving learners unlimited access to premium learning libraries, mock interview preparation dashboards, AI-powered CV optimization tools, and two accredited examination booking attempts. It provides significant career leverage for professionals seeking verified credentials.'
    },
    {
      q: 'How can CareerMAX help me get a job or advance my career?',
      a: 'Instead of managing fragmented portfolios, all your learning courses, exam scores, and accreditations are tied to one CareerMAX profile. Partnered employers, recruitment firms, and pipeline sponsors search and audit this database directly to hire validated talent.'
    },
    {
      q: 'Does CareerMAX offer free online courses?',
      a: 'Yes, CareerMAX offers a Free Basic tier. Free members can create a basic profile, build an online resume, search current job openings, and access a selection of self-paced open courseware modules.'
    },
    {
      q: 'Is CareerMAX compliant with local data regulations?',
      a: 'Fully. CareerMAX is built to be compliant with the Nigeria Data Protection Act (NDPA) and international security standards. Candidate data sharing is strictly permissions-based, and credentials can be audited only via authorized public verification hashes.'
    }
  ];

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto space-y-8">
      <h3 className="text-2xl font-black text-[#0A192F] tracking-tight border-b border-slate-200 pb-4">
        Frequently asked questions
      </h3>

      <div className="space-y-1">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx} 
              className="border-b border-slate-200 py-4 transition-colors"
            >
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between text-left gap-4 font-bold text-[#0A192F] hover:text-[#00B4D8] text-xs md:text-sm transition-colors py-2 cursor-pointer"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp size={16} className="text-[#00B4D8] shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-slate-400 shrink-0" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-[#334155] leading-relaxed font-semibold pt-2 pb-3 text-slate-500 max-w-4xl">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
