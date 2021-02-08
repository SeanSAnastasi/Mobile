import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import Drawer from "./Drawer";
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
import Profile from "../ManageProfile";
import { firestore } from "../../firebase";


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
        // var temp =  firestore.collection("users").doc(props.user.email).get()
        // console.log("Props user account", props.userAccount)
        // console.log("Props user", props.user)
        // console.log("TEMP", temp)

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
                <Drawer />
                <Box flexGrow={1}>
                    <Typography className="app-title" color="inherit" variant="h6">
                        <a href="/" class="forum-bar-title">
                            Forum App
                        </a>
                    </Typography>

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
                        <MenuItem ><a href="/profile">Manage Profile</a></MenuItem>
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