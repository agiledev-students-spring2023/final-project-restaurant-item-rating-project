import { Box, Typography } from "@mui/material";
import React, {useState} from 'react';
import Rating from './Rating';
import "./stars.css"

export function Dishreview() {
    const [rating, setRating] = useState(null);

  
  const handleRating = (value) => {
    setRating(value);
  };



return (
    <div>
        <h1> Leave a Review</h1>
        <p> Restaurant: </p>
        <p>Dish:</p>
        <Rating value = {rating} onClick = {handleRating} />
    </div>
   
  );

  


}
