const redis = require('../database/redis');
const pg = require('../database/postgres');
const logger = require('./logger');

async function pingRedis() {
  try {
    const client = await redis.getRedisConnection();
    const startTime = Date.now();
    const result = await client.ping();
    const endTime = Date.now();
    const latency = endTime - startTime;

    if(result !== 'PONG') {
      logger.error(`Unexpected response from Redis: ${result}`);
      return {
        state: 'DOWN',
        latency: null,
        error: 'Unexpected PING response',
      };
    }

    return {
      state: 'UP',
      latency: `${latency}ms`,
    };
  } catch (error) {
    logger.error(`Redis health check failed: ${error.message}`);
    return {
      state: 'DOWN',
      latency: null,
      error: error.message,
    };
  } finally {
    redis.releaseRedisConnection();
  }
}

async function pingPostgres() {
  try {
    const startTime = Date.now();
    await pg.executeQuery('SELECT 1');
    const endTime = Date.now();
    const latency = endTime - startTime;

    return {
      state: 'UP',
      latency: `${latency}ms`,
    };
  } catch(error) {
    logger.error(`Postgres health check failed: ${error.message}`);
    return {
      state: 'DOWN',
      latency: null,
      error: error.message,
    };
  }
}

module.exports = {
  pingRedis,
  pingPostgres,
}
