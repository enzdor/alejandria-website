import React from "react";
import Header from "../Components/Header";
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"

function Profile(){
    const { user, isAuthenticated } = useAuth0()

    if (isAuthenticated){
        return (
            <div>
                <Header />
                <h1>This is your profile</h1>
                <p>{ user.nickname }</p>
                <Link to="/addbook">Add Book</Link>
            </div>
        )
    } else {
        return (
            <div>
                <Header />
                <h1>This is your profile</h1>
                <p>You have not logged in</p>
            </div>
        )
    }
}

export default Profile