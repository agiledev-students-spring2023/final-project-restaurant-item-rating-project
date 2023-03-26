const express = require('express');
const app = express();
//const router = express().Router();


// GET method route
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})
  
// POST method route
app.post('/', (req, res) => {
    res.send('POST request to the homepage')
})
