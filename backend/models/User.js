const pg = require('../database/postgres');
const logger = require('../utilities/logger');

const addUser = async (email, hashedPassword) => {
  const cmd = `INSERT INTO Users (email, password)
               VALUES ($1, $2)
               RETURNING id, email, created_at, updated_at`;

  const params = [email, hashedPassword];

  try {
    const result = await pg.executeQuery(cmd, params);
    return result.rows[0];
  } catch(error) {
    logger.error(`Error adding user: ${error}`);
    throw error;
  }
};

const getUserbyId = async (userId) => {
  const cmd = `SELECT * FROM Users WHERE id = $1`;
  
  try {
    const result = await pg.executeQuery(cmd, [userId]);
    return result.rows[0] || null;
  } catch(error) {
    logger.error(`Error fetching user by ID: ${error}`);
    throw error;
  }
};

const getUserbyEmail = async (email) => {
  const cmd = `SELECT * FROM Users WHERE email = $1`;
  
  try {
    const result = await pg.executeQuery(cmd, [email]);
    return result.rows[0] || null;
  } catch(error) {
    logger.error(`Error fetching user by email: ${error}`);
    throw error;
  }
};

const getAllUsers = async () => {
  const cmd = `SELECT id, email, created_at, updated_at FROM Users;`;
  
  try {
    const result = await pg.executeQuery(cmd);
    return result.rows;
  } catch(error) {
    logger.error(`Error fetching all users: ${error}`);
    throw error;
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserbyId,
  getUserbyEmail
};
