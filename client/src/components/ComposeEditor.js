import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box, InputBase, Paper } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';

const StyledHeader = styled(Box)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  padding: '0.3rem',
  width:"20vw"
});

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", height: "60vh", flexDirection: "column" },
  textField: { flex: 1, display: "inline" },
}));
const ComposeEditor = () => {
  const classes = useStyles();
  return (
    <>
      <Paper elevation={3} className={classes.root}>
        <StyledHeader>New Message</StyledHeader>
        <InputBase placeholder="To : "/>
        <InputBase placeholder="Subject : "/>
        <InputBase
          id="outlined-multiline-static"
          multiline
          className={classes.textField}
          placeholder="Content : "
        />
        <div>Icon</div>
      </Paper>
    </>
  );
};

export default ComposeEditor;
