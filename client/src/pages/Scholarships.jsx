import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, Loader2, CheckCircle2, Award, Plus, 
  HelpCircle, Send, UserPlus, Users, GraduationCap, Percent 
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userRole, setUserRole] = useState('jobseeker');
  const [userId, setUserId] = useState('');

  // Form states
  const [activeNominationSch, setActiveNominationSch] = useState(null);
  const [nomNominator, setNomNominator] = useState('');
  const [nomCandidateName, setNomCandidateName] = useState('');
  const [nomCandidateEmail, setNomCandidateEmail] = useState('');
  const [nomReason, setNomReason] = useState('');

  // Sponsored pipeline view progress
  const [selectedPipeline, setSelectedPipeline] = useState(null);

  useEffect(() => {
    fetchScholarshipsAndUser();
  }, []);

  const fetchScholarshipsAndUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Fetch user profile
      const userRes = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (userRes.data.success) {
        setUserRole(userRes.data.data.role);
        setUserId(userRes.data.data._id);
      }

      // Fetch scholarships
      const schRes = await axios.get('http://localhost:5000/api/scholarships');
      let schData = schRes.data.data;

      // Seed scholarships if empty
      if (schData.length === 0) {
        const mockSchs = [
          {
            provider: 'Lagos State Government',
            title: 'Lagos Tech Talent Scholarship 2026',
            description: 'Funding direct learning programs and certifications for 5,000 residents in Software Engineering, Product Management and Data Analytics.',
            type: 'open',
            slotsAvailable: 5000,
            requirements: ['Lagos residency', 'Ages 18-35', 'Must complete assessment within 14 days'],
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          },
          {
            provider: 'Alafia Community Foundation',
            title: 'Alafia Female Tech Leaders Grant',
            description: 'A peer and community-nominated scholarship program granting full learning funding and mentoring to deserving female student leaders.',
            type: 'nomination',
            slotsAvailable: 100,
            requirements: ['Female candidate', 'Enrolled in an institution', 'Nominated by a school or NGO leader'],
            deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
          },
          {
            provider: 'Paystack Africa',
            title: 'Paystack Sponsored Fintech Pipeline',
            description: 'Sponsor funds learning and certification for a selected cohort of 200 developers. High performers gain direct employment entry.',
            type: 'sponsored-pipeline',
            slotsAvailable: 200,
            requirements: ['Pass basic logic test', 'Intermediate Javascript competency'],
            deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            sponsoredPipeline: {
              cohortSize: 200,
              learningPath: ['Advanced SQL', 'REST API Architectures', 'NodeJS Masterclass'],
              candidates: [
                { user: null, progressPercentage: 85, certified: true },
                { user: null, progressPercentage: 45, certified: false },
                { user: null, progressPercentage: 90, certified: true }
              ]
            }
          }
        ];

        // Seed
        for (const mock of mockSchs) {
          await axios.post('http://localhost:5000/api/scholarships', mock, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        const refreshedRes = await axios.get('http://localhost:5000/api/scholarships');
        schData = refreshedRes.data.data;
      }

      // Add actual user details to mock pipeline candidates for visualization
      const finalData = schData.map(s => {
        if (s.type === 'sponsored-pipeline' && s.sponsoredPipeline?.candidates) {
          s.sponsoredPipeline.candidates = s.sponsoredPipeline.candidates.map((c, i) => {
            const names = ['Chidi Okoro', 'Fatima Bello', 'Oluwaseun Alabi'];
            const emails = ['chidi@gmail.com', 'fatima@yahoo.com', 'seun@outlook.com'];
            return {
              ...c,
              mockName: names[i] || 'Candidate',
              mockEmail: emails[i] || 'candidate@gmail.com'
            };
          });
        }
        return s;
      });

      setScholarships(finalData);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load scholarship marketplace');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyOpen = async (schId) => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/scholarships/apply', { scholarshipId: schId }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Scholarship application submitted!');
        fetchScholarshipsAndUser();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Application failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNominateSubmit = async (e) => {
    e.preventDefault();
    if (!nomNominator || !nomCandidateName || !nomCandidateEmail || !nomReason) {
      return toast.error('Required fields missing');
    }

    try {
      setSubmitting(true);
      const payload = {
        scholarshipId: activeNominationSch._id,
        nominator: nomNominator,
        candidateName: nomCandidateName,
        candidateEmail: nomCandidateEmail,
        reason: nomReason
      };

      const res = await axios.post('http://localhost:5000/api/scholarships/nominate', payload);
      if (res.data.success) {
        toast.success(res.data.message || 'Nomination submitted successfully!');
        setNomNominator('');
        setNomCandidateName('');
        setNomCandidateEmail('');
        setNomReason('');
        setActiveNominationSch(null);
        fetchScholarshipsAndUser();
      }
    } catch (err) {
      console.error(err);
      toast.error('Nomination submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in text-slate-100 pb-12">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Scholarship Marketplace</h1>
        <p className="text-slate-400">Apply for funding, nominate deserving community members, or track sponsored enterprise pipelines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Listings (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          {scholarships.map((sch) => {
            const hasApplied = sch.applicants?.some(app => app.user === userId || app.user?.toString() === userId);
            return (
              <div key={sch._id} className="glass p-8 rounded-[2.2rem] border border-white/5 space-y-4 shadow-xl hover:border-white/10 transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${sch.type === 'open' ? 'bg-primary/10 border-primary/20 text-primary' : sch.type === 'nomination' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-purple-500/10 border-purple-500/20 text-purple-400'}`}>
                      {sch.type.replace('-', ' ')}
                    </span>
                    <h4 className="font-extrabold text-white text-lg group-hover:text-primary transition-colors mt-2">{sch.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold">Fund Provider: {sch.provider}</p>
                  </div>
                  <div className="text-left md:text-right shrink-0">
                    <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider">Slots Available</span>
                    <span className="text-white font-extrabold text-xl">{sch.slotsAvailable || 'N/A'}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed font-medium">{sch.description}</p>

                {/* Requirements */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Eligibility Criteria</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-400">
                    {sch.requirements?.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 font-medium">
                        <CheckCircle2 size={12} className="text-primary shrink-0" /> {req}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-2">
                  <div className="text-xs text-slate-500 font-semibold">
                    Deadline: <strong className="text-slate-300">{new Date(sch.deadline).toLocaleDateString()}</strong>
                  </div>

                  <div>
                    {sch.type === 'open' && (
                      hasApplied ? (
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 size={14} /> Applied</div>
                      ) : (
                        <button
                          onClick={() => handleApplyOpen(sch._id)}
                          className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
                        >
                          Apply Directly
                        </button>
                      )
                    )}

                    {sch.type === 'nomination' && (
                      <button
                        onClick={() => setActiveNominationSch(sch)}
                        className="bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 hover:border-amber-500 text-amber-400 hover:text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
                      >
                        Nominate Candidate
                      </button>
                    )}

                    {sch.type === 'sponsored-pipeline' && (
                      <button
                        onClick={() => setSelectedPipeline(sch)}
                        className="bg-purple-500/10 hover:bg-purple-500 border border-purple-500/20 hover:border-purple-500 text-purple-400 hover:text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                      >
                        <Users size={12} /> View Pipeline Progress
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Panel (Nominated Candidates & Sponsor Cohorts, 1 column) */}
        <div className="space-y-8">
          {/* Pipeline Tracker */}
          <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <GraduationCap className="text-primary" size={20} /> Cohort Pipeline Tracker
            </h3>
            
            {selectedPipeline ? (
              <div className="space-y-4">
                <div className="border-b border-white/5 pb-3">
                  <h5 className="font-extrabold text-white text-sm">{selectedPipeline.title}</h5>
                  <p className="text-[10px] text-slate-500 font-semibold">{selectedPipeline.provider}</p>
                </div>
                <div className="space-y-3">
                  {selectedPipeline.sponsoredPipeline?.candidates.map((cand, idx) => (
                    <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-white/5 space-y-2.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-xs text-slate-200 block">{cand.mockName}</strong>
                          <span className="text-[9px] text-slate-500 font-medium">{cand.mockEmail}</span>
                        </div>
                        {cand.certified ? (
                          <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                            <Award size={10} /> Certified
                          </span>
                        ) : (
                          <span className="text-[9px] font-semibold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">
                            In Learning
                          </span>
                        )}
                      </div>
                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase">
                          <span>Learning Progress</span>
                          <span className="text-primary">{cand.progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${cand.progressPercentage}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedPipeline(null)}
                  className="w-full py-2 border border-white/10 hover:bg-white/5 rounded-xl text-[10px] font-bold text-slate-400 hover:text-white transition-all"
                >
                  Clear Selection
                </button>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <Users className="mx-auto" size={24} />
                <p className="text-xs font-medium max-w-[200px] mx-auto">Select "View Pipeline Progress" on a sponsored pipeline program to track cohort analytics.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nomination Form Modal */}
      <AnimatePresence>
        {activeNominationSch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-[500px] glass border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative"
            >
              <form onSubmit={handleNominateSubmit} className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <UserPlus className="text-primary" size={22} /> Nominate Candidate
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveNominationSch(null)}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nominator / Institution Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Alafia High School, NGO Leader Name"
                      value={nomNominator}
                      onChange={(e) => setNomNominator(e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Candidate Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter nominee name"
                      value={nomCandidateName}
                      onChange={(e) => setNomCandidateName(e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Candidate Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter nominee email"
                      value={nomCandidateEmail}
                      onChange={(e) => setNomCandidateEmail(e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Reason for Nomination</label>
                    <textarea
                      placeholder="Explain why this candidate deserves this scholarship grant..."
                      value={nomReason}
                      onChange={(e) => setNomReason(e.target.value)}
                      rows={3}
                      className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-primary resize-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-white/5 pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveNominationSch(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
                  >
                    {submitting ? <Loader2 className="animate-spin animate-spin-fast" size={12} /> : <Send size={12} />}
                    Submit Nomination
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scholarships;
