import React from "react";

export default function BookBuyInformation(props){
    return (
        <div>
            <p>{props.data.name}</p>
            <p>{props.data.price}</p>
        </div>
    )
}