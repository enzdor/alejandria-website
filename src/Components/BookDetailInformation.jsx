import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function BookDetailInformation(props){
    const navigate = useNavigate()
    const { isAuthenticated, user } = useAuth0()

    const [favourite, setFavourite] = useState(false)
    useEffect(() => {
        if (props.data.isFavourite){
            setFavourite(true)
        }
    },[])

    async function createDeleteFavourite(event){
        event.preventDefault()
        if (isAuthenticated){
            await fetch('http://localhost:3001/api/favourites/create-delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_sub: user.sub, 
                    book_id: props.data.id
                })
            })
            if (favourite == true) {
                setFavourite(false)
            } else {
                setFavourite(true)
            }
        } else {
            alert('You need to be logged in to use this')
        }
    }

    return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={6} md={4}sx={{display: "flex", my: "2rem"}}>
				<Box component="img" width="90%" src="http://localhost:3000/cover1.jpeg" sx={{mx: "auto"}} alt="bookcover"/>
			</Grid>
			<Grid item xs={12} sm={6} md={8} sx={{mt: "2rem"}}>
				<Stack direction="row" spacing={5}>
					<Typography variant="h3" sx={{px: "0.5rem"}}>{props.data.name}</Typography>
					{favourite  
						? <IconButton onClick={createDeleteFavourite} size="large"><FavoriteIcon/></IconButton>
						: <IconButton onClick={createDeleteFavourite} size="large"><FavoriteBorderIcon/></IconButton>
					}
				</Stack>
				<Typography variant="h4" sx={{mt: "2rem",px: "0.5rem"}}>{props.data.author}</Typography>
				<Typography variant="h6" sx={{mt: "2rem",px: "0.5rem"}}>{props.data.description}</Typography>
				{props.data.available == 'true'
					? <Button variant="contained" sx={{mt: "2rem", mx:"0.5rem" }} onClick={() => navigate(`/buy/${props.data.id}`)}>Buy</Button>
					: <Button disabled sx={{mt: "2rem", mx:"0.5rem"}}>Sold</Button>
				}
			</Grid>
        </Grid>
    )
}
