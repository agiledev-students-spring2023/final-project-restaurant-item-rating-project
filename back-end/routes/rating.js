const express = require('express');
// this router is used for paths matching "/dish/:dishId/reviews"
const ratingRouter = express.Router();

const cors = require('cors');

ratingRouter.use(cors());

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
// ratingRouter.get('/', (req, res) => {
//   const dishId = req.params.dishId;
//   // You can use the `dishId` parameter to look up the reviews for a specific dish in your database or in-memory store
//   const reviews = findReviewsByDishId(dishId);
//   res.json(reviews);
// });

// ratingRouter.get('/:dishId/reviews', (req, res) => {
//   const dishId = req.params.dishId;
//   // You can use the `dishId` parameter to look up the reviews for a specific dish in your database or in-memory store
//   const reviews = findReviewsByDishId(dishId);
//   res.json(reviews);
// });

ratingRouter.post('/', (req, res) => {
  const dishId = req.params.dishId;
  const review = req.body;
  // You can use the `dishId` parameter and `review` object to create a new review for the dish in your database or in-memory store
  createReview(dishId, review);
  
  const ratings = review.ratings;

  const averageRating = ratings.reduce((acc,cur)=>acc+cur /ratings.length);
  
  const roundedAverageRating = Number(averageRating.toFixed(2));
  review.averageRating = roundedAverageRating;

  // Send the review object and average rating to the client
  res.status(201).json({ review, roundedAverageRating });
  // res.status(201).json(review);
}); 

// POST route for creating a new review for a dish
// ratingRouter.post('/:dishId/reviews', (req, res) => {
//   const dishId = req.params.dishId;
//   const review = req.body;
//   // You can use the `dishId` parameter and `review` object to create a new review for the dish in your database or in-memory store
//   createReview(dishId, review);

//   const ratings = review.ratings;

//   const averageRating = ratings.reduce((acc,cur)=>acc+cur /ratings.length);
  
//   const roundedAverageRating = Number(averageRating.toFixed(2));
//   review.averageRating = roundedAverageRating;

//   // Send the review object and average rating to the client
//   res.status(201).json({ review, roundedAverageRating });
//   // res.status(201).json(review);
// });


// ratingRouter.get('/:dishId', (req, res) => {
//   const dishId = req.params.dishId;

//   // Filter the reviews to only include those with the specified dishId
//   const dishReviews = reviews.filter(review => review.dishId === dishId);

//   // If there are no reviews for the specified dish, return an empty array
//   if (dishReviews.length === 0) {
//     return res.status(200).json([]);
//   }

//   // Calculate the average rating based on the dish reviews
//   const ratings = dishReviews.map(review => review.ratings);
//   const flattenedRatings = [].concat.apply([], ratings); // Flatten the nested arrays of ratings
//   const averageRating = flattenedRatings.reduce((acc, cur) => acc + cur) / flattenedRatings.length;
//   const roundedAverageRating = Number(averageRating.toFixed(2));

//   // Return the ratings and average rating as JSON
//   res.status(200).json({ ratings: flattenedRatings, averageRating: roundedAverageRating });
// });






// PUT route for updating an existing review
// ratingRouter.put('/:reviewId', (req, res) => {
//   const dishId = req.params.dishId;
//   const reviewId = req.params.reviewId;
//   const review = req.body;
//   // You can use the `dishId` and `reviewId` parameters and `review` object to update an existing review for the dish in your database or in-memory store
//   updateReview(dishId, reviewId, review);
//   res.json(review);
// });

// // DELETE route for deleting a specific review
// ratingRouter.delete('/:reviewId', (req, res) => {
//   const dishId = req.params.dishId;
//   const reviewId = req.params.reviewId;
//   // You can use the `dishId` and `reviewId` parameters to delete the review from the dish in your database or in-memory store
//   deleteReview(dishId, reviewId);
//   res.sendStatus(204);
// });

module.exports = ratingRouter;





// const express = require('express');
// const bodyParser = require('body-parser');
// // this router is used for paths matching "/dish/:dishId/reviews"
// const ratingRouter = express.Router();
// ratingRouter.use(bodyParser.json());

// const reviews = {};

// ratingRouter.post('/', (req, res) => {
//   const dishId = req.params.dishId;
//   const reviewData = req.body;

//   const ratings = reviewData.ratings;
//   const averageRating = ratings.reduce((acc,cur)=>acc+cur /ratings.length);
//   reviewData.averageRating = averageRating;

//   // if(!reviews[dishId]){
//   //   reviews[dishId] = [];
//   // }
//   // reviews[dishId].push(reviewData);

// res.send({reviewData,averageRating});
//   // res.send(`Received POST request for dish with ID ${dishId} with review data: ${JSON.stringify(reviewData)}`);
// });

// // ratingRouter.get('/',(req,res)=>{
// //   res.status(200).send('<h1>hi</h1>')
// // })


// module.exports = ratingRouter;