<<<<<<< HEAD
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
=======
import SearchIcon from '@mui/icons-material/Search';
import {Avatar, Box, Container, TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
>>>>>>> origin/master
// reuse this function
import { RestaurantMapping } from "./RestaurantMapping";

const serverAddress = "http://localhost:3002";

export function Search() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    axios
      .post(`${serverAddress}/search`, {
        searchText: searchQuery,
      })
      .then((response) => {
        console.log(response.data);
        setSearchResults(response.data);
        setHasSearched(true);
      });
  };

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

  return (
    <Box>
<<<<<<< HEAD
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
=======
       <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", p: 2 }}>
      <Avatar onClick={handleAvatarClick} src={avatarUrl}/>
       </Box>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
>>>>>>> origin/master
        }}
      >
        <TextField
          placeholder="Restaurant Name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          sx={{
            width: "100%",
            padding: "0.5em",
          }}
          variant="outlined"
        />
        <IconButton
          variant="contained"
          onClick={() => handleSearch()}
          color="primary"
        >
          <SearchIcon />
        </IconButton>
      </Box>
      <Button onClick={() => navigate("/restaurant")}>Add Restaurant</Button>

      <Box
        sx={{
          margin: "auto 4%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {!hasSearched ? (
          <Typography variant="body" style={{ fontFamily: "Roboto" }}>
            Please enter a search to see results!
          </Typography>
        ) : searchResults.length === 0 ? (
          <Typography variant="body">
            Please enter a search to see results!
          </Typography>
        ) : (
          searchResults.map((searchResult) => {
            return RestaurantMapping(searchResult, navigate);
          })
        )}
      </Box>
    </Box>
  );
}
