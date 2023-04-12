process.env.NODE_ENV = 'test';

const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require('chai-http');
const { faker } = require("@faker-js/faker");
const app = require("../app");
const Restaurant = require("./../db");
const Helpers = require("./mock-helpers");

// middleware
chai.use(chaiHttp);

const expect = chai.expect;

describe("Rating failure routes", function() {
  // mock values
    const mockReview = Helpers.makeReview();
    const mockRestaurantObject = Helpers.makeRestaurant();
  // mock mongoose
  beforeEach(() => {
    // sinon.stub(Restaurant, "findById").resolves(mockReview);
    // sinon.stub(Restaurant, "create").resolves(mockReview);
  });

  afterEach(() => {
    sinon.restore();
  });

  // describe("create", function() {
  //   it("should return an error if restaurant or dish not found", async () => {
  //     // stub Restaurant.findById to return undefined
  //     sinon.stub(Restaurant, "findById").returns(undefined);
  
  //     const restaurantId = mockRestaurantObject._id;
  //     const dishId = mockRestaurantObject.dishes.data[0]._id;
  //     const url = `/restaurant/${restaurantId}/dish/${dishId}/review`;
  
  //     // make a request to add a review to the restaurant/dish
  //     const response = await chai.request(app)
  //       .post(url)
  //       .send(mockReview);
  
  //     // assert that the response status code is 500
  //     expect(response.statusCode).to.equal(500);
  
  //     // assert that the response body has an error property with the correct message
  //     const responseObj = response.body;
  //     expect(responseObj).to.have.property('error', 'there was an error creating a new review');
  //   });
  // });

  // describe("create", function() {
  //   it("should return a 500 error if there was an error creating a new review", async () => {
  //     sinon.restore(); // Remove the findById and create stubs before adding new ones
  //     sinon.stub(Rating, "findById").resolves(null);
  //     sinon.stub(Rating, "create").throws();

  //     const url = "/restaurant/:restaurantId/dish/:dishId/review";
  //     const response = await chai.request(app).post(url).send(mockReview);

  //     expect(response.statusCode).to.equal(500);
  //     expect(response.body).to.have.property("error");
  //   });
  // });
  
  describe("get", function() {
    it("should return a 404 error if review not found", async () => {
      sinon.restore(); // Remove the create stub before adding a new one
      sinon.stub(Restaurant, "findById").resolves(null);

      const url = "/restaurant/:restaurantId/dish/:dishId/review/123";
      const response = await chai.request(app).get(url);

      expect(response.statusCode).to.equal(404);
    });
  });
});



