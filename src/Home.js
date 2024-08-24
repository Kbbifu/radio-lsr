import React, {useState} from 'react'
import HomeBanner from './Home/HomeBanner'
import Nav from './Home/Nav'
import News from './Home/News'
import About from './Home/page/About'
import Shows from './Home/Shows'
import Presenters from './Home/Presenters'
import Footer from './Home/Footer'
export const DataContext = React.createContext();


function Home() {
    
  return (
    <div>
      
      <Nav/>
      <HomeBanner/>
      
      
      
      <News id='#News' />
      <Shows id='#Shows'/>
      <Presenters id='#Presenters'/>
      <Footer />
      
      
      
      



    </div>
  )
}

export default Home