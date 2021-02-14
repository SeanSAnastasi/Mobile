import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { BrowserRouter as Router } from "react-router-dom";
import { firebaseConfig } from "./firebase";
import "./styles.css";

export const AuthContext = React.createContext(null);

function AppWrapper() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  function readSession() {
    const user = window.sessionStorage.getItem(
      `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
    );
    if (user) setLoggedIn(true);
  }

  useEffect(() => {
    readSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <Router>
        <App />
      </Router>
    </AuthContext.Provider>
  );
}

if (process.env.NODE_ENV !== "production") {
  import("react-axe").then((axe) => {
    axe.default(React, ReactDOM, 1000);
    ReactDOM.render(
      <Router>
        <AppWrapper />
      </Router>,
      document.getElementById("root")
    );
  });
} else {
  ReactDOM.render(
    <Router>
      <AppWrapper />
    </Router>,
    document.getElementById("root")
  );
}
