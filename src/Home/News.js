import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase-config'; // Adjust the path to your firebase configuration
import { collection, query, orderBy, limit, where, getDocs } from 'firebase/firestore';

function News() {
  const [latestNews, setLatestNews] = useState(null);
  const [aLaUneNews, setALaUneNews] = useState([]);
  const [aDecouvrirNews, setADecouvrirNews] = useState([]);
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const fetchNews = async () => {
      const newsCollection = collection(db, 'news');
      
      // Fetch the latest news
      const latestQuery = query(newsCollection, orderBy('publishedDate', 'desc'), limit(1));
      const latestSnapshot = await getDocs(latestQuery);
      setLatestNews(latestSnapshot.docs[0]?.data());
      
      // Fetch the next 8 most recent news for "A LA UNE"
      const aLaUneQuery = query(newsCollection, orderBy('publishedDate', 'desc'), limit(9)); // Fetch 9 to include the latest news
      const aLaUneSnapshot = await getDocs(aLaUneQuery);
      setALaUneNews(aLaUneSnapshot.docs.slice(1, 9).map(doc => doc.data())); // Skip the latest news

      // Fetch news published 3 days ago for "A DECOUVRIR"
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const aDecouvrirQuery = query(newsCollection, where('publishedDate', '<=', threeDaysAgo));
      const aDecouvrirSnapshot = await getDocs(aDecouvrirQuery);
      setADecouvrirNews(aDecouvrirSnapshot.docs.map(doc => doc.data()));
    };

    fetchNews();
  }, []);

   const headerColor = {
    color:'black',
    overFlowY:'hidden'
   }
   const imageStyle = {
    width:'100%',
    height:'100%',
    borderRadius:'10px',
    objectFit:'cover'
   }
   const imageStyleBtn = {
    width:'100%',
    height:'100%',
    borderRadius:'10px',
    objectFit:'contain'
   }
  const newsCard = {
    width: 'auto',
    height: '300px',
    borderRadius: '10px',
    }
    const linkStyle = {
      textDecoration: 'none'
    }
  

  return (
    <div>
      
      <div className='gencontainer'>
        
        
          {latestNews && (
            <div className='latestNews'>
                <div className='newsCardHeader'>
                    <h3 style={headerColor} className='textLimit'>
                      {latestNews.title}
                    </h3>
                </div>
              
                <div className='newsCard'>
                  <img src={latestNews.photo} alt={latestNews.title} style={imageStyle} />
                  
                </div>
                {latestNews.content?.split('\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className="banner-content"
                    style={{ fontSize: '18px', lineHeight: '1.5' }}
                  >
                    {paragraph}
                  </p>
                ))}
            </div>

          )}
       
          {/* A LA UNE SECTION */}
          <div className='aLaUne'>
            <h2>A LA UNE</h2>
            <div className='newsGrid'>
              {aLaUneNews.map((newsCollection) => (
                <Link to={`/news/${ newsCollection.id}`} key={newsCollection.id} className='newLink'>
                  <div className='newsCard'>
                    <img src={newsCollection.photo} alt={newsCollection.title} style={imageStyle}/>
                    
                  </div>
                  <div className='newsCardHeader'>
                    <h3 style={headerColor} className='textLimit'>
                      {newsCollection.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* A DECOUVRIR SECTION */}
          <div className='aDecouvrir'>
            <h2>A DECOUVRIR</h2>
            <div className='newsGrid'>
              {aDecouvrirNews.slice(0, visible).map((news) => (
                <Link to={`/news/${news.id}`} key={news.id} className='newLink'>
                  <div className='newsCard'>
                    <img src={news.photo} alt={news.title} style={imageStyle}/>
              
                  </div>
                  <div className='newsCardHeader'>
                    <h3 style={headerColor} className='textLimit'>
                      {news.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className='moreBtn'>
            <button className='viewmore btn' onClick={() => setVisible(visible + 4)}>
              Voir plus
            </button>
          </div>
          
        </div>
      
    </div>
  );
}

export default News;
