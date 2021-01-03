import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { InputBase, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", height: "60vh", flexDirection: "column" },
  textField: { flex: 1, display: "inline" },
}));
const ComposeEditor = () => {
  const classes = useStyles();
  return (
    <>
      <Paper elevation={3} className={classes.root}>
        <div>New Message</div>
        <div>To</div>
        <div>Subject</div>
        <InputBase
          id="outlined-multiline-static"
          multiline
          className={classes.textField}
        />
        <div>Icon</div>
      </Paper>
    </>
  );
};

export default ComposeEditor;
