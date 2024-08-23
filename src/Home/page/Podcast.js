import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav';
import Footer from '../Footer';
import HomeBanner from '../HomeBanner';

function Podcast() {
  const [playlists, setPlaylists] = useState([]);
  const [visible, setVisible] = useState(8); // Commence par afficher 8 éléments
  const db = getFirestore();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'playlists'));
        const playlistsData = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => new Date(b.Date) - new Date(a.Date)); // Trier du plus récent au plus ancien
        setPlaylists(playlistsData);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, [db]);

  const openAudio = (audioURL) => {
    if (audioURL) {
      //const url = `/player?audioUrl=${encodeURIComponent(audioURL)}`;
      window.open(audioURL, '_blank');
    } else {
      console.error('Audio URL is undefined');
    }
  };
  

  const showMoreItems = () => {
    setVisible((prevVisible) => prevVisible + 4);
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4 éléments par ligne
    gap: '20px',
    padding: '30px',
    backgroundColor: 'white'
  };

  const gridItemStyle = {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
  };

  const coverImageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '15px',
  };

  return (
    <div>
      <Nav />
      <HomeBanner />
      <div style={gridContainerStyle}>
        {playlists.slice(0, visible).map((playlist) => (
          <div
            key={playlist.id}
            style={gridItemStyle}
            onClick={() => openAudio(playlist.audioURL)}
          >
            <div>
              <span>{playlist.category}</span> du{' '}
              <span>
                {new Date(playlist.Date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div>
              <strong>Thème : </strong>
              {playlist.title}
            </div>
            <img
              src={playlist.coverImageURL}
              alt={`${playlist.title} cover`}
              style={coverImageStyle}
            />
            <div>
              <strong>Orateur : </strong>
              {playlist.author}
            </div>
            <div>{playlist.description}</div>
          </div>
        ))}
      </div>
      {visible < playlists.length && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button onClick={showMoreItems} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
            Voir plus
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Podcast;
