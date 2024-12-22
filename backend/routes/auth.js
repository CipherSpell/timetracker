const router = require('express').Router();
const logger = require('../utilities/logger');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth_utils = require('../utilities/auth.utils');
const redis = require('../database/redis');

const JWT_SECRET = process.env.JWT_SECRET || 'PLACEHOLDER';
const BLACKLIST_PREFIX = 'blacklist:';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.getUserbyEmail(email);
  if(!user || !(await auth_utils.validatePassword(password, user.password))) {
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
});

router.post('/signout', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Decode token without verifying to extract expiration
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const exp = decoded.payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    const ttl = exp - currentTime;

    if (ttl <= 0) {
      return res.status(400).json({ message: 'Token already expired' });
    }

    // Add token to Redis blacklist with TTL
    const blacklistKey = `${BLACKLIST_PREFIX}${token}`;
    await redis.setWithExpiry(blacklistKey, 'blacklisted', ttl);

    logger.info(`Token blacklisted: ${blacklistKey} for ${ttl} seconds`);

    res.status(200).json({ message: 'Successfully signed out' });
  } catch (error) {
    logger.error(`Signout error: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

