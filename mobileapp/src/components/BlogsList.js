import React from "react";
import {useRouteMatch, Link} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListSubheader } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';

function BlogsList(props) {
    let url = useRouteMatch();
    
    return (
        <List>
        
    
    {props.blogs.map(blog => (
        <Link to={`${url["path"]}/${blog.id}`}>
        <ListItem divider>
            <ListItemText primary={blog.Title}></ListItemText>
            
            <Divider />
        </ListItem>
        </Link>
        ))}
    </List>
    );
}

export default BlogsList;