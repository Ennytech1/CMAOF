import React from 'react';
import { GraduationCap, CheckCircle2, ArrowRight, Heart, ChevronRight } from 'lucide-react';
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
    <div className="w-full bg-white space-y-12 animate-fade-in pb-16">
      
      {/* ── Pillar Hero Header matching Hero.jsx and AboutHero.jsx ── */}
      <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: '520px' }}>
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-[position:82%_center] bg-no-repeat"
          style={{ backgroundImage: `url('/images/pillar_education.jpg')` }}
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
                <Link to="/our-work" className="hover:text-[#0F4C3A] transition-colors">Our Work</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <span className="text-[#0F2B5B]">Education</span>
              </div>

              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#2563EB] rounded-full shrink-0" />
                <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#2563EB]">
                  STRATEGIC PILLAR 01 — LEARN → DEVELOP → EXCEL
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.12] text-[#0F2B5B]">
                Education & Human Capital
              </h1>

              {/* Subtitle */}
              <p className="text-[#1E355E] text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-medium">
                Empowering minds, strengthening educators, nurturing leadership, technical mastery, and academic excellence across Nigeria.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenDonate}
                  className="flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-bold text-white text-xs sm:text-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer bg-[#2563EB] hover:bg-[#1d4ed8] shadow-md"
                >
                  <Heart size={16} className="fill-white/25 stroke-white" strokeWidth={2.5} />
                  <span>Support Education</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </div>

            </div>
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
