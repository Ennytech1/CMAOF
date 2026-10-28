import React from 'react';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'household', label: 'Household' },
  { id: 'needs-assessment', label: 'Needs Assessment' },
  { id: 'interventions', label: 'Interventions' },
  { id: 'referrals', label: 'Referrals' },
  { id: 'follow-up', label: 'Follow-up' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'documents', label: 'Documents' },
  { id: 'safeguarding', label: 'Consent & Safeguarding' },
];

const BeneficiaryTabsNav = ({ activeTab, onSelectTab }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`
              whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer
              ${
                isActive
                  ? 'bg-[#06402B] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80 hover:text-slate-900'
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default BeneficiaryTabsNav;
