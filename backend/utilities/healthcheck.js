const redis = require('../database/redis');
const logger = require('./logger');

async function pingRedis() {
  const client = await redis.getRedisConnection();
  
  try {
    const startTime = Date.now();
    const result = await client.ping();
    const endTime = Date.now();
    const latency = endTime - startTime;

    if (result !== 'PONG') {
      logger.error(`Unexpected response from Redis: ${result}`);
    }

    const info = await client.info();
    const memoryUsage = info.split('\n').find(line => line.startsWith('used_memory_human:'));
    const connectedClients = info.split('\n').find(line => line.startsWith('connected_clients:'));

    return {
      status: 'healthy',
      latency: `${latency}ms`,
      memoryUsage: memoryUsage ? memoryUsage.split(':')[1].trim() : 'Unknown',
      connectedClients: connectedClients ? connectedClients.split(':')[1].trim() : 'Unknown'
    };
  } catch (error) {
    logger.error(`Redis ping failed: ${error}`);
    return {
      status: 'unhealthy',
      error: error.message
    };
  }
}

module.exports = {
  pingRedis,
};

