const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  organization: { type: String, default: '' },
  ticketRef: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
});

const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide event title'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['upcoming', 'past'],
      default: 'upcoming',
    },
    category: {
      type: String,
      enum: ['foundation', 'medical', 'education', 'community'],
      default: 'foundation',
    },
    dateDay: {
      type: String,
      required: true,
    },
    dateMonthYear: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '/images/event_summit_stage.jpg',
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: '9:00 AM – 4:00 PM WAT',
    },
    stakeholder: {
      type: Boolean,
      default: false,
    },
    capacity: {
      type: Number,
      default: 500,
    },
    tags: [
      {
        label: String,
        bg: String,
        text: String,
      },
    ],
    attendees: [attendeeSchema],
  },
  {
    timestamps: true,
  }
);

const initialEvents = [
  {
    _id: 'evt_1',
    eventId: 'summit-2026',
    title: 'CMAOF Foundation Summit 2026',
    type: 'upcoming',
    category: 'foundation',
    dateDay: '15 - 17',
    dateMonthYear: 'APR 2026',
    image: '/images/event_summit_stage.jpg',
    description: 'A flagship event bringing together partners, leaders and changemakers to advance education, health and community resilience in Nigeria.',
    location: 'Eko Hotels, Lagos',
    time: '9:00 AM – 4:30 PM Daily WAT',
    stakeholder: true,
    capacity: 600,
    tags: [
      { label: 'Flagship Event', bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]' },
      { label: 'Stakeholder Engagement', bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]' },
    ],
    attendees: [],
  },
  {
    _id: 'evt_2',
    eventId: 'medical-ibadan',
    title: 'Free Medical Outreach – Ibadan',
    type: 'upcoming',
    category: 'medical',
    dateDay: '12',
    dateMonthYear: 'NOV 2025',
    image: '/images/event_medical_doctor.jpg',
    description: 'Providing free medical consultations, screenings and essential medicines for children, women and older persons in underserved communities.',
    location: 'Ibadan, Oyo State',
    time: '8:00 AM – 5:00 PM WAT',
    stakeholder: false,
    capacity: 1200,
    tags: [
      { label: 'Medical Outreach', bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]' },
      { label: 'Community Health', bg: 'bg-[#E0F2FE]', text: 'text-[#0369A1]' },
    ],
    attendees: [],
  },
  {
    _id: 'evt_3',
    eventId: 'education-initiative',
    title: 'Back-to-School Education Initiative',
    type: 'upcoming',
    category: 'education',
    dateDay: '05',
    dateMonthYear: 'DEC 2025',
    image: '/images/gallery_girl_writing.jpg',
    description: 'Distribution of textbooks, uniforms and learning kits to 3,000 public primary school students in Ondo and Ekiti States.',
    location: 'Akure, Ondo State',
    time: '10:00 AM – 3:00 PM WAT',
    stakeholder: false,
    capacity: 800,
    tags: [
      { label: 'Education Support', bg: 'bg-[#DCFCE7]', text: 'text-[#166534]' },
      { label: 'Youth Development', bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]' },
    ],
    attendees: [],
  },
  {
    _id: 'evt_4',
    eventId: 'clean-water-project',
    title: 'Clean Water Project Commissioning',
    type: 'upcoming',
    category: 'community',
    dateDay: '22',
    dateMonthYear: 'JAN 2026',
    image: '/images/hero_community.jpg',
    description: 'Official commissioning of solar-powered boreholes across 4 rural communities in Ondo State, bringing potable water to over 15,000 residents.',
    location: 'Ilara-Mokin, Ondo State',
    time: '11:00 AM – 2:00 PM WAT',
    stakeholder: true,
    capacity: 400,
    tags: [
      { label: 'WASH Initiative', bg: 'bg-[#E0F2FE]', text: 'text-[#0369A1]' },
      { label: 'Community Project', bg: 'bg-[#DCFCE7]', text: 'text-[#166534]' },
    ],
    attendees: [],
  },
];

let memoryEvents = [...initialEvents];

const EventModel = mongoose.model('Event', eventSchema);

EventModel.inMemory = {
  find: async (query = {}) => {
    let result = [...memoryEvents];
    if (query.type) {
      result = result.filter((e) => e.type === query.type);
    }
    if (query.category && query.category !== 'all') {
      result = result.filter((e) => e.category === query.category);
    }
    if (query.search) {
      const q = query.search.toLowerCase();
      result = result.filter((e) => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q));
    }
    return result;
  },
  findOne: async (query = {}) => {
    return memoryEvents.find((e) => {
      if (query.eventId) return e.eventId === query.eventId;
      if (query._id) return e._id === query._id;
      return false;
    });
  },
  registerAttendee: async (eventId, attendeeData) => {
    const event = memoryEvents.find((e) => e.eventId === eventId || e._id === eventId);
    if (!event) return null;
    const ticketRef = `CMAOF-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    const record = {
      ...attendeeData,
      ticketRef,
      registeredAt: new Date(),
    };
    event.attendees = event.attendees || [];
    event.attendees.push(record);
    return { event, attendee: record };
  },
  create: async (data) => {
    const record = {
      _id: 'evt_' + Date.now(),
      eventId: data.eventId || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ...data,
      attendees: [],
      createdAt: new Date(),
    };
    memoryEvents.push(record);
    return record;
  },
};

module.exports = EventModel;
