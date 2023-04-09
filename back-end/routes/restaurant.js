
// Import necessary modules
const express = require('express');


// get restaurant model
const Restaurant = require("./../db");

// this router is used for paths matching "/restaurant"
const restaurantRouter = express.Router();

// // test route
// restaurantRouter.get('/test', async (req, res) => {
//   // const deleted = await Restaurant.deleteMany({});
//   // console.log("hi");
//   // const newRest = new Restaurant({name:"James"});
//   // await newRest.validate();
//   // await newRest.save();
//   const allRestaurants = await Restaurant.find({});
//   res.json({restaurants:allRestaurants})
// });

// Define the GET endpoint to get restaurant
restaurantRouter.get('/:id', async (req, res) => {
  // res id, given from URL
  const restaurantId = req.params.id; // extract the restaurant ID from the URL parameter

  console.log("restaurantId: ", restaurantId);

  let restaurant;
  try {
    restaurant = await Restaurant.findById(restaurantId).exec(); 
  } catch (err) {
    console.log(err);
  }
  // const restaurant = await Restaurant.findById(restaurantId); 
  if (!restaurant) {
    // error 
    res.statusCode = 404;
    res.json({
      error: "Restaurant not found",
    });
  }

  // Return the restaurant
  res.json(restaurant);
});

// // Define the POST endpoint to update a restaurant by ID
// restaurantRouter.post('/:id', async (req, res) => {
//   const restaurantId = req.params.id; // extract the restaurant ID from the URL parameter


  

//   const updatedRestaurant = {};
//   // const updatedRestaurant = {updateRestaurant(restaurantId, req.body);}

//   // TODO: check if error

//   // Return a success response
//   res.json({responseStatus: 200});
// });

// Define the POST endpoint to create a restaurant
restaurantRouter.post('/', async (req, res) => {
  // Here you can create the restaurant in the database based on the data in the request body
  // For example:
  let newRest;
  try {
    newRest = await Restaurant.create(req.body);
    console.log("this is the result! ", newRest);
    await newRest.validate();
    await newRest.save();
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({
      error: "there was an error creating a new restaurant"
    })
  }
  // Return a success response
  res.statusCode = 200;
  res.json({
    restaurant: newRest,
    message: "success"
  });
});

// // Define the DELETE endpoint to delete a restaurant by ID
// restaurantRouter.delete('/:id', async (req, res) => {
//   const restaurantId = req.params.id; // extract the restaurant ID from the URL parameter

//   // Here you can delete the restaurant from the database based on the restaurant ID
//   // For example:
//   // deleteRestaurant(restaurantId);

//   // Return a success response
//   res.json({ responseStatus: 200 });
// });

module.exports = restaurantRouter;
