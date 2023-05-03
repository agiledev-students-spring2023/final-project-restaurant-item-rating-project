const express = require("express");
// this router is used for paths matching "/restaurant/:restaurantId/dish/:dishId/review"

const { Restaurant } = require("./../db");
const mongoose = require("mongoose");

const ratingRouter = express.Router({ mergeParams: true });

const cors = require("cors");

//
ratingRouter.use(cors());

ratingRouter.use(express.json());

const reviews = [];

//get rating
ratingRouter.get("/", async (req, res) => {
  const { restaurantId, dishId } = req.params;
  const userId = req.query.userId;

  const newRest = await Restaurant.findById(restaurantId);

  const dish = newRest.dishes.find((dish) => {
    return dish._id.toString() == dishId;
  });

  const revexists = dish.reviews.some((review) => {
    return review.userID == userId;
  });

  if (!revexists) {
    res.status(200).send("User has not submited review for this dish yet.");
  }

  if (revexists) {
    res.status(201).send("User has submited a review for this dish.");
  }
});

//create rating
ratingRouter.post("/", async (req, res) => {
  try {
    // create a new rating in the database based on the data in the request body

    const { restaurantId, dishId } = req.params;

    const newRest = await Restaurant.findById(restaurantId);

    const dish = newRest.dishes.find((dish) => {
      return dish._id.toString() == dishId;
    });

    // check if already reviewed by same user
    const firstReviewByThisUser = dish.reviews.every((review) => {
      return review.userID !== req.body.userID;
    });

    if (!firstReviewByThisUser) {
      res.status(500).json({
        error: "Each user can only submit one review per dish.",
      });
    }

    const rev = dish.reviews.push(req.body);
    await newRest.save();

    // return a success response
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "there was an error creating a new review",
    });
  }
});

//delete rating
ratingRouter.delete("/:id", async (req, res) => {
  try {
    const { restaurantId, dishId, id } = req.params;

    const rest = await Restaurant.findById(restaurantId);
    const dish = rest.dishes.find((dish) => dish._id.toString() === dishId);

    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    const review = dish.reviews.find((review) => review._id.toString() === id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    const index = dish.reviews.indexOf(review);
    dish.reviews.splice(index, 1);

    await rest.save();

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "there was an error deleting the review",
    });
  }
});

module.exports = ratingRouter;
