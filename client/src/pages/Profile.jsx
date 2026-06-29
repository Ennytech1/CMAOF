import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Camera, Loader2, Save, Sparkles, 
  Briefcase, GraduationCap, Award, FolderHeart, Plus, Trash2, 
  CheckCircle2, AlertCircle, TrendingUp
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
  const { user, updateProfile: updateAccountCredentials } = useAuth();
  const [activeTab, setActiveTab] = useState('cv'); // 'cv' or 'settings'
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // Profile data state
  const [headline, setHeadline] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [aiScore, setAiScore] = useState(0);

  // AI suggestions state
  const [aiSuggestions, setAiSuggestions] = useState(null);

  // Account settings state
  const [accountName, setAccountName] = useState(user?.name || '');
  const [accountEmail, setAccountEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Temp form states for adding items
  const [showExpForm, setShowExpForm] = useState(false);
  const [expCompany, setExpCompany] = useState('');
  const [expRole, setExpRole] = useState('');
  const [expStart, setExpStart] = useState('');
  const [expEnd, setExpEnd] = useState('');
  const [expDesc, setExpDesc] = useState('');

  const [showEduForm, setShowEduForm] = useState(false);
  const [eduInst, setEduInst] = useState('');
  const [eduDegree, setEduDegree] = useState('');
  const [eduYear, setEduYear] = useState('');

  const [showProjForm, setShowProjForm] = useState(false);
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projLink, setProjLink] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/profiles/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success && res.data.data) {
        const p = res.data.data;
        setHeadline(p.headline || '');
        setSummary(p.summary || '');
        setSkills(p.skills || []);
        setExperience(p.experience || []);
        setEducation(p.education || []);
        setPortfolioProjects(p.portfolioProjects || []);
        setCertificates(p.certificates || []);
        setAiScore(p.aiReadinessScore || 0);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load profile details');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCV = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      const payload = {
        headline,
        summary,
        skills,
        experience,
        education,
        portfolioProjects
      };

      const res = await axios.put('http://localhost:5000/api/profiles/me', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        toast.success('Career Profile updated successfully!');
        setAiScore(res.data.data.aiReadinessScore || 0);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to save profile changes');
    } finally {
      setSaving(false);
    }
  };

  const handleTriggerAI = async () => {
    try {
      setAiLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/profiles/ai-optimize', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setAiSuggestions(res.data);
        toast.success('AI Optimization scan complete!');
      }
    } catch (err) {
      console.error(err);
      toast.error('AI Scan failed');
    } finally {
      setAiLoading(false);
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (skills.some(s => s.name.toLowerCase() === newSkill.toLowerCase().trim())) {
      return toast.error('Skill already added');
    }
    setSkills([...skills, { name: newSkill.trim(), isVerified: false }]);
    setNewSkill('');
  };

  const handleRemoveSkill = (indexToRemove) => {
    setSkills(skills.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    if (!expCompany || !expRole || !expStart) return toast.error('Required fields missing');
    const newExp = {
      company: expCompany,
      role: expRole,
      startDate: expStart,
      endDate: expEnd || null,
      description: expDesc
    };
    setExperience([...experience, newExp]);
    // Reset form
    setExpCompany('');
    setExpRole('');
    setExpStart('');
    setExpEnd('');
    setExpDesc('');
    setShowExpForm(false);
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    if (!eduInst || !eduDegree || !eduYear) return toast.error('Required fields missing');
    const newEdu = {
      institution: eduInst,
      degree: eduDegree,
      year: parseInt(eduYear)
    };
    setEducation([...education, newEdu]);
    setEduInst('');
    setEduDegree('');
    setEduYear('');
    setShowEduForm(false);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!projTitle || !projDesc) return toast.error('Required fields missing');
    const newProj = {
      title: projTitle,
      description: projDesc,
      link: projLink,
      images: []
    };
    setPortfolioProjects([...portfolioProjects, newProj]);
    setProjTitle('');
    setProjDesc('');
    setProjLink('');
    setShowProjForm(false);
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    try {
      setSaving(true);
      await updateAccountCredentials({ name: accountName, email: accountEmail, password });
      toast.success('Account credentials updated!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
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
      {/* Header and Cover Banner */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-r from-slate-900 via-slate-800 to-purple-900/40 p-8 border border-white/5 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-28 h-28 bg-gradient-to-br from-primary to-purple-600 rounded-3xl flex items-center justify-center text-4xl font-bold text-white shadow-2xl border-4 border-white/10 shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left space-y-2 flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{user?.name}</h1>
            <p className="text-slate-400 font-medium text-lg">{headline || 'Add your professional headline...'}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-semibold text-slate-400">
              <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                Role: <span className="text-primary capitalize">{user?.role}</span>
              </span>
              <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                Subscription: <span className="text-purple-400 capitalize">{user?.subscriptionTier || 'Free'}</span>
              </span>
            </div>
          </div>
          {/* AI Score Radial */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-3xl text-center flex flex-col items-center shrink-0">
            <div className="relative flex items-center justify-center mb-2">
              <span className="text-3xl font-extrabold text-primary">{aiScore}%</span>
            </div>
            <p className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1">
              <Sparkles size={14} className="text-yellow-400" /> AI CV Readiness
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex gap-4 border-b border-white/5 pb-2">
        <button
          onClick={() => setActiveTab('cv')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'cv' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
        >
          Dynamic CV & Portfolio
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'settings' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
        >
          Security & Account
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'cv' ? (
          <motion.div
            key="cv-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* CV Editor (2 columns) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Headline & Bio */}
              <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-6 shadow-xl">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <User className="text-primary" size={20} /> About Me
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Headline</label>
                    <input
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="e.g. Senior Frontend Developer | React Specialist"
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 text-slate-200 outline-none focus:border-primary transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Professional Summary</label>
                    <textarea
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Describe your professional career journey and skill strengths..."
                      rows={4}
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 text-slate-200 outline-none focus:border-primary transition-all text-sm font-medium resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-6 shadow-xl">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Award className="text-primary" size={20} /> Professional Skills
                </h3>
                <form onSubmit={handleAddSkill} className="flex gap-4">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill (e.g. Node.js, Financial Modeling)"
                    className="flex-1 bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 text-slate-200 outline-none focus:border-primary transition-all text-sm font-medium"
                  />
                  <button type="submit" className="bg-primary/20 hover:bg-primary text-white border border-primary/20 px-6 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg hover:shadow-primary/30">
                    <Plus size={16} /> Add
                  </button>
                </form>
                <div className="flex flex-wrap gap-2.5">
                  {skills.length === 0 ? (
                    <p className="text-slate-400 text-sm italic">No skills added yet.</p>
                  ) : (
                    skills.map((skill, idx) => (
                      <span key={idx} className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-semibold ${skill.isVerified ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-300'}`}>
                        {skill.isVerified && <CheckCircle2 size={12} />}
                        {skill.name}
                        {skill.isVerified && <span className="bg-emerald-500/20 text-[9px] px-1 py-0.5 rounded text-emerald-300">{skill.verifiedBy}</span>}
                        <button type="button" onClick={() => handleRemoveSkill(idx)} className="hover:text-red-500 text-slate-500 transition-colors ml-1">
                          <Trash2 size={12} />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Experience List */}
              <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-6 shadow-xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Briefcase className="text-primary" size={20} /> Work History
                  </h3>
                  <button
                    onClick={() => setShowExpForm(!showExpForm)}
                    className="bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Plus size={14} /> Add Job
                  </button>
                </div>

                {showExpForm && (
                  <form onSubmit={handleAddExperience} className="p-6 bg-slate-950 rounded-2xl border border-white/5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={expCompany}
                        onChange={(e) => setExpCompany(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-primary"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Role / Designation"
                        value={expRole}
                        onChange={(e) => setExpRole(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-primary"
                        required
                      />
                      <input
                        type="date"
                        value={expStart}
                        onChange={(e) => setExpStart(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-400 outline-none focus:border-primary"
                        required
                      />
                      <input
                        type="date"
                        value={expEnd}
                        onChange={(e) => setExpEnd(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-400 outline-none focus:border-primary"
                      />
                    </div>
                    <textarea
                      placeholder="Describe your job achievements and core tasks..."
                      value={expDesc}
                      onChange={(e) => setExpDesc(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-primary resize-none"
                    />
                    <div className="flex gap-2 justify-end">
                      <button type="button" onClick={() => setShowExpForm(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/5 transition-all">Cancel</button>
                      <button type="submit" className="bg-primary px-4 py-2 rounded-xl text-xs font-bold text-white hover:bg-primary-hover transition-all">Add Job</button>
                    </div>
                  </form>
                )}

                <div className="space-y-4">
                  {experience.length === 0 ? (
                    <p className="text-slate-400 text-sm italic">No work history added yet.</p>
                  ) : (
                    experience.map((exp, idx) => (
                      <div key={idx} className="flex gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl items-start relative group">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                          <Briefcase size={20} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-bold text-white text-base">{exp.role}</h4>
                          <p className="text-slate-400 text-sm font-semibold">{exp.company}</p>
                          <p className="text-slate-500 text-xs font-medium">
                            {new Date(exp.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'Present'}
                          </p>
                          {exp.description && <p className="text-slate-400 text-sm mt-2">{exp.description}</p>}
                        </div>
                        <button
                          onClick={() => setExperience(experience.filter((_, i) => i !== idx))}
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Education List */}
              <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-6 shadow-xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <GraduationCap className="text-primary" size={20} /> Academic History
                  </h3>
                  <button
                    onClick={() => setShowEduForm(!showEduForm)}
                    className="bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Plus size={14} /> Add School
                  </button>
                </div>

                {showEduForm && (
                  <form onSubmit={handleAddEducation} className="p-6 bg-slate-950 rounded-2xl border border-white/5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Institution Name"
                        value={eduInst}
                        onChange={(e) => setEduInst(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-primary"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Degree / Field of Study"
                        value={eduDegree}
                        onChange={(e) => setEduDegree(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-primary"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Graduation Year"
                        value={eduYear}
                        onChange={(e) => setEduYear(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button type="button" onClick={() => setShowEduForm(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/5 transition-all">Cancel</button>
                      <button type="submit" className="bg-primary px-4 py-2 rounded-xl text-xs font-bold text-white hover:bg-primary-hover transition-all">Add Education</button>
                    </div>
                  </form>
                )}

                <div className="space-y-4">
                  {education.length === 0 ? (
                    <p className="text-slate-400 text-sm italic">No academic credentials added yet.</p>
                  ) : (
                    education.map((edu, idx) => (
                      <div key={idx} className="flex gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl items-start relative group">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                          <GraduationCap size={20} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-bold text-white text-base">{edu.degree}</h4>
                          <p className="text-slate-400 text-sm font-semibold">{edu.institution}</p>
                          <p className="text-slate-500 text-xs font-medium">Graduated: {edu.year}</p>
                        </div>
                        <button
                          onClick={() => setEducation(education.filter((_, i) => i !== idx))}
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Portfolio Projects */}
              <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-6 shadow-xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <FolderHeart className="text-primary" size={20} /> Portfolio Projects
                  </h3>
                  <button
                    onClick={() => setShowProjForm(!showProjForm)}
                    className="bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Plus size={14} /> Add Project
                  </button>
                </div>

                {showProjForm && (
                  <form onSubmit={handleAddProject} className="p-6 bg-slate-950 rounded-2xl border border-white/5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={projTitle}
                        onChange={(e) => setProjTitle(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-primary"
                        required
                      />
                      <input
                        type="url"
                        placeholder="Project Link (Optional)"
                        value={projLink}
                        onChange={(e) => setProjLink(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-primary"
                      />
                    </div>
                    <textarea
                      placeholder="Describe what the project builds, and technologies utilized..."
                      value={projDesc}
                      onChange={(e) => setProjDesc(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-primary resize-none"
                      required
                    />
                    <div className="flex gap-2 justify-end">
                      <button type="button" onClick={() => setShowProjForm(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/5 transition-all">Cancel</button>
                      <button type="submit" className="bg-primary px-4 py-2 rounded-xl text-xs font-bold text-white hover:bg-primary-hover transition-all">Add Project</button>
                    </div>
                  </form>
                )}

                <div className="space-y-4">
                  {portfolioProjects.length === 0 ? (
                    <p className="text-slate-400 text-sm italic">No portfolio projects added yet.</p>
                  ) : (
                    portfolioProjects.map((proj, idx) => (
                      <div key={idx} className="flex gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl items-start relative group">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                          <FolderHeart size={20} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-white text-base">{proj.title}</h4>
                            {proj.link && (
                              <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                View live site
                              </a>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm mt-2">{proj.description}</p>
                        </div>
                        <button
                          onClick={() => setPortfolioProjects(portfolioProjects.filter((_, i) => i !== idx))}
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Save Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleSaveCV}
                  disabled={saving}
                  className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  Save Career Profile
                </button>
              </div>
            </div>

            {/* Sidebar (Certifications & AI Scan Panel) */}
            <div className="space-y-8">
              {/* Credentials / Badges */}
              <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-6 shadow-xl">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Award className="text-primary" size={20} /> Verified Badges
                </h3>
                <div className="space-y-4">
                  {certificates.length === 0 ? (
                    <p className="text-slate-400 text-sm italic">No verified credentials earned yet. Head to the Certifications Centre to take an exam.</p>
                  ) : (
                    certificates.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                          <CheckCircle2 size={20} />
                        </div>
                        <div className="overflow-hidden flex-1">
                          <p className="text-sm font-bold text-white truncate">{cert.title}</p>
                          <p className="text-xs text-slate-500 truncate">{cert.issuingAuthority}</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
                          Verified
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* AI Optimiser Scan Panel */}
              <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-6 shadow-xl relative overflow-hidden bg-gradient-to-br from-slate-900 to-purple-950/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="text-yellow-400" size={20} /> AI CV Optimizer
                </h3>
                <p className="text-sm text-slate-400">
                  Scan your current profile components for structural gaps, ATS validation scores, and career recommendations.
                </p>

                <button
                  type="button"
                  onClick={handleTriggerAI}
                  disabled={aiLoading}
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary-hover hover:to-purple-700 text-white py-3 px-4 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  {aiLoading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                  Run AI Optimizer Scan
                </button>

                {aiSuggestions && (
                  <div className="space-y-4 mt-6 animate-fade-in border-t border-white/5 pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-white">ATS Score:</span>
                      <span className="text-lg font-extrabold text-primary">{aiSuggestions.readinessScore}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                      <TrendingUp size={14} className="text-primary" /> Market Demand: 
                      <span className="text-emerald-400 capitalize">{aiSuggestions.marketDemandEstimate}</span>
                    </div>

                    <div className="space-y-3 mt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Recommendations</p>
                      {aiSuggestions.suggestions.map((sug) => (
                        <div key={sug.id} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-start gap-2.5">
                          <AlertCircle size={16} className={`shrink-0 mt-0.5 ${sug.priority === 'High' ? 'text-rose-400' : 'text-amber-400'}`} />
                          <p className="text-xs text-slate-300 font-medium leading-relaxed">{sug.tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="settings-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col items-center"
          >
            <div className="w-full max-w-[800px] p-8 md:p-12 glass rounded-[2.5rem] shadow-xl border border-white/5">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-2 tracking-tight">Security Credentials</h2>
                <p className="text-slate-400">Manage your private account details and password configuration</p>
              </div>

              <form onSubmit={handleAccountSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">Full Name</label>
                    <div className="relative flex items-center">
                      <User size={18} className="absolute left-4 text-slate-500" />
                      <input 
                        type="text" 
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white outline-none focus:border-primary transition-all font-medium text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">Email Address</label>
                    <div className="relative flex items-center">
                      <Mail size={18} className="absolute left-4 text-slate-500" />
                      <input 
                        type="email" 
                        value={accountEmail}
                        onChange={(e) => setAccountEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white outline-none focus:border-primary transition-all font-medium text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">New Password</label>
                    <div className="relative flex items-center">
                      <Lock size={18} className="absolute left-4 text-slate-500" />
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white outline-none focus:border-primary transition-all font-medium text-sm"
                        placeholder="Leave blank to keep current"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">Confirm New Password</label>
                    <div className="relative flex items-center">
                      <Lock size={18} className="absolute left-4 text-slate-500" />
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white outline-none focus:border-primary transition-all font-medium text-sm"
                        placeholder="Leave blank to keep current"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Update Credentials
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
