import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebase-config'; // Import your Firebase config
import { doc, getDoc } from 'firebase/firestore';
import Nav from '../Nav';
import Footer from '../Footer';
import HomeBanner from '../HomeBanner';
import { BsDot } from 'react-icons/bs';
import '../page/Page.css';

function NewsDetails() {
  const { id } = useParams();
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchNewsDetails = async () => {
      const newsDoc = doc(db, 'news', id);
      const newsSnapshot = await getDoc(newsDoc);
      if (newsSnapshot.exists()) {
        setInfo(newsSnapshot.data());
      }
    };

    fetchNewsDetails();
  }, [id]);

  const imageStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
  };

  return (
    
    <div>  
      <Nav />
      <HomeBanner />
      <div style ={{paddingBottom:'0px'}} >
        
      <div className='presenterPage-container'>
        <div className="detailsHeader">
          <h1 className="headersFont">{info.title}</h1>
          <p className="banner-content author">
          <span>Par :</span>  {info.author} <BsDot size={'1rem'} /> <span>{info.publishedDate}</span>
          </p>
          <div className="dtailsBanner">
            <div className="imageHolder"></div>
            <img src={info.photo} alt="" style={imageStyle} />
          </div>
          {info.content?.split('\n').map((paragraph, index) => (
            <p
              key={index}
              className="banner-content"
              style={{ fontSize: '18px', lineHeight: '1.5' }}
            >
              {paragraph}
            </p>
          ))}
          <Link to={-1} style={{ textDecoration: 'none' }}>
            <button className="backbtn">
              <span style={{ width: '50px', height: '50px' }}>
                <img src="/go_back_icon.png" alt="" style={imageStyle} />
              </span>
              <span>Retour</span>
              <span style={{ width: '50px', height: '50px' }}>
                <img src="/go_back_icon.png" alt="" style={imageStyle} />
              </span>
            </button>
          </Link>
        </div>
      </div>  
      </div>
      <Footer />
    </div>  
    
  );
}

export default NewsDetails;
