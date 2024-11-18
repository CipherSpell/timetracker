const bcrypt = require('bcryptjs');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

const validatePassword = async (userInput, storedPw) => {
  try {
    return await bcrypt.compare(userInput, storedPw);
  } catch(error) {
    logger.error(`Error validating password: ${error}`);
    return false;
  }
}

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch(error) {
    logger.error(`Error hashing password: ${error}`);
    throw error;
  }
}

module.exports = {
  validatePassword,
  hashPassword,
}
