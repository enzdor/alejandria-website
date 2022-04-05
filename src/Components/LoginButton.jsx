import React from "react";
import { useAuth0 } from "@auth0/auth0-react"
import Button from '@mui/material/Button';

function LoginButton(props){
    const { loginWithRedirect } = useAuth0();

    return (
		<Button variant={props.variant} color="secondary" onClick={() => loginWithRedirect()} sx={{...props.sx,}}>Log In</Button>
    )
}

export default LoginButton
