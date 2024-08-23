import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase-config'; // Import your Firebase config

function Shows() {
  const [shows, setShows] = useState([]);

  // Fetch shows from Firestore
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const showsCollection = collection(db, 'shows'); // Access the 'shows' collection
        const showsSnapshot = await getDocs(showsCollection); // Fetch all documents
        const showsList = showsSnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data()
        })); // Map through the documents to extract data
        setShows(showsList); // Update the state with the fetched shows
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows(); // Call the function to fetch the data
  }, []);

  const imageStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
  };
  
  const imageStylemobile = {
    width: '200px',
    height: '200px',
    borderRadius: '10px',
    objectFit: 'cover',
  };

  return (
    <div>
      {/* Shows section */}
      <div className='showsContainer'>
        <div className='showHeader'>
          <h1 className='headersFont'>Nos Emissions</h1>
        </div>
        <div className='showsSlider'>
          <div className='sliderCards'>
            {shows.map((item) => {
              return (
                <div className='sliderCard' key={item.id}>
                  <div className='sliderCardImg'>
                    <img src={item.photo} style={imageStyle} alt={item.title} />
                  </div>
                  <li className=' '>
                    <h3>
                      {item.title} 
                    </h3>
                    <p>Présentateur: {item.presenter}</p> {/* Ajout du champ Auteur */}
                    <p>Chaque : {item.jour} de {item.heureDebut} à {item.heureFin}</p>
                  </li>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className='showsContainer-mobile'>
        <div className='showHeader'>
          <h1 className='headersFont'>Nos Emissions</h1>
        </div>
        <div className='showsSlider'>
          <div className='sliderCards'>
            {shows.map((item) => {
              return (
                <div className='sliderCard' key={item.id}>
                  <div className='sliderCardImg'>
                    <img src={item.photo} style={imageStylemobile} alt={item.title} />
                  </div>
                  <li className=' '>
                    <h3>
                      {item.title}
                    </h3>
                    <p>Présentateur: {item.presenter}</p> {/* Ajout du champ Auteur */}
                    <p>Chaque : {item.jour} de {item.heureDebut} à {item.heureFin}</p> {/* Ajout du champ Date */}
                  </li>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shows;
