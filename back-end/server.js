#!/usr/bin/env node
const server = require("./app") // load up the web server
let port = 3000 // the port to listen to for incoming requests

if (process.env.NODE_ENV != "test") {
  port = 3002;
  require("./db");
}
else {
  port = 3002;
}

// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
  listener.close()
}

module.exports = {
  close: close,
  server: server,
}
