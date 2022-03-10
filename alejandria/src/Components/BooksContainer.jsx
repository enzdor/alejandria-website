import React from "react";

export default function BooksContainer(props){
    return(
        <div>
            {props.books.map((book) => (
                <div key={book.id}>{book.name}</div>
            ))}
        </div>
    )
}