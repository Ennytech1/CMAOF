import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const UnicefLogo = () => (
  <div className="flex items-center gap-1.5 select-none text-[#00ADEF]">
    <span className="text-2xl sm:text-3xl font-bold tracking-tighter lowercase font-sans">
      unicef
    </span>
    <svg className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 fill-current" viewBox="0 0 24 24">
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
      <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">BILL<span className="text-[8px] font-sans mx-0.5">&</span>MELINDA</span>
    </div>
    <span className="text-sm sm:text-base font-extrabold tracking-widest uppercase font-serif">
      GATES <span className="text-xs font-normal lowercase italic font-serif tracking-normal">foundation</span>
    </span>
  </div>
);

const MtnLogo = () => (
  <div className="bg-[#FFCC00] text-[#002B49] px-3.5 py-1.5 rounded-lg flex items-center justify-center shadow-xs select-none">
    <div className="border-2 border-[#002B49] rounded-full px-2 py-0.5 flex items-center justify-center">
      <span className="text-xs sm:text-sm font-black tracking-wider uppercase font-sans">
        MTN
      </span>
    </div>
  </div>
);

const UsaidLogo = () => (
  <div className="flex items-center gap-2 select-none">
    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#002B49] rounded flex items-center justify-center text-white shrink-0 p-1">
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#002B49" />
        <path d="M9 12l2 2 4-4" stroke="#BA0C2F" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="text-xs sm:text-sm font-black text-[#002B49] tracking-wider uppercase">USAID</span>
      <span className="text-[9px] font-medium text-slate-500 uppercase">From The American People</span>
    </div>
  </div>
);

const FordFoundationLogo = () => (
  <div className="flex flex-col text-left leading-none select-none text-[#0D1B2A]">
    <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase font-serif">FORD</span>
    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase font-serif text-slate-600">FOUNDATION</span>
  </div>
);

const partnersList = [
  { 
    id: 'nigerian-govt', 
    component: (
      <img 
        src="/images/nigriacostofarm.png" 
        alt="Federal Republic of Nigeria" 
        className="h-10 sm:h-12 max-w-[160px] object-contain"
      />
    ), 
    name: 'Federal Government of Nigeria' 
  },
  { id: 'unicef', component: <UnicefLogo />, name: 'UNICEF' },
  { 
    id: 'worldbank', 
    component: (
      <img 
        src="/images/worldbanklogo.png" 
        alt="The World Bank" 
        className="h-9 sm:h-11 max-w-[170px] object-contain"
      />
    ), 
    name: 'The World Bank' 
  },
  { id: 'gates', component: <GatesFoundationLogo />, name: 'Bill & Melinda Gates Foundation' },
  { 
    id: 'access', 
    component: (
      <img 
        src="/images/access.png" 
        alt="Access Bank" 
        className="h-8 sm:h-10 max-w-[140px] object-contain"
      />
    ), 
    name: 'Access Bank' 
  },
  { id: 'mtn', component: <MtnLogo />, name: 'MTN' },
  { 
    id: 'dangote', 
    component: (
      <img 
        src="/images/dangotelogo.png" 
        alt="Dangote Foundation" 
        className="h-9 sm:h-11 max-w-[160px] object-contain"
      />
    ), 
    name: 'Dangote Foundation' 
  },
  { id: 'usaid', component: <UsaidLogo />, name: 'USAID' },
  { id: 'ford', component: <FordFoundationLogo />, name: 'Ford Foundation' },
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
    const scrollAmount = 260;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-white border-y border-slate-200/70 py-3.5 sm:py-4.5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          
          {/* ── Left Title Block with Vertical Accent Line ── */}
          <div className="flex items-start gap-2.5 lg:w-[360px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-3 lg:pb-0 lg:pr-5">
            {/* Orange Vertical Line Accent */}
            <div className="w-1.5 h-11 sm:h-13 bg-[#EA580C] rounded-full shrink-0 mt-0.5" />
            
            <div className="space-y-0.5">
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#0F2B5B] block font-sans">
                OUR PARTNERS
              </span>
              <h3 className="text-lg sm:text-xl lg:text-[1.45rem] font-extrabold text-[#0F2B5B] tracking-tight leading-tight">
                Stronger Together
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-snug max-w-xs">
                We work with government agencies, development partners, corporates, NGOs and individuals to amplify our impact.
              </p>
            </div>
          </div>

          {/* ── Right Logos Carousel / Slider Block ── */}
          <div className="relative flex-1 flex items-center min-w-0">
            
            {/* Left Circular Arrow Nav Button */}
            <button
              onClick={() => handleScroll('left')}
              aria-label="Scroll left partners"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-[#0F4C3A] hover:border-slate-300 transition-all shrink-0 z-10 mr-2 sm:mr-3 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/20 cursor-pointer ${
                !canScrollLeft ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
              }`}
              disabled={!canScrollLeft}
            >
              <ChevronLeft size={20} strokeWidth={2.2} />
            </button>

            {/* Scrollable Logos Belt (Fully active, full color, crisp display) */}
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-8 sm:gap-10 md:gap-12 overflow-x-auto scrollbar-none py-2 px-1 scroll-smooth w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {partnersList.map((partner) => (
                <div
                  key={partner.id}
                  className="shrink-0 flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer py-1 px-1"
                  title={partner.name}
                >
                  {partner.component}
                </div>
              ))}
            </div>

            {/* Right Circular Arrow Nav Button */}
            <button
              onClick={() => handleScroll('right')}
              aria-label="Scroll right partners"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-[#0F4C3A] hover:border-slate-300 transition-all shrink-0 z-10 ml-2 sm:ml-3 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/20 cursor-pointer ${
                !canScrollRight ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
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
