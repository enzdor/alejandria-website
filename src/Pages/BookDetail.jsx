import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BookDetailInformation from "../Components/BookDetailInformation";
import Header from "../Components/Header";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";

export default function BookDetail(){
    const params = useParams()
    const { user, isLoading, isAuthenticated } = useAuth0()

    const [data, setData] = useState({})
    useEffect(() => {
		async function getBookGoogle(){
			const bookDoc = doc(db, "books", params.id)

			const book = await getDoc(bookDoc)
			setData({...book.data(), id: book.id})
		}
		getBookGoogle()
    }, [user, isLoading, isAuthenticated])

    return (
        <div>
			<Header />
			<BookDetailInformation data={data}/>
        </div>
        
    )
}
