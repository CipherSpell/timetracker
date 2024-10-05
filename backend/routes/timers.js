const router = require('express').Router();
const Timer = require('../models/Timer');

const logger = require('../utilities/logger');

const EXISTS = 1;
const NOT_EXISTS = 0;

const getDuration = async (user, task) => {
  const key = `timer:${user}:${task}:duration`;
  const timestamp = Date.now();

  // If duration exists, we fetch the duration so far and
  // sum with the new duration
  let cachedDuration = 0;
  const cachedDurationExists = await Timer.existsInCache(key);
  
  if(cachedDurationExists == EXISTS)
    cachedDuration = await Timer.getValue(key);

  const startTime = await Timer.getValue(`timer:${user}:${task}:start`);
  const duration = cachedDuration + (timestamp - startTime);

  return duration;
}

router.get('/', async (req, res) => {
  let payload = await Timer.exec('keys *');
  res.status(200).send(payload);
});

// Returns a task/timer id
router.post('/start', async (req, res) => {
  const { user } = req.body;
  const timestamp = Date.now();

  // Combine the user (id) with the last 5 digits of timestamp
  // to get a unique task/timer id to cache in redis
  const task = `${user}${timestamp % 100000}`;

  const key = `timer:${user}:${task}:start`;

  let status;
  let payload = task;

  try {
    await Timer.setWithExpiry(key, timestamp);
    status = 200; 
  } catch(error) {
    payload = error; 
  }

  res.status(status).send({ payload });
});

router.post('/pause', async (req, res) => {
  const { task, user } = req.body;
  const timestamp = Date.now();

  let status;
  let payload;

  const duration = await getDuration(user, task);

  try {
    await Timer.setWithExpiry(key, duration);
    await Timer.delKey(`timer:${user}:${task}:start`);
    status = 200; 
  } catch(error) {
    payload = error; 
  }

  if(payload)
    res.status(status).send(payload);

  res.sendStatus(status);
});

/* 
 * {
 *  "task": {
 *    "id": 12345,
 *    "description": "test desc"
 *  },
 *  "user": 5
 * }
 */
router.post('/stop', async (req, res) => {
  const { task, user } = req.body;
  const timestamp = Date.now();

  const duration = await getDuration(user, task.id);

  const taskPayload = { 
    duration,
    description: task.description
  };

  try {
    await Timer.saveTimer(taskPayload, user);
  } catch(error) {
    logger.error(error);
    res.sendStatus(400);
  }

  res.sendStatus(200);
})

router.get('/getTimerValue/:user/:task/:type', async (req, res) => {
  const { user, task, type } = req.params;
  const key = `timer:${user}:${task}:${type}`;

  let payload;
  let status = 200;

  try {
    payload = {
      value: await Timer.getValue(key)
    }
  } catch(error) {
    status = 400;
    payload = error;
  }

  res.status(status).send(payload);
})

module.exports = router;
