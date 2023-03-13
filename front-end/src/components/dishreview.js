import { Box, Typography } from "@mui/material";
import React, {useState} from 'react';
import Rating from './Rating';
function Title(props) {
  return (
    <Typography
    variant="h1"
  >
    {props.title}
  </Typography>
  )
}



export function Dishreview() {
    const [rating, setRating] = useState(0);
  const bodyText = "Restaurant: ";
  const bodyText2 = "Dish: ";
  const bodyText3 = "Rating: ";
  
  const handleRating = (value) => {
    setRating(value);
  };


return (
    <Box display="flex" flexDirection="column">
      <Title title="Leave a review" />
      <Typography variant="body1">
        {bodyText}
      </Typography>
      <Typography variant="body1">
        {bodyText2}
      </Typography>
      <Typography variant="body1">
        {bodyText3}
      </Typography>
      <Rating value = {rating} onChange = {handleRating} maxRating={5} />
    </Box>
  );

  


}
