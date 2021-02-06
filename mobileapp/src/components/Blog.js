import React, {useState, useEffect} from "react";
import { firestore } from "../firebase";
import BlogsList from "./BlogsList";
import "../styles.css"


function Blog (){
    const[blogs, setBlogs] = useState([]);

    useEffect(() => {
        firestore
        .collection("Blogs")
        .get()
        .then(querySnapshot => {
            const _forums = querySnapshot.docs.map(doc => {
                let d = doc.data();
                return d;
            });
            console.log(_forums);
            setBlogs(_forums);
        });
    }, []);
    

return(
    <div>
        <> 
        <div class="centerContent">
            <h1 class="header-1">Blogs List</h1>
            <BlogsList blogs={blogs}/>
        </div>
        </>
    </div>
);
}



export default Blog;