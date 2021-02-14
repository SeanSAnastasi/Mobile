import React from "react";
import { useHistory } from "react-router";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";

import MailIcon from "@material-ui/icons/ViewHeadline";

export default function TemporaryDrawer() {
  const history = useHistory();
  const [state, setState] = React.useState({
    open: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const items = [
    {
      text: "Home",
      onClick: () => {
        setState({ open: false });
        history.push("/");
      },
    },
    {
      text: "Blog",
      onClick: () => {
        setState({ open: false });
        history.push("/blog");
      },
    },
    {
      text: "Forums",
      onClick: () => {
        setState({ open: false });
        history.push("/forums");
      },
    },
    {
      text: "Chat",
      onClick: () => {
        setState({ open: false });
        history.push("/chat");
      },
    },
  ];

  return (
    <div>
      <Button
        aria-label="burger menu"
        className="hamburger"
        onClick={toggleDrawer("open", true)}
      >
        <MailIcon />
      </Button>
      <Drawer
        variant="temporary"
        open={state["open"]}
        onClose={toggleDrawer("open", false)}
      >
        <List>
          {items.map((item, index) => {
            const { text, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}
