const Tag = require('../models/Tag');
const pg = require('../database/postgres');
const logger = require('../utilities/logger');

jest.mock('../database/postgres');
jest.mock('../utilities/logger');

describe('Tag Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTag', () => {
    it('should create a new tag successfully', async () => {
      const mockTag = {
        id: 1,
        user_id: 10,
        name: 'Work',
        created_at: '2025-01-03T12:00:00Z',
        updated_at: '2025-01-03T12:00:00Z',
      };
      pg.executeQuery.mockResolvedValue({ rows: [mockTag] });

      const result = await Tag.createTag(10, 'Work');
      expect(pg.executeQuery).toHaveBeenCalledWith(expect.any(String), [10, 'Work']);
      expect(result).toEqual(mockTag);
    });

    it('should throw an error if creation fails', async () => {
      const mockError = new Error('Database error');
      pg.executeQuery.mockRejectedValue(mockError);

      await expect(Tag.createTag(10, 'Work')).rejects.toThrow('Database error');
      expect(logger.error).toHaveBeenCalledWith(`Error creating tag: ${mockError}`);
    });
  });

  describe('getTagsByUser', () => {
    it('should retrieve tags for a user', async () => {
      const mockTags = [
        { id: 1, user_id: 10, name: 'Work', created_at: '...', updated_at: '...' },
        { id: 2, user_id: 10, name: 'Personal', created_at: '...', updated_at: '...' },
      ];
      pg.executeQuery.mockResolvedValue({ rows: mockTags });

      const result = await Tag.getTagsByUser(10);
      expect(pg.executeQuery).toHaveBeenCalledWith(expect.any(String), [10]);
      expect(result).toEqual(mockTags);
    });

    it('should throw an error if retrieval fails', async () => {
      const mockError = new Error('Database error');
      pg.executeQuery.mockRejectedValue(mockError);

      await expect(Tag.getTagsByUser(10)).rejects.toThrow('Database error');
      expect(logger.error).toHaveBeenCalledWith(`Error fetching tags: ${mockError}`);
    });
  });

  describe('updateTag', () => {
    it('should update a tag successfully', async () => {
      const tagId = 1;
      const userId = 10;
      const newName = 'Updated Tag';
      const mockUpdatedTag = {
        id: tagId,
        user_id: userId,
        name: newName,
        created_at: '2025-01-10T12:34:56Z',
        updated_at: '2025-01-11T08:22:33Z',
      };
      pg.executeQuery.mockResolvedValue({ rows: [mockUpdatedTag] });

      const result = await Tag.updateTag(tagId, userId, newName);
      expect(pg.executeQuery).toHaveBeenCalledWith(expect.any(String), [newName, tagId, userId]);
      expect(result).toEqual(mockUpdatedTag);
    });

    it('should throw an error if tag not found or unauthorized', async () => {
      const tagId = 999;
      const userId = 10;
      const newName = 'Nonexistent Tag';
      pg.executeQuery.mockResolvedValue({ rows: [] });

      await expect(Tag.updateTag(tagId, userId, newName)).rejects.toThrow('Tag not found or unauthorized.');
      expect(logger.error).toHaveBeenCalledWith(`Error updating tag: Error: Tag not found or unauthorized.`);
    });

    it('should throw an error if update fails', async () => {
      const tagId = 1;
      const userId = 10;
      const newName = 'Updated Tag';
      const mockError = new Error('Database error');
      pg.executeQuery.mockRejectedValue(mockError);

      await expect(Tag.updateTag(tagId, userId, newName)).rejects.toThrow('Database error');
      expect(logger.error).toHaveBeenCalledWith(`Error updating tag: ${mockError}`);
    });

    it('should handle unique constraint violation', async () => {
      const tagId = 1;
      const userId = 10;
      const newName = 'Existing Tag Name';
      const mockError = { code: '23505' }; // PostgreSQL unique violation error code
      pg.executeQuery.mockRejectedValue(mockError);

      await expect(Tag.updateTag(tagId, userId, newName)).rejects.toEqual(mockError);
      expect(logger.error).toHaveBeenCalledWith(`Error updating tag: ${mockError}`);
    });
  });

  describe('deleteTag', () => {
    it('should delete a tag successfully', async () => {
      const tagId = 1;
      const userId = 10;
      pg.executeQuery.mockResolvedValue({ rowCount: 1 });

      await expect(Tag.deleteTag(tagId, userId)).resolves.toBeUndefined();
      expect(pg.executeQuery).toHaveBeenCalledWith(expect.any(String), [tagId, userId]);
    });

    it('should throw an error if tag not found or unauthorized', async () => {
      const tagId = 999;
      const userId = 10;
      pg.executeQuery.mockResolvedValue({ rowCount: 0 });

      await expect(Tag.deleteTag(tagId, userId)).rejects.toThrow('Tag not found or unauthorized.');
      expect(logger.error).toHaveBeenCalledWith(`Error deleting tag: Error: Tag not found or unauthorized.`);
    });

    it('should throw an error if deletion fails', async () => {
      const tagId = 1;
      const userId = 10;
      const mockError = new Error('Database error');
      pg.executeQuery.mockRejectedValue(mockError);

      await expect(Tag.deleteTag(tagId, userId)).rejects.toThrow('Database error');
      expect(logger.error).toHaveBeenCalledWith(`Error deleting tag: ${mockError}`);
    });
  });
});

