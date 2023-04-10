const express = require('express');
// this router is used for the paths that match "/restaurant/:restaurantId/dish"

// get restaurant model
const Restaurant = require("./../db");

const dishRouter = express.Router(); //const dishRouter = express.Router({ mergeParams: true });

//NEW STUFF!!:
// Define the GET endpoint to get restaurant
dishRouter.get('/:id', async (req, res) => {  //Change :id to :dishId?
  // res id, given from URL
  const restaurantId = req.params.restaurantId; // extract the restaurant ID from the URL parameter
  const dishId = req.params.id;

  console.log("restaurantId: ", restaurantId);
  console.log("dishId: ", dishId)

  let restaurant;
  try {
    restaurant = await Restaurant.findById(restaurantId).exec();

    if (!restaurant) {
      // error 
      res.statusCode = 404;
      res.json({
        error: "Restaurant not found",
      });
    }

    dish = await restaurant.dishes.id(dishId);

    if (!dish) {
      res.statusCode = 404;
      res.json({
        error: 'Dish not found'
      });
      return;
    }

  }
  catch (err) {
    console.log(err);
  }


  // Return the restaurant
  res.json(dish);
});

// Define the POST endpoint to create a a dish for a restaurant
dishRouter.post('/', async (req, res) => {  //Is :dishId right here?
  // Here you can create the restaurant in the database based on the data in the request body
  // For example:
  //slet newRest;
  try {
    console.log("req.body", req.body);
    //newRest = await Restaurant.create(req.body);
    const restaurant = await Restaurant.findById(restaurantId);

    await newRest.validate();
    await newRest.save();
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({
      error: "there was an error creating a new restaurant"
    })
  }
  // Return a success response
  res.statusCode = 200;
  res.json({
    restaurant: newRest,
    message: "success"
  });
});
//END OF NEW STUFF

/*
// handler functions for routes
function findDishById(id) {
  return ({
    id: id,
    name: "3 Taco Combo",
  });
}
function createDish(dish) {
  return true;
}
function updateDish(id, dish) {
  return true;
}
function deleteDish(id) {
  return true;
}

// GET route for getting a specific dish
dishRouter.get('/:dishId', (req, res) => {
    const id = req.params.dishId;
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
dishRouter.put('/:dishId', (req, res) => {
  const id = req.params.dishId;
  const dish = req.body;
  // You can use the `id` parameter and `dish` object to update an existing dish in your database or in-memory store
  updateDish(id, dish);
  res.json(dish);
});

// DELETE route for deleting a specific dish
dishRouter.delete('/:dishId', (req, res) => {
  const id = req.params.dishId;
  // You can use the `id` parameter to delete the dish from your database or in-memory store
  deleteDish(id);
  res.sendStatus(204);
});
*/

module.exports = dishRouter;
