import { Avatar, Box, Button, Typography,  IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Rating from "@mui/material/Rating";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./stars.css";


export function DishReview() {
 const serverAddress = "http://localhost:3002";


 const params = useParams();


 // to change pages
 const navigate = useNavigate();


 const centeringStyles = {
   justifyContent: "center",
   alignItems: "center",
   flexDirection: "column",
   display: "inline-block",
 };


 const [rating, setRating] = useState(0);
 const [isSubmitted, setIsSubmitted] = useState(false);


 const [restaurantName, setRestaurantName] = useState("");
 const [dish, setDish] = useState({});


 const [storedId, setStoredId] = useState("");


 const[picUrl, setPicUrl] = useState("");


 useEffect(() => {
   // get user id
   const id = localStorage.getItem("userId");
   if (id) {
     setStoredId(id);
   } else {
     alert("Error: User not logged in. You must be logged in to review");
   }


   // get restaurant name
   axios
     .get(`${serverAddress}/restaurant/${params.restaurantID}`)
     .then((response) => {
       setRestaurantName(response.data.name);
     })
     .catch((error) => {
       console.error("Error getting restaurant name: ", error);
       // alert("An error has occurred when finding that restaurant");
     });
   // get dish
   axios
     .get(
       `${serverAddress}/restaurant/${params.restaurantID}/dish/${params.dishID}`
     )
     .then((response) => {
       setDish(response.data);
     })
     .catch((err) => {
       console.error(err);
       // alert("An error has occurred when finding the dish");
     });
 }, [params.dishID, params.restaurantID]);


 const handleSubmit = (event) => {
  if(!rating){
    event.target.value = 0;
    setRating(parseInt(0))
  }
   if (rating < 0 || rating > 5) {
     alert(
       `Please select a valid rating value. You tried to submit a value of "${rating}", which is not valid.`
     );
     return;
   }
   event.preventDefault();


   axios
     .post(
       `${serverAddress}/restaurant/${params.restaurantID}/dish/${params.dishID}/review`,
       {
         value: rating,
         userID: storedId,
         picUrl: picUrl,
       }
     )
     .then(function (response) {
       setIsSubmitted(true)
     })
     .catch(function (error) {
       console.log(error);
       alert(error);
     });
   // redirect to dish
   navigate(`/restaurant/${params.restaurantID}/dish/${params.dishID}`);
 };


 function calcAvgReview() {
   if (!("reviews" in dish) || dish.reviews.length === 0) {
     return 0;
   }
   const average = (array) => array.reduce((a, b) => a + b) / array.length;
   return (
     Math.round(10 * average(dish.reviews.map((review) => review.value))) / 10
   );
 }


 const handleImageChange = (event) => {
   const file = event.target.files[0];
   const reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onloadend = () => {
     setPicUrl(reader.result);
   };
 };




 return (
   <Box
     // display="flex"
     justifyContent="center"
     alignItems="center"
     minHeight="100vh"
   >
     <Box
       sx={{
         display: "flex",
         justifyContent: "flex-end",
         alignItems: "center",
         p: 2,
       }}
     >
     </Box>
     <Box sx={{ m: 4 }} />
     <Box
       sx={{
         display: "flex",
         flexDirection: "column",
         justifyContent: "center",
         alignItems: "center",
       }}
     >
       <Typography
         style={{ fontFamily: "Roboto" }}
         color={"#31525B"}
         variant="h4"
       >
         {" "}
         Leave a Review
       </Typography>
       <Box sx={{ m: 2 }} />
       <Typography style={{ fontFamily: "Roboto" }} variant="h6">
         Restaurant: {restaurantName}
       </Typography>
       <Typography style={{ fontFamily: "Roboto" }} variant="h6">
         Dish: {dish.name}
       </Typography>
       <Typography style={{ fontFamily: "Roboto" }} variant="h6">
         Average Rating: {calcAvgReview() ?? 0}
       </Typography>
       <Box sx={{ m: 1 }} />
       <Box>
         <Rating readOnly size="large" value={calcAvgReview() ?? 0} />
       </Box>
     </Box>


     <Box sx={{ m: 2 }} />
     <Box sx={{ ...centeringStyles, display: "flex" }}>
       {/* <form onSubmit={handleSubmit} style={{...centeringStyles, }}> */}
       <Box
         sx={{
           ...centeringStyles,
           display: "flex",
           flexDirection: "column",
         }}
       >
         <Box sx={{ m: 2 }} />
         <Typography
           style={{ fontFamily: "Roboto" }}
           color={"#31525B"}
           variant="h4"
         >
           {" "}
           Your Review
         </Typography>
         <Box sx={{ m: 1 }} />
         {/* <TextField label = "Review" value = {review} onChange = {handleReview} multiline/> */}
         {/* <Box sx={{m:2}} /> */}
         <Rating
           size="large"
           value={rating}
           onChange={(e) => {
             setRating(parseInt(e.target.value));
           }}
         />
         </Box>
     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
       <input
         accept="image/*"
         id="icon-button-file"
         type="file"
         style={{ display: "none" }}
         onChange={handleImageChange}
       />
       <label htmlFor="icon-button-file">
         <IconButton
           color="primary"
           aria-label="upload picture"
           component="span"
         >
           <PhotoCamera />
         </IconButton>
       </label>
       <Typography variant="subtitle1">
         {picUrl ? "Image uploaded" : "Upload an image (optional):"}
         {picUrl && <img src={picUrl} alt="uploaded image" style={{ maxWidth: "250px" }} />}


       </Typography>
     </Box>
         <Button variant="contained" onClick={handleSubmit}>
           Submit
         </Button>
       </Box>
       {/* </form> */}
       {isSubmitted && <p>Thank you for your review!</p>}
     </Box>
   // </Box>
 );
}
