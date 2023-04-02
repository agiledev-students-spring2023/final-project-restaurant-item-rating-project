
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Outlet, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';

export function RestaurantDetail(){

  const navigate = useNavigate();


  const [restaurant, setRestaurant] = useState('');
  const [foodName, setFood] = useState('');
  const [foodName2, setFood2] = useState('');
  const [foodName3, setFood3] = useState('');
  const [avgRating, setRating] = useState(0);
  
  const apiUrl =  "https://my.api.mockaroo.com/restaurants/123.json?key=fc5ecd60";

  useEffect( () => {
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const randomInt = Math.floor(Math.random() * 10) + 1;
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      setRestaurant(data[randomInt].name);
      setFood(data[randomInt].popular_dish);
      setFood2(data[randomInt+1].popular_dish);
      setFood3(data[randomInt+2].popular_dish);
      setRating(randomNumber);
      
    });
  }, [])
  
  const generateGoldStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = Math.round(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStar;
  
    const stars = [];
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }
  
    if (halfStar === 1) {
      stars.push(<span key={fullStars}>&#9733;&#189;</span>);
    }
  
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={fullStars + halfStar + i}>&#9734;</span>);
    }
  
    return stars;
  };

  
  const[showAllergies, setShowAllergies] = useState(false);

  const allergies = [ 'Gluten','Dairy','Eggs','Soy','Peanuts','Tree  nuts', 'Shellfish','fish'];
  const handleButtonClick =() =>{
    setShowAllergies(!showAllergies);
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',paddingBottom: '60px'}}>
      
      <Typography variant="h3" gutterBottom>
        Prime Burgers
      </Typography>
      <Typography variant="h6" gutterBottom>
        City: New York
      </Typography>
      <Box height="2rem" />
      

      <Typography variant="h5" gutterBottom>
        Signature Item
      </Typography>
      <Box 
        onClick={() => navigate("/dish")}
        sx={{
          width:"75%",
          margin:"auto",
          textAlign: 'center'
  
          // justifyContent:"center"
        }}
      >
        <Typography variant="h6" gutterBottom >
          The Holy Burger
        </Typography>
        <img 
          src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium" 
          alt="Delicious food" 
          style={{maxWidth: '100%', height: 'auto'}} 
        />
      </Box>

    <Box height="2rem" />
    <Typography variant="h5" gutterBottom >
        Featured Items
    </Typography>
    <Typography variant="body" gutterBottom>
      Here are some of our most popular dishes!
    </Typography>

    <Box
      onClick={() => navigate("/dish")}
      sx={{
        width:"60%",
        margin:"auto",
        textAlign: 'center'
      }}
    >
      <img 
        src="https://images.ctfassets.net/o19mhvm9a2cm/3TqdEA20hEleGPCZj2JZJl/297b157fdd3ca108c74f17b1bd5fdfce/Website_RB_HP.png" 
        alt="Delicious food" 
        style={{maxWidth: '100%', height: 'auto'}} 
      />
      <Typography variant="h7" gutterBottom >
        The Devil's Burger
      </Typography>
      <Rating name="read-only" value={3} readOnly />
    </Box>
    <Box
      onClick={() => navigate("/dish")}
      sx={{
        width:"60%",
        margin:"auto",
        textAlign: 'center'
      }}
    >
      <img 
        src="https://images.ctfassets.net/o19mhvm9a2cm/40Rv5BpzPIXl94xajEmLWf/92ed9f6fbbfa0d252c60c124c92befdb/Website_2023_February_LTO.png" 
        alt="Delicious food" 
        style={{maxWidth: '100%', height: 'auto'}} 
      />
      <Typography variant="h7" gutterBottom >
        The Devil's Burger
      </Typography>
      <Rating name="read-only" value={3} readOnly />
    </Box>
    


  {/* leaving this out for now. we can implement later */}
  {/* <div style={{ position: 'relative' }}>
    <Button variant = "contained" onClick = {handleButtonClick} 
    style={{ position: 'absolute', right: -250 , top : 50}}>
      Allergy Filter
    </Button>
    {showAllergies && (
      <List>
        {allergies.map((allergy)=>(
          <ListItemButton key = {allergy}>
            <ListItemText primary = {allergy}/>
          </ListItemButton>
        ))}
      </List>
    )}
  </div> */}

  <Box height="2rem" />
    <Typography variant="h4" gutterBottom>
        Full Menu
    </Typography>
    <Box
      onClick={() => navigate("/dish")}
      sx={{
        width:"60%",
        margin:"auto",
        textAlign: 'center'
      }}
    >
      <img 
        src="https://images.ctfassets.net/o19mhvm9a2cm/3TqdEA20hEleGPCZj2JZJl/297b157fdd3ca108c74f17b1bd5fdfce/Website_RB_HP.png" 
        alt="Delicious food" 
        style={{maxWidth: '100%', height: 'auto'}} 
      />
      <Typography variant="h7" gutterBottom >
        The Devil's Burger
      </Typography>
      <Rating name="read-only" value={3} readOnly />
    </Box>
    <Box
      onClick={() => navigate("/dish")}
      sx={{
        width:"60%",
        margin:"auto",
        textAlign: 'center'
      }}
    >
      <img 
        src="https://images.ctfassets.net/o19mhvm9a2cm/40Rv5BpzPIXl94xajEmLWf/92ed9f6fbbfa0d252c60c124c92befdb/Website_2023_February_LTO.png" 
        alt="Delicious food" 
        style={{maxWidth: '100%', height: 'auto'}} 
      />
      <Typography variant="h7" gutterBottom >
        The Devil's Burger
      </Typography>
      <Rating name="read-only" value={3} readOnly />
    </Box>
    <Box
      onClick={() => navigate("/dish")}
      sx={{
        width:"60%",
        margin:"auto",
        textAlign: 'center'
      }}
    >
      <img 
        src="https://images.ctfassets.net/o19mhvm9a2cm/3TqdEA20hEleGPCZj2JZJl/297b157fdd3ca108c74f17b1bd5fdfce/Website_RB_HP.png" 
        alt="Delicious food" 
        style={{maxWidth: '100%', height: 'auto'}} 
      />
      <Typography variant="h7" gutterBottom >
        The Devil's Burger
      </Typography>
      <Rating name="read-only" value={3} readOnly />
    </Box>
    <Box
      onClick={() => navigate("/dish")}
      sx={{
        width:"60%",
        margin:"auto",
        textAlign: 'center'
      }}
    >
      <img 
        src="https://images.ctfassets.net/o19mhvm9a2cm/40Rv5BpzPIXl94xajEmLWf/92ed9f6fbbfa0d252c60c124c92befdb/Website_2023_February_LTO.png" 
        alt="Delicious food" 
        style={{maxWidth: '100%', height: 'auto'}} 
      />
      <Typography variant="h7" gutterBottom >
        The Devil's Burger
      </Typography>
      <Rating name="read-only" value={3} readOnly />
    </Box>

  </Box>
    );
  }
  



