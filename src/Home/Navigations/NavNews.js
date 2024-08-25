import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase-config'; // Import your Firebase config
import { collection, getDocs } from 'firebase/firestore';
import Nav from '../Nav';
import Footer from '../Footer';
import HomeBanner from '../HomeBanner';
import '../page/Page.css';

function NavNews() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const fetchNews = async () => {
      const newsCollection = collection(db, 'news');
      const newsSnapshot = await getDocs(newsCollection);
      const newsList = newsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(newsList);
    };

    fetchNews();
  }, []);

  const showMoreItems = () => {
    setVisible((previousValue) => previousValue + 4);
  };

  const headerColor = {
    color: 'black',
    overFlowY: 'hidden',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
  };

  return (
    <div style={{  color: 'black' }}>
      <Nav />
      <HomeBanner />
      <div className="presenterPage-container">
        <h1 className="headersFont" color="black">TOUTE L'ACTUALITE</h1>
        <div className="gridcontainer">
          <div className="newsGrid">
            {data.slice(0, visible).map((item) => (
              <div key={item.id}>
                <Link to={`/news/${item.id}`} style={{ color: 'black' }} className="newLink">
                  <div className="newsCardImage">
                    <img src={item.photo} alt="" style={imageStyle} />
                  </div>
                  <div className="newsCardHeader">
                    <h3 style={headerColor} className="textLimit">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="moreBtn">
          <button className="viewmore btn" onClick={showMoreItems}>
            <div style={{ width: '30px', height: '30px' }}>
              <img src="/viewMore_icon.png" alt="" style={imageStyle} />
            </div>
            <span className="btnName">Voir plus</span>
          </button>
        </div>
      </div>
      <div className='page-container-mobile'>
        <h1 className='headersFont'>Actualités</h1>
        <div className='gridcontainer'>
          <div className='newsGrid-shows'>
            {data.slice(0, visible).map((item) => {
              return (
                <div className='card-mobile'>
                  <Link to={`/news/${item.id}`} key={item.id}>
                  <div className='newsCardImage_mobile'>
                    <img src={item.image} alt='' style={imageStyleMobile} />
                  </div>
                  <div className='profileInfo'>
                    <h3 style={headerColor} className='textLimit'>
                      {item.title}
                    </h3>
                  </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className='NewmoreBtn'>
          <button className='viewmore' onClick={showMoreItems}>
            <span style={{ marginRight: '10px' }}>
              <img src='/viewMore_icon.png' alt='' className='btnicon' />
            </span>
            <span className='btnName'>Voir plus</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NavNews;
