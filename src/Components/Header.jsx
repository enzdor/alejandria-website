import React from "react";
import { Link } from 'react-router-dom';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Button, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(() => ({
    logo: {
        fontSize: "2em",
        textDecoration: "none",
        color: "blue",
        '&visited': {
            color: "blue"
        }
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "white"
    }
}))

export default function Header(){
    const { header, logo, toolbar } = useStyles()
    const { isAuthenticated, isLoading } = useAuth0()


    function displayDesktop(){
        return (
            <Toolbar className={toolbar}>
                <Link to="/" className={ logo }>Alejandria</Link>
                <div>
                    <Button component={ Link } to="/books" variant="text" color="primary">Books</Button>
                    {isLoading 
                        ? <p>Loading</p> 
                        : isAuthenticated ? <><Button component={ Link } to="/profile" variant="text" color="primary">Profile</Button>
                        <LogoutButton /></> : <LoginButton />
                    }
                </div>
            </Toolbar>
        )
    }

    
    return(
        <AppBar className={header}>{displayDesktop()}</AppBar>
    )
}