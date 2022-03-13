import React from "react";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from "react";
import { useEffect } from "react";

export default function CheckOutForm(props){
    const [succeed, setSucceed] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        async function getPaymentIntent(){
            let data = await fetch(`http://localhost:3001/create-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({item: props.item})
            })
            data = await data.json()

            setClientSecret(data.clientSecret)
        }

        getPaymentIntent()
    }, [])


    async function handleFormSubmit(event){
        event.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            
        })
    }

    return (
        <div>
            <form id="form" onSubmit={handleFormSubmit}>
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" name="fullName" id="fullName" />
                <br />
                <br />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" />
                <br />
                <br />
                <label htmlFor="adress">Adress</label>
                <input type="text" name="adress" id="adress" />
                <br />
                <br />
                <CardElement />
                <br />
                <br />
                <input type="submit" name="submit" id="submit" />
            </form>
        </div>
    )
}