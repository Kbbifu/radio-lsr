import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayoutContainer = styled('div')({
  display: 'flex',
});

const MainContent = styled('div')(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  marginLeft: 240, // Assuming the sidebar width is 240px
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(8), // To accommodate the header height
}));

const AdminLayout = () => {
  return (
    <AdminLayoutContainer>
      <AdminSidebar />
      <MainContent>
        <AdminHeader />
        <Toolbar />
        <ContentWrapper>
          <Outlet /> {/* This will render the nested routes */}
        </ContentWrapper>
      </MainContent>
    </AdminLayoutContainer>
  );
};

export default AdminLayout;
