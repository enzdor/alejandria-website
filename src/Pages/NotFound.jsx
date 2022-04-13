import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function NotFound(){
	return (
		<Container sx={{display: "flex",
			justifyContent: "center",
			height: "100vh", 
			alignItems: "center",
			flexDirection: "column"
		}}>
			<Typography variant="h2" color="primary">404</Typography>
			<Typography variant="h5">Page not found</Typography>
			<Typography variant="h4" component={Link} to="/" sx={{
				textDecoration: "none",
				color: "primary"
			}}>Home</Typography>
		</Container>
	)
}
