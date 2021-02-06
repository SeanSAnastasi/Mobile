import React, {useState, useEffect} from "react";
import { firestore } from "../firebase";
import ForumsList from "./ForumsList";
import "../styles.css"

//example showcasing how to get data from firestore
function Forums() {
    const[forums, setForums] = useState([]);

    useEffect(() => {
        firestore
        .collection("Forums")
        .get()
        .then(querySnapshot => {
            const _forums = querySnapshot.docs.map(doc => {
                let d = doc.data();

                console.log(d);
                return d;
            });
            console.log(_forums);
            setForums(_forums);
        });
    }, []);

    return (
        <> 
        <div class="centerContent">
            <h1 class="header-1">Forums List</h1>
            <ForumsList forums={forums}/>
        </div>
        </>
    );
}

export default Forums;