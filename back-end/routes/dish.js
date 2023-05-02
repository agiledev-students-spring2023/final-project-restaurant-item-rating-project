const express = require("express");
const multer = require("multer");
const path = require("path");
// this router is used for the paths that match "/restaurant/:restaurantId/dish"

// get restaurant model
const { Restaurant } = require("../db");
const dishRouter = express.Router({ mergeParams: true });

// storage stuff
//creating picture save
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    // take apart the uploaded file's name so we can create a new one based on it
    const extension = path.extname(file.originalname);
    const basenameWithoutExtension = path.basename(
      file.originalname,
      extension
    );
    // create a new filename with a timestamp in the middle
    const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`;
    // tell multer to use this new filename for the uploaded file
    cb(null, newName);
  },
});
//upload photo
const upload = multer({ storage: storage });

const uploadDishImage = multer({ storage: storage }).single("dishImage");
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
        //alert message
        error: "Restaurant not found",
      });
    }
    dish = thisRestaurant.dishes.id(dishId);

    if (!dish) {
      res.statusCode = 404;
      res.json({
        //alert message
        error: "Dish not found",
      });
      return;
    }
  } catch (err) {
    console.log(err);
  }

  // Return the restaurant
  //return JSON 
  res.json(dish);
});

// Define the POST endpoint to create a a dish for a restaurant
dishRouter.post("/", upload.single("dishImage"), async (req, res) => {
  let dishError = true;
  if ("file" in req) {
    //errorrrrr
    dishError = false;
  }

  const { restaurantId } = req.params;
  // console.log(req.file.path)
  try {
    const newRest = await Restaurant.findById(restaurantId);
    if (dishError) {

      if (!req.body.dishName) {
        throw new Error("Dish name is required");
      }
      //new dish in ret
      const dish = newRest.dishes.push({
        name: req.body.dishName,
      });
    } else {
      const dish = newRest.dishes.push({
        name: req.body.dishName,
        image: req.file.path,
      });
    }
    newRest.save();
    //redirect to restaurnat
    res.redirect(`http://localhost:3000/restaurant/${restaurantId}`);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({
      //alert
      error: "there was an error creating a new dish",
    });
  }
});
//END OF NEW STUFF

module.exports = dishRouter;
