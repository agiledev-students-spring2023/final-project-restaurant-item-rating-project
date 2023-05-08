import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function Favorites() {
  const serverAddress = process.env.REACT_APP_SERVER_DEV;
  const [favorites, setFavorites] = useState([]);
  

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(serverAddress);
    if (userId) {
      axios
        .get(`${serverAddress}/favorites/${userId}`)
        .then((response) => {
          setFavorites(response.data.favsLinks);
        })
        .catch((error) => {
          console.error("Error fetching favorites: ", error);
        });
    }
  }, [serverAddress]);

  return (
    <Box
      sx={{
        width: "90%",
        height: "auto",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <Typography variant="h3">My Favorite Dishes</Typography>
      <Box sx={{ m: 2 }} />
      <Grid container spacing={3}>
        {favorites.map((favorite, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardActionArea component={Link} to={favorite.link}>
                <CardMedia
                  component="img"
                  height="200"
                  image={favorite.dishImg}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {favorite.dishName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
