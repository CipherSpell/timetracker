const router = require('express').Router();

router.get('/', async (req, res) => {
  res
    .status(200)
    .send('Timetracker');
});

module.exports = router;
