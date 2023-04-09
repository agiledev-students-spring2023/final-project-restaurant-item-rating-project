// routes/dish.test.js
process.env.NODE_ENV = 'test';

const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require('chai-http');
const { faker } = require("@faker-js/faker");
// const { server, close } = require('./../server');
const app = require("../app");
const Restaurant = require("./../db");


// to mock
const mongoose = require('mongoose');

// middleware
chai.use(chaiHttp);

// idk what this is
const expect = chai.expect;

describe("Restaurant routes", function() {
  // mock values
  const mockRestaurantObject = {
    id: faker.random.alphaNumeric(10),
    name: faker.company.name(),
    dishes: [],
    validate: sinon.stub().resolves(1),
    save: sinon.stub().resolves(1),
  };

  // mock mongoose
  this.beforeAll( () => {
    // from DB file
    // sinon.stub(mongoose, "model").returns({
    //   create: sinon.stub().resolves(mockRestaurantObject),
    // });
    sinon.stub(Restaurant, "create").resolves(mockRestaurantObject);
    sinon.stub(Restaurant, "findById").resolves(mockRestaurantObject);
  });




  describe("create", function() {
    it("add a restaurant", async () => {
      const url = "/restaurant";
      const response = await chai.request(app).post(url); 
      expect(response.statusCode).to.equal(200);
      // console.log(response.body.restaurant);
      const rest = response.body.restaurant;
      expect(rest.id).to.equal(mockRestaurantObject.id);
      expect(rest.name).to.equal(mockRestaurantObject.name);
      expect(rest.dishes).to.have.length(0);
    });
  });
  
  // describe("get", function() {
  //   it("return 404 if restaurant not found", async () => {
  //     const url = "/restaurant/123";
  //     const response = await chai.request(app).post(url);

  //     expect(response.statusCode).to.equal(404);
  //   });
  // });


  
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