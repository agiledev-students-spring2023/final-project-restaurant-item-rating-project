const express = require('express');
const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Register } = require("./../db");

const favsRouter = express.Router();

favsRouter.post('/:id', async (req, res) => {
    const storedId = req.params.id;
    const { dishId, restaurantID, dishImg, dishName } = req.body;
    const favoriteLink = `http://localhost:3000/restaurant/${restaurantID}/dish/${dishId}`;
    // console.log(favoriteLink);

    try {
        const user = await Register.findById(storedId);
        const favLinks = user.favLinks || [];
    
        // Check if the dish is already in the user's favorites
        const alreadyInFavorites = favLinks.some((link) => link.link === favoriteLink);
    
        if (alreadyInFavorites) {
          return res.status(202).json({ success: true, message: 'Dish is already saved to favorites.' });
        }
    
        // Add the dish to the user's favorites
        favLinks.push({ link: favoriteLink, dishImg, dishName });
        user.favLinks = favLinks;
        await user.save();
        //test
        console.log(user.favLinks);
    
        res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error saving dish to favorites: ", error);
        res.status(500).json({ success: false, error: "Unable to save dish to favorites" });
      }
    });

    //getting favorites
    favsRouter.get('/:id', async (req, res) => {
        const userId = req.params.id;
      
        try {
          const user = await Register.findById(userId);
          res.status(200).json({ success: true, favsLinks: user.favLinks });
        } catch (error) {
          console.error("Error fetching user's favorite dishes: ", error);
          res.status(500).json({ success: false, error: "Unable to fetch user's favorite dishes" });
        }
      });
      
      //deleting favorites
      favsRouter.delete('/:id', async (req, res) => {
        const storedId = req.params.id;
  const { dishId, restaurantID } = req.body;
  const favoriteLink = `http://localhost:3000/restaurant/${restaurantID}/dish/${dishId}`;
  console.log(favoriteLink);
  try {
    const user = await Register.findById(storedId);
    const favLinks = user.favLinks || [];
    const updatedFavLinks = favLinks.filter((link) => link.link !== favoriteLink);
    user.favLinks = updatedFavLinks;
    await user.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error removing dish from favorites: ", error);
    res.status(500).json({ success: false, error: "Unable to remove dish from favorites" });
  }
});

module.exports = favsRouter;