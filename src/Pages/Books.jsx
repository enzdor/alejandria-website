import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BooksContainer from "../Components/BooksContainer";
import Header from "../Components/Header";
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography"
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";
import { collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase";
import SkeletonBooks from "../Components/SkeletonBooks";
import {useSpring, animated} from "react-spring";
import Stack from "@mui/material/Stack"

const listItem = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	px: "0"
}



export default function Books(){
    const {isAuthenticated, user, isLoading} = useAuth0()
    const [processing, setProcessing] = useState()
	const [genre, setGenre] = useState("Genre")
	const [priceMax, setPriceMax] = useState(1000000000000)
	const [open, setOpen] = useState(false)
	const [originalBooks, setOriginalBooks] = useState([])
	const [showSearch, setShowSearch] = useState(false)

	function handleMaxPriceChange(){
		if (Number(document.querySelector("#priceMax").value) === 0){
			setPriceMax(1000000000000)
		} else {
			setPriceMax(Number(document.querySelector("#priceMax").value))
		}
	}

	function handleGenreOpen(){
		setOpen(true)
	}

	function handleGenreClose(){
		setOpen(false)
	}
	
	function handleGenreChange(event){
		setGenre(event.target.value)
	}

    const [books, setBooks] = useState(null)
    useEffect(() => {
		async function getBooksGoogle(){
			const booksCollectionRef = collection(db, "books")
			const booksQuery = query(booksCollectionRef,where("sold", "==", false))
			let newBooks = await getDocs(booksQuery)

			setBooks(newBooks.docs.map((doc) => ({...doc.data(),id: doc.id})))
			setOriginalBooks(newBooks.docs.map((doc) => ({...doc.data(),id: doc.id})))
		}

		getBooksGoogle()
    },[isAuthenticated, isLoading])

    async function searchBooks(){
		let newBooks = []
		let genreObject = {genreQuery: genre}

		if (genre === "Genre"){
			genreObject.genreQuery = ""
		}

		for (let book of originalBooks){
			if (book.name.toLowerCase().includes(document.querySelector("#name").value.toLowerCase()) 
				&& book.author.toLowerCase().includes(document.querySelector("#author").value.toLowerCase())
				&& book.genre.includes(genreObject.genreQuery)
				&& Number(book.price) >= Number(document.querySelector("#priceMin").value)
				&& Number(book.price) <= priceMax){
				newBooks.push(book)
			}
		}

        setBooks(newBooks)
        setProcessing(false)
    }

    function handleSubmit(event){
        event.preventDefault()
        setProcessing(true)
    }

    useEffect(() => {
        if(processing === true) {
            searchBooks()
        }
	}, [processing])


	const listSearch = useSpring({
		display: showSearch ? 'block' : 'none'
	})



    return(
        <>
            <Header />
			<Hidden smDown>
				<Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
					<Box sx={{width: "40%"}}component="img" src="https://cdn.dribbble.com/users/2460712/screenshots/8140285/media/86ee2d6154dadfe955ff5ce16a2f2f71.png"/>
					<Typography variant="h4" sx={{my: "1rem"}}>
						Discover books that you will love
					</Typography>
					<Divider orientation="horizontal" sx={{my: "1rem"}} flexItem />
				</Container>
			</Hidden>
			<Grid container spacing={3}>
			<Hidden smUp>
				<Grid item className="search" xs={12} sm={4} md={3} sx={{ display: 'flex', flexDirection:"column", alignItems: "center"}}>
					<Box sx={{position: {sm: "sticky", md: "sticky", lg: "sticky", xl: "sticky"}, top: "10vh"}}> 
						<Stack direction="horizontal" sx={{mt: '2.5rem'}}>
							<Typography variant="h4" sx={{mr: '1rem'}}>{books ? books.length : 0} books found</Typography>
							<Button variant="contained" size="large" onClick={() => {setShowSearch(!showSearch)}}>Filter</Button>
						</Stack>
						<List sx={{p: 0}}>
							<animated.form onSubmit={handleSubmit} style={listSearch}>
								<ListItem sx={{...listItem, mt: '1rem'}}>
									<TextField variant="outlined" label="Name" id="name"/>
								</ListItem>
								<ListItem sx={listItem}>
									<TextField variant="outlined" label="Author" id="author"/>
								</ListItem>
								<ListItem sx={listItem}>
									<FormControl style={{width:"12rem"}}>	
										<Select Label="Genre" id="genre" onChange={handleGenreChange} onOpen={handleGenreOpen} onClose={handleGenreClose} open={open} value={genre}>
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
								</ListItem>
								<ListItem sx={listItem}>
									<TextField type="number" name="priceMin" id="priceMin" label="Minimum Price" min={0}/>
								</ListItem>
								<ListItem sx={listItem}>
									<TextField type="number" name="priceMax" id="priceMax" label="Max Price" onChange={handleMaxPriceChange}/>
								</ListItem>
								<ListItem sx={listItem}>
									<Button type="submit" id="Submit" variant="contained" color="primary" disabled={isLoading || processing}>Submit</Button>
								</ListItem>
							</animated.form>
						</List>
					</Box>
				</Grid>
			</Hidden>
			<Hidden smDown>
				<Grid item className="search" xs={12} sm={4} md={3} sx={{ display: 'flex', flexDirection:"column", alignItems: "center"}}>
					<Box sx={{position: {sm: "sticky", md: "sticky", lg: "sticky", xl: "sticky"}, top: "10vh"}}> 
						<List>
							<form onSubmit={handleSubmit} style={listSearch}>
								<ListItem sx={listItem} >
									<Typography variant="h4">Search</Typography>
								</ListItem>
								<ListItem sx={listItem}>
									<TextField variant="outlined" label="Name" id="name"/>
								</ListItem>
								<ListItem sx={listItem}>
									<TextField variant="outlined" label="Author" id="author"/>
								</ListItem>
								<ListItem sx={listItem}>
									<FormControl style={{minWidth:"12rem"}}>	
										<Select Label="Genre" id="genre" onChange={handleGenreChange} onOpen={handleGenreOpen} onClose={handleGenreClose} open={open} value={genre}>
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
								</ListItem>
								<ListItem sx={listItem}>
									<TextField type="number" name="priceMin" id="priceMin" label="Minimum Price" min={0}/>
								</ListItem>
								<ListItem sx={listItem}>
									<TextField type="number" name="priceMax" id="priceMax" label="Max Price" onChange={handleMaxPriceChange}/>
								</ListItem>
								<ListItem sx={listItem}>
									<Button type="submit" id="Submit" variant="contained" color="primary" disabled={isLoading || processing}>Submit</Button>
								</ListItem>
							</form>
						</List>
					</Box>
				</Grid>
			</Hidden>
				<Grid item xs={12} sm={8} md={9} sx={{my: "1em", ml: "auto"}}>
				{!books
					? <SkeletonBooks />
					: books.length === 0
						? <Typography variant="h5" color="primary">Your queries do not match any books</Typography>
						: <BooksContainer books={books}/>
				}
				</Grid>
			</Grid>
        </>
    )
}

