import React from "react";
import {NavLink} from "react-router-dom";

const activeStyle = { color: "blue", fontWeight: "bold"};

function Header() {
    return(
        <nav style={{marginTop: "1em"}}>
            <NavLink activeStyle={activeStyle} to="/" exact>Home</NavLink> | <NavLink activeStyle={activeStyle} to="/forums">Forums</NavLink> | {" "}
            <NavLink activeStyle={activeStyle} to="/about">About</NavLink>
        </nav>
    );
}

export default Header;