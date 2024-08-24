import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <List>
      <ListItem button component={NavLink} to="dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={NavLink} to="managenews">
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary="Actualités" />
      </ListItem>
      <ListItem button component={NavLink} to="manageshows">
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Emissions" />
      </ListItem>
      <ListItem button component={NavLink} to="managepresenters">
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Présentateurs" />
      </ListItem>
      <ListItem button component={NavLink} to="manageschedule">
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        <ListItemText primary="Programmes" />
      </ListItem>
      <ListItem button component={NavLink} to="manageplaylists">
        <ListItemIcon>
          <PlaylistAddIcon />
        </ListItemIcon>
        <ListItemText primary="Prédications" />
      </ListItem>
    </List>
  );
};

export default AdminSidebar;
