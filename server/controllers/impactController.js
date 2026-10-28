const mongoose = require('mongoose');
const Beneficiary = require('../models/Beneficiary');
const Donation = require('../models/Donation');
const Volunteer = require('../models/Volunteer');
const Subscriber = require('../models/Subscriber');
const asyncHandler = require('../middleware/asyncHandler');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get comprehensive foundation impact statistics
// @route   GET /api/impact
// @access  Public
exports.getImpactOverview = asyncHandler(async (req, res, next) => {
  let donationsList = [];
  let volunteersCount = 0;
  let subscribersCount = 0;
  let beneficiariesCount = 0;

  if (isDbConnected()) {
    donationsList = await Donation.find({ status: 'completed' });
    volunteersCount = await Volunteer.countDocuments({});
    subscribersCount = await Subscriber.countDocuments({});
    beneficiariesCount = await Beneficiary.countDocuments({});
  } else {
    donationsList = await Donation.inMemory.find({ status: 'completed' });
    volunteersCount = (await Volunteer.inMemory.find({})).length;
    subscribersCount = (await Subscriber.inMemory.find({})).length;
    beneficiariesCount = (await Beneficiary.inMemory.find({})).length;
  }

  const dynamicDonationsTotal = donationsList.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const baselineDonationNaira = 245300000; // ₦245.3M base
  const grandTotalDonations = baselineDonationNaira + dynamicDonationsTotal;

  const baselineBeneficiaries = 12480;
  const grandTotalBeneficiaries = baselineBeneficiaries + beneficiariesCount;

  res.status(200).json({
    success: true,
    data: {
      metrics: {
        totalBeneficiaries: grandTotalBeneficiaries,
        totalBeneficiariesFormatted: `${(grandTotalBeneficiaries / 1000).toFixed(1)}k+`,
        scholarshipsAwarded: 2450 + Math.floor(beneficiariesCount * 0.4),
        healthInterventions: 48200 + Math.floor(beneficiariesCount * 0.35),
        cleanWaterBeneficiaries: '35,000+',
        communitiesReached: 82,
        statesCovered: 14,
        donationsRaised: grandTotalDonations,
        donationsRaisedFormatted: `₦${(grandTotalDonations / 1000000).toFixed(1)}M`,
        activeVolunteers: 120 + volunteersCount,
        newsletterSubscribers: 1420 + subscribersCount,
      },
      pillars: {
        education: {
          name: 'Education & Human Capital',
          beneficiaries: 2450,
          schoolsReached: 56,
          scholarshipFundingFormatted: '₦125.4M',
        },
        healthcare: {
          name: 'Primary Health & Care',
          beneficiaries: 48200,
          clinicsConducted: 42,
          freePrescriptions: '18,500+',
        },
        community: {
          name: 'Community Resilience & Livelihoods',
          beneficiaries: 35000,
          boreholesCommissioned: 24,
          microGrantsAwarded: 180,
        },
      },
      statesList: [
        'Lagos', 'Ondo', 'Oyo', 'Ogun', 'Osun', 'Ekiti',
        'Kano', 'Kaduna', 'Enugu', 'Abuja (FCT)', 'Edo', 'Delta', 'Rivers', 'Kwara'
      ],
      lastUpdated: new Date().toISOString(),
    },
  });
});
