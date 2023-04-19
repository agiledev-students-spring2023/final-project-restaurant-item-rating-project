// import and instantiate express
const express = require('express')

const app = express()

const port = 3000

// import some useful middleware
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
var cors = require('cors')


// import routers
const dishRouter = require('./routes/dish')
const ratingRouter = require('./routes/rating')
const restaurantRouter = require('./routes/restaurant')
const suggestionRouter = require('./routes/suggestion')
const searchRouter = require('./routes/search')
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

/**
 * Typically, all middlewares would be included before routes
 * In this file, however, most middlewares are after most routes
 * This is to match the order of the accompanying slides
 */


// cors for front-end
app.use(cors());

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"))

// enable file uploads saved to disk in a directory named 'public/uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads")
  },
  filename: function (req, file, cb) {
    // take apart the uploaded file's name so we can create a new one based on it
    const extension = path.extname(file.originalname)
    const basenameWithoutExtension = path.basename(file.originalname, extension)
    // create a new filename with a timestamp in the middle
    const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`
    // tell multer to use this new filename for the uploaded file
    cb(null, newName)
  },
})
const upload = multer({ storage: storage })

// route for HTTP POST requests for /upload-example
app.post("/upload-example", upload.array("my_files", 3), (req, res, next) => {
  // check whether anything was uploaded
  if (!req.files || req.files.length == 0) {
    // failure!
    const error = new Error("Please upload some files!")
    error.httpStatusCode = 400
    res.json({
      status: "you fail!!!",
      message: "rejected your files... try harder",
    })
    // return next(error)
  } else if (req.files.length > 3) {
    res.json({
      status: "you fail!!!",
      message: "rejected your files... try harder",
    })
  } else {
    // success
    // send a message back to the client, for example, a simple JSON object
    const data = {
      status: "all good",
      message: "files were uploaded!!!",
      files: req.files,
    }
    res.json(data)
  }
})

// proxy requests to/from an API
app.get("/proxy-example", (req, res, next) => {
  // use axios to make a request to an API for animal data
  axios
    .get("https://my.api.mockaroo.com/animals.json?key=d9ddfc40&num=10")
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
})

// same route as above, but using environmental variables for secret credentials
app.get("/dotenv-example", async (req, res, next) => {
  try {
    // insert the environmental variable into the URL we're requesting
    const response = await axios.get(
      `${process.env.API_BASE_URL}?key=${process.env.API_SECRET_KEY}&num=10`
    )
    res.json(response.data) // pass data along directly to client
  } catch (err) {
    res.json({
      success: false,
      error: `Oops... In order to use the dotenv module, you must first make a file named .env on your server - see the .env.example file for example.`,
    })
  }
})

// a route with parameter ... animalId is a parameter
// the code here is similar to the dotenv-example route above... but...
// using async/await in this route to show another way of dealing with asynchronous requests to an external API or database
app.get("/parameter-example/:animalId", async (req, res) => {
  // use axios to make a request to an API to fetch a single animal's data
  // we use a Mock API here, but imagine we passed the animalId to a real API and received back data about that animal
  try {
    const apiResponse = await axios.get(
      `${process.env.API_BASE_URL}?key=${process.env.API_SECRET_KEY}&num=1&id=${req.params.animalId}`
    )

    // express places parameters into the req.params object
    const responseData = {
      status: "wonderful",
      message: `Imagine we got the data from the API for animal #${req.params.animalId}`,
      animalId: req.params.animalId,
      animal: apiResponse.data,
    }

    // send the data in the response
    res.json(responseData)
  } catch (err) {
    // send an error JSON object back to the browser
    res.json(err)
  }
})


////////////////////////////////////////
// THIS PARTIS OUR CODE. ABOVE IS FROM PROF

/**
 * some common status codes for returning responses
 * 
 * // Only use InternalServerErrorStatusCode as a placeholder;
 * find the right one here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
const successStatusCode = 200;
const resourceNotFoundStatusCode = 404;
const internalServerErrorStatusCode = 500; 
/**
 * some error messages for returning responses
 */
const genericSuccessMessage = "All good :)"
const genericErrorMessage = "There has been an error :("

/**
 * template "GET" route for path "/"
*/
app.get('/', (req, res) => {
  // get object from API (mockeroo for now)
  const apiResponse = {
    data: "hello!",
  };
  const isError = false;
  
  // this part responds based on whether there was an error.
  let response;
  if (!isError) {
    response = {
      statusCode: successStatusCode,
      body: {
        ...apiResponse, 
        message: genericSuccessMessage
      }
    }
  }
  else { // handle error
    response = {
      statusCode: InternalServerErrorStatusCode,
      body: genericErrorMessage
    }
  }
  res.json(response)
})
/**
 * template "POST" route for path "/"
*/
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
/**
 * template "PUT" route for path "/"
*/
app.put('/', (req, res) => {
  res.send('Got a PUT request at /user')
})
/**
 * template "DELETE" route for path "/"
*/
app.delete('/', (req, res) => {
  res.send('Got a DELETE request at /user')
})

// implement routers
app.use('/restaurant/:restaurantId/dish/:dishId/review', ratingRouter); // review routes
app.use('/restaurant/:restaurantId/dish', dishRouter); // dish routes
app.use('/restaurant', restaurantRouter); // restaurant routes
app.use('/suggestion', suggestionRouter); // suggestion routes
app.use('/search', searchRouter); // search routes
app.use('/register',registerRouter);
app.use('/login',loginRouter);
module.exports = app