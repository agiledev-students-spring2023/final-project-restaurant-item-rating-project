// components/Layout.js
import { Typography, Box, Container, Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Home from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Add from '@mui/icons-material/Add';


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
  const template = () => navigate('/template');

  return (
    <Box>
      <Typography
        variant={isMobile ? "h6" : "h2" } 
        textAlign="center"
        >
        App Name
      </Typography>
      <Box
        height="1rem"
      />
      <Outlet />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={home}
          onChange={(event, newValue) => {
            newValue();
          }}
        >
          <BottomNavigationAction 
            label="Home" 
            icon={<Home />}
            value={home}
          />
          <BottomNavigationAction 
            label="About" 
            icon={<FavoriteIcon />}
            value={about}
          />
          <BottomNavigationAction 
            label="Template" 
            icon={<Add />}
            value={template}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}