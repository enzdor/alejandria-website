import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import BookBuyInformation from "../Components/BookBuyInformation";
import CheckOutForm from "../Components/CheckOutForm";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'


const publishableKey = `${process.env.PUBLISHABLE_KEY}`
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
        console.log(stripePromise);
    },[])

    return(
        <div>
            <Header />
            <Elements stripe={stripePromise}>
                <BookBuyInformation data={data}/>
                <CheckOutForm item={data}/>
            </Elements>
        </div>
    )
}