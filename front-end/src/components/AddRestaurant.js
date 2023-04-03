import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export function AddRestaurant() {

  const navigate = useNavigate();

  // form data
  const [restaurantName, setRestaurantName] = useState('');
  const [cityName, setCityName] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    alert('Restaurant Details submitted')
    navigate('/restaurant');
  }
  
  return(
    <Container>
      <Typography variant="h3">Add Restaurant</Typography>

      <form onSubmit ={handleSubmit}>
       {/*  <Box sx={{m:2}} /> 
        <TextField label = "Restaurant Name" value = {restaurantName} onChange = {setRestaurantName}/>
        <Box sx={{m:2}} /> 
        <TextField label = "City" value = {cityName} onChange = {setCityName}/>
        <Box sx={{m:1}} /> */}
         <Typography variant="body1">Add Restaurant</Typography>
        <TextField
          placeholder='Restaurant Name'
          sx={{
            width:"100%",
            padding:"0.5em",
          }}
          variant="outlined"
        />

        <Typography variant="body1">Add City</Typography>
        <TextField
          placeholder='City'
          sx={{
            width:"100%",
            padding:"0.5em",
          }}
          variant="outlined"
        />

        {/* image input */}
        <Box>
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
        <Box sx={{m:2}} /> 
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </form>
    </Container>
  )  
}