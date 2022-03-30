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

        let newBooks = await fetch(`http://localhost:3001/api/books/search?name=${document.querySelector('#name').value}&author=${document.querySelector('#author').value}&genre=${document.querySelector('#genre').value}&priceMin=${document.querySelector('#priceMin').value}&priceMax=${document.querySelector('#priceMax').value}`)
        newBooks = (await newBooks.json()).data

        setBooks(newBooks)

        console.log(newBooks);
    }


    return(
        <>
            <Header />
            <h1>This is books</h1>
            <form onSubmit={searchBooks}>
                <h2>Search for a book</h2>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name"/>
                <label htmlFor="author">Author:</label>
                <input type="text" name="author" id="author"/>
                <label htmlFor="genre">Genre:</label>
                <select name="genre" id="genre">
                    <option value="">Choose</option>
                    <option value="1">Action</option>
                </select>
                <label htmlFor="prices">Price:</label>
                <input type="number" name="priceMin" id="priceMin" placeholder="Minimum" min={0}/>
                <input type="number" name="priceMax" id="priceMax" placeholder="Max"/>
                <input type="submit" name="Submit" id="Submit" />
            </form>
            {isLoading 
            ? <p>Loading</p>
            : <BooksContainer books={books} />}
        </>
    )
}

export default Books