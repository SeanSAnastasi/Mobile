import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import  { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Book from "@material-ui/icons/Book"
import ForumIcon from '@material-ui/icons/Forum';
import ChatIcon from '@material-ui/icons/Chat';
import {BottomNavigation} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      width: "100vw",
    },
  });

function BottomNav (props){
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');
    var redirects = ["Blog", "Forums", "Chat"];
    const history = useHistory();
    

return(
    <BottomNavigation
    value={value}
    onChange={(event, newValue) => {
        setValue(newValue);
        history.push(`/${redirects[newValue]}`);
    }}
    showLabels
    className={classes.root}
    >
        <BottomNavigationAction label={redirects[0]} icon={<Book />} />
        <BottomNavigationAction label={redirects[1]} icon={<ForumIcon />} />
        <BottomNavigationAction label={redirects[2]} icon={<ChatIcon />} />
    </BottomNavigation>
);
}



export default BottomNav;