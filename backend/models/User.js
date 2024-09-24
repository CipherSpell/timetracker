const pg = require('../database/postgres');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

const addUser = async (email, password, firstName, lastName) => {
  const cmd = `INSERT INTO Users (email, password, first_name, last_name)
               VALUES ('${email}', '${password}', '${firstName}', '${lastName}')`;

  try {
    await pg.withTransaction(async (client) => {
      await client.query(cmd);
    });
  } catch(error) {
    logger.log({
      level: 'error',
      message: error
    });
  }
}

const getUser = async (userId) => {
  const cmd = `SELECT * FROM Users WHERE id = $1`;
  let result;

  try {
    result = await pg.executeQuery(cmd, [userId]);
  } catch(error) {
     logger.log({
      level: 'error',
      message: error
    });
  }

  return result;
}

const getAllUsers = async () => {
  let result;

  try {
    result = await pg.executeQuery(
      `SELECT * FROM users;`
    );
  } catch(error) {
    logger.log({
      level: 'error',
      message: error
    });
  }

  return result;
}

module.exports = {
  addUser,
  getUser,
  getAllUsers
}
