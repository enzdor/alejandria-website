import { useAuth0 } from "@auth0/auth0-react";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input"
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { db } from "../firebase";
import {collection,  addDoc} from "firebase/firestore";


export default function AddBook(){
    const { user, isAuthenticated, isLoading } = useAuth0()
    const navigate = useNavigate()

	const [open, setOpen] = useState(false)

	function handleGenreOpen(){
		setOpen(true)
	}

	function handleGenreClose(){
		setOpen(false)
	}

	const initialValues = {name: "", author:"", description:"", image:"", price:"", genre:"Genre", favourites: []}
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [processing, setProcessing] = useState(false)
    const [succeed, setSucceed] = useState(false)

    function handleChange(event) {
        const { name, value } = event.target
        setFormValues({...formValues, [name]: value})
    }

    function handleSubmit(event) {
        event.preventDefault()
        setFormErrors(validate(formValues))
        setProcessing(true)
    }


    function validate(values) {
		const errors = {}
		
        if(values.name.trim().length === 0){
			errors.name = 'Your book needs to have a name'
        }
        if(values.author.trim().length === 0){
			errors.author ='Your book needs to have a author'
        }
        if(values.description.trim().length === 0){
			errors.description = 'Your book needs to have a description'
        }
        if(values.price.trim().length === 0){
			errors.price = 'Your book needs to have a price'
        }
        if(values.genre === "Genre"){
			errors.genre = 'Your book needs to have a genre'
        }

        return errors
	}


	const booksCollectionRef = collection(db, "books")

	async function postBookFirestore(){
		await addDoc(booksCollectionRef, {
			name: formValues.name.trim(), 
			author: formValues.author.trim(), 
			description: formValues.description.trim(), 
			image: formValues.image.trim(), 
			price: formValues.price.trim(),
			genre: formValues.genre.trim(), 
			favourites: [],
			user_sub: user.sub,
			sold: false
		})	 
		setSucceed(true)
        setProcessing(false)
        navigate('/profile')
	}


    useEffect(() => {
        if(Object.keys(formErrors).length == 0 && processing == true){
			postBookFirestore()
		} else if(formErrors.length !=  0){
			setProcessing(false)
		}
    }, [formErrors])

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
				<Stack spacing={2} sx={{width: {
						xs: "90%",
						sm: "60%",
						md: "50%",
						lg: "40%",
						xl: "40%"
				}, mx:"auto", justifyContent: "center", my: "2em"}}>
					<Typography variant="h5">Sell Book</Typography>
					<TextField error={formErrors.name} helperText={formErrors.name ? formErrors.name : ""} id="name" name="name" variat="outlined" label="Name" onChange={handleChange}/>
					<TextField error={formErrors.author} helperText={formErrors.author ? formErrors.author : ""} id="author" name="author" variant="outlined" label="Author" onChange={handleChange}/>
					<TextField error={formErrors.description} helperText={formErrors.description ? formErrors.description : ""} id="description" name="description" variant="outlined" multiline rows={6} label="Description" onChange={handleChange}/>
					<label htmlFor="image">	
						<Input type="file" id="image" name="image" multiple accept="image/*" onChange={handleChange} sx={{display: "none"}}/>
						<Button variant="contained" component="span">
							Upload
						</Button>
					</label>
					<TextField error={formErrors.price} helperText={formErrors.price ? formErrors.price : ""} type="number" id="price" name="price" onChange={handleChange} label="Price"/>
					<FormControl style={{minWidth:"12em"}}>	
						<Select error={formErrors.genre} helperText={formErrors.genre ? formErrors.genre : ""}  id="genre" name="genre" onChange={handleChange} onOpen={handleGenreOpen} onClose={handleGenreClose} open={open} value={formValues.genre}>
							<MenuItem value="Genre" disabled placeHolder>Genre</MenuItem>
							<MenuItem value="Action">Action</MenuItem>
						</Select>
					</FormControl>
					<Button type="submit" variant="contained" sx={{width: "50%", alignSelf: "center"}} disabled={isLoading || !isAuthenticated || processing || succeed}>
					   Submit
					</Button>
				</Stack>
            </form>
        </div>
    )
}
