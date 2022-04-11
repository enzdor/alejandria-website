import { useAuth0 } from "@auth0/auth0-react";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {db} from "../firebase";
import {updateDoc, doc} from "firebase/firestore";


export default function EditBookForm(props){
    const { user, isAuthenticated, isLoading } = useAuth0()
    const navigate = useNavigate()
    const [data, setData] = useState({})

	const [open, setOpen] = useState(false)

	function handleGenreOpen(){
		setOpen(true)
	}
	function handleGenreClose(){
		setOpen(false)
	}


    let initialValues = {name: "", author:"", description:"", image:"", price:"", genre:"Genre"}
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [processing, setProcessing] = useState(false)
    const [succeed, setSucceed] = useState(false)

    useEffect(() => {
		if (props.data){
			setData(props.data)
			setFormValues(props.data)
		}
		}, [props])

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
	
	async function putBookGoogle(){
		const bookDoc = doc(db, "books", "EMcnVap2RfN4HtVAEXqo")	
		await updateDoc(bookDoc, {
			name: formValues.name.trim(), 
			author: formValues.author.trim(), 
			description: formValues.description.trim(), 
			image: formValues.image.trim(), 
			price: formValues.price.trim(), 
			genre: formValues.genre.trim(), 
			user_sub: user.sub
		})
        setSucceed(true)
        setProcessing(false)
        navigate('/profile')
	}

    async function putBook(){
        await fetch(`http://localhost:3001/api/books/${data.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: data.id,
                name: document.querySelector('#name').value, 
                author: document.querySelector('#author').value, 
                description: document.querySelector('#description').value, 
                image: document.querySelector('#image').value, 
                price: document.querySelector('#price').value, 
                genre: document.querySelector('#genre').value, 
                user_sub: user.sub
                })
        })
        setSucceed(true)
        setProcessing(false)
        navigate('/profile')
    }

	useEffect(() => {
		if(Object.keys(formErrors).length == 0 && processing == true){
			putBookGoogle()
            putBook()
		} else if (Object.keys(formErrors).length != 0){
            setProcessing(false)
        }
    }, [formErrors])

    return (
        <form onSubmit={handleSubmit}>
			<Stack spacing={2} sx={{width:{
				xs: "90%",
				sm: "60%",
				md: "50%",
				lg: "40%",
				xl: "40%"
			}, mx:"auto", justifyContent:"center", my: "2em"}}>
				<Typography variant="h5">Edit Book</Typography>
				<TextField error={formErrors.name} helperText={formErrors.name ? formErrors.name : ""} label="Name" variant="outlined" name="name" id="name" value={formValues.name} onChange={handleChange} />
				<TextField error={formErrors.author} helperText={formErrors.author ? formErrors.author : ""} label="Author" variant="outlined" type="text" name="author" id="author" value={formValues.author} onChange={handleChange}/>
				<TextField error={formErrors.description} helperText={formErrors.description ? formErrors.description : ""} label="Description" variant="outlined" multiline rows={6} name="description" id="description" value={formValues.description} onChange={handleChange}/>
				<label htmlFor="image">
					<Input type="file" multiple  accept="image/*" sx={{display: "none"}} name="image" id="image" onChange={handleChange}/>
					<Button variant="contained" component="span"> 
						Upload
					</Button>
				</label>
				<TextField error={formErrors.price} helperText={formErrors.price ? formErrors.price : ""} label="price" type="number" name="price" id="price" value={formValues.price} onChange={handleChange} />
				<FormControl style={{minWidth:"12em"}}>
					<Select error={formErrors.genre} helperText={formErrors.genre ? formErrors.genre : ""} name="genre" id="genre" label="Genre" onClose={handleGenreClose} onOpen={handleGenreOpen} open={open} value={formValues.genre} onChange={handleChange}>
						<MenuItem value="Genre" disabled placeholder>Genre</MenuItem>
						<MenuItem value="1">Action</MenuItem>
					</Select>
				</FormControl>
				<Button type="submit" name="Submit" variant="contained" sx={{widht:"50%", alignSelf: "center"}}disabled={processing || succeed || isLoading || !isAuthenticated}>
					Submit
				</Button>
			</Stack>
        </form>
    )
}
