// routes/dish.test.js
process.env.NODE_ENV = 'test';

const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require('chai-http');
const { faker } = require("@faker-js/faker");
// const { server, close } = require('./../server');
const app = require("../app");
const Restaurant = require("./../db");
const Helpers = require("./mock-helpers");

// to mock
const mongoose = require('mongoose');

// middleware
chai.use(chaiHttp);

// idk what this is
const expect = chai.expect;

describe("Dish routes", function () {

    // mock value from helper
    const mockRestaurantObject = Helpers.makeRestaurant();

    // mock mongoose
    this.beforeAll(() => {
        // sinon.stub(Restaurant, "create").resolves(mockDishObject);
    });

    this.afterEach( () => {
        Restaurant.findById.restore();
    })
    
    //Testing GET route for getting dish
    describe("get routes", function () {
        //Don't I need the below code as well?
        it("get a dish that exists", async () => {
            // return an actual restaurant
            sinon.stub(Restaurant, "findById").returns(
                {
                    exec: sinon.stub().returns(mockRestaurantObject)
                }
            );

            const restaurantId = mockRestaurantObject._id;
            const dishId = mockRestaurantObject.dishes.data[0]._id;

            const url = `/restaurant/${restaurantId}/dish/${dishId}`; //${mockDishObject.dish_id} instead of 123?
            const response = await chai.request(app).get(url);

            expect(response.statusCode).to.equal(200);
            const dish = response.body;

            expect(dish.name).to.equal(mockRestaurantObject.dishes.id(dishId).name);

        });

        // it("return 404 if dish not found", async () => {
            
        //     sinon.stub(Restaurant, "findById").resolves(undefined);
        //     const restaurantId = mockRestaurantObject._id;
        //     const dishId = mockRestaurantObject.dishes.data[0]._id;

        //     const url = `/restaurant/${restaurantId}/dish/${dishId}`; //${mockDishObject.dish_id} instead of 123?
        //     const response = await chai.request(app).get(url);

        //     expect(response.statusCode).to.equal(404);
        // });
    });

    // //Testing POST route for creating dish
    // describe("create", function () {
    //     it("add a dish", async () => {
    //         const url = "/restaurant/:restaurantId/dish"; // Is this right or is it just "/dishes" (or is it something else)
    //         const response = await chai.request(app).post(url);
    //             // .post(url)
    //             // .send({
    //             //     name: mockDishObject.name,
    //             //     description: mockDishObject.description,
    //             //     price: mockDishObject.price,
    //             //     restaurantId: mockDishObject.restaurantId
    //             // });
    //         expect(response.statusCode).to.equal(200);
    //         // console.log(response.body.restaurant);
    //         const dishh = response.body.dish;
    //         expect(dishh.restaurantId).to.equal(mockDishObject.restaurantId);
    //         expect(dishh.dish_id).to.equal(mockDishObject.dish_id);
    //         expect(dishh.name).to.equal(mockDishObject.name);
    //         expect(dishh.description).to.equal(mockDishObject.description);
    //         //expect(dishh.price).to.equal(mockDishObject.price); // If including the price above include this as well
    //     });
    // });


    // //Testing POST route for updating dish
    // describe("update", function () {
    //     it("return 404 if dish not found", async () => {
    //         const url = "/dishes/123"; //${mockDishObject.dish_id} instead of 123?
    //         const response = await chai.request(app).post(url);

    //         expect(response.statusCode).to.equal(404);
    //     });
    //     // it("update a dish", async () => {
    //     //     const url = "/restaurant/dishes/123"; // Is this right or is it just "/dishes/123" (or is it something else)
    //     //     const response = await chai.request(app).post(url);
    //     //         // .put(url)
    //     //         // .send({
    //     //     //     name: mockDishObject.name,
    //     //     //     description: mockDishObject.description,
    //     //     //     price: mockDishObject.price,
    //     //     //     restaurantId: mockDishObject.restaurantId
    //     //     // });
    //     //     expect(response.statusCode).to.equal(200);
    //     //     // console.log(response.body.restaurant);
    //     //     const dis = response.body.dish;
    //     //     expect(dis.restaurantId).to.equal(mockDishObject.restaurantId);
    //     //     expect(dis.dish_id).to.equal(mockDishObject.dish_id);
    //     //     expect(dis.name).to.equal(mockDishObject.name);
    //     //     expect(dis.description).to.equal(mockDishObject.description);
    //     //     //expect(dishh.price).to.equal(mockDishObject.price); // If including the price above include this as well
    //     // });
    // });
});
