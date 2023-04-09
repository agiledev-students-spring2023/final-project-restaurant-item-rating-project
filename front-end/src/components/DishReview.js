import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Rating } from './Rating';
import "./stars.css";
export function DishReview() {

  const params = useParams();
  // console.log(params);

  // restaurantID

  // to change pages

  const navigate = useNavigate();
  const location = useLocation();

  
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
      review: review,
      ratings: ratings[0],
    };
    // console.log("data ", data)
  
    fetch(`http://localhost:3002/restaurant/${params.restaurantID}/dish/${params.dishID}/review`, {
    // fetch('http://localhost:3000/restaurant/dish/{dishId}/review', {
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
      // setAverageRating(data.review.averageRating);
      // setReview(data.review.review);
      // console.log(data.dishName)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  
  };

  useEffect(() => {
    // Make a GET request to fetch the initial data
    fetch('http://localhost:3000/restaurant/dish/{dishId}/review')
    .then(response => response.json())
    .then(data => {
      const ratings = data.map(review => review.rating); // Extract ratings array
      const totalRating = ratings.reduce((acc, curr) => acc + curr, 0); // Calculate total rating
      const averageRating = totalRating / ratings.length; // Calculate average rating
      const roundedRating = averageRating.toFixed(2); // Round to two decimal points
      setAverageRating(roundedRating);
      console.log('Average Rating:', roundedRating);
    })
    .catch((error) => {
      console.error('Error:', error);
      });
  }, []);
  
 
  


  // const apiUrl = 'http://localhost:3000/restaurant/dish/{dish.id}/review';

  // TODO: find dish -> get name
  let [dishName2, setDishName]= useState("toDo");
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
          <Typography variant="h6">Dish: {dishName2.name}</Typography> 
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

