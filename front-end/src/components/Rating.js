
import React, {startTransition, useState} from "react";
import { FaStar } from "react-icons/fa";

const Rating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

        return(
        <div>
            {[ ...Array(5)].map((star,i) => {
                const ratingValue = i+1

                return(
                    <label>
                       <label>
                        <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} />
                        <FaStar 
                             className="star" 
                             color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                                size={100}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                                />
                            </label>

                    </label>
                );
            })}
            <p>Thank you! You rated this item: {rating} stars</p>
        </div>

        );
}
export default Rating
