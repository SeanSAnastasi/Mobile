import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Autorenew } from "@material-ui/icons";

function Profile(props) {
  var user = firebase.auth().currentUser;

  console.log(props);

  return (
    <>
      <Card class="card-center">
        <CardContent>
          <form onSubmit={props.onSubmit}>
            <TextField
              id="standard-helperText"
              label="Username"
              name="username"
              defaultValue={props.user.username}
              onChange={props.onChange}
              error={props.errors.username}
              // helperText={props.user.username}
            />
            {/* <TextInput
                        id="username"
                        label="Username"
                        value={props.user.username}
                        name="Username"
                        onChange={props.onChange}
                        error={props.errors.displayName}
                    ></TextInput> */}

            <CardActions
              style={{ justifyContent: "center", marginTop: "20px" }}
            >
              <Button
                className="accessibleButton"
                variant="contained"
                type="submit"
                style={{ textAlign: "center", color: "white" }}
              >
                Save Username
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default Profile;
