import React from "react";
import { useNavigate } from "react-router-dom"
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from "react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../Components/Header";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input"
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

export default function CheckOutForm(props){
    const [succeed, setSucceed] = useState(false)
    const [error, setError] = useState(null)
    const initialValues = {fullName: "", email:"", adress:""}
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const { user } = useAuth0()


    useEffect(() => {
        async function getPaymentIntent(){
            if (!props.data.price){
                return
            }
            let data = await fetch(`http://localhost:3001/create-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    item: props.data,
                    user: user
                })
            })
            data = await data.json()


            setClientSecret(data.clientSecret)
        }
        getPaymentIntent()
    }, [props.data.price, user])

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
        if(values.fullName.trim().length === 0){
            errors.fullName ='You need to write your name'
        }
        if(values.email.trim().length === 0){
            errors.email = 'You need to write your email'
        }
        if(values.adress.trim().length === 0){
            errors.adress = 'You need to write your adress'
        }
        return errors
    }

    async function makePayment(){

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })

        if(payload.error || formErrors.length != 0){
            setError(`Payment Failed ${payload.error.message}`);
            setProcessing(false)
            console.log('bye');
        } else {
			const bookDoc = doc(db, "books", props.data.id) 
			await updateDoc(bookDoc, {
				sold: true
			})
    
            setSucceed(true)
            setError(null)
            setProcessing(false)
            navigate('/profile')
        }
    }

    function handleFormSubmit(event){
        event.preventDefault()
        setFormErrors(validate(formValues))
        setProcessing(true)
    }

    useEffect(() => {
        if (!error && formErrors.length === 0 && processing === true){
            makePayment()
            return
		} else if (formErrors.length != 0 || error){
			setProcessing(false)
		}
    }, [formErrors])

    return (
        <div>
            <form id="form" onSubmit={handleFormSubmit} >
				<Stack spacing={2} sx={{width: {
						xs: "90%",
						sm: "60%",
						md: "50%",
						lg: "40%",
						xl: "40%"
				}, mx:"auto", justifyContent: "center", my: "2em"}}>
					<Typography variant="h5">Book Information:</Typography>
					<Typography variant="body">Name: {props.data.name}</Typography>
					<Typography variant="body">Price: ${props.data.price}</Typography>
					<Typography variant="h5">Personal Information:</Typography>
					<TextField error={formErrors.fullName} helperText={formErrors.fullName ? formErrors.fullName : ""} type="text" name="fullName" id="fullName" label="Full Name" onChange={handleChangeForm}/>
					<TextField error={formErrors.email} helperText={formErrors.email ? formErrors.email : ""} type="email" name="email" id="email" label="Email" onChange={handleChangeForm}/>
					<TextField error={formErrors.adress} helperText={formErrors.adress ? formErrors.adress : ""} type="text" name="adress" id="adress" label="Adress" onChange={handleChangeForm}/>
					<Typography variant="h5">Card Information:</Typography>
					<CardElement onChange={handleChange}/>
					<Button type="submit" variant="contained" sx={{width: "50%", alignSelf: "center"}} disabled={processing || disabled || succeed}>
						{
							processing ? (
								<span>Processing</span>
							) : (
								<span>Pay Now</span>
							)
						}
					</Button>
					{error && (
						<div>{error}</div>
					)}
				</Stack>
            </form>
        </div>
    )
}
