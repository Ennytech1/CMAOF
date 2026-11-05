import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Award,
  Briefcase,
  Wrench,
  Laptop,
  Lightbulb,
  Target,
  Cpu,
  Users,
  CheckCircle2,
  ArrowRight,
  Heart,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

const EducationPillar = ({ onOpenDonate }) => {
  useEffect(() => {
    document.title = 'Education & Opportunity | Chief Michael Ade.Ojo Foundation';
  }, []);

  // 10 Core Flagship Initiatives Mandated by R2
  const initiatives = [
    {
      id: 'academic-excellence-stem',
      number: '01',
      title: 'Academic Excellence Support & STEM Labs',
      icon: <BookOpen size={22} className="text-[#0047BA]" strokeWidth={2.3} />,
      desc: 'Provisioning standardized primary and secondary science laboratories, STEM experiment kits, core textbook endowments, and remedial learning clinics.',
      target: 'Primary and secondary school students in rural and economically constrained communities',
      outcome: '98% secondary school completion rate and 100% curriculum-standard textbook provisioning',
      accentBg: 'bg-[#EBF3FC]',
      badgeBorder: 'border-[#0047BA]/40'
    },
    {
      id: 'tertiary-scholarships',
      number: '02',
      title: 'University & Polytechnic Scholarships',
      icon: <GraduationCap size={22} className="text-[#0047BA]" strokeWidth={2.3} />,
      desc: 'Merit-based full tuition endowments, annual living stipends, and hostel accommodations tenable at Elizade University and accredited federal institutions.',
      target: 'Brilliant low-income scholars across Ondo State and nationally with proven academic excellence',
      outcome: '100% debt-free graduation with over 60% achieving First Class or Second Class Upper degrees',
      accentBg: 'bg-[#EBF3FC]',
      badgeBorder: 'border-[#0047BA]/40'
    },
    {
      id: 'teacher-excellence',
      number: '03',
      title: 'Teacher Excellence & Pedagogical Mastery',
      icon: <Award size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Structured professional development academies, modern pedagogical methodology, digital classroom administration, and competitive teacher distinction awards.',
      target: 'Primary and secondary educators across public and community institutions',
      outcome: 'Over 1,200 educators upskilled annually with measurable student comprehension gains',
      accentBg: 'bg-[#FAF6EE]',
      badgeBorder: 'border-[#5B2E19]/30'
    },
    {
      id: 'graduate-readiness',
      number: '04',
      title: 'Graduate Finishing & Employability Readiness',
      icon: <Briefcase size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Intensive workplace transition bootcamps covering executive communication, critical reasoning, business software mastery, and direct corporate internship placement.',
      target: 'Final-year university undergraduates and recent National Youth Service Corps (NYSC) graduates',
      outcome: '85%+ corporate or formal enterprise placement achieved within 6 months of graduation',
      accentBg: 'bg-[#FAF6EE]',
      badgeBorder: 'border-[#5B2E19]/30'
    },
    {
      id: 'vocational-trades',
      number: '05',
      title: 'Technical & Vocational Trades Academy',
      icon: <Wrench size={22} className="text-[#338C26]" strokeWidth={2.3} />,
      desc: 'Hands-on certified technical training in automotive mechatronics, electrical wiring, solar PV installation, precision carpentry, and mechanical fabrication.',
      target: 'Secondary school leavers, apprentice artisans, and out-of-school community youths',
      outcome: 'National Board for Technical Education (NBTE) certification and complete starter toolkits',
      accentBg: 'bg-[#EDF7EB]',
      badgeBorder: 'border-[#338C26]/40'
    },
    {
      id: 'digital-incubation',
      number: '06',
      title: 'Digital Innovation & Tech Incubation Labs',
      icon: <Laptop size={22} className="text-[#0047BA]" strokeWidth={2.3} />,
      desc: 'Full-stack software engineering, cloud infrastructure, AI literacy, and UI/UX design academies paired with high-speed internet co-working spaces and device grants.',
      target: 'Ambitious youth coders, polytechnic graduates, and digital freelancers',
      outcome: 'Verifiable production software portfolios and active remote international engineering contracts',
      accentBg: 'bg-[#EBF3FC]',
      badgeBorder: 'border-[#0047BA]/40'
    },
    {
      id: 'youth-enterprise',
      number: '07',
      title: 'Productive Youth Enterprise & Seed Grants',
      icon: <Lightbulb size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Experiential venture bootcamps, rapid prototyping clinics, and non-dilutive seed funding competitions for student-led and youth-owned community enterprises.',
      target: 'Undergraduate innovators, tertiary campus entrepreneurs, and early-stage trade founders',
      outcome: 'Seed financing and corporate CAC registration for 35 high-potential youth enterprises annually',
      accentBg: 'bg-[#FFF8E5]',
      badgeBorder: 'border-[#FCCD37]/50'
    },
    {
      id: 'mission-1000-professionals',
      number: '08',
      title: 'Mission 1,000 Ilara Professionals',
      icon: <Target size={22} className="text-[#0047BA]" strokeWidth={2.3} />,
      desc: 'Flagship human capital endowment dedicated to producing 1,000 certified doctors, engineers, lawyers, accountants, architects, and nurses originating from Ilara-Mokin.',
      target: 'Indigenes and long-term youth residents of Ilara-Mokin pursuing chartered and licensed professions',
      outcome: 'Over 450 certified professionals produced to date, spearheading community socio-economic transformation',
      accentBg: 'bg-[#EBF3FC]',
      badgeBorder: 'border-[#0047BA]/40'
    },
    {
      id: 'industrial-apprenticeship',
      number: '09',
      title: 'Industrial Manufacturing & Technical Apprenticeship',
      icon: <Cpu size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Dual-track industrial apprenticeships partnered with manufacturing and automotive conglomerates, offering factory-floor training and precision machining.',
      target: 'Polytechnic engineering diplomates, technical college alumni, and industrial apprentices',
      outcome: 'Direct employment pipeline into certified automotive assembly and manufacturing plants',
      accentBg: 'bg-[#FAF6EE]',
      badgeBorder: 'border-[#5B2E19]/30'
    },
    {
      id: 'executive-mentorship',
      number: '10',
      title: 'Executive Mentorship & Civic Leadership Network',
      icon: <Users size={22} className="text-[#338C26]" strokeWidth={2.3} />,
      desc: 'One-on-one executive mentorship pairing high-potential scholars with corporate leaders, public service stalwarts, and alumni fellows for ethical leadership development.',
      target: 'Final-year scholarship beneficiaries, graduate fellows, and young civic leaders',
      outcome: 'Active executive sponsorship, structured career advisory, and lifelong community reinvestment',
      accentBg: 'bg-[#EDF7EB]',
      badgeBorder: 'border-[#338C26]/40'
    }
  ];

  // 3-Phase Pathway Progression
  const pathwayPhases = [
    {
      phase: '01',
      title: 'LEARN',
      subtitle: 'Foundational Literacy & Academic Access',
      color: 'bg-[#0047BA] text-white',
      borderColor: 'border-[#0047BA]',
      desc: 'We eliminate economic barriers to primary and secondary schooling, modernize classrooms, supply learning kits, and reward academic distinction.',
      items: [
        'Primary & Secondary Tuition Grants',
        'STEM Laboratory & Textbook Provisioning',
        'Teacher Pedagogical Upskilling Academies'
      ]
    },
    {
      phase: '02',
      title: 'DEVELOP',
      subtitle: 'Tertiary Excellence & Technical Mastery',
      color: 'bg-[#5B2E19] text-white',
      borderColor: 'border-[#5B2E19]',
      desc: 'Scholars enter university and polytechnic degree programmes with 100% full funding, while technical students acquire certified vocational trades.',
      items: [
        'Full Tertiary Degree Scholarships',
        'Certified Vocational Apprenticeships',
        'Digital Coding & Software Bootcamps'
      ]
    },
    {
      phase: '03',
      title: 'EXCEL',
      subtitle: 'Professional Licensing & Nation-Building',
      color: 'bg-[#338C26] text-white',
      borderColor: 'border-[#338C26]',
      desc: 'Graduates obtain professional licensure, secure corporate placement, launch ventures, and give back as mentors in the Mission 1,000 network.',
      items: [
        'Mission 1,000 Certified Professionals',
        'Corporate Employability & Placement Hub',
        'Alumni Civic Mentorship Reinvestment'
      ]
    }
  ];

  // Key Impact Metrics
  const metrics = [
    { value: '15,000+', label: 'Pupils & Students Supported', sub: 'Tuition grants, uniforms, textbooks & learning materials' },
    { value: '2,850+', label: 'Tertiary Scholarships Awarded', sub: '100% full-tuition & accommodation at Elizade & federal varsities' },
    { value: '450+', label: 'Certified Ilara Professionals', sub: 'Doctors, engineers, lawyers & chartered accountants' },
    { value: '96%', label: 'Graduate Employment & Placement', sub: 'Within 6 months of corporate finishing readiness' }
  ];

  return (
    <div className="w-full bg-white space-y-12 sm:space-y-16 animate-fade-in pb-16 font-sans">
      
      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION                                            */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: '520px' }}>
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-[position:82%_center] bg-no-repeat"
          style={{ backgroundImage: `url('/images/pillar_education.jpg')` }}
          aria-hidden="true"
        />

        {/* High-Contrast Linear Gradient Overlay */}
        <div
          className="absolute inset-0 hidden md:block pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 36%, rgba(255,255,255,0.92) 50%, rgba(255,255,255,0.45) 66%, transparent 80%)'
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 md:hidden pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 65%, rgba(255,255,255,0.40) 100%)'
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[98px] sm:pt-[115px] lg:pt-[128px] pb-14 sm:pb-16 lg:pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5B2E19]">
                <div className="w-1 h-3.5 bg-[#0047BA] rounded-full shrink-0" />
                <Link to="/" className="hover:text-[#5B2E19]/80 transition-colors">Home</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <Link to="/our-work" className="hover:text-[#5B2E19]/80 transition-colors">Our Work</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <span className="text-[#0047BA] font-bold">Education & Opportunity</span>
              </div>

              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3FC] border border-[#0047BA]/40 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0047BA]" />
                <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#0047BA]">
                  STRATEGIC PILLAR 01 — LEARN → DEVELOP → EXCEL
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.12] text-[#5B2E19]">
                Education & Opportunity
              </h1>

              {/* Subtitle */}
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-medium">
                Expanding access to quality learning, empowering educators, fostering technical mastery, and nurturing leadership excellence to unleash human potential across Nigeria.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/donate"
                  className="flex items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full font-black text-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer bg-[#0047BA] hover:bg-[#00368F] text-white shadow-md border border-[#0047BA]"
                >
                  <Heart size={16} className="fill-white/30 stroke-white stroke-[2.5]" />
                  <span>Support Education & Opportunity</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </Link>

                <a
                  href="#initiatives"
                  className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs sm:text-sm text-[#5B2E19] bg-white/90 hover:bg-slate-50 border border-slate-300 transition-colors shadow-xs"
                >
                  <span>Explore 10 Core Initiatives</span>
                  <ChevronRight size={14} />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 2. THE CORE PATHWAY: LEARN → DEVELOP → EXCEL               */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#EFE8DC] space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#0047BA] rounded-full inline-block" />
                <span className="text-xs font-black uppercase tracking-widest text-[#5B2E19]">
                  THE PROGRAMMATIC LIFECYCLE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5B2E19] tracking-tight">
                Our Pathway: Learn → Develop → Excel
              </h2>
              <p className="text-slate-600 text-sm max-w-2xl font-medium">
                Education is an unbroken continuum. Our three-stage framework nurtures talent from basic classroom literacy to tertiary mastery and licensed professional leadership.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#5B2E19] bg-white px-4 py-2 rounded-full border border-slate-200">
              <ShieldCheck size={16} className="text-[#338C26]" />
              <span>Evidence-Based Educational Model</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pathwayPhases.map((phase) => (
              <div
                key={phase.phase}
                className={`bg-white rounded-2xl p-6 border-2 ${phase.borderColor} shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-black ${phase.color}`}>
                      PHASE {phase.phase}
                    </span>
                    <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                      {phase.title}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-[#5B2E19] leading-snug">
                      {phase.title}
                    </h3>
                    <div className="text-xs font-bold text-slate-500 mt-0.5">
                      {phase.subtitle}
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {phase.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                  {phase.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 size={14} className="text-[#338C26] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 3. 10 CORE INITIATIVE FAMILIES GRID                        */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="initiatives" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#0047BA] rounded-full inline-block" />
              <span className="text-xs font-black uppercase tracking-widest text-[#5B2E19]">
                FLAGSHIP PROGRAMMES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5B2E19] tracking-tight">
              10 Core Educational Initiatives
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-medium">
              Mandated by the CMAOF strategic charter to eliminate educational deficits and cultivate world-class Nigerian professionals.
            </p>
          </div>

          <div className="text-xs font-bold text-slate-500">
            Showing all 10 approved programme families
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initiatives.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#0047BA] hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-11 h-11 rounded-xl ${item.accentBg} border ${item.badgeBorder} flex items-center justify-center shrink-0 shadow-2xs`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-black tracking-widest text-[#5B2E19]/40 group-hover:text-[#0047BA] transition-colors">
                    FAMILY {item.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-[#5B2E19] text-lg group-hover:text-[#0047BA] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-baseline gap-1.5 text-slate-500">
                  <span className="font-bold text-[#5B2E19] uppercase tracking-wider text-[11px] shrink-0">Target:</span>
                  <span className="font-medium text-slate-700">{item.target}</span>
                </div>
                <div className="flex items-baseline gap-1.5 text-slate-500">
                  <span className="font-bold text-[#338C26] uppercase tracking-wider text-[11px] shrink-0">Impact:</span>
                  <span className="font-semibold text-slate-800">{item.outcome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 4. IMPACT METRICS DASHBOARD                                */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#5B2E19] text-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden border-t-4 border-[#FCCD37]">
          <div
            className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/5 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#FCCD37]">
                  <Award size={14} />
                  <span>MEASURABLE SCHOLASTIC TRANSFORMATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Education & Opportunity in Numbers
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-normal">
                  Our scholarship endowments and educational interventions are rigorously audited and monitored to ensure transformative life outcomes for every student.
                </p>
              </div>

              <Link
                to="/impact"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FCCD37] hover:underline"
              >
                <span>View Full Institutional Impact Report</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/15">
              {metrics.map((metric, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="text-3xl sm:text-4xl font-black text-[#FCCD37] tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-sm font-bold text-white leading-snug">
                    {metric.label}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {metric.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 5. SUCCESS STORY SPOTLIGHT                                 */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-slate-100">
              <img
                src="/images/story_amina.jpg"
                alt="Amina in her university engineering laboratory"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#5B2E19] text-[#FCCD37] text-xs font-black uppercase px-3 py-1 rounded-full shadow-md">
                BENEFICIARY SPOTLIGHT
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#338C26]">
                  <CheckCircle2 size={16} />
                  <span>Verified CMAOF Scholar & Mission 1,000 Engineering Fellow</span>
                </div>

                <h3 className="text-2xl font-extrabold text-[#5B2E19] leading-snug">
                  From Rural Public School to First-Class Engineering Honors: Amina&apos;s Story
                </h3>

                <blockquote className="border-l-4 border-[#0047BA] pl-4 italic text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  &ldquo;Before the CMAOF university scholarship, my dream of becoming an electrical engineer seemed impossible after losing my father. The foundation covered every kobo of my tuition and provided laboratory access. Today, I am designing off-grid solar mini-grids for underserved villages.&rdquo;
                </blockquote>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Amina graduated top of her Electrical & Electronics Engineering class with a 4.89 CGPA. Supported through the Mission 1,000 Ilara Professionals initiative, she now works as a systems engineer and mentors 24 young female secondary school students in STEM clubs.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
                <div className="p-3 bg-[#FAF6EE] rounded-xl">
                  <div className="text-lg font-black text-[#5B2E19]">4.89</div>
                  <div className="text-[11px] font-semibold text-slate-600">First-Class CGPA</div>
                </div>
                <div className="p-3 bg-[#FAF6EE] rounded-xl">
                  <div className="text-lg font-black text-[#338C26]">100%</div>
                  <div className="text-[11px] font-semibold text-slate-600">Tuition & Board Covered</div>
                </div>
                <div className="p-3 bg-[#FAF6EE] rounded-xl">
                  <div className="text-lg font-black text-[#0047BA]">24</div>
                  <div className="text-[11px] font-semibold text-slate-600">Girls Mentored in STEM</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 6. CALL TO ACTION BANNER                                   */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] rounded-3xl p-8 sm:p-10 border border-[#EFE8DC] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-[#0047BA] block">
              INVEST IN SCHOLASTIC EXCELLENCE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#5B2E19] tracking-tight">
              Educate a Mind. Elevate an Entire Generation.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              Every donation directly funds university scholarships, primary school classrooms, and digital innovation labs for deserving Nigerian youths.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/donate"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full font-black text-sm bg-[#0047BA] hover:bg-[#00368F] text-white shadow-md hover:scale-[1.03] active:scale-95 transition-all cursor-pointer"
            >
              <Heart size={16} className="fill-white/30 stroke-white stroke-[2.5]" />
              <span>Donate to This Pillar</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>

            <Link
              to="/get-involved"
              className="flex items-center gap-2 px-5 py-3.5 rounded-full font-bold text-xs sm:text-sm bg-white hover:bg-slate-50 text-[#5B2E19] border border-slate-300 shadow-xs transition-colors"
            >
              <span>Partner With Us</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EducationPillar;
