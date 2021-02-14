import React, { useState, useEffect, useContext } from "react";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import firebase from "firebase";
import { firebaseConfig, firestore } from "../firebase.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";
import { AuthContext } from "../index.js";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";

const emails = ["username@gmail.com", "user02@gmail.com"];
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

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        Please Login to Continue
      </DialogTitle>
      <Button
        className="accessibleButton"
        variant="contained"
        style={{ color: "white", textDecoration: "none", fontSize: "11px" }}
        onClick={handleGoogleAuth}
      >
        Sign in
      </Button>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SingleForum(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const id = props.match.params.id;
  const [forum, setForum] = useState([]);
  const [comments, setComments] = useState([]);
  const [forumNumericalId, setForumNumericalId] = useState(-1);
  const [iconFilled, setIconFilled] = useState(false);
  const [likes, setLikes] = useState([]);
  const [placeholder, setPlaceholder] = useState("");
  const user = JSON.parse(
    window.sessionStorage.getItem(
      `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
    )
  );

  useEffect(() => {
    firestore
      .collection("Forums")
      .get()
      .then((querySnapshot) => {
        const _forums = querySnapshot.docs.map((doc) => {
          let d = doc.data();

          return d;
        });

        setForum(_forums);
      });
  }, []);
  useEffect(() => {
    if (forum != null) {
      for (var i = 0; i < forum.length; i++) {
        if (forum[i].ForumId === id) {
          setForumNumericalId(i);
        }
      }
    }
  }, [forum]);

  useEffect(() => {
    firestore
      .collection("Likes")
      .get()
      .then((querySnapshot) => {
        const _likes = querySnapshot.docs.map((doc) => {
          let d = doc.data();

          return d;
        });

        setLikes(_likes);
      });
  }, []);

  useEffect(() => {
    if (user && likes.length > 0) {
      for (var i = 0; i < likes.length; i++) {
        if (likes[i].ForumId == id && likes[i].UserId == user.uid) {
          setIconFilled(true);
        }
      }
    }
  }, [likes]);

  useEffect(() => {
    firestore
      .collection("Comments")
      .where("PostId", "==", id)
      .get()
      .then((querySnapshot) => {
        const _comments = querySnapshot.docs.map((doc) => {
          let d = doc.data();

          return d;
        });

        setComments(_comments);
      });
  }, []);

  const addComment = (event) => {
    event.preventDefault();
    if (placeholder != "" && user) {
      firestore.collection("Comments").add({
        Comment: placeholder,
        PostId: id,
        UserId: user.uid,
        Username: user.displayName,
      });
      setComments([
        ...comments,
        {
          Comment: placeholder,
          PostId: id,
          UserId: user.uid,
          Username: user.displayName,
        },
      ]);
    } else if (!user) {
      setOpen(true);
    }
    setPlaceholder("");
  };

  const handleChange = (event) => {
    setPlaceholder(event.target.value);
  };

  const favouriteClick = () => {
    if (user) {
      if (!iconFilled) {
        firestore.collection("Likes").add({
          ForumId: id,
          UserId: user.uid,
        });
        setLikes(likes, {
          ForumId: id,
          UserId: user.uid,
        });
      } else {
        firestore
          .collection("Likes")
          .where("ForumId", "==", id)
          .where("UserId", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs[0].ref.delete();
          });
      }
      setIconFilled(!iconFilled);
      // setLikes(likes);
    } else {
      setOpen(true);
    }
  };

  if (forum[forumNumericalId]) {
    return (
      <div>
        <div className="blog-header">
          <h1 className="forum-header">{forum[forumNumericalId].ForumName}</h1>
          <div className="icon-container" onClick={favouriteClick}>
            {iconFilled ? (
              <FavoriteOutlinedIcon />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </div>
        </div>
        <div className="blog-text">{forum[forumNumericalId].Description}</div>
        <div>
          <h3>Comments</h3>
          {comments.map((comment) => (
            <ListItem divider>
              <ListItemText
                primary={comment.Username}
                secondary={comment.Comment}
              ></ListItemText>

              <Divider />
            </ListItem>
          ))}
        </div>
        <form onSubmit={addComment}>
          <div className="comment chat-input-area">
            <input
              type="text"
              placeholder="Enter comment..."
              name="message"
              value={placeholder}
              onChange={handleChange}
            ></input>
            <button type="submit">></button>
          </div>
        </form>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </div>
    );
  } else {
    return <h1>LOADING</h1>;
  }
}
