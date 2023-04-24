import { Avatar, Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RestaurantMapping } from "./RestaurantMapping";

const serverAddress = "http://localhost:3002";

export function Home() {
  // TODO: implement dish suggestions (in back-end too)

  const [suggestionsRestaurant, setSuggestionsRestaurant] = useState([]);

  const navigate = useNavigate();

  const restaurantSuggestionsUrl = `${serverAddress}/suggestion/restaurant`;

  useEffect(() => {
    axios.get(restaurantSuggestionsUrl).then((response) => {
      setSuggestionsRestaurant(response.data.slice(0, 25));
    });
  }, [restaurantSuggestionsUrl]);

  const [avatarUrl, setAvatarUrl] = useState('');
  useEffect(() => {
      const storedId = localStorage.getItem('userId');
      axios.get(`${serverAddress}/profile/${storedId}`).then(response => {
        const { email, password,avatarUrl } = response.data;
        setAvatarUrl(avatarUrl);
      }).catch(error => {
        console.log(error);
      });
  }, []);

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  // this is what gets rendered in the React DOM. Must be one element at the top level

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: 2,
        }}
      >
        <Avatar onClick={handleAvatarClick} src={avatarUrl} />
      </Box>

      <Typography
        variant="h5"
        component="div"
        color={"#31525B"}
        align="center"
        style={{ fontFamily: "Roboto" }}
        // sx={{ flexGrow: 1}}
      >
        Welcome to Dish Dealer!
      </Typography>
      <Box height={"2em"} />
      <Typography
        style={{ fontFamily: "Roboto" }}
        variant="h6"
        component="div"
        // sx={{ flexGrow: 1}}
      >
        Suggested Restaurants:
      </Typography>
      <Box
        sx={{
          margin: "auto 4% auto 4%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
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
