import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Baby,
  HeartPulse,
  Truck,
  Activity,
  Eye,
  Pill,
  Heart,
  Brain,
  Users,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Award
} from 'lucide-react';

const HealthPillar = ({ onOpenDonate }) => {
  useEffect(() => {
    document.title = 'Health & Wellbeing | Chief Michael Ade.Ojo Foundation';
  }, []);

  // 10 Core Flagship Initiatives Mandated by R2
  const initiatives = [
    {
      id: 'maternal-reproductive-health',
      number: '01',
      title: 'Maternal, Infant & Reproductive Health',
      icon: <Baby size={22} className="text-[#338C26]" strokeWidth={2.3} />,
      desc: 'Comprehensive antenatal care packages, sterile delivery mama kits, skilled birth attendant subsidies, and post-partum maternal nutrition assistance.',
      target: 'Expectant and nursing mothers, adolescent girls, and rural women of childbearing age',
      outcome: 'Zero maternal mortality across covered communities and 99% safe facility-based deliveries',
      accentBg: 'bg-[#EDF7EB]',
      badgeBorder: 'border-[#338C26]/40'
    },
    {
      id: 'child-immunization-nutrition',
      number: '02',
      title: 'Child Immunization & Pediatric Nutrition',
      icon: <HeartPulse size={22} className="text-[#0047BA]" strokeWidth={2.3} />,
      desc: 'Routine childhood immunization drives, acute malnutrition screening, micronutrient supplement distribution, and community deworming campaigns.',
      target: 'Infants and children under age five in underserved rural farming settlements',
      outcome: 'Complete national immunization coverage for 95%+ of registered infants and 40% reduction in child stunting',
      accentBg: 'bg-[#EBF3FC]',
      badgeBorder: 'border-[#0047BA]/40'
    },
    {
      id: 'mobile-medical-outreach',
      number: '03',
      title: 'Mobile Medical Outreach & Rural Clinics',
      icon: <Truck size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Fully provisioned mobile health clinics equipped with point-of-care diagnostics, ultrasound units, and doctor teams traveling to hard-to-reach agrarian villages.',
      target: 'Isolated farming communities lacking functional local healthcare facilities',
      outcome: 'Over 25,000 rural residents consulted and treated on-site per annual outreach cycle',
      accentBg: 'bg-[#FAF6EE]',
      badgeBorder: 'border-[#5B2E19]/30'
    },
    {
      id: 'primary-healthcare-modernization',
      number: '04',
      title: 'Primary Health Centre (PHC) Infrastructure Modernization',
      icon: <Activity size={22} className="text-[#338C26]" strokeWidth={2.3} />,
      desc: 'Refurbishing grassroots health facilities with 24/7 solar mini-grids, clean borehole water, cold-chain vaccine refrigerators, and vital signs diagnostic monitors.',
      target: 'Dilapidated ward-level primary healthcare centers across Ondo State and regional focus zones',
      outcome: 'Continuous 24-hour delivery services and zero vaccine loss from electric grid failure',
      accentBg: 'bg-[#EDF7EB]',
      badgeBorder: 'border-[#338C26]/40'
    },
    {
      id: 'vision-restoration-eyecare',
      number: '05',
      title: 'Vision Restoration & Community Eye Care',
      icon: <Eye size={22} className="text-[#0047BA]" strokeWidth={2.3} />,
      desc: 'Free comprehensive visual acuity screenings, subsidized prescription eyeglasses dispensing, and fully sponsored surgical cataract extractions.',
      target: 'Elderly citizens, agricultural workers, and school pupils experiencing preventable vision impairment',
      outcome: 'Over 4,200 successful sight-restoring cataract surgeries and 8,000 pairs of corrective glasses issued',
      accentBg: 'bg-[#EBF3FC]',
      badgeBorder: 'border-[#0047BA]/40'
    },
    {
      id: 'chronic-medicine-bank',
      number: '06',
      title: 'Essential Chronic Disease Medicine Bank',
      icon: <Pill size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Subsidized monthly supply of verified, quality-assured maintenance medications and diagnostic strips for hypertension, diabetes, and cardiovascular care.',
      target: 'Low-income chronic disease patients and elderly community members lacking health insurance',
      outcome: 'Consistent therapeutic compliance, dramatically reducing stroke and hypertensive crisis incidence',
      accentBg: 'bg-[#FAF6EE]',
      badgeBorder: 'border-[#5B2E19]/30'
    },
    {
      id: 'geriatric-wellness',
      number: '07',
      title: 'Geriatric Wellness & Dignified Ageing Care',
      icon: <Heart size={22} className="text-[#338C26]" strokeWidth={2.3} />,
      desc: 'Dedicated senior citizen wellness days offering mobility assessments, arthritis physical therapy, cardiovascular checkups, and nutritional counseling.',
      target: 'Community elders aged 65 and above living in rural and semi-urban localities',
      outcome: 'Over 5,000 seniors registered for structured quarterly health monitoring and home visits',
      accentBg: 'bg-[#EDF7EB]',
      badgeBorder: 'border-[#338C26]/40'
    },
    {
      id: 'mental-health-support',
      number: '08',
      title: 'Community Mental Health & Psychosocial Counseling',
      icon: <Brain size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Destigmatization campaigns, trauma-informed psychological counseling, community peer support circles, and professional clinical psychiatric referrals.',
      target: 'Youths experiencing anxiety, trauma survivors, and families facing severe economic or social distress',
      outcome: 'Over 3,000 individuals supported through confidential counseling sessions and referral networks',
      accentBg: 'bg-[#FFF8E5]',
      badgeBorder: 'border-[#FCCD37]/50'
    },
    {
      id: 'health-champions-network',
      number: '09',
      title: 'Community Health Champions Network',
      icon: <Users size={22} className="text-[#0047BA]" strokeWidth={2.3} />,
      desc: 'Training and stipending community volunteers, teachers, and faith leaders as certified first-line health surveillance, hygiene, and emergency first-aid responders.',
      target: 'Grassroots community volunteers and local youth leaders',
      outcome: 'Rapid outbreak detection, localized health tracking, and 100% referral accuracy to primary centers',
      accentBg: 'bg-[#EBF3FC]',
      badgeBorder: 'border-[#0047BA]/40'
    },
    {
      id: 'surgical-subsidy-specialist',
      number: '10',
      title: 'Specialist Surgical Subsidy & Tertiary Hospital Access',
      icon: <Stethoscope size={22} className="text-[#338C26]" strokeWidth={2.3} />,
      desc: 'Formal partnerships with university teaching hospitals to fully fund complex surgical operations, pediatric hernia repairs, and emergency trauma care for the indigent.',
      target: 'Critically ill patients unable to finance life-saving surgical and inpatient hospital procedures',
      outcome: 'Zero preventable deaths attributable to emergency inability to pay surgical admission deposits',
      accentBg: 'bg-[#EDF7EB]',
      badgeBorder: 'border-[#338C26]/40'
    }
  ];

  // 3-Phase Pathway Progression
  const pathwayPhases = [
    {
      phase: '01',
      title: 'PREVENT',
      subtitle: 'Community Health Education & Early Screening',
      color: 'bg-[#338C26] text-white',
      borderColor: 'border-[#338C26]',
      desc: 'We prioritize disease prevention through routine health education, maternal antenatal care, pediatric immunization, clean water access, and nutritional guidance.',
      items: [
        'Routine Antenatal Care & Mama Delivery Kits',
        'Pediatric Immunization & Malnutrition Screening',
        'Community Health Screenings & Hygiene Education'
      ]
    },
    {
      phase: '02',
      title: 'TREAT',
      subtitle: 'Clinical Outreaches & Primary Health Centers',
      color: 'bg-[#5B2E19] text-white',
      borderColor: 'border-[#5B2E19]',
      desc: 'Mobile doctor units deploy into remote communities, primary health clinics receive solar power and modern diagnostic tools, and essential medicines are subsidized.',
      items: [
        'Mobile Doctor Clinics in Agrarian Settlements',
        'PHC Solar Power & Cold-Chain Electrification',
        'Subsidized Chronic Disease Medicine Bank'
      ]
    },
    {
      phase: '03',
      title: 'RESTORE',
      subtitle: 'Specialist Surgery & Sustained Wellbeing',
      color: 'bg-[#0047BA] text-white',
      borderColor: 'border-[#0047BA]',
      desc: 'We sponsor transformative surgeries including cataract removal and pediatric interventions, while establishing long-term geriatric and mental health support.',
      items: [
        'Free Cataract Surgeries & Sight Restoration',
        'Tertiary Hospital Surgical Subsidy Endowments',
        'Geriatric Wellness & Psychosocial Care Circles'
      ]
    }
  ];

  // Key Impact Metrics
  const metrics = [
    { value: '85,000+', label: 'Rural Patients Consulted & Treated', sub: 'Free medical consultations, diagnostic testing & prescription drugs' },
    { value: '12,400+', label: 'Safe Deliveries & Maternal Kits', sub: 'Zero maternal deaths across monitored primary clinic births' },
    { value: '4,200+', label: 'Cataract Surgeries & Sight Restorations', sub: '100% free surgical sight restoration & post-op medication' },
    { value: '38', label: 'Primary Health Centers Solarized', sub: '24/7 continuous solar energy for maternity wards & cold-chains' }
  ];

  return (
    <div className="w-full bg-white space-y-12 sm:space-y-16 animate-fade-in pb-16 font-sans">
      
      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION                                            */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: '520px' }}>
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-[position:82%_center] bg-no-repeat"
          style={{ backgroundImage: `url('/images/pillar_health.jpg')` }}
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
                <div className="w-1 h-3.5 bg-[#338C26] rounded-full shrink-0" />
                <Link to="/" className="hover:text-[#5B2E19]/80 transition-colors">Home</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <Link to="/our-work" className="hover:text-[#5B2E19]/80 transition-colors">Our Work</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <span className="text-[#338C26] font-bold">Health & Wellbeing</span>
              </div>

              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF7EB] border border-[#338C26]/40 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#338C26]" />
                <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#338C26]">
                  STRATEGIC PILLAR 02 — PREVENT → TREAT → RESTORE
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.12] text-[#5B2E19]">
                Health & Wellbeing
              </h1>

              {/* Subtitle */}
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-medium">
                Elevating community healthcare, maternal & child nutrition, sight restoration, primary clinic solarization, and essential medicine access across Nigeria.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/donate"
                  className="flex items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full font-black text-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer bg-[#338C26] hover:bg-[#28721E] text-white shadow-md border border-[#338C26]"
                >
                  <Heart size={16} className="fill-white/30 stroke-white stroke-[2.5]" />
                  <span>Support Health & Wellbeing</span>
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
      {/* 2. THE CORE PATHWAY: PREVENT → TREAT → RESTORE             */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#EFE8DC] space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#338C26] rounded-full inline-block" />
                <span className="text-xs font-black uppercase tracking-widest text-[#5B2E19]">
                  THE PROGRAMMATIC LIFECYCLE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5B2E19] tracking-tight">
                Our Pathway: Prevent → Treat → Restore
              </h2>
              <p className="text-slate-600 text-sm max-w-2xl font-medium">
                Health is the bedrock of human dignity. Our clinical framework moves from community-wide preventive screening to decentralized treatment and tertiary surgical restoration.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#5B2E19] bg-white px-4 py-2 rounded-full border border-slate-200">
              <ShieldCheck size={16} className="text-[#338C26]" />
              <span>Evidence-Based Healthcare Model</span>
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
              <span className="w-1.5 h-5 bg-[#338C26] rounded-full inline-block" />
              <span className="text-xs font-black uppercase tracking-widest text-[#5B2E19]">
                FLAGSHIP PROGRAMMES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5B2E19] tracking-tight">
              10 Core Healthcare Initiatives
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-medium">
              Mandated by the CMAOF strategic charter to eliminate health disparities and protect vulnerable communities across Nigeria.
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
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#338C26] hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-11 h-11 rounded-xl ${item.accentBg} border ${item.badgeBorder} flex items-center justify-center shrink-0 shadow-2xs`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-black tracking-widest text-[#5B2E19]/40 group-hover:text-[#338C26] transition-colors">
                    FAMILY {item.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-[#5B2E19] text-lg group-hover:text-[#338C26] transition-colors">
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
                  <span>MEASURABLE CLINICAL IMPACT</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Health & Wellbeing in Numbers
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-normal">
                  Our medical outreaches, surgical interventions, and primary health centre investments are tracked with rigorous clinical accountability.
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
                src="/images/event_medical_doctor.jpg"
                alt="Dr. Babatunde examining an elder patient during a CMAOF rural medical mission"
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
                  <span>Verified CMAOF Free Medical Mission & Sight Restoration Beneficiary</span>
                </div>

                <h3 className="text-2xl font-extrabold text-[#5B2E19] leading-snug">
                  Restoring Sight, Health, and Dignity to Underserved Communities: Pa Johnson&apos;s Story
                </h3>

                <blockquote className="border-l-4 border-[#338C26] pl-4 italic text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  &ldquo;For three painful years, bilateral cataract blindness kept me trapped inside my home in Ilara-Mokin, unable to tend my cocoa farm or see my grandchildren. When the CMAOF medical team arrived, they operated on both my eyes and gave me medication without taking a single kobo. Today, I can see clearly and work again.&rdquo;
                </blockquote>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Pa Johnson, a 68-year-old cocoa farmer, was one of 450 beneficiaries who received sight-restoring surgery during the 2026 CMAOF Comprehensive Healthcare Mission. In addition to surgery, he receives free monthly blood pressure checks and medication through the Chronic Disease Medicine Bank.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
                <div className="p-3 bg-[#FAF6EE] rounded-xl">
                  <div className="text-lg font-black text-[#5B2E19]">100%</div>
                  <div className="text-[11px] font-semibold text-slate-600">Bilateral Sight Restored</div>
                </div>
                <div className="p-3 bg-[#FAF6EE] rounded-xl">
                  <div className="text-lg font-black text-[#338C26]">₦0</div>
                  <div className="text-[11px] font-semibold text-slate-600">Out-of-Pocket Patient Cost</div>
                </div>
                <div className="p-3 bg-[#FAF6EE] rounded-xl">
                  <div className="text-lg font-black text-[#0047BA]">3 Wks</div>
                  <div className="text-[11px] font-semibold text-slate-600">Return to Farming</div>
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
            <span className="text-xs font-black uppercase tracking-widest text-[#338C26] block">
              INVEST IN LIFESAVING HEALTHCARE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#5B2E19] tracking-tight">
              Heal a Patient. Protect an Entire Community.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              Every donation provisions essential medications, funds cataract surgeries, and powers rural primary health clinics with continuous solar energy.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/donate"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full font-black text-sm bg-[#338C26] hover:bg-[#28721E] text-white shadow-md hover:scale-[1.03] active:scale-95 transition-all cursor-pointer"
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

export default HealthPillar;
