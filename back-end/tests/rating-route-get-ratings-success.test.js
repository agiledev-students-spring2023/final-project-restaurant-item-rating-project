// routes/dish.test.js
process.env.NODE_ENV = 'test';

const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require('chai-http');
const { faker } = require("@faker-js/faker");
const app = require("../app");
const Rating = require("./../db");
const Helpers = require("./mock-helpers");

// to mock
const mongoose = require('mongoose');

// middleware
chai.use(chaiHttp);


const expect = chai.expect;

describe("Rating routes", function() {
  // mock values
  const mockReview = Helpers.makeReview();

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
      const response = await chai.request(app)
        .post(url)
        .send(mockReview);
      expect(response.statusCode).to.equal(200);
      const responseObj = response.body;
      expect(responseObj.review).to.exist;
      expect(responseObj.averageRating).to.exist;
      expect(responseObj.review.rating).to.equal(mockReview.rating);
      expect(responseObj.review.review).to.equal(mockReview.review);
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

