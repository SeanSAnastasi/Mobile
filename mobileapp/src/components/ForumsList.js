import React, { useState, useEffect, useContext } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ListSubheader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import { firestore } from "../firebase.js";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import { AuthContext } from "../index.js";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const Auth = useContext(AuthContext);
  var temp;
  const [placeholder_title, setPlaceholderTitle] = useState("");
  const [placeholder_description, setPlaceholderDesc] = useState("");
  const history = useHistory();

  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleGoogleAuth = () => {
    if (!Auth.isLoggedIn) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          firebase
            .auth()
            .signInWithPopup(provider)
            .then(async (result) => {
              temp = await firestore
                .collection("users")
                .doc(result.user.email)
                .get();
              if (!temp.exists) {
                console.log("Not Exists");
                await firestore
                  .collection("users")
                  .doc(result.user.email)
                  .set({
                    email: result.user.email,
                    displayName: result.user.displayName,
                  })
                  .then(() => {
                    //props.history.push("/users")
                    toast.success("Successfully added new account");
                  });
              } else {
                console.log("Exists", temp.data());
              }
              console.log("RESULT", result);
              Auth.setLoggedIn(true);
              handleClose();
            })
            .catch((e) => console.error(e));
        });
    } else {
      firebase
        .auth()
        .signOut()
        .then(function () {
          Auth.setLoggedIn(false);
        });
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (placeholder_title != "") {
      firestore.collection("Forums").add({
        Description: placeholder_description,
        ForumId: placeholder_title.replace(/ /g, ''),
        ForumName: placeholder_title,
        Threads: 0
      });
      
    }
    setPlaceholderTitle("");
    setPlaceholderDesc("");
    handleClose();
  };

  const handleTitleChange = (event) => {
    setPlaceholderTitle(event.target.value);
  };
  const handleDescChange = (event) => {
    setPlaceholderDesc(event.target.value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      className="formSubmit"
    >
      <input
          type="text"
          placeholder="Title"
          name="message"
          value={placeholder_title}
          onChange={handleTitleChange}
      ></input>
      <textarea
          type="text"
          placeholder="Description"
          name="message"
          value={placeholder_description}
          onChange={handleDescChange}
          className="submitDescription"
      ></textarea>
      <Button
        className="accessibleButton"
        variant="contained"
        style={{ color: "white", textDecoration: "none", fontSize: "11px" }}
        onClick={submitForm}
        
      >
        Add Forum
      </Button>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function ForumsList(props) {

  const [open, setOpen] = React.useState(false);
  

  const handleClose = () => {
    setOpen(false);
    
  };

  let url = useRouteMatch();
  return (
    <div class="forum-list">
      <List>
        <ListSubheader>
          Forum Name <Button
          className="accessibleButton addForum"
          variant="contained"
          style={{ color: "white", textDecoration: "none", fontSize: "11px" }}
          onClick={() => {setOpen(true)}}
          >
            Add Forum
          </Button>
        </ListSubheader>
        <SimpleDialog
            
            open={open}
            onClose={handleClose}
          />
        {props.forums.map((forum) => (
          <Link to={`${url["path"]}/${forum.ForumId}`}>
            <ListItem divider>
              <ListItemText
                primary={forum.ForumName}
                secondary={forum.Description}
              ></ListItemText>
              <Divider />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
}

export default ForumsList;
