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
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SignupButton from "./SignupButton";
import CloseIcon from '@mui/icons-material/Close';



const listItem = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	px: "0"
}
const logo = {
    fontSize: "2em",
    textDecoration: "none",
}
const toolbar = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white"
}
const menuLink = {
	textDecoration: "none",
}

export default function Header(){
    const { isAuthenticated, isLoading } = useAuth0()
    const [open, setOpen] = useState(false);

    function displayDesktop(){
        return (
		<Toolbar sx={toolbar}>
			<Typography component={Link} to="/" variant="h5" color="primary" sx={{...logo}}>Alejandría</Typography>
			<Hidden smDown>
					<Stack direction="row" spacing={5}>
						<Typography component={ Link } to="/books" variant="h6" color="black" sx={menuLink}>Books</Typography>
						{isLoading 
							? <p>Loading</p> 
							: isAuthenticated ? <>
								<Typography component={ Link } to="/profile" variant="h6" color="black" sx={menuLink}>Profile</Typography>
								<LogoutButton sx={{...menuLink,}} variant="contained"/>
							</> 
							: <>
								<LoginButton type="link" sx={{...menuLink,}} variant="text"/>
								<SignupButton sx={{...menuLink,}} variant="contained"/>
							</>
						}
					</Stack>
			</Hidden>
			<Hidden smUp>
				<IconButton onClick={()=>setOpen(true)}>
				<MenuIcon />
				</IconButton>
			</Hidden>
			<SwipeableDrawer open={open} anchor="top" onOpen={()=>setOpen(true)} onClose={()=>setOpen(false)}>
				<div style={{display: 'flex', justifyContent: 'flex-end'}}>
					<IconButton onClick={()=>setOpen(false)}>
						<CloseIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem sx={listItem}>
							<Button component={ Link } to="/books" variant="text"  sx={menuLink}>Books</Button>
					</ListItem>
					{isLoading 
						? <p>Loading</p> 
						: isAuthenticated ? 
						<>
							<ListItem sx={listItem}><Button component={ Link } to="/profile" variant="text" color="primary">Profile</Button></ListItem>
							<ListItem sx={listItem}><LogoutButton variant="text"/></ListItem>
						</> 
						: <>
							<ListItem sx={listItem}>
								<LoginButton type="button" sx={{...menuLink,}} variant="text"/>
							</ListItem>
							<ListItem sx={listItem}><SignupButton variant="text" /></ListItem>
						</>
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
