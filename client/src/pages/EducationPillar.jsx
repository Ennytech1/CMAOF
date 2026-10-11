import React from 'react';
import { GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EducationPillar = ({ onOpenDonate }) => {
  const initiatives = [
    { title: '1. Academic Excellence Support', desc: 'Promoting scholastic performance in primary and secondary institutions.' },
    { title: '2. University Scholarships', desc: 'Full tertiary tuition and living assistance for brilliant underprivileged youth.' },
    { title: '3. Teacher Excellence & Training', desc: 'Pedagogical development and continuous capacity building for educators.' },
    { title: '4. Graduate Finishing Readiness', desc: 'Employability enhancement, soft skills, and workplace integration.' },
    { title: '5. Technical & Vocational Skills', desc: 'Hands-on practical training for technical trades and artisan mastery.' },
    { title: '6. Digital Startup Incubation', desc: 'Tech literacy, digital innovation hubs, and early-stage startup guidance.' },
    { title: '7. Productive Enterprise Support', desc: 'Entrepreneurial skills and micro-capital enablement for young innovators.' },
    { title: '8. Mission 1,000 Ilara Professionals', desc: 'Flagship initiative targeted at producing 1,000 certified professionals in Ilara-Mokin.' },
    { title: '9. Manufacturing & Technical Academy', desc: 'Specialized industrial skills, automotive mechanics, and technical craftsmanship.' },
    { title: '10. Mentorship & Leadership Development', desc: 'Connecting young scholars with industry leaders and professional mentors.' }
  ];

  return (
    <div className="py-12 lg:py-16 space-y-12 animate-fade-in">
      
      {/* Pillar Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F4C3A] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-800 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              Strategic Pillar 01 — Learn → Develop → Excel
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Education & Human Capital
            </h1>
            <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
              Empowering minds, strengthening educators, nurturing leadership, technical mastery, and academic excellence across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* 10 Initiatives Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-3xl font-extrabold text-[#0D1B2A]">
          10 Core Programme Families
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initiatives.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500 transition-colors">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#0F4C3A] shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                  <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default EducationPillar;
