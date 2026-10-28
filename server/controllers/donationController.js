const mongoose = require('mongoose');
const Donation = require('../models/Donation');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Record new donation & trigger email receipt
// @route   POST /api/donations
// @access  Public
exports.createDonation = asyncHandler(async (req, res, next) => {
  const {
    amount,
    currency = 'NGN',
    frequency = 'one-time',
    pillar = 'general',
    donorName,
    donorEmail,
    donorPhone = '',
    isAnonymous = false,
    paymentMethod = 'card',
    transactionRef,
    notes = '',
  } = req.body;

  const numericAmount = parseFloat(amount);
  if (!numericAmount || numericAmount <= 0) {
    return next(new ErrorResponse('Please provide a valid donation amount', 400));
  }

  if (!donorEmail) {
    return next(new ErrorResponse('Please provide donor email address', 400));
  }

  // Generate unique transaction reference if not passed
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const seq = Math.floor(100000 + Math.random() * 900000);
  const ref = transactionRef || `CMAOF-${dateStr}-${seq}`;

  const donationData = {
    amount: numericAmount,
    currency,
    frequency,
    pillar,
    donorName: isAnonymous ? 'Anonymous Supporter' : (donorName || 'Generous Supporter'),
    donorEmail,
    donorPhone,
    isAnonymous: Boolean(isAnonymous),
    paymentMethod,
    transactionRef: ref,
    status: 'completed',
    notes,
    receiptSent: false,
  };

  let donation;
  if (isDbConnected()) {
    donation = await Donation.create(donationData);
  } else {
    donation = await Donation.inMemory.create(donationData);
  }

  // Send email receipt asynchronously
  try {
    const formattedAmount = `₦${numericAmount.toLocaleString('en-NG')}`;
    const emailSubject = `Official Donation Receipt [${ref}] - Chief Michael Ade.Ojo Foundation`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #06402B; margin: 0;">Chief Michael Ade.Ojo Foundation</h2>
          <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Empowering Futures, Transforming Communities</p>
        </div>
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 24px;">
          <h3 style="color: #06402B; margin: 0 0 6px 0;">Official Donation Receipt</h3>
          <p style="color: #166534; font-size: 24px; font-weight: bold; margin: 0;">${formattedAmount}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b;">Transaction Ref:</td>
            <td style="padding: 10px 0; font-weight: bold; text-align: right; color: #06402B; font-family: monospace;">${ref}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b;">Donor Name:</td>
            <td style="padding: 10px 0; font-weight: bold; text-align: right; color: #1e293b;">${isAnonymous ? 'Anonymous Supporter' : (donorName || 'Generous Supporter')}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b;">Programme Pillar:</td>
            <td style="padding: 10px 0; font-weight: bold; text-align: right; color: #1e293b; text-transform: capitalize;">${pillar}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b;">Frequency:</td>
            <td style="padding: 10px 0; font-weight: bold; text-align: right; color: #1e293b; text-transform: capitalize;">${frequency}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b;">Payment Method:</td>
            <td style="padding: 10px 0; font-weight: bold; text-align: right; color: #1e293b; text-transform: capitalize;">${paymentMethod}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b;">Date & Time:</td>
            <td style="padding: 10px 0; font-weight: bold; text-align: right; color: #1e293b;">${now.toUTCString()}</td>
          </tr>
        </table>
        <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
          Thank you for your generous partnership with CMAOF. 100% of your contribution directly supports high-impact education, community healthcare, and grassroots development.
        </p>
        <div style="border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
          <p style="margin: 0;">Chief Michael Ade.Ojo Foundation • Ilara-Mokin & Lagos, Nigeria</p>
          <p style="margin: 4px 0 0 0;">enquiries@cmaofoundation.org • Zenith Bank Plc (Acct: 1018392014)</p>
        </div>
      </div>
    `;

    await sendEmail({
      email: donorEmail,
      subject: emailSubject,
      message: `Thank you for your donation of ${formattedAmount} to CMAOF. Ref: ${ref}`,
      html: emailHtml,
    });
  } catch (err) {
    console.error('Failed to dispatch donation email:', err.message);
  }

  res.status(201).json({
    success: true,
    message: 'Donation recorded successfully',
    data: donation,
  });
});

// @desc    Get donation statistics (total raised, donor count, pillar breakdown)
// @route   GET /api/donations/stats
// @access  Public
exports.getDonationStats = asyncHandler(async (req, res, next) => {
  let totalRaised = 125000000; // Base historical seed (₦125M+)
  let donorCount = 1420;
  let recentDonations = [];

  if (isDbConnected()) {
    const dbDonations = await Donation.find({ status: 'completed' });
    const additionalAmount = dbDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
    totalRaised += additionalAmount;
    donorCount += dbDonations.length;

    recentDonations = await Donation.find({ status: 'completed' })
      .sort({ createdAt: -1 })
      .limit(6)
      .select('amount pillar isAnonymous donorName createdAt');
  } else {
    const memDonations = await Donation.inMemory.find({ status: 'completed' });
    const additionalAmount = memDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
    totalRaised += additionalAmount;
    donorCount += memDonations.length;
    recentDonations = memDonations.slice(0, 6);
  }

  // Sanitise recent donors (mask anonymous)
  const sanitizedRecent = recentDonations.map(d => ({
    amount: d.amount,
    pillar: d.pillar,
    donorName: d.isAnonymous ? 'Anonymous Donor' : (d.donorName || 'Supporter'),
    createdAt: d.createdAt,
  }));

  res.status(200).json({
    success: true,
    data: {
      totalRaised,
      formattedTotal: `₦${totalRaised.toLocaleString('en-NG')}`,
      donorCount,
      recentDonations: sanitizedRecent,
      pillars: {
        education: '45%',
        healthcare: '30%',
        community: '20%',
        general: '5%',
      },
    },
  });
});

// @desc    Get all donations (admin / internal)
// @route   GET /api/donations
// @access  Public (or protected when auth is required)
exports.getDonations = asyncHandler(async (req, res, next) => {
  let donations;
  if (isDbConnected()) {
    donations = await Donation.find().sort({ createdAt: -1 });
  } else {
    donations = await Donation.inMemory.find();
  }

  res.status(200).json({
    success: true,
    count: donations.length,
    data: donations,
  });
});

// @desc    Get single donation by transaction reference
// @route   GET /api/donations/ref/:ref
// @access  Public
exports.getDonationByRef = asyncHandler(async (req, res, next) => {
  const { ref } = req.params;
  let donation;

  if (isDbConnected()) {
    donation = await Donation.findOne({ transactionRef: ref });
  } else {
    donation = await Donation.inMemory.findOne({ transactionRef: ref });
  }

  if (!donation) {
    return next(new ErrorResponse(`Donation with reference ${ref} not found`, 404));
  }

  res.status(200).json({
    success: true,
    data: donation,
  });
});
