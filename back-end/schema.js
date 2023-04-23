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

// Define the register schema 

const RegisterSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl:{
    type: String,
    // required: true,
    default: '',
  }
});

const Register = mongoose.model('Register',RegisterSchema);
const goodregister1 = new Register({
  email:'test@example.com',
  password:'password123'
});
goodregister1.validateSync(function(error){
  if(error){
    console.log(error);
  }else{
    counsel.log("Review is valid");
  }

});

// Define the review schema

const ReviewSchema = new Schema({
  value: {
    type: Number,
    required: true,
    //Need to change min to 1 once we figure out the error. 
    //Otherwise change DishReview min to 0 -- This seems easier
  },
  date: {
    type: Date,
    default: Date.now, 
    required: true
  },
  userID: {
    type: Number,
    //pending for the implmentation of userId
    required: true
  }
  
});



const Review = mongoose.model('Review', ReviewSchema)

  const goodreview1 = new Review({
          value:4,
          date: {type: Date, default: Date.now},
          userID: '123abc'
        });
        goodreview1.validateSync(function(error){
          if(error){
            console.log(error);
          }else{
            counsel.log("Review is valid");
          }
  
    });
// Define the dish schema
const DishSchema = new Schema({
  name: {
    type: String,
    required: true
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
  averageRating: {type: Number, required: false},
  reviews: [ReviewSchema],
});
   const Dish = mongoose.model('Dish', DishSchema)
      const goodDish1 = new Dish({
        name: 'Tacos1',
        averageRating : 3.5,
        reviews: [{ value:4,
          date: {type: Date, default: Date.now},
          userID: '123abc'}, { value:3,
            date: {type: Date, default: Date.now},
            userID: '456def'}],
      });
      goodDish1.validateSync(function(error){
            if(error){
              console.log(error);
            }else{
              counsel.log("Restaurant is valid")
            }
    
      })
// Define the Restaurant schema
const RestaurantSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  dishes: [DishSchema],

});

 const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
 const goodrestaurant1 = new Restaurant({
        name: 'Los tacos',
        location: 'NYC',
        dishes: {
          name: 'Tacos1',
          averageRating : 3.5,
          reviews: [{ value:4,
            date: {type: Date, default: Date.now},
            userID: '123abc'}, { value:3,
              date: {type: Date, default: Date.now},
              userID: '456def'}]}});
     goodrestaurant1.validateSync(function(error){
          if(error){
               console.log(error);
            }else{
              counsel.log("Restaurant is valid")
            };
    
      });

RestaurantSchema.index({'$**': 'text'});


module.exports = {RestaurantSchema,RegisterSchema, ReviewSchema, DishSchema};
// module.exports = RegisterSchema;

// module.exports = DishSchema;
