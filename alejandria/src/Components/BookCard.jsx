import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useEffect } from "react";

export default function BookCard(props){
    const { user } = useAuth0()

    async function createDeleteFavourite(event){
        event.preventDefault()
        await fetch('http://localhost:3001/api/favourites/create-delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_sub: user.sub, 
                book_id: props.data.id
            })
        })
    }

    const [favourite, setFavourite] = useState(false)
    useEffect(() => {

    },[])

    return (
        <div>
            <h3>Name: {props.data.name}</h3>
            <button onClick={createDeleteFavourite}>Unfavourite</button>
        </div>
    )
}