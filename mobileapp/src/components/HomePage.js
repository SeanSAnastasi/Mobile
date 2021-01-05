import React from "react";
import {Link} from "react-router-dom";

import Button from "@material-ui/core/Button";

import "../styles.css";

function HomePage() {
    return (
        <>
        <div className="centerContent">
            <h1>Welcome to App!</h1>
                <p>This is a safe space to connect with users like you.</p>
                <p>Join a forum to get started.</p>

                <Button className="accessibleButton" variant="contained">
                    <Link to="about" style={{color: "white", textDecoration: "none"}}>About</Link>
                </Button>
        </div>
            
        </>
    )
}

export default HomePage;