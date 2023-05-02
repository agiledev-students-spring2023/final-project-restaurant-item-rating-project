import { Box, Button, ImageListItem, Typography, IconButton  } from "@mui/material";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeAgo from "react-timeago";
import { Favorite, FavoriteBorder } from "@mui/icons-material";


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
 const[restaurant,setRestaurant] = useState({});
 const [isFavorite, setIsFavorite] = useState(false);

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

 useEffect(() => {
  axios
    .get(`${serverAddress}/restaurant/${params.restaurantID}`)
    .then((response) => {
      setRestaurant(response.data);
    })
    .catch((error) => {
      console.error("Error getting restaurant data: ", error);
    });
}, []);

useEffect(() => {
  if (!storedId) {
    return;
  }

  axios
    .get(`${serverAddress}/favorites/${storedId}`)
    .then((response) => {
      console.log(response.data);
      const favorites = response.data.favsLinks.map((fav) => fav.link.split("/").pop());
      setIsFavorite(favorites.includes(dish._id));
    })
    .catch((error) => {
      console.error("Error checking favorite status: ", error);
    });
}, [storedId, dish]);

 
 const handleDeleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${serverAddress}/restaurant/${params.restaurantID}/dish/${params.dishID}/review/${reviewId}`);
    if (response.status === 200) {
      alert("Review successfully deleted");
      setDish((prevDish) => {
        const updatedReviews = prevDish.reviews.filter(
          (review) => review._id !== reviewId
        );
        return { ...prevDish, reviews: updatedReviews };
      });
    }
    
  } catch (error) {
    console.log(error.response.data); 
  }
};

const  handleAddReview = async() =>{
    try{
      const response = await axios.get(`${serverAddress}/restaurant/${params.restaurantID}/dish/${params.dishID}/review?userId=${storedId}`);
      if(response.status === 200){
        navigate(`/restaurant/${params.restaurantID}/dish/${params.dishID}/rating`);
      }
      if(response.status === 201){
       alert("You have already submitted a review for this dish");
    }}catch(error){
      console.log(error.response.data)
    }
}
const handleFavoriteClick =  async (event) => {
    if (!storedId) {
      alert("Please log in to save dishes to your favorites.");
      // navigate("/login");
      return;
    }
  try {
    // console.log(dish.name);
    const response = await axios.post(`${serverAddress}/favorites/${storedId}`, {
        dishId: dish._id,
        restaurantID : restaurant._id,
        dishImg: dish.image,
        dishName: dish.name 
      })
      if (response.status === 200) {
        setIsFavorite(true);
        alert(`${dish.name} saved to favorites!`);
      }
      else if(response.status === 202){
        setIsFavorite(true);
        alert(`${dish.name} already saved to favorites!`);
      }
    }catch(error){
        console.error("Error saving dish to favorites: ", error);
      };
  };


const handleUnfavoriteClick =  async (event) => {
  try {
    const response = await axios.delete(`${serverAddress}/favorites/${storedId}`, {
      data: {
        dishId: dish._id,
        restaurantID: restaurant._id,
      },
    });
    if (response.status === 200) {
      setIsFavorite(false);
      alert(`${dish.name} removed from favorites.`);
    }
  } catch (error) {
    console.error("Error removing from favorites: ", error);
  }
};


  // const handleUnfavoriteClick = async (event) => {

  //   try {
  //     const response = await axios.delete(`${serverAddress}/favorites/${storedId}`,{
  //       dishId: dish._id,
  //       restaurantID : restaurant._id,
  //     })
  //     if (response.status === 200) {
  //       setIsFavorite(false);
  //       alert(`${dish.name} removed from favorites.`);
  //     }
  //   } catch (error) {
  //     console.error("Error removing from favorites: ", error);
  //   };
  // };


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
     <Typography style={{ fontFamily: "BlinkMacSystemFont" }} variant="h6">
       Restaurant: {restaurantName}
     </Typography>


     <Box sx={{ m: 1.5 }} />


     {/* images */}
     {"image" in dish ? (
       <Box>
         <Typography
           style={{ fontFamily: "BlinkMacSystemFont" }}
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
         <Box sx={{ m: 2 }} />
         {storedId && (
          <Box sx={{ display: "flex", alignItems: "center", mt: "10px" }}>
            {isFavorite ? (
              <IconButton onClick={handleUnfavoriteClick} sx={{ color: "red" }}>
                <Favorite />
              </IconButton>
            ) : (
              <IconButton onClick={handleFavoriteClick}>
                <FavoriteBorder />
              </IconButton>
            )}
            <Typography variant="body1">
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </Typography>
          </Box>
        )}       </Box>
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
       style={{ fontFamily: "BlinkMacSystemFont" }}
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
         handleAddReview();
       }}
     >
       Add a review
     </Button>


     {!("reviews" in dish)
       ? ""
       : dish.reviews.map((review) => {
        console.log(review);
           return (
             <Box key={review._id} display="flex" flexDirection={"column"}>
               <Box sx={{ m: 1.5 }} />
               <Rating name="read-only" value={review.value} readOnly />
               {review.picUrl && <img src={review.picUrl} alt="review image" style={{ maxWidth: "150px" }}/>} 
               <Typography>{review.comment}</Typography>

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
