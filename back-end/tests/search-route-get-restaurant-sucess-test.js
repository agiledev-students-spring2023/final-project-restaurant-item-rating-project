var chai = require('chai');
var expect = chai.expect;
var request = require('request');
const app = require('../app');
describe('GET /search/{locationId}/{restaurantId}/{Id}', ()=>{
    it('responds with search result', async () => {
    const response = await request(app)
    .get('/search/123/456/789');
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('name', 'Pizza');
      expect(response.body).toHaveProperty('price', 10);
    })
})