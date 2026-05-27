// server/routes/registrationRoutes.js
const express = require('express');
const router = express.Router();

// POST Route endpoint mapping: http://localhost:5001/api/registrations
router.post('/', (req, res) => {
  const { language, role, name, phone, state, district } = req.body;

  // Final layer backend guard validations check
  if (!name || !phone || !state || !district) {
    return res.status(400).json({ error: 'All core registration details fields are mandatory.' });
  }

  if (phone.length !== 10) {
    return res.status(400).json({ error: 'Invalid payload context. Phone digits must total 10.' });
  }

  // Generate dynamic unique tracking identification mapping record keys
  const newUserRecord = {
    id: `user_${Date.now()}`,
    language,
    role,
    name,
    phone,
    state,
    district,
    registeredAt: new Date().toISOString()
  };

  // Appending our registration details safely to your global object database replacement array
  global.users.push(newUserRecord);

  console.log('✅ Temporary user successfully appended to in-memory profile store:', newUserRecord);

  return res.status(201).json({
    success: true,
    message: 'User identity profiles updated successfully.',
    user: newUserRecord
  });
});

module.exports = router;