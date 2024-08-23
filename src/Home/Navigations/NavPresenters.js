import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../../firebase-config'; // Import Firebase config
import Nav from '../Nav';
import Footer from '../Footer';
import HomeBanner from '../HomeBanner';

function NavPresenters() {
  const [presenters, setPresenters] = useState([]);
  const [visible, setVisible] = useState(4);

  // Fetch presenters from Firestore
  useEffect(() => {
    const fetchPresenters = async () => {
      try {
        const presentersCollection = collection(db, 'presenters');
        const presentersSnapshot = await getDocs(presentersCollection);
        const presentersList = presentersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPresenters(presentersList);
      } catch (error) {
        console.error('Error fetching presenters:', error);
      }
    };

    fetchPresenters();
  }, []);

  const imageStyleMobile = {
    width: '100%',
    height: '200px',
    borderRadius: '10px',
    objectFit: 'cover',
  };

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  return (
    <div>
      <Nav />
      <HomeBanner />
      <div className='presenterPage-container'>
        <h1 className='Presenter-header headersFont'>Animateurs</h1>
        <div className='presenterProfile'>
          {presenters.slice(0, visible).map((item) => (
            <div className='Profile' key={item.id}>
              <div className='p-image'>
                <div className='profileImage profilestyle'>
                  <img src={item.photo} alt={item.name} style={imageStyleMobile} />
                </div>
              </div>
              <div className='profileInfo'>
                <h3>{item.name}</h3>
                <span>{item.biography}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default NavPresenters;
