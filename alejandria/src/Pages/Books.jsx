import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BooksContainer from "../Components/BooksContainer";
import Header from "../Components/Header";

function Books(){

    const [books, setBooks] = useState([])
    useEffect(() => {
        async function getBooks(){
            let newBooks = await fetch('http://localhost:3001/api/books')
            newBooks = (await newBooks.json()).data
    
            setBooks(newBooks)
        }

        getBooks()
    }, [])


    return(
        <>
            <Header />
            <h1>This is books</h1>
            <BooksContainer books={books} />
        </>
    )
}

export default Books