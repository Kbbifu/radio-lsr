import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase-config'; // Import Firebase config

function Presenters() {
  const [presenters, setPresenters] = useState([]);

  // Fetch presenters from Firestore
  useEffect(() => {
    const fetchPresenters = async () => {
      try {
        const presentersCollection = collection(db, 'presenters'); // Access the 'presenters' collection
        const presentersSnapshot = await getDocs(presentersCollection); // Fetch all documents
        const presentersList = presentersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })); // Map through the documents to extract data
        setPresenters(presentersList); // Update state with fetched presenters
      } catch (error) {
        console.error('Error fetching presenters:', error);
      }
    };

    fetchPresenters(); // Call the function to fetch data
  }, []);

  const imageStylemobile = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
  };

  return (
    <div className='presenterContainer'>
      <div className='presenterHeader mb-header'>
        <h1 className='headersFont'>Nos Animateurs</h1>
      </div>
      <div className='presenterProfileHolder'>
        <div className='presenterGrid'>
          {presenters.map((item) => {
            return (
              <div className='presenterCard' key={item.id}>
                <div className='sliderCardImg'>
                  <img src={item.photo} style={imageStylemobile} alt={item.name} />
                </div>
                <li>
                  <h3>{item.name}</h3>
                </li>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Presenters;
