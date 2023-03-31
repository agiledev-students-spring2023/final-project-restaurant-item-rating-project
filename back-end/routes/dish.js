const express = require('express');
// this router is used for the paths that match "/dish"
const dishRouter = express.Router();

// GET route for getting a specific dish
dishRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    // You can use the `id` parameter to look up the dish in your database or in-memory store
    const dish = findDishById(id);
    if (!dish) {
      return res.status(404).json({ error: `Dish with ID ${id} not found` });
    }
    res.json(dish);
  });
  
// POST route for creating a new dish
dishRouter.post('', (req, res) => {
  const dish = req.body;
  // You can use the `dish` object to create a new dish in your database or in-memory store
  createDish(dish);
  res.status(201).json(dish);
});

// PUT route for updating an existing dish
dishRouter.put('/:id', (req, res) => {
  const id = req.params.id;
  const dish = req.body;
  // You can use the `id` parameter and `dish` object to update an existing dish in your database or in-memory store
  updateDish(id, dish);
  res.json(dish);
});

// DELETE route for deleting a specific dish
dishRouter.delete('/:id', (req, res) => {
  const id = req.params.id;
  // You can use the `id` parameter to delete the dish from your database or in-memory store
  deleteDishById(id);
  res.sendStatus(204);
});

module.exports = dishRouter;
