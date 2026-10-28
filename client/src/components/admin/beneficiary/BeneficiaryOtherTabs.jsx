import React from 'react';
import {
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Shield,
  Award,
  BookOpen,
  Calendar,
  Users,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const BeneficiaryInterventionsTab = ({ beneficiary }) => (
  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-base sm:text-lg font-black text-[#0B2D6E]">Registered Interventions (1)</h3>
        <p className="text-xs text-slate-500">Foundation assistance, financial disbursements, and kit allocations.</p>
      </div>
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
        Disbursed
      </span>
    </div>

    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            Education Pillar • Field Grant
          </span>
          <h4 className="text-base font-bold text-slate-800 mt-0.5">
            {beneficiary.intervention || 'Primary School Tuition, Books & Kit Provision'}
          </h4>
        </div>
        <div className="text-right">
          <span className="text-lg font-black text-[#06402B]">₦180,000</span>
          <p className="text-[11px] text-slate-400">Total Approved Value</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
        <div>
          <span className="text-slate-400 font-semibold block">Disbursement Date:</span>
          <span className="font-bold text-slate-700">12 Sep 2026</span>
        </div>
        <div>
          <span className="text-slate-400 font-semibold block">Vendor / Institution:</span>
          <span className="font-bold text-slate-700">{beneficiary.school || 'Ajegunle Primary School'}</span>
        </div>
        <div>
          <span className="text-slate-400 font-semibold block">Verification Ref:</span>
          <span className="font-mono font-bold text-slate-700">INT-2026-0892</span>
        </div>
      </div>
    </div>
  </div>
);

export const BeneficiaryReferralsTab = ({ beneficiary }) => (
  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-base sm:text-lg font-black text-[#0B2D6E]">Partner Referrals (1)</h3>
        <p className="text-xs text-slate-500">External agency and government institutional linkages.</p>
      </div>
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
        In Progress
      </span>
    </div>

    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3 text-xs sm:text-[13px]">
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200/60">
        <div>
          <h4 className="font-bold text-slate-800">
            Lagos State Universal Basic Education Board (SUBEB)
          </h4>
          <p className="text-slate-500 text-xs mt-0.5">Specialized Literacy and Remedial Academic Program</p>
        </div>
        <span className="text-xs font-bold text-slate-500">Initiated 18 Sep 2026</span>
      </div>
      <p className="text-slate-600">
        Referral lodged with the district education supervisor for supplementary weekend classes and school feeding enrollment.
      </p>
    </div>
  </div>
);

export const BeneficiaryFollowupTab = ({ beneficiary }) => (
  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-base sm:text-lg font-black text-[#0B2D6E]">Follow-up & Monitoring Logs (2)</h3>
        <p className="text-xs text-slate-500">On-site verification logs by assigned case officers.</p>
      </div>
      <button
        type="button"
        onClick={() => toast.success('New follow-up log form ready.')}
        className="px-3 py-1.5 rounded-xl bg-[#06402B] text-white text-xs font-bold cursor-pointer"
      >
        + Add Log
      </button>
    </div>

    <div className="space-y-3 text-xs sm:text-[13px]">
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-800">Distribution of Textbooks & School Kit</span>
          <span className="font-mono text-slate-400 text-xs">15 Oct 2026</span>
        </div>
        <p className="text-slate-600">
          Officer Ngozi Adeyemi visited school premises. Complete pack with 10 exercise books, mathematical set, and school uniform handed over.
        </p>
        <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
          Status: Verified & Signed
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-800">Initial Home Visit & Parent Interview</span>
          <span className="font-mono text-slate-400 text-xs">28 Sep 2026</span>
        </div>
        <p className="text-slate-600">
          Met with Mr. John Okafor at Ajegunle residence. Home environment assessed, guardian agreement executed.
        </p>
        <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
          Status: Assessment Completed
        </span>
      </div>
    </div>
  </div>
);

export const BeneficiaryDocumentsTab = ({ beneficiary }) => (
  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5 animate-[fadeIn_0.2s_ease]">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-base sm:text-lg font-black text-[#0B2D6E]">Documents & Attachments</h3>
        <p className="text-xs text-slate-500">Official certificates, assessment reports, and verification forms.</p>
      </div>
      <button
        type="button"
        onClick={() => toast.success('Upload dialog: ready for PDF/JPG.')}
        className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer"
      >
        Upload File
      </button>
    </div>

    <div className="divide-y divide-slate-100 text-xs sm:text-[13px]">
      {[
        { title: 'National Population Birth Certificate', size: '1.2 MB', date: '03 Oct 2026' },
        { title: 'Primary School Admission Letter', size: '850 KB', date: '08 Oct 2026' },
        { title: 'Guardian Consent & Safeguarding Form', size: '620 KB', date: '03 Oct 2026' },
        { title: 'Community Leader Verification Letter', size: '440 KB', date: '29 Sep 2026' },
      ].map((doc, idx) => (
        <div key={idx} className="py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0">
              PDF
            </div>
            <div>
              <p className="font-bold text-slate-800">{doc.title}</p>
              <p className="text-slate-400 text-[11px]">{doc.size} • Uploaded {doc.date}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => toast.success(`Downloading ${doc.title}...`)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Download document"
          >
            <Download size={16} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export const BeneficiarySafeguardingTab = ({ beneficiary }) => (
  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 animate-[fadeIn_0.2s_ease]">
    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
      <div>
        <h3 className="text-base sm:text-lg font-black text-[#0B2D6E]">Consent & Child Safeguarding</h3>
        <p className="text-xs text-slate-500">Protection standards in compliance with the Child Rights Act.</p>
      </div>
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
        <Shield size={12} /> Safeguarding Cleared
      </span>
    </div>

    <div className="space-y-3 text-xs sm:text-[13px]">
      <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
        <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-emerald-950">Guardian Consent Executed</p>
          <p className="text-emerald-800 text-xs mt-0.5">
            Signed by {beneficiary.guardian || 'Mr. John Okafor'} with biometric signature capture on file.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <h4 className="font-bold text-slate-800">Child Protection Officer Sign-off</h4>
        <p className="text-slate-600 text-xs">
          Annual safeguarding evaluation completed. The beneficiary is in a safe learning environment with monitored attendance.
        </p>
        <span className="text-[11px] font-semibold text-slate-400">
          Last reviewed on 05 Oct 2026 by Dr. Mrs. Folasade Adeleke (CMAOF Child Protection Lead)
        </span>
      </div>
    </div>
  </div>
);
