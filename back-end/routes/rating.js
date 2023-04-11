const express = require('express');
// this router is used for paths matching "/restaurant/:restaurantId/dish/:dishId/review"

const Rating = require("./../db");

const ratingRouter = express.Router({ mergeParams: true });

const cors = require('cors');

// 
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


ratingRouter.post('/', async (req, res) => {
  // Here you can create the restaurant in the database based on the data in the request body
  // For example:
  let newRev;
  try {
    // console.log("req.body", req.body);
    newRev = await Rating.create(req.body);

    await newRev.validate();
    await newRev.save();
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({
      error: "there was an error creating a new review"
    });
    return;
  }
  // Return a success response
  res.statusCode = 200;
  res.json({
    review: newRev,
    message: "success"
  });
});



// ratingRouter.post('/', async (req, res) => {
//   const dishId = req.params.dishId;
//   const restaurantID = req.params.restaurantID;
  
//   const review = req.body;


//   const thisRestaurant = await Rating.findById(restaurantID).exec();
//   console.log("thisRestaurant: ", thisRestaurant);
//   const thisDish = thisRestaurant.dishes.id(dishId);

//   try {
//     thisDish.reviews.create(req.body);
//     thisRestaurant.save();
//   } catch (err) {
//     console.error(err);
//     res.statusCode=500;
//     res.json({
//       "message":"Error creating new review object"
//     })
//   }
// }); 


// ratingRouter.get('/', (req, res) => {
//   const dishReviews = findReviewsByDishId(1);
//   res.json(dishReviews);
// });


module.exports = ratingRouter;
