const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    altCode: {
      type: String,
      trim: true,
      default: '',
    },
    name: {
      type: String,
      required: [true, 'Please provide beneficiary name'],
      trim: true,
    },
    photo: {
      type: String,
      default: '/images/banner_schoolgirl.jpg',
    },
    type: {
      type: String,
      enum: ['Student', 'Patient', 'Elderly', 'Youth', 'Community Leader', 'Artisan', 'Household Head', 'Vulnerable Child', 'Widow', 'Scholar'],
      default: 'Student',
    },
    tag: {
      type: String,
      default: 'Student',
    },
    caseTag: {
      type: String,
      enum: ['Active', 'Pending Assessment', 'Follow-up Due', 'Discharged', 'Escalated', 'Archived'],
      default: 'Active',
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    age: {
      type: String,
      default: '',
    },
    ageGender: {
      type: String,
      default: '',
    },
    dob: {
      type: String,
      default: '',
    },
    pillar: {
      type: String,
      enum: ['Education', 'Healthcare', 'Community', 'Youth Empowerment', 'Emergency Relief'],
      required: true,
    },
    pillarFull: {
      type: String,
      default: '',
    },
    pillarTagline: {
      type: String,
      default: '',
    },
    programme: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      required: true,
    },
    fullLocation: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    nationality: {
      type: String,
      default: 'Nigerian',
    },
    idType: {
      type: String,
      default: 'National ID',
    },
    idNumber: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    dateRegistered: {
      type: String,
      default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    },
    status: {
      type: String,
      enum: ['Assessment', 'Approved', 'Active', 'Monitoring', 'Graduated', 'Under Review'],
      default: 'Assessment',
    },
    priorityLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'High',
    },
    assignedOfficer: {
      type: String,
      default: 'Hauwa Bello',
    },
    household: {
      size: { type: Number, default: 4 },
      head: { type: String, default: 'Parent' },
      guardianName: { type: String, default: '' },
      contactNumber: { type: String, default: '' },
      householdType: { type: String, default: 'Low-income' },
      address: { type: String, default: '' },
    },
    needsAssessment: {
      schoolStatus: { type: String, default: 'Enrolled' },
      currentClass: { type: String, default: 'Primary 4' },
      academicPerformance: { type: String, default: 'Average' },
      priorityLevel: { type: String, default: 'High' },
      grantEstimated: { type: String, default: '180,000' },
      notes: { type: String, default: '' },
    },
    interventionsHistory: [
      {
        id: String,
        date: String,
        intervention: String,
        programme: String,
        valueType: String,
        status: String,
        providedBy: String,
        notes: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Fallback in-memory store initialized with seed beneficiaries
const initialSeedBeneficiaries = [
  {
    _id: 'ben_1',
    code: 'B-2026-001',
    altCode: 'IB-2026-001',
    name: 'Aisha Mohammed',
    photo: '/images/banner_schoolgirl.jpg',
    type: 'Student',
    tag: 'Student',
    caseTag: 'Active',
    gender: 'Female',
    age: '16 years',
    ageGender: '16/F',
    dob: '12 Jan 2010 (16 years)',
    pillar: 'Education',
    pillarFull: 'Education & Human Capital',
    pillarTagline: 'Learn • Develop • Excel',
    programme: 'School Support Programme',
    location: 'Kano',
    state: 'Kano State',
    fullLocation: 'Kano, Kano State',
    address: 'Unguwa Dosa, Kano, Kano State',
    nationality: 'Nigerian',
    idType: 'National ID',
    idNumber: '3214 5678 9012',
    phone: '0803 123 4567',
    dateRegistered: '06 Oct 2026',
    status: 'Assessment',
    priorityLevel: 'High',
    assignedOfficer: 'Hauwa Bello',
    household: {
      size: 5,
      head: 'Father',
      guardianName: 'Mohammed Yusuf',
      contactNumber: '0803 987 6543',
      householdType: 'Low-income',
      address: 'Unguwa Dosa, Kano',
    },
    interventionsHistory: [
      {
        id: 'int-1',
        date: '15 Oct 2026',
        intervention: 'School Fees Support',
        programme: 'School Support Programme',
        valueType: '₦150,000',
        status: 'Completed',
        providedBy: 'CMAOF',
        notes: 'Paid for SS2 school fees and learning materials',
      },
    ],
    createdAt: new Date('2026-10-06T10:00:00Z'),
  },
  {
    _id: 'ben_2',
    code: 'B-2026-002',
    altCode: 'IB-2026-002',
    name: 'Chukwudi Eze',
    photo: '/images/event_medical_doctor.jpg',
    type: 'Patient',
    tag: 'Patient',
    caseTag: 'Follow-up Due',
    gender: 'Male',
    age: '42 years',
    ageGender: '42/M',
    dob: '04 Mar 1984 (42 years)',
    pillar: 'Healthcare',
    pillarFull: 'Primary Health & Care',
    pillarTagline: 'Heal • Prevent • Support',
    programme: 'Mobile Health Clinics',
    location: 'Enugu',
    state: 'Enugu State',
    fullLocation: 'Enugu, Enugu State',
    address: 'Independence Layout, Enugu',
    nationality: 'Nigerian',
    idType: 'Voters Card',
    idNumber: '7890 1234 5678',
    phone: '0802 345 6789',
    dateRegistered: '12 Sep 2026',
    status: 'Active',
    priorityLevel: 'Critical',
    assignedOfficer: 'Dr. Obinna Okafor',
    household: {
      size: 6,
      head: 'Self',
      guardianName: 'Ngozi Eze',
      contactNumber: '0802 987 1122',
      householdType: 'Vulnerable',
      address: 'Enugu State',
    },
    interventionsHistory: [
      {
        id: 'int-2',
        date: '20 Sep 2026',
        intervention: 'Hypertension Medication & Monitoring',
        programme: 'Mobile Health Clinics',
        valueType: '₦75,000',
        status: 'Active',
        providedBy: 'CMAOF Health Team',
        notes: 'Routine medical delivery & monthly vitals follow-up',
      },
    ],
    createdAt: new Date('2026-09-12T09:30:00Z'),
  },
  {
    _id: 'ben_3',
    code: 'B-2026-003',
    altCode: 'IB-2026-003',
    name: 'Fatima Aliyu',
    photo: '/images/hero_community.jpg',
    type: 'Youth',
    tag: 'Scholar',
    caseTag: 'Active',
    gender: 'Female',
    age: '21 years',
    ageGender: '21/F',
    dob: '18 Jun 2005 (21 years)',
    pillar: 'Education',
    pillarFull: 'Tertiary Scholarships',
    pillarTagline: 'Learn • Develop • Excel',
    programme: 'CMAOF Undergraduate Merit Scheme',
    location: 'Kaduna',
    state: 'Kaduna State',
    fullLocation: 'Kaduna Central, Kaduna State',
    address: 'Barnawa, Kaduna',
    nationality: 'Nigerian',
    idType: 'National ID',
    idNumber: '9988 7766 5544',
    phone: '0813 456 7890',
    dateRegistered: '01 Aug 2026',
    status: 'Approved',
    priorityLevel: 'High',
    assignedOfficer: 'Ibrahim Sani',
    household: {
      size: 4,
      head: 'Mother',
      guardianName: 'Halima Aliyu',
      contactNumber: '0813 222 3344',
      householdType: 'Single Parent',
      address: 'Barnawa, Kaduna',
    },
    interventionsHistory: [
      {
        id: 'int-3',
        date: '10 Aug 2026',
        intervention: 'Year 2 Tuition & Laptop Grant',
        programme: 'CMAOF Merit Scheme',
        valueType: '₦450,000',
        status: 'Completed',
        providedBy: 'CMAOF Education Pillar',
        notes: 'First-class standing in Computer Engineering at ABU Zaria',
      },
    ],
    createdAt: new Date('2026-08-01T14:00:00Z'),
  },
  {
    _id: 'ben_4',
    code: 'B-2026-004',
    altCode: 'IB-2026-004',
    name: 'Babajide Adeleke',
    photo: '/images/banner_schoolgirl.jpg',
    type: 'Artisan',
    tag: 'Community',
    caseTag: 'Active',
    gender: 'Male',
    age: '29 years',
    ageGender: '29/M',
    dob: '10 Nov 1996 (29 years)',
    pillar: 'Community',
    pillarFull: 'Community Resilience & Livelihoods',
    pillarTagline: 'Empower • Rebuild • Sustain',
    programme: 'Micro-Enterprise Equipment Grant',
    location: 'Ilara-Mokin',
    state: 'Ondo State',
    fullLocation: 'Ilara-Mokin, Ondo State',
    address: 'Adekunle Ajasin Way, Ilara-Mokin',
    nationality: 'Nigerian',
    idType: 'Driver License',
    idNumber: 'KTU 12498 AA',
    phone: '0805 789 0123',
    dateRegistered: '18 Jul 2026',
    status: 'Active',
    priorityLevel: 'Medium',
    assignedOfficer: 'Sunday Olawale',
    household: {
      size: 3,
      head: 'Self',
      guardianName: 'Funmilayo Adeleke',
      contactNumber: '0805 111 2233',
      householdType: 'Low-income',
      address: 'Ilara-Mokin, Ondo',
    },
    interventionsHistory: [
      {
        id: 'int-4',
        date: '02 Aug 2026',
        intervention: 'Solar Inverter & Metal Fabrication Tools',
        programme: 'Micro-Enterprise Grant',
        valueType: '₦680,000',
        status: 'Completed',
        providedBy: 'CMAOF Community Development',
        notes: 'Successfully expanded workshop to employ 2 apprentices',
      },
    ],
    createdAt: new Date('2026-07-18T11:15:00Z'),
  },
];

let memoryBeneficiaries = [...initialSeedBeneficiaries];

const BeneficiaryModel = mongoose.model('Beneficiary', beneficiarySchema);

BeneficiaryModel.inMemory = {
  create: async (data) => {
    const seq = Math.floor(100 + Math.random() * 900);
    const code = data.code || `B-2026-${seq}`;
    const record = {
      _id: 'ben_' + Date.now(),
      code,
      altCode: `IB-${code.replace('B-', '')}`,
      ...data,
      dateRegistered: data.dateRegistered || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryBeneficiaries.unshift(record);
    return record;
  },
  find: async (query = {}) => {
    let result = [...memoryBeneficiaries];
    if (query.pillar && query.pillar !== 'All') {
      result = result.filter((b) => b.pillar.toLowerCase() === query.pillar.toLowerCase());
    }
    if (query.status && query.status !== 'All') {
      result = result.filter((b) => b.status.toLowerCase() === query.status.toLowerCase());
    }
    if (query.state && query.state !== 'All') {
      result = result.filter((b) => b.state.toLowerCase().includes(query.state.toLowerCase()));
    }
    if (query.search) {
      const q = query.search.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.code.toLowerCase().includes(q) ||
          b.state.toLowerCase().includes(q) ||
          b.programme.toLowerCase().includes(q) ||
          (b.phone && b.phone.includes(q))
      );
    }
    return result;
  },
  findById: async (id) => {
    return memoryBeneficiaries.find((b) => b._id === id || b.code === id || String(b.id) === id);
  },
  findByIdAndUpdate: async (id, update) => {
    const idx = memoryBeneficiaries.findIndex((b) => b._id === id || b.code === id);
    if (idx === -1) return null;
    memoryBeneficiaries[idx] = { ...memoryBeneficiaries[idx], ...update, updatedAt: new Date() };
    return memoryBeneficiaries[idx];
  },
  findByIdAndDelete: async (id) => {
    const idx = memoryBeneficiaries.findIndex((b) => b._id === id || b.code === id);
    if (idx === -1) return null;
    const removed = memoryBeneficiaries.splice(idx, 1);
    return removed[0];
  },
  countDocuments: async (query = {}) => {
    const filtered = await BeneficiaryModel.inMemory.find(query);
    return filtered.length;
  },
};

module.exports = BeneficiaryModel;
