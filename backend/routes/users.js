const router = require('express').Router();

/**
  * req.body -- passed as body on POST request
  * {
  *   "id": 2
  * }
  */
router.post('/addUser', async (req, res) => {
  const id = req.body.id

  res
    .status(200)
    .send(`User to be added: ${id}`);
});

module.exports = router;
