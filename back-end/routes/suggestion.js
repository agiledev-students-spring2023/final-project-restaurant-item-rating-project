const express = require('express');
//Mongoose required
const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.Promise = global.Promise;
// this router is used for paths matching "/suggestion"
const suggestionRouter = express.Router();
//MongoDB imported
const suggestionSchema = new mongoose.Schema({
  Restaurant:{
    name: String,
    location: String,
    dishes: Array},
    Dish:{
      name: String
    }
   });

const DishModel = mongoose.model('Dish', suggestionSchema);
const RestaurantModel = mongoose.model('Restaurant', suggestionSchema);
// handlers
async function makeRestaurantSuggestions() {
  const RestaurantFromDb = await RestaurantModel.findById(id).exec();
  return RestaurantFromDb;
}
async function makeDishSuggestions() {
  const DishFromDb = await DishModel.findById(id).exec();
  return DishFromDb];
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

module.exports = RestaurantModel;
module.exports = DishModel;