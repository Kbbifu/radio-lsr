import React, {useEffect, useState, useContext} from 'react'
import { DataContext } from '../App';
import { Link } from 'react-router-dom';
function HomeBanner() {
    const category = useContext(DataContext)
    const [data, setData] = useState([])

    useEffect(()=>{
      setData(category.Shows)
    },[])
        const imageStyle = {
          width: '40px',
          height: '40px',
          marginTop:'5px'
        };

  return (
    <div>
      {/* home section  */}

      <div className='homeBanner'>
        {/* <div className='bannerPic'></div> */}
        <div className='homeBannerEvents'>
          <div
            className='homeBannerSection1'
            style={{ backgroundColor: 'transparent' }}
          >
            <Link className='myLink listner' to={'/radio'}>
              <span className='listenIcon'>
                <img src='Red_circle.gif' alt='' style={imageStyle} />
              </span>
              <span style={{ color: 'red', fontSize: '18px' }}>
                En direct{' '}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner