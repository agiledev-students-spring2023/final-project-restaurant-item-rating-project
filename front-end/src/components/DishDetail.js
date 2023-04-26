import { Box, Button, ImageListItem, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeAgo from "react-timeago";
import Avatar from "@mui/material/Avatar";


const serverAddress = "http://localhost:3002";


export function DishDetail() {

  const [storedId, setStoredId] = useState("");
 const params = useParams();
 // to change pages
 const navigate = useNavigate();

 useEffect(() => {
  // get user id
  const id = localStorage.getItem("userId");
  if (id) {
    setStoredId(id);
  } 
}, []);
 // fetched state
 const [restaurantName, setRestaurantName] = useState(""); // TODO: mock this with mockeroo
 const [dish, setDish] = useState({});


 function calcAvgReview() {
   if (!("reviews" in dish) || dish.reviews.length === 0) {
     return 0;
   }
   const average = (array) => array.reduce((a, b) => a + b) / array.length;
   // console.log(average(dish.reviews.map((review) => review.value)));
   return (
     Math.round(10 * average(dish.reviews.map((review) => review.value))) / 10
   );
 }


 useEffect(() => {
   // Make a GET request to fetch the initial data
   axios
     .get(
       `${serverAddress}/restaurant/${params.restaurantID}/dish/${params.dishID}`
     )
     .then((response) => {
       setDish(response.data);
     })
     .catch((error) => {
       console.error("Error fetching dish: ", error);
     });
   // get restaurant name
   axios
     .get(`${serverAddress}/restaurant/${params.restaurantID}`)
     .then((response) => {
       setRestaurantName(response.data.name);
     })
     .catch((error) => {
       console.error("Error getting restaurant name: ", error);
     });
 }, []);

 const handleDeleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${serverAddress}/restaurant/${params.restaurantID}/dish/${params.dishID}/review/${reviewId}`);
    if (response.status === 200) {
      alert("Review successfully deleted");
    } 
  } catch (error) {
    console.log(error.response.data); 
  }
};



 return (
   <Box
     sx={{
       width: "90%",
       height: "auto",
       justifyContent: "center",
       margin: "0 auto",
     }}
   >
     <Typography variant="h3">{dish.name}</Typography>
     <Box sx={{ m: 2 }} />
     <Typography style={{ fontFamily: "Roboto" }} variant="h6">
       Restaurant: {restaurantName}
     </Typography>


     <Box sx={{ m: 1.5 }} />


     {/* images */}
     {"image" in dish ? (
       <Box>
         <Typography
           style={{ fontFamily: "Roboto" }}
           color={"#31525B"}
           variant="h4"
         >
           How it Looks
         </Typography>
         <Box sx={{ m: 0.5 }} />
         <ImageListItem key={dish.id}>
           <img
             src={`${serverAddress}/${dish.image}`}
             // srcSet={`${serverAddress}/${dish.image}`}
             alt={dish.name}
             // width="auto"
             // height="auto"
             loading="lazy"
           />
         </ImageListItem>
       </Box>
     ) : (
       ""
     )}
     {/* <ImageList
       sx={{
         width: "100%",
         height: "auto",
         justifyContent:"center",
         margin: "0 auto"
       }}
       cols={2}
       rowHeight={"auto"}
     >
       {(!("image" in dish)) ? "" : dish.images.map((item) => (
           <ImageListItem key={item.id}>
             <img
               src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
               srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
               alt={item.title}
               height="auto"
               loading="lazy"
             />
           </ImageListItem>
         ))
       }
     </ImageList> */}


     <Box sx={{ m: 3 }} />
     <Typography
       style={{ fontFamily: "Roboto" }}
       color={"#31525B"}
       variant="h4"
     >
       Reviews
     </Typography>
     {"reviews" in dish && dish.reviews.length > 0 ? (
       <Box>
         <Rating readOnly size="medium" value={calcAvgReview(dish) ?? 0} />
       </Box>
     ) : (
       ""
     )}
     <Button
       variant="contained"
       size="small"
       onClick={() => {
         navigate(
           `/restaurant/${params.restaurantID}/dish/${params.dishID}/rating`
         );
       }}
     >
       Add a review
     </Button>


     {!("reviews" in dish)
       ? ""
       : dish.reviews.map((review) => {
        // console.log(review.userID);
           return (
             <Box key={review._id} display="flex" flexDirection={"column"}>
               <Box sx={{ m: 1.5 }} />
               <Rating name="read-only" value={review.value} readOnly />
               {review.picUrl && <img src={review.picUrl} alt="review image" style={{ maxWidth: "150px" }}/>}


               <TimeAgo date={review.date} />
               {review.userID === storedId && (
            <Button onClick={() => handleDeleteReview(review._id)}>Delete</Button>
          )}
               {/* <Typography> {Math.round((Date.now() - new Date(review.date)) / millisecondsInADay)} days ago </Typography> */}
             </Box>
           );
         })}
   </Box>
 );
}
