const pg = require('../database/postgres');
const logger = require('../utilities/logger');

const createTag = async (userId, name) => {
  const cmd = `
    INSERT INTO tags (user_id, name)
    VALUES ($1, $2)
    RETURNING id, user_id, name, created_at, updated_at
  `;
  const params = [userId, name];
  try {
    const result = await pg.executeQuery(cmd, params);
    return result.rows[0];
  } catch (error) {
    logger.error(`Error creating tag: ${error}`);
    throw error;
  }
};

const getTagsByUser = async (userId) => {
  const cmd = `
    SELECT id, user_id, name, created_at, updated_at
    FROM tags
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const params = [userId];
  try {
    const result = await pg.executeQuery(cmd, params);
    return result.rows;
  } catch (error) {
    logger.error(`Error fetching tags: ${error}`);
    throw error;
  }
};

const updateTag = async (tagId, userId, newName) => {
  const cmd = `
    UPDATE tags
    SET name = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 AND user_id = $3
    RETURNING id, user_id, name, created_at, updated_at
  `;
  const params = [newName, tagId, userId];
  try {
    const result = await pg.executeQuery(cmd, params);
    if (result.rows.length === 0) {
      throw new Error('Tag not found or unauthorized.');
    }
    return result.rows[0];
  } catch (error) {
    logger.error(`Error updating tag: ${error}`);
    throw error;
  }
};

const deleteTag = async (tagId, userId) => {
  const cmd = `
    DELETE FROM tags
    WHERE id = $1 AND user_id = $2
  `;
  const params = [tagId, userId];
  try {
    const result = await pg.executeQuery(cmd, params);
    if (result.rowCount === 0) {
      throw new Error('Tag not found or unauthorized.');
    }
  } catch (error) {
    logger.error(`Error deleting tag: ${error}`);
    throw error;
  }
};

module.exports = {
  createTag,
  getTagsByUser,
  updateTag,
  deleteTag,
};

