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

  // const bodyText = "This is some body text!";

  return (
    <Box>
      <Title title="Leave a review" />
      <Typography
        variant="body1"
      >
        {/* {bodyText} */}
        
      </Typography>
    </Box>
  );
}
