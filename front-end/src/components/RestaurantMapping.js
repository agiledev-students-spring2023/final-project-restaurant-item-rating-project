import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { Component }  from 'react';
import CardMedia from "@mui/material/CardMedia";
/**
 * NOTE: this function is also used in the "Home" component
 * Check changes if you update it!
 *
 * @param {*} favorite
 * @param {*} navigate
 * @returns
 */
export function RestaurantMapping(favorite, navigate) {
  // const makeRedir

  return (
    <Box
      key={favorite._id}
      sx={{
        marginTop: "2em",
      }}
    >
      <Card onClick={() => navigate(`/restaurant/${favorite._id}`)}>
        <Box
          sx={
            {
              // display:'flex',
              // justifyContent:"center"
            }
          }
        >
          <CardMedia
            component="img"
            height="200"
            width="auto"
            sx={
              {
                // maxWidth:"1000px",
                // display:'flex',
              }
            }
            src={"https://picsum.photos/200"}
            title={favorite.name}
          />
        </Box>
        <CardContent
          sx={{
            maxWidth: 1000,
          }}
        >
          <Typography gutterBottom variant="h6">
            {favorite.name.split(" ").slice(0, 4).join(" ")}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
