require('dotenv').config();
const { Pool } = require('pg');
const logger = require('../utilities/logger')

// TODO: replace with actual process.env.ENVVAR after testing
const dbConfig = {
  host: process.env.POSTGRES_HOST, 
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30s
  connectionTimeoutMillis: 2000, // Return an error after 2s if connection cannot be established
};

const pool = new Pool(dbConfig);

// Handle unexpected errors on idle clients
pool.on('error', (err, client) => {
  logger.error(`Unexpected error on idle client: ${err}`);
  process.exit(-1);
});

async function executeQuery(queryText, params = [], client = null, retryCount = 3) {
  let localClient = client;
  let shouldRelease = false;

  // If no client (connection) is passed, a new client is obtained from the pool
  if (!localClient) {
    localClient = await pool.connect();
    shouldRelease = true;
  }

  try {
    const res = await localClient.query(queryText, params);

    logger.info(`Query executed successfully: ${queryText}`);

    return res;
  } catch (err) {
    // On failure, retry query until retryCount reaches 0
    logger.error(`Error executing query: ${queryText} - ${err.message}`);

    if (retryCount > 0) {
      logger.info(`Retrying query (${retryCount} retries left)`);
      return executeQuery(queryText, params, localClient, retryCount - 1);
    } else {
      throw err;
    }
  } finally {
    // client is released if the function acquired it from the pool 
    // as a standalone execution. otherwise, it should be passed when the function 
    // is invoked from inside a transaction so that the queries are executed from 
    // the same client and not acquire a new client each time
    if (shouldRelease) {
      localClient.release();
      logger.info('Client released back to pool');
    }
  }
}

async function withTransaction(transactionFunction) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    logger.info('Transaction started');

    // It basically calls the rest of the executeQuery within the transaction
    // using the same client
    const result = await transactionFunction(client);

    await client.query('COMMIT');
    logger.info('Transaction committed');

    return result;
  } 
  catch (err) {
    await client.query('ROLLBACK');
    logger.error(`Transaction rolled back due to error: ${err.message}`);

    throw err;
  } finally {
    client.release();
    logger.info('Client released back to pool');
  }
}

module.exports = {
  executeQuery,
  withTransaction,
};
