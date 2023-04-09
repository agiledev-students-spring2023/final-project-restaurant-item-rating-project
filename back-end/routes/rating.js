const express = require('express');
// this router is used for paths matching "/restaurant/:restaurantId/dish/:dishId/review"
const ratingRouter = express.Router();

const cors = require('cors');

ratingRouter.use(cors());
ratingRouter.use(express.json());

const reviews =[]

function findReviewsByDishId(dishId) {
  // Filter the reviews array to only include reviews for the specified dish
  const filteredReviews = reviews.filter(review => review.dishId === dishId);

  // Return an array of objects containing the review and rating values
  return filteredReviews.map(review => {
    const ratings = review.ratings;
    const averageRating = ratings.reduce((acc,cur)=>acc+cur /ratings.length);
    
    const roundedAverageRating = Number(averageRating.toFixed(2));
    if (roundedAverageRating > 5) {
      review.averageRating = 5;
    } else {
      review.averageRating = roundedAverageRating;
    }
    return {
      id: review.id,
      rating: review.ratings[0],
      review: review.review,
      dishName: review.dishName,
      averageRating : review.averageRating
  
    };
  });
}
const dishes = [
  {
    id: 1,
    name: 'Pasta',
    restaurant: 'Italiano',
    reviews: [], // add a reviews property to the dish object
  },
  {
    id: 2,
    name: 'Sushi',
    restaurant: 'Japanese Garden',
    reviews: [],
  },
  // more dishes
];
function createReview(dishId, review) {
  review.id = reviews.length + 1;
  review.dishId = dishId;
  reviews.push(review);
  return review;
}

function updateReview(dishId, reviewId, review) {
  const index = reviews.findIndex((r) => r.id === reviewId && r.dishId === dishId);
  if (index !== -1) {
    reviews[index] = review;
    review.id = reviewId;
    review.dishId = dishId;
    return review;
  }
  return null;
}

function deleteReview(dishId, reviewId) {
  const index = reviews.findIndex((r) => r.id === reviewId && r.dishId === dishId);
  if (index !== -1) {
    return reviews.splice(index, 1)[0];
  }
  return null;
}




ratingRouter.post('/', (req, res) => {
  // const dishId = req.params.dishId;
  const review = req.body;

  const dishId = 1;

  const dish = dishes.find((d) => d.id === dishId);

  const newReview = createReview(dishId, review);

  const ratings = review.ratings;
  
  const latestRating = ratings[ratings.length-1];

  const averageRating = ratings.reduce((acc,cur)=>acc+cur /ratings.length);
  
  const roundedAverageRating = Number(averageRating.toFixed(2));
  if (roundedAverageRating > 5) {
    review.averageRating = 5;
  } else {
    review.averageRating = roundedAverageRating;
  }
  review.rating = latestRating;
  // Send the review object and average rating to the client
  res.status(201).json({dishName:dish.name, review: newReview, roundedAverageRating });
  // res.status(201).json(review);
}); 


ratingRouter.get('/', (req, res) => {
  const dishReviews = findReviewsByDishId(1);
  res.json(dishReviews);
});

// ratingRouter.get('/restaurant/dish/:dishId/reviews', (req, res) => {
//   const dishId = 1;
  
//   const reviews = getReviewsByDishId(dishId);

//   const reviewsWithRatings = reviews.map(review => {
//     const ratings = review.ratings;
//     const averageRating = ratings.reduce((acc, cur) => acc + cur, 0) / ratings.length;
//     const roundedAverageRating = Number(averageRating.toFixed(2));
//     return {
//       review: review.review,
//       ratings: review.ratings,
//       averageRating: roundedAverageRating
//     };
//   });

//   res.status(200).json(reviewsWithRatings);
// });




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