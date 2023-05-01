import { Avatar, Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../App.css';


const serverAddress = "http://localhost:3002"

export function AddRestaurant() {

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  // form data
  const [restaurantName, setRestaurantName] = useState('');
  const [cityName, setCityName] = useState('');
  // const [uploadedImages, setUploadedImages] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();

    if (!restaurantName) {
      alert('Please enter a restaurant name');
      return;
    }
    else if (!cityName){
      alert('Please enter a city');
      return;
    }

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
      //alert(error.response.data.message);
    });
    
    navigate('/home');
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setLoggedIn(true);
    }
  }, []);
  
  return(
    <Container bgcolor={'#FFFFFF'}>

      <Typography style={{ fontFamily: 'BlinkMacSystemFont'}} color={'#31525B'} variant="h3">Add Restaurant</Typography>

      <form>
        <Typography style={{ fontFamily: 'BlinkMacSystemFont'}} variant="body1">Add Restaurant</Typography>
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

        <Typography style={{ fontFamily: 'BlinkMacSystemFont'}} variant="body1">Add City</Typography>
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
        <Button variant="contained" onClick={handleSubmit} disabled={!loggedIn}>Submit</Button >
      </form>
    </Container>
  )  
}