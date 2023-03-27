const express = require('expresss');
const app = express();
const router = express.Router();

app.get('/', (req, res) => {
     res.send('GET request to the homepage')
})
app.post('/', (req, res) => {
    res.send('POST request to the homepage')
})

// GET route 
// GET route for getting all suggestions for a dish
router.get('/dishes/:cityId/suggestions', (req,res)=>{
    const cityId = req.params.cityId;
    const dish_suggests = findDishSuggestions(cityId);
    res.json(dish_suggests);
})
// GET route for getting all suggestions for a restaurant
router.get('/restaurants/:cityId/suggestions', (req,res)=>{
    const cityId = req.params.cityId;
    const restaurant_suggests = findRestaurantSuggestions(cityId);
    res.json(restaurant_suggests);
})

// PUT route
// PUT route for updating an existing suggestion for dishes
router.put('/dishes/:cityId/suggestions', (req,res)=>{
    const cityId = req.params.cityId;
    const dish_suggests = req.body;
    updateSuggestionForDish(cityId, dish_suggests);
    res.json(dish_suggests);
})
// PUT route for updating an existing suggestion for restaurants
router.put('/restaurants/:cityId/suggestions', (req,res)=>{
    const cityId = req.params.cityId;
    const restaurant_suggests = req.body;
    updateSuggestionForDish(cityId, restaurant_suggests);
    res.json(restaurant_suggests);
})
module.exports = router;