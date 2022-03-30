import React from "react";
import { useNavigate } from "react-router-dom"
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function CheckOutForm(props){
    const [succeed, setSucceed] = useState(false)
    const [error, setError] = useState(null)
    const initialValues = {fullName: "", email:"", adress:""}
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState([])
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const { user } = useAuth0()


    useEffect(() => {
        async function getPaymentIntent(){
            if (!props.item.price){
                return
            }
            console.log(user);
            let data = await fetch(`http://localhost:3001/create-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    item: props.item,
                    user: user
                })
            })
            data = await data.json()


            setClientSecret(data.clientSecret)
        }
        getPaymentIntent()
    }, [props.item.price, user])

    async function handleChange(event){
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
    }

    function handleChangeForm(event) {
        const { name, value } = event.target
        setFormValues({...formValues, [name]: value})
    }

    function validate(values) {
        const errors = []
        if(!values.fullName){
            errors.push('You need to write your name')
        }
        if(!values.email){
            errors.push('You need to write your email')
        }
        if(!values.adress){
            errors.push('You need to write your adress')
        }
        return errors
    }

    async function makePayment(){
        console.log(clientSecret);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })

        if(payload.error || formErrors.length != 0){
            setError(`Payment Failed ${payload.error.message}`);
            setProcessing(false)
        } else {
            setError(null)
            setProcessing(false)
            setSucceed(true)
            navigate('/profile')
        }
    }

    function handleFormSubmit(event){
        event.preventDefault()
        setProcessing(true)
        setFormErrors(validate(formValues))
    }

    useEffect(() => {
        if (!error && formErrors.length === 0 && processing === true){
            makePayment()
        }
        setProcessing(false)
    }, [formErrors])

    return (
        <div>
            <form id="form" onSubmit={handleFormSubmit} >
                <p>{JSON.stringify(formValues, undefined, 2)}</p>
                <div>
                    {formErrors.length == 0
                        ? <></>
                        : formErrors.map((error, index)=> (
                            <p key={index}>{error}</p>
                        ))
                    }
                </div>
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" name="fullName" id="fullName" onChange={handleChangeForm}/>
                <br />
                <br />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" onChange={handleChangeForm}/>
                <br />
                <br />
                <label htmlFor="adress">Adress</label>
                <input type="text" name="adress" id="adress" onChange={handleChangeForm}/>
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