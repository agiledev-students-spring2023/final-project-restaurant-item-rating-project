// // this file defines the Models/Schema for objects in our application
const mongoose = require('mongoose');
const { Schema } = mongoose;
var assert = require('assert');

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
  value: {
    type: Number,
    required: true,
    //Need to change min to 1 once we figure out the error. 
    //Otherwise change DishReview min to 0 -- This seems easier
    min: 0,
    max: 5
  },
  date: {
    type: Date,
    default: Date.now, 
    required: true
  },
  userID: {
    type: Number,
    //I think we need to change this: once we get the users working on back-end
    required: false
  }
  
});


describe('Review validaiton', () =>{
    let Review;
    beforeAll(async () => {
      await mongoose.connect ('/review', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      Review = mongoose.model('Review', ReviewSchema)
    });
    afterAll(async () => {
      await mongoose.connection.close();
    }) ;

    it('should be invalid if rating value is missing', ()=>{
      const badreview1 = new Review({
        date: {type: Date, default: Date.now},
        userID: 123,
      });
      badreview1.validate((error)=>{
        assert.equal(error.errors.message, 'Missing rating value');
      })
    });

    it('should be invalid if userID is empty', ()=>{
      const badreview2 = new Restaurant({
        value: 4, 
        date: {type: Date, default: Date.now},
      });
      badreview2.validate((error)=>{
        assert.equal(error.errors.message, 'Missing user Id');
      })
    });
    it('should be invalid if the current date is missing', ()=>{
      const badreview3 = new Restaurant({
        value:4,
        userID:123
      });
      badreview3.validate((error)=>{
        assert.equal(error.errors.message, 'Missing current date');
      })
  });

  it('should be valid if none of the value, current date, userID is empty, error is throwed otherwise', ()=>{
        const goodreview1 = new Restaurant({
          value:4,
          date: {type: Date, default: Date.now},
          userID:123
        });
        goodreview1.validate(function(error){
          if(error){
            console.log(error);
          }else{
            counsel.log("Review is valid");
          }
  
    })
    });
  

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
  averageRating: {type: Number, required: true},
  reviews: [ReviewSchema],
});
describe('Dish validaiton', () =>{
  let Dish;
  beforeAll(async () => {
    await mongoose.connect ('/dish', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    Dish = mongoose.model('Dish', DishSchema)
  });
  afterAll(async () => {
    await mongoose.connection.close();l
  }) ;

  it('should be invalid if dish name is empty', ()=>{
    const badrestaurant1 = new Dish({
      averageRating : 3.5,
      reviews: [{ value:4,
        date: {type: Date, default: Date.now},
        userID:123}, { value:3,
          date: {type: Date, default: Date.now},
          userID:456}],
        
    });
    badrestaurant1.validate((error)=>{
      assert.equal(error.errors.message, 'Missing dish name');
    })
  });

  it('should be invalid if review is empty', ()=>{
    const badDish2 = new Dish({
      name: 'Tacos1',
    });
    badDish2.validate((error)=>{
      assert.equal(error.errors.message, 'Missing reviews');
    })
  });
    it('should be valid if none of the name, reviews and average ratings are empty, throws error otherwise', ()=>{
      const goodDish1 = new Dish({
        name: 'Tacos1',
        averageRating : 3.5,
        reviews: [{ value:4,
          date: {type: Date, default: Date.now},
          userID:123}, { value:3,
            date: {type: Date, default: Date.now},
            userID:456}],
      });
      goodDish1.validate(function(error){
            if(error){
              console.log(error);
            }else{
              counsel.log("Restaurant is valid")
            }
    
      })
  })
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

describe('Restaurant validaiton', () =>{
  let Restaurant;
  beforeAll(async () => {
    await mongoose.connect ('/restaurant', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    Restaurant = mongoose.model('Restaurant', RestaurantSchema)
  });
  afterAll(async () => {
    await mongoose.connection.close();l
  }) ;

  it('should be invalid if name is empty', ()=>{
    const badrestaurant1 = new Restaurant({
      location: 'NYC',
      dishes: [{name: 'tacos1', price: 9.99}, {name: 'tacos2', price: 8.99}],
    });
    badrestaurant1.validate((error)=>{
      assert.equal(error.errors.message, 'Missing restaurant name');
    })
  });

  it('should be invalid if location is empty', ()=>{
    const badrestaurant2 = new Restaurant({
      name: 'Los tacos',
      dishes: [{name: 'tacos1', price: 9.99}, {name: 'tacos2', price: 8.99}],
    });
    badrestaurant2.validate((error)=>{
      assert.equal(error.errors.message, 'Missing restaurant location');
    })
  }); 
  it('should be invalid if dish list is empty', ()=>{
    const badrestaurant2 = new Restaurant({
      name: 'Los tacos',
      location: 'NYC',
    });
    badrestaurant2.validate((error)=>{
      assert.equal(error.errors.message, 'Missing dish list');
    })
  });
    it('should be valid if none of the name, location and dishes are empty, error is throwed otherwise', ()=>{
      const goodrestaurant1 = new Restaurant({
        name: 'Los tacos',
        location: 'NYC',
        dishes: [{name: 'tacos1', price: 9.99}, {name: 'tacos2', price: 8.99}],
      });
      goodrestaurant1.validate(function(error){
            if(error){
              console.log(error);
            }else{
              counsel.log("Restaurant is valid")
            }
    
      })
  })
})

RestaurantSchema.index({'$**': 'text'});


module.exports = RestaurantSchema;
// module.exports = DishSchema;
