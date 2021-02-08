
import React, { useState, useEffect} from 'react';
import { firestore } from "../firebase";
import BlogsList from "./BlogsList";

// export default class SingleBlog extends Component {
//     render(){
//         var id = this.props.match.params.id;
//         SingleBlogRender(id);
//         return;
//     }

// }

export default function SingleBlog(props){
    const id = props.match.params.id -1;
    const[blog, setBlog] = useState([]);
    
    useEffect( () => {
         firestore
        .collection("Blogs")
        .get()
        .then(querySnapshot => {
            const _blogs = querySnapshot.docs.map(doc => {
                let d = doc.data();
                console.log("d");
                console.log(d);
                return d;               
                
            });
            
            setBlog(_blogs);
            console.log("blogs");
            console.log(_blogs);
        });
        
    }, []);

    if(blog[id]){

        console.log(blog);
        return(
        <div>
            <div className="blog-header">{blog[id].Title}</div>
            <div className="blog-text">{blog[id].Content}</div>
        </div>
        );
    }
    
    else {
        return(
            <h1>LOADING</h1>
        );
    }

    
}


