import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const CommunityPillar = ({ onOpenDonate }) => {
  const initiatives = [
    { title: '1. Food Security & Community Nutrition', desc: 'Sustainable food distribution programs and agricultural assistance for families.' },
    { title: '2. Clean Water & Sanitation Infrastructure', desc: 'Solar borehole installation and WASH sanitation facilities in communities.' },
    { title: '3. Elderly & Social Care Services', desc: 'Dignified care kits, social visits, and support for vulnerable senior citizens.' },
    { title: '4. Emergency Response & Recovery', desc: 'Rapid relief distribution during floods, fires, or localized hardship crises.' },
    { title: '5. Household Resilience & Basic Needs', desc: 'Targeted support for low-income households facing extreme adversity.' },
    { title: '6. Disability Inclusion & Accessibility', desc: 'Assistive devices, mobility aids, and advocacy for persons with disabilities.' },
    { title: '7. Community Volunteer & Action Corps', desc: 'Mobilizing local youth for community service, cleanup, and development.' },
    { title: '8. Community Infrastructure Development', desc: 'Rehabilitating civic halls, learning spaces, and public community facilities.' },
    { title: '9. Community Support & Referral Centre', desc: 'Walk-in advice, guidance, and social service referral hub.' },
    { title: '10. Social Protection Systems', desc: 'Collaborating with community leaders to establish local safety net frameworks.' }
  ];

  return (
    <div className="py-12 lg:py-16 space-y-12 animate-fade-in">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#14634C] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-900/80 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              Strategic Pillar 03 — Support → Protect → Strengthen
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Community Resilience & Social Well-being
            </h1>
            <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
              Building resilient communities through clean water, food security, elderly care, emergency response, and inclusion.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-3xl font-extrabold text-[#0D1B2A]">
          10 Community Resilience Initiatives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initiatives.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-400 transition-colors">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-amber-600 shrink-0 mt-1" />
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

export default CommunityPillar;
