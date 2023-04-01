const request = require('supertest');
const app = require('./app');
describe('GET /restaurant/:cityId', ()=>{
    it('responds with JSON containing the restaurant', async () => {
    const response = await request(app)
    .get('/restaurant/123');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    })
})
describe('GET /dishes/:cityId', ()=>{
    it('responds with JSON containing the dish', async () => {
    const response = await request(app)
    .get('/dish/123');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
})
})
describe('PUT /restaurants/:cityId', ()=>{
    it('updates with JSON containing the restaurant and returns it', async () => {
      const updatedsuggest = {name : pizza,
        price : 10, }
    const response = await request(app)
      .put('/restaurant/123').send(updatedsuggest);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedsuggest);
})
})
describe('PUT /dishes/:cityId', ()=>{
    it('updates with JSON containing the dish and returns it', async () => {
      const updatedsuggest = {name : pizza,
        price : 10, }
    const response = await request(app)
      .put('/dish/123').send(updatedsuggest);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedsuggest);
    })
})