process.env.NODE_ENV = 'test';

const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require('chai-http');
const { faker } = require("@faker-js/faker");
const app = require("../app");
const {Restaurant} = require("./../db");

// to mock
const mongoose = require('mongoose');

// middleware
chai.use(chaiHttp);

// idk what this is
const expect = chai.expect;

describe("Restaurant Suggestion routes", function() {
  // mock values
function MakeMockRestaurant()  {
  return{
    id: faker.random.alphaNumeric(10),
    name:faker.lorem.sentence(10),
    dishes: [],
    validate: sinon.stub().resolves(1),
    save: sinon.stub().resolves(1),
  };
};

const MockRestaurant = Array.from({length:10}, MakeMockRestaurant);

  // mock mongoose
  this.beforeAll( () => {
    // from DB file
    // sinon.stub(mongoose, "model").returns({
    //   create: sinon.stub().resolves(mockRestaurantObject),
    // });
    sinon.stub(Restaurant, "find").resolves(MockRestaurant);
  });

  this.afterAll(() =>{
    sinon.restore();
  })

  describe("GET", function() {
    it("get restaurants from suggestion", async () => {
      const url = "/suggestion/restaurant";
      const response = await chai.request(app).get(url); 
      const suggestion = response.body;
      expect(suggestion.length).to.equal(MockRestaurant.length);
      expect(response.statusCode).to.equal(200);
      expect(suggestion.id).to.equal(MockRestaurant.id);
      expect(suggestion.name).to.equal(MockRestaurant.name);
      expect(suggestion.dishes).to.equal(MockRestaurant.dishes);
    });
  });
  
  describe("GET", function() {
    it("return 404 if suggestion restaurant not found", async () => {
      sinon.restore();
      sinon.stub(Restaurant, "find").resolves(null);
      const url = "/suggestion/restaurant/123";
      const response = await chai.request(app).get(url);

      expect(response.statusCode).to.equal(404);
    });
  });


  
});


