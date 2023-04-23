import { Avatar, Box, Button, Typography, capitalize } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const serverAddress = "http://localhost:3002";

export function RestaurantDetail() {
  const params = useParams();

  const navigate = useNavigate();

  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch(`${serverAddress}/restaurant/${params.restaurantID}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurantName(data.name);
        setLocation(data.location);
        setDishes(data.dishes);
        console.log(data.dishes)
      })
      .catch((err) => {
        console.error(err);
        alert("An error has occurred when finding that restaurant");
      });
  }, []);

  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    const storedAvatarUrl = localStorage.getItem(`avatarUrl-${storedId}`);
    if (storedId) {
      setAvatarUrl(storedAvatarUrl);
    }
  }, []);

  const handleAvatarClick = () => {
    navigate("/profile");
  };

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
          alignItems: "center",
          p: 2,
        }}
      >
        <Avatar onClick={handleAvatarClick} src={avatarUrl} />
      </Box>
      <Typography
        style={{ fontFamily: "Roboto" }}
        color={"#31525B"}
        variant="h3"
        gutterBottom
      >
        {restaurantName}
      </Typography>
      <Typography style={{ fontFamily: "Roboto" }} variant="h6" gutterBottom>
        City: {location}
      </Typography>

      <Box height="2rem" />

      <Box height="2rem" />
      <Typography
        style={{ fontFamily: "Roboto" }}
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

      {dishes.map((dish) => {
        return (
          <Box
            key={dish._id}
            onClick={() =>
              navigate(`/restaurant/${params.restaurantID}/dish/${dish._id}`)
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
            <img
              src={`${serverAddress}/${dish.image}`}
              alt="Delicious food"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <Typography
              style={{ fontFamily: "Roboto" }}
              variant="h5"
              gutterBottom
              textTransform={"capitalize"}
            >
              {dish.name}
            </Typography>
            {"averageRating" in dish ? (
              <Rating name="read-only" value={dish.averageRating} readOnly />
            ) : (
              ""
            )}
          </Box>
        );
      })}
    </Box>
  );
}
