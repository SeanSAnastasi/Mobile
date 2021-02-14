import { NaturePeople } from "@material-ui/icons";
import React, { useState, useEffect, createRef } from "react";

function SingleChat(props) {
  const chatArea = createRef();
  const [messages, setMessages] = useState([]);
  const [placeholder, setPlaceholder] = useState("");

  const addMessage = (event) => {
    event.preventDefault();
    if (placeholder != "") {
      setMessages([
        ...messages,
        {
          value: placeholder,
          sent: true,
        },
        {
          value: "Lorem Ipsum is simply dummy text",
          sent: false,
        },
      ]);
      setPlaceholder("");
    }
  };
  useEffect(() => {
    scrollToMyRef();
  }, [messages]);
  const handleChange = (event) => {
    setPlaceholder(event.target.value);
  };

  const scrollToMyRef = () => {
    const scroll =
      chatArea.current.scrollHeight - chatArea.current.clientHeight;
    chatArea.current.scrollTo(0, scroll);
  };
  return (
    <div className="full-container">
      <div ref={chatArea} className="chat-area">
        {messages.map((message) => {
          if (message.sent) {
            return <div className="message-sent">{message.value}</div>;
          } else {
            return <div className="message-received">{message.value}</div>;
          }
        })}
      </div>
      <form onSubmit={addMessage}>
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Enter chat message..."
            name="message"
            value={placeholder}
            onChange={handleChange}
          ></input>
          <button type="submit">></button>
        </div>
      </form>
    </div>
  );
}

export default SingleChat;
