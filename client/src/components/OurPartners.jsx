import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PartnerCoBranding from './PartnerCoBranding';

// ── Official Partner SVG / Typography Components ──
const UnicefLogo = () => (
  <div className="flex items-center gap-1.5 select-none text-[#00ADEF]">
    <span className="text-xl sm:text-2xl font-bold tracking-tighter lowercase font-sans">
      unicef
    </span>
    <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2A10 10 0 1022 12 10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" opacity="0.3" />
      <circle cx="12" cy="8" r="2.5" />
      <path d="M12 11.5c-2.5 0-4.5 1.5-4.5 3.5v1h9v-1c0-2-2-3.5-4.5-3.5z" />
      <path d="M7 11.5c-1.5 0-2.5 1-2.5 2v1h2v-1c0-.6.5-1.2 1.2-1.5z" opacity="0.7" />
      <path d="M17 11.5c1.5 0 2.5 1 2.5 2v1h-2v-1c0-.6-.5-1.2-1.2-1.5z" opacity="0.7" />
    </svg>
  </div>
);

const GatesFoundationLogo = () => (
  <div className="flex flex-col text-left leading-none select-none text-[#7A0026]">
    <div className="flex items-center gap-1 font-serif">
      <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase">
        BILL<span className="text-[7px] font-sans mx-0.5">&</span>MELINDA
      </span>
    </div>
    <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase font-serif">
      GATES <span className="text-[10px] font-normal lowercase italic font-serif tracking-normal">foundation</span>
    </span>
  </div>
);

const MtnLogo = () => (
  <div className="bg-[#FFCC00] text-[#002B49] px-3 py-1 rounded-md flex items-center justify-center shadow-xs select-none">
    <div className="border border-[#002B49] rounded-full px-1.5 py-0.5 flex items-center justify-center">
      <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase font-sans">
        MTN
      </span>
    </div>
  </div>
);

const UsaidLogo = () => (
  <div className="flex items-center gap-1.5 select-none">
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#002B49] rounded flex items-center justify-center text-white shrink-0 p-0.5">
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#002B49" />
        <path d="M9 12l2 2 4-4" stroke="#BA0C2F" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="text-[11px] sm:text-xs font-black text-[#002B49] tracking-wider uppercase">USAID</span>
      <span className="text-[8px] font-medium text-slate-500 uppercase tracking-tighter">American People</span>
    </div>
  </div>
);

const FordFoundationLogo = () => (
  <div className="flex flex-col text-left leading-none select-none text-[#0D1B2A]">
    <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase font-serif">FORD</span>
    <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase font-serif text-slate-600">FOUNDATION</span>
  </div>
);

// ── Strategic Partners Dataset with Co-Branding Metadata ──
const strategicPartners = [
  {
    id: 'access',
    name: 'Access Bank',
    logo: '/images/access.png',
    link: 'https://www.accessbankplc.com',
    pillar: 'Economic Empowerment',
    focus: 'SME Micro-Grants & Financial Literacy',
  },
  {
    id: 'dangote',
    name: 'Dangote Foundation',
    logo: '/images/dangotelogo.png',
    link: 'https://dangote.com/foundation',
    pillar: 'Humanitarian Support',
    focus: 'Community Relief & Nutrition Security',
  },
  {
    id: 'worldbank',
    name: 'The World Bank',
    logo: '/images/worldbanklogo.png',
    link: 'https://www.worldbank.org',
    pillar: 'Education & Opportunity',
    focus: 'Basic Education & Rural Infrastructure',
  },
  {
    id: 'nigerian-govt',
    name: 'Federal Government of Nigeria',
    logo: '/images/nigriacostofarm.png',
    link: 'https://statehouse.gov.ng',
    pillar: 'Institutional Partnership',
    focus: 'Public Healthcare & Accreditation',
  },
  {
    id: 'unicef',
    name: 'UNICEF',
    logo: <UnicefLogo />,
    link: 'https://www.unicef.org',
    pillar: 'Health & Wellbeing',
    focus: 'Maternal Care & Child Immunization',
  },
  {
    id: 'gates',
    name: 'Bill & Melinda Gates Foundation',
    logo: <GatesFoundationLogo />,
    link: 'https://www.gatesfoundation.org',
    pillar: 'Health & Wellbeing',
    focus: 'Epidemic Prevention & Rural Clinics',
  },
  {
    id: 'mtn',
    name: 'MTN Foundation',
    logo: <MtnLogo />,
    link: 'https://www.mtn.ng/foundation',
    pillar: 'Education & Opportunity',
    focus: 'Digital Literacy & STEM Laboratories',
  },
  {
    id: 'usaid',
    name: 'USAID',
    logo: <UsaidLogo />,
    link: 'https://www.usaid.gov',
    pillar: 'Humanitarian Support',
    focus: 'Disaster Resilience & Community Wells',
  },
  {
    id: 'ford',
    name: 'Ford Foundation',
    logo: <FordFoundationLogo />,
    link: 'https://www.fordfoundation.org',
    pillar: 'Economic Empowerment',
    focus: 'Youth Vocational Training & Civic Equity',
  },
];

