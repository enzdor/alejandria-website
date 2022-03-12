import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BookDetailInformation from "../Components/BookDetailInformation";
import Header from "../Components/Header";

export default function BookDetail(){
    const params = useParams()
    const { user, isLoading, isAuthenticated } = useAuth0()

    const [data, setData] = useState({})
    useEffect(() => {
        async function getBook(){
            let book = await fetch(`http://localhost:3001/api/books/${params.id}`)
            book = (await book.json()).data

            setData(book)
        }
        async function getBookUserSub(){
            let book = await fetch(`http://localhost:3001/api/books/logged/${user.sub}/${params.id}`)
            book = (await book.json()).data

            setData(book)
        }


        if(isAuthenticated){
            getBookUserSub()
        } else {
            getBook()
        }
    }, [user, isLoading, isAuthenticated])

    return (
        <div>
            <Header />
            <BookDetailInformation data={data}/>
        </div>
        
    )
}