import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Button from "@mui/material/Button"

function LogoutButton(){
    const { logout } = useAuth0()

    return(
        <Button variant="outlined" color="primary" onClick={ () => logout() }>
            Log Out
        </Button>
    )
}

export default LogoutButton