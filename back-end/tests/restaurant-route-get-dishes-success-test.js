var chai = require('chai');
var expect = chai.expect;
var request = require('request');
const app = require('../app');

describe('GET /restaurant/{id}', () => {
  it('responds with JSON containing the dish and price', async () => {
    const response = await request(app)
      .get('/restaurant/123');

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('name', 'Pizza');
    expect(response.body).toHaveProperty('price', 10);
  });
});

describe('POST /restaurant/{id}', () => {
  it('responds with JSON containing a success message', async () => {
    const response = await request(app)
      .post('/restaurant/123')
      .send({ name: 'Pizza', price: 10 });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('responseStatus', 200);
  });
});

describe('POST /restaurant', () => {
  it('responds with JSON containing a success message', async () => {
    const response = await request(app)
      .post('/restaurant')
      .send({ name: 'Pizza', price: 10 });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('responseStatus', 200);
  });
});

describe('DELETE /restaurant/{id}', () => {
  it('responds with JSON containing a success message', async () => {
    const response = await request(app)
      .delete('/restaurant/123');

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('responseStatus', 200);
  });
});
