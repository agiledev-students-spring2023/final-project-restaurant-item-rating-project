const express = require('express');

// this router is used for paths matching "/restaurant"
const restaurantRouter = express.Router();

// handler functions for routes
function findRestaurantById(id) {
  return ({
    id: id,
    name: "Los Tacos",
    dishes: []
  });
}
function createRestaurant(restaurant) {
  return true;
}
function updateRestaurant(id, restaurant) {
  return true;
}
function deleteRestaurant(id) {
  return true;
}

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