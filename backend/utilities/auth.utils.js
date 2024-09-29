const bcrypt = require('bcrypt');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

export const validatePassword = async (userInput, storedPw) => {
  try {
    return await bcrypt.compare(userInput, storedPw);
  } catch(error) {
    logger.log({
      level: 'error',
      message: error
    })
  }
}
