import React from "react";
import { Link } from 'react-router-dom';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";


function Header(){
    const {isAuthenticated} = useAuth0()

    if (isAuthenticated){
        return(
            <div>
                <Link to="/">Alejandria</Link>
                <ul>
                    <Link to="/books">Books</Link>
                    <LogoutButton />
                    <Link to="/profile">Profile</Link>
                </ul>
            </div>
        )
    } else {
        return(
            <div>
                <Link to="/">Alejandria</Link>
                <ul>
                    <Link to="/books">Books</Link>
                    <LoginButton />
                </ul>
            </div>
        )
    }
}

export default Header