// components/Layout.js
import FavoriteIcon from "@mui/icons-material/Favorite";
import Home from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

/**
 *
 * @returns parent component for all pages. provides header and footer
 */

export function Layout() {
  const navigate = useNavigate();

  const serverAddress = process.env.REACT_APP_SERVER_DEV;
  const home = () => navigate("/home");
  const search = () => navigate("/search");
  const favorites = () => navigate("/favorites");

  const [value, setValue] = useState(home);

  // for isMobile variable
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 768;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
      // set document title
      document.title = 'Dish Dealer';
  }, []);

  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    axios
      .get(`${serverAddress}/profile/${storedId}`)
      .then((response) => {
        const { avatarUrl } = response.data;
        setAvatarUrl(avatarUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [serverAddress]);

  const handleAvatarClick = () => {
    navigate("/profile");
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <Box>
      <Typography
        bgcolor={"#FAA101"}
        variant={isMobile ? "h6" : "h2"}
        textAlign="center"
      >
        <img
          src={require("./Dish_Dealer_Logo.png")}
          width={350}
          height={200}
          alt="Dish Dealer Logo"
        />
      </Typography>

      {/* back button */}
      {/* check if "home" */}
      {
        //   (location.pathname === '/home') ?
        //   "" :
        // <IconButton
        //   variant="outlined"
        //   onClick={() => {
        //     navigate(-1);
        //   }}
        // >
        //   <ArrowBackIosIcon />
        // </IconButton>
      }

      <Box height="1rem" />

      <Box paddingBottom={"5em"}>
        <Outlet />
      </Box>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          style={{ backgroundColor: "#B3DEE5" }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          fill={"#B3DEE5"}
        >
          <BottomNavigationAction label="Home" icon={<Home />} onClick={home} />
          <BottomNavigationAction
            label="Search"
            icon={<SearchIcon />}
            onClick={search}
          />
          <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteIcon />}
            onClick={favorites}
          />
          <BottomNavigationAction
            label="Profile"
            icon={<Avatar src={avatarUrl} />}
            onClick={handleAvatarClick}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
