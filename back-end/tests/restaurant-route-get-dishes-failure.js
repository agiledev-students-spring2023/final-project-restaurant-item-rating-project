

// // Import the necessary modules
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../app');

// // Configure Chai
// chai.use(chaiHttp);
// chai.should();

// // Define the test
// describe('Restaurant', () => {
//   describe('POST /restaurant', () => {
//     it('should return an error when required fields are missing', (done) => {
//       const restaurant = {
//         name: 'Test Restaurant'
//       };
//       chai.request(app)
//         .post('/restaurant')
//         .send(restaurant)
//         .end((error, res) => {
//           res.should.have.status(400);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eq('Validation failed: location: Path `location` is required.');
//           done();
//         });
//     });
//   });
// });

// /* var chai = require('chai');
// var expect = chai.expect;
// var request = require('request');
// const app = require('../app');

// describe('GET /restaurant/{id}', () => {
//   it('failed to respond with JSON containing the dish name and price', async () => {
//     const response = await request(app)
//       .get('/restaurant/123');

//     expect(response.status).toEqual(404);
//     expect(response.body).not.toHaveProperty('name', 'Pizza');
//     expect(response.body).not.toHaveProperty('price', 10);
//   });
// });

// describe('POST /restaurant/{id}', () => {
//   it('responds with JSON containing a failure message', async () => {
//     const response = await request(app)
//       .post('/restaurant/123')
//       .send({ name: 'Pizza', price: 10 });

//     expect(response.status).toEqual(400);
//     expect(response.body).toHaveProperty('responseStatus', 400);
//   });
// });

// describe('POST /restaurant', () => {
//   it('responds with JSON containing a failure message', async () => {
//     const response = await request(app)
//       .post('/restaurant')
//       .send({ name: 'Pizza', price: 10 });

//     expect(response.status).toEqual(400);
//     expect(response.body).toHaveProperty('responseStatus', 400);
//   });
// });

// describe('DELETE /restaurant/{id}', () => {
//   it('responds with JSON containing a failure message', async () => {
//     const response = await request(app)
//       .delete('/restaurant/123');

//     expect(response.status).toEqual(400);
//     expect(response.body).toHaveProperty('responseStatus', 400);
//   });
// });
//  */