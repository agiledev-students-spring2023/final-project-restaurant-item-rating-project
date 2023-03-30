const request = require('supertest');
const app = require('./app');
describe('GET /restaurants/:cityId', ()=>{
    it('responds with JSON containing the dish', async () => {
    const response = await request(app)
      .get('/restaurants/123');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'pizza');
      expect(response.body).toHaveProperty('price', 10)
    })
})
describe('GET /dishes/:cityId', ()=>{
    it('responds with JSON containing the dish', async () => {
    const response = await request(app)
      .get('/dishes/123');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('price', 10) })
})
describe('PUT /restaurants/:cityId', ()=>{
    it('responds with JSON containing the dish', async () => {
    const response = await request(app)
      .put('/restaurants/123');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'pizza');
      expect(response.body).toHaveProperty('price', 10)})
})
describe('PUT /dishes/:cityId', ()=>{
    it('responds with JSON containing the dish', async () => {
    const response = await request(app)
      .put('/dishes/123');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('price', 10)
    })
})