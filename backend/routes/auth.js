const router = require('express').Router();
const logger = require('../utilities/logger');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth_utils = require('../utilities/auth.utils');

const JWT_SECRET = process.env.JWT_SECRET || 'PLACEHOLDER';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*., ?])/;

  const user = await User.getUserbyEmail(email);
  if (!user || !(await auth_utils.validatePassword(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (!regexPassword.test(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters and contain a special character',
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

  res.json({ token });
});

module.exports = router;
