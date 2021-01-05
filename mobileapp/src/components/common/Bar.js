import React, {useState} from "react";
import {NavLink} from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "../../styles.css";


function Bar(props) {

    const activeStyle = { color: "#F3C74F", fontWeight: "bold" };

    const [menu, setMenu] = useState({
        anchorEl: null
    });

    const openMenu = event => {
        const anchorEl = event.currentTarget;

        setMenu({
            anchorEl: anchorEl
        });
    };

    const closeMenu = () => {
        setMenu({
            anchorEl: null,
        })
    }

    const getNameInitials = () => {
        const user = props.user;

        const displayName = user.displayName;

        if(!displayName) return "?";

        const displayNameParts = displayName.split(" ");
        if(displayNameParts.length > 1 ) {
            return displayNameParts[0].charAt(0) + displayNameParts[1].charAt(0);
        }
            
        else {
            return displayNameParts[0].charAt(0);
        }
    };

    const onSignOutClick = () => {
        closeMenu();
        props.onSignOutClick();
    }

    return (
        <AppBar color="primary" position="static">
            <Toolbar variant="regular">
                <Box flexGrow={1}>
                    <Typography color="inherit" variant="h6">
                        Forum App
                    </Typography>

                </Box>
                <Box flexGrow={1}>
                <nav>
                    <NavLink activeStyle={activeStyle} className="navLinks" to="/" exact>Home</NavLink> | <NavLink activeStyle={activeStyle} className="activeStyle navLinks" to="/forums">Forums</NavLink> | {" "}
                    <NavLink activeStyle={activeStyle} className="activeStyle navLinks" to="/about">About</NavLink>
                 </nav>
                </Box>
                {props.isLoggedIn && (
                <>
                    <IconButton onClick={openMenu}>
                        <Avatar className="accessibleButton"
                            style={{color:"white", textDecoration:"none"}}
                            alt="Avatar">
                            {getNameInitials()}
                        </Avatar>
                    </IconButton>

                    <Menu anchorEl={menu.anchorEl} open={Boolean(menu.anchorEl)} onClose={closeMenu}>
                        <MenuItem disabled>{props.user.displayName}</MenuItem>
                        <MenuItem onClick={onSignOutClick}>Sign Out</MenuItem>
                    </Menu>
                </>
                )}
                {!props.isLoggedIn && 
                <Button className="accessibleButton" variant="contained" style={{color: "white", textDecoration:"none"}} onClick={props.onSignInClick}>
                    Sign in
                </Button>
                }
            </Toolbar>
        </AppBar>
    );
}

export default Bar;