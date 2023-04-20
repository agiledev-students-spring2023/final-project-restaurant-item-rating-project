import {Avatar, Box, Button, ImageList, ImageListItem, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from 'axios'
import TimeAgo from "react-timeago"
import { CardMedia } from '@mui/material';

const serverAddress = "http://localhost:3002"

export function DishDetail() {
  const params = useParams();
  // to change pages
  const navigate = useNavigate();

  // fetched state
  const [restaurantName, setRestaurantName] = useState(''); // TODO: mock this with mockeroo
  const [dish, setDish] = useState({});

  useEffect(() => {
    // Make a GET request to fetch the initial data
    axios.get(`${serverAddress}/restaurant/${params.restaurantID}/dish/${params.dishID}`)
    .then(response => {
      setDish(response.data);
    })
    .catch((error) => {
      console.error('Error fetching dish: ', error);
    });
    // get restaurant name
    axios.get(`${serverAddress}/restaurant/${params.restaurantID}`)
    .then(response => {
      setRestaurantName(response.data.name);
    })
    .catch((error) => {
      console.error('Error getting restaurant name: ', error);
    });
  }, []);

  
  const [avatarUrl, setAvatarUrl] = useState('');
  useEffect(() => {
      const storedId = localStorage.getItem('userId');
      const storedAvatarUrl = localStorage.getItem(`avatarUrl-${storedId}`);
      if (storedId) {
        setAvatarUrl(storedAvatarUrl);
      }
    }, []);

  const handleAvatarClick = () => {
    navigate('/profile');
  }

  return (
    <Box 
      sx={{
        width: "90%", 
        height: "auto",
        justifyContent:"center",
        margin: "0 auto"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", p: 2 }}>
      <Avatar onClick={handleAvatarClick} src={avatarUrl}/>
       </Box>
      <Typography variant="h3">{dish.name}</Typography>
      <Box sx={{m:2}} /> 
      <Typography style={{ fontFamily: 'Roboto'}} variant="h6">Restaurant: {restaurantName}</Typography>

      <Box sx={{m:1.5}} /> 

      {/* images */}
      <Typography style={{ fontFamily: 'Roboto'}} color={'#31525B'} variant="h4">How it Looks</Typography>
      <Box sx={{m:0.5}} /> 
      <ImageList 
        sx={{ 
          width: "100%", 
          height: "auto",
          justifyContent:"center",
          margin: "0 auto"
        }} 
        cols={2} 
        rowHeight={"auto"}
      >
        {(!("images" in dish)) ? 
          <ImageListItem>
            <img
              src={"https://picsum.photos/200"}
              alt="random"
              height="auto"
            />
          </ImageListItem>
        : dish.images.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                height="auto"
                loading="lazy"
              />
            </ImageListItem>
          ))
        }
      </ImageList>

      <Box sx={{m:3}} /> 
      <Typography style={{ fontFamily: 'Roboto'}} color={'#31525B'} variant="h4">Reviews</Typography>
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          navigate(`/restaurant/${params.restaurantID}/dish/${params.dishID}/rating`);
        }}
      >
        Add a review
      </Button>

      
      
      {(!("reviews" in dish)) ? "" : dish.reviews.map( (review) => {
        return (
          <Box
          key={review._id}
          display="flex"
          flexDirection={"column"}
          
          >
            <Box sx={{m:1.5}} /> 
            <Rating name="read-only" value={review.value} readOnly />
            <TimeAgo date={review.date} />
            {/* <Typography> {Math.round((Date.now() - new Date(review.date)) / millisecondsInADay)} days ago </Typography> */}
          </Box>
        );
      })}

    </Box>
  );
}

