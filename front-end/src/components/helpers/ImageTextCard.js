import { Box, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

/**
 * 
 * @param {*} item needs to have the following properties: "imageSrc", "name" and "id"
 * @returns a material UI card with styling
 */
export function ImageTextCard (item) {
  return (
    <Card 
      key={item.id}
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
          maxWidth:"200px",
          display:'flex', 
        }}
        src={item.imageSrc}
        title={item.name}
        />
    </Box>
      <CardContent
        sx={{
          maxWidth:200
        }}
      >
        <Typography 
          gutterBottom 
          max
          variant="h6" 
        >
          {item.name.split(" ").slice(0,4).join(" ")}
        </Typography>
      </CardContent>
    </Card>
  );
};