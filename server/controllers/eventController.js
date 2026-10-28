const mongoose = require('mongoose');
const Event = require('../models/Event');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = asyncHandler(async (req, res, next) => {
  const { type = 'upcoming', category = 'all', search = '' } = req.query;

  let events;
  if (isDbConnected()) {
    const query = {};
    if (type) query.type = type;
    if (category && category !== 'all') query.category = category;
    if (search) {
      query.$or = [{ title: new RegExp(search, 'i') }, { location: new RegExp(search, 'i') }];
    }
    events = await Event.find(query).sort({ createdAt: -1 });
  } else {
    events = await Event.inMemory.find({ type, category, search });
  }

  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
});

// @desc    Get single event by eventId or _id
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let event;
  if (isDbConnected()) {
    event = await Event.findOne({
      $or: [{ eventId: id }, { _id: mongoose.isValidObjectId(id) ? id : null }].filter(Boolean),
    });
  } else {
    event = await Event.inMemory.findOne({ eventId: id, _id: id });
  }

  if (!event) {
    return next(new ErrorResponse(`Event not found with ID ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: event,
  });
});

// @desc    Register / RSVP for an event
// @route   POST /api/events/:id/register
// @access  Public
exports.registerForEvent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone = '', organization = '' } = req.body;

  if (!name || !email) {
    return next(new ErrorResponse('Please provide your name and email address', 400));
  }

  const ticketRef = `CMAOF-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
  let event;
  let attendeeRecord;

  if (isDbConnected()) {
    event = await Event.findOne({
      $or: [{ eventId: id }, { _id: mongoose.isValidObjectId(id) ? id : null }].filter(Boolean),
    });
    if (!event) {
      return next(new ErrorResponse('Event not found', 404));
    }
    attendeeRecord = { name, email, phone, organization, ticketRef, registeredAt: new Date() };
    event.attendees.push(attendeeRecord);
    await event.save();
  } else {
    const result = await Event.inMemory.registerAttendee(id, { name, email, phone, organization });
    if (!result) {
      return next(new ErrorResponse('Event not found', 404));
    }
    event = result.event;
    attendeeRecord = result.attendee;
  }

  // Attempt confirmation email
  try {
    await sendEmail({
      email,
      subject: `Registration Confirmed: ${event.title} [${ticketRef}]`,
      message: `Dear ${name},\n\nYour registration for "${event.title}" has been successfully confirmed.\n\nTicket Reference: ${ticketRef}\nEvent: ${event.title}\nDate: ${event.dateDay} ${event.dateMonthYear}\nLocation: ${event.location}\nTime: ${event.time}\n\nWe look forward to hosting you.\n\nWarm regards,\nChief Michael Ade.Ojo Foundation Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
          <h2 style="color: #06402B; margin-top: 0;">Registration Confirmed!</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>You are confirmed to attend <strong>${event.title}</strong>.</p>
          <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="margin: 4px 0; color: #64748b; font-size: 13px;">TICKET REFERENCE</p>
            <p style="margin: 0; font-size: 20px; font-weight: bold; color: #06402B; letter-spacing: 1px;">${ticketRef}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 12px 0;" />
            <p style="margin: 4px 0;"><strong>Date:</strong> ${event.dateDay} ${event.dateMonthYear}</p>
            <p style="margin: 4px 0;"><strong>Location:</strong> ${event.location}</p>
            <p style="margin: 4px 0;"><strong>Time:</strong> ${event.time}</p>
          </div>
          <p style="font-size: 13px; color: #64748b;">Chief Michael Ade.Ojo Foundation (CMAOF)<br/>Empowering communities through education, healthcare, and sustainable development.</p>
        </div>
      `,
    });
  } catch (err) {
    console.warn('Event registration email notification could not be dispatched:', err.message);
  }

  res.status(201).json({
    success: true,
    message: 'Event registration completed successfully',
    data: {
      ticketRef,
      eventTitle: event.title,
      eventDate: `${event.dateDay} ${event.dateMonthYear}`,
      location: event.location,
      attendee: attendeeRecord,
    },
  });
});

// @desc    Create new event
// @route   POST /api/events
// @access  Admin
exports.createEvent = asyncHandler(async (req, res, next) => {
  let created;
  if (isDbConnected()) {
    created = await Event.create(req.body);
  } else {
    created = await Event.inMemory.create(req.body);
  }

  res.status(201).json({
    success: true,
    message: 'Event created successfully',
    data: created,
  });
});
