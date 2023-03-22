import { Button, Box, TextField, FormGroup, FormControlLabel, Typography, Container } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import '../App.css';

export function AddDish() {

  // fetched data
  const [restaurantName, setRestaurantName] = useState('Los Tacos'); // TODO: mock this with mockeroo

  // form data
  const [dishName, setDishName] = useState('');
  const [isVegan, setIsVegan] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleIsVegan = (event) => {
    setIsVegan(event.target.checked);
  };
  const handleGlutenFree = (event) => {
    setIsGlutenFree(event.target.checked);
  };

  const handleSubmit = event => {
    event.preventDefault();
    alert('Dish Details submitted')
  }

  useEffect( () => {
    // TODO: mock fetch data: setRestaurantName 
  }, [])
  
  return(
    <Container>
      <Typography variant="h3">Add a Dish</Typography>
      <Typography variant="h6">Restaurant: {restaurantName}</Typography>
      <form onSubmit ={handleSubmit}>
        <Box sx={{m:2}} /> 
        <TextField label = "Dish Name" value = {dishName} onChange = {setDishName}/>

        <FormGroup>
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
        </FormGroup>

        <Box sx={{m:2}} /> 

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
