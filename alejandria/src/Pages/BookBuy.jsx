import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import BookBuyInformation from "../Components/BookBuyInformation";
import CheckOutForm from "../Components/CheckOutForm";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'


const publishableKey = `pk_test_51KcpwhEP3GAKC61yHzYBfR6K5tREGP4EhG4d0cpkOnXLO2TVqHj9fOOREFEwrn5bQqZzgrF6axxLMRYVewjzFUOW00tF76JWPP`
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
        <Elements stripe={stripePromise}>
            <BookBuyInformation data={data}/>
            <CheckOutForm item={data}/>
        </Elements>
    )
}