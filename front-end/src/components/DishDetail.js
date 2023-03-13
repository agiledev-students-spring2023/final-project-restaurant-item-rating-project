import { Box, Typography } from "@mui/material";

/**
 * In this part of the file is where you can add other components
 * to render in the main component of this file.
 * For example, here is a title component, which gets rendered in the Template
 * The "props" is the variables that get passed to the component
 * If you aren't familiar with it, it's a good idea to read through the React Docs
 */
function Title(props) {
  return (
    <Typography
    variant="h1"
  >
    {props.title}
  </Typography>
  )
}

/**
 * this is a template component for the team
 * @returns JSX Element
 */
export function DishDetail() {

  // do javascript stuff here like call APIs or state initialization

  // for now, we should store our text/values as variables here 
  // since we will have to fetch them from an api later
  const bodyText = "This is some body text!";

  // this is what gets rendered in the React DOM. Must be one element at the top level
  return (
    <Box>
      <Title title="This is a Template!" />
      <Typography
        variant="body1"
      >
        {bodyText}
      </Typography>
    </Box>
  );
}