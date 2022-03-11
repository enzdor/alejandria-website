import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BooksContainer from "../Components/BooksContainer";
import Header from "../Components/Header";

function Books(){

    const {isAuthenticated, user, isLoading} = useAuth0()

    const [books, setBooks] = useState([])
    useEffect(() => {
        async function getBooks(){
            let newBooks = await fetch('http://localhost:3001/api/books')
            newBooks = (await newBooks.json()).data
    
            setBooks(newBooks)
        }
        async function getBooksUserSub(){
            let newBooks = await fetch(`http://localhost:3001/api/books/logged/${user.sub}`)
            newBooks = (await newBooks.json()).data

            setBooks(newBooks)
        }

        if (isAuthenticated){
            getBooksUserSub()
        } else {
            getBooks()
        }
    },[isAuthenticated, isLoading])


    return(
        <>
            <Header />
            <h1>This is books</h1>
            {isLoading 
            ? <p>Loading</p>
            : <BooksContainer books={books} />}
        </>
    )
}

export default Books