const OurPartners = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 320;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section 
      aria-labelledby="partners-section-heading"
      className="bg-white border-y border-slate-200/70 py-4 sm:py-5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          
          {/* ── Left Title Block with Official CMAOF Sun Yellow Accent Line ── */}
          <div className="flex items-start gap-2.5 lg:w-[360px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-3 lg:pb-0 lg:pr-5">
            {/* Official Sun Yellow Vertical Line Accent */}
            <div className="w-1.5 h-11 sm:h-13 bg-cmao-sun-yellow rounded-full shrink-0 mt-0.5 shadow-2xs" />
            
            <div className="space-y-0.5">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-cmao-earth-brown block font-primary">
                STRATEGIC CO-BRANDING
              </span>
              <h3 
                id="partners-section-heading"
                className="text-lg sm:text-xl lg:text-[1.35rem] font-extrabold text-cmao-earth-brown tracking-tight leading-tight font-primary"
              >
                Stronger Together
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-snug max-w-xs font-secondary">
                We work with government agencies, development partners, corporates, and global foundations to amplify sustainable impact.
              </p>
            </div>
          </div>

          {/* ── Right Logos Carousel / Slider Block with Co-Branding Cards ── */}
          <div className="relative flex-1 flex items-center min-w-0">
            
            {/* Left Circular Arrow Nav Button */}
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Scroll to previous partners"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:text-cmao-earth-brown hover:border-cmao-earth-brown/40 transition-all shrink-0 z-10 mr-2 sm:mr-3 focus:outline-none focus:ring-2 focus:ring-cmao-earth-brown/20 cursor-pointer ${
                !canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
              }`}
              disabled={!canScrollLeft}
            >
              <ChevronLeft size={20} strokeWidth={2.2} />
            </button>

            {/* Scrollable Co-Branding Belt */}
            <div
              ref={scrollContainerRef}
              tabIndex={0}
              aria-label="Co-branded institutional partners carousel"
              className="flex items-center gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-none py-2 px-1 scroll-smooth w-full focus:outline-none focus:ring-1 focus:ring-cmao-sun-yellow/40 rounded-xl"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {strategicPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="shrink-0 flex items-center justify-center bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-[#5B2E19]/30 rounded-2xl px-5 py-2.5 sm:px-6 sm:py-3 transition-all duration-200 shadow-xs hover:shadow-md min-w-[135px] sm:min-w-[160px] h-[62px] sm:h-[70px] group cursor-pointer"
                >
                  <PartnerCoBranding
                    partnerLogo={partner.logo}
                    partnerName={partner.name}
                    partnerLink={partner.link}
                    height={46}
                    variant="light"
                    showCmaofLogo={false}
                  />
                </div>
              ))}
            </div>

            {/* Right Circular Arrow Nav Button */}
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Scroll to next partners"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:text-cmao-earth-brown hover:border-cmao-earth-brown/40 transition-all shrink-0 z-10 ml-2 sm:ml-3 focus:outline-none focus:ring-2 focus:ring-cmao-earth-brown/20 cursor-pointer ${
                !canScrollRight ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
              }`}
              disabled={!canScrollRight}
            >
              <ChevronRight size={20} strokeWidth={2.2} />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default OurPartners;
