import { Box, Typography } from "@mui/material";
/**
 * NOTE: this function is also used in the "Home" component
 * Check changes if you update it!
 *
 * @param {*} restaurant
 * @param {*} navigate
 * @returns
 */
export function RestaurantMapping(restaurant, navigate) {
  // const makeRedir

  const imageUrl =
    restaurant.dishes.length > 0
      ? restaurant.dishes[restaurant.dishes.length - 1].image
      : "https://picsum.photos/200";
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
          alt="restaurant"
        />
      </Box>
      <Typography gutterBottom variant="h6">
        {restaurant.name}
      </Typography>
    </Box>
  );
}
