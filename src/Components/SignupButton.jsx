import React from "react";
import { useAuth0 } from "@auth0/auth0-react"
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography"

function SignupButton(props){
    const { loginWithRedirect } = useAuth0();
	const variant = props.variant

	return (
		<>
		{variant === "drawer"
			? <Typography variant="h4" color="primary" onClick={() => loginWithRedirect({screen_hint: "signup"})}>Sign Up</Typography>
			: <Button variant="contained" color="primary" 
				onClick={() => loginWithRedirect({screen_hint: "signup"})} 
				sx={{...props.sx,}}>
				Sign Up	
			</Button>
		}
		</>
    )
}

export default SignupButton 
