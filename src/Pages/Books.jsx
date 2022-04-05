import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BooksContainer from "../Components/BooksContainer";
import Header from "../Components/Header";
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";


const genresSelect = {
	widht: "200"
}

function Books(){

    const {isAuthenticated, user, isLoading} = useAuth0()
    const [processing, setProcessing] = useState()

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

    async function searchBooks(){

        let newBooks = await fetch(`http://localhost:3001/api/books/search?name=${document.querySelector('#name').value}&author=${document.querySelector('#author').value}&genre=${document.querySelector('#genre').value}&priceMin=${document.querySelector('#priceMin').value}&priceMax=${document.querySelector('#priceMax').value}`)
        newBooks = (await newBooks.json()).data

        setBooks(newBooks)
        setProcessing(false)
    }

    function handleSubmit(event){
        event.preventDefault()
        setProcessing(true)
    }

    useEffect(() => {
        if(processing === true) {
            searchBooks()
        }
    }, [processing])


    return(
        <>
            <Header />
            <h1>This is books</h1>
            <form onSubmit={handleSubmit}>
                <h2>Search for a book</h2>
                <TextField variant="outlined" label="Name" id="name"/>
				<TextField variant="outlined" label="Author" id="author"/>
				<InputLabel id="genre-label">Genre</InputLabel>
				<FormControl style={{minWidth:120}}>	
					<Select Label="Genre" id="genre" labelId="genre-label">
						<MenuItem value="" disabled>Choose</MenuItem>
						<MenuItem value="1">Action</MenuItem>
					</Select>
				</FormControl>
					<TextField type="number" name="priceMin" id="priceMin" label="Minimum Price" min={0}/>
                <TextField type="number" name="priceMax" id="priceMax" label="Max Price"/>
                <input type="submit" name="Submit" id="Submit" disabled={isLoading || processing} />
            </form>
            {isLoading 
            ? <p>Loading</p>
            : <BooksContainer books={books} />}
        </>
    )
}

export default Books
