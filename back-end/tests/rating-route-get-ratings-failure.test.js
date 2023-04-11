process.env.NODE_ENV = 'test';

const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require('chai-http');
const { faker } = require("@faker-js/faker");
const app = require("../app");
const Rating = require("./../db");
const Helpers = require("./mock-helpers");

// middleware
chai.use(chaiHttp);

const expect = chai.expect;

describe("Rating failure routes", function() {
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
    it("should return a 500 error if there was an error creating a new review", async () => {
      sinon.restore(); // Remove the findById and create stubs before adding new ones
      sinon.stub(Rating, "findById").resolves(null);
      sinon.stub(Rating, "create").throws();

      const url = "/restaurant/:restaurantId/dish/:dishId/review";
      const response = await chai.request(app).post(url).send(mockReview);

      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.property("error");
    });
  });
  
  describe("get", function() {
    it("should return a 404 error if review not found", async () => {
      sinon.restore(); // Remove the create stub before adding a new one
      sinon.stub(Rating, "findById").resolves(null);

      const url = "/restaurant/:restaurantId/dish/:dishId/review/123";
      const response = await chai.request(app).get(url);

      expect(response.statusCode).to.equal(404);
    });
  });
});



