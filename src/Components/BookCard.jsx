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


const contentStyles = {
	pb: "0"
}


export default function BookCard(props){
    const navigate = useNavigate()
    const {isAuthenticated, user} = useAuth0()

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

    async function deleteBook(event){
        event.preventDefault()
        if(isAuthenticated){
            await fetch(`http://localhost:3001/api/books/${props.data.id}`, {
                method: 'DELETE'
            })
            console.log('book deleted');
        } else {
            alert('You need to be logged in to use this')
        }
    }

    return (
        <Card>
			<CardMedia component="img" height="300" image="http://localhost:3000/cover1.jpeg" alt="cover of the book"/>
			<CardContent sx={contentStyles}>
				<Link to={`/books/${props.data.id}`}>{props.data.name}</Link>
				<p>${props.data.price}</p>
			</CardContent>
			<CardActions>
				{favourite  
					? <IconButton onClick={createDeleteFavourite}><FavoriteIcon/></IconButton>
					: <IconButton onClick={createDeleteFavourite}><FavoriteBorderIcon/></IconButton>
				}
				{isAuthenticated
					? props.data.user_sub == user.sub
						? <IconButton onClick={deleteBook}><ClearIcon/></IconButton>
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
