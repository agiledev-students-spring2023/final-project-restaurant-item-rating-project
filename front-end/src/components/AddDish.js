import { Avatar, Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../App.css';


export function AddDish() {
  const serverAddress = "http://localhost:3002"

  const [avatarUrl, setAvatarUrl] = useState('');
  useEffect(() => {
      const storedId = localStorage.getItem('userId');
      axios.get(`${serverAddress}/profile/${storedId}`).then(response => {
        const { email, password,avatarUrl } = response.data;
        setAvatarUrl(avatarUrl);
      }).catch(error => {
        console.log(error);
      });
  }, []);

  const handleAvatarClick = () => {
    navigate('/profile');
  }

  const navigate = useNavigate();
  const params = useParams();

  // fetched data
  const [restaurantName, setRestaurantName] = useState(""); 

  // form data
  const [dishName, setDishName] = useState('');
  // const [isVegan, setIsVegan] = useState(false);
  // const [isGlutenFree, setIsGlutenFree] = useState(false);

  // const handleIsVegan = (event) => {
  //   setIsVegan(event.target.checked);
  // };
  // const handleGlutenFree = (event) => {
  //   setIsGlutenFree(event.target.checked);
  // };

 const handleSubmit = event => {

  if (!dishName) {
    alert('Please enter a dish name');
    return;
  }
  axios.post(`${serverAddress}/restaurant/${params.restaurantID}/dish`, {
    name: dishName
  }).then(function (response) {
  console.log(response)
  })
  .catch(function (error) {
    console.log(error);
    alert(error);
  });
  // redirect to dish 
  navigate(`/restaurant/${params.restaurantID}`);
 };


  useEffect( () => {
    // get restaurant name
    axios.get(`${serverAddress}/restaurant/${params.restaurantID}`)
    .then(response => {
      setRestaurantName(response.data.name);
    })
    .catch((error) => {
      console.error('Error getting restaurant name: ', error);
      // alert("An error has occurred when finding that restaurant");
    });
  }, [])
 
  
  return(
    <Container>
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", p: 2 }}>
      <Avatar onClick={handleAvatarClick} src={avatarUrl}/>
       </Box>
      <Typography variant="h3">Add a Dish</Typography>
      <Typography variant="h6">Restaurant: {restaurantName}</Typography>
      <form onSubmit ={handleSubmit}>
        <Box sx={{m:2}} /> 
        <TextField label = "Dish Name" value = {dishName} onChange = {(e) => {setDishName(e.target.value);}}/>

        {/* <FormGroup>
          <FormControlLabel 
            control={
              <Checkbox 
                checked={isVegan}
                onChange={handleIsVegan}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            } 
            label="Vegan" 
          />
          <FormControlLabel 
            control={
              <Checkbox 
                checked={isGlutenFree}
                onChange={handleGlutenFree}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            } 
            label="Gluten Free" 
          />
        </FormGroup> */}

        {/* <Box sx={{m:2}} />  */}

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
        </Box> */}
        <Box sx={{m:2}} /> 
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </form>
    </Container>
  )  
}
