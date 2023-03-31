const express = require('express');
// this router is used for paths matching "/dish/:dishId/reviews"
const ratingRouter = express.Router();

function findReviewsByDishId(dishId) {
  return ([
    {
    id: 1,
    value: 3,
    },
    {
    id: 2,
    value: 4,
    },

  ]);
}
function createReview(dishId, review) {
  return true;
}
function updateReview(dishId, reviewId, review) {
  return true;
}
function deleteReview(dishId, reviewId) {
  return true;
}

// GET route for getting all reviews for a dish
ratingRouter.get('/', (req, res) => {
  const dishId = req.params.dishId;
  // You can use the `dishId` parameter to look up the reviews for a specific dish in your database or in-memory store
  const reviews = findReviewsByDishId(dishId);
  res.json(reviews);
});

// POST route for creating a new review for a dish
ratingRouter.post('/', (req, res) => {
  const dishId = req.params.dishId;
  const review = req.body;
  // You can use the `dishId` parameter and `review` object to create a new review for the dish in your database or in-memory store
  createReview(dishId, review);
  res.status(201).json(review);
});

// PUT route for updating an existing review
ratingRouter.put('/:reviewId', (req, res) => {
  const dishId = req.params.dishId;
  const reviewId = req.params.reviewId;
  const review = req.body;
  // You can use the `dishId` and `reviewId` parameters and `review` object to update an existing review for the dish in your database or in-memory store
  updateReview(dishId, reviewId, review);
  res.json(review);
});

// DELETE route for deleting a specific review
ratingRouter.delete('/:reviewId', (req, res) => {
  const dishId = req.params.dishId;
  const reviewId = req.params.reviewId;
  // You can use the `dishId` and `reviewId` parameters to delete the review from the dish in your database or in-memory store
  deleteReview(dishId, reviewId);
  res.sendStatus(204);
});

module.exports = ratingRouter;

  