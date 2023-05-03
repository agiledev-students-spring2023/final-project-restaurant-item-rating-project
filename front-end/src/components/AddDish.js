import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

export function AddDish() {
  const [loggedIn, setLoggedIn] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const serverAddress = process.env.REACT_APP_SERVER_DEV;

  // fetched data
  const [restaurantName, setRestaurantName] = useState("");

  const [picUrl, setPicUrl] = useState("");
  const [dishName, setDishName] = useState("");

  useEffect(() => {
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
  }, [params.restaurantID, serverAddress]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios
        .post(`${serverAddress}/restaurant/${params.restaurantID}/dish`, {
          dishName: dishName,
          imageUrl: picUrl,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          alert(error);
        });
      if (response.status === 200) {
        navigate(`/restaurant/${params.restaurantID}`);
      }
    } catch (error) {
      console.log(error);
    }
    // redirect to restaurant
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPicUrl(reader.result);
    };
  };

  return (
    <Container>
      <Typography variant="h3">Add a Dish</Typography>
      <Typography variant="h6">Restaurant: {restaurantName}</Typography>
      {/* form */}
      <Box>
        <Box sx={{ m: 2 }} />
        <TextField
          value={dishName}
          onChange={(e) => {
            setDishName(e.target.value);
          }}
          type="text"
          label="Dish Name"
          name="dishName"
          required
        />
        <Box sx={{ m: 2 }} />
        <Typography variant="h6">Add Pictures?</Typography>
        <Box sx={{ m: 1 }} />

        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            accept="image/*"
            hidden
            name="dishImage"
            onChange={handleImageChange}
          />
        </Button>
        <Box sx={{ m: 2 }} />
        <Typography variant="subtitle1">
          {picUrl ? "Image uploaded" : "Upload an image (optional):"}
          {picUrl && (
            <img src={picUrl} alt="your upload" style={{ maxWidth: "250px" }} />
          )}
        </Typography>
        <Box sx={{ m: 4 }} />
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="large"
          type="submit"
          disabled={!loggedIn}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}
