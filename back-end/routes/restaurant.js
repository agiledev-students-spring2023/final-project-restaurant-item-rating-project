// Import necessary modules
const express = require("express");
const { Restaurant } = require("./../db");

// this router is used for paths matching "/restaurant"
const restaurantRouter = express.Router();

restaurantRouter.get("/test", async (req, res) => {
  const restaurants = await Restaurant.find({});
  const things = restaurants.map( (restaurant) => {
    var count = Object.keys(myObject).length;
    return ({
      id:restaurant.id,
      size:count,
    });
  });
  res.json({msg:"hey"});
});

restaurantRouter.get("/delete/:id", async (req, res) => {

  const deleteMsg = await Restaurant.delete({
    _id: req.params.id,
  });

  res.json({thing: deleteMsg});
});


// Define the GET endpoint to get restaurant
//get restaurant
restaurantRouter.get("/:id", async (req, res) => {
  // res id, given from URL
  const restaurantId = req.params.id; // extract the restaurant ID from the URL parameter

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

// Define the POST endpoint to create a restaurant
//create restaurnat
restaurantRouter.post("/", async (req, res) => {
  // Here you can create the restaurant in the database based on the data in the request body
  // For example:
  let newRest;
  try {
    console.log("req.body", req.body);
    newRest = await Restaurant.create(req.body);

    await newRest.validate();
    await newRest.save();
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({
      error: "there was an error creating a new restaurant",
    });
  }
  // Return a success response
  res.statusCode = 200;
  res.json({
    restaurant: newRest,
    message: "success",
  });
});

module.exports = restaurantRouter;
