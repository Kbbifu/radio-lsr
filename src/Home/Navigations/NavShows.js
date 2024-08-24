import React, { useState, useEffect } from 'react';
import '../page/Page.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import Nav from '../Nav';
import Footer from '../Footer';
import HomeBanner from '../HomeBanner';

function NavShows() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(8);

  // Fetch shows from Firestore
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const showsCollection = collection(db, 'shows');
        const showsSnapshot = await getDocs(showsCollection);
        const showsList = showsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(showsList);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, []);

  const showMoreItems = () => {
    setVisible((previousValue) => previousValue + 4);
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    borderRadius: '10px',
    objectFit: 'cover',
  };

  const imageStylemobile = {
    width: '100%',
    height: '200px',
    borderRadius: '10px',
    objectFit: 'cover',
    marginBottom: '10px',
  };

  const spacer = {
    paddingBottom: '0px',
  };

  return (
    
    <div style={spacer}>
      <Nav />
      <HomeBanner />
      <div className='presenterPage-container'>
        <h1 className='Presenter-header headersFont'>Nos Emissions</h1>
        <div className='presenterProfile'>
          {data.map((item) => (
            <div className='Profile' key={item.id}>
              <div className='p-image'>
                <div className='profileImage profilestyle'>
                  <img
                    src={item.photo}
                    className='profileImage profilestyle'
                    alt={item.title}
                  />
                </div>
              </div>
              <div className='profileInfo'>
                <h3>{item.title}</h3>
                
              </div>
              <div>
                <p>Présentateur: {item.presenter}</p> {/* Ajout du champ Auteur */}
                
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='page-container-mobile'>
        <h1 className='headersFont'>Emissions</h1>
        <div className='gridcontainer'>
          <div className='newsGrid-shows'>
            {data.slice(0, visible).map((item) => (
              <div className='card_mobile_shows' key={item.id}>
                <div className='newsCardImage_mobile'>
                  <img src={item.photo} alt={item.title} style={imageStylemobile} />
                </div>
                <div className='profileInfoMobile'>
                  <span style={{ fontWeight: 'bold' }}>{item.title}</span>
                  
                </div>
                <div>
                  <p>Présentateur: {item.presenter}</p> {/* Ajout du champ Auteur */}
                  
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='NewmoreBtn'>
          <button className='viewmore' onClick={showMoreItems}>
            <span style={{ marginRight: '10px' }}>
              <img src='viewMore_icon.png' alt='' className='btnicon' />
            </span>
            <span style={{ color: 'white' }}>Voir plus</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NavShows;
