import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";
import Container from "@mui/material/Container";



export default function BookDetailInformation(props){
    const navigate = useNavigate()
    const { isAuthenticated, user } = useAuth0()

    const [favourite, setFavourite] = useState(false)
	useEffect(() => {
		if (props.data.favourites){
			if (isAuthenticated){
				if (props.data.favourites.includes(user.sub)){
					setFavourite(true)
				}
			}
		}
    },[user, isAuthenticated, props])

    async function createDeleteFavourite(event){
		event.preventDefault()
		if (isAuthenticated){
            const bookDoc = doc(db,"books", props.data.id)
			if (favourite){
				const index = props.data.favourites.indexOf(user.sub)
				const array = props.data.favourites
				array.splice(index, 1)
				setFavourite(false)
				await updateDoc(bookDoc, {favourites: array})
			} else {
				const array = props.data.favourites
				array.push(user.sub)
				setFavourite(true)
				await updateDoc(bookDoc, {favourites: array})
			}
        } else {
            alert('You need to be logged in to use this')
        }
    }

	return (
		<Container sx={{display: "flex", alignItems:"center", justifyContent: "center"}}>		
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6} sx={{display: "flex", my: "2rem"}}>
					<Box component="img" width="90%" src={props.data.image} sx={{mx: "auto"}} alt="bookcover"/>
				</Grid>
				<Grid item xs={12} sm={6} sx={{mt: "2rem"}}>
					<Stack direction="row" spacing={5}>
						<Typography variant="h3" sx={{px: "0.5rem"}}>{props.data.name}</Typography>
						{isAuthenticated
							? favourite  
								? <IconButton onClick={createDeleteFavourite} size="large" color="secondary"><FavoriteIcon/></IconButton>
								: <IconButton onClick={createDeleteFavourite} size="large" color="secondary"><FavoriteBorderIcon/></IconButton>
							: <></>
						}
					</Stack>
					<Typography variant="h4" sx={{mt: "1rem",px: "0.5rem"}}>Author: {props.data.author}</Typography>
					<Typography variant="h4" color="primary" sx={{mt: "1rem",px: "0.5rem"}}>$ {props.data.price}</Typography>
					<Typography variant="h6" sx={{mt: "2rem",px: "0.5rem"}}>Description: {props.data.description}</Typography>
					<Typography variant="h6" sx={{mt: "1rem",px: "0.5rem"}}>Genre: {props.data.genre}</Typography>
					{props.data.sold == false
						? <Button variant="contained" sx={{mt: "2rem", mx:"0.5rem" }} onClick={() => navigate(`/buy/${props.data.id}`)}>Buy</Button>
						: <Button disabled sx={{mt: "2rem", mx:"0.5rem"}}>Sold</Button>
					}
				</Grid>
			</Grid>
		</Container>

    )
}
