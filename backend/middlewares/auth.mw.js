const jwt = require('jsonwebtoken');
const redis = require('../database/redis');

const JWT_SECRET = process.env.JWT_SECRET || 'PLACEHOLDER';
const BLACKLIST_PREFIX = 'blacklist:';

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const blacklistKey = `${BLACKLIST_PREFIX}${token}`;
      const isBlacklisted = await redis.getOrDefault(blacklistKey, null);

      if (isBlacklisted) {
        return res.status(403).json({ message: 'Token has been revoked' });
      }

      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403); 
        }

        req.user = user; 
        next();
      });
    } catch (error) {
      logger.error(`Authentication error: ${error.message}`);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.sendStatus(401); 
  }
};

module.exports = {
  authenticateJWT
}
