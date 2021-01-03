import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Icon, InputBase, Paper } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../redux/actions/auth.actions";

const StyledHeader = styled(Box)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  padding: "0.3rem",
  width: "20vw",
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "60vh",
    flexDirection: "column",
  },
  textField: { flex: 1, display: "inline" },
  button: {
    margin: theme.spacing(1),
  },
}));
const ComposeEditor = ({ handleClose }) => {
  const classes = useStyles();
  const from = useSelector((state) => state.auth.user._id);
  const [message, setMessage] = useState({
    to: "",
    title: "",
    body: "",
  });
  const dispatch = useDispatch();
  const handleDelete = () => {
    setMessage({ to: "", title: "", body: "" });
    handleClose();
  };
  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { to, title, body } = message;
    if (!message) {
      alert("There is no content to send");
      return;
    }
    console.log(from);
    dispatch(authActions.sendMessage({ from, to, title, body }));
    handleDelete();
  };

  return (
    <>
      <Paper elevation={3} className={classes.root}>
        <StyledHeader>New Message</StyledHeader>
        <InputBase
          name="to"
          placeholder="To : r@gmail.com"
          required
          value={message.to}
          onChange={handleChange}
        />
        <InputBase
          placeholder="Title : "
          required
          name="title"
          onChange={handleChange}
          value={message.title}
        />
        <InputBase
          id="outlined-multiline-static"
          multiline
          name="body"
          className={classes.textField}
          placeholder="Body : "
          value={message.body}
          onChange={handleChange}
          required
        />
        <div>
          {" "}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            onClick={handleSubmit}
          >
            Send
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<Icon>delete</Icon>}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default ComposeEditor;
