
const express = require('express');
const app = express();
const port = 3000; // set the port number

// Middleware to parse JSON requests
app.use(express.json());

// Define the GET endpoint to get dish by restaurant ID
app.get('/restaurant/:id', (req, res) => {

  //res id, given from URL
  const restaurantId = req.params.id; // extract the restaurant ID from the URL parameter

  // Here you can fetch the dish from the database based on the restaurant ID
  // For example:
  const Dish = mongoose.model('Dish');

  // Return the dish as a response
  res.json(Dish);
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


//I don't think we need to start the server because this is not the homepage
/* // Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
}); */