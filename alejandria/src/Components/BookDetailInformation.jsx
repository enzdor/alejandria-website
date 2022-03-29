import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";

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
        <div>
            <p>{props.data.name}</p>
            {favourite  
                ? <button onClick={createDeleteFavourite}>Unfavourite</button>
                : <button onClick={createDeleteFavourite}>Favourite</button>
            }
            <button onClick={() => navigate(`/buy/${props.data.id}`)}>Buy</button>
        </div>
    )
}