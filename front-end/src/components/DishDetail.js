/* import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent'; */

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';


const RestaurantList = ({ restaurants }) => {
  return (
    <Box>
      {restaurants.map((restaurant) => (
        <Box key={restaurant.id}>
          <Typography variant="h5">{restaurant.name}</Typography>
          <Typography variant="body1">{restaurant.address}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://my.api.mockaroo.com/restaurants/123.json?key=fc5ecd60'
      );
      const data = response.data;
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const results = searchResults.filter((restaurant) =>
      restaurant.dishes.includes(event.target.value)
    );
    setSearchResults(results);
  };

  return (
    <Box>
      <Typography variant="h3">Search for Restaurants</Typography>
      <input type="text" value={searchTerm} onChange={handleChange} />
      {searchResults.length > 0 ? (
        <RestaurantList restaurants={searchResults} />
      ) : (
        <Typography variant="body1">
          No results found for {searchTerm}.
        </Typography>
      )}
    </Box>
  );
}


/* function DishDetail(restaurants) {
  console.log(restaurants.id, restaurants);
  return (
    <Card 
      key={restaurants.id}
    >
    <Box
      sx={{
        display:'flex', 
        justifyContent:"center"
      }}
    >
      <CardMedia
        component="img"
        height="200"
        sx={{ 
          maxWidth:"200px",
          display:'flex', 
        }}
        src={restaurants.img}
        title={restaurants.name}
        />
    </Box>
      <CardContent
        sx={{
          maxWidth:200
        }}
      > 
        <Typography 
          gutterBottom 
          max
          variant="h4" 
        >
          {restaurants.name}
        </Typography>
        <Typography
        max
        variant="h6" 
        >

        Most Popular Dish:
        </Typography>
        <Typography 
          gutterBottom 
          max
          variant="h6" 
        >
          
          {restaurants.popular_dish}
        </Typography>
      </CardContent>
    </Card>
  );
};

export function DishDetail() {

  const [restaurantList, setRestaurantList] = useState([]);

  // mocked api with mockaroo
  const apiUrl =  "https://my.api.mockaroo.com/restaurants/123.json?key=fc5ecd60";

  useEffect( () => {
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      setRestaurantList(data.slice(0,5));
    });
    
  }, []
  )

  // this is what gets rendered in the React DOM. Must be one element at the top level
  return (
    <Box>      
      <Box
        sx={{ 
          margin: "auto 4% auto 4%",
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {restaurantList.map(searchResults)}
      </Box>
    </Box>
  );
}

 */