import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Utensils,
  Droplets,
  HeartHandshake,
  Truck,
  Home,
  Accessibility,
  Users,
  Building2,
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowRight,
  Heart,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

const HumanitarianSupportPillar = ({ onOpenDonate }) => {
  useEffect(() => {
    document.title = 'Humanitarian Support | Chief Michael Ade.Ojo Foundation';
  }, []);

  // 10 Core Flagship Initiatives Mandated by R2
  const initiatives = [
    {
      id: 'food-security-relief',
      number: '01',
      title: 'Emergency Food Security & Nutritional Relief',
      icon: <Utensils size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Direct distribution of fortified food parcels, grains, cooking oil, and subsidized community nutrition kitchens during periods of severe macroeconomic inflation and crop shocks.',
      target: 'Indigent households, low-income widows, and child-headed families in acute vulnerability',
      outcome: 'Over 120,000 emergency family food parcels delivered, preventing acute nutritional deprivation',
      accentBg: 'bg-[#FFF8E5]',
      badgeBorder: 'border-[#FCCD37]/50'
    },
    {
      id: 'clean-water-sanitation',
      number: '02',
      title: 'Solar Clean Water Boreholes & WASH Infrastructure',
      icon: <Droplets size={22} className="text-[#0047BA]" strokeWidth={2.3} />,
      desc: 'Drilling industrial-depth solar-powered boreholes, erecting overhead storage tanks, water dispensing stations, and public hygienic sanitation blocks.',
      target: 'Rural communities and public schools suffering from chronic potable water scarcity',
      outcome: '75+ solar boreholes delivering potable WHO-standard drinking water to over 45,000 daily users',
      accentBg: 'bg-[#EBF3FC]',
      badgeBorder: 'border-[#0047BA]/40'
    },
    {
      id: 'elderly-social-care',
      number: '03',
      title: 'Elderly Dignity & Social Safety Care',
      icon: <HeartHandshake size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Dignified monthly welfare stipends, nutritious home food hampers, wellness check-ins, and emergency bedding/clothing for isolated rural senior citizens.',
      target: 'Elderly community members aged 70+ without family safety nets or pensions',
      outcome: 'Over 6,500 seniors provided reliable monthly dignity stipends and dedicated care visits',
      accentBg: 'bg-[#FAF6EE]',
      badgeBorder: 'border-[#5B2E19]/30'
    },
    {
      id: 'disaster-response-rebuilding',
      number: '04',
      title: 'Disaster Response & Rapid Crisis Recovery',
      icon: <Truck size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Rapid relief logistics delivering tarpaulins, roofing sheets, clean water, blankets, and essential household kits following flood, fire, or localized windstorm disasters.',
      target: 'Displaced and crisis-affected households across Southwest and North-Central regions',
      outcome: 'Emergency relief deployment guaranteed within 48 hours of certified community crisis',
      accentBg: 'bg-[#FAF6EE]',
      badgeBorder: 'border-[#5B2E19]/30'
    },
    {
      id: 'household-resilience-grants',
      number: '05',
      title: 'Vulnerable Household Resilience Grants',
      icon: <Home size={22} className="text-[#338C26]" strokeWidth={2.3} />,
      desc: 'Direct emergency cash grants targeted at stabilizing vulnerable families facing extreme eviction threats, acute illness shocks, or household breadwinner loss.',
      target: 'Destitute families, female-headed homes, and orphan caregivers',
      outcome: '100% transparent direct electronic disbursement, preventing catastrophic household destitution',
      accentBg: 'bg-[#EDF7EB]',
      badgeBorder: 'border-[#338C26]/40'
    },
    {
      id: 'disability-inclusion-mobility',
      number: '06',
      title: 'Disability Inclusion & Assistive Mobility',
      icon: <Accessibility size={22} className="text-[#0047BA]" strokeWidth={2.3} />,
      desc: 'Procuring and distributing robust all-terrain wheelchairs, motorized tricycles, braille teaching aids, hearing aids, and installing civic accessibility ramps.',
      target: 'Persons with physical, visual, and auditory disabilities in underserved localities',
      outcome: 'Over 2,200 individuals equipped with assistive mobility devices, restoring physical independence',
      accentBg: 'bg-[#EBF3FC]',
      badgeBorder: 'border-[#0047BA]/40'
    },
    {
      id: 'volunteer-action-corps',
      number: '07',
      title: 'Community Youth Volunteer Action Corps',
      icon: <Users size={22} className="text-[#338C26]" strokeWidth={2.3} />,
      desc: 'Recruiting, training, and equipping youth volunteers for environmental sanitation, drainage clearing, community disaster mitigation, and humanitarian distributions.',
      target: 'Civically minded young people and university student volunteers',
      outcome: 'A rapid-deployment corps of 1,500+ active youth responders mobilized across Ondo State',
      accentBg: 'bg-[#EDF7EB]',
      badgeBorder: 'border-[#338C26]/40'
    },
    {
      id: 'civic-facility-rehabilitation',
      number: '08',
      title: 'Civic Space & Community Facility Rehabilitation',
      icon: <Building2 size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Restoring damaged town halls, village squares, artisanal market sheds, and community meeting venues that serve as the anchor of grassroots social cohesion.',
      target: 'Community associations, traditional councils, and rural village assemblies',
      outcome: 'Modernized, safe, and weatherproof social venues returned to full community operation',
      accentBg: 'bg-[#FAF6EE]',
      badgeBorder: 'border-[#5B2E19]/30'
    },
    {
      id: 'crisis-referral-hub',
      number: '09',
      title: 'Walk-In Crisis Support & Family Referral Hub',
      icon: <ShieldCheck size={22} className="text-[#5B2E19]" strokeWidth={2.3} />,
      desc: 'Operating welcoming walk-in assistance desks offering emergency crisis guidance, trauma-informed mediation, and linkages to specialized legal or healthcare aid.',
      target: 'Families in acute distress, survivors of domestic hardship, and vulnerable walk-in clients',
      outcome: 'Compassionate same-day intake and structured resolution pathways for 100% of cases',
      accentBg: 'bg-[#FFF8E5]',
      badgeBorder: 'border-[#FCCD37]/50'
    },
    {
      id: 'social-protection-safety-nets',
      number: '10',
      title: 'Grassroots Social Protection & Chieftaincy Safety Nets',
      icon: <Award size={22} className="text-[#338C26]" strokeWidth={2.3} />,
      desc: 'Institutionalizing traditional and faith-based community safety nets by matching community emergency funds and formalizing local emergency welfare councils.',
      target: 'Traditional rulers, town development unions, and community faith councils',
      outcome: 'Sustainable, culturally rooted emergency welfare safety nets co-funded by community leaders',
      accentBg: 'bg-[#EDF7EB]',
      badgeBorder: 'border-[#338C26]/40'
    }
  ];

  // 3-Phase Pathway Progression
  const pathwayPhases = [
    {
      phase: '01',
      title: 'RELIEVE',
      subtitle: 'Immediate Crisis Mitigation & Basic Survival',
      color: 'bg-[#5B2E19] text-[#FCCD37]',
      borderColor: 'border-[#5B2E19]',
      desc: 'We provide immediate life-preserving intervention: emergency food relief, disaster survival kits, emergency cash transfers, and temporary shelter repairs.',
      items: [
        'Emergency Food Rations & Community Kitchens',
        'Disaster Relief Mobilized Within 48 Hours',
        'Vulnerable Household Emergency Cash Grants'
      ]
    },
    {
      phase: '02',
      title: 'REBUILD',
      subtitle: 'WASH Infrastructure & Civic Restoration',
      color: 'bg-[#0047BA] text-white',
      borderColor: 'border-[#0047BA]',
      desc: 'We construct durable infrastructure including solar-powered water boreholes, sanitation blocks, and rehabilitated civic town halls to rebuild community life.',
      items: [
        'Solar Deep Boreholes & Clean Water Kiosks',
        'Hygienic Sanitation Facilities (WASH)',
        'Town Hall & Civic Center Restorations'
      ]
    },
    {
      phase: '03',
      title: 'SUSTAIN',
      subtitle: 'Long-Term Resilience & Social Safety Nets',
      color: 'bg-[#338C26] text-white',
      borderColor: 'border-[#338C26]',
      desc: 'We establish community-owned maintenance committees, monthly elderly dignity stipends, disability mobility access, and trained youth volunteer corps.',
      items: [
        'Monthly Elderly Dignity Safety-Net Stipends',
        'Assistive Devices for Persons with Disabilities',
        'Community Youth Volunteer Action Corps'
      ]
    }
  ];

  // Key Impact Metrics
  const metrics = [
    { value: '120,000+', label: 'Emergency Food Parcels Delivered', sub: 'Nutritional sustenance for vulnerable families during inflation shocks' },
    { value: '75+', label: 'Solar Boreholes & WASH Stations', sub: 'Clean WHO-standard drinking water for over 45,000 daily residents' },
    { value: '6,500+', label: 'Elderly Citizens Receiving Monthly Care', sub: 'Dignity stipends, healthcare visits & nutritional hampers' },
    { value: '2,200+', label: 'Assistive Mobility Devices Distributed', sub: 'All-terrain wheelchairs, tricycles & hearing aids' }
  ];

  return (
    <div className="w-full bg-white space-y-12 sm:space-y-16 animate-fade-in pb-16 font-sans">
      
      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. HERO SECTION                                            */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: '520px' }}>
        <div
          className="absolute inset-0 bg-cover bg-right sm:bg-[position:82%_center] bg-no-repeat"
          style={{ backgroundImage: `url('/images/pillar_community.jpg')` }}
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
                <div className="w-1 h-3.5 bg-[#5B2E19] rounded-full shrink-0" />
                <Link to="/" className="hover:text-[#5B2E19]/80 transition-colors">Home</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <Link to="/our-work" className="hover:text-[#5B2E19]/80 transition-colors">Our Work</Link>
                <ChevronRight size={14} className="text-slate-400" />
                <span className="text-[#5B2E19] font-bold">Humanitarian Support</span>
              </div>

              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8E5] border border-[#FCCD37]/50 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#5B2E19]" />
                <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#5B2E19]">
                  STRATEGIC PILLAR 03 — RELIEVE → REBUILD → SUSTAIN
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.12] text-[#5B2E19]">
                Humanitarian Support
              </h1>

              {/* Subtitle */}
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-medium">
                Delivering compassionate emergency relief, solar-powered clean water boreholes, nutritional food security, dignified elderly care, and durable community resilience across Nigeria.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/donate"
                  className="flex items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full font-black text-sm transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer bg-[#5B2E19] hover:bg-[#3D1E10] text-[#FCCD37] shadow-md border border-[#5B2E19]"
                >
                  <Heart size={16} className="fill-[#FCCD37]/30 stroke-[#FCCD37] stroke-[2.5]" />
                  <span>Support Humanitarian Relief</span>
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
      {/* 2. THE CORE PATHWAY: RELIEVE → REBUILD → SUSTAIN           */}
      {/* ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#EFE8DC] space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#5B2E19] rounded-full inline-block" />
                <span className="text-xs font-black uppercase tracking-widest text-[#5B2E19]">
                  THE PROGRAMMATIC LIFECYCLE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5B2E19] tracking-tight">
                Our Pathway: Relieve → Rebuild → Sustain
              </h2>
              <p className="text-slate-600 text-sm max-w-2xl font-medium">
                Compassion must translate into durable resilience. Our three-stage approach transitions vulnerable populations from immediate survival relief to permanent civic infrastructure and safety nets.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#5B2E19] bg-white px-4 py-2 rounded-full border border-slate-200">
              <ShieldCheck size={16} className="text-[#338C26]" />
              <span>Evidence-Based Humanitarian Model</span>
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
              <span className="w-1.5 h-5 bg-[#5B2E19] rounded-full inline-block" />
              <span className="text-xs font-black uppercase tracking-widest text-[#5B2E19]">
                FLAGSHIP PROGRAMMES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5B2E19] tracking-tight">
              10 Core Humanitarian Initiatives
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-medium">
              Mandated by the CMAOF strategic charter to alleviate acute suffering, restore clean water, and safeguard human dignity across vulnerable communities.
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
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#5B2E19] hover:shadow-lg transition-all flex flex-col justify-between group"
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
          <div
            className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/5 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#FCCD37]">
                  <Award size={14} />
                  <span>MEASURABLE HUMANITARIAN RELIEF</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Humanitarian Support in Numbers
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-normal">
                  Our emergency relief dispatches, clean water boreholes, and social safety interventions are meticulously audited for immediate impact.
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
                src="/images/story_adeyemi.jpg"
                alt="Chief B. Adeyemi celebrating the clean solar borehole water station in his community"
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
                  <span>Verified Community Leader & CMAOF Clean Water Committee Chair</span>
                </div>

                <h3 className="text-2xl font-extrabold text-[#5B2E19] leading-snug">
                  Ending Decades of Water Scarcity: Chief Adeyemi&apos;s Community Testimony
                </h3>

                <blockquote className="border-l-4 border-[#FCCD37] pl-4 italic text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  &ldquo;Before CMAOF installed our solar-powered deep borehole, our women and children walked four miles each morning before dawn to fetch brown stream water. Waterborne typhoid was common. Today, clean drinkable water flows right at the heart of our community, completely transforming our health and daily life.&rdquo;
                </blockquote>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Chief Adeyemi mobilized council elders to form a community water maintenance trust. Powered by industrial-grade solar pumps and overhead storage, the borehole produces over 30,000 liters of potable water daily for three adjoining villages at zero cost to residents.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
                <div className="p-3 bg-[#FAF6EE] rounded-xl">
                  <div className="text-lg font-black text-[#5B2E19]">4,500</div>
                  <div className="text-[11px] font-semibold text-slate-600">Villagers Granted Potable Water</div>
                </div>
                <div className="p-3 bg-[#FAF6EE] rounded-xl">
                  <div className="text-lg font-black text-[#338C26]">0 Miles</div>
                  <div className="text-[11px] font-semibold text-slate-600">Water Hauling Distance</div>
                </div>
                <div className="p-3 bg-[#FAF6EE] rounded-xl">
                  <div className="text-lg font-black text-[#0047BA]">85%</div>
                  <div className="text-[11px] font-semibold text-slate-600">Reduction in Typhoid</div>
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
              STAND WITH VULNERABLE COMMUNITIES
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#5B2E19] tracking-tight">
              Provide Urgent Relief Today. Build Enduring Resilience for Tomorrow.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              Your humanitarian contribution directly provisions solar boreholes, emergency food hampers, and mobility aids for Nigeria&apos;s most vulnerable citizens.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/donate"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full font-black text-sm bg-[#5B2E19] hover:bg-[#3D1E10] text-[#FCCD37] shadow-md hover:scale-[1.03] active:scale-95 transition-all cursor-pointer"
            >
              <Heart size={16} className="fill-[#FCCD37]/30 stroke-[#FCCD37] stroke-[2.5]" />
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

export default HumanitarianSupportPillar;
