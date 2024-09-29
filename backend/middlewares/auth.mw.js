const jwt = require('jsonwebtoken');
// TODO: remove default once https://github.com/CipherSpell/timetracker/issues/14 is done 
const JWT_SECRET = process.env.JWT_SECRET || 'PLACEHOLDER';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); 
      }

      req.user = user; 
      next();
    });
  } else {
    res.sendStatus(401); 
  }
};

