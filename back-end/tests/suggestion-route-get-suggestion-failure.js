var chai = require('chai');
var expect = chai.expect;
var request = require('request');
const app = require('../app');
describe('GET /restaurant/{cityId}', ()=>{
    it('failed to respond with JSON containing the restaurant suggestions', async () => {
    const response = await request(app)
    .get('/restaurant/123');
      expect(response.statusCode).toEqual(404);
      expect(response.body).not.toHaveProperty('name', 'Los Tacos');
      
    })
})
describe('GET /dishes/{cityId}', ()=>{
    it('failed to respond with JSON containing the dish suggestions', async () => {
    const response = await request(app)
    .get('/dish/123');
      expect(response.status).toEqaul(404);
      expect(response.body).not.toHaveProperty('name', 'Pizza');
      expect(response.body).not.toHaveProperty('price', 10);
})
})
