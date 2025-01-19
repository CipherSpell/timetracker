// backend/tests/health.test.js

const request = require('supertest');
const express = require('express');
const router = require('../routes/health');
const { pingRedis, pingPostgres } = require('../utilities/healthcheck');

jest.mock('../utilities/healthcheck', () => ({
  pingRedis: jest.fn(),
  pingPostgres: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/health', router);

describe('/health Endpoint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return 200 OK when all dependencies are healthy', async () => {
    // Mock healthy responses
    pingRedis.mockResolvedValue({
      state: 'UP',
      latency: '10ms',
    });

    pingPostgres.mockResolvedValue({
      state: 'UP',
      latency: '15ms',
    });

    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: {
        redis: {
          state: 'UP',
          latency: '10ms',
        },
        postgres: {
          state: 'UP',
          latency: '15ms',
        },
      },
      timestamp: expect.any(String),
    });
  });

  test('should return 503 Service Unavailable when Redis is down', async () => {
    // Mock Redis down and Postgres healthy
    pingRedis.mockResolvedValue({
      state: 'DOWN',
      latency: null,
      error: 'Connection refused',
    });

    pingPostgres.mockResolvedValue({
      state: 'UP',
      latency: '15ms',
    });

    const response = await request(app).get('/health');

    expect(response.status).toBe(503);
    expect(response.body).toEqual({
      status: {
        redis: {
          state: 'DOWN',
          latency: null,
          error: 'Connection refused',
        },
        postgres: {
          state: 'UP',
          latency: '15ms',
        },
      },
      timestamp: expect.any(String),
    });
  });

  test('should return 503 Service Unavailable when Postgres is down', async () => {
    // Mock Redis healthy and Postgres down
    pingRedis.mockResolvedValue({
      state: 'UP',
      latency: '10ms',
    });

    pingPostgres.mockResolvedValue({
      state: 'DOWN',
      latency: null,
      error: 'Query failed',
    });

    const response = await request(app).get('/health');

    expect(response.status).toBe(503);
    expect(response.body).toEqual({
      status: {
        redis: {
          state: 'UP',
          latency: '10ms',
        },
        postgres: {
          state: 'DOWN',
          latency: null,
          error: 'Query failed',
        },
      },
      timestamp: expect.any(String),
    });
  });

  test('should return 503 Service Unavailable when both dependencies are down', async () => {
    // Mock both Redis and Postgres down
    pingRedis.mockResolvedValue({
      state: 'DOWN',
      latency: null,
      error: 'Connection refused',
    });

    pingPostgres.mockResolvedValue({
      state: 'DOWN',
      latency: null,
      error: 'Query failed',
    });

    const response = await request(app).get('/health');

    expect(response.status).toBe(503);
    expect(response.body).toEqual({
      status: {
        redis: {
          state: 'DOWN',
          latency: null,
          error: 'Connection refused',
        },
        postgres: {
          state: 'DOWN',
          latency: null,
          error: 'Query failed',
        },
      },
      timestamp: expect.any(String),
    });
  });

  test('should return 500 Internal Server Error on unexpected errors', async () => {
    pingRedis.mockRejectedValue(new Error('Unexpected Error'));

    const response = await request(app).get('/health');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: {
        error: 'Internal Server Error',
      },
      timestamp: expect.any(String),
    });
  });
});
