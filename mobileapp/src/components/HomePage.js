import React from "react";
import {Link} from "react-router-dom";

import Button from "@material-ui/core/Button";

function HomePage() {
    return (
        <>
            <h1>Forum App</h1>
            <p>Forum app for mental health</p>

            <Button className="accessibleButton" variant="contained">
                <Link to="about" style={{color: "white", textDecoration: "none"}}>About</Link>
            </Button>
        </>
    )
}

export default HomePage;