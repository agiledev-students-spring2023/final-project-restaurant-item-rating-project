const express = require('express')
const app = express()
const port = 3000



/**
 * template "GET" route for path "/"
*/
app.get('/', (req, res) => {
  res.send('Hello World!')
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
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
/**
 * template "DELETE" route for path "/"
*/
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})






// don't touch this:
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app