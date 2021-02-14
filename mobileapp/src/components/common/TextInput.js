import React from "react";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

function TextInput(props) {
  const useStyles = makeStyles({
    textField: {
      marginLeft: "1em",
      marginRight: "1em",
      width: 200,
    },
  });

  const classes = useStyles();

  return (
    <>
      <TextField
        id={props.id}
        className={classes.textField}
        label={props.label}
        margin="normal"
        variant="outlined"
        value={props.value}
        name={props.name}
        onChange={props.onChange}
      />
      {props.error && <div className="errorMsg">{props.error}</div>}
    </>
  );
}

export default TextInput;
