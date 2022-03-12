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

    async function searchBooks(event){
        event.preventDefault()

        let newBooks = await fetch(`http://localhost:3001/api/books/search/${document.querySelector('#name').value}`)
        newBooks = (await newBooks.json()).data
        console.log('searched');

        console.log(newBooks);

        setBooks(newBooks)
    }


    return(
        <>
            <Header />
            <h1>This is books</h1>
            <form onSubmit={searchBooks}>
                <h2>Search for a book</h2>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name"/>
                <input type="submit" name="Submit" id="Submit" />
            </form>
            {isLoading 
            ? <p>Loading</p>
            : <BooksContainer books={books} />}
        </>
    )
}

export default Books