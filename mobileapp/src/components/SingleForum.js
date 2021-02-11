import React, {useState, useEffect} from "react";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import firebase from "firebase";
import { firebaseConfig, firestore } from "../firebase.js";

export default function SingleForum(props){
    const id = props.match.params.id;
    const[forum, setForum] = useState([]);
    const [forumNumericalId, setForumNumericalId ] = useState(-1);
    const[iconFilled, setIconFilled] = useState(false);
    const[likes, setLikes] = useState([]);
    const user = JSON.parse(
        window.sessionStorage.getItem(
            `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
        )
    );

    useEffect(() => {
        
         firestore
        .collection("Forums")
        .get()
        .then(querySnapshot => {
            const _forums = querySnapshot.docs.map(doc => {
                let d = doc.data();
                
                return d;               
                
            });
            
            setForum(_forums);
            
        });
        
    
        
        
    }, []);
    useEffect(() => { 
    if(forum != null){
        console.log("IN EFFECT");
        for(var i = 0; i< forum.length; i++){
            if(forum[i].ForumId === id){
                setForumNumericalId(i);
                
            }
        }
    }
    }, [forum]);

    useEffect(() => { 
          
            firestore
            .collection("Likes")
            .get()
            .then(querySnapshot => {
                const _likes = querySnapshot.docs.map(doc => {
                    let d = doc.data();
                    
                    return d;               
                    
                });
                
                setLikes(_likes);
                
                
            });         
        

        
        

        
        
    }, []);

    useEffect(() => { 
    if(user && likes.length > 0){
        console.log(likes);
        for(var i = 0; i< likes.length; i++){
            if(likes[i].ForumId == id && likes[i].UserId == user.uid){
                    setIconFilled(true);
            }
        }
    } 
    }, [likes]);
    
    const favouriteClick = () => {
        if(user){

        
        if(!iconFilled){
            
            firestore.collection("Likes").add({
                ForumId: id,
                UserId: user.uid
            })
            setLikes(likes,{
                ForumId: id,
                UserId: user.uid
            });
            
        }else{
            
            firestore.collection("Likes").where("ForumId","==", id).where("UserId", "==", user.uid).get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();
            });
            
        }
       setIconFilled(!iconFilled);
        // setLikes(likes);
        console.log(iconFilled);
        
    }
    }
    
    if(forum[forumNumericalId]){

        
        return(
        <div>
            <div className="blog-header">
                <h1 className="forum-header">{forum[forumNumericalId].ForumName}</h1>
                <div className="icon-container" onClick={favouriteClick}>
                    {iconFilled ? <FavoriteOutlinedIcon/> : <FavoriteBorderOutlinedIcon/> }
                </div>
            </div>
            <div className="blog-text">{forum[forumNumericalId].Description}</div>
        </div>
        );
    }
    
    else {
        return(
            <h1>LOADING</h1>
        );
    }
}