import React from "react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListSubheader } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';

function ForumsList(props) {
    return (
        <List>
        <ListSubheader>Forum Name</ListSubheader>
    
    {props.forums.map(forum => (
        <ListItem divider>
            <ListItemText primary={forum.ForumName} secondary={forum.Description}></ListItemText>
            <ListItemText primary={forum.Threads}></ListItemText>
            <Divider />
        </ListItem>
       
        ))}
    </List>
    );
}

export default ForumsList;