import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Header from "../Components/Header";

export default function AddBook(){
    const { user } = useAuth0()

    async function postBook(event){
        event.preventDefault()
        
        await fetch('http://localhost:3001/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: document.querySelector('#name').value, 
                author: document.querySelector('#author').value, 
                description: document.querySelector('#description').value, 
                image: document.querySelector('#image').value, 
                price: document.querySelector('#price').value, 
                genre: document.querySelector('#genre').value, 
                user_id: user.sub
                })
        })
    }

    return (
        <div>
            <Header />
            <h1>Create a book</h1>
            <form onSubmit={postBook}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name"/>
                <br />
                <br />
                <label htmlFor="author">Author:</label>
                <input type="text" name="author" id="author"/>
                <br />
                <br />
                <label htmlFor="description">Description:</label>
                <textarea name="description" id="description"/>
                <br />
                <br />
                <label htmlFor="image">Image:</label>
                <input type="file" name="image" id="image"/>
                <br />
                <br />
                <label htmlFor="price">Price:</label>
                <input type="text" name="price" id="price"/>
                <br />
                <br />
                <label htmlFor="genre">Genre:</label>
                <select name="genre" id="genre">
                    <option value="1">Action</option>
                </select>
                <br />
                <br />
                <input type="submit" name="Submit"/>
            </form>
        </div>
    )
}