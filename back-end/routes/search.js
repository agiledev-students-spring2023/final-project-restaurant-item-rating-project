const express = require('express');
// this router is used for paths matching "/suggestion"
const searchRouter = express.Router();

// handlers
function makeSearchResults(criteria) {
  // query db
  return [];
}

// GET route for search
searchRouter.get('/', (req,res)=>{
  const restaurantQuery = req.query.searchText;
  const locationQuery = req.query.locationText;
  const searchResults = makeSearchResults({restaurantQuery, locationQuery});
  if (!searchResults) {
    // TODO: handle case of no results found
    return res.status(404).json({ error: `No results not found` });
    }
  res.json(dishSuggestions);
})

module.exports = searchRouter;