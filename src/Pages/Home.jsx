import React, {useState, useEffect} from "react";
import Header from '../Components/Header'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { Link } from "react-router-dom" 
import Hidden from "@mui/material/Hidden";
import { db } from "../firebase";
import {collection, getDocs, addDoc} from "firebase/firestore";

const image = {
	width: "100%"
}

function Home(){
	const [books, setBooks] = useState([])
	const booksCollectionRef = collection(db, "books")
	const [name, setName] = useState("")
	const [author, setAuthor] = useState("")

	function handleChange(event){
		if (event.target.id === "name"){
			setName(event.target.value)
			console.log(name)
		} else if (event.target.id === "author"){
			setAuthor(event.target.value)
			console.log(author)
		}
	}

	async function handleSubmit(event){
		await addDoc(booksCollectionRef, {name: name, author: author})	
	}

	useEffect(() => {
		async function getUsers(){
			const data = await getDocs(booksCollectionRef);
			console.log(data.docs[0].id)
			console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
		}

		getUsers()
	}, [])

    return(
        <>
			<Header />
			<input  id="name" onChange={handleChange}/>
			<input id="author" onChange={handleChange}/> 
			<button type="submit" onClick={handleSubmit}>Submit</button>
			<Grid container sx={{minHeight: "90vh"}}>
				<Grid item xs={12} sm={5} sx={{p:"2rem", pl:{sm: "4rem"}, display: "flex", flexDirection: "column", justifyContent: "center" }}>
					<Typography variant="h3" sx={{pb: "1rem"}}>The best place to buy and sell books</Typography>
					<Hidden only="sm">
						<Typography variant="h6" sx={{pb: "1rem"}}>The only place you will need to find all the books you want at fair prices. Discover our books here:</Typography>
					</Hidden>
					<Button component={Link} to="/books" variant="contained" sx={{alignSelf: "flex-start"}}>Discover</Button>
				</Grid>
				<Hidden smDown>
					<Grid item xs={12} sm={7} sx={{display: "flex", alignItems: "center"}}>
						<Box component="img" sx={image} src="https://cdn.dribbble.com/users/2460712/screenshots/8087558/media/88a936e6bf27940076d1ac94c0b23888.png" />
					</Grid>
				</Hidden>
			</Grid>
		</>
    )
}

export default Home
