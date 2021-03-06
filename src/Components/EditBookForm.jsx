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
import {db, storage} from "../firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
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
	const [originalImage, setOriginalImage] = useState('')

    useEffect(() => {
		if (props.data){
			setData(props.data)
			setFormValues(props.data)
			setOriginalImage(props.data.image)
		}
		}, [props])

    function handleChange(event) {
		if (event.target.name == "image"){
			setFormValues({...formValues, image:event.target.files[0]})
		} else {
			const { name, value } = event.target
			setFormValues({...formValues, [name]: value})
		}
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
		const time = Date.now().toString()
		const bookDoc = doc(db, "books", props.data.id)	
		if (formValues.image !== originalImage){
			const storageRef = ref(storage, time)
			await uploadBytes(storageRef, formValues.image)
			const imageUrl = await getDownloadURL(storageRef)
			await updateDoc(bookDoc, {
				name: formValues.name.trim(), 
				author: formValues.author.trim(), 
				description: formValues.description.trim(), 
				price: formValues.price.trim(), 
				genre: formValues.genre.trim(), 
				image: imageUrl
			})
		} else {
			await updateDoc(bookDoc, {
				name: formValues.name.trim(), 
				author: formValues.author.trim(), 
				description: formValues.description.trim(), 
				price: formValues.price.trim(), 
				genre: formValues.genre.trim(), 
			})
		}
		
        setSucceed(true)
        setProcessing(false)
		navigate('/profile')
	}
    

	useEffect(() => {
		if(Object.keys(formErrors).length == 0 && processing == true){
			putBookGoogle()
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
					<Select error={formErrors.genre} helperText={formErrors.genre ? formErrors.genre : ""} name="genre" id="genre" onClose={handleGenreClose} onOpen={handleGenreOpen} open={open} value={formValues.genre} onChange={handleChange}>
						<MenuItem value="Genre" disabled placeholder>Genre</MenuItem>
						<MenuItem value="Action">Action</MenuItem>
						<MenuItem value="Action">Action</MenuItem>
						<MenuItem value="Comedy">Comedy</MenuItem>
						<MenuItem value="Crime">Crime</MenuItem>
						<MenuItem value="Fantasy">Fantasy</MenuItem>
						<MenuItem value="Horror">Horror</MenuItem>
						<MenuItem value="Science Fiction">Science Fiction</MenuItem>
						<MenuItem value="Romance">Romance</MenuItem>
						<MenuItem value="Academic">Academic</MenuItem>
						<MenuItem value="Biography">Biography</MenuItem>
						<MenuItem value="Self-help">Self-help</MenuItem>
					</Select>
				</FormControl>
				<Button type="submit" name="Submit" variant="contained" sx={{widht:"50%", alignSelf: "center"}}disabled={processing || succeed || isLoading || !isAuthenticated}>
					Submit
				</Button>
			</Stack>
        </form>
    )
}
