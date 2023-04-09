
// Import necessary modules
const express = require('express');
const Restaurantrouter = express.Router();
const Restaurant = require('../models/restaurant');

// Get all restaurants
Restaurantrouter.get('/restaurant', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('dishes');
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a restaurant by ID
Restaurantrouter.get('/restaurant/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('dishes');
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new restaurant
Restaurantrouter.post('/restaurant', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a restaurant by ID
Restaurantrouter.put('/restaurant/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(200).json({ responseStatus: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a restaurant by ID
Restaurantrouter.delete('/restaurant/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(200).json({ responseStatus: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = Restaurantrouter;