import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Building2, 
  Factory, 
  Heart, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Maximize2, 
  ShieldCheck, 
  Compass, 
  BookOpen, 
  Landmark, 
  ExternalLink,
  ArrowUp
} from 'lucide-react';
import { founderGallery, founderImages } from '../assets/founderImages';

const FounderProfilePage = ({ onOpenDonate }) => {
  const [activeSection, setActiveSection] = useState('early-life');
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const galleryThumbnailsRef = useRef(null);

  // Chapters list for in-page navigation
  const chapters = [
    { id: 'overview', title: 'Executive Summary', icon: BookOpen },
    { id: 'early-life', title: 'Early Life & Formation', icon: BookOpen },
    { id: 'business-enterprise', title: 'Enduring Enterprise', icon: Building2 },
    { id: 'national-capacity', title: 'National Capacity & Industry', icon: Factory },
    { id: 'education', title: 'Education & Elizade University', icon: GraduationCap },
    { id: 'community', title: 'Transforming Communities', icon: MapPin },
    { id: 'culture-honours', title: 'Culture & Chieftaincy Honours', icon: Landmark },
    { id: 'personal-legacy', title: 'Partnership & Family Tribute', icon: Heart },
    { id: 'foundation-evolution', title: 'The CMAO Foundation Evolution', icon: Landmark },
    { id: 'photo-archive', title: 'Archival Gallery', icon: Users },
  ];

  // Scroll listener for back to top and active chapter highlighting
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Detect active chapter based on scroll position
      const scrollPos = window.scrollY + 200;
      for (const chapter of chapters) {
        const el = document.getElementById(chapter.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(chapter.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for image lightbox
  useEffect(() => {
    if (selectedPhotoIdx !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setSelectedPhotoIdx(null);
        } else if (e.key === 'ArrowRight') {
          setSelectedPhotoIdx((prev) => (prev + 1) % founderGallery.length);
        } else if (e.key === 'ArrowLeft') {
          setSelectedPhotoIdx((prev) => (prev - 1 + founderGallery.length) % founderGallery.length);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedPhotoIdx]);

  const scrollToChapter = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#0F4C3A] selection:text-white pt-[72px]">
      
      {/* ── 1. Clean, Prestigious Executive Hero Banner ── */}
      <section className="relative bg-gradient-to-b from-white via-slate-50/80 to-slate-100/60 overflow-hidden py-5 sm:py-6 lg:py-8 border-b border-slate-200/80">
        
        {/* Subtle executive background accents */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#0F4C3A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-[#EA580C]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0F4C3A_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2.5">
            <Link to="/" className="hover:text-[#0F4C3A] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link to="/about" className="hover:text-[#0F4C3A] transition-colors">About Us</Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#0F2B5B] font-bold">Founder's Profile</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left: Official Portrait in Prestigious Executive Frame */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group max-w-[260px] sm:max-w-[290px] w-full">
                
                {/* Clean Frame with Soft Shadow */}
                <div className="relative bg-white p-2 rounded-2xl shadow-lg border border-slate-200/90 group-hover:shadow-xl transition-all duration-300">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/4.8] bg-slate-100">
                    <img 
                      src={founderImages.founder1} 
                      alt="Chief Michael Ade. Ojo, OON" 
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                    />
                    
                  </div>
                </div>

                {/* Birthplace & Heritage Metadata */}
                <div className="mt-2 flex items-center justify-between px-1 text-[11px] font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={13} className="text-[#EA580C]" />
                    Ilara-Mokin, Ondo State
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={13} className="text-[#0F4C3A]" />
                    Born 14 June 1938
                  </span>
                </div>

              </div>
            </div>

            {/* Right: Titles, Subtitle & Executive Core Text */}
            <div className="lg:col-span-8 space-y-2.5">

              {/* Main Name & Title */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F2B5B] tracking-tight leading-tight">
                  CHIEF MICHAEL ADE. OJO, <span className="text-[#EA580C]">OON</span>
                </h1>
                <p className="text-base sm:text-lg font-bold text-[#0F4C3A] tracking-tight leading-snug">
                  Entrepreneurship, Education and a Legacy of Community Development
                </p>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#EA580C]">
                  A Life of Enterprise and Service
                </p>
              </div>

              {/* Opening Summary Paragraph */}
              <p className="text-slate-700 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-normal">
                Chief Michael Ade. Ojo, OON, is a Nigerian entrepreneur whose career spans business development, education, investment and community advancement. From the establishment of Elizade Independent Agencies in 1971 to sustained investments in institutions and local infrastructure, his story reflects a long-standing commitment to creating opportunities beyond the boundaries of commercial enterprise. His record of giving and community development provides important context for the values associated with the Chief Michael Ade. Ojo Foundation.
              </p>

              {/* Quick Metrics Bar in Clean Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-0.5">
                <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-xs hover:shadow-sm transition-shadow">
                  <div className="text-lg sm:text-xl font-black text-[#0F2B5B]">1971</div>
                  <div className="text-[10px] font-bold text-slate-600 mt-0.5 leading-tight">Co-founded Elizade</div>
                </div>
                <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-xs hover:shadow-sm transition-shadow">
                  <div className="text-lg sm:text-xl font-black text-[#0F4C3A]">US$50M+</div>
                  <div className="text-[10px] font-bold text-slate-600 mt-0.5 leading-tight">Assembly Plant</div>
                </div>
                <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-xs hover:shadow-sm transition-shadow">
                  <div className="text-lg sm:text-xl font-black text-[#0F2B5B]">31 Progs</div>
                  <div className="text-[10px] font-bold text-slate-600 mt-0.5 leading-tight">Elizade University</div>
                </div>
                <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-200/90 shadow-xs hover:shadow-sm transition-shadow">
                  <div className="text-lg sm:text-xl font-black text-[#EA580C]">2021</div>
                  <div className="text-[10px] font-bold text-slate-600 mt-0.5 leading-tight">CMAO Foundation</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => scrollToChapter('early-life')}
                  className="bg-[#0F4C3A] hover:bg-[#14634C] text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full inline-flex items-center gap-1.5 shadow-sm hover:shadow transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Read Full Life Journey</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPhotoIdx(0)}
                  className="bg-white hover:bg-slate-50 text-[#0F2B5B] border border-slate-300 hover:border-[#0F4C3A] font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-full inline-flex items-center gap-1.5 shadow-xs transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Users size={15} className="text-[#0F4C3A]" />
                  <span>View Archival Photos</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 2. Sticky Quick Navigation Bar ── */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar scroll-smooth">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden md:inline">
              Chapters:
            </span>
            {chapters.map((ch) => {
              const Icon = ch.icon;
              const isActive = activeSection === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => scrollToChapter(ch.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#0F4C3A] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <Icon size={12} className={isActive ? 'text-amber-300' : 'text-slate-500'} />
                  <span>{ch.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 3. Main Profile Content Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Left Sidebar (Sticky Quick Summary Card) ── */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="sticky top-[125px] space-y-4">
              
              {/* Profile Card Summary */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3.5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F4C3A] flex items-center justify-center shrink-0 font-black text-xs">
                    CMA
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-tight">
                      Chief Michael Ade. Ojo
                    </h3>
                    <p className="text-[11px] font-bold text-[#EA580C]">
                      OON, FCIB, FNIM
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-400 block uppercase tracking-wider text-[9.5px]">Date & Place of Birth</span>
                    <span className="font-semibold text-slate-800">14 June 1938 • Ilara-Mokin, Ondo State</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block uppercase tracking-wider text-[9.5px]">Royal Lineage</span>
                    <span className="font-semibold text-slate-800">Lamilohun Lisa Chieftaincy House, Ilara-Mokin</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block uppercase tracking-wider text-[9.5px]">Parents</span>
                    <span className="font-semibold text-slate-800">Chief Solomon Ojo & Chief (Mrs.) Beatrice Ademolawe Ojo</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block uppercase tracking-wider text-[9.5px]">Alma Mater</span>
                    <span className="font-semibold text-slate-800">University of Nigeria, Nsukka (UNN) — Class of 1965</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block uppercase tracking-wider text-[9.5px]">Flagship Commercial Enterprise</span>
                    <span className="font-semibold text-slate-800">Elizade Nigeria Limited (Co-founded Aug 1971)</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block uppercase tracking-wider text-[9.5px]">Academic Foundation</span>
                    <span className="font-semibold text-slate-800">Founder, Elizade University, Ilara-Mokin (est. 2012)</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block uppercase tracking-wider text-[9.5px]">Philanthropic Institution</span>
                    <span className="font-semibold text-[#0F4C3A]">Chief Michael Ade. Ojo Foundation (CMAOF)</span>
                  </div>
                </div>

                {/* Chieftaincy Titles Box */}
                <div className="pt-2.5 border-t border-slate-100">
                  <span className="font-bold text-slate-400 block uppercase tracking-wider text-[9.5px] mb-1.5">
                    Traditional & Chieftaincy Honours
                  </span>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#0F4C3A] font-bold text-[10.5px] border border-emerald-100">
                      Aare Ataiyese of Ilara-Mokin
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold text-[10.5px] border border-amber-200">
                      Asiwaju of Imesi-Ile
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-bold text-[10.5px] border border-blue-200">
                      Baaloro of the Source in Ile-Ife
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 font-bold text-[10.5px] border border-purple-200">
                      Fiwagboye of Alade-Idanre
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={onOpenDonate}
                    className="w-full bg-[#0F4C3A] hover:bg-[#14634C] text-white text-xs font-bold py-2 px-3 rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Heart size={13} className="fill-white" />
                    <span>Support the Founder's Mission</span>
                  </button>
                </div>
              </div>

              {/* Founder Direct Quote Card */}
              <div className="bg-white border border-emerald-100 rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden">
                <div className="text-3xl text-[#0F4C3A] font-serif leading-none opacity-20">“</div>
                <p className="text-xs sm:text-[13px] font-semibold leading-relaxed italic text-slate-700 relative z-10 -mt-1.5">
                  Enterprise is not merely about commercial reward; its highest virtue lies in creating sustainable opportunities, educating minds, building infrastructure, and improving the lot of the vulnerable.
                </p>
                <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] font-extrabold text-[#0F4C3A]">
                  Guiding Philosophy of CMAOF
                </div>
              </div>

            </div>
          </aside>

          {/* ── Right Content: Full Narrative Chapters ── */}
          <main className="lg:col-span-8 space-y-4 sm:space-y-5">
            
            {/* ── CHAPTER 0: Executive Overview ── */}
            <section id="overview" className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-wider text-[#0F4C3A]">
                  EXECUTIVE SUMMARY
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                A Life of Enterprise and Service
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-2 text-xs sm:text-sm font-normal">
                <p>
                  <strong>Chief Michael Ade. Ojo, OON</strong>, is a Nigerian entrepreneur whose career spans business development, education, investment and community advancement. 
                </p>
                <p>
                  From the establishment of Elizade Independent Agencies in 1971 to sustained investments in institutions and local infrastructure, his story reflects a long-standing commitment to creating opportunities beyond the boundaries of commercial enterprise. 
                </p>
                <p>
                  His record of giving and community development provides important context for the values associated with the Chief Michael Ade. Ojo Foundation.
                </p>
              </div>
            </section>

            {/* ── CHAPTER 1: Early Life and Educational Formation ── */}
            <section id="early-life" className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0F4C3A]">
                    CHAPTER I
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">1938 — 1965</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Early Life and Educational Formation
              </h2>

              <div className="text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
                <p>
                  Born on <strong>14 June 1938 in Ilara-Mokin, Ondo State</strong>, Chief Ade. Ojo is the son of <strong>Chief Solomon Ojo</strong> of the Lamilohun Lisa Chieftaincy House and <strong>Chief (Mrs.) Beatrice Ademolawe Ojo</strong>.
                </p>
                <p>
                  He attended <strong>St. Michael’s Anglican School, Ilara-Mokin</strong>, and <strong>Imade College, Owo</strong>, under the visionary leadership of the late Pa Adekunle Ajasin, completing his studies there in 1958.
                </p>
                <p>
                  He subsequently studied at the <strong>School of Agriculture, Akure</strong>, and worked briefly as a Laboratory Technician at the Ministry of Agriculture, Moore Plantation, Ibadan.
                </p>
                <p>
                  In 1961, he entered the prestigious <strong>University of Nigeria, Nsukka (UNN)</strong>, graduating in June 1965 with a <strong>Second-Class Upper degree in Business Administration</strong>.
                </p>
                <p>
                  He later participated in executive development programmes at <strong>Lagos Business School (LBS)</strong> and an <strong>IESE/LBS seminar in Barcelona, Spain</strong>.
                </p>
              </div>

              {/* Highlight milestones grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-black text-[#0F4C3A] text-xs uppercase tracking-wide">1938</div>
                  <div className="font-bold text-slate-800 text-xs mt-1">Birth in Ilara-Mokin</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Lamilohun Lisa Chieftaincy House</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-black text-[#0F4C3A] text-xs uppercase tracking-wide">1958</div>
                  <div className="font-bold text-slate-800 text-xs mt-1">Imade College, Owo</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Mentored by Pa Adekunle Ajasin</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-black text-[#0F4C3A] text-xs uppercase tracking-wide">1965</div>
                  <div className="font-bold text-slate-800 text-xs mt-1">UNN Business Admin</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Second-Class Upper Honors</div>
                </div>
              </div>
            </section>

            {/* ── CHAPTER 2: Building an Enduring Business Enterprise ── */}
            <section id="business-enterprise" className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0F4C3A]">
                    CHAPTER II
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">1971 — Present</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Building an Enduring Business Enterprise
              </h2>

              <div className="text-slate-700 leading-relaxed space-y-3 text-xs sm:text-sm">
                <p>
                  After graduation, Chief Ade. Ojo worked with <strong>CFAO</strong>, the <strong>Federal Inland Revenue Service (FIRS)</strong>, and <strong>British Petroleum Nigeria Limited</strong>, where his exceptional drive led to recognition as the company’s <em>Best Sales Representative</em>.
                </p>
                <p>
                  In <strong>August 1971</strong>, he and his late wife, <strong>Chief (Mrs.) Elizabeth Wuraola Ojo</strong>, co-founded <strong>Elizade Independent Agencies</strong>, which was later incorporated as <strong>Elizade Nigeria Limited</strong> in 1973, specialising in vehicle sales, spare parts and service.
                </p>
                <p>
                  Beginning with one support staff member, the enterprise expanded into an influential group of businesses including <strong>Toyota Nigeria Limited</strong>, <strong>Elizade JAC Autoland</strong>, <strong>Odua Creations</strong>, <strong>Mikeade Property Development Company</strong>, <strong>Mikeade Investment Company</strong>, and <strong>SMT Nigeria Limited</strong>.
                </p>
                <p>
                  He has also served in chairmanship and directorship roles across leading financial services, energy and hospitality organisations including <strong>Custodian and Allied Plc</strong>, <strong>Ecobank Plc</strong>, <strong>FCMB Group</strong>, <strong>Meristem Securities Limited</strong>, <strong>African Petroleum (AP)</strong>, <strong>Sofitel the Moorhouse</strong>, and a host of others.
                </p>
              </div>

              {/* Commercial Footprint Ledger */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-2.5">
                <div className="text-[11px] font-black uppercase tracking-wider text-[#0F4C3A]">
                  Corporate Leadership & Conglomerate Footprint
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold text-slate-800">
                  <span className="inline-flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200/80">
                    <CheckCircle2 size={13} className="text-[#0F4C3A] shrink-0" />
                    Toyota Nigeria Limited
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200/80">
                    <CheckCircle2 size={13} className="text-[#0F4C3A] shrink-0" />
                    Elizade JAC Autoland
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200/80">
                    <CheckCircle2 size={13} className="text-[#0F4C3A] shrink-0" />
                    Mikeade Properties
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200/80">
                    <CheckCircle2 size={13} className="text-[#0F4C3A] shrink-0" />
                    SMT Nigeria Limited
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200/80">
                    <CheckCircle2 size={13} className="text-[#0F4C3A] shrink-0" />
                    FCMB Group & Ecobank
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white p-2 rounded-lg border border-slate-200/80">
                    <CheckCircle2 size={13} className="text-[#0F4C3A] shrink-0" />
                    Custodian & Meristem
                  </span>
                </div>
              </div>
            </section>

            {/* ── CHAPTER 3: Investing in National Capacity and Economic Development ── */}
            <section id="national-capacity" className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0F4C3A]">
                    CHAPTER III
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">Industrial Manufacturing</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Investing in National Capacity and Economic Development
              </h2>

              <div className="text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
                <p>
                  His business interests have extended into automotive assembly and manufacturing capacity with the completion of a state-of-the-art vehicle assembly plant in <strong>November 2015</strong> for Toyota and JAC vehicles, representing an investment of <strong>more than US$50 million</strong> and a stated annual assembly capacity of <strong>40,000 vehicles</strong>.
                </p>
                <p>
                  These investments illustrate his emphasis on enterprise as a means of developing skills, creating sustainable jobs and catalyzing wider economic activity within Nigeria.
                </p>
                <p>
                  His participation in the <strong>2005 Leaders’ Forum in Johannesburg, South Africa</strong> offered an international platform to share his entrepreneurial philosophy and experiences in sub-Saharan enterprise leadership.
                </p>
              </div>

              {/* Manufacturing Stats Callout in Clean Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50/90 rounded-xl p-5 border border-slate-200/90 space-y-1 shadow-xs">
                  <div className="text-2xl font-black text-[#0F2B5B]">US$50,000,000+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">Capital Commitment</div>
                  <p className="text-xs text-slate-600 leading-snug pt-1">
                    Direct local investment in modern automotive assembly and industrial technology transfer.
                  </p>
                </div>
                <div className="bg-slate-50/90 rounded-xl p-5 border border-slate-200/90 space-y-1 shadow-xs">
                  <div className="text-2xl font-black text-[#0F4C3A]">40,000 Vehicles</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F4C3A]">Annual Stated Capacity</div>
                  <p className="text-xs text-slate-600 leading-snug pt-1">
                    Commissioned in November 2015, assembling commercial and passenger vehicles for Nigerian roads.
                  </p>
                </div>
              </div>
            </section>

            {/* ── CHAPTER 4: Education as a Long-Term Investment in People ── */}
            <section id="education" className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0F4C3A]">
                    CHAPTER IV
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">Human Capital Formation</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Education as a Long-Term Investment in People
              </h2>

              <div className="text-slate-700 leading-relaxed space-y-3 text-xs sm:text-sm">
                <p>
                  Education has been a consistent priority in Chief Ade. Ojo’s philanthropic activities. In <strong>1991</strong>, he established the <strong>Ade. Ojo Scholarship Scheme</strong>, which has benefited <strong>more than 133 students</strong> across various disciplines.
                </p>
                <p>
                  Together with his late wife, he initially conceived a Polytechnic to address shortages of skilled technicians and artisans in Nigeria. That ambition subsequently evolved into <strong>Elizade University</strong>, an institution designed to expand access to world-class higher education and develop the capabilities of young Nigerians.
                </p>
                <p>
                  Established in <strong>February 2012</strong> and commencing academic activities in <strong>January 2013</strong> with 13 Programmes and 2 Faculties, Elizade University now offers <strong>31 Programmes</strong>, spread across <strong>5 Faculties</strong>:
                </p>
                
                {/* 5 Faculties Pill List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-0.5">
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-950 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-100">
                    <GraduationCap size={15} className="text-[#0F4C3A]" />
                    <span>Basic and Applied Sciences</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-950 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-100">
                    <GraduationCap size={15} className="text-[#0F4C3A]" />
                    <span>Engineering</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-950 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-100">
                    <GraduationCap size={15} className="text-[#0F4C3A]" />
                    <span>Law</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-950 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-100">
                    <GraduationCap size={15} className="text-[#0F4C3A]" />
                    <span>Humanities</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-950 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-100 sm:col-span-2">
                    <GraduationCap size={15} className="text-[#0F4C3A]" />
                    <span>Social and Management Sciences</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-amber-900 text-xs sm:text-sm">
                      100% NUC Accreditation Status
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
                      All university academic programmes presented to the National Universities Commission (NUC) for evaluation earned full accreditation status, cementing Elizade University's reputation as a bastion of academic rigor.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── CHAPTER 5: Transforming Communities Through Practical Investment ── */}
            <section id="community" className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0F4C3A]">
                    CHAPTER V
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">Ilara-Mokin Model</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Transforming Communities Through Practical Investment
              </h2>

              <div className="text-slate-700 leading-relaxed space-y-3 text-xs sm:text-sm">
                <p>
                  Chief Ade. Ojo’s contribution to his hometown of <strong>Ilara-Mokin, Ondo State</strong> includes comprehensive community infrastructure and initiatives intended to stimulate local economic activity:
                </p>
                
                <ul className="space-y-2.5 pl-1">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#0F4C3A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                      1
                    </div>
                    <div>
                      <strong className="text-slate-900">8.5 Kilometers of Modern Township Roads (2005):</strong>
                      <span className="text-slate-600 block mt-0.5 text-xs">
                        Privately constructed high-grade asphalt roads that connected remote rural quarters, dramatically lowering transport costs and catalyzing commerce.
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#0F4C3A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                      2
                    </div>
                    <div>
                      <strong className="text-slate-900">Smokin Hills Golf Resort (2012):</strong>
                      <span className="text-slate-600 block mt-0.5 text-xs">
                        An international championship standard 18-hole golf destination that transformed Ilara-Mokin into a premier hub for sports tourism, hospitality, and global visitor engagement.
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#0F4C3A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                      3
                    </div>
                    <div>
                      <strong className="text-slate-900">Shield Microfinance Bank:</strong>
                      <span className="text-slate-600 block mt-0.5 text-xs">
                        Established in Ilara-Mokin to provide grassroot financial access, savings facilities, and micro-credit facilities for traders, artisans, and women entrepreneurs.
                      </span>
                    </div>
                  </li>
                </ul>

                <p>
                  He has also rendered financial and economic support to residents, alongside employment opportunities within his businesses; all demonstrating an approach to community development that combines infrastructure, access to economic resources and long-term local investment.
                </p>
              </div>
            </section>

            {/* ── CHAPTER 6: Preserving Culture and Supporting Social Institutions ── */}
            <section id="culture-honours" className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0F4C3A]">
                    CHAPTER VI
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">Heritage & Civic Honors</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Preserving Culture and Supporting Social Institutions
              </h2>

              <div className="text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
                <p>
                  His commitment to Nigerian cultural heritage is reflected in <strong>Odua Creations Limited</strong>, a garment manufacturing business focused on traditional and corporate attire using authentic Nigerian fabrics.
                </p>
                <p>
                  He has also supported religious and socio-cultural organisations and the development of golf in Nigeria, including the <strong>Smokin Hills Golf Resort</strong> and the <strong>Elizabeth Wuraola Ojo Memorial Golf Tournament</strong>.
                </p>
                <p>
                  His community service and nation-building contributions have attracted numerous traditional and civic honours, including the titles of:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="font-extrabold text-slate-900 text-xs sm:text-sm">Aare Ataiyese</div>
                    <div className="text-xs text-slate-500 font-medium">Ilara-Mokin Kingdom</div>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="font-extrabold text-slate-900 text-xs sm:text-sm">Asiwaju</div>
                    <div className="text-xs text-slate-500 font-medium">Imesi-Ile Kingdom</div>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="font-extrabold text-slate-900 text-xs sm:text-sm">Baaloro of the Source</div>
                    <div className="text-xs text-slate-500 font-medium">Cradle of the Yoruba, Ile-Ife</div>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="font-extrabold text-slate-900 text-xs sm:text-sm">Fiwagboye</div>
                    <div className="text-xs text-slate-500 font-medium">Alade-Idanre Kingdom</div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── CHAPTER 7: A Personal Legacy of Partnership and Commitment ── */}
            <section id="personal-legacy" className="bg-gradient-to-br from-rose-50/60 via-white to-amber-50/40 border border-rose-100 text-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-[#EA580C] rounded-full shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#EA580C]">
                    CHAPTER VII
                  </span>
                </div>
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                  Tribute to Chief (Mrs.) Elizabeth Wuraola Ojo
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                A Personal Legacy of Partnership and Commitment
              </h2>

              <div className="text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
                <p>
                  Chief Ade. Ojo has acknowledged the important role of his late wife, <strong>Chief (Mrs.) Elizabeth Wuraola Ojo</strong>, as a partner in the establishment of the family business and an enduring source of inspiration in his life.
                </p>
                <p>
                  Across business, education and community initiatives, his career demonstrates the connection between personal conviction, sustained enterprise and a commitment to improving the lot of others, especially the less privileged and vulnerable in society.
                </p>
              </div>

              {/* Tribute Block */}
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-rose-200/80 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart size={20} className="fill-rose-500 text-rose-500" />
                </div>
                <div className="space-y-1">
                  <div className="font-extrabold text-sm text-[#0F2B5B]">The Name Behind Elizade</div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The name <em>"Elizade"</em> was derived from the union of <strong>Elizabeth</strong> and <strong>Ade</strong>, symbolizing a shared lifetime covenant of partnership, dedication, and mutual service that continues to anchor the family's philanthropic institutions.
                  </p>
                </div>
              </div>
            </section>

            {/* ── CHAPTER 8: The Philanthropic Legacy and CMAO Foundation ── */}
            <section id="foundation-evolution" className="bg-white rounded-xl border-2 border-[#0F4C3A]/20 p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0F4C3A]">
                    CHAPTER VIII
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  Institutional Transition
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                The Philanthropic Legacy and the Chief Michael Ade. Ojo Foundation
              </h2>

              <div className="text-slate-700 leading-relaxed space-y-3 text-xs sm:text-sm">
                <p>
                  His life reveals a pattern of support for education, economic opportunity, cultural preservation and community development, a natural progression to the establishment of the <strong>Chief Michael Ade. Ojo Foundation</strong>, born out of the need for the fulfilment of his broader aspiration to give enduring structure to community-focused service.
                </p>
                
                {/* Evolution Badge Timeline */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-[#0F4C3A] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      2007
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        Registered as Elizade Ojo Educational Foundation
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Focused primarily on educational scholarships, artisan training, and higher education access.
                      </p>
                    </div>
                  </div>

                  <div className="h-3 border-l-2 border-dashed border-slate-300 ml-3" />

                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-[#EA580C] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      2021
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        Rechartered as Chief Michael Ade. Ojo Foundation (September 2, 2021)
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Charter amended and broadened into an institutional philanthropic vehicle with multi-pillar interventions.
                      </p>
                    </div>
                  </div>
                </div>

                <p>
                  The Foundation's original orientation was education, but its documented mandate has expanded to include:
                </p>

                {/* Mandate Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs font-bold text-slate-800">
                  <div className="p-2 rounded-lg bg-emerald-50 text-[#0F4C3A] border border-emerald-100 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="shrink-0" />
                    <span>Food Support</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 text-[#0F4C3A] border border-emerald-100 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="shrink-0" />
                    <span>Higher Scholarships</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 text-[#0F4C3A] border border-emerald-100 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="shrink-0" />
                    <span>Health Assistance</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 text-[#0F4C3A] border border-emerald-100 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="shrink-0" />
                    <span>Youth & Women Empowerment</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 text-[#0F4C3A] border border-emerald-100 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="shrink-0" />
                    <span>Economic Empowerment</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 text-[#0F4C3A] border border-emerald-100 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="shrink-0" />
                    <span>Humanitarian Interventions</span>
                  </div>
                </div>

                {/* Free Medical Outreaches Highlight */}
                <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-teal-900 font-extrabold text-xs">
                    <Heart size={14} className="text-teal-700 fill-teal-700" />
                    <span>Community Health Outreaches (2025 & 2026)</span>
                  </div>
                  <p className="text-xs text-teal-800 leading-relaxed">
                    More recently, he has continued to demonstrate community-oriented interventions. In <strong>2025 and 2026</strong>, Elizade University conducted free medical outreaches in Ilara-Mokin, including consultations, screening, medication and health education; the <strong>2026 outreach reportedly served more than 500 residents</strong>.
                  </p>
                </div>

                <p className="italic text-slate-800 font-medium">
                  The emergence of the Foundation explicitly identifies the need to migrate interventions historically supported personally by the Founder into a more effective, enduring institutional structure.
                </p>
              </div>

              {/* Call to action inside Foundation chapter */}
              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                <Link
                  to="/our-work"
                  className="bg-[#0F4C3A] hover:bg-[#14634C] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs transition-all inline-flex items-center gap-1.5"
                >
                  <span>Explore Foundation Pillars</span>
                  <ArrowRight size={13} />
                </Link>
                <Link
                  to="/impact"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-lg transition-all inline-flex items-center gap-1.5"
                >
                  <span>View Verified Impact Data</span>
                  <ExternalLink size={13} />
                </Link>
              </div>
            </section>

            {/* ── CHAPTER 9: Photographic Archive & Milestones ── */}
            <section id="photo-archive" className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-3.5 bg-[#EA580C] rounded-full shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0F4C3A]">
                    ARCHIVAL PHOTOGRAPHS
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">7 Official Portraits & Milestones</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Historical Photographic Archive
              </h2>
              <p className="text-slate-600 text-xs">
                Click on any portrait below to inspect full-screen archival photography, captions, and historical details.
              </p>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 pt-2">
                {founderGallery.map((photo, idx) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhotoIdx(idx)}
                    className="group relative aspect-[4/4.8] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 text-white">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                        {photo.badge}
                      </span>
                      <p className="text-xs font-bold leading-tight truncate">
                        {photo.title}
                      </p>
                      <span className="text-[10px] text-emerald-200 flex items-center gap-1 mt-0.5">
                        <Maximize2 size={10} /> Click to expand
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </main>

        </div>
      </div>

      {/* Floating Back-to-Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0F4C3A] hover:bg-[#14634C] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
          title="Scroll back to top"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={19} strokeWidth={2.6} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* ── High-Resolution Photo Lightbox Modal ── */}
      {selectedPhotoIdx !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between text-white shrink-0 pb-3 border-b border-white/10 max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-bold">
                {founderGallery[selectedPhotoIdx].badge}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Photo {selectedPhotoIdx + 1} of {founderGallery.length}
              </span>
            </div>
            <button
              onClick={() => setSelectedPhotoIdx(null)}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close photo modal"
            >
              <X size={22} />
            </button>
          </div>

          {/* Main Photo View Area with Arrow Controls */}
          <div className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full py-4 min-h-0">
            {/* Prev Button */}
            <button
              onClick={() => setSelectedPhotoIdx((prev) => (prev - 1 + founderGallery.length) % founderGallery.length)}
              className="absolute left-2 sm:left-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Current Image */}
            <div className="max-h-full max-w-full flex items-center justify-center p-2">
              <img
                src={founderGallery[selectedPhotoIdx].src}
                alt={founderGallery[selectedPhotoIdx].title}
                className="max-h-[62vh] sm:max-h-[68vh] w-auto object-contain rounded-xl shadow-2xl border border-white/15"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={() => setSelectedPhotoIdx((prev) => (prev + 1) % founderGallery.length)}
              className="absolute right-2 sm:right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Modal Footer Caption */}
          <div className="max-w-3xl mx-auto w-full text-center shrink-0 pt-3 border-t border-white/10 space-y-1">
            <h4 className="text-white font-extrabold text-sm sm:text-base">
              {founderGallery[selectedPhotoIdx].title}
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm font-normal max-w-2xl mx-auto leading-relaxed">
              {founderGallery[selectedPhotoIdx].caption}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default FounderProfilePage;
