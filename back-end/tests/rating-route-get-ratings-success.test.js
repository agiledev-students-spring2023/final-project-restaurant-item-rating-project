// routes/dish.test.js
process.env.NODE_ENV = 'test';

const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require('chai-http');
const { faker } = require("@faker-js/faker");
const app = require("../app");
const Rating = require("./../db");

// to mock
const mongoose = require('mongoose');

// middleware
chai.use(chaiHttp);


const expect = chai.expect;

describe("Rating routes", function() {
  // mock values
  const mockReview = {
    id: faker.random.alphaNumeric(10),
    rating: faker.datatype.number({min: 1, max: 5}),
    review: faker.lorem.sentence(),
    validate: sinon.stub().resolves(1),
    save: sinon.stub().resolves(1),
  };

  // mock mongoose
  beforeEach(() => {
    sinon.stub(Rating, "findById").resolves(mockReview);
    sinon.stub(Rating, "create").resolves(mockReview);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("create", function() {
    it("add a review", async () => {
      const url = "/restaurant/:restaurantId/dish/:dishId/review";
      const response = await chai.request(app).post(url); 
      expect(response.statusCode).to.equal(200);
      // console.log(response.body.review);
      // const rev = response.body.review;
      // expect(rev.id).to.equal(mockReview.id);
      // expect(rest.rating).to.equal(mockReview.rating);
      // expect(rest.review).to.equal(mockReview.review);
    });
  });
  
  describe("get", function() {
    it("return 404 if review not found", async () => {
      sinon.restore(); // Remove the create stub before adding a new one
      sinon.stub(Rating, "findById").resolves(null);

      const url = "/restaurant/:restaurantId/dish/:dishId/review/123";
      const response = await chai.request(app).get(url);

      expect(response.statusCode).to.equal(404);
    });
  });
});



// console.log("beg")
// done();

// const s = sinon.stub(Restaurant, "create").resolves({
//   id: faker.random.alphaNumeric(10),
//   name: faker.company.name(),
//   dishes: [],
//   validate: sinon.stub().resolves(1),
//   save: sinon.stub().resolves(1),
// });
// const res = await chai.request(server).post('/restaurant');
// expect(res.status).to.equal(200);
// // specific
// expect(1).to.equal(1);
// done();

// const url = "http://localhost:3000/restaurant";
// const url = "/restaurant";
// console.log(response);
// const rest = JSON.parse(response.body);
// console.log(rest.restaurant.id);
// expect(rest.id).to.equal(mockRestaurantObject.id);
// expect(rest.name).to.equal(mockRestaurantObject.name);
// expect(rest.dishes).to.have.length(0);
// done();

//   function(error, response, body) {
//     if (error) {
//       console.log("hi", error);
//     }
//     else {
//       console.log("got here1...");
//     }
//   });
//   console.log("end")


// // mock mongoose
// this.beforeEach( () => {

//   // // from DB file
//   // sinon.stub(mongoose, "connect").resolves({
//   //   model: sinon.stub().returns({
//   //     create: sinon.stub().resolves(mockRestaurantObject),
//   //   })
//   // });
  
//   // from DB file
//   sinon.stub(mongoose, "model").returns({
//     create: sinon.stub().resolves(mockRestaurantObject),
//   });
//   sinon.stub(Restaurant, "create").resolves(mockRestaurantObject);
// });

// // close server and database
// this.afterAll( async () => {
//   close();
//   // await mongoose.connection.close();
// })


// this.beforeEach( () => {
//   sinon.stub(mongoose, "connect");
// })
// this.afterEach( () => {
//   close();
// })
















// // var chai = require('chai');
// // var expect = chai.expect;
// // var request = require('request');
// // const app = require('../app');

// // describe('ratingRouter', () => {
// //     describe('GET /dish/{dishId}/reviews', () => {
// //       it('should return an array of reviews', async () => {
// //         const res = await request(app).get('/dish/1/reviews');
// //         expect(res.statusCode).toEqual(200);
// //         expect(res.body).toBeInstanceOf(Array);
// //       });
// //     });

// //     describe('Post /dish/{dishID}/reviews', ()=> {
// //         it('should create a new review and return it in an array of reviews',async()=>{
// //             const newReview = {
// //                 value: 5,
// //             };
// //             const res = await request(app)
// //             .post('/dish/1/reviews')
// //             .send(newReview);
// //             expect(res.statusCode).toEqual(201);
// //             expect(res.body).toMatchObject(newReview);
// //         });
// //     });

// //     describe('Put /dish/{dishId}/reviews/{reviewId}',()=>{
// //         it('should update an exisiting review and return it in an array of reviews',async()=>{
// //             const updatedReview = {
// //                 value: 4,
// //             };
// //             const res = await request(app)
// //             .put('/dish/1/reviews/1')
// //             .send(updatedReview)
// //             expect(res.statusCode).toEqual(200);
// //             expect(res.body).toMatchObject(updatedReview);
// //         }); 
// //     });

// //     describe('DELETE /dish/{dishId}/reviews/{reviewId}',()=>{
// //         it('should delete an existing review',async()=>{
// //             const res = await request(app).delete('/dish/1/reviws/1');
// //             expect(res.statusCode).toEqual(204);
// //         });
// //     });
// // });
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const expect = chai.expect;
// const axios = require('axios');

// const app = require('../app'); // replace with the path to your Express app

// chai.use(chaiHttp);

// describe('Dish reviews API', () => {
//   // Test GET /dish/:dishId/reviews
//   describe('GET /dish/:dishId/reviews', () => {
//     it('should return an empty array when there are no reviews for the specified dish', (done) => {
//       axios.get('http://localhost:3000/restaurant/dish/1/review')
//         .then((res) => {
//           expect(res.status).to.equal(200);
//           expect(res.data).to.be.an('array').that.is.empty;
//           done();
//         })
//         .catch(done);
//     });

//     // it('should return an array of reviews for the specified dish', (done) => {
//     //   axios.get('http://localhost:3000/restaurant/dish/1/review')
//     //     .then((res) => {
//     //       expect(res.status).to.equal(200);
//     //       expect(res.data).to.be.an('array').that.has.lengthOf(2);
//     //       expect(res.data[0]).to.have.property('id');
//     //       expect(res.data[0]).to.have.property('rating');
//     //       expect(res.data[0]).to.have.property('review');
//     //       expect(res.data[0]).to.have.property('dishName');
//     //       expect(res.data[0]).to.have.property('averageRating');
//     //       done();
//     //     })
//     //     .catch(done);
//     // });
//   });

//   describe('POST http://localhost:3000/restaurant/dish/1/review', () => {
//         it('should create a new review for the specified dish and return the review object and average rating', (done) => {
//           const review = {
//             ratings: [4, 5, 3],
//             review: 'This pasta was delicious!',
//           };
    
//           axios.post('http://localhost:3000/restaurant/dish/1/review', review)
//             .then((res) => {
//               expect(res.status).to.equal(201);
//               expect(res.data).to.have.property('dishName');
//               expect(res.data).to.have.property('review');
//               expect(res.data).to.have.property('roundedAverageRating');
//               expect(res.data.review).to.have.property('id');
//               expect(res.data.review).to.have.property('rating').that.equals(3);
//               expect(res.data.review).to.have.property('review').that.equals('This pasta was delicious!');
//               expect(res.data.review).to.have.property('dishId').that.equals(1);
//               expect(res.data.review).to.have.property('averageRating').that.equals(4);
//               done();
//             })
//             .catch(done);
//         });
// });
// });



// // // Test POST /dish/:dishId/reviews
// // describe('POST http://localhost:3000/restaurant/dish/1/review', () => {
// //     it('should create a new review for the specified dish and return the review object and average rating', (done) => {
// //       const review = {
// //         ratings: [4, 5, 3],
// //         review: 'This pasta was delicious!',
// //       };

// //       axios.post('http://localhost:3000/restaurant/dish/1/review', review)
// //         .then((res) => {
// //           expect(res.status).to.equal(201);
// //           expect(res.data).to.have.property('dishName');
// //           expect(res.data).to.have.property('review');
// //           expect(res.data).to.have.property('roundedAverageRating');
// //           expect(res.data.review).to.have.property('id');
// //           expect(res.data.review).to.have.property('rating').that.equals(3);
// //           expect(res.data.review).to.have.property('review').that.equals('This pasta was delicious!');
// //           expect(res.data.review).to.have.property('dishId').that.equals(1);
// //           expect(res.data.review).to.have.property('averageRating').that.equals(4);
// //           done();
// //         })
// //         .catch(done);
// //     });
// //   });
// // });
