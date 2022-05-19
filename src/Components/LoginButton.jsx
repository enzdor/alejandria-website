import React from "react";
import { useAuth0 } from "@auth0/auth0-react"
import Typography from "@mui/material/Typography";


function LoginButton(props){
    const { loginWithRedirect } = useAuth0();
	const variant = props.variant
	const sx = props.sx

	return (
		<>
			{variant === "drawer"
				? <Typography variant="h4" color="primary" sx={sx} onClick={() => loginWithRedirect()}>Log In</Typography>
				: <Typography variant="h6" color="black" sx={{cursor: 'pointer'}} onClick={() => loginWithRedirect()}>Log In</Typography>
			}
		</>
	)
}

export default LoginButton
