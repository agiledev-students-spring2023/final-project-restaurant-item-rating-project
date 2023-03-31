const express = require('express');
// this router is used for paths matching "/suggestion"
const suggestionRouter = express.Router();

// handlers
function makeRestaurantSuggestions() {
  return [];
}
function makeDishSuggestions() {
  return [];
}

// GET route for dishes
suggestionRouter.get('/dishes', (req,res)=>{
    const dishSuggestions = makeDishSuggestions();
    if (!dishSuggestions) {
        return res.status(404).json({ error: `Dish suggestions within city ID ${cityId} not found` });
      }
    res.json(dishSuggestions);
})

// GET route for restaurants
suggestionRouter.get('/restaurants', (req,res)=>{
  restaurantSuggestions = makeRestaurantSuggestions();
    if (!restaurantSuggestions) {
        return res.status(404).json({ error: `Restaurant suggestions within city ID ${cityId} not found` });
      }
    res.json(restaurantSuggestions);
})

module.exports = suggestionRouter;