const pg = require('../database/postgres');
const logger = require('../utilities/logger')

const addUser = async (email, password) => {
  const cmd = `INSERT INTO Users (email, password)
               VALUES ($1, $2)`;

  const params = [email, password];

  try {
    await pg.withTransaction(async (client) => {
      await client.query(cmd, params);
    });
  } catch(error) {
    logger.log({
      level: 'error',
      message: error
    });
  }
}

const getUserbyId = async (userId) => {
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

const getUserbyEmail = async (email) => {
  const cmd = `SELECT * from Users WHERE email = $1`;
  let result;

  try {
    result = await pg.executeQuery(cmd, [email]);
  } catch(error) {
    logger.log({
      level: 'error',
      message: error
    });
  }
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
  getAllUsers,
  getUserbyId,
  getUserbyEmail
}
