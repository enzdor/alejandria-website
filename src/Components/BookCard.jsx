import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia"; 
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography"
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

const contentStyles = {
	pb: "0"
}
const title = {
	textDecoration: "none",
}

export default function BookCard(props){
    const navigate = useNavigate()
	const {isAuthenticated, user} = useAuth0()

	const [favourite, setFavourite] = useState(false)
	useEffect(() => {
		if (user){
			if (props.data){
				if (props.data.favourites.includes(user.sub)){
					setFavourite(true)
				}
			} 
		}
	}, [user, props])
        
	async function createDeleteFavouriteGoogle(event){
		event.preventDefault()
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
	}

	async function deleteBookGoogle(event){
		event.preventDefault()

		const bookDoc = doc(db, "books", props.data.id)
		await deleteDoc(bookDoc)
	}
    
    return (
		<Card>
			<CardMedia component="img" height="300" image="http://localhost:3000/cover1.jpeg" alt="cover of the book"/>
			<CardContent sx={contentStyles}>
				<Typography to={`/books/${props.data.id}`} component={Link} variant="h6" color="black" sx={title}>{props.data.name}</Typography>
				<Typography variant="h6" color="primary">${props.data.price}</Typography>
			</CardContent>
			<CardActions>
				{props.data
					? favourite 
						? <IconButton onClick={createDeleteFavouriteGoogle}><FavoriteIcon color="secondary"/></IconButton>
						: <IconButton onClick={createDeleteFavouriteGoogle}><FavoriteBorderIcon color="secondary"/></IconButton>
					: <></>
				}
				{isAuthenticated
					? props.data.user_sub == user.sub
						? <IconButton onClick={deleteBookGoogle}><ClearIcon/></IconButton>
						: <></>
					: <></>
				}
				{isAuthenticated
					? props.data.user_sub == user.sub
						? <IconButton onClick={() => navigate(`/books/edit/${props.data.id}`)}><EditIcon/></IconButton>
						: <></>
					: <></>
				}
			</CardActions>
        </Card>
    )
}
