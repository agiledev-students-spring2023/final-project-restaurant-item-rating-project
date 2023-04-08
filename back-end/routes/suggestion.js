const express = require('express');
//Mongoose required
const mongoose = require('mongoose');
const Restaurant = require("./../db");
const Dish = require("./../db");

mongoose.Promise = global.Promise;
// this router is used for paths matching "/suggestion"
const suggestionRouter = express.Router();

// handlers
async function makeRestaurantSuggestions(cityId) {
  const restaurantFromDb = await Restaurant.findById(cityId).exec();
  return restaurantFromDb;
}

async function makeDishSuggestions(cityId) {
  const dishFromDb = await Dish.findById(cityId).exec();
  return dishFromDb;
}

// GET route for dishes
suggestionRouter.get('/dishes', (req, res)=>{
    const dishSuggestions = makeDishSuggestions(req.params.cityId);
    if (!dishSuggestions) {
        return res.status(404).json({ error: `Dish suggestions within city ID ${req.cityId} not found` });
      }
     res.json(dishSuggestions);
})

// GET route for restaurants
suggestionRouter.get('/restaurants', (req, res)=>{
  restaurantSuggestions = makeRestaurantSuggestions(req.params.cityId);
    if (!restaurantSuggestions) {
        return res.status(404).json({ error: `Restaurant suggestions within city ID ${req.cityId} not found` });
      }
    res.json(restaurantSuggestions);
})

module.exports = suggestionRouter;