import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Box, CssBaseline } from '@mui/material';

const AdminLayout = () => {
  return (
    
    <Box sx={{ display: 'flex', height: '180vh' }}>
      
      <CssBaseline />
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'whitesmoke',
          padding: 2,
        }}
      >
        <AdminHeader />
        <Box sx={{ marginTop: 8 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
