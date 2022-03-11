import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useEffect } from "react";

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
        }
    }

    return (
        <div>
            <h3>Name: {props.data.name}</h3>
            {favourite  
                ? <button onClick={createDeleteFavourite}>Unfavourite</button>
                : <button onClick={createDeleteFavourite}>Favourite</button>}
        </div>
    )
}