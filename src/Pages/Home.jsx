import React from "react";
import Header from '../Components/Header'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { Link } from "react-router-dom" 
import Hidden from "@mui/material/Hidden";


const image = {
	width: "100%"
}

function Home(){
    return(
        <>
            <Header />
			<Grid container sx={{minHeight: "90vh"}}>
				<Grid item xs={12} sm={5} sx={{p:"2rem", pl:{sm: "4rem"}, display: "flex", flexDirection: "column", justifyContent: "center" }}>
					<Typography variant="h3" sx={{pb: "1rem"}}>The best place to buy and sell books</Typography>
					<Hidden only="sm">
						<Typography variant="h6" sx={{pb: "1rem"}}>The only place you will need to find all the books you want at fair prices. Discover our books here:</Typography>
					</Hidden>
					<Button component={Link} to="/books" variant="contained" sx={{alignSelf: "flex-start"}}>Discover</Button>
				</Grid>
				<Hidden smDown>
					<Grid item xs={12} sm={7} sx={{display: "flex", alignItems: "center"}}>
						<Box component="img" sx={image} src="https://cdn.dribbble.com/users/2460712/screenshots/8087558/media/88a936e6bf27940076d1ac94c0b23888.png" />
					</Grid>
				</Hidden>
			</Grid>
		</>
    )
}

export default Home
