import React from "react";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function Redirecting(){
	return (
		<Container sx={{display: "flex",
			justifyContent: "center",
			height: "100vh", 
			alignItems: "center",
			flexDirection: "column"
		}}>
			<CircularProgress sx={{mb: "1rem"}}/>
			<Typography variant="h4">Redirecting...</Typography>
		</Container>
	)
}
