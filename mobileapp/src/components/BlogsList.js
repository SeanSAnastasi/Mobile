import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ListSubheader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import "../styles.css";
import { FormatUnderlined } from "@material-ui/icons";

function BlogsList(props) {
  let url = useRouteMatch();

  const mystyle = {
    color: "black",
    padding: "10px",
    textAlign: "center",
  };

  return (
    <List>
      {props.blogs.map((blog) => (
        <Link to={`${url["path"]}/${blog.id}`}>
          <ListItem divider>
            <ListItemText style={mystyle} primary={blog.Title}></ListItemText>

            <Divider />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}

export default BlogsList;
