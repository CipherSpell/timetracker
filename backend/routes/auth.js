const router = require('express').Router();
const winston = require('winston');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth_utils = require('../utilities/auth.utils');

// TODO: remove default once https://github.com/CipherSpell/timetracker/issues/14 is done 
const JWT_SECRET = process.env.JWT_SECRET | 'PLACEHOLDER'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.getUserByEmail(email);
  if(!user || auth_utils.validatePassword(password, user.password)) {
      return res
              .status(401)
              .json({ message: 'Invalid credentials' });
  }

  const payload = {
    id: user.id,
    email: user.email
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

  res.json({ token });
})
