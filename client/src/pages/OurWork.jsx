import React from 'react';
import StrategicPillars from '../components/StrategicPillars';

const OurWork = () => {
  return (
    <div className="py-12 space-y-12 animate-fade-in">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#0F4C3A] text-xs font-extrabold uppercase tracking-wider">
          Our Programmes & Impact Areas
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0D1B2A] tracking-tight">
          Three Interconnected Pillars for Transformation
        </h1>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Explore how Chief Michael Ade.Ojo Foundation creates pathways to better futures across Education & Human Capital, Health & Well-being, and Community Resilience.
        </p>
      </section>

      <StrategicPillars />
    </div>
  );
};

export default OurWork;
