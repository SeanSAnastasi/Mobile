import React, {useContext} from "react";
import HomePage from "./HomePage.js";
import AboutPage from "./AboutPage.js";
import Forums from "./Forums.js";
import Blog from "./Blog.js";
import Chat from "./Chat.js";
import NotFoundPage from "./NotFoundPage.js";
import Bar from "./common/Bar.js";
import BottomNav from "./BottomNav.js"
import {Route, Switch} from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import firebase from "firebase";
import {AuthContext} from "../index.js";
import { firebaseConfig } from "../firebase.js";

function App() {

    const Auth = useContext(AuthContext);

    const user = JSON.parse(
        window.sessionStorage.getItem(
            `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
        )
    );

    const handleGoogleAuth = () => {
        if(!Auth.isLoggedIn) {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase.auth().signInWithPopup(provider).then(result => {
                    console.log(result);
                    Auth.setLoggedIn(true);
                }).catch((e) => console.error(e));
            });
        }
        else {
            firebase.auth().signOut().then(function() {
                Auth.setLoggedIn(false);
            })
        }
    };

    return(
        <>
            <CssBaseline />
            <Bar onSignInClick={handleGoogleAuth} onSignOutClick={handleGoogleAuth} isLoggedIn={Auth.isLoggedIn} user={user}/>
            <Container maxWidth="xl">
                <Switch>
                <Route path="/" component={HomePage} exact></Route>
                <Route path="/forums" component={Forums}></Route>
                <Route path="/blog" component={Blog}></Route>
                <Route path="/chat" component={Chat}></Route>
                <Route path="/about" component={AboutPage}></Route>
                <Route component={NotFoundPage}></Route> 
                {/* the not found page is the default statement of the switch*/}
                </Switch>
            </Container>
            <BottomNav />
        </>
    );
}

export default App;