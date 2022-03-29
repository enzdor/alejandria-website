import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';

export default function BookCard(props){
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
        <div>
            <Link to={`/books/${props.data.id}`}>Name: {props.data.name}</Link>
            {favourite  
                ? <button onClick={createDeleteFavourite}>Unfavourite</button>
                : <button onClick={createDeleteFavourite}>Favourite</button>
            }
            {props.data.user_sub == user.sub
                ? <button onClick={deleteBook}>Delete</button>
                : <></>
            }
            <p>Price: ${props.data.price}</p>
        </div>
    )
}