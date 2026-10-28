import React, { useState } from 'react';
import {
  Plus,
  Search,
  MoreVertical,
  CheckCircle2,
  Calendar,
  FileText,
  DollarSign,
  User,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

const BeneficiaryOverviewTab = ({
  beneficiary,
  onOpenAddIntervention,
}) => {
  const [interventionSearch, setInterventionSearch] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);

  const interventions = beneficiary.interventionsHistory || [
    {
      id: 'int-1',
      date: '15 Oct 2026',
      intervention: 'School Fees Support',
      programme: 'School Support Programme',
      valueType: '₦150,000',
      status: 'Completed',
      providedBy: 'CMAOF',
      notes: 'Paid for SS2 school fees',
    },
    {
      id: 'int-2',
      date: '20 Sep 2026',
      intervention: 'Learning Materials',
      programme: 'School Support Programme',
      valueType: 'Books & materials',
      status: 'Completed',
      providedBy: 'Partner',
      notes: 'Provided textbooks and uniforms',
    },
    {
      id: 'int-3',
      date: '10 Aug 2026',
      intervention: 'Mentorship Session',
      programme: 'Education Mentorship Support',
      valueType: 'Session',
      status: 'Completed',
      providedBy: 'Volunteer',
      notes: 'Career guidance session',
    },
  ];

  const filteredInterventions = interventions.filter(
    (item) =>
      !interventionSearch ||
      item.intervention.toLowerCase().includes(interventionSearch.toLowerCase()) ||
      item.programme.toLowerCase().includes(interventionSearch.toLowerCase()) ||
      item.notes.toLowerCase().includes(interventionSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease]">
      {/* ─────────────────────────────────────────────────────────────
          1. 3-COLUMN CARDS ROW matching Image 3
          (Personal Info, Household Info, Case Info)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* CARD 1: PERSONAL INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <span className="w-1.5 h-5 rounded-full bg-[#f97316]" />
            <h2 className="text-sm sm:text-base font-bold text-[#0B2D6E]">
              Personal Information
            </h2>
          </div>

          <div className="divide-y divide-slate-100 text-xs mt-2">
            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Full Name</span>
              <span className="font-bold text-slate-800 text-right">{beneficiary.name}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Date of Birth</span>
              <span className="font-semibold text-slate-700 text-right">{beneficiary.dob || '12 Jan 2010 (16 years)'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Gender</span>
              <span className="font-semibold text-slate-700 text-right">{beneficiary.gender || 'Female'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Phone Number</span>
              <span className="font-mono font-bold text-slate-800 text-right">{beneficiary.phone || '0803 123 4567'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium shrink-0">Address</span>
              <span className="font-medium text-slate-700 text-right">{beneficiary.address || 'Unguwa Dosa, Kano, Kano State'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Nationality</span>
              <span className="font-semibold text-slate-700 text-right">{beneficiary.nationality || 'Nigerian'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">ID Type</span>
              <span className="font-semibold text-slate-700 text-right">{beneficiary.idType || 'National ID'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">ID Number</span>
              <span className="font-mono font-bold text-slate-800 text-right">{beneficiary.idNumber || '3214 5678 9012'}</span>
            </div>
          </div>
        </div>

        {/* CARD 2: HOUSEHOLD INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <span className="w-1.5 h-5 rounded-full bg-[#f97316]" />
            <h2 className="text-sm sm:text-base font-bold text-[#0B2D6E]">
              Household Information
            </h2>
          </div>

          <div className="divide-y divide-slate-100 text-xs mt-2">
            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Household Size</span>
              <span className="font-bold text-slate-800 text-right">{beneficiary.household?.size || 5}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Head of Household</span>
              <span className="font-semibold text-slate-700 text-right">{beneficiary.household?.head || 'Father'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Guardian Name</span>
              <span className="font-bold text-slate-800 text-right">{beneficiary.household?.guardianName || 'Mohammed Yusuf'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Contact Number</span>
              <span className="font-mono font-bold text-slate-800 text-right">{beneficiary.household?.contactNumber || '0803 987 6543'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Household Type</span>
              <span className="font-semibold text-slate-700 text-right">{beneficiary.household?.householdType || 'Low-income'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium shrink-0">Address</span>
              <span className="font-medium text-slate-700 text-right">{beneficiary.household?.address || 'Same as above'}</span>
            </div>
          </div>
        </div>

        {/* CARD 3: CASE INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <span className="w-1.5 h-5 rounded-full bg-[#f97316]" />
            <h2 className="text-sm sm:text-base font-bold text-[#0B2D6E]">
              Case Information
            </h2>
          </div>

          <div className="divide-y divide-slate-100 text-xs mt-2">
            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Current Stage</span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                {beneficiary.caseInfo?.currentStage || 'Active'}
              </span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Date Registered</span>
              <span className="font-semibold text-slate-700 text-right">{beneficiary.caseInfo?.dateRegistered || '06 Oct 2026'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Assigned Officer</span>
              <span className="font-bold text-slate-800 text-right">{beneficiary.caseInfo?.assignedOfficer || 'Hauwa Bello'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Programme</span>
              <span className="font-bold text-[#0B2D6E] text-right">{beneficiary.caseInfo?.programme || 'School Support Programme'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Location</span>
              <span className="font-semibold text-slate-700 text-right">{beneficiary.caseInfo?.location || 'Kano State'}</span>
            </div>

            <div className="py-2 flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Next Follow-up</span>
              <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-right">
                {beneficiary.caseInfo?.nextFollowUp || '15 Nov 2026'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. BOTTOM SECTION: INTERVENTION HISTORY TABLE matching Image 3
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Section Header Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-6 rounded-full bg-[#f97316]" />
            <h2 className="text-base sm:text-lg font-black text-[#0B2D6E] tracking-tight">
              Intervention History
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Search within interventions */}
            <div className="relative w-48 sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={interventionSearch}
                onChange={(e) => setInterventionSearch(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#06402B]/20 font-medium"
              />
            </div>

            {/* Add Intervention Button */}
            <button
              type="button"
              onClick={onOpenAddIntervention}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#06402B] hover:bg-[#042C1D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>Add Intervention</span>
            </button>
          </div>
        </div>

        {/* Table matching Image 3 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Intervention</th>
                <th className="py-3 px-4">Programme</th>
                <th className="py-3 px-4">Value/Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Provided By</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredInterventions.map((row) => {
                const isMenuOpen = activeMenu === row.id;

                return (
                  <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap font-medium">
                      {row.date}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {row.intervention}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      {row.programme}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {row.valueType}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] bg-emerald-100 text-emerald-800 font-bold border border-emerald-200/60">
                        {row.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {row.providedBy}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                      {row.notes}
                    </td>

                    <td className="py-3.5 px-4 text-center relative">
                      <button
                        type="button"
                        onClick={() => setActiveMenu(isMenuOpen ? null : row.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                        aria-label="Intervention Actions"
                      >
                        <MoreVertical size={15} />
                      </button>

                      {isMenuOpen && (
                        <div
                          className="absolute right-3 top-10 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-20 text-left text-xs animate-[fadeIn_0.15s_ease]"
                          onMouseLeave={() => setActiveMenu(null)}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenu(null);
                              toast.success('Viewing receipt for ' + row.intervention);
                            }}
                            className="w-full px-3 py-1.5 hover:bg-slate-50 font-semibold text-slate-700 text-left"
                          >
                            View Receipt
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenu(null);
                              toast.success('Edit intervention details');
                            }}
                            className="w-full px-3 py-1.5 hover:bg-slate-50 font-semibold text-slate-700 text-left"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryOverviewTab;
