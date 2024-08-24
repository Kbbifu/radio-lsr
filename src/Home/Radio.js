import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import { db } from '../firebase-config'; // Firebase config
import Nav from './Nav';
import HomeBanner from './HomeBanner';
import Footer from './Footer';

function Radio() {
  const [time, setTime] = useState(new Date());
  const [onAirShow, setOnAirShow] = useState('');
  const [upNextPresenter, setUpNextPresenter] = useState('');

  // Fetch schedule data from Firestore
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const schedulesCollection = collection(db, 'schedules'); // Access the 'schedules' collection
        const schedulesSnapshot = await getDocs(schedulesCollection); // Fetch all documents
        const schedulesList = schedulesSnapshot.docs.map(doc => doc.data()); // Map through the documents to extract data
        
        // Find the current show and the next presenter based on the time
        findCurrentShow(schedulesList);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedule(); // Call the function to fetch data

    // Update the time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const findCurrentShow = (schedulesList) => {
    const currentTime = time.toLocaleTimeString('fr-FR', { hour12: false });
    
    let currentShow = null;
    let nextShow = null;

    // Sort the schedules by start time
    const sortedSchedules = schedulesList.sort((a, b) =>
      a.heureDebut.localeCompare(b.heureDebut)
    );

    for (let i = 0; i < sortedSchedules.length; i++) {
      const show = sortedSchedules[i];
      if (currentTime >= show.heureDebut && currentTime < show.heureFin) {
        currentShow = show;
        nextShow = sortedSchedules[i + 1] || sortedSchedules[0]; // Next show or loop to the first show
        break;
      }
    }

    if (currentShow) {
      setOnAirShow(currentShow.title);
      setUpNextPresenter(nextShow ? nextShow.presenter : '');
    } else {
      setOnAirShow('Aucune émission');
      setUpNextPresenter('Aucun animateur');
    }
  };

  return (
    <div>
      <Nav />

      <div className='hidder'>
        <span className='radioShedule'>
          <div className='timer'>
            <h3 className='time'>{time.toLocaleTimeString()}</h3>
          </div>
          <div style={{ marginRight: '30px' }}>
            <h4>
              <span
                style={{
                  color: 'red',
                  padding: '10px 15px',
                  backgroundColor: 'transparent',
                  borderRadius: '5px',
                }}
              >
                En direct:
              </span>
              <span style={{ fontWeight: 'lighter', marginLeft: '10px' }}>
                {onAirShow}
              </span>
            </h4>
          </div>
          <div style={{ marginRight: '30px' }}>
            <h4>
              <span
                style={{
                  color: 'red',
                  padding: '10px 15px',
                  backgroundColor: 'transparent',
                  borderRadius: '5px',
                }}
              >
                Par:
              </span>
              <span style={{ fontWeight: 'lighter', marginLeft: '10px' }}>
                {upNextPresenter}
              </span>
            </h4>
          </div>
        </span>
      </div>
      <div className='mobileHider'>
        <div className='mobileHiderHolder'>
          <h3 className='time'>{time.toLocaleTimeString()}</h3>
          <div className='radioEVT'>
            <h4 style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  color: 'red',
                  padding: '2px 3px',
                  backgroundColor: 'transparent',
                  borderRadius: '5px',
                  marginBottom: '5px',
                }}
              >
                En direct:
              </span>
              <span>{onAirShow}</span>
            </h4>
            <h4 style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  color: 'red',
                  padding: '2px 3px',
                  backgroundColor: 'transparent',
                  borderRadius: '5px',
                  marginBottom: '5px',
                }}
              >
                Par:
              </span>
              <span>{upNextPresenter}</span>
            </h4>
          </div>
        </div>
      </div>

      <div className='radio'>
        <iframe
          src='https://zeno.fm/radio/living-stone-radio-nqu6/'
          width='100%'
          height='100%'
          frameBorder='0'
          scrolling='no'
        ></iframe>
        <img src='/IMG-20240731-WA0051.jpg' alt='' />
      </div>
      <Footer />
    </div>
  );
}

export default Radio;
