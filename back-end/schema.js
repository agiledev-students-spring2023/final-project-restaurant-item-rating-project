// // this file defines the Models/Schema for objects in our application
const mongoose = require('mongoose');
const { Schema } = mongoose;

// // do not use this code. this is for reference so everyone 

// /**
//  * Restaurant Object
//  */
// class Restaurant {
//   id = 1234; // example=1
//   name = "string"; // example="Los Tacos"
//   location = "string"; // example="New York"
//   dishes = [Dish]; // array of dish objects
// }
// /**
//  * Dish Object
//  */
// class Dish {
//   id = 1234; // example=1
//   name = "string"; // example="Los Tacos"
// }
// /**
//  * Rating Object
//  */
// class Review {
//   id = 1234; // example=1
//   value = 1; // from 1 to 5; example=3
// }

// // DB STUFF
// const mongoose = require('mongoose');

// Define the review schema
const ReviewSchema = new Schema({
  value: Number,
  date: {type: Date, default: Date.now},
  userID: Number,
});

// Define the dish schema
const DishSchema = new Schema({
  name: String,
  // TODO: implement this stuff..uploads and method on model to calculate,
  //  then every time the reviews are touched (ex, by "add review"), this method
  //  should be called 
  // mainImage: {
  //   type: String,
  //   required: false,
  //   // TODO: change this...just for testing
  //   default: "https://images.ctfassets.net/o19mhvm9a2cm/3TqdEA20hEleGPCZj2JZJl/297b157fdd3ca108c74f17b1bd5fdfce/Website_RB_HP.png"
  // },
  // averageRating: Number,
  reviews: [ReviewSchema],
});
  
// Define the Restaurant schema
const RestaurantSchema = new Schema({
  name: String,
  location: String,
  dishes: [DishSchema],
});

module.exports = RestaurantSchema;
// module.exports = DishSchema;
