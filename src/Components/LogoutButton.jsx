import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Button from "@mui/material/Button"

function LogoutButton(props){
    const { logout } = useAuth0()

    return(
		<Button variant={props.variant} color="primary" onClick={ () => logout() } sx={{...props.sx,}}>
            Log Out
        </Button>
    )
}

export default LogoutButton
