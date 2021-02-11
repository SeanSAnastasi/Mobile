import React, {useState, useEffect} from "react";
import Icon from '@material-ui/core/Icon';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { firestore } from "../firebase";

export default function SingleForum(props){
    const id = props.match.params.id;
    const[forum, setForum] = useState([]);
    var forumNumericalId = -1;
    const[iconFilled, setIconFilled] = useState(false);
    useEffect( () => {
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
    if(forum != null){
        for(var i = 0; i< forum.length; i++){
            if(forum[i].ForumId == id){
                forumNumericalId = i;
                
            }
        }
    }
    
    const favouriteClick = () => {
        setIconFilled(!iconFilled);

        console.log(props);
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