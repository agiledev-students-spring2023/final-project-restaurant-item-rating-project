const express = require('express');
const app = express();
const router = express.Router();

// GET method route
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})
  
// POST method route
app.post('/', (req, res) => {
    res.send('POST request to the homepage')
})


// GET route for getting all reviews for a dish
router.get('/dishes/:dishId/reviews', (req, res) => {
  const dishId = req.params.dishId;
  // You can use the `dishId` parameter to look up the reviews for a specific dish in your database or in-memory store
  const reviews = findReviewsByDishId(dishId);
  res.json(reviews);
});

// POST route for creating a new review for a dish
router.post('/dishes/:dishId/reviews', (req, res) => {
  const dishId = req.params.dishId;
  const review = req.body;
  // You can use the `dishId` parameter and `review` object to create a new review for the dish in your database or in-memory store
  createReviewForDish(dishId, review);
  res.status(201).json(review);
});

// PUT route for updating an existing review
router.put('/dishes/:dishId/reviews/:reviewId', (req, res) => {
  const dishId = req.params.dishId;
  const reviewId = req.params.reviewId;
  const review = req.body;
  // You can use the `dishId` and `reviewId` parameters and `review` object to update an existing review for the dish in your database or in-memory store
  updateReviewForDish(dishId, reviewId, review);
  res.json(review);
});

// DELETE route for deleting a specific review
router.delete('/dishes/:dishId/reviews/:reviewId', (req, res) => {
  const dishId = req.params.dishId;
  const reviewId = req.params.reviewId;
  // You can use the `dishId` and `reviewId` parameters to delete the review from the dish in your database or in-memory store
  deleteReviewForDishById(dishId, reviewId);
  res.sendStatus(204);
});

module.exports = router;

  