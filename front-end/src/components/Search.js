import { Box, Typography, TextField, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import SearchIcon from '@mui/icons-material/Search';
import Grid from "@mui/material/Grid";

function searchResults (restaurants) {
  console.log(restaurants.id, restaurants);
  return (

    <Container> 
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
    </Container>
  );
};

export function Search() {

  const [restaurantList, setRestaurantList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // mocked api with mockaroo
  const apiUrl =  "https://my.api.mockaroo.com/restaurants/123.json?key=fc5ecd60";
  useEffect( () => {
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      setRestaurantList(data.slice(0,1));
    });
    
  }, []);

  const handleSearch = () => {
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
    const filteredData = data.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setRestaurantList(filteredData);
    });
  };  

  // this is what gets rendered in the React DOM. Must be one element at the top level
  // return (
  //   <Box>   

  //     <TextField  type="search" id="search" label="Search" sx={{ width: 350 }} />  <SearchIcon />  
  

  //     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

  //     <Box
  //       sx={{ 
  //         margin: "auto 4% auto 4%",
  //         display: 'flex',
  //         justifyContent: 'space-between'
  //       }}
  //     >
  //       {restaurantList.map(searchResults)}
  //     </Box>
  //   </Box>
  // );
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <TextField
          label="Search restaurants"
          sx={{ width: { xs: '100%', md: '50%' }, mr: 2 }}
          variant="outlined"
        />
        <Button variant="contained" endIcon={<SearchIcon />} color="primary">
          Search
        </Button>
      </Box>
      <Box sx={{ margin: 'auto 4%', 
      display: 'flex', 
      justifyContent: 'space-between' }}>
        {restaurantList.map(searchResults)}
      </Box>
    </Box>
  );
}

