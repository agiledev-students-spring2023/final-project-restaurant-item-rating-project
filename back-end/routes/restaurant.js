
const express = require('express');
const app = express();
const port = 3000; // set the port number

// Middleware to parse JSON requests
app.use(express.json());

