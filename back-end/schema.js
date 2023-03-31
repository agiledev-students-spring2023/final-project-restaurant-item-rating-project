// this file defines the Models/Schema for objects in our application

// do not use this code. this is for reference so everyone 

/**
 * Restaurant Object
 */
class Restaurant {
  id = 1234; // example=1
  name = "string"; // example="Los Tacos"
  location = "string"; // example="New York"
  dishes = [Dish]; // array of dish objects
}
/**
 * Dish Object
 */
class Dish {
  id = 1234; // example=1
  name = "string"; // example="Los Tacos"
}
/**
 * Rating Object
 */
class Review {
  id = 1234; // example=1
  value = 1; // from 1 to 5; example=3
}
