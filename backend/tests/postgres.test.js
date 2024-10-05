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
    winston.info.mockClear();
    winston.error.mockClear();
  });

  it('should execute query successfully', async () => {
    const queryText = 'SELECT * FROM users';
    const params = [];
    const mockResult = { 
      rows: [
        { 
          id: 1, 
          email: 'test@example.com', 
          password: 'hashedpassword', 
          created_at: '2023-06-01T00:00:00Z',
          updated_at: '2023-06-01T00:00:00Z'
        }
      ] 
    };

    mClient.query.mockResolvedValueOnce(mockResult);
    mPool.connect.mockResolvedValueOnce(mClient);

    const result = await executeQuery(queryText, params);

    expect(mPool.connect).toHaveBeenCalled();
    expect(mClient.query).toHaveBeenCalledWith(queryText, params);
    expect(result).toEqual(mockResult);
    expect(mClient.release).toHaveBeenCalled();

    expect(winston.info).toHaveBeenCalledWith(`Query executed successfully: ${queryText}`);
    expect(winston.info).toHaveBeenCalledWith('Client released back to pool');
  });

  it('should retry query on error', async () => {
    const queryText = 'SELECT * FROM users WHERE id = $1';
    const params = [1];
    const mockError = new Error('Test error');
    const mockResult = { 
      rows: [
        { 
          id: 1, 
          email: 'test@example.com', 
          password: 'hashedpassword', 
          created_at: '2023-06-01T00:00:00Z',
          updated_at: '2023-06-01T00:00:00Z'
        }
      ] 
    };

    mClient.query
      .mockRejectedValueOnce(mockError)
      .mockResolvedValueOnce(mockResult);

    mPool.connect.mockResolvedValueOnce(mClient);

    const result = await executeQuery(queryText, params);

    expect(mPool.connect).toHaveBeenCalled();
    expect(mClient.query).toHaveBeenNthCalledWith(1, queryText, params);
    expect(mClient.query).toHaveBeenNthCalledWith(2, queryText, params);
    expect(result).toEqual(mockResult);
    expect(mClient.release).toHaveBeenCalled();

    expect(winston.error).toHaveBeenCalledWith(`Error executing query: ${queryText} - ${mockError.message}`);
    expect(winston.info).toHaveBeenCalledWith(`Retrying query (3 retries left)`);
    expect(winston.info).toHaveBeenCalledWith(`Query executed successfully: ${queryText}`);
    expect(winston.info).toHaveBeenCalledWith('Client released back to pool');
  });


  it('should throw error after retries exhausted', async () => {
    const queryText = 'SELECT * FROM users WHERE email = $1';
    const params = ['nonexistent@example.com'];
    const mockError = new Error('Test error');

    mClient.query.mockRejectedValue(mockError);
    mPool.connect.mockResolvedValueOnce(mClient);

    await expect(executeQuery(queryText, params, null, 0)).rejects.toThrow(mockError);

    expect(mPool.connect).toHaveBeenCalled();
    expect(mClient.query).toHaveBeenCalledWith(queryText, params);
    expect(mClient.release).toHaveBeenCalled();

    expect(winston.error).toHaveBeenCalledWith(`Error executing query: ${queryText} - ${mockError.message}`);
    expect(winston.info).not.toHaveBeenCalledWith(expect.stringContaining('Retrying query'));
    expect(winston.info).toHaveBeenCalledWith('Client released back to pool');
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
    winston.info.mockClear();
    winston.error.mockClear();
  });

  it('should commit transaction on success', async () => {
    mPool.connect.mockResolvedValueOnce(mClient);
    mClient.query.mockResolvedValue({ rows: [] });

    const transactionFunction = jest.fn().mockResolvedValue({ rows: [{ id: 1, email: 'new@example.com' }] });
    const result = await withTransaction(transactionFunction);

    expect(mPool.connect).toHaveBeenCalled();
    expect(mClient.query).toHaveBeenNthCalledWith(1, 'BEGIN');

    expect(transactionFunction).toHaveBeenCalledWith(mClient);

    expect(mClient.query).toHaveBeenNthCalledWith(2, 'COMMIT');
    expect(mClient.release).toHaveBeenCalled();

    expect(result).toEqual({ rows: [{ id: 1, email: 'new@example.com' }] });

    expect(winston.info).toHaveBeenCalledWith('Transaction started');
    expect(winston.info).toHaveBeenCalledWith('Transaction committed');
    expect(winston.info).toHaveBeenCalledWith('Client released back to pool');
  });

  it('should rollback transaction on error', async () => {
    mPool.connect.mockResolvedValueOnce(mClient);
    mClient.query.mockResolvedValue({ rows: [] });

    const mockError = new Error('Test error');
    const transactionFunction = jest.fn().mockRejectedValue(mockError);

    await expect(withTransaction(transactionFunction)).rejects.toThrow(mockError);

    expect(mPool.connect).toHaveBeenCalled();
    expect(mClient.query).toHaveBeenNthCalledWith(1, 'BEGIN');

    expect(transactionFunction).toHaveBeenCalledWith(mClient);

    expect(mClient.query).toHaveBeenNthCalledWith(2, 'ROLLBACK');
    expect(mClient.release).toHaveBeenCalled();

    expect(winston.error).toHaveBeenCalledWith(`Transaction rolled back due to error: ${mockError.message}`);
    expect(winston.info).toHaveBeenCalledWith('Client released back to pool');
  });
});

