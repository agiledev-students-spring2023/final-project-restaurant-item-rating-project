import { Box, Container, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const serverAddress = "http://localhost:3002"

/**
 * NOTE: this function is also used in the "Home" component
 * Check changes if you update it!
 * 
 * @param {*} favorite 
 * @param {*} navigate 
 * @returns 
 */
export function RestaurantMapping (favorite, navigate) {
  return (
    <Box
      key={favorite._id}
      sx={{
        marginTop: "2em"
      }}
    >
      <Card 
        onClick={() => navigate(`restaurant/${favorite._id}`)}
      >
      <Box
        sx={{
          // display:'flex', 
          // justifyContent:"center"
        }}
      >
        <CardMedia
          component="img"
          height="200"
          width="auto"
          sx={{ 
            // maxWidth:"1000px",
            // display:'flex', 
          }}
            src={"https://picsum.photos/200"}
          title={favorite.name}
        />
      </Box>
      <CardContent
        sx={{
          maxWidth:1000
        }}
      >
        <Typography 
          gutterBottom 
          variant="h6">
          {favorite.name.split(" ").slice(0,4).join(" ")}
        </Typography>

      </CardContent>
      </Card>

    </Box>
  );
};


export function Home() {

  // TODO: implement dish suggestions (in back-end too)
  //  see commented code before

  const [suggestionsRestaurant, setSuggestionsRestaurant] = useState([]);
  // const [suggestionsDish, setSuggestionsDish] = useState([]);

  const navigate = useNavigate();

  const restaurantSuggestionsUrl = `${serverAddress}/suggestion/restaurant`
  // const dishSuggestionsUrl = `${serverAddress}/suggestion/dish`
  useEffect( () => {
    axios.get(restaurantSuggestionsUrl)
    .then((response) => {
      setSuggestionsRestaurant(response.data.slice(0,3));
    })
    // axios.get(dishSuggestionsUrl)
    // .then((response) => response.json())
    // .then((data) => {
    //   setSuggestionsDish(data);
    // });
  }, []);

  // this is what gets rendered in the React DOM. Must be one element at the top level

  return (

    <Container>

      {/* <Button onClick={() => navigate('/search')}>Search</Button> */}

      {/* <Button onClick={() => navigate('/favorites')}>Your Favorites - not built out</Button> */}


      <Typography 
        variant="h4" 
        component="div" 
        // sx={{ flexGrow: 1}}
        >
        Home
      </Typography>    
      <Box height={"2em"} />     
      <Typography 
        variant="h6" 
        component="div" 
        // sx={{ flexGrow: 1}}
        >
        Suggested Restaurants
      </Typography>   
      <Box
        sx={{ 
          margin: "auto 4% auto 4%",
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        {suggestionsRestaurant.map((fav) => {
          return RestaurantMapping(fav, navigate);
        })}
      </Box>

      {/* <Typography variant="h6" 
        component="div" sx={{ flexGrow: 1}}>
        Suggested Dishes
      </Typography>
      <Box>      
        <Box
          sx={{ 
            margin: "auto 4% auto 4%",
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {suggestionsDish.map(restaurantSuggestionMapping)}
        </Box>
      </Box> */}
    </Container>
  );
}
