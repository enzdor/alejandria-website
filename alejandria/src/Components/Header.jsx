import React from "react";
import { Link } from 'react-router-dom';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";


function Header(){
    return(
        <div>
            <Link to="/">Alejandria</Link>
            <ul>
                <Link to="/books">Books</Link>
                <LoginButton />
                <LogoutButton />
                <Link to="/profile">Profile</Link>
            </ul>
        </div>
    )
}

export default Header