const express = require('express');
const {Restaurant} = require("./../db");
// this router is used for paths matching "/search"
const searchRouter = express.Router();

// handlers
async function makeSearchResults(queryText) {
  console.log(queryText);
  // query db
  let results = [];
  try {
    results = await Restaurant.find({$text: {$search: queryText}}).exec();
  } catch (err) {
    console.error(err);
  }
  // console.log(results);
  return results;
}

// GET route for search
searchRouter.post('', async (req,res)=>{
  const restaurantQuery = req.body.searchText;
  // if no search string
  if (restaurantQuery === undefined) {
    // error. invalid search
    res.statusCode = 400;
    res.send({
      error: "Error in parsing the search string"
    });
  }
  // const locationQuery = req.query.locationText;
  const searchResults = await makeSearchResults(restaurantQuery);
  if (!searchResults) {
    // TODO: handle case of no results found
    return res.status(404).json({ error: `No results not found` });
    }
  res.json(searchResults);
})

module.exports = searchRouter;