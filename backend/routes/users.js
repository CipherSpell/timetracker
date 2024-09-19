const router = require('express').Router();
const User = require('../models/User');

/**
  * req.body -- passed as body on POST request
  * {
  *   "id": 2
  * }
  */
router.post('/addUser', async (req, res) => {
  const { email, username, password } = req.body; 

  await User.addUser(email, username, password);

  res
    .status(200)
    .send(`User to be added: ${id}`);
});

module.exports = router;
