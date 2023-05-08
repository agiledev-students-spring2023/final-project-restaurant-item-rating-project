
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function Home() {
  const serverAddress = process.env.REACT_APP_SERVER_DEV;
  const [suggestionsRestaurant, setSuggestionsRestaurant] = useState([]);
  const navigate = useNavigate();
  const restaurantSuggestionsUrl = `${serverAddress}/suggestion/restaurant`;

  useEffect(() => {
    axios.get(restaurantSuggestionsUrl).then((response) => {
      setSuggestionsRestaurant(response.data.slice(0, 25));
    });
  }, [restaurantSuggestionsUrl]);

  return (
    <Container>
      <Typography
        variant="h5"
        component="div"
        color={"#31525B"}
        align="center"
        style={{ fontFamily: "BlinkMacSystemFont" }}
      >
        Welcome to Dish Dealer!
      </Typography>
      <Box height={"2em"} />
      <Typography
        style={{ fontFamily: "BlinkMacSystemFont" }}
        variant="h6"
        component="div"
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
        {suggestionsRestaurant.map((restaurant) => {
          const imageUrl = restaurant.dishes.length > 0
          ? restaurant.dishes[restaurant.dishes.length - 1].image
          : "https://picsum.photos/200";
          return (
            <Box
              key={restaurant._id}
              sx={{
                marginTop: "2em",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={imageUrl}
                  onClick={() => navigate(`/restaurant/${restaurant._id}`)}
                  style={{
                    width: "100%",
                    maxWidth: "1000px",
                    height: "auto",
                    cursor: "pointer",
                  }}
                  alt="restaurant"
                />
              </Box>
              <Typography gutterBottom variant="h6">
                {restaurant.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}

