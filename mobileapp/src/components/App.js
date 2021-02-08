import React, {useContext, useState} from "react";
import HomePage from "./HomePage.js";
import Forums from "./Forums.js";
import Blog from "./Blog.js";
import SingleBlog from "./SingleBlog.js";
import SingleChat from "./SingleChat.js";
import Chat from "./Chat.js";
import NotFoundPage from "./NotFoundPage.js";
import Bar from "./common/Bar.js";
import BottomNav from "./BottomNav.js"
import { Route, Switch, Redirect } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import firebase from "firebase";
import {AuthContext} from "../index.js";
import { firebaseConfig, firestore } from "../firebase.js";
import ManageProfile from "./ManageProfile.js";
import { toast } from "react-toastify";
import Font, { Text } from 'react-font'


function App() {

    var temp

    const Auth = useContext(AuthContext);

    const user = JSON.parse(
        window.sessionStorage.getItem(
            `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
        )
    );

    const [userAccount, setUserAccount] = useState()

    const handleGoogleAuth = () => {
        if(!Auth.isLoggedIn) {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase.auth().signInWithPopup(provider).then(async (result) => {
                    temp = await firestore.collection("users").doc(result.user.email).get()
                    if(!(temp.exists)) {
                        console.log("Not Exists")
                        await firestore.collection("users").doc(result.user.email).set({
                            email: result.user.email,
                            displayName: result.user.displayName
                        }).then(() => {
                            //props.history.push("/users")
                            toast.success("Successfully added new account")
                        })
                    } else {
                        console.log("Exists", temp.data())
                    }
                    console.log("RESULT", result);
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
            <Bar onSignInClick={handleGoogleAuth} onSignOutClick={handleGoogleAuth} isLoggedIn={Auth.isLoggedIn} user={user} userAccount={temp}/>
            <Container maxWidth="xl">
                <Switch>
                <Route path="/" component={HomePage} exact></Route>
                <Route path="/forums" component={Forums}></Route>
                <Route path="/blog/:id" component={SingleBlog}></Route>
                <Route path="/blog" component={Blog}></Route>
                <Route path="/chat/therapist/:token" component={SingleChat}></Route>
                <Route path="/chat/random/:token" component={SingleChat}></Route>
                <Route path="/chat" component={Chat}></Route>
                <Route path="/profile" component={ManageProfile}></Route>
                <Route component={NotFoundPage}></Route> 
                
                {/* <PrivateRoute 
                    path="/profile"
                    component={ManageProfile}
                    isLoggedIn={Auth.isLoggedIn}
                /> */}
                {/* the not found page is the default statement of the switch*/}
                </Switch>
            </Container>
            <BottomNav />
        </>
    );
}

function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          rest.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }

export default App;