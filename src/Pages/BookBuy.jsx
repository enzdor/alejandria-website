import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BookBuyInformation from "../Components/BookBuyInformation";
import CheckOutForm from "../Components/CheckOutForm";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Header from "../Components/Header";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";

const publishableKey = `${process.env.REACT_APP_PUBLISHABLE_KEY}`
const stripePromise = loadStripe(publishableKey)

export default function BookBuy(){
    const params = useParams()

    const [data, setData] = useState({})
    useEffect(() => {
        async function getBookGoogle(){
			const bookDoc = doc(db, "books", params.id)

			const book = await getDoc(bookDoc)
			setData({...book.data(), id: book.id})
		}
		getBookGoogle()
    },[])

    return(
        <Elements stripe={stripePromise}>
			<Header />
            <CheckOutForm data={data}/>
        </Elements>
    )
}
