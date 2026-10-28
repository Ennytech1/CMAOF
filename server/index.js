const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Initialize Express
const app = express();

// Connect to Database (with resilient offline fallback)
connectDB();

// Enable CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during local dev for smooth integration
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Sanitize data against NoSQL injection
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Prevent HTTP param pollution
app.use(hpp());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting (generous in development)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'development' ? 500 : 150,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});
app.use('/api', limiter);

// CMAOF Foundation API Routes
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/donate', require('./routes/donationRoutes'));
app.use('/api/subscribers', require('./routes/subscriberRoutes'));
app.use('/api/newsletter', require('./routes/subscriberRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/get-involved', require('./routes/volunteerRoutes'));
app.use('/api/beneficiaries', require('./routes/beneficiaryRoutes'));
app.use('/api/programmes', require('./routes/programmeRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/impact', require('./routes/impactRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Gateway Info
app.get('/', (req, res) => {
  res.json({
    name: 'Chief Michael Ade.Ojo Foundation (CMAOF) API Gateway',
    version: '1.1.0',
    status: 'operational',
    documentation: {
      beneficiaries: '/api/beneficiaries',
      beneficiaryStats: '/api/beneficiaries/stats',
      programmes: '/api/programmes',
      events: '/api/events',
      impact: '/api/impact',
      donations: '/api/donations',
      donationStats: '/api/donations/stats',
      newsletter: '/api/newsletter',
      contact: '/api/contact',
      volunteers: '/api/volunteers',
      users: '/api/users',
      health: '/api/health',
    },
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'CMAOF API Server',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` 🌟 CMAOF Backend API Server Running on Port ${PORT}`);
  console.log(` 🌐 Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(` 🔗 Health: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});

module.exports = app;
