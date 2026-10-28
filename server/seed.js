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

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cmaof_db';

const seedData = async () => {
  try {
    console.log('\x1b[36m%s\x1b[0m', 'Connecting to CMAOF MongoDB instance...');
    await mongoose.connect(MONGO_URI);
    console.log('\x1b[32m%s\x1b[0m', 'MongoDB Connected successfully!');

    // ─────────────────────────────────────────────────────────────
    // 1. SEED USERS & ADMIN ACCOUNTS
    // ─────────────────────────────────────────────────────────────
    console.log('\x1b[33m%s\x1b[0m', 'Seeding Admin & Staff Personnel...');

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
    // 2. SEED PROGRAMMES
    // ─────────────────────────────────────────────────────────────
    console.log('\x1b[33m%s\x1b[0m', 'Seeding Strategic Interventions & Programmes...');

    const programmes = [
      {
        slug: 'el-education-stem-scholars',
        name: 'Chief Michael Ade.Ojo Tertiary STEM Scholars Initiative',
        pillar: 'Education & Human Capital',
        status: 'Active',
        thumbnail: '/images/past_event_school_support.jpg',
        featuredImage: '/images/gallery_girl_writing.jpg',
        objective: 'Providing fully-funded university scholarships, mentorship, and laptops to first-class engineering and medicine students across Nigeria.',
        targetBeneficiaries: 'Merit scholars from underserved backgrounds',
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
        name: 'Mobile Health Clinics & Maternal Care Interventions',
        pillar: 'Primary Health & Care',
        status: 'Active',
        thumbnail: '/images/past_event_kano_medical.jpg',
        featuredImage: '/images/event_medical_doctor.jpg',
        objective: 'Deploying free mobile clinical units, diagnostic screenings, cataract surgeries, and maternal nutrition packs in rural LGAs.',
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
        name: 'Solar-Powered Potable Water & Sanitation Infrastructure',
        pillar: 'Community Resilience & Livelihoods',
        status: 'Active',
        thumbnail: '/images/past_event_clean_water.jpg',
        featuredImage: '/images/past_event_clean_water.jpg',
        objective: 'Constructing industrial-grade solar submersible boreholes with 10,000L storage tanks and water testing labs.',
        targetBeneficiaries: 'Rural villages and agricultural farming settlements',
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
    ];

    for (const p of programmes) {
      await Programme.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    console.log('\x1b[32m%s\x1b[0m', `✓ ${programmes.length} Core Programmes synchronized.`);

    // ─────────────────────────────────────────────────────────────
    // 3. SEED DONATIONS
    // ─────────────────────────────────────────────────────────────
    console.log('\x1b[33m%s\x1b[0m', 'Seeding Philanthropic Contributions & Donors...');

    const donations = [
      {
        transactionRef: 'DON-2026-001',
        amount: 50000000,
        currency: 'NGN',
        frequency: 'one-time',
        pillar: 'Education & Human Capital',
        donorName: 'Access Bank PLC',
        donorEmail: 'csr@accessbankplc.com',
        donorPhone: '+234 1 271 2000',
        paymentMethod: 'Direct Bank Transfer',
        status: 'Completed',
        notes: 'Annual CSR grant for Ilara-Mokin and Ajegunle school kits.',
      },
      {
        transactionRef: 'DON-2026-002',
        amount: 100000,
        currency: 'NGN',
        frequency: 'monthly',
        pillar: 'Education & Human Capital',
        donorName: 'Aisha Mohammed',
        donorEmail: 'aisha.m@gmail.com',
        donorPhone: '+234 803 111 2233',
        paymentMethod: 'Paystack Card Online',
        status: 'Completed',
        notes: 'Online donation in support of girl child education.',
      },
      {
        transactionRef: 'DON-2026-003',
        amount: 25000000,
        currency: 'NGN',
        frequency: 'one-time',
        pillar: 'Primary Health & Care',
        donorName: 'Zenith Bank Foundation',
        donorEmail: 'foundation@zenithbank.com',
        donorPhone: '+234 1 278 7000',
        paymentMethod: 'Direct Bank Transfer',
        status: 'Completed',
        notes: 'Support for maternal care centres and pediatric equipment in Kano.',
      },
      {
        transactionRef: 'DON-2026-004',
        amount: 25000,
        currency: 'NGN',
        frequency: 'monthly',
        pillar: 'Education & Human Capital',
        donorName: 'John Adewale',
        donorEmail: 'adewale.j@yahoo.com',
        donorPhone: '+234 802 334 5566',
        paymentMethod: 'Paystack Card Online',
        status: 'Completed',
        notes: 'Monthly recurring scholarship contributor.',
      },
    ];

    for (const d of donations) {
      await Donation.findOneAndUpdate({ transactionRef: d.transactionRef }, d, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    console.log('\x1b[32m%s\x1b[0m', `✓ ${donations.length} Donation records synchronized.`);

    // ─────────────────────────────────────────────────────────────
    // 4. SEED EVENTS
    // ─────────────────────────────────────────────────────────────
    console.log('\x1b[33m%s\x1b[0m', 'Seeding Assemblies & Field Events...');

    const events = [
      {
        slug: 'summit-2026',
        title: 'CMAOF Annual Philanthropy Summit 2026',
        date: '15 - 17 Apr 2026',
        time: '09:00 AM WAT',
        location: 'Grand Ballroom, Eko Hotels & Suites, Victoria Island, Lagos',
        category: 'foundation',
        description: 'A flagship event bringing together partners, leaders and changemakers to advance education, health and community resilience in Nigeria.',
        featuredImage: '/images/event_summit_stage.jpg',
        capacity: 500,
        registeredCount: 480,
        status: 'upcoming',
        pillar: 'Multi-Pillar Stakeholder',
      },
      {
        slug: 'medical-outreach-ibadan',
        title: 'Free Cataract Surgeries & Maternal Health Clinic',
        date: '12 Nov 2026',
        time: '08:00 AM WAT',
        location: 'Adeoyo Maternity Hospital, Ibadan, Oyo State',
        category: 'medical',
        description: 'Providing free medical consultations, screenings, and surgical cataracts restoration for mothers and older persons.',
        featuredImage: '/images/event_medical_doctor.jpg',
        capacity: 750,
        registeredCount: 620,
        status: 'upcoming',
        pillar: 'Health & Well-being',
      },
    ];

    for (const ev of events) {
      await Event.findOneAndUpdate({ slug: ev.slug }, ev, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    console.log('\x1b[32m%s\x1b[0m', `✓ ${events.length} Events synchronized.`);

    console.log('\n\x1b[32m%s\x1b[0m', '=======================================================');
    console.log('\x1b[32m%s\x1b[0m', '   CMAOF DATABASE SEEDING COMPLETED SUCCESSFULLY!      ');
    console.log('\x1b[32m%s\x1b[0m', '=======================================================');
    console.log('Super Admin Login: \x1b[36madmin@cmaof.org\x1b[0m / Password: \x1b[36madmin123\x1b[0m / OTP: \x1b[36m264810\x1b[0m\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error during database seeding:', error.message);
    process.exit(1);
  }
};

seedData();
