const express = require("express");
// const multer = require("multer");
const path = require("path");
// this router is used for the paths that match "/restaurant/:restaurantId/dish"

// get restaurant model
const { Restaurant } = require("../db");
const dishRouter = express.Router({ mergeParams: true });


// const uploadDishImage = multer({ storage: storage }).single("dishImage");
//NEW STUFF!!:
// Define the GET endpoint to get restaurant
dishRouter.get("/:id", async (req, res) => {
  const restaurantId = req.params.restaurantId; // passed down from parent
  const dishId = req.params.id;

  let thisRestaurant;
  let dish;
  try {
    thisRestaurant = await Restaurant.findById(restaurantId).exec();

    if (!thisRestaurant) {
      // error
      res.statusCode = 404;
      res.json({
        error: "Restaurant not found",
      });
    }
    dish = thisRestaurant.dishes.id(dishId);

    if (!dish) {
      res.statusCode = 404;
      res.json({
        error: "Dish not found",
      });
      return;
    }
  } catch (err) {
    console.log(err);
  }

  // Return the restaurant
  res.json(dish);
});

// Define the POST endpoint to create a a dish for a restaurant
// dishRouter.post("/", upload.single("dishImage"), async (req, res) => {
dishRouter.post("/", async (req, res) => {
  let imageUploaded = false;
  if ("uploadedPicture" in req.body && req.body.uploadedPicture!=="") {
    imageUploaded = true;
  }

  const { restaurantId } = req.params;
  try {
    const newRest = await Restaurant.findById(restaurantId);
    if (!imageUploaded) {
      if (!req.body.dishName) {
        throw new Error("Dish name is required");
      }
      const dish = newRest.dishes.push({
        name: req.body.dishName,
      });
    } else {
      const dish = newRest.dishes.push({
        name: req.body.dishName,
        image: req.body.imageUrl,
      });
    }
    newRest.save();
    // res.redirect(`http://localhost:3000/restaurant/${restaurantId}`);
    res.status(200).json({success:true});
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({
      error: "There was an error creating a new dish",
    });
  }
});


  // console.log(req.file.path)
  // try {
  //   const newRest = await Restaurant.findById(restaurantId);
  //   if (dishError) {

  //     // if (!req.body.dishName) {
  //     //   throw new Error("Dish name is required");
  //     // }

  //     const dish = newRest.dishes.push({
  //       name: req.body.dishName,
  //     });

  //   } else {
  //     const dish = newRest.dishes.push({
  //       name: req.body.dishName,
  //       image: req.file.path,
  //     });
  //   }
  //   newRest.save();
  //   res.redirect(`http://localhost:3000/restaurant/${restaurantId}`);
  // } catch (err) {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.json({
  //     error: "there was an error creating a new dish",
  //   });
  // }





// Define the POST endpoint to create a a dish for a restaurant
// dishRouter.post("/", upload.single("dishImage"), async (req, res) => {
//   let dishError = true;
//   if ("file" in req) {
//     dishError = false;
//   }

//   const { restaurantId } = req.params;
//   // console.log(req.file.path)
//   try {
//     const newRest = await Restaurant.findById(restaurantId);
//     if (dishError) {

//       // if (!req.body.dishName) {
//       //   throw new Error("Dish name is required");
//       // }

//       const dish = newRest.dishes.push({
//         name: req.body.dishName,
//       });

//     } else {
//       const dish = newRest.dishes.push({
//         name: req.body.dishName,
//         image: req.file.path,
//       });
//     }
//     newRest.save();
//     res.redirect(`http://localhost:3000/restaurant/${restaurantId}`);
//   } catch (err) {
//     console.log(err);
//     res.statusCode = 500;
//     res.json({
//       error: "there was an error creating a new dish",
//     });
//   }
  // Return a success response
  // res.json({
  //   message: "success",
  // });
  // res.status(301).redirect(`localhost:3000/restaurant/${restaurantId}`);
// });
//END OF NEW STUFF

module.exports = dishRouter;
