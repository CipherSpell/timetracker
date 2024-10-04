const router = require('express').Router();
const Timer = require('../models/Timer');

const logger = require('../utilities/logger');

router.get('/', async (req, res) => {
  let payload = await Timer.exec('keys *');
  res.status(200).send(payload);
});

router.post('/setTimer', async (req, res) => {
  const { task, user } = req.body;
  const timestamp = Date.now();

  const key = `timer:${user}:${task}:timestamp`;

  let status;
  let payload;

  try {
    await Timer.setWithExpiry(key, timestamp);
    status = 200; 
  } catch(error) {
    payload = error; 
  }

  if(payload)
    res.status(status).send(payload);

  res.sendStatus(status);
});

router.get('/getTimerValue/:key', async (req, res) => {
  const key = req.params.key;
  let ;
  let status = 200;

  try {
    payload = await Timer.getValue(key);
  } catch(error) {
    status = 400;
    payload = error;
  }

  res
    .status(status)
    .send(payload);
})

module.exports = router;
