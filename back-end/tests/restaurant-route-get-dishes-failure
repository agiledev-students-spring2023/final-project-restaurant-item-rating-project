const request = require('supertest');
const app = require('./app');

describe('GET /restaurant/:id', () => {
  it('failed to respond with JSON containing the dish name and price', async () => {
    const response = await request(app)
      .get('/restaurant/123');

    expect(response.status).toBe(404);
    expect(response.body).not.toHaveProperty('name', 'Pizza');
    expect(response.body).not.toHaveProperty('price', 10);
  });
});

describe('POST /restaurant/:id', () => {
  it('responds with JSON containing a failure message', async () => {
    const response = await request(app)
      .post('/restaurant/123')
      .send({ name: 'Pizza', price: 10 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('responseStatus', 400);
  });
});

describe('POST /restaurant', () => {
  it('responds with JSON containing a failure message', async () => {
    const response = await request(app)
      .post('/restaurant')
      .send({ name: 'Pizza', price: 10 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('responseStatus', 400);
  });
});

describe('DELETE /restaurant/:id', () => {
  it('responds with JSON containing a failure message', async () => {
    const response = await request(app)
      .delete('/restaurant/123');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('responseStatus', 400);
  });
});
