// DB STUFF
const mongoose = require('mongoose');
const RestaurantSchema = require("./schema");
const DishSchema = require("./schema");

// db implementation
const connectionString = `mongodb+srv://db-username:${process.env.DB_PASSWORD}@restaurant-item-db.ui8kfv9.mongodb.net/?retryWrites=true&w=majority`;

// if (process.env.NODE_ENV != "test") {

if (process.env.NODE_ENV != "test") {
  // db.connect()
  main().catch(err => console.log(err));
  async function main() {
    await mongoose.connect(connectionString,
      { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
      }
    );
  }
}

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
// const Dish = mongoose.model('Dish', DishSchema);
// }
// else {
//   // test settings
//   const Restaurant={};
//   const Dish={};
// }


module.exports = Restaurant;
// module.exports = Dish;