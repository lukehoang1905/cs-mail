import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";

import { HomeOutlined } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const MainList = ({ handleChartType }) => {
  return (
    <>
      <ListItem button component={RouterLink} to={"/"}>
        <ListItemIcon>
          <HomeOutlined />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => handleChartType("Line")}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Line Chart" />
      </ListItem>
      <ListItem button onClick={() => handleChartType("Bar")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Bar Chart" />
      </ListItem>
      <ListItem button onClick={() => handleChartType("Pie")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Pie Chart" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem>
    </>
  );
};

export default MainList;
