// Import supertest for HTTP testing
const request = require('supertest');
// Import the Express app
const app = require('../index');

describe('GET /hello', () => {
  it('should return 200 and Hello, World!', async () => {
    // Send GET request to /hello
    const res = await request(app).get('/hello');
    // Check status code
    expect(res.status).toBe(200);
    // Check response body
    expect(res.body).toEqual({ message: 'Hello, World!' });
  });
});