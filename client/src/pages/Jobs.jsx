import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Search, Plus, MapPin, DollarSign, Clock, 
  Loader2, CheckCircle2, AlertCircle, Sparkles, Eye, UserCheck 
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [applyingId, setApplyingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Employer flow states
  const [showPostForm, setShowPostForm] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [jobSalary, setJobSalary] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobReqs, setJobReqs] = useState('');

  // Selected job applicants display (Employer)
  const [activeJobApplicants, setActiveJobApplicants] = useState(null);
  const [viewingApplicantsId, setViewingApplicantsId] = useState(null);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  // Authenticated user details
  const [userRole, setUserRole] = useState('jobseeker');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchJobsAndUserData();
  }, []);

  const fetchJobsAndUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Fetch user profile to know role
      const profileRes = await axios.get('http://localhost:5000/api/profiles/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (profileRes.data.success && profileRes.data.data) {
        setUserId(profileRes.data.data.user);
      }

      // Fetch user account from token to verify role
      const userRes = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (userRes.data.success) {
        setUserRole(userRes.data.data.role);
      }

      // Fetch jobs list
      const jobsRes = await axios.get('http://localhost:5000/api/jobs');
      let jobsData = jobsRes.data.data;

      // Seed jobs if empty
      if (jobsData.length === 0) {
        const mockJobs = [
          {
            title: 'Equipment Lease Advisory Associate',
            company: 'Vanguard Asset Finance',
            location: 'Lagos (Hybrid)',
            type: 'full-time',
            salaryRange: '₦350,000 - ₦500,000 / month',
            description: 'Responsible for lease transactions advisory, structuring operating leases, drafting contracts templates, and coordinating asset valuations.',
            requirements: ['Lease Structuring', 'Financial Modeling', 'Asset Valuation', 'Contract Negotiation']
          },
          {
            title: 'Credit Risk Analysis Officer',
            company: 'Continental Leasing Ltd',
            location: 'Abuja (On-site)',
            type: 'full-time',
            salaryRange: '₦400,000 - ₦600,000 / month',
            description: 'Evaluate lessee creditworthiness, analyze risk modeling metrics, audit company accounts records, and draft risk management mitigation portfolios.',
            requirements: ['Credit Risk Assessment', 'Financial Analysis', 'Auditing', 'Risk Management']
          },
          {
            title: 'Junior Frontend Developer (React/Vite)',
            company: 'CareerMAX Labs',
            location: 'Remote',
            type: 'contract',
            salaryRange: '₦200,000 - ₦300,000 / month',
            description: 'Help build and maintain responsive frontend layout components using React 19, tailwindcss, and RESTful API integrations.',
            requirements: ['React.js', 'Vite', 'TailwindCSS', 'RESTful API']
          }
        ];

        // Seed them. We will use employer = admin account or user ID
        for (const mock of mockJobs) {
          // Since mock needs an employer ID, the backend controller assigns it automatically
          await axios.post('http://localhost:5000/api/jobs', mock, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        const refreshedRes = await axios.get('http://localhost:5000/api/jobs');
        jobsData = refreshedRes.data.data;
      }

      setJobs(jobsData);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load recruitment data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    if (!jobTitle || !jobCompany || !jobLocation || !jobDesc) {
      return toast.error('Please fill in required fields');
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      const requirementsArray = jobReqs.split(',').map(s => s.trim()).filter(Boolean);

      const payload = {
        title: jobTitle,
        company: jobCompany,
        location: jobLocation,
        type: jobType,
        salaryRange: jobSalary,
        description: jobDesc,
        requirements: requirementsArray
      };

      const res = await axios.post('http://localhost:5000/api/jobs', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        toast.success('Job listing posted successfully!');
        setJobs([res.data.data, ...jobs]);
        // Reset form
        setJobTitle('');
        setJobCompany('');
        setJobLocation('');
        setJobType('full-time');
        setJobSalary('');
        setJobDesc('');
        setJobReqs('');
        setShowPostForm(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Posting failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      setApplyingId(jobId);
      const token = localStorage.getItem('token');
      const res = await axios.post(`http://localhost:5000/api/jobs/apply/${jobId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        toast.success(`Application submitted! AI Match rating: ${res.data.aiMatchScore}%`);
        // Refetch to update status
        fetchJobsAndUserData();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Application failed');
    } finally {
      setApplyingId(null);
    }
  };

  const handleViewApplicants = async (jobId) => {
    try {
      setViewingApplicantsId(jobId);
      setLoadingApplicants(true);
      setActiveJobApplicants(null);
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/jobs/${jobId}/applicants`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setActiveJobApplicants(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load applicant records');
    } finally {
      setLoadingApplicants(false);
    }
  };

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          j.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          j.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || j.type === selectedType;
    return matchesSearch && matchesType;
  });

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Recruitment Hub</h1>
          <p className="text-slate-400">
            {userRole === 'employer' 
              ? 'Post openings, review verified portfolios, and evaluate applicant compliance matching ratios.' 
              : 'Apply with your permanent profile and receive instantaneous AI application compatibility scoring.'}
          </p>
        </div>
        {userRole === 'employer' && (
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="bg-primary hover:bg-primary-hover text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Plus size={16} /> Post Job Opening
          </button>
        )}
      </div>

      {/* Post form (Employer Only) */}
      <AnimatePresence>
        {showPostForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass p-8 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl space-y-6"
          >
            <h3 className="text-xl font-bold">New Career Listing</h3>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Job Title (e.g. Finance Analyst)"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary"
                  required
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={jobCompany}
                  onChange={(e) => setJobCompany(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary"
                  required
                />
                <input
                  type="text"
                  placeholder="Location (e.g. Lagos, Remote)"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary"
                  required
                />
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary text-slate-400"
                >
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                  <option value="remote">Remote</option>
                </select>
                <input
                  type="text"
                  placeholder="Salary Range (e.g. ₦300k - ₦400k)"
                  value={jobSalary}
                  onChange={(e) => setJobSalary(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
                <input
                  type="text"
                  placeholder="Skills Requirements (comma separated, e.g. React, SQL)"
                  value={jobReqs}
                  onChange={(e) => setJobReqs(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <textarea
                placeholder="Job Description, benefits and tasks detail..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
                required
              />
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowPostForm(false)} className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/5">Cancel</button>
                <button type="submit" disabled={submitting} className="bg-primary px-6 py-2.5 rounded-xl text-xs font-bold text-white hover:bg-primary-hover flex items-center gap-1.5">
                  {submitting && <Loader2 className="animate-spin" size={14} />} Publish Post
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Listings Section (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search/Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex items-center flex-1">
              <Search size={18} className="absolute left-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search job titles, skills, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-white/10 rounded-2xl text-white outline-none focus:border-primary text-sm font-semibold"
              />
            </div>
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-white/10 gap-1 overflow-x-auto">
              {['all', 'full-time', 'part-time', 'contract', 'remote'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold capitalize whitespace-nowrap transition-all ${selectedType === t ? 'bg-primary text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Job Items */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-16 glass rounded-[2rem] border border-white/5">
                <Briefcase size={40} className="text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">No job openings found matching your criteria.</p>
              </div>
            ) : (
              filteredJobs.map((job) => {
                // Check if this candidate applied
                const hasApplied = job.applicants.some(app => app.user.toString() === userId || app.user === userId || app.user?._id === userId);
                const applicantRecord = job.applicants.find(app => app.user.toString() === userId || app.user === userId || app.user?._id === userId);
                const isOwner = job.employer === userId || job.employer?._id === userId;

                return (
                  <div key={job._id} className="glass p-8 rounded-[2.2rem] border border-white/5 space-y-4 shadow-xl hover:border-white/10 transition-all relative group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-bold text-white text-lg group-hover:text-primary transition-colors">{job.title}</h4>
                        <p className="text-sm text-slate-400 font-semibold">{job.company}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-400">
                        <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                        <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full flex items-center gap-1 capitalize"><Clock size={12} /> {job.type}</span>
                        {job.salaryRange && <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full flex items-center gap-1 text-emerald-400"><DollarSign size={12} /> {job.salaryRange}</span>}
                      </div>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed font-medium line-clamp-3">{job.description}</p>

                    {/* Requirements Tags */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {job.requirements.map((req, idx) => (
                          <span key={idx} className="bg-primary/5 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">
                            {req}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
                      {userRole === 'employer' ? (
                        <>
                          <div className="text-xs text-slate-500 font-semibold">
                            Applicants: <strong className="text-slate-300">{job.applicants.length}</strong>
                          </div>
                          {isOwner && (
                            <button
                              onClick={() => {
                                setViewingApplicantsId(job._id);
                                handleViewApplicants(job._id);
                              }}
                              className="bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-white px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                            >
                              <Eye size={14} /> Review Applicants
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          <div>
                            {hasApplied && (
                              <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                                <Sparkles size={12} /> AI Match Score: {applicantRecord?.aiMatchScore}%
                              </div>
                            )}
                          </div>
                          {hasApplied ? (
                            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 px-4 py-2.5">
                              <CheckCircle2 size={16} /> Applied Successfully
                            </div>
                          ) : (
                            <button
                              onClick={() => handleApply(job._id)}
                              disabled={applyingId === job._id}
                              className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all"
                            >
                              {applyingId === job._id ? <Loader2 className="animate-spin" size={14} /> : 'Apply with Profile'}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Applicants Review Panel (Employer only, 1 column) */}
        {userRole === 'employer' && (
          <div className="space-y-8">
            <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <UserCheck className="text-primary" size={20} /> Applicant Registry
              </h3>

              {loadingApplicants ? (
                <div className="flex py-12 items-center justify-center">
                  <Loader2 className="animate-spin text-primary" size={32} />
                </div>
              ) : activeJobApplicants ? (
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Total candidates ({activeJobApplicants.length})
                  </p>
                  {activeJobApplicants.length === 0 ? (
                    <p className="text-sm text-slate-400 italic">No candidates have applied for this listing yet.</p>
                  ) : (
                    activeJobApplicants.map((app, idx) => (
                      <div key={idx} className="p-4 bg-slate-950 border border-white/5 rounded-2xl space-y-2 relative group hover:border-white/10 transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-white text-sm">{app.user?.name}</h5>
                            <p className="text-[10px] text-slate-500 font-semibold">{app.user?.email}</p>
                          </div>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${app.aiMatchScore >= 80 ? 'bg-emerald-500/10 text-emerald-400' : app.aiMatchScore >= 50 ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {app.aiMatchScore}% Match
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          Applied: {new Date(app.appliedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 space-y-2">
                  <Eye className="mx-auto" size={24} />
                  <p className="text-xs font-medium max-w-[200px] mx-auto">Select "Review Applicants" on one of your posted listings to view submissions.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
