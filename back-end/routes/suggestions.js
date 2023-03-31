const express = require('expresss');
const suggestionRouter = express.Router();


// GET route 
// GET route for getting all suggestions for a dish
suggestionRouter.get('/dishes/:cityId', (req,res)=>{
    const cityId = req.params.cityId;
    const dish_suggests = mongoose.model("cityId", dish);
    if (!dish_suggests) {
        return res.status(404).json({ error: `Dish suggestions within city ID ${cityId} not found` });
      }
    res.json(dish_suggests);
})
// GET route for getting all suggestions for a restaurant
suggestionRouter.get('/restaurants/:cityId', (req,res)=>{
    const cityId = req.params.cityId;
    const restaurant_suggests = mongoose.model("cityId", restaurant);
    if (!restaurant_suggests) {
        return res.status(404).json({ error: `Restaurant suggestions within city ID ${cityId} not found` });
      }
    res.json(restaurant_suggests);
})

// PUT route
// PUT route for updating an existing suggestion for dishes
suggestionRouter.put('/dishes/:cityId', (req,res)=>{
    const cityId = req.params.cityId;
    const dish_suggests = req.body;
    if (!dish_suggests) {
        return res.status(404).json({ error: `Dish suggestions within city ID ${cityId} not found` });
      }
    updateSuggestionForDish(cityId, dish_suggests);
    res.json(dish_suggests);
})
// PUT route for updating an existing suggestion for restaurants
suggestionRouter.put('/restaurants/:cityId', (req,res)=>{
    const cityId = req.params.cityId;
    const restaurant_suggests = req.body;
    if (!restaurant_suggests) {
        return res.status(404).json({ error: `Restaurant suggestions within city ID ${cityId} not found` });
      }
      updateSuggestionForDish(cityId, restaurant_suggests);
    res.json(restaurant_suggests);
})
module.exports = suggestionRouter;