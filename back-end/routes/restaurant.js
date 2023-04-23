// Import necessary modules
const express = require("express");
const { Restaurant } = require("./../db");

// this router is used for paths matching "/restaurant"
const restaurantRouter = express.Router();

// Define the GET endpoint to get restaurant
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
