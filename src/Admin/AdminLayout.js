import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/system';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayoutContainer = styled('div')({
  display: 'flex',
});

const MainContent = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

const Content = styled('div')({
  padding: '16px',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
});

const AdminLayout = () => {
  return (
    <AdminLayoutContainer>
      
      <MainContent>
        <AdminHeader />
        <AdminSidebar />
        <Content>
          <Outlet /> {/* This will render the nested routes */}
        </Content>
      </MainContent>
    </AdminLayoutContainer>
  );
};

export default AdminLayout;
