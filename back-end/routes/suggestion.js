const express = require('express');
//Mongoose required
const {Restaurant} = require("./../db");

// this router is used for paths matching "/suggestion"
const suggestionRouter = express.Router();


// GET route for restaurants
suggestionRouter.get('/restaurant', async (req, res)=>{
  
  const restaurantSuggestions = await Restaurant.find({});
  if (!restaurantSuggestions) {
      res.statusCode = 404;
      return res.json({ error: `Restaurant suggestions within city ID ${req.cityId} not found` });
  }
  res.statusCode = 200;
  res.json(restaurantSuggestions);
});

// GET route for dishes
// suggestionRouter.get('/dish', (req, res)=>{
//     const dishSuggestions = await Restaurant.find({});
//     if (!dishSuggestions) {
//         return res.status(404).json({ error: `Dish suggestions within city ID ${req.cityId} not found` });
//       }
//      res.json(dishSuggestions);
// })

module.exports = suggestionRouter;