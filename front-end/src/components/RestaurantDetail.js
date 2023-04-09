
import { Box, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const serverAddress = "http://localhost:3002"

export function RestaurantDetail(){

  const params = useParams();

  const navigate = useNavigate();

  const [restaurantName, setRestaurantName] = useState('');
  const [location, setLocation] = useState('');
  const [dishes, setDishes] = useState([]);

  // const [foodName, setFood] = useState('');
  // const [foodName2, setFood2] = useState('');
  // const [foodName3, setFood3] = useState('');
  // const [avgRating, setRating] = useState(0);

  useEffect( () => {
    fetch(`${serverAddress}/restaurant/${params.restaurantID}`)
    .then((response) => response.json())
    .then((data) => {

      setRestaurantName(data.name);
      setLocation(data.location);
      setDishes(data.dishes);
    })
    .catch( (err) => {
      console.error(err);
      alert("An error has occurred when finding that restaurant");
    })
  }, [])

  // get restaurant
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',paddingBottom: '60px'}}>

      <Typography variant="h3" gutterBottom>
        {restaurantName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        City: {location}
      </Typography>

      <Box height="2rem" />
{/* 
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
    </Typography> */}
{/* 
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
     */}


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
    {dishes.map( (dish) => {
      return (
        
        <Box
        onClick={() => navigate(`/restaurant/${params.restaurantID}/dish/${dish._id}`)}
        sx={{
          width:"60%",
          margin:"auto",
          textAlign: 'center'
        }}
      >
        <Box height="2rem" />
        <img 
          src="https://images.ctfassets.net/o19mhvm9a2cm/3TqdEA20hEleGPCZj2JZJl/297b157fdd3ca108c74f17b1bd5fdfce/Website_RB_HP.png" 
          alt="Delicious food" 
          style={{maxWidth: '100%', height: 'auto'}} 
        />
        <Typography variant="h7" gutterBottom >
          {dish.name}
        </Typography>
        {
          ("averageRating" in dish) ? 
          <Rating name="read-only" value={dish.averageRating} readOnly /> :
          ""
        }
        
        
      </Box>
  
      );
    })}
  </Box>
    );
  }
  



