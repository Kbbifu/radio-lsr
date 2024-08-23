import React from 'react'
import { Link } from 'react-router-dom';
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';
import { TfiTwitter, TfiApple } from 'react-icons/tfi';
import { IoLogoGooglePlaystore } from 'react-icons/io5';

function Footer() {
  return (
    <div>
      {/* footer section  */}

      <div className='footerContainer'>
        <div className='footLogo'>
          <h1 className='headersFont'>Living Stone Radio FM</h1>
          <div className='privacyMedia'>
            <div className='privacy'>
              
              <Link to={'#'} className='myLink'>
                <li>Privacy Policy Terms</li>
              </Link>
              <Link to={'/contact'} className='myLink'>
                <li>Contacts</li>
              </Link>
            </div>
          </div>
        </div>
        <div className='siteMap'>
          <h1 className='headersFont' >Site Map</h1>
          <li>
            <Link to={'/'} className='myLink'>
              Accueil
            </Link>
          </li>
          <li>
            <Link to={'/'} className='myLink'>
              Qui sommes-nous?
            </Link>
          </li>
          <li>
            <Link to={'/'} className='myLink'>
              Radio
            </Link>
          </li>
          <li>
            <Link to={'/Himma-tv'} className='myLink'>
              TV
            </Link>
          </li>
          <li>
            <Link to={'/news'} className='myLink'>
              Actualités
            </Link>
          </li>
          <li>
            <Link to={'/shows'} className='myLink'>
              Emissions
            </Link>
          </li>
          {/* <li>
            <Link to={'/'} className='myLink'>
              Events
            </Link>
          </li> */}
          <li>
            <Link to={'/presenters'} className='myLink'>
              Animateurs
            </Link>
          </li>
          <li>
            <Link to={'/podcast'} className='myLink'>
              Podcast
            </Link>
          </li>
        </div>
        <div className='otherStation'>
          <h1 className='headersFont' >Addresses</h1>
          <li>
            575, Avenue du commerce, Quartier Océan, Muanda-ville, Kongo Central - RDC.
          </li>
          {/* <li>+243 81 515 3780</li> */}
          {/* <li>+243 81 515 3780</li> */}
        </div>
        <div className='connectWithUs'>
          <h1 className='headersFont' >Suivez nous sur les reseaux sociaux</h1>

          <div className='socialMedia'>
            <li>
              <FaInstagram className='nav-media-icons' size={'25px'} />
            </li>
            <li>
              <TfiTwitter className='nav-media-icons' size={'25px'} />
            </li>
            <li>
              <a href='https://web.facebook.com/livingstoneradio.rdc' target='_blank'><FaFacebookF className='nav-media-icons' size={'25px'} color='white' /></a>
            </li>
            <li>
              <FaWhatsapp className='nav-media-icons' size={'25px'} />
            </li>
            <li>
              <FaYoutube className='nav-media-icons' size={'25px'} />
            </li>
          </div>

          <div className='siteApp'>
            <li>
              <IoLogoGooglePlaystore size={'25px'} />
            </li>
            <li>
              <TfiApple size={'25px'} />
            </li>
            <li></li>
          </div>
        </div>
      </div>

      <div className='copyRight'>
        <p>2024 &copy; Living Stone Radio FM All rights reserved.</p>
        <p>Designed by Kongo Digital City.</p>
      </div>
    </div>
  );
}

export default Footer