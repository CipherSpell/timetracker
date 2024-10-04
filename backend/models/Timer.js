const redis = require('../database/redis');
const logger = require('../utilities/logger');

const FOUR_HOURS = 14400;

const setWithExpiry = async (key, value, ttl = FOUR_HOURS) => {
  try {
    await redis.setWithExpiry(key, value, ttl);
  } catch(error) {
    logger.error(error); 
  }
}

const getValue = async (key) => {
  let result;

  try {
    result = await redis.getOrDefault(key, null);
  } catch(error) {
    logger.error(error);
  }

  return result;
}

const delKey = async (key) => {
  try {
    await redis.deleteKey(key);
  } catch(error) {
    logger.error(error);
  }
}

const setKey = async (key, value) => {
  try {
    await redis.setKey(key, value);
  } catch(error) {
    logger.error(error);
  }
}

const exec = async (command) => {
  let result;

  try {
    result = await redis.exec(command);
  } catch(error) {
    logger.error(error);
  }

  return result;
}

const existsInCache = async (key) => {
  let result;

  try {
    result = await exec(`exists ${key}`);
  } catch(error) {
    logger.error(error);
  }

  return result;
}

module.exports = {
  setWithExpiry,
  getValue,
  delKey,
  setKey,
  exec,
  existsInCache
}
