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
            if (!props.item.price){
                return
            }
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
    }, [props.item.price])

    async function handleChange(event){
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
    }


    async function handleFormSubmit(event){
        event.preventDefault()
        setProcessing(true)

        console.log(clientSecret);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })

        if(payload.error){
            console.log(payload.error);
            setError(`Payment Failed ${payload.error.message}`);
            setProcessing(false)
        } else {
            setError(null)
            setProcessing(false)
            setSucceed(true)
        }
    }

    return (
        <div>
            <form id="form" onSubmit={handleFormSubmit} >
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
                <CardElement onChange={handleChange}/>
                <br />
                <br />
                <button disabled={processing || disabled || succeed}>
                    {
                        processing ? (
                            <span>Processing</span>
                        ) : (
                            <span>Pay Now</span>
                        )
                    }
                </button>
                {error && (
                    <div>{error}</div>
                )}
            </form>
        </div>
    )
}