import React, {useState,  useEffect} from 'react'
import Nav from '../Nav'
import Footer from '../Footer';
import HomeBanner from '../HomeBanner'
export default function About() {
  const bg ={
    background:'white',
    color:'black',
  }
  const [data, setData] = useState('');
  //const handleClick = () =>{
  //  window.open('https://www.sarmanfarms.com/services/', '_blank');
  //}
  const imgStyle = {
    width:'100%',
    height:'100%',
    objectFit:'cover',
  }
  useEffect(()=>{
    setData(`Living Stone Radio FM and Television by Kongo Digital City is dedicated to further extension and propagation of gospel practices within its locality.`);
  },[])
  return (
    <div>
      <Nav />
      <HomeBanner />

      <div className='about-container' style={bg}>
        <h1 className='headersFont'>Qui sommes-nous?</h1>
        <p className='about-content'>
          <div className="govt">
            <div className="govtholder">
              <div className="govtImg"><img src="/IMG-20240809-WA0168.jpg" alt="" /></div>
              <div className="govtChair"><img src="/IMG-20240809-WA0167.jpg" alt="" /></div>
            </div>
          </div>
          <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
          Living Stone Radio "LSR FM" est une idée des quelques paroissiensn  de la Paroisse Francophone Missionnaire "PFM / Muanda", qui ont reflechi sur la croissance spirituelle et numérique de cette Paroisse qui se compte parmi tant d'autres de la 18ème Communauté Evangelique de l'Alliance au Congo, CEAC en sigle.

            . <br />
            <br />
            Elle est composée de LSR FM et LSR TV avec les chaînes en direct suivantes :

            live channels: <br />
            <br />
            <li>Une Chaine de Télévion professionnelle</li>
            <li>Live Streaming</li>
            <li>Diffusion sur les médias sociaux</li>
            <br />
            
            <h1 className='headersFont'>Notre Mission</h1>
            La LSR FM a comme mission principale, l'évangélisation par la radio et l'obtention d'une société équilibrée, équitable et pacifiée. <br />
            <h1 className='headersFont'>Notre Vision</h1>
            Notre vision est de servir notre communauté avec les informations les plus crédibles et les plus fiables pour la croissance et le développement. <br />
            <h1 className='headersFont'>Nos Objectifs</h1>
            <ul>
              <li>Contribuer à l'accru des chrétiens convertis et Baptisés</li>
              <li>Contribuer au développement économique dans son bassin d'écoute</li>
              <li>Contribuer à améliorer les revenus de son bassin d'écoute </li>
              <li>Booster l'entrepreneuriat dans les milieux des jeunes</li>
              <li>Contribuer à la promotion et la défense des droits et liberté</li>
              <li>Promouvoir la coexistence pacifique dans la société</li>
              <li>Promotion de l'éducation et de la citoyenneté </li>
              <li>Contribuer à la promotion de la communauté et du bien etre social </li>
            </ul>
          </p>
        </p>
        <div>
          <button
            style={{
              border: 'none',
              background: 'inherit',
              color: 'black',
            }}
          >
            <a
              href='#'
              //onClick={handleClick}
              style={{
                border: 'none',
                textDecoration: 'none',
                color: 'red',
                fontSize: '14px',
              }}
            >
              Lire plus
            </a>
          </button>
        </div>

        {/* <div className='photogallary'>
          <div className='photoGrid'>
            <div className='photo'>
              <div className='photoImage'>
                <img src='Sarman-farms-1.png' style={imgStyle} alt='' />
              </div>
            </div>
            <div className='photo'>
              <div className='photoImage'>
                <img src='Chicken-layers.jpg' style={imgStyle} alt='' />
              </div>
            </div>
            <div className='photo'>
              <div className='photoImage'>
                <img src='veg2.png' style={imgStyle} alt='' />
              </div>
            </div>
            <div className='photo'>
              <div className='photoImage'>
                <img src='fruits1.png' style={imgStyle} alt='' />
              </div>
            </div>
            <div className='photo'>
              <div className='photoImage'>
                <img src='slider121.png' style={imgStyle} alt='' />
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
