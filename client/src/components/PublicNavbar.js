import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { useDispatch, useSelector } from "react-redux";
import authActions from "../redux/actions/auth.actions";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import TemporaryDrawer from "./Drawer";
import { IconButton, Badge } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";

import clsx from "clsx";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    display: "flex",
    color: "white",
    "&:hover": {
      color: "white",
      textDecoration: "underline white",
      cursor: "pointer",
    },
    fontWeight: "bold",
    padding: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
    width: 20,
    height: 20,
  },
  appBar: {
    background: "linear-gradient(45deg,#3a6186,#89253e)",
    border: 0,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function ButtonAppBar({ handleDrawerOpen, open }) {
  const classes = useStyles();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  const authLinks = (
    <>
      <Link to="/admin/profile" color="inherit" className={classes.link}>
        <AccountCircleIcon className={classes.icon} />
        {user?.email.substring(0, user?.email.indexOf("@"))}
      </Link>
      <Link className={classes.link} onClick={handleLogout} color="inherit">
        <ExitToAppIcon className={classes.icon} />
        Logout
      </Link>
    </>
  );

  const publicLinks = (
    <>
      <Link component={RouterLink} to="/login" className={classes.link}>
        <AccountCircleIcon className={classes.icon} />
        Login
      </Link>
      <Link component={RouterLink} to="/register" className={classes.link}>
        <TouchAppIcon className={classes.icon} />
        Register
      </Link>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            CoderSchool Mail
          </Typography>
          {isAuthenticated ? authLinks : publicLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}
