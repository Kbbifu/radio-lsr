import React, { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import Nav from '../Nav';
import HomeBanner from '../HomeBanner';
import Footer from '../Footer';
import { Button, Typography, Box } from '@mui/material';

function NavTv() {
  const [schedules, setSchedules] = useState([]);
  const [visible, setVisible] = useState(4);
  const [selectedJour, setSelectedJour] = useState('Lundi'); // Initialize with 'Lundi' or any default day
  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  useEffect(() => {
    const fetchSchedules = async () => {
      const schedulesCollection = collection(db, 'schedules');
      const schedulesSnapshot = await getDocs(schedulesCollection);
      const schedulesList = schedulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(schedulesList);
    };

    fetchSchedules();
  }, []);

  const showMoreItems = () => {
    setVisible((previousValue) => previousValue + 4);
  };

  const renderSchedule = (jour) => {
    const filteredSchedule = schedules
      .filter(schedule => schedule.jour === jour)
      .sort((a, b) => {
        const timeA = parseInt(a.startTime.replace(':', ''), 10);
        const timeB = parseInt(b.startTime.replace(':', ''), 10);
        return timeA - timeB;
      });

    return (
      <div>
        {filteredSchedule.slice(0, visible).map(schedule => (
          <div key={schedule.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <img src={schedule.imageUrl} alt={schedule.show} style={{ width: '150px', marginRight: '10px' }} />
            <div>
              <Typography variant="h6">{`${schedule.startTime} - ${schedule.endTime}`}</Typography>
              <Typography variant="h5">{schedule.show}</Typography>
              <Button variant="outlined" style={{ marginRight: '10px' }}>Voir +</Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Nav />
      <HomeBanner />
      <div className='presenterPage-container'>
        <div style={{ padding: '20px' }}>
          <Box sx={{ display: 'flex', overflowX: 'auto', gap: '20px' }}>
            {jours.map(jour => (
              <div 
                key={jour} 
                style={{ minWidth: '200px', cursor: 'pointer' }} 
                onClick={() => setSelectedJour(jour)} // Update selected day
              >
                <Typography 
                  variant="h4" 
                  style={{ marginBottom: '20px', color: jour === selectedJour ? 'red' : 'black', textAlign: 'center' }}
                >
                  {jour}
                </Typography>
              </div>
            ))}
          </Box>
          <div>
            {renderSchedule(selectedJour)} {/* Display schedule for the selected day */}
          </div>
          <div className='moreBtn'>
            <Button variant="contained" onClick={showMoreItems} style={{ marginTop: '20px' }}>
              Voir plus
            </Button>
          </div>
        </div>
      </div>

      <div className='page-container-mobile'>
        <div style={{ padding: '20px' }}>
          <Box sx={{ display: 'flex', overflowX: 'auto', gap: '20px' }}>
            {jours.map(jour => (
              <div 
                key={jour} 
                style={{ minWidth: '200px', cursor: 'pointer' }} 
                onClick={() => setSelectedJour(jour)} // Update selected day
              >
                <Typography 
                  variant="h4" 
                  style={{ marginBottom: '20px', color: jour === selectedJour ? 'red' : 'black', textAlign: 'center' }}
                >
                  {jour}
                </Typography>
              </div>
            ))}
          </Box>
          <div>
            {renderSchedule(selectedJour)} {/* Display schedule for the selected day */}
          </div>
          <div className='moreBtn'>
            <Button variant="contained" onClick={showMoreItems} style={{ marginTop: '20px' }}>
              Voir plus
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NavTv;
