import React from 'react';
import AdminSidebar from './AdminSidebar'; // Assurez-vous que ce chemin est correct
import AdminHeader from './AdminHeader';   // Assurez-vous que ce chemin est correct
import Dashboard from './Dashboard';       // Assurez-vous que ce chemin est correct
import { Grid } from '@mui/material';      // Material-UI pour la mise en page

const AdminHome = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Barre latérale */}
      
      <AdminSidebar />

      {/* Contenu principal */}
      <div style={{ flexGrow: 1 }}>
        {/* En-tête */}
        <AdminHeader />

        {/* Contenu du tableau de bord */}
        <div style={{ padding: '20px' }}>
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
