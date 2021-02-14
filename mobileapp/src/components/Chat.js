import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import "../styles.css";

function Chat() {
  const history = useHistory();

  return (
    <div className="chat-buttons centerContent">
      <Button
        className="chat-button"
        variant="contained"
        color="primary"
        onClick={() => {
          history.push("/chat/therapist/1");
        }}
      >
        Chat with a therapist
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          history.push("/chat/random/1");
        }}
      >
        Chat with a random person
      </Button>
    </div>
  );
}

export default Chat;
