import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import GroupIcon from '@mui/icons-material/Group';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '250px',
      backgroundColor: '#f4f4f4',
      height: '100vh', // Prend toute la hauteur de la fenêtre
      overflowY: 'auto', // Permet le défilement si le contenu dépasse
    }}>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/managenews">
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="Actualités" />
        </ListItem>
        <ListItem button component={Link} to="/manageshows">
          <ListItemIcon>
            <ShowChartIcon />
          </ListItemIcon>
          <ListItemText primary="Emissions" />
        </ListItem>
        
        <ListItem button component={Link} to="/managepresenters">
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Présentateurs" />
        </ListItem>
        <ListItem button component={Link} to="/manageschedule">
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText primary="Programmes" />
        </ListItem>
        <ListItem button component={Link} to="/manageplaylists">
          <ListItemIcon>
            <PlaylistPlayIcon />
          </ListItemIcon>
          <ListItemText primary="Prédications" />
        </ListItem>
      </List>
    </div>
  );
};

export default AdminSidebar;
