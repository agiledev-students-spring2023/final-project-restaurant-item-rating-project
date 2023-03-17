import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

function searchResults (restaurants) {
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

export function Search() {

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

