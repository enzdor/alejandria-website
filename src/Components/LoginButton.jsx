import React from "react";
import { useAuth0 } from "@auth0/auth0-react"
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";


function LoginButton(props){
    const { loginWithRedirect } = useAuth0();

	return (
		<>
			{props.type === "button"
				?<Button sx={{...props.sx}} variant="text" color="primary" onClick={() => loginWithRedirect()}>Log In</Button>
				:<Typography variant="h6"  onClick={() => loginWithRedirect()} sx={{...props.sx,color: "black", cursor: "pointer"}}>Log In</Typography>
			}
		</>
	)
}

export default LoginButton
