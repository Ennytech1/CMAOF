const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

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
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cmaof.org';
    const adminRawPass = process.env.ADMIN_PASSWORD || 'cmaof12@';
    const adminPassword = await bcrypt.hash(adminRawPass, salt);
    const staffPassword = await bcrypt.hash('cmaof2026', salt);

    const users = [
      {
        name: 'Abiola Kabiru',
        email: adminEmail,
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
      {
        name: 'Folashade Adele',
        email: 'folashade.a@cmaof.org',
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
    // 3. SEED BENEFICIARIES (Real Nigerian beneficiaries across 4 Pillars)
    // ─────────────────────────────────────────────────────────────
    console.log('\x1b[33m%s\x1b[0m', '3. Seeding Registered Beneficiaries...');

    const beneficiaries = [
      {
        code: 'BNF-2026-001',
        altCode: 'CMAOF/EDU/001',
        name: 'Amina Zainab Yusuf',
        gender: 'Female',
        age: '19',
        ageGender: '19 / F',
        pillar: 'Education & Opportunity',
        pillarFull: 'Education & Opportunity',
        programme: 'Chief Michael Ade.Ojo Tertiary STEM Scholars Initiative',
        location: 'Ilara-Mokin',
        state: 'Ondo',
        fullLocation: 'Ilara-Mokin, Ondo State',
        tag: 'Student',
        type: 'Student',
        caseTag: 'Active',
        status: 'Active',
        assignedOfficer: 'Babatunde Adeleke',
        phone: '+234 803 219 0441',
        email: 'amina.yusuf@student.elizade.edu.ng',
        dateRegistered: '15 Jan 2024',
        outcomesSummary: 'Maintaining 4.85 CGPA with first-class honors standing in Computer Engineering at Elizade University.',
      },
      {
        code: 'BNF-2026-002',
        altCode: 'CMAOF/HLT/002',
        name: 'Alhaji Ibrahim Danjuma',
        gender: 'Male',
        age: '68',
        ageGender: '68 / M',
        pillar: 'Health & Wellbeing',
        pillarFull: 'Health & Wellbeing',
        programme: 'Mobile Healthcare Units & Maternal Welfare Clinics',
        location: 'Dala LGA',
        state: 'Kano',
        fullLocation: 'Dala LGA, Kano State',
        tag: 'Individual',
        type: 'Individual',
        caseTag: 'Active',
        status: 'Active',
        assignedOfficer: 'Dr. Kelechi Nwosu',
        phone: '+234 802 334 1120',
        dateRegistered: '10 Feb 2024',
        outcomesSummary: '100% vision restored in both eyes following free surgery in Kano outreach clinic.',
      },
      {
        code: 'BNF-2026-003',
        altCode: 'CMAOF/HUM/003',
        name: 'Grace Ololade Bakare',
        gender: 'Female',
        age: '72',
        ageGender: '72 / F',
        pillar: 'Humanitarian Support',
        pillarFull: 'Humanitarian Support',
        programme: 'Solar-Powered Clean Water & Humanitarian Relief',
        location: 'Owo',
        state: 'Ondo',
        fullLocation: 'Owo, Ondo State',
        tag: 'Household',
        type: 'Household',
        caseTag: 'Active',
        status: 'Active',
        assignedOfficer: 'Hauwa Bello',
        phone: '+234 806 771 9901',
        dateRegistered: '01 Mar 2024',
        outcomesSummary: 'Enrolled on permanent social safety net with zero food security vulnerability.',
      },
      {
        code: 'BNF-2026-004',
        altCode: 'CMAOF/ECO/004',
        name: 'Emmanuel Chukwuma Okafor',
        gender: 'Male',
        age: '24',
        ageGender: '24 / M',
        pillar: 'Economic Empowerment',
        pillarFull: 'Economic Empowerment',
        programme: 'Vocational Mastery & Micro-Enterprise Seed Grants',
        location: 'Ikeja',
        state: 'Lagos',
        fullLocation: 'Ikeja, Lagos State',
        tag: 'Artisan',
        type: 'Individual',
        caseTag: 'Active',
        status: 'Active',
        assignedOfficer: 'Folashade Adele',
        phone: '+234 807 441 5529',
        dateRegistered: '20 Apr 2024',
        outcomesSummary: 'Certified as solar installer; currently operating independent micro-service venture.',
      },
      {
        code: 'BNF-2026-005',
        altCode: 'CMAOF/EDU/005',
        name: 'Blessing Chioma Eze',
        gender: 'Female',
        age: '20',
        ageGender: '20 / F',
        pillar: 'Education & Opportunity',
        pillarFull: 'Education & Opportunity',
        programme: 'Chief Michael Ade.Ojo Tertiary STEM Scholars Initiative',
        location: 'Nsukka',
        state: 'Enugu',
        fullLocation: 'Nsukka, Enugu State',
        tag: 'Student',
        type: 'Student',
        caseTag: 'Active',
        status: 'Active',
        assignedOfficer: 'Babatunde Adeleke',
        phone: '+234 803 551 2289',
        dateRegistered: '04 May 2024',
        outcomesSummary: 'Received full scholarship and completed internship with Toyota Nigeria technical service center.',
      },
      {
        code: 'BNF-2026-006',
        altCode: 'CMAOF/HLT/006',
        name: 'Fatima Maryam Sani',
        gender: 'Female',
        age: '27',
        ageGender: '27 / F',
        pillar: 'Health & Wellbeing',
        pillarFull: 'Health & Wellbeing',
        programme: 'Mobile Healthcare Units & Maternal Welfare Clinics',
        location: 'Zaria',
        state: 'Kaduna',
        fullLocation: 'Zaria, Kaduna State',
        tag: 'Individual',
        type: 'Individual',
        caseTag: 'Active',
        status: 'Active',
        assignedOfficer: 'Dr. Kelechi Nwosu',
        phone: '+234 805 119 4432',
        dateRegistered: '18 Jun 2024',
        outcomesSummary: 'Delivered healthy twin infants under comprehensive foundation antenatal care program.',
      },
      {
        code: 'BNF-2026-007',
        altCode: 'CMAOF/ECO/007',
        name: 'Tunde Olumide Adeleke',
        gender: 'Male',
        age: '29',
        ageGender: '29 / M',
        pillar: 'Economic Empowerment',
        pillarFull: 'Economic Empowerment',
        programme: 'Vocational Mastery & Micro-Enterprise Seed Grants',
        location: 'Akure',
        state: 'Ondo',
        fullLocation: 'Akure, Ondo State',
        tag: 'Individual',
        type: 'Individual',
        caseTag: 'Active',
        status: 'Active',
        assignedOfficer: 'Folashade Adele',
        phone: '+234 808 332 8841',
        dateRegistered: '12 Jul 2024',
        outcomesSummary: 'Expanded cocoa seedling nursery cooperative, employing 6 additional rural youth.',
      },
      {
        code: 'BNF-2026-008',
        altCode: 'CMAOF/HUM/008',
        name: 'Hajiya Halima Balarabe',
        gender: 'Female',
        age: '65',
        ageGender: '65 / F',
        pillar: 'Humanitarian Support',
        pillarFull: 'Humanitarian Support',
        programme: 'Solar-Powered Clean Water & Humanitarian Relief',
        location: 'Minna',
        state: 'Niger',
        fullLocation: 'Minna, Niger State',
        tag: 'Household',
        type: 'Household',
        caseTag: 'Active',
        status: 'Active',
        assignedOfficer: 'Hauwa Bello',
        phone: '+234 809 667 1144',
        dateRegistered: '28 Aug 2024',
        outcomesSummary: 'Household connected to newly commissioned solar borehole with zero daily water hauling burden.',
      },
      {
        code: 'BNF-2026-009',
        altCode: 'CMAOF/EDU/009',
        name: 'Oluwaseun David Alabi',
        gender: 'Male',
        age: '21',
        ageGender: '21 / M',
        pillar: 'Education & Opportunity',
        pillarFull: 'Education & Opportunity',
        programme: 'Chief Michael Ade.Ojo Tertiary STEM Scholars Initiative',
        location: 'Ibadan',
        state: 'Oyo',
        fullLocation: 'Ibadan, Oyo State',
        tag: 'Student',
        type: 'Student',
        caseTag: 'Active',
        status: 'Active',
        assignedOfficer: 'Babatunde Adeleke',
        phone: '+234 802 771 3300',
        dateRegistered: '05 Sep 2024',
        outcomesSummary: 'Top scorer in University of Ibadan Mechanical Engineering departmental design competition.',
      },
      {
        code: 'BNF-2026-010',
        altCode: 'CMAOF/HLT/010',
        name: 'Patience Efe Orogun',
        gender: 'Female',
        age: '34',
        ageGender: '34 / F',
        pillar: 'Health & Wellbeing',
        pillarFull: 'Health & Wellbeing',
        programme: 'Mobile Healthcare Units & Maternal Welfare Clinics',
        location: 'Warri',
        state: 'Delta',
        fullLocation: 'Warri, Delta State',
        tag: 'Individual',
        type: 'Individual',
        caseTag: 'Active',
        status: 'Active',
        assignedOfficer: 'Dr. Kelechi Nwosu',
        phone: '+234 803 992 4477',
        dateRegistered: '19 Oct 2024',
        outcomesSummary: 'Successfully treated for chronic hypertension and provided 12-month medication supply.',
      },
      {
        code: 'BNF-2026-011',
        altCode: 'CMAOF/ECO/011',
        name: 'Khadijat Abubakar Bello',
        gender: 'Female',
        age: '26',
        ageGender: '26 / F',
        pillar: 'Economic Empowerment',
        pillarFull: 'Economic Empowerment',
        programme: 'Vocational Mastery & Micro-Enterprise Seed Grants',
        location: 'Kano Municipal',
        state: 'Kano',
        fullLocation: 'Kano Municipal, Kano State',
        tag: 'Individual',
        type: 'Individual',
        caseTag: 'Active',
        status: 'Active',
        assignedOfficer: 'Folashade Adele',
        phone: '+234 806 112 8899',
        dateRegistered: '02 Nov 2024',
        outcomesSummary: 'Established modern textile tailoring studio with 4 high-speed industrial sewing machines.',
      },
      {
        code: 'BNF-2026-012',
        altCode: 'CMAOF/HUM/012',
        name: 'Elder Moses Adeyemi',
        gender: 'Male',
        age: '78',
        ageGender: '78 / M',
        pillar: 'Humanitarian Support',
        pillarFull: 'Humanitarian Support',
        programme: 'Solar-Powered Clean Water & Humanitarian Relief',
        location: 'Ilara-Mokin',
        state: 'Ondo',
        fullLocation: 'Ilara-Mokin, Ondo State',
        tag: 'Household',
        type: 'Household',
        caseTag: 'Active',
        status: 'Active',
        assignedOfficer: 'Hauwa Bello',
        phone: '+234 803 440 1289',
        dateRegistered: '14 Dec 2024',
        outcomesSummary: 'Enrolled in senior citizens winter nutrition and medical checkup welfare registry.',
      },
    ];

    for (const b of beneficiaries) {
      await Beneficiary.findOneAndUpdate({ code: b.code }, b, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    console.log('\x1b[32m%s\x1b[0m', `✓ ${beneficiaries.length} Registered Beneficiaries synchronized.`);

    // ─────────────────────────────────────────────────────────────
    // 4. SEED REAL PHILANTHROPIC CONTRIBUTIONS & DONATIONS
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
        createdAt: new Date('2026-01-15'),
      },
      {
        transactionRef: 'DON-2026-002',
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
        createdAt: new Date('2026-02-18'),
      },
      {
        transactionRef: 'DON-2026-003',
        amount: 20000000,
        currency: 'NGN',
        frequency: 'one-time',
        pillar: 'Economic Empowerment',
        donorName: 'Toyota (Nigeria) Limited CSR',
        donorEmail: 'csr@toyotanigeria.com',
        donorPhone: '+234 1 270 3300',
        paymentMethod: 'Direct Bank Transfer',
        status: 'completed',
        notes: 'Vocational mechatronics starter toolkits and youth artisan technical grants.',
        createdAt: new Date('2026-03-24'),
      },
      {
        transactionRef: 'DON-2026-004',
        amount: 15000000,
        currency: 'NGN',
        frequency: 'one-time',
        pillar: 'Humanitarian Support',
        donorName: 'Zenith Philanthropic Trust',
        donorEmail: 'philanthropy@zenithbank.com',
        donorPhone: '+234 1 278 7000',
        paymentMethod: 'Direct Bank Transfer',
        status: 'completed',
        notes: 'Solar borehole installation in Ilara-Mokin and rural Ondo communities.',
        createdAt: new Date('2026-04-10'),
      },
      {
        transactionRef: 'DON-2026-005',
        amount: 10000000,
        currency: 'NGN',
        frequency: 'one-time',
        pillar: 'Education & Opportunity',
        donorName: 'Chief Michael Ade.Ojo Personal Endowment',
        donorEmail: 'founder.office@cmaof.org',
        donorPhone: '+234 803 100 2026',
        paymentMethod: 'Direct Bank Transfer',
        status: 'completed',
        notes: 'Direct founder grant matching education scholarship disbursements.',
        createdAt: new Date('2026-05-02'),
      },
      {
        transactionRef: 'DON-2026-006',
        amount: 2500000,
        currency: 'NGN',
        frequency: 'one-time',
        pillar: 'Education & Opportunity',
        donorName: 'Elizade University Alumni Association',
        donorEmail: 'alumni@elizadeuniversity.edu.ng',
        donorPhone: '+234 805 221 4455',
        paymentMethod: 'Paystack Online',
        status: 'completed',
        notes: 'Alumni pool funding 10 undergraduate STEM scholars tuition.',
        createdAt: new Date('2026-06-12'),
      },
      {
        transactionRef: 'DON-2026-007',
        amount: 1000000,
        currency: 'NGN',
        frequency: 'one-time',
        pillar: 'Health & Wellbeing',
        donorName: 'Dr. Kelechi Nwosu Medical Trust',
        donorEmail: 'kelechi.trust@gmail.com',
        donorPhone: '+234 802 119 5543',
        paymentMethod: 'Flutterwave Online',
        status: 'completed',
        notes: 'Dedicated grant for surgical consumables during Kano cataract camp.',
        createdAt: new Date('2026-07-20'),
      },
      {
        transactionRef: 'DON-2026-008',
        amount: 500000,
        currency: 'NGN',
        frequency: 'monthly',
        pillar: 'Humanitarian Support',
        donorName: 'Engr. Babatunde Sanusi',
        donorEmail: 'b.sanusi@shell.com',
        donorPhone: '+234 803 998 1234',
        paymentMethod: 'Card Online',
        status: 'completed',
        notes: 'Monthly standing order for community clean water maintenance.',
        createdAt: new Date('2026-08-05'),
      },
      {
        transactionRef: 'DON-2026-009',
        amount: 250000,
        currency: 'NGN',
        frequency: 'monthly',
        pillar: 'Education & Opportunity',
        donorName: 'Aisha Mohammed',
        donorEmail: 'aisha.m@gmail.com',
        donorPhone: '+234 803 111 2233',
        paymentMethod: 'Paystack Card Online',
        status: 'completed',
        notes: 'Monthly recurring gift supporting rural female scholars in secondary education.',
        createdAt: new Date('2026-09-14'),
      },
      {
        transactionRef: 'DON-2026-010',
        amount: 100000,
        currency: 'NGN',
        frequency: 'monthly',
        pillar: 'Economic Empowerment',
        donorName: 'John Adewale',
        donorEmail: 'adewale.j@yahoo.com',
        donorPhone: '+234 802 334 5566',
        paymentMethod: 'Paystack Card Online',
        status: 'completed',
        notes: 'Monthly micro-grant support for young apprentice toolkits.',
        createdAt: new Date('2026-10-01'),
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
      { email: 'csr@toyotanigeria.com', source: 'programmes_page', status: 'active' },
      { email: 'alumni@elizade.edu.ng', source: 'education_page', status: 'active' },
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

    console.log('\x1b[32m%s\x1b[0m', '🎉 All real CMAOF database collections seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error during database seed:', error);
    process.exit(1);
  }
};

seedData();
