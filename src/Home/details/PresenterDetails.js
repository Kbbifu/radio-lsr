import React, { useState, useEffect } from 'react';
import { useParams, link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../../firebase-config'; // Import Firebase config
import Nav from '../Nav';
import Footer from '../Footer';

function PresenterDetails() {
  const { id } = useParams();
  const [presenter, setPresenter] = useState(null);

  // Fetch a specific presenter by ID
  useEffect(() => {
    const fetchPresenter = async () => {
      try {
        const docRef = doc(db, 'presenters', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPresenter({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such presenter!');
        }
      } catch (error) {
        console.error('Error fetching presenter:', error);
      }
    };

    fetchPresenter();
  }, [id]);

  if (!presenter) return <p>Loading...</p>;

  return (
    <div>
      <Nav />
      <div className='detailsHeader'>
        <div className='dtailsBanner'>
          <img src={presenter.photo} alt={presenter.name} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
        </div>
        <p className='banner-content author'>
          {presenter.name} 
        </p>
        <p className='banner-content'>{presenter.bio}</p>
        <Link to={-1}>
          <button className='btn'>Retour</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default PresenterDetails;
