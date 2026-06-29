import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, X } from 'lucide-react';

const PricingPlans = () => {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-slate-50 via-[#00B4D8]/5 to-white border-y border-slate-200 px-6 relative overflow-hidden">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00B4D8]/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#00B4D8]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#00B4D8] uppercase tracking-widest">Pricing Matrix</span>
          <h2 className="text-3xl font-black text-[#0A192F] tracking-tight">Subscription Plans</h2>
          <p className="text-sm text-[#334155] font-medium">Select the tier that aligns with your professional growth or hiring objectives.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Free Tier */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex flex-col justify-between shadow-sm space-y-8 hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-400 text-sm">Free Basic</h4>
                <h3 className="text-3xl font-black text-[#0A192F]">Free</h3>
              </div>
              <p className="text-xs text-[#334155] font-medium leading-relaxed">
                Standard profile, basic resume compile, and direct access to open courses and search directory.
              </p>
              <ul className="space-y-3 pt-4 border-t border-slate-100 text-xs text-[#334155] font-semibold">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00B4D8] shrink-0" /> Basic Permanent Profile</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00B4D8] shrink-0" /> Basic Resume CV Builder</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00B4D8] shrink-0" /> Job Openings Search</li>
                <li className="flex items-center gap-2 text-slate-350"><X size={14} className="shrink-0" /> Premium Assessments</li>
                <li className="flex items-center gap-2 text-slate-300"><X size={14} className="shrink-0" /> AI CV Optimizer</li>
              </ul>
            </div>
            <Link to="/register" className="w-full py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-2xl shadow-sm transition-all text-center block mt-8">
              Join Free Plan
            </Link>
          </div>

          {/* Pro Tier (Featured Brand Card) */}
          <div className="bg-[#0A192F] p-8 rounded-[2.5rem] border border-[#00B4D8]/45 flex flex-col justify-between shadow-xl space-y-8 relative overflow-hidden text-white hover:scale-[1.01] transition-transform">
            <div className="absolute top-0 right-0 bg-[#00B4D8] text-white text-[9px] font-black tracking-widest uppercase px-4 py-1.5 rounded-bl-2xl">
              Most Popular
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-bold text-[#00B4D8] text-sm">CareerMAX Pro</h4>
                <h3 className="text-3xl font-black text-white">₦25,000<span className="text-xs text-slate-400 font-semibold font-plus-jakarta"> / month</span></h3>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Accelerate placement with unlimited course libraries, exam attempts, CV AI optimization, and priority matching.
              </p>
              <ul className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-250 font-semibold">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00B4D8] shrink-0" /> Unlimited Premium Courses</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00B4D8] shrink-0" /> <strong>2 Exam Attempts included</strong></li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00B4D8] shrink-0" /> Advanced AI CV Optimizer</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00B4D8] shrink-0" /> AI Simulated Interview Prep</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00B4D8] shrink-0" /> Verified Professional Badge</li>
              </ul>
            </div>
            <Link to="/register" className="w-full py-4 bg-[#00B4D8] hover:bg-[#0092b0] text-white font-bold text-xs rounded-2xl shadow-lg transition-all text-center block mt-8">
              Start 7-Day Trial
            </Link>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex flex-col justify-between shadow-sm space-y-8 hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-bold text-[#00B4D8] text-sm">Enterprise Tier</h4>
                <h3 className="text-3xl font-black text-[#0A192F]">₦100,000<span className="text-xs text-slate-400 font-semibold"> + / month</span></h3>
              </div>
              <p className="text-xs text-[#334155] font-medium leading-relaxed">
                Designed for recruitment firms, hiring employers, and corporate talent pipelines sponsors.
              </p>
              <ul className="space-y-3 pt-4 border-t border-slate-100 text-xs text-[#334155] font-semibold">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00B4D8] shrink-0" /> Unlimited Job Postings</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00B4D8] shrink-0" /> Full ATS Recruitment Dashboard</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00B4D8] shrink-0" /> Candidates DB + Match Scoring</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00B4D8] shrink-0" /> Sponsored Cohorts Progress Panel</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00B4D8] shrink-0" /> Corporate LMS integration</li>
              </ul>
            </div>
            <Link to="/register" className="w-full py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-2xl shadow-sm transition-all text-center block mt-8">
              Contact Enterprise Sales
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
