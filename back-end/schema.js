// this file defines the Models/Schema for objects in our application

// do not use this code. this is for reference so everyone 

/**
 * Restaurant Object
 */
class Restaurant {
  id = 1234; // example=1
  name = "string"; // example="Los Tacos"
  location = "string"; // example="New York"
}
/**
 * Dish Object
 */
class Dish {
  id = 1234; // example=1
  name = "string"; // example="Los Tacos"
  restaurant = new Restaurant(); // don't worry about this for now
}
/**
 * Rating Object
 */
class Dish {
  id = 1234; // example=1
  value = 1; // from 1 to 5; example=3
  dish = new Dish(); // don't worry about this for now
}
