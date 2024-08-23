import React from 'react'
import './Component.css'

function Card({image, title}) {
  const textColor = {
    color:'white'
  }
  const cardImage = {
    width:'200px',
    hieght:'200px',
    backgroundColor:'white',
    boxSizing:'borderBox'
    
  } 
  const imageStyle = {
  width:'100%',
  height:'100%',
  borderRadius:'10px'
 }
  return (
    <div>
      <div className='Card-container'>
        <div className='newsCard'>
          <div className='cardImage' style={cardImage}>
            <img src={image} alt='' style={imageStyle} />
          </div>
          <div className='cardText'>
            <div className='cardHeader' style={textColor}>
              {title}Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Beatae vel doloremque fuga, quasi laudantium rem?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card