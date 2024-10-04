const Redis = require('ioredis');
const logger = require('../utilities/logger');
const { createPool } = require('generic-pool');

const factory = {
  create: () => {
    return new Redis({
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      db: 0 
    });
  },
  destroy: (client) => {
    return client.quit();
  }
};

const poolOptions = {
  max: 10,
  min: 2
};

const redisPool = createPool(factory, poolOptions);

redisPool.on('factoryCreateError', (err) => {
  logger.error(`Error creating Redis client: ${err}`);
});

redisPool.on('factoryDestroyError', (err) => {
  logger.error(`Error destroying Redis client: ${err}`);
});

async function getRedisConnection() {
  try {
    const client = await redisPool.acquire();
    return client;
  } catch (error) {
    logger.error(`Error acquiring Redis client from pool: ${error}`);
    throw error;
  }
}

function releaseRedisConnection(client) {
  if (client) {
    redisPool.release(client).catch(err => {
      logger.error(`Error releasing Redis client back to pool: ${err}`);
    });
  }
}

async function setWithExpiry(key, value, ttl) {
  let client;
  try {
    client = await getRedisConnection();
    if (!ttl || typeof ttl !== 'number' || ttl <= 0) {
      logger.error('Invalid or missing TTL. TTL must be a positive number');
      return;
    }
    await client.set(key, JSON.stringify(value), 'EX', ttl);
  } catch (error) {
    logger.error(`Error in setWithExpiry: ${error}`);
  } finally {
    releaseRedisConnection(client);
  }
}

async function getOrDefault(key, defaultValue) {
  let client;
  try {
    client = await getRedisConnection();
    const value = await client.get(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch(error) {
    logger.error(`Error in getOrDefault: ${error}`);
    return defaultValue;
  } finally {
    releaseRedisConnection(client);
  }
}

async function deleteKey(key) {
  let client;
  try {
    client = await getRedisConnection();
    await client.del(key);
  } catch(error) {
    logger.error(`Error in deleteKey: ${error}`);
  } finally {
    releaseRedisConnection(client);
  }
}

async function setKey(key, value) {
  let client;
  try {
    client = await getRedisConnection();
    await client.set(key, JSON.stringify(value));
  } catch(error) {
    logger.error(`Error in setKey: ${error}`);
  } finally {
    releaseRedisConnection(client);
  }
}

async function exec(command) {
  let client;
  try {
    client = await getRedisConnection();
    const [cmd, ...args] = command.split(' ');
    if (typeof client[cmd] !== 'function') {
      throw new Error(`Invalid Redis command: ${cmd}`);
    }
    const result = await client[cmd](...args);
    return result;
  } catch(error) {
    logger.error(`Error in exec: ${error}`);
  } finally {
    releaseRedisConnection(client);
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
