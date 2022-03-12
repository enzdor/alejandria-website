import React from "react";
import Header from "../Components/Header";
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import BooksContainer from "../Components/BooksContainer";
import { useState } from "react";
import { useEffect } from "react";

function Profile(){
    const { user, isAuthenticated, isLoading } = useAuth0()

    const [booksCreated, setBooksCreated] = useState([])
    useEffect(() => {
        async function getBooksCreatedSub(){
            let newBooks = await fetch(`http://localhost:3001/api/books/created/${user.sub}`)
            newBooks = (await newBooks.json()).data

            setBooksCreated(newBooks)
        }

        if(isAuthenticated){
            getBooksCreatedSub()
        }
    }, [isLoading])

    const [booksFavourite, setBooksFavourite] = useState([])
    useEffect(() => {
        async function getBooksFavouriteSub(){
            let newBooks = await fetch(`http://localhost:3001/api/books/favourite/${user.sub}`)
            newBooks = (await newBooks.json()).data

            setBooksFavourite(newBooks)
        }

        if(isAuthenticated){
            getBooksFavouriteSub()
        }
    }, [isLoading])

    const [createdFavourite, setCreatedFavourite] = useState(false)
    useEffect(() => {

    },[])

    function changeCreatedFavourite(){
        if (createdFavourite === false) {
            setCreatedFavourite(true)
        } else {
            setCreatedFavourite(false)
        }
    }

    if (isAuthenticated){
        return (
            <div>
                <Header />
                <h1>This is your profile</h1>
                <p>{ user.nickname }</p>
                <p>{ user.sub }</p>
                <Link to="/addbook">Add Book</Link>
                <h2 onClick={changeCreatedFavourite}>Your books for sale</h2>
                <h2 onClick={changeCreatedFavourite}>Your favourite books</h2>
                {createdFavourite
                    ? <BooksContainer books={booksCreated} />
                    : <BooksContainer books={booksFavourite} />
                }
            </div>
        )
    } else {
        return (
            <div>
                <Header />
                <h1>Loading</h1>
            </div>
        )
    }
}

export default Profile