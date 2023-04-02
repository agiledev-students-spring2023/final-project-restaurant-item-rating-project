
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';


export function RestaurantProfile(){

    const [foodPic, setFoodPic] = useState('');
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
    
  }, []
  )
    
    
    return (
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',paddingBottom: '60px'}}>
        <Typography variant="h3" component="h1" gutterBottom>
          Signature Item!
        </Typography>
       <div style={{position: 'relative', maxWidth: '30%', height: '40'}}>
          <img src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium" alt="Delicious food" style={{maxWidth: '100%', height: 'auto'}} />
          <div style={{position: 'absolute', bottom: -10, left: '60%', transform: 'translateX(-50%)'}}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8CjNhKyCpM-61RNHidBiiy1OjP2tGac7jHYs-L2Bewp_pGCRhGiRqPModulnd7FKAhGE&usqp=CAU" alt="Another delicious food" style={{maxWidth: '50%', height: 'auto'}} />
          </div>
        </div>
        <Box sx={{display: 'flex', justifyContent: 'center', marginTop: 2}}>
          <Box sx={{width: '50%', border: 1, borderColor: 'grey.400', padding: 2, marginRight: 4}}>
            <Typography variant="h6" component="h2" gutterBottom>
              Order Via DoorDash
            </Typography>
          </Box>
          <Box sx={{width: '50%', border: 1, borderColor: 'grey.400', padding: 2, marginLeft: 4}}>
            <Typography variant="h6" component="h2" gutterBottom>
              Leave a Review
            </Typography>
          </Box>
        </Box>
        <Box sx={{marginTop: 4}}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ marginLeft: 10, marginRight: 0 }}>
        Featured Items:
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ marginLeft: 10, marginRight: 0 }}>
        Here are some of our most popular dishes!
      </Typography>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 2}}>
      <div style={{position: 'relative', maxWidth: '30%', height: '40', left :'150px'}}>
      <div>
          <img src="https://images.ctfassets.net/o19mhvm9a2cm/3TqdEA20hEleGPCZj2JZJl/297b157fdd3ca108c74f17b1bd5fdfce/Website_RB_HP.png" alt="Delicious food" style={{maxWidth: '100%', height: 'auto'}} />
        </div>
        <p style={{textAlign: 'center'}}>Dish: {foodName2}</p>
        <p style={{textAlign: 'center'}}>Dish: {avgRating} stars</p>
        </div>
        <div style={{position: 'relative', maxWidth: '30%', height: '40', left :'-150px'}}>
        <div>
          <img src="https://images.ctfassets.net/o19mhvm9a2cm/40Rv5BpzPIXl94xajEmLWf/92ed9f6fbbfa0d252c60c124c92befdb/Website_2023_February_LTO.png" alt="Delicious food" style={{maxWidth: '100%', height: 'auto'}} />
        </div>
        <p style={{textAlign: 'center'}}>Dish: {foodName}</p>
        <p style={{textAlign: 'center'}}>Dish: {avgRating} stars</p>
        </div>
        </div>
    </Box>
    <Typography variant="h4" component="h2" gutterBottom sx={{ marginLeft: -70, marginRight: 0 }}>
        Full Menu:
      </Typography>
      <div style={{display: 'flex', flexDirection: 'row', maxWidth: '20%', marginLeft : -550}}>
  <div style={{position: 'relative', maxWidth: '100%', height: 'auto'}}>
    <img src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium" alt="Delicious food" style={{maxWidth: '100%', height: 'auto'}} />
  </div>
  <div style={{marginLeft: '10px'}}>
    <p style={{textAlign: 'center'}}>{foodName}</p>
    <p style={{textAlign: 'center'}}>{avgRating} stars</p>
  </div>
</div>
<div style={{display: 'flex', flexDirection: 'row', maxWidth: '20%', marginLeft : -550}}>
  <div style={{position: 'relative', maxWidth: '100%', height: 'auto'}}>
    <img src="https://images.ctfassets.net/o19mhvm9a2cm/3TqdEA20hEleGPCZj2JZJl/297b157fdd3ca108c74f17b1bd5fdfce/Website_RB_HP.png" alt="Delicious food" style={{maxWidth: '100%', height: 'auto'}} />
  </div>
  <div style={{marginLeft: '10px'}}>
    <p style={{textAlign: 'center'}}>{foodName2}</p>
    <p style={{textAlign: 'center'}}>{avgRating} stars</p>
  </div>
</div>
<div style={{display: 'flex', flexDirection: 'row', maxWidth: '20%', marginLeft : -550}}>
  <div style={{position: 'relative', maxWidth: '100%', height: 'auto'}}>
    <img src="https://images.ctfassets.net/o19mhvm9a2cm/40Rv5BpzPIXl94xajEmLWf/92ed9f6fbbfa0d252c60c124c92befdb/Website_2023_February_LTO.png" alt="Delicious food" style={{maxWidth: '100%', height: 'auto'}} />
  </div>
  <div style={{marginLeft: '10px'}}>
    <p style={{textAlign: 'center'}}>{foodName3}</p>
    <p style={{textAlign: 'center'}}>{avgRating} stars</p>
  </div>
</div>
<div style={{display: 'flex', flexDirection: 'row', maxWidth: '20%', marginLeft : -550}}>
  <div style={{position: 'relative', maxWidth: '100%', height: 'auto'}}>
    <img src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium" alt="Delicious food" style={{maxWidth: '100%', height: 'auto'}} />
  </div>
  <div style={{marginLeft: '10px'}}>
    <p style={{textAlign: 'center'}}>{foodName2}</p>
    <p style={{textAlign: 'center'}}>{avgRating} stars</p>
  </div>
</div>
  </Box>
    );
  }
  



