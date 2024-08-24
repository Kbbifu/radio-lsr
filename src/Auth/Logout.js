// src/Admin/AdminHeader.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <header>
      <h1>Admin Panel</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default AdminHeader;
