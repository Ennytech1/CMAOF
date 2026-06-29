import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

const OutcomesAndTestimonials = () => {
  const testimonials = [
    {
      name: 'Chinedu O.',
      avatarLetter: 'C',
      avatarColor: 'bg-emerald-500',
      quote: '"CareerMAX\'s reputation for high-quality content, paired with its flexible exam structure, made it possible for me to qualify as a Certified Leasing Professional while managing my full-time work and family."'
    },
    {
      name: 'Amina B.',
      avatarLetter: 'A',
      avatarColor: 'bg-teal-500',
      quote: '"Believing in my potential again was the biggest hurdle. The simulated interview preparation and optimized resume template helped me secure my first Product Management role within 3 weeks."'
    },
    {
      name: 'Abdullahi M.',
      avatarLetter: 'A',
      avatarColor: 'bg-blue-600',
      quote: '"I now feel much more prepared to take on asset valuation risk roles. The ELRA registry verified badge on my profile allowed recruiters to reach out directly with verified confidence."'
    },
    {
      name: 'Favour A.',
      avatarLetter: 'F',
      avatarColor: 'bg-purple-600',
      quote: '"Learning with CareerMAX Labs has expanded my technical stack by giving me direct hands-on projects, practical tools, and structured cohort-based reviews that hiring firms look out for."'
    }
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto space-y-16">
      
      {/* 1. Outcomes Banner */}
      <div className="rounded-[2rem] bg-[#0A192F] p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden border border-white/5 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,180,216,0.1),transparent_50%)] pointer-events-none" />
        
        <div className="space-y-4 max-w-xl z-10">
          <h3 className="text-2xl md:text-3xl font-black leading-tight tracking-tight">
            91% of learners achieved a positive career outcome
          </h3>
          <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
            They reported securing new job opportunities, increased domain knowledge, and improved work performance within months of certification.
          </p>
          <button className="inline-flex items-center gap-1 text-[#00B4D8] font-bold text-xs hover:underline cursor-pointer">
            Learn more <ArrowRight size={14} />
          </button>
        </div>

        {/* Circular Outcome Progress Indicator */}
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0 z-10">
          {/* Animated concentric outline rings */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-800/80" />
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="44" 
              stroke="#00B4D8" 
              strokeWidth="6" 
              fill="transparent" 
              strokeDasharray="276" 
              strokeDashoffset="24.8" 
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-3xl font-black block tracking-tight">91%</span>
            <span className="text-[7px] text-slate-400 uppercase tracking-widest font-black">Success</span>
          </div>
        </div>
      </div>

      {/* 2. Testimonials Grid */}
      <div className="space-y-8">
        <h3 className="text-xl md:text-2xl font-black text-[#0A192F] tracking-tight">
          Why people choose CareerMAX
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((test, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <p className="text-xs text-[#334155] leading-relaxed font-semibold italic">
                {test.quote}
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-8 h-8 rounded-full ${test.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                  {test.avatarLetter}
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#0A192F]">{test.name}</h5>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="fill-amber-400 text-amber-400" size={10} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default OutcomesAndTestimonials;
