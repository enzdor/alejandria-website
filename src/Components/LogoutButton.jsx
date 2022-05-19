import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";

function LogoutButton(props){
    const { logout } = useAuth0()
	const variant = props.variant

	return(
		<>
		{ variant === "drawer"
			? <Typography variant="h4" color="primary" onClick={() => logout()}>Log Out</Typography>
			: <Button variant={props.variant} color="primary" onClick={ () => logout() } sx={{...props.sx,}}>
				Log Out
			</Button>
		}
		</>

    )
}

export default LogoutButton
