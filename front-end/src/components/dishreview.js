
import { Box, ratingClasses, Typography } from "@mui/material";
import React, {useState} from 'react';
import Rating from './Rating';
import "./stars.css"
import { FaStarHalf,FaStar } from "react-icons/fa";

export function Dishreview() {

  const [averageRating, setAverageRating] = useState(0);

  
  const handleRatingChange = (values) => {
    const sum = values.reduce((accumulator, currentValue)=>accumulator + currentValue,0)
    const newAverage = sum / values.length
    setAverageRating(parseFloat(newAverage.toFixed(2)))
  };

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
    <p>Enter your Review:</p>
      <p> Restaurant: </p>
      <p>Dish:</p>
      <Rating onRatingChange = {handleRatingChange} />
     
    </div>
  );
}