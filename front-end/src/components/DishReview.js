import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Rating } from './Rating';
import "./stars.css";
import { useLocation } from "react-router-dom";
import axios from 'axios';
export function DishReview() {
  // to change pages

  const navigate = useNavigate();
  const location = useLocation();
  
  const { dish } = location.state;
  
  const centeringStyles = {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    display: "inline-block"
  }

  const [restaurantName, setRestaurantName] = useState('');
  const [dishName, setDish] = useState('');

  const [averageRating, setAverageRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ratings,setRatings] = useState([]);
  
  const handleRatingChange = (values) => {
    setRatings(values)
  };

  const handleReview=(event)=>{
    setReview(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    // const sum = ratings.reduce((accumulator, currentValue)=>accumulator + currentValue,0)
    // const newAverage = sum / ratings.length
    // setAverageRating(parseFloat(newAverage.toFixed(2)))
    setReview('')
    const data = {
      restaurantName: restaurantName,
      dishName: dish.name,
      review: review,
      ratings: ratings,
      dishId : dish.id
      // averageRating: newAverage
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
      const dishName = data.dishName;
      setAverageRating(data.review.averageRating);
      // setReview(data.review.review);
      // console.log(data.dishName)
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    // window.location.reload()
  
  };
  
  axios.get('http://localhost:3000/restaurant/dish/123/review')
  .then(response => {
    // Handle the response data
    const dishReviews = response.data;
    console.log(dishReviews);
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });
  


  // const apiUrl = 'http://localhost:3000/restaurant/dish/{dish.id}/review';

  // useEffect(() => {
  //   fetch(apiUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // setReviews(data.reviews);
  //       setAverageRating(data.averageRating);
  //       console.log(data.reviews)
  //     });
  // }, []);

 



  const renderStars = (rating) => {
    const starIcons = [];
    const fullStars = Math.floor(rating);
    const halfStar = (rating-fullStars)>=0.5
    // added below to easily control star display because mobile was spilling over display
    const starWidth = "70";
    for(let i = 0; i<fullStars; i++){
      starIcons.push(<FaStar key = {i} className = "star" color = "#ffc107" size = {starWidth}/>)
    }
    if(halfStar){
      starIcons.push(<FaStarHalf key = {starIcons.length} className = "star" color = "#ffc107" size = {starWidth}/>)
    }
    for(let i = starIcons.length; i<5; i++){
      starIcons.push(<FaStar key = {i} className = "star" color = "e4e5e9" size = {starWidth}/>)
    }
    return starIcons;
  };

  return (
    <Box
      // display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
        <Box sx={{m:4}} /> 
        <Box sx={{display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <Typography variant="h4"> Leave a Review</Typography>
          <Box sx={{m:2}} /> 
          <Typography variant="h6">Restaurant: {restaurantName}</Typography> 
          <Typography variant="h6">Dish: {dish.name}</Typography> 
          <Typography variant="h6">Average Rating: {averageRating}</Typography>
          <Box sx={{m:1}} /> 
          <Box>
            {renderStars(averageRating)}
          </Box>
        </Box>

        <Box sx={{m:2}} />
        <Box sx={{...centeringStyles, display: "flex"}}>
          <form onSubmit={handleSubmit} style={{...centeringStyles, }}>
            <Box sx={centeringStyles}>
              <Box sx={{m:2}} />
              <Typography variant="h5"> Your Review</Typography>
              <Box sx={{m:1}} />
              <TextField label = "Review" value = {review} onChange = {handleReview} multiline/>
              <Box sx={{m:2}} />
              <Rating onRatingChange = {handleRatingChange} />
              <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Box>
          </form>
          {isSubmitted && <p>Thank you for your review!</p>}
        </Box>
    </Box>
  );
}

