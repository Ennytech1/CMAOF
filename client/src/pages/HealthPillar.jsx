import React from 'react';
import { HeartPulse, CheckCircle2 } from 'lucide-react';

const HealthPillar = ({ onOpenDonate }) => {
  const initiatives = [
    { title: '1. Maternal, Women & Reproductive Health', desc: 'Prenatal care, safe delivery packages, and maternal nutrition assistance.' },
    { title: '2. Child Health & Nutrition', desc: 'Immunization support, pediatric screening, and deworming initiatives.' },
    { title: '3. Community Health Outreach', desc: 'Mobile medical clinics bringing healthcare to underserved rural communities.' },
    { title: '4. Primary Healthcare Strengthening', desc: 'Renovation, equipment supply, and solar power for primary health centers.' },
    { title: '5. Eye Care & Vision Screening', desc: 'Free eye exams, corrective eyeglasses, and surgical cataract restoration.' },
    { title: '6. Essential Medicine & Treatment Support', desc: 'Subsidized chronic disease medication for hypertension and diabetes.' },
    { title: '7. Healthy Ageing & Priority Care', desc: 'Specialized geriatric care and wellness checkups for elderly citizens.' },
    { title: '8. Mental Health & Psychosocial Support', desc: 'Community mental wellness education and counseling assistance.' },
    { title: '9. Community Health Champions', desc: 'Training local volunteers as first-contact health awareness leaders.' },
    { title: '10. Medical Partnership & Specialist Access', desc: 'Collaborating with teaching hospitals to fund critical specialist surgeries.' }
  ];

  return (
    <div className="py-12 lg:py-16 space-y-12 animate-fade-in">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D1B2A] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-red-900/60 text-red-300 text-xs font-extrabold uppercase tracking-wider">
              Strategic Pillar 02 — Prevent → Treat → Restore
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Health & Well-being
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Elevating community healthcare, maternal & child nutrition, eye care, primary health access, and essential treatment support across Nigeria.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-3xl font-extrabold text-[#0D1B2A]">
          10 Core Healthcare Initiatives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initiatives.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-red-400 transition-colors">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-red-600 shrink-0 mt-1" />
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

export default HealthPillar;
