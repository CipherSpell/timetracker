const Redis = require('ioredis');
const logger = require('../utilities/logger');

// TODO: replace hardcoded values with .env
const redis = new Redis({
  port: 6379,
  host: 'redis_dev',
  family: 4, // 4 (IPv4) or 6 (IPv6)
  db: 0 
});

redis.on('error', (error) => {
  logger.error(`Redis connection error: ${error}`);
});

function getRedisConnection() {
  return redis;
}

async function setWithExpiry(key, value, ttl) {
  const client = getRedisConnection();
  try {
    if (!ttl || typeof ttl !== 'number' || ttl <= 0) {
      logger.error('Invalid or missing TTL. TTL must be a positive number');
    }
    await client.set(key, JSON.stringify(value), 'EX', ttl);
  } catch (error) {
    logger.error(`Error in setWithExpiry: ${error}`);
  }
}


async function getOrDefault(key, defaultValue) {
  const client = getRedisConnection();
  try {
    const value = await client.get(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch(error) {
    logger.error(`Error in getOrDefault: ${error}`);
  }
}

async function deleteKey(key) {
  const client = getRedisConnection();
  try {
    await client.del(key);
  } catch(error) {
    logger.error(`Error in deleteKey: ${error}`)
  }
}

async function setKey(timer, userId, taskId, value) {
  const key = `${timer}:${userId}:${taskId}`;
  const client = getRedisConnection();
  try {
    await client.set(key, JSON.stringify(value));
  } catch(error) {
    logger.error(`Error in setKey: ${error}`);
  }
}

async function exec(command) {
  const client = getRedisConnection();
  try {
    const [cmd, ...args] = command.split(' ');
    const result = await client[cmd](...args);
    return result;
  } catch(error) {
    logger.error(`Error in exec: ${error}`);
  }
}

module.exports = {
  setWithExpiry,
  getOrDefault,
  deleteKey,
  setKey,
  exec,
  getRedisConnection
};

