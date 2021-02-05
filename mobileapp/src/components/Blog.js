import React, {useState, useEffect} from "react";
import { firestore } from "../firebase";
import BlogsList from "./BlogsList";


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
        <h1>Blogs List</h1>
        <BlogsList blogs={blogs}/>
        </>
    </div>
);
}



export default Blog;