
import { TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalf } from "react-icons/fa";
import Rating from './Rating';
import "./stars.css";

export function DishReview() {
  const [restaurantName, setRestaurantName] = useState('');
  const [dishName, setDish] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ratings,setRatings] = useState([]);
  
  const handleRatingChange = (values) => {
    setRatings(values)
  };
  const handleRestaurant=(event) => {
    setRestaurantName(event.target.value)
  };
  const handleDish = (event) => {
    setDish(event.target.value)
  };
  const handleReview=(event)=>{
    setReview(event.target.value)
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    const sum = ratings.reduce((accumulator, currentValue)=>accumulator + currentValue,0)
    const newAverage = sum / ratings.length
    setAverageRating(parseFloat(newAverage.toFixed(2)))
  };

  useEffect( () => {
    // TODO: mock fetch data if "editing" a dish?
  }, [])

  const renderStars = (rating) => {
    const starIcons = [];
    const fullStars = Math.floor(rating);
    const halfStar = (rating-fullStars)>=0.5
    for(let i = 0; i<fullStars; i++){
      starIcons.push(<FaStar key = {i} className = "star" color = "#ffc107" size = {100}/>)
    }
    if(halfStar){
      starIcons.push(<FaStarHalf key = {starIcons.length} className = "star" color = "#ffc107" size = {100}/>)
    }
    for(let i = starIcons.length; i<5; i++){
      starIcons.push(<FaStar key = {i} className = "star" color = "e4e5e9" size = {100}/>)
    }
    return starIcons;
  };

  return (
    <div>
        <div style={{display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center", height: "40vh"}}>
          <h1> Leave a Review</h1>
          <p>Average Rating: {averageRating}</p>
          <div>{renderStars(averageRating)}</div>
        </div>
      <form onSubmit={handleSubmit}>
        <div style={{display: "flex", flexDirection: "column"}}>
          <TextField label = "Restaurant Name" value = {restaurantName} onChange = {handleRestaurant}/>
          <TextField label = "Dish Name" value = {dishName} onChange = {handleDish}/>
          <TextField label = "Review" value = {review} onChange = {handleReview}/>
        </div>
        <Rating onRatingChange = {handleRatingChange} />
        <button type="submit">Submit</button> 
      </form>
      {isSubmitted && <p>Thank you for your review!</p>}
    </div>
  );
}

