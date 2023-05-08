import { Box, Button, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const serverAddress = process.env.REACT_APP_SERVER_DEV;

export function RestaurantDetail() {
  const params = useParams();

  const navigate = useNavigate();

  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios
      .get(`${serverAddress}/restaurant/${params.restaurantID}`)
      .then((response) => {
        setRestaurantName(response.data.name);
        setLocation(response.data.location);
        setDishes(response.data.dishes);
      })
      .catch((err) => {
        console.error(err);
        alert("An error has occurred when finding that restaurant");
      });
  }, [params.restaurantID]);

  function calcAvgReview(dish) {
    if (!("reviews" in dish) || dish.reviews.length === 0) {
      return 0;
    }
    const average = (array) => array.reduce((a, b) => a + b) / array.length;
    return (
      Math.round(10 * average(dish.reviews.map((review) => review.value))) / 10
    );
  }

  // get restaurant
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "60px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          textAlign: "center",
        }}
      >
        <Typography
          style={{ fontFamily: "BlinkMacSystemFont" }}
          color={"#31525B"}
          variant="h3"
          gutterBottom
        >
          {restaurantName}
        </Typography>
      </Box>
      <Typography
        style={{ fontFamily: "BlinkMacSystemFont" }}
        variant="h6"
        gutterBottom
      >
        City: {location}
      </Typography>

      <Box height="2rem" />

      <Box height="2rem" />
      <Typography
        style={{ fontFamily: "BlinkMacSystemFont" }}
        color={"#31525B"}
        variant="h4"
        gutterBottom
      >
        Full Menu
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate(`/restaurant/${params.restaurantID}/dish`)}
      >
        Add Dish
      </Button>

      {dishes
        ? dishes.map((dish) => {
          return (
            <Box
              key={dish._id}
              onClick={() =>
                navigate(
                  `/restaurant/${params.restaurantID}/dish/${dish._id}`
                )
              }
              sx={{
                width: "60%",
                margin: "auto",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box height="2rem" />
              <Typography
                style={{ fontFamily: "BlinkMacSystemFont" }}
                variant="h5"
                gutterBottom
                textTransform={"capitalize"}
              >
                {dish.name}
              </Typography>
              {"reviews" in dish && dish.reviews.length > 0 ? (
                <Box>
                  <Rating
                    readOnly
                    size="medium"
                    value={calcAvgReview(dish) ?? 0}
                  />
                </Box>
              ) : (
                  ""
                )}
              {"image" in dish &&
                dish.image !== "" &&
                dish.image.length > 5 &&
                dish.image.slice(0, 6) !== "public" ? (
                  <img
                    src={dish.image}
                    alt="Delicious food"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                ) : (
                  ""
                )}
            </Box>
          );
        })
        : ""}
    </Box>
  );
}
