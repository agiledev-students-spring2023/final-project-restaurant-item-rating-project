var chai = require('chai');
var expect = chai.expect;
var request = require('request');
const app = require('../app');
describe('GET /restaurant/{cityId}', ()=>{
    it('responds with JSON containing the restaurant suggestions', async () => {
    const response = await request(app)
    .get('/restaurant/123');
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('name', 'Los Tacos');
    })
})
describe('GET /dishes/{cityId}', ()=>{
    it('responds with JSON containing the dish suggestions', async () => {
    const response = await request(app)
    .get('/dish/123');
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('name', 'Pizza');
      expect(response.body).toHaveProperty('price', 10);
})
})
