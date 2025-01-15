const router = require('express').Router();
const Tag = require('../models/Tag');
const { authenticateJWT } = require('../middlewares/auth.mw');
const logger = require('../utilities/logger');

router.post('/', authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Tag name is required and must be a string.' });
  }

  try {
    const newTag = await Tag.createTag(userId, name);
    res.status(201).json(newTag);
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      res.status(409).json({ message: 'Tag name already exists.' });
    } else {
      logger.error(`POST /tags error: ${error.message}`);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
});

router.get('/', authenticateJWT, async (req, res) => {
  const userId = req.user.id;

  try {
    const tags = await Tag.getTagsByUser(userId);
    res.status(200).json(tags);
  } catch (error) {
    logger.error(`GET /tags error: ${error.message}`);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.put('/:id', authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const tagId = parseInt(req.params.id, 10);
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Tag name is required and must be a string.' });
  }

  try {
    const updatedTag = await Tag.updateTag(tagId, userId, name);
    res.status(200).json(updatedTag);
  } catch (error) {
    if (error.message === 'Tag not found or unauthorized.') {
      res.status(404).json({ message: 'Tag not found.' });
    } else if (error.code === '23505') { // Unique violation
      res.status(409).json({ message: 'Tag name already exists.' });
    } else {
      logger.error(`PUT /tags/${tagId} error: ${error.message}`);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const tagId = parseInt(req.params.id, 10);

  try {
    await Tag.deleteTag(tagId, userId);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Tag not found or unauthorized.') {
      res.status(404).json({ message: 'Tag not found.' });
    } else {
      logger.error(`DELETE /tags/${tagId} error: ${error.message}`);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
});

module.exports = router;

