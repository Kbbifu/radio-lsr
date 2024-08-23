import React, {useState} from 'react'

function Slider({slides}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderStyles = {
    height:'100%',
    position:'relative',
  };
  const slideStyles = {
    width:'100%',
    height:'100%',
    borderRadius:'10px',
    // backgroundPosition:'center',
    // backgroundImage: `url(${slides[currentIndex].url})`,
    // backgroundSize:'cover'
  };
  const leftArrowStyles ={
    position:'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '35px',
    fontSize:'45px',
    color: '#fff',
    zIndex:1,
    cursor: 'pointer' 
  };
  const rightArrowStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: '35px',
    fontSize: '45px',
    color: '#fff',
    zIndex: 1,
    cursor: 'pointer',
  };
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  } 
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 :  currentIndex + 1
    setCurrentIndex(newIndex)
  }; 
  const dotsContainerStyles = {
    display:'flex',
    justifyContent: 'center',
    fontSize:'20px'
  }
  const dotStyle = {
    margin: '0 3px',
    cursor: 'pointer',
    fontSize:'40px'
  }
  const gotoSlide = slideIndex => {
    setCurrentIndex(slideIndex)
  }
  const image = `${slides[currentIndex].url}`;
  const imageStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overFlow: 'hidden',
  width:'100%',
  height:'100%',
  objectFit:'cover'
  }
  return (
    <div style={sliderStyles}>
      {/* slide arrow  */}
      <div style={leftArrowStyles} onClick={goToPrevious}>
        Back
      </div>
      <div style={rightArrowStyles} onClick={goToNext}>
        Front
      </div>
      {/* slide arrow end  */}

      <div style={slideStyles}>
        <img src={image} alt='' style={imageStyle} />
        {/* <div className='presenterCard'>
          <div className='presenterCardImg'>
          </div>
          <li>{slides[currentIndex].title}</li>
          <li className='show-time'>Time</li>
        </div> */}
        <div style={dotsContainerStyles}>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              style={dotStyle}
              onClick={() => gotoSlide(slideIndex)}>
              .
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider