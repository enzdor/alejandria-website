import React from "react";
import Header from "../Components/Header";
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import BooksContainer from "../Components/BooksContainer";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams, useNavigate } from "react-router-dom";
import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import SkeletonBooks from "../Components/SkeletonBooks";


export default function Profile(){
    const { user, isAuthenticated, isLoading } = useAuth0()
	const params = useParams()

	const booksCollectionRef = collection(db, "books")

    const [booksCreated, setBooksCreated] = useState(null)
    useEffect(() => { 

		async function getBooksCreatedGoogle(){
			const createdQuery = query(booksCollectionRef, where("user_sub", "==", user.sub), where("sold", "==", false))
			const newBooks = await getDocs(createdQuery)

			setBooksCreated(newBooks.docs.map((doc) => ({...doc.data(), id: doc.id})))
		}
	

		if(isAuthenticated){
			getBooksCreatedGoogle()
        }
    }, [isLoading])

    const [booksFavourite, setBooksFavourite] = useState(null)
    useEffect(() => {

		async function getBooksFavouriteGoogle(){
			const favouriteQuery = query(booksCollectionRef, where("favourites", "array-contains", user.sub))
			const newBooks = await getDocs(favouriteQuery)

			setBooksFavourite(newBooks.docs.map((doc) => ({...doc.data(), id: doc.id})))
		}

		if(isAuthenticated){
			getBooksFavouriteGoogle()
        }
    }, [isLoading])

    const [booksSold, setBooksSold] = useState(null)
    useEffect(() => {

		async function getBooksSoldGoogle(){
			const soldQuery = query(booksCollectionRef, where("sold", "==", true))
			const newBooks = await getDocs(soldQuery)

			setBooksSold(newBooks.docs.map((doc) => ({...doc.data(), id: doc.id})))
		}

		if(isAuthenticated){
			getBooksSoldGoogle()
        }
    }, [isLoading])


	const tabNameToIndex = {
		0: "sale",
		1: "favourite",
		2: "sold"
	}

	const tabIndexToName = {
		sale: 0,
		favourite: 1,
		sold: 2
	}

	const [selectedTab, setSelectedTab] = useState(tabIndexToName[params.page])
	let navigate = useNavigate()

	function handleChange(event, newValue){
		navigate(`/profile/${tabNameToIndex[newValue]}`)
		setSelectedTab(newValue)
	}
    

    if (isAuthenticated){
        return (
			<>
			<Header />
			<Grid container spacing={3}>
				<Grid item xs={12} md={4} lg={3}>
					<List sx={{
						position: {
							md: "fixed",
							lg: "fixed",
							xl: "fixed"
						}
						}}>
						<ListItem>
							<Typography variant="h4">Profile</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="h6">{ user.email }</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="h6">
								Books for sale: {booksCreated && booksCreated.length}
							</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="h6">
								Favourite books: {booksFavourite && booksFavourite.length}
							</Typography>
						</ListItem>
						<ListItem>
							<Typography variant="h6">
								Sold books: {booksSold && booksSold.length}
							</Typography>
						</ListItem>
						<ListItem>
							<Button component={ Link } variant="contained" color="primary" to="/addbook">Sell Book</Button>
						</ListItem>
						<ListItem>

						</ListItem>
					</List>
				</Grid>
				{selectedTab === 0 && 
					<Grid item xs={12} md={8} lg={9} sx={{my: "1em"}}>
						<Tabs value={selectedTab} color="secondary" onChange={handleChange} sx={{mb: "1rem"}}>
							<Tab label="For Sale"/>
							<Tab label="Favourites"/>
							<Tab label="Sold"/>
						</Tabs>
						{!booksCreated
							? <SkeletonBooks /> 
							: booksCreated.length === 0
								? <Typography variant="h5" color="primary" sx={{m: '1rem'}}>You have no books for sale</Typography>
								: <BooksContainer books={booksCreated} />
						}
					</Grid>
				}
				{selectedTab === 1 && 
					<Grid item xs={12} md={8} lg={9} sx={{my: "1em"}}>
						<Tabs value={selectedTab} color="secondary" onChange={handleChange} sx={{mb: "1rem"}}>
							<Tab label="For Sale"/>
							<Tab label="Favourites"/>
							<Tab label="Sold"/>
						</Tabs>
						{!booksFavourite
							? <SkeletonBooks /> 
							: booksFavourite.length === 0
								? <Typography variant="h5" color="primary" sx={{m: '1rem'}}>You have no favourite books</Typography>
								: <BooksContainer books={booksFavourite} />
						}
					</Grid>
				}
				{selectedTab === 2 &&
					<Grid item xs={12} md={8} lg={9} sx={{my: "1em"}}>
						<Tabs value={selectedTab} color="secondary" onChange={handleChange} sx={{mb: "1rem"}}>
							<Tab label="For Sale"/>
							<Tab label="Favourites"/>
							<Tab label="Sold"/>
						</Tabs>
						{!booksSold
							? <SkeletonBooks /> 
							: booksSold.length === 0
								? <Typography variant="h5" color="primary" sx={{m: '1rem'}}>You have no books sold</Typography>
								: <BooksContainer books={booksSold} />
						}					
					</Grid>
				}
            </Grid>
			</>
        )
    } else {
        return (
            <div>
                <Header />
                <h1>Loading</h1>
            </div>
        )
    }
}

