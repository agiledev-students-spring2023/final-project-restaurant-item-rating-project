
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const serverAddress = "http://localhost:3002";

export function Home() {
  const [suggestionsRestaurant, setSuggestionsRestaurant] = useState([]);
  const navigate = useNavigate();
  const restaurantSuggestionsUrl = `${serverAddress}/suggestion/restaurant`;

  useEffect(() => {
    axios.get(restaurantSuggestionsUrl).then((response) => {
      setSuggestionsRestaurant(response.data.slice(0, 25));
    });
  }, [restaurantSuggestionsUrl]);
  
  // console.log(suggestionsRestaurant);

 

  return (
    <Container>
      <Typography
        variant="h5"
        component="div"
        color={"#31525B"}
        align="center"
        style={{ fontFamily: "BlinkMacSystemFont" }}
      >
        Welcome to Dish Dealer!
      </Typography>
      <Box height={"2em"} />
      <Typography
        style={{ fontFamily: "BlinkMacSystemFont" }}
        variant="h6"
        component="div"
      >
        Suggested Restaurants:
      </Typography>
      <Box
        sx={{
          margin: "auto 4% auto 4%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        {suggestionsRestaurant.map((restaurant) => {
          const imageUrl = restaurant.dishes.length > 0
          ? restaurant.dishes[restaurant.dishes.length - 1].image
          : "https://picsum.photos/200";
          //  const imageUrl = "https://picsum.photos/200";
          console.log(imageUrl);
          // console.log(restaurant.dishes);
          // console.log(restaurant.dishes[0].image);

          const restaurantName = restaurant.name.split(" ").slice(0, 4).join(" ");
          return (
            <Box
              key={restaurant._id}
              sx={{
                marginTop: "2em",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={imageUrl}
                  onClick={() => navigate(`/restaurant/${restaurant._id}`)}
                  style={{
                    width: "100%",
                    maxWidth: "1000px",
                    height: "auto",
                    cursor: "pointer",
                  }}
                />
              </Box>
              <Typography gutterBottom variant="h6">
                {restaurantName}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}



// import { Avatar, Box, Container, Typography } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { RestaurantMapping } from "./RestaurantMapping";

// const serverAddress = "http://localhost:3002";

// export function Home() {
//   // TODO: implement dish suggestions (in back-end too)

//   const [suggestionsRestaurant, setSuggestionsRestaurant] = useState([]);

//   const navigate = useNavigate();

//   const restaurantSuggestionsUrl = `${serverAddress}/suggestion/restaurant`;

//   useEffect(() => {
//     axios.get(restaurantSuggestionsUrl).then((response) => {
//       setSuggestionsRestaurant(response.data.slice(0, 25));
//     });
//   }, [restaurantSuggestionsUrl]);

//   const [avatarUrl, setAvatarUrl] = useState('');

//   // this is what gets rendered in the React DOM. Must be one element at the top level

//   // return (
//   //   <Container>

//   //     <Typography
//   //       variant="h5"
//   //       component="div"
//   //       color={"#31525B"}
//   //       align="center"
//   //       style={{ fontFamily: "BlinkMacSystemFont" }}
//   //       // sx={{ flexGrow: 1}}
//   //     >
//   //       Welcome to Dish Dealer!
//   //     </Typography>
//   //     <Box height={"2em"} />
//   //     <Typography
//   //       style={{ fontFamily: "BlinkMacSystemFont" }}
//   //       variant="h6"
//   //       component="div"
//   //       // sx={{ flexGrow: 1}}
//   //     >
//   //       Suggested Restaurants:
//   //     </Typography>
//   //     <Box
//   //       sx={{
//   //         margin: "auto 4% auto 4%",
//   //         display: "flex",
//   //         justifyContent: "space-between",
//   //         flexDirection: "column",
//   //       }}
//   //     >
//   //       {suggestionsRestaurant.map((fav) => {
//   //         return RestaurantMapping(fav, navigate);
//   //       })}
//   //     </Box>

//       {/* <Typography variant="h6" 
//         component="div" sx={{ flexGrow: 1}}>
//         Suggested Dishes
//       </Typography>
//       <Box>      
//         <Box
//           sx={{ 
//             margin: "auto 4% auto 4%",
//             display: 'flex',
//             justifyContent: 'space-between'
//           }}
//         >
//           {suggestionsDish.map(restaurantSuggestionMapping)}
//         </Box>
//       </Box> */}
//     // </Container>
//   // );
// }
