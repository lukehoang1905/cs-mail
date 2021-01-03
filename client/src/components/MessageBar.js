import React from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  Divider,
  makeStyles,
} from "@material-ui/core";

import {
  StarOutline,
  Star,
  Drafts,
  Delete,
  Archive,
  WatchLater,
  BookmarkBorder,
  LabelImportant,
} from "@material-ui/icons";
import authActions from "../redux/actions/auth.actions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  iconGroup: {
    width: "10vw",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function MessageBar({ message, currentUserId }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleToogleCheck = (checkType) => {
    if (!message._id) return;
    console.log("started to toogle", message);
    if (checkType === "box") {
      message.box = !message.box;
    } else if (checkType === "star") {
      message.star = !message.star;
    } else if (checkType === "book") {
      message.bookmark = !message.bookmark;
    }

    dispatch(authActions.updateMessage({ message, currentUserId }));
  };

  return (
    <>
      <ListItem button>
        <Checkbox
          checked={message.box}
          onChange={() => handleToogleCheck("box")}
        />
        <Checkbox
          icon={<BookmarkBorder />}
          checkedIcon={<LabelImportant />}
          checked={message.book}
          onChange={() => handleToogleCheck("book")}
        />
        <Checkbox
          icon={<StarOutline />}
          checkedIcon={<Star />}
          checked={message.star}
          onChange={() => handleToogleCheck("star")}
        />
        <ListItemText primary={` ${message.title}`} />

        <div className={classes.iconGroup}>
          <Archive />
          <Delete />
          <Drafts />
          <WatchLater />
        </div>
      </ListItem>
      <Divider />
    </>
  );
}
