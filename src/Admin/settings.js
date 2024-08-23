// src/Admin/Settings.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config'; // Assurez-vous que le chemin est correct
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Settings = () => {
  const [stationName, setStationName] = useState('');
  const [stationDescription, setStationDescription] = useState('');
  const [stationLogo, setStationLogo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsDoc = doc(db, 'settings', 'stationInfo'); // Nom du document dans la collection 'settings'
        const docSnap = await getDoc(settingsDoc);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setStationName(data.name || '');
          setStationDescription(data.description || '');
          setStationLogo(data.logo || '');
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching settings: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      const settingsDoc = doc(db, 'settings', 'stationInfo'); // Nom du document dans la collection 'settings'
      await updateDoc(settingsDoc, {
        name: stationName,
        description: stationDescription,
        logo: stationLogo
      });
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings: ', error);
      alert('Failed to update settings.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <h2>Update Station Info</h2>
        <label>
          Station Name:
          <input
            type="text"
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={stationDescription}
            onChange={(e) => setStationDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Logo URL:
          <input
            type="text"
            value={stationLogo}
            onChange={(e) => setStationLogo(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleSaveSettings}>Save Settings</button>
      </div>
    </div>
  );
};

export default Settings;
