
const express = require('express');
const app = express();
const port = 3000; // set the port number

// Middleware to parse JSON requests
app.use(express.json());

// Define the GET endpoint to get dishes by restaurant ID
app.get('/restaurant/:id', (req, res) => {
  const restaurantId = req.params.id; // extract the restaurant ID from the URL parameter

  // Here you can fetch the dishes from the database based on the restaurant ID
  // For example:
  const dishes = [
    { id: 1, name: 'Pizza' },
    { id: 2, name: 'Burger' },
    { id: 3, name: 'Salad' },
  ];

  // Return the dishes as a response
  res.json(dishes);
});

// Define the POST endpoint to update a restaurant by ID
app.post('/restaurant/:id', (req, res) => {
  const restaurantId = req.params.id; // extract the restaurant ID from the URL parameter

  // Here you can update the restaurant in the database based on the restaurant ID and the data in the request body
  // For example:
  // const updatedRestaurant = updateRestaurant(restaurantId, req.body);

  // Return a success response
  res.json({ responseStatus: 200 });
});

// Define the POST endpoint to create a restaurant
app.post('/restaurant', (req, res) => {
  // Here you can create the restaurant in the database based on the data in the request body
  // For example:
  // const createdRestaurant = createRestaurant(req.body);

  // Return a success response
  res.json({ responseStatus: 200 });
});

// Define the DELETE endpoint to delete a restaurant by ID
app.delete('/restaurant/:id', (req, res) => {
  const restaurantId = req.params.id; // extract the restaurant ID from the URL parameter

  // Here you can delete the restaurant from the database based on the restaurant ID
  // For example:
  // deleteRestaurant(restaurantId);

  // Return a success response
  res.json({ responseStatus: 200 });
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
