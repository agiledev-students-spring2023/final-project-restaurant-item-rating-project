import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

export function AddDish() {
  const navigate = useNavigate();
  const params = useParams();

  const serverAddress = "http://localhost:3002";
  const formAddress = `${serverAddress}/restaurant/${params.restaurantID}/dish`;

  // avatar stuff
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

  // fetched data
  const [restaurantName, setRestaurantName] = useState("");

  // form data
  // const [dishName, setDishName] = useState("");
  // const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedFile, setUploadedFile] = useState("");

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
  }, []);

  return (
    <Container>
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
      <Typography variant="h3">Add a Dish</Typography>
      <Typography variant="h6">Restaurant: {restaurantName}</Typography>
      {/* form */}
      <Box
        component="form"
        action={formAddress}
        method="post"
        encType="multipart/form-data"
      >
        <Box sx={{ m: 2 }} />
        <TextField type="text" label="Dish Name" name="dishName" />
        <Box sx={{ m: 2 }} />
        <Typography variant="h6">Add Pictures?</Typography>
        <Box sx={{ m: 1 }} />

        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            hidden
            name="dishImage"
            onChange={(e) => {
              console.log(e.target.files[0].name);
              setUploadedFile(e.target.files[0].name);
            }}
          />
        </Button>

        <Box sx={{ m: 2 }} />

        {/* image input */}
        {uploadedFile !== "" ? (
          <Box sx={{ m: 2 }}>Uploaded image: {uploadedFile}</Box>
        ) : (
          ""
        )}
        <Box sx={{ m: 4 }} />
        <Button variant="contained" size="large" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
}
