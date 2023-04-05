var chai = require('chai');
var expect = chai.expect;
var request = require('request');
const app = require('../app');

describe('GET /dish/{id}', () => {
  it('failed to respond with JSON containing the dish name', async () => {
    const response = await request(app)
      .get('/dish/123');

    expect(response.status).toEqual(404);
    expect(response.body).not.toHaveProperty('name', '3 Taco Combo');
  });
});

describe('POST /dish/{id}', () => {
  it('responds with JSON containing a failure message', async () => {
    const response = await request(app)
      .post('/dish/123')
      .send({ name: '3 Taco Combo' });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('responseStatus', 400);
  });
});

describe('POST /dish', () => {
  it('responds with JSON containing a failure message', async () => {
    const response = await request(app)
      .post('/dish')
      .send({ name: '3 Taco Combo' });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('responseStatus', 400);
  });
});

describe('DELETE /dish/{id}', () => {
  it('responds with JSON containing a failure message', async () => {
    const response = await request(app)
      .delete('/dish/123');

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('responseStatus', 400);
  });
});
