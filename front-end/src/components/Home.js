import { Button, Box, Typography, Container, TextField} from "@mui/material";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const serverAddress = "http://localhost:3002"

function restaurantSuggestionMapping (favorite, navigate) {
  return (
    <Card 
      key={favorite._id}
      onClick={() => navigate(`restaurant/${favorite._id}`)}
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
          maxWidth:"1000px",
          display:'flex', 
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

    
  );
};


export function Home() {


  const [suggestionsRestaurant, setSuggestionsRestaurant] = useState([]);
  const [suggestionsDish, setSuggestionsDish] = useState([]);

  const navigate = useNavigate();

  // mocked api with mockaroo
  const restaurantSuggestionsUrl = `${serverAddress}/suggestion/restaurant`
  // const dishSuggestionsUrl = `${serverAddress}/suggestion/dish`
  useEffect( () => {
    axios.get(restaurantSuggestionsUrl)
    .then((response) => {
      // console.log("response: ", response);
      setSuggestionsRestaurant(response.data.slice(0,3));
    })
    // axios.get(dishSuggestionsUrl)
    // .then((response) => response.json())
    // .then((data) => {
    //   setSuggestionsDish(data);
    // });
  }, []
  )

  // this is what gets rendered in the React DOM. Must be one element at the top level
  return (

    <Container>

      {/* <Button onClick={() => navigate('/search')}>Search</Button> */}

      {/* <Button onClick={() => navigate('/favorites')}>Your Favorites - not built out</Button> */}
      <Button onClick={() => navigate('/restaurant')}>Add Restaurant</Button>


      <Typography variant="h6" 
        component="div" sx={{ flexGrow: 1}}>
        Suggested Restaurants
      </Typography>
      <Box>      
        <Box
          sx={{ 
            margin: "auto 4% auto 4%",
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {suggestionsRestaurant.map((fav) => {
            return restaurantSuggestionMapping(fav, navigate);
          })}
        </Box>
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
