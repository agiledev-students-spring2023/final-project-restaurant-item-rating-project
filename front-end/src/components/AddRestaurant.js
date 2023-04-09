import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../App.css';

const serverAddress = "http://localhost:3002"

export function AddRestaurant() {

  const navigate = useNavigate();

  // form data
  const [restaurantName, setRestaurantName] = useState('');
  const [cityName, setCityName] = useState('');
  // const [uploadedImages, setUploadedImages] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();

    axios.post(`${serverAddress}/restaurant`, {
      name: restaurantName,
      location: cityName
    }).then(function (response) {
      console.log(response);
      alert('Restaurant Details submitted')
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
    
    // navigate('/restaurant');
  };
  
  return(
    <Container>
      <Typography variant="h3">Add Restaurant</Typography>

      <form>
        <Typography variant="body1">Add Restaurant</Typography>
        <TextField
          value = {restaurantName} 
          onChange = {(e) => {setRestaurantName(e.target.value);}}
          placeholder='Restaurant Name'
          sx={{
            width:"100%",
            padding:"0.5em",
          }}
          variant="outlined"
        />

        <Typography variant="body1">Add City</Typography>
        <TextField
          value = {cityName} 
          onChange = {(e) => {setCityName(e.target.value);}}
          placeholder='City'
          sx={{
            width:"100%",
            padding:"0.5em",
          }}
          variant="outlined"
        />

        {/* image input */}
        {/* <Box>
          <Typography variant="h6">Add Pictures?</Typography>

          <Box sx={{m:1}} /> 
          <Button
            variant="contained"
            component="label"
          >
            Upload File
            <input
              type="file"
              hidden
            />
          </Button>
          
          <Box sx={{m:2}}> 
            Uploaded images: {uploadedImages.map( 
              (imageObject)=>{
                return ( `${imageObject.name} ` )
              }
            )}
          </Box>
        </Box>
         */}
        <Box sx={{m:2}} /> 
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </form>
    </Container>
  )  
}