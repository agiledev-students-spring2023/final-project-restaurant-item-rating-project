// this file defines the Models/Schema for objects in our application
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the register schema
const RegisterSchema = new Schema({
  //needs email
  email: {
    type: String,
    required: true,
  },
  //needs password
  password: {
    type: String,
    required: true,
  },
  //profile pic
  avatarUrl:{
    type: String,
    default: '',
  },
  //favorites 
  favLinks: {
    type: [{
      link: {
        type: String,
        required: true
      },
      dishImg: {
        type: String,
        required: true
      },
      dishName: {
        type: String,
        required: true
      }
    }],
    default: []
  }
});


// Define the review schema
const ReviewSchema = new Schema({
  //rating amount
  value: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
    //Need to change min to 1 once we figure out the error.
    //Otherwise change DishReview min to 0 -- This seems easier
  },
  //date posted
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  //user id
  userID: {
    type: String,
    //pending for the implmentation of userId
    required: true,
  },
  //pictures
  picUrl:{
    type: String,
    default: '',
  }, 
  //comments (text review)
  review:{
    type: String,
    default:'',
  }
});

// Define the dish schema
const DishSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  
  // TODO: implement this stuff..uploads and method on model to calculate,
  //  then every time the reviews are touched (ex, by "add review"), this method
  //  should be called
  // mainImage: {
  //   type: String,
  //   required: false,
  //   // TODO: change this...just for testing
  //   default: "https://images.ctfassets.net/o19mhvm9a2cm/3TqdEA20hEleGPCZj2JZJl/297b157fdd3ca108c74f17b1bd5fdfce/Website_RB_HP.png"
  // },

  image: {
    type: String,
    required: false,
  },
  averageRating: { type: Number, required: false },
  reviews: [ReviewSchema],
});

// Define the Restaurant schema
const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dishes: [DishSchema],
});

RestaurantSchema.index({ "$**": "text" });

module.exports = { RestaurantSchema, RegisterSchema, ReviewSchema, DishSchema };