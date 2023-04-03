import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

export function Rating({ onRatingChange, isSubmitted}) {
  const [rating, setRating] = useState(null);
  const [values, setValues] = useState([]);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    setValues([...values, ratingValue]);
    onRatingChange([...values, ratingValue]);
  };
  
  useEffect(() => {
    setRating(null);
    setValues([]);
  }, [isSubmitted]);

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
              onMouseLeave={() => setRating(ratingValue)}
            />
          </label>
        );
      })}
      {/* <p>Thank you! You rated this item: {rating} stars</p> */}

    </div>
  );
};
