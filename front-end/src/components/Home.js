import { Button, Box, Typography, Container, TextField} from "@mui/material";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';

/* import{SearchBar} from "./components/SearchBar"; */

function suggestionsMapping (favorite) {
  return (
    <Card 
      key={favorite.id}
    >
    <Box
      sx={{
        display:'flex', 
        justifyContent:"center"
      }}
    >
      <CardMedia
        component="img"
        height="200"
        sx={{ 
          maxWidth:"1000px",
          display:'flex', 
        }}
          src={"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}
/*         src={"https://picsum.photos/200"} */
        title={favorite.title}
      />
    </Box>

      <CardContent
        sx={{
          maxWidth:1000
        }}
      >
        <Typography 
          gutterBottom 
          variant="h6">Lava Shawarma NYC - 226 Thompson St, New York, NY 10012
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Rating:☆☆☆☆☆
        {/* >
          {favorite.title.split(" ").slice(0,4).join(" ")} */}
        </Typography>

      </CardContent>

    </Card>

    
  );
};

function suggestionsMapping1 (favorite) {
  return (
    <Card 
      key={favorite.id}
    >
    <Box
      sx={{
        display:'flex', 
        justifyContent:"center"
      }}
    >
      <CardMedia
        component="img"
        height="200"
        sx={{ 
          maxWidth:"1000px",
          display:'flex', 
        }}
          src={"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=780&q=80"}
/*         src={"https://picsum.photos/200"} */
        title={favorite.title}
      />
    </Box>

      <CardContent
        sx={{
          maxWidth:1000
        }}
      >
        <Typography 
          gutterBottom 
          variant="h6">SThe Grey Dog - 90 University Pl, New York, NY 10003
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Rating: ☆☆☆☆☆
        {/* >
          {favorite.title.split(" ").slice(0,4).join(" ")} */}
        </Typography>

      </CardContent>

    </Card>

    
  );
};

function suggestionsMapping2 (favorite) {
  return (
    <Card 
      key={favorite.id}
    >
    <Box
      sx={{
        display:'flex', 
        justifyContent:"center"
      }}
    >
      <CardMedia
        component="img"
        height="200"
        sx={{ 
          maxWidth:"1000px",
          display:'flex', 
        }}
          src={"https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=710&q=80"}
/*         src={"https://picsum.photos/200"} */
        title={favorite.title}
      />
    </Box>

      <CardContent
        sx={{
          maxWidth:1000
        }}
      >
        <Typography 
          gutterBottom 
          variant="h6">Tavern 29 - 47 E 29th St, New York, NY 10016
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Rating: ☆☆☆☆☆
        {/* >
          {favorite.title.split(" ").slice(0,4).join(" ")} */}
        </Typography>

      </CardContent>

    </Card>

    
  );
};

export function Home() {


  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  // mocked api with mockaroo
  const apiUrl =  "https://my.api.mockaroo.com/suggestions?key=07b3ef90";
  useEffect( () => {
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      setSuggestions(data.slice(0,1));
    });

  }, []
  )

  // this is what gets rendered in the React DOM. Must be one element at the top level
  return (

    <Container>

      <Button onClick={() => navigate('/search')}>Search</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      {/* <TextField  type="search" id="search" label="Search" sx={{ width: 350}} /> */}
      {/* <div className = "search-bar-container">
        <SearchBar />
        <div>SearchResults</div>
      </div> */}

      <Button onClick={() => navigate('/favorites')}>Your Favorites - not built out</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button onClick={() => navigate('/add/restaurant')}>Add Restaurant</Button>


      <Typography variant="h6" 
        component="div" sx={{ flexGrow: 1}}>
        Recommended for you:
      </Typography>


      <Box>      
        <Box
          sx={{ 
            margin: "auto 4% auto 4%",
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {suggestions.map(suggestionsMapping)}
        </Box>

      </Box>


      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


      <Box>      
        <Box
          sx={{ 
            margin: "auto 4% auto 4%",
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {suggestions.map(suggestionsMapping1)}
        </Box>

      </Box>

      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


      <Box>      
        <Box
          sx={{ 
            margin: "auto 4% auto 4%",
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {suggestions.map(suggestionsMapping2)}
        </Box>

      </Box>

      
    </Container>
  );
}
