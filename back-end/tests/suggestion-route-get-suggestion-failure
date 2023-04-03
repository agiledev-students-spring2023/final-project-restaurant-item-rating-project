const request = require('supertest');
const app = require('./app');
const expect = require('chai').expect;
describe('GET /restaurant/:cityId', ()=>{
    it('failed to respond with JSON containing the restaurant suggestions', async () => {
    const response = await request(app)
    .get('/restaurant/123');
      expect(response.statusCode).toBe(404);
      expect(response.body).not.toHaveProperty('name', 'Pizza');
      expect(response.body).not.toHaveProperty('price', 10);
    })
})
describe('GET /dishes/:cityId', ()=>{
    it('failed to respond with JSON containing the dish suggestions', async () => {
    const response = await request(app)
    .get('/dish/123');
      expect(response.status).toBe(404);
      expect(response.body).not.toHaveProperty('name', 'Pizza');
      expect(response.body).not.toHaveProperty('price', 10);
})
})
