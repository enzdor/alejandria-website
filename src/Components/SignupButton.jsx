import React from "react";
import { useAuth0 } from "@auth0/auth0-react"
import Button from '@mui/material/Button';

function SignupButton(props){
    const { loginWithRedirect } = useAuth0();

    return (
		<Button variant={props.variant} color="primary" 
			onClick={() => loginWithRedirect({screen_hint: "signup"})} 
			sx={{...props.sx,}}>
			Sign Up	
		</Button>
    )
}

export default SignupButton 
