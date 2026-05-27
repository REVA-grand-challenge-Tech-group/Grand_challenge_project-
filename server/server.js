const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Initialize app FIRST
const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Simple global in-memory database store for demo tracking
global.users = global.users || [];
global.jobs = global.jobs || [];

// ==========================================
// 🛡️ CRASH-PROOF UNIVERSAL ROUTER
// ==========================================
const dynamicFallbackRouter = express.Router();

// 1. Dynamic User Registration Endpoint
dynamicFallbackRouter.post('/register', (req, res) => {
  const { name, phone, state, district, role, language } = req.body;
  
  console.log(`📝 Backend Received Registration Request:`, req.body);

  if (!name || !phone || !state || !district || !role) {
    return res.status(400).json({ 
      success: false, 
      message: "Validation Failed: All onboarding fields are strictly required." 
    });
  }

  const newUser = {
    id: "user_" + Date.now(),
    name,
    phone,
    state,
    district,
    role,
    language
  };

  global.users.push(newUser);
  console.log(`💾 User Saved! Active User Pool Size: ${global.users.length}`);

  res.status(201).json({
    success: true,
    message: "Registration completed successfully on the backend!",
    token: "mock_jwt_token_" + newUser.id,
    user: newUser
  });
});

// 2. Generic Route Interceptor Fallback
dynamicFallbackRouter.all('*', (req, res) => {
  console.log(`📡 Mock API Intercepted: ${req.method} -> ${req.originalUrl}`);
  
  let mockData = [];
  if (req.originalUrl.includes('/api/weather')) {
    mockData = { temp: 29, condition: "Sunny", humidity: "60%", location: "Mysuru, Karnataka" };
  }

  res.status(200).json({
    success: true,
    message: `KrishiSetu Live Demo Mode - Active Connection`,
    endpoint: req.originalUrl,
    data: mockData
  });
});

// Bind all required application endpoints directly to our router handlers
app.use('/api/auth', dynamicFallbackRouter);
app.use('/api/jobs', dynamicFallbackRouter);
app.use('/api/market', dynamicFallbackRouter);
app.use('/api/labour', dynamicFallbackRouter);
app.use('/api/crops', dynamicFallbackRouter);
app.use('/api/registrations', dynamicFallbackRouter);
app.use('/api/translate', dynamicFallbackRouter);
app.use('/api/weather', dynamicFallbackRouter);
app.use('/api/users', dynamicFallbackRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'KrishiSetu API is running (No DB Mode)' });
});

console.log('⚠️ Running without MongoDB - Using live inline mock routing system');

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running perfectly on port ${PORT}`);
  console.log(`📝 All 9 agricultural modules are safely routed without crashes.`);
});