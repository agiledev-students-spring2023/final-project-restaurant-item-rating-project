#!/usr/bin/env node
const server = require("./app") // load up the web server
const port = 3000 // the port to listen to for incoming requests

// DB STUFF
const mongoose = require('mongoose');

// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
  listener.close()
}

// db implementation
const connectionString = `mongodb+srv://db-username:${process.env.DB_PASSWORD}@restaurant-item-db.ui8kfv9.mongodb.net/?retryWrites=true&w=majority`;

// db.connect()
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(connectionString,
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    }
  );

  const restaurantSchema = new mongoose.Schema({
    name: String
  });
  
  const Restaurant = mongoose.model('Restaurant', restaurantSchema);

  console.log("hi");
  const newRest = new Restaurant({name:"James"});
  newRest.save();
  const rests = await Restaurant.find();
  console.log(rests)
}


module.exports = {
  close: close,
}
