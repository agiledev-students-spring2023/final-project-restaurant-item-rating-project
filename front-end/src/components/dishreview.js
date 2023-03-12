import { Box, Typography } from "@mui/material";

function Title(props) {
  return (
    <Typography
    variant="h1"
  >
    {props.title}
  </Typography>
  )
}


export function Dishreview() {

  const bodyText = "Restaurant: ";
  const bodyText2 = "Dish: ";
  const bodyText3 = "Rating: ";
  
return (
    <Box display="flex" flexDirection="column">
      <Title title="Leave a review" />
      <Typography variant="body1">
        {bodyText}
      </Typography>
      <Typography variant="body1">
        {bodyText2}
      </Typography>
      <Typography variant="body1">
        {bodyText3}
      </Typography>
    </Box>
  );
}
