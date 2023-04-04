import { Box, Button, ImageList, ImageListItem, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function DishDetail() {

  // to change pages
  const navigate = useNavigate();

  const millisecondsInADay = 86400000;

  // fetched state
  const [restaurantName, setRestaurantName] = useState('Los Tacos'); // TODO: mock this with mockeroo
  const [review, setReview] = useState('')
  const[rating,setRating] = useState(null)

  const [dish, setDish] = useState({
    id:1,
    name:"Spicy Tacos",
    images: [
      {
        id: 1,
        img:"https://picsum.photos/200"
      },
      {
        id: 2,
        img:"https://picsum.photos/200"
      },

    ],
    reviews: [
      {
        id: 1,
        value:4,
        date: Date.now() - (millisecondsInADay*3)
      },
      {
        id: 2,
        value:5,
        date: Date.now() - (millisecondsInADay*4)
      },
      {
        id: 3,
        value:2,
        date: Date.now() - (millisecondsInADay*5)
      },

    ]
  });


  useEffect(() => {
    // Make a GET request to fetch the initial data
    fetch('http://localhost:3000/restaurant/dish/{dishId}/review')
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // setRating(data.lastestRating);
        setReview(data.review);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const addReview = (dishId, review, rating) => {
    const data = { 
      review: review,
      ratings: [rating]
    };
    fetch('http://localhost:3000/restaurant/dish/{dishId}/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      const latestRating = data.latestRating;
      setRating(latestRating);
      setReview(data.review.review);
      console.log(data.latestRating)
      console.log(data.review.review)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  // TODO: mock
  //     fetching dish
  //     fetching images for a dish?
  //     fetching reviews

  return (
    <Box
      sx={{
        width: "90%", 
        height: "auto",
        justifyContent:"center",
        margin: "0 auto"
      }}
    >
      <Typography variant="h3">{dish.name}</Typography>
      <Box sx={{m:2}} /> 
      <Typography variant="h6">Restaurant: {restaurantName}</Typography>

      <Box sx={{m:1.5}} /> 

      {/* images */}
      <Typography variant="h4">How it Looks</Typography>
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
        {dish.images.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              height="auto"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Box sx={{m:3}} /> 
      <Typography variant="h4">Reviews</Typography>
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          navigate("/review", { state: { dish } });
        }}
      >
        Add a review
      </Button>

      <p>Rating: {rating}</p>
      <p>Review: {review}</p>
      
      {/* {dish.reviews.map( (review) => {
        return (
          <Box
          >
            <Box sx={{m:1.5}} /> 
            <Rating name="read-only" value={review.value} readOnly />
            <Typography> {Math.round((Date.now() - review.date) / millisecondsInADay)} days ago </Typography>
          </Box>
        );
      })} */}

    </Box>
  );
}

