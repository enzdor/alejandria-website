import React, { useState } from "react";
import { Link } from 'react-router-dom';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const logo = {
    fontSize: "2em",
    textDecoration: "none",
    color: "primary",
    '&visited': {
        color: "primary" 
}}
const toolbar = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white"
}
const menuButton = {
    ml: "2em",
}

export default function Header(){
    const { isAuthenticated, isLoading } = useAuth0()
    const [open, setOpen] = useState(false);

    function displayDesktop(){
        return (
            <Toolbar sx={toolbar}>
		<Button component={Link} to="/" variant="text" color="secondary" sx={{...logo}}>Alejandria</Button>
		<Hidden smDown>
                <div>
                    <Button component={ Link } to="/books" variant="text" color="secondary" sx={menuButton}>Books</Button>
                    {isLoading 
                        ? <p>Loading</p> 
                        : isAuthenticated ? <>
			    <Button component={ Link } to="/profile" variant="text" color="secondary" sx={menuButton}>Profile</Button>
			    <LogoutButton sx={{...menuButton,}} variant="contained"/>
			</> 
			: <LoginButton sx={{...menuButton,}} variant="contained"/>
                    }
                </div>
		</Hidden>
		<Hidden smUp>
		    <IconButton onClick={()=>setOpen(true)}>
			<MenuIcon />
		    </IconButton>
		</Hidden>
		<SwipeableDrawer open={open} anchor="right" onOpen={()=>setOpen(true)} onClose={()=>setOpen(false)}>
		    <div>
		        <IconButton onClick={()=>setOpen(false)}>
			    <ChevronRightIcon />
		        </IconButton>
		    </div>
		    <Divider />
		    <List>
			<ListItem>
		            <Button component={ Link } to="/books" variant="text">Books</Button>
			</ListItem>
		        {isLoading 
                            ? <p>Loading</p> 
                            : isAuthenticated ? <>
			       <ListItem><Button component={ Link } to="/profile" variant="text" color="primary">Profile</Button></ListItem>
			        <ListItem><LogoutButton variant="text"/></ListItem>
		       	    </> 
			    : <ListItem><LoginButton variant="text"/></ListItem>
                        }
		    </List>
	        </SwipeableDrawer>
            </Toolbar>
	   
        )
    }

    
    return(
        <AppBar sx={{backgroundColor: "white"}} position="sticky">{displayDesktop()}</AppBar>
    )
}
