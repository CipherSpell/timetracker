const router = require('express').Router();
const { executeQuery, withTransaction } = require('../database/postgres');

/**
  * req.body -- passed as body on POST request
  * {
  *   "id": 2
  * }
  */
router.post('/addUser', async (req, res) => {
  const id = req.body.id

  let result;

  try {
    result = await executeQuery('SELECT * FROM periodic_table');

  } catch (err) {
    console.log(err);
  }

  res
    .status(200)
    .send(result);
});

module.exports = router;
