import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddCircle from '@material-ui/icons/AddCircle';

import ExitToApp from "@material-ui/icons/ExitToApp";

import {Link} from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem 
      button
      component={Link}
      to={"/"}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Rankings" />
    </ListItem>
    <ListItem 
      button
      component={Link}
      to={"/game_records"}
    >
      <ListItemIcon>
        <AddCircle />
      </ListItemIcon>
      <ListItemText primary="Game Records" />
    </ListItem>
    <ListItem 
      button
      component={Link}
      to={"/manage_game"}
    >
      <ListItemIcon>
        <AddCircle />
      </ListItemIcon>
      <ListItemText primary="Create Game" />
    </ListItem>
  </div>
);