// routes/dish.test.js
process.env.NODE_ENV = 'test';

const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require('chai-http');
const { faker } = require("@faker-js/faker");
const app = require("../app");
const Restaurant = require("./../db");
const Helpers = require("./mock-helpers");

// to mock
const mongoose = require('mongoose');

// middleware
chai.use(chaiHttp);


const expect = chai.expect;
describe("Rating routes", function() {
  // mock values
  const mockReview = Helpers.makeReview();
  const mockRestaurantObject = Helpers.makeRestaurant();

  // update dishes property to be an array
  mockRestaurantObject.dishes = [    ...mockRestaurantObject.dishes.data  ];

  // mock mongoose
  beforeEach(() => {
    sinon.stub(Restaurant, "findById").resolves(mockRestaurantObject);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("create", function() {
    it("adds a review", async () => {
      const restaurantId = mockRestaurantObject._id;
      const dishId = mockRestaurantObject.dishes[0]._id;
      const url = `/restaurant/${restaurantId}/dish/${dishId}/review`;

      const response = await chai.request(app)
        .post(url)
        .send(mockReview);
      
      expect(response.statusCode).to.equal(200);
      const responseObj = response.body;
      expect(responseObj.success).to.exist;
    });
  });
  
  
  describe("get", function() {
    it("return 404 if review not found", async () => {
      sinon.restore(); // Remove the create stub before adding a new one
      sinon.stub(Restaurant, "findById").resolves(null);

      const url = "/restaurant/:restaurantId/dish/:dishId/review/123";
      const response = await chai.request(app).get(url);

      expect(response.statusCode).to.equal(404);
    });
  });
});
