import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Sprout,
  Coins,
  CreditCard,
  TrendingUp,
  Rocket,
  Laptop,
  Users,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Heart,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Award
} from 'lucide-react';

const EconomicEmpowermentPillar = ({ onOpenDonate }) => {
  useEffect(() => {
    document.title = 'Economic Empowerment | Chief Michael Ade.Ojo Foundation';
  }, []);

  // 10 Core Initiative Families Mandated by R2
  const initiatives = [
    {
      id: 'vocational-trades',
      number: '01',
      title: 'Vocational & Technical Trades Training',
      icon: <Wrench size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Industry-certified apprenticeships in automotive diagnostics, electrical systems, fabrication, mechatronics, and precision construction trades.',
      target: 'Unemployed youths, apprentice artisans, and secondary school graduates',
      outcome: 'Industry trade certifications & full starter toolkits for immediate wage or self-employment',
      accentBg: 'bg-[#FFF8E5]',
      badgeBorder: 'border-[#FCCD37]/40'
    },
    {
      id: 'agricultural-value-chain',
      number: '02',
      title: 'Agricultural Value-Chain Enablement',
      icon: <Sprout size={22} className="text-[#338C26]" strokeWidth={2.3} />,
      desc: 'Modern agronomic training, climate-resilient seedlings, shared storage infrastructure, and mechanized processing units for cassava, cocoa, and oil palm.',
      target: 'Smallholder farming families, rural agro-processors, and youth agripreneurs',
      outcome: '40%+ post-harvest loss reduction and direct linkage to guaranteed industrial off-takers',
      accentBg: 'bg-[#EDF7EB]',
      badgeBorder: 'border-[#338C26]/40'
    },
    {
      id: 'financial-literacy',
      number: '03',
      title: 'Financial Literacy & Inclusion',
      icon: <Coins size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Grassroots financial education covering structured bookkeeping, savings mobilization, credit hygiene, and direct integration into formal banking.',
      target: 'Informal market women, micro-merchants, and community trade associations',
      outcome: '100% verified digital banking onboarding and audited micro-business accounts',
      accentBg: 'bg-[#FFF8E5]',
      badgeBorder: 'border-[#FCCD37]/40'
    },
    {
      id: 'micro-credit-seed-grants',
      number: '04',
      title: 'Micro-Credit & Seed Grant Access',
      icon: <CreditCard size={22} className="text-[#0047BA]" strokeWidth={2.3} />,
      desc: 'Catalytic non-repayable seed grants, revolving zero-interest working capital loans, and asset-backed financing for verified trade graduates.',
      target: 'Certified trade alumni, high-potential micro-enterprises, and female-headed households',
      outcome: 'Zero-collateral starter capital directly financing equipment, workspace, and initial inventory',
      accentBg: 'bg-[#EBF3FC]',
      badgeBorder: 'border-[#0047BA]/40'
    },
    {
      id: 'market-linkage-cooperatives',
      number: '05',
      title: 'Market Linkage & Cooperative Syndication',
      icon: <TrendingUp size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Organizing fragmented producers into formal cooperatives to achieve bulk procurement savings, eliminate predatory intermediaries, and secure institutional contracts.',
      target: 'Artisanal trade associations, agricultural producer syndicates, and cluster cooperatives',
      outcome: 'Direct negotiated supply contracts with regional corporate buyers and wholesale off-takers',
      accentBg: 'bg-[#FFF8E5]',
      badgeBorder: 'border-[#FCCD37]/40'
    },
    {
      id: 'business-incubation',
      number: '06',
      title: 'Business Incubation & Enterprise Acceleration',
      icon: <Rocket size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Structured 12-month venture incubation offering corporate registration advisory (CAC), tax compliance support, financial modeling, and executive mentorship.',
      target: 'High-growth community entrepreneurs, tech-enabled service providers, and social ventures',
      outcome: 'Fully formalized, bankable commercial entities equipped for institutional scale',
      accentBg: 'bg-[#FAF6EE]',
      badgeBorder: 'border-[#848688]/40'
    },
    {
      id: 'digital-skills-gig',
      number: '07',
      title: 'Digital Skills & Gig-Economy Enablement',
      icon: <Laptop size={22} className="text-[#0047BA]" strokeWidth={2.3} />,
      desc: 'Market-driven training in e-commerce administration, virtual assistance, digital marketing, UI basics, and software operations with global freelance platform onboarding.',
      target: 'Underemployed polytechnic and university graduates, and ambitious community youths',
      outcome: 'Verifiable digital portfolios and active revenue generation across digital gig platforms',
      accentBg: 'bg-[#EBF3FC]',
      badgeBorder: 'border-[#0047BA]/40'
    },
    {
      id: 'women-led-cooperatives',
      number: '08',
      title: 'Women-Led Enterprise Cooperatives',
      icon: <Users size={22} className="text-[#338C26]" strokeWidth={2.3} />,
      desc: 'Targeted capital funds, shared mechanized processing facilities, and executive governance development tailored for women-owned enterprise syndicates.',
      target: 'Women cooperative societies, food-processing associations, and textile artisan groups',
      outcome: 'Average 65% household income uplift and elevated civic leadership for rural female producers',
      accentBg: 'bg-[#EDF7EB]',
      badgeBorder: 'border-[#338C26]/40'
    },
    {
      id: 'artisanal-cluster-modernization',
      number: '09',
      title: 'Artisanal Cluster Modernization',
      icon: <Sparkles size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Revitalizing informal mechanics villages, tailoring hubs, and carpentry clusters with shared solar mini-grids, digital diagnostic tooling, and industrial safety standards.',
      target: 'Informal trade cluster zones, master craftsmen, and apprentice collectives',
      outcome: '3x daily operational throughput, lower carbon footprint, and enhanced workplace safety',
      accentBg: 'bg-[#FFF8E5]',
      badgeBorder: 'border-[#FCCD37]/40'
    },
    {
      id: 'youth-entrepreneurship-labs',
      number: '10',
      title: 'Youth Entrepreneurship Labs',
      icon: <Lightbulb size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Experiential venture bootcamps, rapid prototyping labs, and annual seed pitch competitions embedded in secondary and vocational feeder institutions.',
      target: 'Secondary school seniors, polytechnic students, and early-stage teenage innovators',
      outcome: 'Annual seed prize pipeline financing the top 20 youth venture prototypes per cohort',
      accentBg: 'bg-[#FFF8E5]',
      badgeBorder: 'border-[#FCCD37]/40'
    }
  ];

  // 3-Phase Pathway Progression
  const pathwayPhases = [
    {
      phase: '01',
      title: 'EMPOWER',
      subtitle: 'Foundational Capacity & Capital',
      color: 'bg-[#FCCD37] text-[#5B2E19]',
      borderColor: 'border-[#FCCD37]',
      desc: 'We identify underemployed talent, deliver certified vocational and digital skills training, and provide essential seed equipment and micro-grant capital.',
      items: [
        'Certified Trade Apprenticeships',
        'Financial Literacy & Account Setup',
        'Starter Toolkits & Micro-Seed Grants'
      ]
    },
    {
      phase: '02',
      title: 'PRODUCE',
      subtitle: 'Enterprise Incubation & Modernization',
      color: 'bg-[#5B2E19] text-white',
      borderColor: 'border-[#5B2E19]',
      desc: 'Graduates enter structured incubation hubs, modernize trade clusters with solar power and diagnostic tools, and syndicate into formal cooperatives.',
      items: [
        'CAC Formalization & Mentorship',
        'Artisanal Cluster Solar Upgrades',
        'Bulk Purchasing & Producer Syndication'
      ]
    },
    {
      phase: '03',
      title: 'THRIVE',
      subtitle: 'Market Access & Self-Reliance',
      color: 'bg-[#338C26] text-white',
      borderColor: 'border-[#338C26]',
      desc: 'Enterprises access institutional supply chains, achieve sustainable profitability, employ local apprentices, and reinvest into community resilience.',
      items: [
        'Corporate & Off-Taker Supply Contracts',
        'Intergenerational Wealth Creation',
        'Local Apprentice Job Creation'
      ]
    }
  ];

  // Key Impact Metrics
  const metrics = [
    { value: '3,500+', label: 'Artisans & Youths Trained & Certified', sub: 'Across 10 technical & digital trades' },
    { value: '₦150M+', label: 'Seed Grants & Working Capital Deployed', sub: 'Zero-interest revolving capital access' },
    { value: '50+', label: 'Producer Cooperatives Syndicated', sub: 'Agro-processing, mechanics & crafts' },
    { value: '88%', label: '2-Year Venture Survival & Profitability Rate', sub: 'Backed by structured mentor incubation' }
  ];

  return (
    <div className="w-full bg-white space-y-12 sm:space-y-16 animate-fade-in pb-16 font-sans">
      
      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION                                            */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: '520px' }}>
        {/* Photographic Background */}
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-[position:80%_center] bg-no-repeat"
          style={{
            backgroundImage: `url('/images/past_event_seedling_girl.jpg')`
          }}
          aria-hidden="true"
        />

        {/* High-Contrast Linear Gradient Overlay: ensures 100% solid, crisp white backing behind all text */}
        <div
          className="absolute inset-0 hidden md:block pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 36%, rgba(255,255,255,0.92) 50%, rgba(255,255,255,0.45) 66%, transparent 80%)'
          }}
          aria-hidden="true"
        />
        {/* Mobile vertical gradient fallback */}
        <div
          className="absolute inset-0 md:hidden pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 65%, rgba(255,255,255,0.40) 100%)'
          }}
          aria-hidden="true"
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[98px] sm:pt-[115px] lg:pt-[128px] pb-14 sm:pb-16 lg:pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5B2E19]">
                <div className="w-1 h-3.5 bg-[#FCCD37] rounded-full shrink-0" />
                <Link to="/" className="hover:text-[#5B2E19]/80 transition-colors">Home</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <Link to="/our-work" className="hover:text-[#5B2E19]/80 transition-colors">Our Work</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <span className="text-[#5B2E19] font-bold">Economic Empowerment</span>
              </div>

              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8E5] border border-[#FCCD37]/50 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#FCCD37]" />
                <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#5B2E19]">
                  STRATEGIC PILLAR 04 — EMPOWER → PRODUCE → THRIVE
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.12] text-[#5B2E19]">
                Economic Empowerment
              </h1>

              {/* Subtitle */}
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-medium">
                Catalysing sustainable enterprise, modernising technical trades, expanding agricultural value chains, and unlocking productive capital for self-reliant communities across Nigeria.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/donate"
                  className="flex items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full font-black text-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer bg-[#FCCD37] hover:bg-[#EBB823] text-[#5B2E19] shadow-md border border-[#FCCD37]"
                >
                  <Heart size={16} className="fill-[#5B2E19]/30 stroke-[#5B2E19] stroke-[2.5]" />
                  <span>Support Economic Empowerment</span>
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
      {/* 2. THE CORE PATHWAY: EMPOWER → PRODUCE → THRIVE            */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#EFE8DC] space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#FCCD37] rounded-full inline-block" />
                <span className="text-xs font-black uppercase tracking-widest text-[#5B2E19]">
                  THE PROGRAMMATIC LIFECYCLE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5B2E19] tracking-tight">
                Our Pathway: Empower → Produce → Thrive
              </h2>
              <p className="text-slate-600 text-sm max-w-2xl font-medium">
                We believe true charity culminates in self-reliance. Our three-stage pipeline transitions beneficiaries from capacity acquisition to sustainable market leadership.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#5B2E19] bg-white px-4 py-2 rounded-full border border-slate-200">
              <ShieldCheck size={16} className="text-[#338C26]" />
              <span>Evidence-Based Economic Model</span>
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
              <span className="w-1.5 h-5 bg-[#FCCD37] rounded-full inline-block" />
              <span className="text-xs font-black uppercase tracking-widest text-[#5B2E19]">
                FLAGSHIP PROGRAMMES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5B2E19] tracking-tight">
              10 Core Economic Initiatives
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-medium">
              Mandated by the CMAOF strategic charter to dismantle poverty bottlenecks and spark sustainable grassroots enterprise.
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
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#FCCD37] hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-11 h-11 rounded-xl ${item.accentBg} border ${item.badgeBorder} flex items-center justify-center shrink-0 shadow-2xs`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-black tracking-widest text-[#5B2E19]/40 group-hover:text-[#5B2E19] transition-colors">
                    FAMILY {item.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-[#5B2E19] text-lg group-hover:text-[#7A3E22] transition-colors">
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
          {/* Subtle Watermark Decoration */}
          <div
            className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/5 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#FCCD37]">
                  <Award size={14} />
                  <span>MEASURABLE GRASSROOTS TRANSFORMATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Economic Empowerment in Numbers
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-normal">
                  Our interventions are rigorously tracked, audited, and optimized to guarantee tangible return on philanthropic capital.
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
            
            {/* Story Image */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-slate-100">
              <img
                src="/images/story_kehinde.jpg"
                alt="Kehinde in his modernized fabrication workshop"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#5B2E19] text-[#FCCD37] text-xs font-black uppercase px-3 py-1 rounded-full shadow-md">
                BENEFICIARY SPOTLIGHT
              </div>
            </div>

            {/* Story Content */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#338C26]">
                  <CheckCircle2 size={16} />
                  <span>Verified CMAOF Trade Graduate & Enterprise Incubator Alumni</span>
                </div>

                <h3 className="text-2xl font-extrabold text-[#5B2E19] leading-snug">
                  From Struggling Hand-Artisan to Solar Fabrication Employer: Kehinde&apos;s Story
                </h3>

                <blockquote className="border-l-4 border-[#FCCD37] pl-4 italic text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  &ldquo;Before the CMAOF technical trade grant and business incubation program, I struggled with outdated manual tools and erratic power. Today, our workshop fabricates solar mounts and employs eight young apprentices from Ilara-Mokin.&rdquo;
                </blockquote>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Through the Artisanal Cluster Modernization initiative, Kehinde received advanced diagnostic tooling and business acceleration support. His venture now serves commercial clients across Ondo State and trains high-school polytechnic interns.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
                <div className="p-3 bg-[#FAF6EE] rounded-xl">
                  <div className="text-lg font-black text-[#5B2E19]">8</div>
                  <div className="text-[11px] font-semibold text-slate-600">Local Youths Employed</div>
                </div>
                <div className="p-3 bg-[#FAF6EE] rounded-xl">
                  <div className="text-lg font-black text-[#338C26]">3.4x</div>
                  <div className="text-[11px] font-semibold text-slate-600">Revenue Growth</div>
                </div>
                <div className="p-3 bg-[#FAF6EE] rounded-xl">
                  <div className="text-lg font-black text-[#0047BA]">100%</div>
                  <div className="text-[11px] font-semibold text-slate-600">Solar-Powered Shop</div>
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
            <span className="text-xs font-black uppercase tracking-widest text-[#5B2E19] block">
              INVEST IN ENTERPRISE & SELF-RELIANCE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#5B2E19] tracking-tight">
              Fuel Sustainable Enterprise. Transform Entire Communities.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              Every donation directly provisions starter toolkits, seed micro-grants, and agricultural value-chain facilities for verified Nigerian entrepreneurs.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/donate"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full font-black text-sm bg-[#FCCD37] hover:bg-[#EBB823] text-[#5B2E19] shadow-md hover:scale-[1.03] active:scale-95 transition-all cursor-pointer"
            >
              <Heart size={16} className="fill-[#5B2E19]/30 stroke-[#5B2E19] stroke-[2.5]" />
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

export default EconomicEmpowermentPillar;
