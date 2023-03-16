import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(null);
  const [values, setValues] = useState([]);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    setValues([...values, ratingValue]);
    onRatingChange([...values, ratingValue]);
  };

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              size={50}
              onMouseEnter={() => setRating(ratingValue)}
              onMouseLeave={() => setRating(null)}
            />
          </label>
        );
      })}
      <p>Thank you! You rated this item: {rating} stars</p>
      {/* <p>All ratings: {values.join(",")}</p> */}
    </div>
  );
};

export default Rating;
