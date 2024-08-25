import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../../firebase-config'; // Import Firebase config
import Nav from '../Nav';
import Footer from '../Footer';
import HomeBanner from '../HomeBanner';

function NavPresenters() {
  const [presenters, setPresenters] = useState([]);
  const [visible, setVisible] = useState(4);
  const showMoreItems = () => {
    setVisible((previousValue) => previousValue + 4);
  };
  const headerColor = {
    color: 'white',
    overFlowY: 'hidden',
  };
  const imageStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
  };
   const imageStyleMobile = {
     width: '100%',
     height: '200px',
     borderRadius: '10px',
     objectFit: 'cover',
   };
  const round={
    width:'200px',
    height:'200px',
    borderRadius:'50%',
    backgroundColor:'white'
  }
  const spacer ={
    marginBottom:'40px'
  }
  const mybg = {
     backgroundColor: 'white',
     color: 'black',
     };

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
      <div className='page-container-mobile'>
        <h1 className='Presenter-header headersFont'>Animateurs</h1>
        <div className='gridcontainer' style={spacer}>
          <div className='newsGrid-shows'>
            {data.slice(0, visible).map((item) => {
              return (
                <div className='card-mobile'>
                  <div className='newsCardImage_mobile'>
                    {/* <div style={round}></div> */}
                    <img src={item.photo} alt='' style={imageStyleMobile} />
                  </div>
                  <div className='profileInfo'>
                    <h3 style={headerColor} className='textLimit'>
                      {item.name}
                    </h3>
                  </div>
                </div>
              );
            })}
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

export default NavPresenters;
