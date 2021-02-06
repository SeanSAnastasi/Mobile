import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Profile from "./Profile.js";
import { firebaseConfig, firestore } from "../firebase";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import "../styles.css"

const ManageProfile = props => {
    const [errors, setErrors] = useState({});
 
    const [userDetails, setUserDetails] = useState({
        username: ""
    });

    const [email, setEmail] = useState()

    const user = JSON.parse(
        window.sessionStorage.getItem(
            `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
        )
    );

    useEffect(() => {
        // if(email === undefined) {
        //     if(user instanceof Object) {
                
        //         getUser();
        //     }
        // }
        if(user === undefined) {
            getUser();
        }

        if(user instanceof Object) {
            console.log("User", user);
            setEmail(user.email)

            if(email !== Object) {
                console.log("Email", email)
            }
        }
    }, [user])


    async function getUser() {
        console.log("USER", user)
        var temp = await firestore.collection("users").doc(user.email).get()
        console.log("Here")
        
        setUserDetails({
            username: temp.data().displayName
        })
        
        console.log("TEMP", temp.data())
        await setEmail(temp.data().email)
        console.log("EMAIL", email)
    }
  

    function formIsValid() {
        const _errors = {};

        console.log("Outputting display name: " + userDetails.username)
        if(!userDetails.username) _errors.username = "Username is required"
        setErrors(_errors);

        return Object.keys(_errors).length === 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        console.log("Outputting props: " , props)

        if(!formIsValid()) return;

        console.log("Form valid")

        let _user = { ...userDetails };

        console.log("HelLOOOOO", user)
        console.log("EMAIL in handleSubmit", email)
        console.log("_User in handleSubmit", _user)

        await firestore.collection("users").doc(email).set({
            displayName: _user.username
        }).then(() => {
            toast.success("Successfully changed username")
        }).catch((e) => console.error(e)) 

        await firebase.auth().currentUser.updateProfile({
            displayName: _user.username
        }).then(() => {
            toast.success("Successfully changed username")
        }).catch((e) => console.error(e)) 
    }


    function handleChange({ target }) {
        const updatedUserDetails = {
            ...userDetails,
            [target.name] : target.value
        };
        setUserDetails(updatedUserDetails);
    }

    return (
        <>
        <div class="centerContent">
            <h1 class="header-1">Change Username</h1>
            <Profile
                user={userDetails}
                onChange={handleChange}
                onSubmit={handleSubmit}
                errors={errors}
            >
            </Profile>
        </div>
        
        </>
    );
};

export default ManageProfile;