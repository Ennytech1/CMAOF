const mongoose = require('mongoose');

const programmeSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide programme name'],
      trim: true,
    },
    pillar: {
      type: String,
      enum: ['Education & Human Capital', 'Primary Health & Care', 'Community Resilience & Livelihoods', 'Youth Empowerment', 'Emergency Relief'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Planning', 'Completed', 'Paused'],
      default: 'Active',
    },
    thumbnail: {
      type: String,
      default: '/images/past_event_school_support.jpg',
    },
    featuredImage: {
      type: String,
      default: '/images/gallery_girl_writing.jpg',
    },
    objective: {
      type: String,
      required: true,
    },
    targetBeneficiaries: {
      type: String,
      default: 'Underserved communities across Nigeria',
    },
    locations: {
      type: String,
      default: 'Lagos, Kano, Oyo, Kaduna, Enugu, Ondo',
    },
    locationsCount: {
      type: Number,
      default: 24,
    },
    schoolsCount: {
      type: Number,
      default: 56,
    },
    startDate: {
      type: String,
      default: '01 Jan 2024',
    },
    endDate: {
      type: String,
      default: '31 Dec 2027',
    },
    programmeManager: {
      type: String,
      default: 'Ngozi Adeyemi',
    },
    budgetFormatted: {
      type: String,
      default: '₦500,000,000',
    },
    stats: {
      beneficiaries: { type: String, default: '2,340' },
      communities: { type: Number, default: 24 },
      schools: { type: Number, default: 56 },
      completionRate: { type: String, default: '86%' },
    },
    objectivesList: [String],
    activities: [
      {
        title: String,
        frequency: String,
        status: String,
        lead: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const initialProgrammes = [
  {
    _id: 'prog_1',
    id: 'school-support-programme',
    slug: 'school-support-programme',
    name: 'School Support Programme',
    pillar: 'Education & Human Capital',
    status: 'Active',
    thumbnail: '/images/past_event_school_support.jpg',
    featuredImage: '/images/gallery_girl_writing.jpg',
    objective: 'Provide educational support to underserved children to ensure school enrollment, retention and improved learning outcomes.',
    targetBeneficiaries: 'Children (6–18 years) from low-income households',
    locations: 'Lagos, Kano, Oyo, Kaduna, Enugu',
    locationsCount: 24,
    schoolsCount: 56,
    startDate: '01 Jan 2024',
    endDate: '31 Dec 2027',
    programmeManager: 'Ngozi Adeyemi',
    budgetFormatted: '₦500,000,000',
    stats: {
      beneficiaries: '2,340',
      communities: 24,
      schools: 56,
      completionRate: '86%',
    },
    objectivesList: [
      'Increase net primary school enrollment by 35% in targeted rural clusters.',
      'Reduce dropout rates through holistic scholarship and learning kits.',
      'Provide core STEM learning materials to 5,000+ vulnerable pupils.',
    ],
  },
  {
    _id: 'prog_2',
    id: 'mobile-health-clinics',
    slug: 'mobile-health-clinics',
    name: 'Mobile Health Clinics & Community Care',
    pillar: 'Primary Health & Care',
    status: 'Active',
    thumbnail: '/images/event_medical_doctor.jpg',
    featuredImage: '/images/event_medical_doctor.jpg',
    objective: 'Deliver free mobile diagnostic, maternal-child health services, and essential pharmaceutical supplies directly to hard-to-reach communities.',
    targetBeneficiaries: 'Expectant mothers, children under 5, and geriatric populations',
    locations: 'Ondo, Oyo, Osun, Ogun, Ekiti',
    locationsCount: 38,
    schoolsCount: 0,
    startDate: '15 Mar 2024',
    endDate: 'Ongoing',
    programmeManager: 'Dr. Obinna Okafor',
    budgetFormatted: '₦320,000,000',
    stats: {
      beneficiaries: '14,800',
      communities: 38,
      schools: 0,
      completionRate: '92%',
    },
    objectivesList: [
      'Conduct free maternal and neonatal health screening for 10,000+ rural women.',
      'Distribute free essential medications for hypertension, malaria, and diabetes.',
      'Train local primary healthcare officers in early diagnosis.',
    ],
  },
  {
    _id: 'prog_3',
    id: 'clean-water-resilience',
    slug: 'clean-water-resilience',
    name: 'Rural Clean Water & Borehole Resilience',
    pillar: 'Community Resilience & Livelihoods',
    status: 'Active',
    thumbnail: '/images/hero_community.jpg',
    featuredImage: '/images/hero_community.jpg',
    objective: 'Provide continuous access to solar-powered clean potable water in water-stressed rural agrarian clusters.',
    targetBeneficiaries: 'Rural community members, schools, and health centres',
    locations: 'Ilara-Mokin, Owo, Idanre, Iseyin',
    locationsCount: 18,
    schoolsCount: 12,
    startDate: '01 Feb 2024',
    endDate: '31 Dec 2028',
    programmeManager: 'Engr. Babatunde Lawal',
    budgetFormatted: '₦280,000,000',
    stats: {
      beneficiaries: '35,000+',
      communities: 18,
      schools: 12,
      completionRate: '95%',
    },
    objectivesList: [
      'Drill and commission 25 solar-powered deep industrial boreholes.',
      'Form and train local Water Sanitation and Hygiene (WASH) committees.',
      'Eradicate recurring water-borne typhoid and cholera in target areas.',
    ],
  },
];

let memoryProgrammes = [...initialProgrammes];

const ProgrammeModel = mongoose.model('Programme', programmeSchema);

ProgrammeModel.inMemory = {
  find: async (query = {}) => {
    let result = [...memoryProgrammes];
    if (query.pillar) {
      result = result.filter((p) => p.pillar.toLowerCase().includes(query.pillar.toLowerCase()));
    }
    if (query.search) {
      const q = query.search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.objective.toLowerCase().includes(q));
    }
    return result;
  },
  findOne: async (query = {}) => {
    return memoryProgrammes.find((p) => {
      if (query.slug) return p.slug === query.slug;
      if (query._id) return p._id === query._id;
      if (query.id) return p.id === query.id || p.slug === query.id;
      return false;
    });
  },
  create: async (data) => {
    const record = {
      _id: 'prog_' + Date.now(),
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ...data,
      createdAt: new Date(),
    };
    memoryProgrammes.push(record);
    return record;
  },
};

module.exports = ProgrammeModel;
