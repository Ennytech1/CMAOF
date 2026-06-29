import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Video, Users, Briefcase, GraduationCap, 
  Search, Loader2, CheckCircle2, ChevronRight, Bookmark
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Learning = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModality, setSelectedModality] = useState('all');

  useEffect(() => {
    fetchCoursesAndProfile();
  }, []);

  const fetchCoursesAndProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch courses
      const courseRes = await axios.get('http://localhost:5000/api/courses');
      let courseData = courseRes.data.data;

      // Seed mock courses if DB is empty
      if (courseData.length === 0) {
        const mockCourses = [
          {
            title: 'Modern Product Management in Africa',
            description: 'Learn framework methodologies, design thinking, and launch planning metrics tailored for the African tech market ecosystem.',
            instructor: 'Adebayo Johnson',
            modality: 'self-paced',
            price: 45000,
            curriculum: ['Introduction to Product Design', 'Product Market Fit', 'User Research & Personas', 'Metrics & Product Analytics'],
            duration: '6 weeks'
          },
          {
            title: 'Data Analysis & Business Intelligence (Vite Class)',
            description: 'Master SQL, power BI, database modeling, and predictive modeling for business decision making.',
            instructor: 'Ezenwa Obi',
            modality: 'virtual-class',
            price: 75000,
            curriculum: ['SQL Basics & Aggregations', 'Advanced SQL Queries', 'Power BI Dashboard Creation', 'Business Communication'],
            duration: '8 weeks'
          },
          {
            title: 'Equipment Leasing & Asset Finance Workshop',
            description: 'Comprehensive physical training covering lease structuring, credit analysis, asset valuation, and regulatory guidelines in Nigeria.',
            instructor: 'ACC Council Faculty',
            modality: 'physical-workshop',
            price: 120000,
            curriculum: ['Lease vs Buy Analysis', 'Risk Management Frameworks', 'Equipment Valuation Guidelines', 'Nigerian Leasing Laws'],
            duration: '3 days'
          },
          {
            title: 'Full-Stack Software Engineering Internship',
            description: 'Participate in structured, practical teamwork cohorts building real-world enterprise applications using React, Node.js and MongoDB.',
            instructor: 'CareerMAX Labs',
            modality: 'internship',
            price: 0, // Free
            curriculum: ['Agile Teamwork Workflows', 'Database Design & Optimization', 'Secure REST API Integration', 'Deployment & CI/CD Pipelines'],
            duration: '3 months'
          }
        ];

        // Seed them sequentially
        for (const mock of mockCourses) {
          await axios.post('http://localhost:5000/api/courses', mock, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        // Refetch
        const refreshedRes = await axios.get('http://localhost:5000/api/courses');
        courseData = refreshedRes.data.data;
      }

      setCourses(courseData);

      // Fetch user profile to see what they are already enrolled in
      const profileRes = await axios.get('http://localhost:5000/api/profiles/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (profileRes.data.success && profileRes.data.data) {
        const records = profileRes.data.data.learningRecords || [];
        setEnrolledIds(records.map(r => r.course._id || r.course));
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load courses catalogue');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      setEnrollingId(courseId);
      const token = localStorage.getItem('token');
      const res = await axios.post(`http://localhost:5000/api/courses/enroll/${courseId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Successfully enrolled!');
        setEnrolledIds([...enrolledIds, courseId]);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrollingId(null);
    }
  };

  const getModalityIcon = (modality) => {
    switch (modality) {
      case 'self-paced':
        return <BookOpen size={16} />;
      case 'virtual-class':
        return <Video size={16} />;
      case 'physical-workshop':
        return <Users size={16} />;
      case 'internship':
        return <Briefcase size={16} />;
      default:
        return <GraduationCap size={16} />;
    }
  };

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModality = selectedModality === 'all' || c.modality === selectedModality;
    return matchesSearch && matchesModality;
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
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Learning Marketplace</h1>
          <p className="text-slate-400">Discover premium courses, virtual classes, and specialized workshops to master new skills.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-900/50 border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-3">
            <span className="text-2xl font-black text-primary">{enrolledIds.length}</span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">My Programs</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex items-center flex-1">
          <Search size={18} className="absolute left-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search programs, modules, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-white/10 rounded-2xl text-white outline-none focus:border-primary transition-all text-sm font-medium"
          />
        </div>
        {/* Modality Selector */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-white/10 overflow-x-auto gap-1">
          {['all', 'self-paced', 'virtual-class', 'physical-workshop', 'internship'].map((mod) => (
            <button
              key={mod}
              onClick={() => setSelectedModality(mod)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap capitalize transition-all ${selectedModality === mod ? 'bg-primary text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              {mod.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center py-16 glass rounded-3xl border border-white/5">
            <BookOpen size={48} className="text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No learning programs found matching your filters.</p>
          </div>
        ) : (
          filteredCourses.map((course) => {
            const isEnrolled = enrolledIds.includes(course._id);
            return (
              <motion.div
                key={course._id}
                layout
                className="glass rounded-[2.2rem] border border-white/5 overflow-hidden flex flex-col justify-between shadow-xl relative hover:border-white/10 transition-all group"
              >
                {/* Modality Tag & Price */}
                <div className="p-8 pb-4 flex justify-between items-center">
                  <span className="bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    {getModalityIcon(course.modality)}
                    {course.modality.replace('-', ' ')}
                  </span>
                  <span className="text-lg font-black text-white">
                    {course.price === 0 ? 'Free' : `₦${course.price.toLocaleString()}`}
                  </span>
                </div>

                {/* Course Details */}
                <div className="p-8 pt-2 space-y-4 flex-1">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed line-clamp-3">{course.description}</p>
                  
                  <div className="flex items-center gap-6 text-xs text-slate-400 pt-2 border-t border-white/5">
                    <div>
                      <span className="font-semibold text-slate-500">Instructor: </span>
                      <span className="text-slate-300 font-medium">{course.instructor}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Duration: </span>
                      <span className="text-slate-300 font-medium">{course.duration}</span>
                    </div>
                  </div>

                  {/* Syllabus / Curriculum preview */}
                  <div className="space-y-2 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <Bookmark size={12} /> Modules Covered
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {course.curriculum.slice(0, 4).map((mod, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-400">
                          <ChevronRight size={12} className="text-primary shrink-0" />
                          <span className="truncate">{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enrollment Button */}
                <div className="p-8 pt-0 mt-auto">
                  {isEnrolled ? (
                    <div className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 size={16} /> Enrolled
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course._id)}
                      disabled={enrollingId === course._id}
                      className="w-full bg-white/5 border border-white/10 hover:bg-primary hover:border-primary text-white py-3.5 rounded-2xl text-sm font-bold transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      {enrollingId === course._id ? <Loader2 className="animate-spin" size={16} /> : 'Enroll in Program'}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Learning;
