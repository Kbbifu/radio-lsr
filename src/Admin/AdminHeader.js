import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const AdminHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
