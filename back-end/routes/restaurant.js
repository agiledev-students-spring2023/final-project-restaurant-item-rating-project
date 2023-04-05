const express = require('express');
const mongoose = require('mongoose');

// get restaurant model
const Restaurant = require("./../db");

// this router is used for paths matching "/restaurant"
const restaurantRouter = express.Router();

// const Restaurant = mongoose.model("Restaurant")

// handler functions for routes
function findRestaurantById(id) {
  return ({
    id: id,
    name: "Los Tacos",
    dishes: []
  });
}
function createRestaurant(restaurant) {
  try {
    const newRestaurant = new Restaurant(restaurant);
    newRest.save();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
function updateRestaurant(id, restaurant) {
  return true;
}
function deleteRestaurant(id) {
  return true;
}

// test route
restaurantRouter.get('/hello', async (req, res) => {
  console.log("hi");
  const newRest = new Restaurant({name:"James"});
  newRest.save();
  const allRestaurants = await Restaurant.find();
  res.json({restaurants:allRestaurants})
});

// Define the GET endpoint to get dish by restaurant ID
restaurantRouter.get('/:id', (req, res) => {

  // res id, given from URL
  const restaurantId = req.params.id; // extract the restaurant ID from the URL parameter

  const restaurant = findRestaurantById(restaurantId);

  // Return the dish as a response
  res.json(restaurant);
});

// Define the POST endpoint to update a restaurant by ID
restaurantRouter.post('/:id', (req, res) => {
  const restaurantId = req.params.id; // extract the restaurant ID from the URL parameter

  const updatedRestaurant = updateRestaurant(restaurantId, req.body);

  // TODO: check if error

  // Return a success response
  res.json({responseStatus: 200});
});

// Define the POST endpoint to create a restaurant
restaurantRouter.post('', (req, res) => {
  // Here you can create the restaurant in the database based on the data in the request body
  // For example:
  const createdRestaurant = createRestaurant(req.body);

  // Return a success response
  res.json({...createdRestaurant, responseStatus: 200 });
});

// Define the DELETE endpoint to delete a restaurant by ID
restaurantRouter.delete('/:id', (req, res) => {
  const restaurantId = req.params.id; // extract the restaurant ID from the URL parameter

  // Here you can delete the restaurant from the database based on the restaurant ID
  // For example:
  deleteRestaurant(restaurantId);

  // Return a success response
  res.json({ responseStatus: 200 });
});


module.exports = restaurantRouter;