import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

// Modular Component Imports
import AudienceBar from '../components/landing/AudienceBar';
import LandingHeader from '../components/landing/LandingHeader';
import HeroBanners from '../components/landing/HeroBanners';
import PartnerShowcase from '../components/landing/PartnerShowcase';
import CareerReadyTracks from '../components/landing/CareerReadyTracks';
import NewAndPopular from '../components/landing/NewAndPopular';
import OutcomesAndTestimonials from '../components/landing/OutcomesAndTestimonials';
import ExploreCategories from '../components/landing/ExploreCategories';
import ExploreRoles from '../components/landing/ExploreRoles';
import PricingPlans from '../components/landing/PricingPlans';
import FaqSection from '../components/landing/FaqSection';
import LandingFooter from '../components/landing/LandingFooter';

const Landing = () => {
    const navigate = useNavigate();
    const [activeAudience, setActiveAudience] = useState('individuals');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJobCareer, setSelectedJobCareer] = useState('data');
    const [selectedCategoryPill, setSelectedCategoryPill] = useState('all');

    const careerTracks = {
        data: [
            {
                provider: 'Google Career Certs',
                title: 'Google Data Analytics Professional',
                rating: 4.8,
                reviews: '92,104',
                duration: '3 months (10 hrs/wk)',
                type: 'Professional Certificate',
                skills: ['SQL', 'Spreadsheets', 'Tableau', 'R Programming'],
                logoColor: 'from-amber-500 to-red-500'
            },
            {
                provider: 'IBM Skills Network',
                title: 'IBM Data Science Specialist',
                rating: 4.6,
                reviews: '41,529',
                duration: '4 months (8 hrs/wk)',
                type: 'Professional Certificate',
                skills: ['Python', 'Machine Learning', 'Data Analysis', 'Jupyter Notebooks'],
                logoColor: 'from-blue-600 to-indigo-700'
            },
            {
                provider: 'Microsoft Corporation',
                title: 'Microsoft Power BI Analyst',
                rating: 4.7,
                reviews: '12,940',
                duration: '2 months (12 hrs/wk)',
                type: 'Accredited Certificate',
                skills: ['Power BI', 'Data Modeling', 'DAX Formulas', 'Dashboard Design'],
                logoColor: 'from-cyan-500 to-blue-600'
            }
        ],
        finance: [
            {
                provider: 'ACC Council Registry',
                title: 'Certified Leasing Professional (CLP)',
                rating: 4.9,
                reviews: '8,421',
                duration: '4 weeks (15 hrs/wk)',
                type: 'Professional Accreditation',
                skills: ['Lease Structuring', 'Asset Valuation', 'Credit Risk Analysis', 'ELRA Compliance'],
                logoColor: 'from-emerald-500 to-teal-600'
            },
            {
                provider: 'ELRA Academy',
                title: 'Lease & Asset Finance Specialist (LAFS)',
                rating: 4.8,
                reviews: '3,115',
                duration: '6 weeks (10 hrs/wk)',
                type: 'Accredited Certification',
                skills: ['Taxation Guidelines', 'Securitization Structures', 'Portfolio Auditing', 'Nigerian Leasing Laws'],
                logoColor: 'from-teal-600 to-indigo-800'
            }
        ],
        software: [
            {
                provider: 'CareerMAX Labs',
                title: 'Full-Stack Software Engineering',
                rating: 4.9,
                reviews: '15,842',
                duration: '12 weeks (20 hrs/wk)',
                type: 'Professional Certificate',
                skills: ['React 19', 'Node.js', 'Express', 'MongoDB Database'],
                logoColor: 'from-purple-600 to-pink-600'
            },
            {
                provider: 'OpenAI Developer Network',
                title: 'Agentic AI & LLM Systems Architect',
                rating: 4.9,
                reviews: '2,904',
                duration: '8 weeks (12 hrs/wk)',
                type: 'Specialization Certificate',
                skills: ['AI Agent Frameworks', 'Prompt Engineering', 'RAG Architectures', 'Model Tuning'],
                logoColor: 'from-slate-700 to-emerald-600'
            }
        ],
        pm: [
            {
                provider: 'Google Career Certs',
                title: 'Google Project Management',
                rating: 4.8,
                reviews: '75,492',
                duration: '4 months (10 hrs/wk)',
                type: 'Professional Certificate',
                skills: ['Agile Methodologies', 'Scrum Workflows', 'Stakeholder Management', 'Risk Auditing'],
                logoColor: 'from-amber-500 to-orange-500'
            },
            {
                provider: 'Microsoft Corporation',
                title: 'Microsoft AI Product Manager',
                rating: 4.7,
                reviews: '5,820',
                duration: '6 weeks (12 hrs/wk)',
                type: 'Specialization Certificate',
                skills: ['AI Product Lifecycle', 'Model Metrics', 'User Research', 'Ethics in AI'],
                logoColor: 'from-blue-600 to-cyan-500'
            }
        ]
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            toast.success(`Querying directory: "${searchQuery}"`);
            navigate(`/register?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#334155] overflow-x-hidden font-plus-jakarta">

            {/* 1. Audience Top Bar */}
            <AudienceBar activeAudience={activeAudience} setActiveAudience={setActiveAudience} />

            {/* 2. Main Navigation Header */}
            <LandingHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearchSubmit}
            />

            {/* 3. Hero Typography Introduction Section */}
            <section className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto text-center space-y-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,216,0.03),transparent_60%)] pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00B4D8]/5 border border-[#00B4D8]/10 text-xs font-bold text-[#00B4D8] z-10 relative">
                    <Sparkles size={14} className="text-amber-500" />
                    <span>Africa's Unified Career Operating System</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#0A192F] leading-tight max-w-4xl mx-auto z-10 relative">
                    One Professional Profile.<br />
                    <span className="bg-gradient-to-r from-[#0A192F] via-[#00B4D8] to-[#00B4D8] bg-clip-text text-transparent">
                        Every Stage of Your Growth.
                    </span>
                </h1>

                <p className="text-[#334155] font-medium text-base md:text-lg leading-relaxed max-w-2xl mx-auto z-10 relative">
                    Ditch the fragmented learning systems, disconnected CV builders, and raw job boards. CareerMAX integrates education, independent certifications, verified portfolios, and direct placement.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 z-10 relative">
                    <Link
                        to="/register"
                        className="bg-[#00B4D8] hover:bg-[#0092b0] text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-md shadow-[#00B4D8]/10 hover:shadow-[#00b4d8]/20 flex items-center justify-center gap-2 group transition-all hover:scale-[1.01]"
                    >
                        Get Started Free <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <a
                        href="#pricing"
                        className="bg-white border border-slate-200 hover:bg-slate-50 text-[#334155] px-8 py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center shadow-sm"
                    >
                        View Pricing Plans
                    </a>
                </div>
            </section>

            {/* 4. Modular Hero Promotional Banners */}
            <HeroBanners />

            {/* 5. Modular Partner Accreditation Showcase */}
            <PartnerShowcase />

            {/* 6. Modular Career Certificate Tracks */}
            <CareerReadyTracks
                selectedJobCareer={selectedJobCareer}
                setSelectedJobCareer={setSelectedJobCareer}
                careerTracks={careerTracks}
            />

            {/* 7. Modular New & Popular registries grid */}
            <NewAndPopular />

            {/* 7.5. Modular Outcomes and Testimonials Section */}
            <OutcomesAndTestimonials />

            {/* 8. Modular Topic Categories pills */}
            <ExploreCategories
                selectedCategoryPill={selectedCategoryPill}
                setSelectedCategoryPill={setSelectedCategoryPill}
            />

            {/* 8.5. Modular Explore Roles Section */}
            <ExploreRoles />

            {/* 9. Modular Pricing comparison panels */}
            <PricingPlans />

            {/* 9.5. Modular FAQ Accordion Section */}
            <FaqSection />

            {/* 10. Modular Regulatory compliance and Copyright footer */}
            <LandingFooter />

        </div>
    );
};

export default Landing;
