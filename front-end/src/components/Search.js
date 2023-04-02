import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';


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

  const navigate = useNavigate();

  const [restaurantList, setRestaurantList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // mocked api with mockaroo
  const apiUrl =  "https://my.api.mockaroo.com/restaurants/123.json?key=fc5ecd60";
  useEffect( () => {
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
      }}>
        <TextField
          placeholder='Restaurant Name'
          sx={{
            width:"100%",
            padding:"0.5em",
          }}
          variant="outlined"
        />
        <IconButton 
          variant="contained" 
          onClick={()=>{navigate("/restaurant")}}
          color="primary"
        >
          <SearchIcon />
        </IconButton>
      </Box>

      <Box sx={{ margin: 'auto 4%', 
      display: 'flex', 
      justifyContent: 'space-between' }}>
        {restaurantList.map(searchResults)}
      </Box>
    </Box>
  );
}

