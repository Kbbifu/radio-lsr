// src/Auth/Logout.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
