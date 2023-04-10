// components/Layout.js
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Home from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { BottomNavigation, BottomNavigationAction, Box, Paper, Typography } from '@mui/material';
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
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;

  const home = () => navigate('/');
  const about = () => navigate('/about');
  const search = () => navigate('/search');

  const [value, setValue] = useState(home);

  // get path
  const location = useLocation();
  // console.log(location.pathname)

  return (
    <Box>
      <Typography
        variant={isMobile ? "h6" : "h2" } 
        textAlign="center"
        >
        Dish Dealer
      </Typography>
      {/* back button */}
      {/* check if "home" */}
      {
        (location.pathname === '/') ? 
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
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
        >
          <BottomNavigationAction 
            label="Home" 
            icon={<Home />}
            onClick={home}
          />
          <BottomNavigationAction 
            label="About" 
            icon={<FavoriteIcon />}
            onClick={about}
          />
          <BottomNavigationAction 
            label="Search" 
            icon={<SearchIcon />}
            onClick={search}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}