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

export default function Profile(){
    const { user, isAuthenticated, isLoading } = useAuth0()
	const params = useParams()

    const [booksCreated, setBooksCreated] = useState([])
    useEffect(() => {
        async function getBooksCreatedSub(){
            let newBooks = await fetch(`http://localhost:3001/api/books/created/${user.sub}`)
            newBooks = (await newBooks.json()).data

            setBooksCreated(newBooks)
        }

        if(isAuthenticated){
            getBooksCreatedSub()
        }
    }, [isLoading])

    const [booksFavourite, setBooksFavourite] = useState([])
    useEffect(() => {
        async function getBooksFavouriteSub(){
            let newBooks = await fetch(`http://localhost:3001/api/books/favourite/${user.sub}`)
            newBooks = (await newBooks.json()).data

            setBooksFavourite(newBooks)
        }

        if(isAuthenticated){
            getBooksFavouriteSub()
        }
    }, [isLoading])


	const tabNameToIndex = {
		0: "sale",
		1: "favourite"
	}

	const tabIndexToName = {
		sale: 0,
		favourite: 1
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
							<Typography varian="h5">{ user.email }</Typography>
						</ListItem>
						<ListItem>
							<Button component={ Link } variant="contained" color="secondary" to="/addbook">Sell Book</Button>
						</ListItem>
						<ListItem>
							<Tabs value={selectedTab} onChange={handleChange}>
								<Tab label="For Sale"/>
								<Tab label="Favourites"/>
							</Tabs>
						</ListItem>
					</List>
				</Grid>
				{selectedTab === 0 && 
					<Grid item xs={12} md={8} lg={9} sx={{my: "1em"}}>
						<BooksContainer books={booksCreated} />
					</Grid>
				}
				{selectedTab === 1 && 
					<Grid item xs={12} md={8} lg={9} sx={{my: "1em"}}>
						<BooksContainer books={booksFavourite} />
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

