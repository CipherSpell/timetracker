const { executeQuery, withTransaction } = require('../database/postgres');
const { Pool } = require('pg');
const winston = require('winston');

jest.mock('pg', () => {
  const mClient = {
    query: jest.fn(),
    release: jest.fn(),
    on: jest.fn(),
  };
  const mPool = {
    connect: jest.fn(() => Promise.resolve(mClient)),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

const logger = require('winston');

jest.mock('winston', () => {
  const mLogger = {
    info: jest.fn(),
    error: jest.fn(),
    createLogger: jest.fn(() => mLogger),
    format: {
      combine: jest.fn(),
      colorize: jest.fn(),
      simple: jest.fn(),
    },
    transports: {
      Console: jest.fn(),
    },
  };
  return mLogger;
});

describe('executeQuery', () => {
  const { Pool } = require('pg');
  const mPool = new Pool();

  const mClient = {
    query: jest.fn(),
    release: jest.fn(),
  };

  beforeEach(() => {
    mPool.connect.mockClear();
    mClient.query.mockClear();
    mClient.release.mockClear();
    logger.info.mockClear();
    logger.error.mockClear();
  });

  it('should execute query successfully', async () => {
    const queryText = 'SELECT * FROM test_table';
    const params = [];
    const mockResult = { rows: [{ id: 1, name: 'Test' }] };

    // Mocking the result of query execution
    mClient.query.mockResolvedValueOnce(mockResult);
    mPool.connect.mockResolvedValueOnce(mClient);

    const result = await executeQuery(queryText, params);

    expect(mPool.connect).toHaveBeenCalled();
    expect(mClient.query).toHaveBeenCalledWith(queryText, params);
    expect(result).toBe(mockResult);
    expect(mClient.release).toHaveBeenCalled();

    expect(logger.info).toHaveBeenCalledWith(`Query executed successfully: ${queryText}`);
    expect(logger.info).toHaveBeenCalledWith('Client released back to pool');
  });

  it('should retry query on error', async () => {
    const queryText = 'SELECT * FROM test_table';
    const params = [];
    const mockError = new Error('Test error');
    const mockResult = { rows: [{ id: 1, name: 'Test' }] };

    // Mocking the query to fail first, then succeed
    mClient.query
      .mockRejectedValueOnce(mockError)
      .mockResolvedValueOnce(mockResult);

    mPool.connect.mockResolvedValueOnce(mClient);

    const result = await executeQuery(queryText, params);

    expect(mPool.connect).toHaveBeenCalled();
    expect(mClient.query).toHaveBeenNthCalledWith(1, queryText, params);
    expect(mClient.query).toHaveBeenNthCalledWith(2, queryText, params);
    expect(result).toBe(mockResult);
    expect(mClient.release).toHaveBeenCalled();

    expect(logger.error).toHaveBeenCalledWith(`Error executing query: ${queryText} - ${mockError.message}`);
    expect(logger.info).toHaveBeenCalledWith(`Retrying query (3 retries left)`);
    expect(logger.info).toHaveBeenCalledWith(`Query executed successfully: ${queryText}`);
    expect(logger.info).toHaveBeenCalledWith('Client released back to pool');
  });

  it('should throw error after retries exhausted', async () => {
    const queryText = 'SELECT * FROM test_table';
    const params = [];
    const mockError = new Error('Test error');

    // Mocking the query to fail with the mock error each time it's called
    mClient.query.mockRejectedValue(mockError);
    mPool.connect.mockResolvedValueOnce(mClient);

    await expect(executeQuery(queryText, params, null, 0)).rejects.toThrow(mockError);

    expect(mPool.connect).toHaveBeenCalled();
    expect(mClient.query).toHaveBeenCalledWith(queryText, params);
    expect(mClient.release).toHaveBeenCalled();

    expect(logger.error).toHaveBeenCalledWith(`Error executing query: ${queryText} - ${mockError.message}`);
    expect(logger.info).not.toHaveBeenCalledWith(expect.stringContaining('Retrying query'));
    expect(logger.info).toHaveBeenCalledWith('Client released back to pool');
  });
});

describe('withTransaction', () => {
  const { Pool } = require('pg');
  const mPool = new Pool();

  const mClient = {
    query: jest.fn(),
    release: jest.fn(),
  };

  beforeEach(() => {
    mPool.connect.mockClear();
    mClient.query.mockClear();
    mClient.release.mockClear();
    logger.info.mockClear();
    logger.error.mockClear();
  });

  it('should commit transaction on success', async () => {
    mPool.connect.mockResolvedValueOnce(mClient);
    mClient.query.mockResolvedValue({});

    const transactionFunction = jest.fn().mockResolvedValue('Success');
    const result = await withTransaction(transactionFunction);

    expect(mPool.connect).toHaveBeenCalled();
    expect(mClient.query).toHaveBeenNthCalledWith(1, 'BEGIN');

    expect(transactionFunction).toHaveBeenCalledWith(mClient);

    expect(mClient.query).toHaveBeenNthCalledWith(2, 'COMMIT');
    expect(mClient.release).toHaveBeenCalled();

    expect(result).toBe('Success');

    expect(logger.info).toHaveBeenCalledWith('Transaction started');
    expect(logger.info).toHaveBeenCalledWith('Transaction committed');
    expect(logger.info).toHaveBeenCalledWith('Client released back to pool');
  });

  it('should rollback transaction on error', async () => {
    mPool.connect.mockResolvedValueOnce(mClient);
    mClient.query.mockResolvedValue({});

    const mockError = new Error('Test error');
    const transactionFunction = jest.fn().mockRejectedValue(mockError);

    await expect(withTransaction(transactionFunction)).rejects.toThrow(mockError);

    expect(mPool.connect).toHaveBeenCalled();
    expect(mClient.query).toHaveBeenNthCalledWith(1, 'BEGIN');

    expect(transactionFunction).toHaveBeenCalledWith(mClient);

    expect(mClient.query).toHaveBeenNthCalledWith(2, 'ROLLBACK');
    expect(mClient.release).toHaveBeenCalled();

    expect(logger.error).toHaveBeenCalledWith(`Transaction rolled back due to error: ${mockError.message}`);
    expect(logger.info).toHaveBeenCalledWith('Client released back to pool');
  });
});
