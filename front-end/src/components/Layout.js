// components/Layout.js
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Home from '@mui/icons-material/Home';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import {Avatar, BottomNavigation, BottomNavigationAction, Box, Paper, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


/**
 * 
 * @returns parent component for all pages. provides header and footer 
 */

export function Layout() {

  const navigate = useNavigate();

  // for isMobile variable
  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
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
    navigate("/profile");
  };
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;
  const serverAddress = "http://localhost:3002";
  const home = () => navigate('/home');
  const search = () => navigate('/search');

  const [value, setValue] = useState(home);

  // get path
  const location = useLocation();
  // console.log(location.pathname)

  return (
    <Box>
      <Typography bgcolor={'#FAA101'}
        variant={isMobile ? "h6" : "h2" } 
        textAlign="center"
        >

        <img src = {require('./Dish_Dealer_Logo.png')} width={350} height={200} alt = "Dish Dealer Logo" />
      </Typography>

      {/* back button */}
      {/* check if "home" */}
      {
        (location.pathname === '/home') ? 
        "" : 
      <IconButton 
        variant="outlined" 
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      }

      <Box height="1rem" />

      <Box
        paddingBottom={"5em"}
      >
        <Outlet />
      </Box>
      <Paper 
        sx={{
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation style={{ backgroundColor: '#B3DEE5' }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
          fill={'#B3DEE5'}
        >

          <BottomNavigationAction 
            label="Home" 
            icon={<Home />}
            onClick={home}
          />
          <BottomNavigationAction 
            label="Search" 
            icon={<SearchIcon />}
            onClick={search}
          />
           <BottomNavigationAction
            label="Profile" 
            icon= { <Avatar src={avatarUrl} />}
            onClick={handleAvatarClick}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}