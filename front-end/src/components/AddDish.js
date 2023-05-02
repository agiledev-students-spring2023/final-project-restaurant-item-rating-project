import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  IconButton
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

export function AddDish() {
  const [loggedIn, setLoggedIn] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const serverAddress = "http://localhost:3002";
  const formAddress = `${serverAddress}/restaurant/${params.restaurantID}/dish`;

  // fetched data
  const [restaurantName, setRestaurantName] = useState("");
  const [dishName, setDishName] = useState("");

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
  }, [params.restaurantID]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${serverAddress}/restaurant/${params.restaurantID}/dish`, {
        dishName: dishName,
        uploadedPicture: uploadedFile,
      });
      if (response.status === 200) {
        navigate(`/restaurant/${params.restaurantID}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadedFile(reader.result);
    };
  };
 

  return (
    <Container>
      <Typography variant="h3">Add a Dish</Typography>
      <Typography variant="h6">Restaurant: {restaurantName}</Typography>
      {/* form */}
      <Box>
        <Box sx={{ m: 2 }} />
        <TextField type="text" label="Dish Name" name="dishName" value={dishName} onChange={(e) => setDishName(e.target.value)} required/>
        <Box sx={{ m: 2 }} />
        <Typography variant="h6">Add Pictures?</Typography>
        <Box sx={{ m: 1 }} />

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
         {uploadedFile ? "Image uploaded" : "Upload an image (optional):"}
         {uploadedFile && <img src={uploadedFile} alt="uploaded image" style={{ maxWidth: "250px" }} />}
       </Typography>
    
     </Box>
     <Button variant="contained" type="submit" onClick={handleSubmit} disabled={!loggedIn}>
           Submit
         </Button>
       </Box>
       {/* </form> */}
    </Container>
  );
}
