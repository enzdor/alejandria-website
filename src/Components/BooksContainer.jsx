import React from "react";
import BookCard from "./BookCard";
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid";

const gridStyles = {
	px: "3%"
}

export default function BooksContainer(props){ 
    return(
        <Grid container spacing={6} sx={gridStyles} >
            {props.books.map((book) => (
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<BookCard key={book.id} data={book} />
				</Grid>
            ))}
        </Grid>
    )
}
