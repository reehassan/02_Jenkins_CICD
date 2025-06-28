const request = require('supertest');
const app = require('../index');
let server;

beforeAll((done) => {
  server = app.listen(0, () => done()); // Start server on random port
});

afterAll((done) => {
  server.close(done); // Close server after tests
});

describe('GET /hello', () => {
  it('should return 200 and Hello, World!', async () => {
    const res = await request(app).get('/hello');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Hello, World!' });
  });
});
