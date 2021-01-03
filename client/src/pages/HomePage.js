import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import authActions from "../redux/actions/auth.actions";
import { makeStyles } from "@material-ui/core/styles";

import ButtonAppBar from "../components/PublicNavbar";

import MessageBar from "../components/MessageBar";
import { List, Popover } from "@material-ui/core";
import GmailTabsStyle from "../components/GmailTabs";
import TemporaryDrawer from "../components/Drawer";

import ComposeEditor from "../components/ComposeEditor";
const useStyles = makeStyles((theme) => ({
  root: { maxHeigth: "100vh" },
  main: {
    width: "100%",
    display: "flex",
    justifyContent: "reverse",
    backgroundColor: theme.palette.background.paper,
  },
  messageList: {
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    overflowX: "hidden",
  },
  typography: {
    padding: theme.spacing(2),
  },

  content: {
    flexGrow: 1,
  },
}));

const HomePage = () => {
  const [formData, setFormData] = useState({
    to: "",
    title: "",
    content: "",
  });
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const messageList = useSelector((state) => state.auth.messages);
  const [showModal, setShowModal] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);

  const currentUserId = currentUser._id;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { to, title, content } = formData;
    if (currentUserId)
      dispatch(
        authActions.sendMessage({
          from: currentUserId,
          to,
          title,
          body: content,
        })
      );
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClickMsg = (message) => {
    setShowModal(true);
    setSelectedMsg(message);
    message.status = "seen";
    dispatch(authActions.updateMessage({ message, currentUserId }));
  };

  useEffect(() => {
    if (currentUserId) dispatch(authActions.getReceivedMessages(currentUserId));
  }, [dispatch, currentUserId]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopover = (event) => {
    console.log("this");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popOpen = Boolean(anchorEl);
  const id = popOpen ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <ButtonAppBar handleDrawerOpen={handleDrawerOpen} open={open} />

      <div className={classes.main}>
        <TemporaryDrawer
          handlePopover={handlePopover}
          handleDrawerClose={handleDrawerClose}
          open={open}
        />
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <GmailTabsStyle />

          <main className={classes.content}>
            <List dense className={classes.messageList}>
              {messageList.map((message) => {
                return (
                  <MessageBar message={message} currentUserId={currentUserId} />
                );
              })}
            </List>
          </main>
        </div>
        <Popover
          anchorReference="anchorPosition"
          id={id}
          open={popOpen}
          anchorPosition={{ top: 1000, left: 2000 }}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <ComposeEditor handleClose={handleClose} />
        </Popover>
      </div>
    </div>
  );
};

export default HomePage;
