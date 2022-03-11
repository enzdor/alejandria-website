import React from "react";
import BookCard from "./BookCard";


export default function BooksContainer(props){ 
    return(
        <div>
            {props.books.map((book) => (
                <BookCard key={book.id} data={book} />
            ))}
        </div>
    )
}