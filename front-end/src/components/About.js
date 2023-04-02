import { Box, Typography } from "@mui/material";

  export function About() {
    return (

        <Box>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold'}} padding={0} margin={1}>
                Our Purpose:
            </Typography>

            <Typography
            variant="body1" component="div" sx={{ flexGrow: 1}} padding={0} margin={1}>
                Dish Dealer allows users to rate individual items at restaurants.
                There are two current problem with review systems like Google Reviews 
                (which is excellent) and Yelp: (1) you can rate restaurants but 
                not individual food items, and (2) people don't know what's "the best" 
                thing to order at a restaurant unless by word of mouth. On the first point, 
                critically, things such as service and ambience will lower the overall 
                rating of the restaurant even if the food is fire (delicious). 
                Dish Dealer solves this problem by focusing our ratings exclusively on the 
                dishes themselves. On the second point, our application enables users, 
                before going to or at a restaurant, to quickly lookup the best-rated items. 
                Our target market is foodies and those with allergies.
            </Typography>

            <Typography
            variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold'}} padding={0} margin={1}>
                Who we are:
            </Typography>

            <Typography
            variant="body1" component="div" sx={{ flexGrow: 1}} padding={0} margin={1}>
                Akhil Kotamraju, CHristina Borao, James Galbraith, Janak Balar & Weu Luo.
            </Typography>

            <Typography
            variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold'}} padding={0} margin={1}>
                Terms of Service:
            </Typography>

            <Typography
            variant="body1" component="div" sx={{ flexGrow: 1}} padding={0} margin={1}>
                Contrary to popular belief, Lorem Ipsum is not simply random text. 
                It has roots in a piece of classical Latin literature from 45 BC, 
                making it over 2000 years old. Richard McClintock, a Latin professor at 
                Hampden-Sydney College in Virginia, looked up one of the more obscure Latin 
                words, consectetur, from a Lorem Ipsum passage, and going through the cites 
                of the word in classical literature, discovered the undoubtable source. 

                Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum 
                et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. 
                This book is a treatise on the theory of ethics, very popular during the 
                Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", 
                comes from a line in section 1.10.32.
            </Typography>

        </Box>
    );
  }
  
  