import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Typography, ImageListItem,  Grid, Card, CardMedia, CardActionArea, CardContent} from "@mui/material";

const serverAddress = process.env.SERVER_DEV; 

export function Favorites() {
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      const userId = localStorage.getItem("userId");
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
    }, []);

    console.log(favorites);
    return (
      <Box sx={{ width: "90%", height: "auto", justifyContent: "center", margin: "0 auto" }}>
        <Typography variant="h3">My Favorite Dishes</Typography>
        <Box sx={{ m: 2 }} />
        <Grid container spacing={3}>
        {favorites.map((favorite, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardActionArea component={Link} to={favorite.link}>
                <CardMedia component="img" height="200" image={favorite.dishImg}/>
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
  