process.env.NODE_ENV = 'test';

const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require('chai-http');
const { faker } = require("@faker-js/faker");
const app = require("../app");
const Restaurant = require("../db");

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
    name: faker.lorem.sentence(10),
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
    sinon.stub(Restaurant, "findById").resolves(mockRestaurantObject);
  });

  this.afterAll(() =>{
    sinon.restore;
  })

  describe("GET", function() {
    it("failed to get a restaurant from suggestion and returns a 400 error", async () => {
      sinon.restore();
      sinon.stub(Restaurant, "findById").resolves(null);
      const url = "/restaurant/:cityId";
      const response = await chai.request(app).get(url); 
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property("error");
    });
  });
  
  describe("GET", function() {
    it("return 404 if suggestion restaurant not found", async () => {
      sinon.restore();
      sinon.stub(Restaurant, "findById").resolves(null);
      const url = "/restaurant/123";
      const response = await chai.request(app).get(url);

      expect(response.statusCode).to.equal(404);
    });
  });


  
});


