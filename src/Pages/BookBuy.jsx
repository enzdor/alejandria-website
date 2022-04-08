import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BookBuyInformation from "../Components/BookBuyInformation";
import CheckOutForm from "../Components/CheckOutForm";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Header from "../Components/Header";

const publishableKey = `${process.env.REACT_APP_PUBLISHABLE_KEY}`
const stripePromise = loadStripe(publishableKey)

export default function BookBuy(){
    const params = useParams()

    const [data, setData] = useState({})
    useEffect(() => {
        async function getData(){
            let newData = await fetch(`http://localhost:3001/api/books/${params.id}`)
            newData = (await newData.json()).data

            setData(newData)
        }
        getData()
    },[])

    return(
        <Elements stripe={stripePromise}>
			<Header />
            <CheckOutForm item={data}/>
        </Elements>
    )
}
