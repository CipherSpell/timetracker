const express = require('express');
const router = express.Router();
const { pingRedis, pingPostgres } = require('../utilities/healthcheck');

router.get('/', async (req, res) => {
  try {
    const [redisStatus, postgresStatus] = await Promise.all([
      pingRedis(),
      pingPostgres(),
    ]);

    const statusReport = {
      status: {
        redis: {
          state: redisStatus.state,
          latency: redisStatus.latency,
          ...(redisStatus.error && { error: redisStatus.error }),
        },
        postgres: {
          state: postgresStatus.state,
          latency: postgresStatus.latency,
          ...(postgresStatus.error && { error: postgresStatus.error }),
        },
      },
      timestamp: new Date().toISOString(),
    };

    const allServicesUp =
      redisStatus.state === 'UP' && postgresStatus.state === 'UP';

    if (allServicesUp) {
      return res.status(200).json(statusReport);
    } else {
      return res.status(503).json(statusReport);
    }
  } catch (error) {
    return res.status(500).json({
      status: {
        error: 'Internal Server Error',
      },
      timestamp: new Date().toISOString(),
    });
  }
});

module.exports = router
