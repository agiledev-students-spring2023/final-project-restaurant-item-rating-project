const express = require('express');
const app = express();
//const router = express().Router();


// GET method route
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})
  
// POST method route
app.post('/', (req, res) => {
    res.send('POST request to the homepage')
})

/*
// GET route for getting a specific dish
router.get('/dishes/:id', (req, res) => {
    const id = req.params.id;
    // You can use the `id` parameter to look up the dish in your database or in-memory store
    const dish = findDishById(id);
    if (!dish) {
      return res.status(404).json({ error: `Dish with ID ${id} not found` });
    }
    res.json(dish);
  });
  
  // POST route for creating a new dish
  router.post('/dishes', (req, res) => {
    const dish = req.body;
    // You can use the `dish` object to create a new dish in your database or in-memory store
    createDish(dish);
    res.status(201).json(dish);
  });
  
  // PUT route for updating an existing dish
  router.put('/dishes/:id', (req, res) => {
    const id = req.params.id;
    const dish = req.body;
    // You can use the `id` parameter and `dish` object to update an existing dish in your database or in-memory store
    updateDish(id, dish);
    res.json(dish);
  });
  
  // DELETE route for deleting a specific dish
  router.delete('/dishes/:id', (req, res) => {
    const id = req.params.id;
    // You can use the `id` parameter to delete the dish from your database or in-memory store
    deleteDishById(id);
    res.sendStatus(204);
  });
  
  module.exports = router;
  */