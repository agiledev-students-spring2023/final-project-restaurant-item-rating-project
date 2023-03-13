import React, { useState } from 'react';

function Rating(props){
    const [rating, setRating] = useState(0);

    const handleClick = (value) => {
        setRating(value);
    };

    const stars = [];

    for (let i =1; i<=5; i++){
        stars.push(
            <span
            key = {i}
            className = {`fa fa-star${rating >= i ? ' checked': ''}`}
            onClick={()=> handleClick(i)}
            />
        );
    }
    return (
        <div>
            {stars}
            <p>{rating} out of 5 stars </p>
            </div>
    );


}
export default Rating;