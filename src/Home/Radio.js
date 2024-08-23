import React, {useState, useEffect} from 'react'
import Nav from './Nav';
import HomeBanner from './HomeBanner';
import Footer from './Footer';

function Radio() {
  const [time, setTime] = useState(new Date())
  useEffect(()=>{
    const timer = setInterval(()=>{
      setTime(new Date());
    }, 1000)
    return () => {
      clearInterval(timer);
    };
  },[]);
  return (
    <div>
      <Nav />
      

      <div className='hidder'>
        <span className='radioShedule'>
          <div className='timer'>
            <h3 className='time'>{time.toLocaleTimeString()}</h3>
          </div>
          <div style={{ marginRight: '30px' }}>
            <h4>
              <span
                style={{
                  color: 'red',
                  padding: '10px 15px',
                  backgroundColor: 'transparent',
                  borderRadius: '5px',
                }}
              >
                On Air:
              </span>
              <span style={{ fontWeight: 'lighter', marginLeft: '10px' }}>
                Détente Musicale
              </span>
            </h4>
          </div>
          <div style={{ marginRight: '30px' }}>
            <h4>
              <span
                style={{
                  color: 'red',
                  padding: '10px 15px',
                  backgroundColor: 'transparent',
                  borderRadius: '5px',
                }}
              >
                Up Next:
              </span>
              <span style={{ fontWeight: 'lighter', marginLeft: '10px' }}>
                Le Grand Journal
              </span>
            </h4>
          </div>
        </span>
      </div>
      <div className='mobileHider'>
        <div className='mobileHiderHolder'>
          <h3 className='time'>{time.toLocaleTimeString()}</h3>
          <div className='radioEVT'>
            <h4 style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  color: 'red',
                  padding: '2px 3px',
                  backgroundColor: 'transparent',
                  borderRadius: '5px',
                  marginBottom: '5px',
                }}
              >
                On Air:
              </span>
              <span>Sirin Noma</span>
            </h4>
            <h4 style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  color: 'red',
                  padding: '2px 3px',
                  backgroundColor: 'transparent',
                  borderRadius: '5px',
                  marginBottom: '5px',
                }}
              >
                Up Next:
              </span>
              <span>Journal</span>
            </h4>
          </div>
        </div>
      </div>

      <div className='radio'>
        { <iframe
        
          src='https://zeno.fm/radio/living-stone-radio-nqu6/'
          width='100%'
          height='100%'
          frameborder='0'
          scrolling='no'
        ></iframe> }
        <img src='/IMG-20240731-WA0051.jpg' alt='' />
      </div>
      <Footer />
    </div>
  );
}

export default Radio