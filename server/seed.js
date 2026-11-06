const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Load Models
const User = require('./models/User');
const Programme = require('./models/Programme');
const Beneficiary = require('./models/Beneficiary');
const Donation = require('./models/Donation');
const Event = require('./models/Event');
const Volunteer = require('./models/Volunteer');
const Subscriber = require('./models/Subscriber');
const Contact = require('./models/Contact');

let MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cmaof_db';
if (MONGO_URI && MONGO_URI.startsWith('mongodb+srv://') && !MONGO_URI.includes('.mongodb.net/')) {
  MONGO_URI = MONGO_URI.replace('.mongodb.net', '.mongodb.net/cmaof?retryWrites=true&w=majority');
}

const seedData = async () => {
  try {
    console.log('\x1b[36m%s\x1b[0m', 'Connecting to CMAOF MongoDB Atlas cluster...');
    await mongoose.connect(MONGO_URI);
    console.log('\x1b[32m%s\x1b[0m', '✓ MongoDB Connected successfully!');

    // ─────────────────────────────────────────────────────────────
    // 1. SEED USERS & ADMIN ACCOUNTS
    // ─────────────────────────────────────────────────────────────
    console.log('\x1b[33m%s\x1b[0m', '1. Seeding Admin & Staff Personnel...');

    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const staffPassword = await bcrypt.hash('cmaof2026', salt);

    const users = [
      {
        name: 'Super Administrator',
        email: 'admin@cmaof.org',
        password: adminPassword,
        role: 'admin',
      },
      {
        name: 'Hauwa Bello',
        email: 'hauwa.b@cmaof.org',
        password: staffPassword,
        role: 'staff',
      },
      {
        name: 'Babatunde Adeleke',
        email: 'babatunde.a@cmaof.org',
        password: staffPassword,
        role: 'staff',
      },
      {
        name: 'Dr. Kelechi Nwosu',
        email: 'dr.kelechi@cmaof.org',
        password: staffPassword,
        role: 'staff',
      },
    ];

    for (const u of users) {
      await User.findOneAndUpdate({ email: u.email }, u, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    console.log('\x1b[32m%s\x1b[0m', `✓ ${users.length} Admin & Staff accounts synchronized.`);

    // ─────────────────────────────────────────────────────────────
    // 2. SEED PROGRAMMES ACROSS 4 OFFICIAL PILLARS
    // ─────────────────────────────────────────────────────────────
    console.log('\x1b[33m%s\x1b[0m', '2. Seeding 4 Official Strategic Pillars & Programmes...');

    const programmes = [
      {
        slug: 'el-education-stem-scholars',
        name: 'Chief Michael Ade.Ojo Tertiary STEM Scholars Initiative',
        pillar: 'Education & Opportunity',
        status: 'Active',
        thumbnail: '/images/past_event_school_support.jpg',
        featuredImage: '/images/gallery_girl_writing.jpg',
        objective: 'Providing fully-funded university scholarships, academic infrastructure endowments, laptops, and technical mentorship to first-class scholars across Nigeria.',
        targetBeneficiaries: 'Merit scholars and undergraduate students from underserved backgrounds',
        locations: 'Ondo, Lagos, Abuja, Enugu',
        locationsCount: 18,
        schoolsCount: 32,
        startDate: '01 Jan 2024',
        endDate: '31 Dec 2028',
        budgetFormatted: '₦280,000,000',
        beneficiariesReached: 2340,
        directBeneficiariesCount: 2340,
        percentageComplete: 74,
        programmeManager: 'Babatunde Adeleke',
        managerRole: 'Education Lead & Fellowship Coordinator',
        managerEmail: 'babatunde.a@cmaof.org',
        managerPhone: '+234 803 224 8190',
        keyOutcomes: [
          'Over 2,340 scholarship recipients with 98% graduation rate',
          '32 Nigerian university partnerships established',
          '100% internship placement rate for STEM fellows',
        ],
      },
      {
        slug: 'hl-primary-maternal-health',
        name: 'Mobile Healthcare Units & Maternal Welfare Clinics',
        pillar: 'Health & Wellbeing',
        status: 'Active',
        thumbnail: '/images/past_event_kano_medical.jpg',
        featuredImage: '/images/event_medical_doctor.jpg',
        objective: 'Deploying free mobile clinical units, diagnostic screenings, cataract vision restoration surgeries, and maternal nutrition packs in rural LGAs.',
        targetBeneficiaries: 'Pregnant women, nursing mothers, and elderly persons',
        locations: 'Kano, Oyo, Ondo, Kaduna',
        locationsCount: 26,
        schoolsCount: 0,
        startDate: '15 Mar 2024',
        endDate: '31 Dec 2027',
        budgetFormatted: '₦350,000,000',
        beneficiariesReached: 8520,
        directBeneficiariesCount: 8520,
        percentageComplete: 68,
        programmeManager: 'Dr. Kelechi Nwosu',
        managerRole: 'Senior Medical Director',
        managerEmail: 'dr.kelechi@cmaof.org',
        managerPhone: '+234 802 119 5543',
        keyOutcomes: [
          '8,520 free medical consultations delivered',
          '1,450 cataract and primary vision restorations',
          'Zero maternal mortality among enrolled clinical cohort',
        ],
      },
      {
        slug: 'cr-clean-water-boreholes',
        name: 'Solar-Powered Clean Water & Humanitarian Relief',
        pillar: 'Humanitarian Support',
        status: 'Active',
        thumbnail: '/images/past_event_clean_water.jpg',
        featuredImage: '/images/past_event_clean_water.jpg',
        objective: 'Constructing industrial-grade solar submersible boreholes, water testing labs, emergency food aid, and senior citizens welfare safety nets.',
        targetBeneficiaries: 'Rural villages, senior citizens, and crisis-affected families',
        locations: 'Ondo, Kano, Niger, Rivers',
        locationsCount: 45,
        schoolsCount: 14,
        startDate: '01 Jun 2024',
        endDate: '31 Dec 2027',
        budgetFormatted: '₦210,000,000',
        beneficiariesReached: 38400,
        directBeneficiariesCount: 38400,
        percentageComplete: 82,
        programmeManager: 'Musa Garba',
        managerRole: 'Infrastructure & Water Lead',
        managerEmail: 'musa.g@cmaof.org',
        managerPhone: '+234 805 778 3012',
        keyOutcomes: [
          '45 solar-powered clean water stations active',
          'Over 38,400 daily water consumers with 0 waterborne cases',
          'Community water committees trained for sustainable maintenance',
        ],
      },
      {
        slug: 'ee-vocational-seed-grants',
        name: 'Vocational Mastery & Micro-Enterprise Seed Grants',
        pillar: 'Economic Empowerment',
        status: 'Active',
        thumbnail: '/images/past_event_seedling_girl.jpg',
        featuredImage: '/images/pillar_graduates.jpg',
        objective: 'Providing vocational apprenticeships in precision trades, agricultural inputs, micro-capital seed grants, and youth startup incubation.',
        targetBeneficiaries: 'Young artisans, women market traders, and agricultural co-operatives',
        locations: 'Ondo, Lagos, Ogun, Plateau',
        locationsCount: 22,
        schoolsCount: 8,
        startDate: '01 Feb 2024',
        endDate: '31 Dec 2028',
        budgetFormatted: '₦195,000,000',
        beneficiariesReached: 4650,
        directBeneficiariesCount: 4650,
        percentageComplete: 62,
        programmeManager: 'Folashade Adele',
        managerRole: 'Economic Empowerment Director',
        managerEmail: 'folashade.a@cmaof.org',
        managerPhone: '+234 807 555 1209',
        keyOutcomes: [
          '1,850 youth apprentices certified with complete starter toolkits',
          '₦45M disbursed in non-dilutive micro-seed grants with 94% repayment',
          '340 registered cooperative enterprises launched',
        ],
      },
    ];

    for (const p of programmes) {
      await Programme.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    console.log('\x1b[32m%s\x1b[0m', `✓ ${programmes.length} Core Programmes synchronized across 4 pillars.`);

    // ─────────────────────────────────────────────────────────────
    // 3. SEED BENEFICIARIES
    // ─────────────────────────────────────────────────────────────
    console.log('\x1b[33m%s\x1b[0m', '3. Seeding Registered Beneficiaries...');

    const beneficiaries = [
      {
        code: 'BNF-2026-001',
        altCode: 'CMAOF/EDU/001',
        name: 'Amina Zainab Yusuf',
        gender: 'Female',
        age: '19',
        ageGender: '19 / Female',
        pillar: 'Education & Opportunity',
        pillarFull: 'Education & Opportunity',
        pillarTagline: 'Learn → Develop → Excel',
        programme: 'Chief Michael Ade.Ojo Tertiary STEM Scholars Initiative',
        location: 'Ilara-Mokin',
        state: 'Ondo',
        fullLocation: 'Ilara-Mokin, Ondo State',
        tag: 'Scholar',
        caseTag: 'Active',
        status: 'Active',
        enrolmentDate: '15 Jan 2024',
        needsAssessment: 'Full tuition endowment and laptop grant for Computer Engineering undergraduate study.',
        outcomesSummary: 'Maintaining 4.85 CGPA with first-class honors standing at Elizade University.',
      },
      {
        code: 'BNF-2026-002',
        altCode: 'CMAOF/HLT/002',
        name: 'Ibrahim Danjuma',
        gender: 'Male',
        age: '68',
        ageGender: '68 / Male',
        pillar: 'Health & Wellbeing',
        pillarFull: 'Health & Wellbeing',
        pillarTagline: 'Prevent → Treat → Restore',
        programme: 'Mobile Healthcare Units & Maternal Welfare Clinics',
        location: 'Dala LGA',
        state: 'Kano',
        fullLocation: 'Dala LGA, Kano State',
        tag: 'Patient',
        caseTag: 'Active',
        status: 'Active',
        enrolmentDate: '10 Feb 2024',
        needsAssessment: 'Bilateral cataract extraction surgery and post-operative pharmaceutical care.',
        outcomesSummary: '100% vision restored in both eyes following free surgery in Kano outreach clinic.',
      },
      {
        code: 'BNF-2026-003',
        altCode: 'CMAOF/HUM/003',
        name: 'Grace Ololade Bakare',
        gender: 'Female',
        age: '72',
        ageGender: '72 / Female',
        pillar: 'Humanitarian Support',
        pillarFull: 'Humanitarian Support',
        pillarTagline: 'Relieve → Rebuild → Sustain',
        programme: 'Solar-Powered Clean Water & Humanitarian Relief',
        location: 'Owo',
        state: 'Ondo',
        fullLocation: 'Owo, Ondo State',
        tag: 'Elderly',
        caseTag: 'Active',
        status: 'Active',
        enrolmentDate: '01 Mar 2024',
        needsAssessment: 'Quarterly dignity nutrition package and home welfare checkups.',
        outcomesSummary: 'Enrolled on permanent social safety net with zero food security vulnerability.',
      },
      {
        code: 'BNF-2026-004',
        altCode: 'CMAOF/ECO/004',
        name: 'Emmanuel Chukwuma',
        gender: 'Male',
        age: '24',
        ageGender: '24 / Male',
        pillar: 'Economic Empowerment',
        pillarFull: 'Economic Empowerment',
        pillarTagline: 'Empower → Produce → Thrive',
        programme: 'Vocational Mastery & Micro-Enterprise Seed Grants',
        location: 'Ikeja',
        state: 'Lagos',
        fullLocation: 'Ikeja, Lagos State',
        tag: 'Artisan',
        caseTag: 'Active',
        status: 'Active',
        enrolmentDate: '20 Apr 2024',
        needsAssessment: 'Solar PV installation training, NBTE certification, and startup equipment toolkit.',
        outcomesSummary: 'Certified as solar installer; currently operating independent micro-service venture.',
      },
    ];

    for (const b of beneficiaries) {
      await Beneficiary.findOneAndUpdate({ code: b.code }, b, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    console.log('\x1b[32m%s\x1b[0m', `✓ ${beneficiaries.length} Registered Beneficiaries synchronized.`);

    // ─────────────────────────────────────────────────────────────
    // 4. SEED DONATIONS & CONTRIBUTIONS
    // ─────────────────────────────────────────────────────────────
    console.log('\x1b[33m%s\x1b[0m', '4. Seeding Philanthropic Contributions & Donors...');

    const donations = [
      {
        transactionRef: 'DON-2026-001',
        amount: 50000000,
        currency: 'NGN',
        frequency: 'one-time',
        pillar: 'Education & Opportunity',
        donorName: 'Access Bank PLC',
        donorEmail: 'csr@accessbankplc.com',
        donorPhone: '+234 1 271 2000',
        paymentMethod: 'Direct Bank Transfer',
        status: 'completed',
        notes: 'Annual corporate partnership endowment for tertiary scholarships and STEM laboratories.',
      },
      {
        transactionRef: 'DON-2026-002',
        amount: 100000,
        currency: 'NGN',
        frequency: 'monthly',
        pillar: 'Education & Opportunity',
        donorName: 'Aisha Mohammed',
        donorEmail: 'aisha.m@gmail.com',
        donorPhone: '+234 803 111 2233',
        paymentMethod: 'Paystack Card Online',
        status: 'completed',
        notes: 'Online donation in support of girl child education in rural communities.',
      },
      {
        transactionRef: 'DON-2026-003',
        amount: 25000000,
        currency: 'NGN',
        frequency: 'one-time',
        pillar: 'Health & Wellbeing',
        donorName: 'Dangote Foundation',
        donorEmail: 'foundation@dangote.com',
        donorPhone: '+234 1 448 0815',
        paymentMethod: 'Direct Bank Transfer',
        status: 'completed',
        notes: 'Co-branded clinical outreach support for maternal care centers and pediatric nutrition.',
      },
      {
        transactionRef: 'DON-2026-004',
        amount: 25000,
        currency: 'NGN',
        frequency: 'monthly',
        pillar: 'Humanitarian Support',
        donorName: 'John Adewale',
        donorEmail: 'adewale.j@yahoo.com',
        donorPhone: '+234 802 334 5566',
        paymentMethod: 'Paystack Card Online',
        status: 'completed',
        notes: 'Monthly recurring clean water and community relief donor.',
      },
    ];

    for (const d of donations) {
      await Donation.findOneAndUpdate({ transactionRef: d.transactionRef }, d, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    console.log('\x1b[32m%s\x1b[0m', `✓ ${donations.length} Donation records synchronized.`);

    // ─────────────────────────────────────────────────────────────
    // 5. SEED EVENTS
    // ─────────────────────────────────────────────────────────────
    console.log('\x1b[33m%s\x1b[0m', '5. Seeding Field Events & Assemblies...');

    const events = [
      {
        eventId: 'summit-2026',
        title: 'CMAOF Annual Philanthropy Summit 2026',
        type: 'upcoming',
        category: 'foundation',
        dateDay: '15 - 17',
        dateMonthYear: 'APR 2026',
        image: '/images/event_summit_stage.jpg',
        description: 'A flagship assembly convening corporate partners, philanthropic leaders, and community elders to advance sustainable human development across Nigeria.',
        location: 'Grand Ballroom, Eko Hotels & Suites, Victoria Island, Lagos',
        time: '09:00 AM – 4:30 PM Daily WAT',
        stakeholder: true,
        capacity: 600,
        tags: [
          { label: 'Flagship Assembly', bg: 'bg-[#FAF0D4]', text: 'text-[#5B2E19]' },
          { label: 'Stakeholder Summit', bg: 'bg-[#FFF8E5]', text: 'text-[#7A5200]' },
        ],
        attendees: [],
      },
      {
        eventId: 'medical-outreach-ibadan',
        title: 'Free Cataract Surgeries & Maternal Health Clinic',
        type: 'upcoming',
        category: 'medical',
        dateDay: '12',
        dateMonthYear: 'NOV 2026',
        image: '/images/event_medical_doctor.jpg',
        description: 'Providing free medical consultations, maternal screenings, and surgical cataract restorations for nursing mothers and older persons.',
        location: 'Adeoyo Maternity Hospital, Ibadan, Oyo State',
        time: '08:00 AM – 5:00 PM WAT',
        stakeholder: false,
        capacity: 750,
        tags: [
          { label: 'Medical Outreach', bg: 'bg-[#EDF7EB]', text: 'text-[#338C26]' },
          { label: 'Maternal Care', bg: 'bg-[#FAF0D4]', text: 'text-[#5B2E19]' },
        ],
        attendees: [],
      },
    ];

    for (const ev of events) {
      await Event.findOneAndUpdate({ eventId: ev.eventId }, ev, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true });
    }
    console.log('\x1b[32m%s\x1b[0m', `✓ ${events.length} Events synchronized.`);

    // ─────────────────────────────────────────────────────────────
    // 6. SEED SUBSCRIBERS & VOLUNTEERS
    // ─────────────────────────────────────────────────────────────
    console.log('\x1b[33m%s\x1b[0m', '6. Seeding Subscribers & Volunteer Applications...');

    const subscribers = [
      { email: 'supporter@gmail.com', source: 'website_footer', status: 'active' },
      { email: 'patron@cmaofoundation.org', source: 'donate_page', status: 'active' },
      { email: 'partner@accessbankplc.com', source: 'resources_footer', status: 'active' },
    ];

    for (const s of subscribers) {
      await Subscriber.findOneAndUpdate({ email: s.email }, s, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    console.log('\x1b[32m%s\x1b[0m', `✓ ${subscribers.length} Newsletter subscribers synchronized.`);

    const volunteers = [
      {
        fullName: 'Chidinma Okafor',
        email: 'chidinma.o@gmail.com',
        phone: '+234 803 445 6789',
        interestArea: 'education',
        skills: ['Teaching', 'STEM Coaching', 'Curriculum Design'],
        message: 'Passionate about mentoring young girls in science and engineering.',
        status: 'approved',
      },
      {
        fullName: 'Dr. Tunde Fashola',
        email: 'tunde.f@yahoo.com',
        phone: '+234 802 778 9900',
        interestArea: 'healthcare',
        skills: ['Ophthalmology', 'Surgical Care', 'Public Health'],
        message: 'Available to volunteer on rural cataract surgery outreaches.',
        status: 'pending',
      },
    ];

    for (const v of volunteers) {
      await Volunteer.findOneAndUpdate({ email: v.email }, v, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    console.log('\x1b[32m%s\x1b[0m', `✓ ${volunteers.length} Volunteer applications synchronized.`);

    console.log('\n\x1b[32m%s\x1b[0m', '=======================================================');
    console.log('\x1b[32m%s\x1b[0m', '   CMAOF DATABASE SEEDING COMPLETED SUCCESSFULLY!      ');
    console.log('\x1b[32m%s\x1b[0m', '=======================================================');
    console.log('Admin Portal Login: \x1b[36madmin@cmaof.org\x1b[0m / Password: \x1b[36madmin123\x1b[0m / MFA: \x1b[36m264810\x1b[0m\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error during database seeding:', error.message);
    process.exit(1);
  }
};

seedData();
