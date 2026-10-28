import React from 'react';
import { HeartPulse, CheckCircle2, ArrowRight, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="w-full bg-white space-y-12 animate-fade-in pb-16">
      
      {/* ── Pillar Hero Header matching Hero.jsx and AboutHero.jsx ── */}
      <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: '520px' }}>
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-[position:82%_center] bg-no-repeat"
          style={{ backgroundImage: `url('/images/pillar_health.jpg')` }}
          aria-hidden="true"
        />

        {/* ── High-Contrast Linear Gradient Overlay: ensures 100% solid, crisp white backing behind all text ── */}
        <div
          className="absolute inset-0 hidden md:block pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 32%, rgba(255,255,255,0.92) 46%, rgba(255,255,255,0.40) 60%, transparent 72%)',
          }}
          aria-hidden="true"
        />
        {/* Mobile vertical gradient fallback */}
        <div
          className="absolute inset-0 md:hidden pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 65%, rgba(255,255,255,0.40) 100%)',
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
                <Link to="/our-work" className="hover:text-[#0F4C3A] transition-colors">Our Work</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <span className="text-[#0F2B5B]">Health</span>
              </div>

              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#DC2626] rounded-full shrink-0" />
                <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#DC2626]">
                  STRATEGIC PILLAR 02 — PREVENT → TREAT → RESTORE
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.12] text-[#0F2B5B]">
                Health & Well-being
              </h1>

              {/* Subtitle */}
              <p className="text-[#1E355E] text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-medium">
                Elevating community healthcare, maternal & child nutrition, eye care, primary health access, and essential treatment support across Nigeria.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenDonate}
                  className="flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-white text-xs sm:text-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer bg-[#DC2626] hover:bg-[#b91c1c] shadow-md"
                >
                  <Heart size={16} className="fill-white/25 stroke-white" strokeWidth={2.5} />
                  <span>Support Healthcare</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </div>

            </div>
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
