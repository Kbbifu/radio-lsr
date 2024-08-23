import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Footer from './Home/Footer';
import About from './Home/page/About';
import Page from './Home/page/Page';
import Contact from './Home/page/Contact';
import NavNews from './Home/Navigations/NavNews';
import NavPresenters from './Home/Navigations/NavPresenters';
import NavTv from './Home/Navigations/NavTv';
import NavShows from './Home/Navigations/NavShows';
import NewsDetails from './Home/details/NewsDetails';
import PresenterDetails from './Home/details/PresenterDetails';
import ShowsDetails from './Home/details/ShowsDetails';
import TvDetails from './Home/details/TvDetails';
import Podcast from './Home/page/Podcast';

import NoteFound from './Home/NoteFound';
import Radio from './Home/Radio';
import AdminSidebar from './Admin/AdminSidebar';
import Dashboard from './Admin/Dashboard';
import ManageShows from './Admin/ManageShows';
import ManageNews from './Admin/ManageNews'
import ManagePlaylists from './Admin/ManagePlaylists'
import AdminLayout from './Admin/AdminLayout';
import Login from './Auth/Login';
import AdminHome from './Admin/AdminHome';
import Logout from './Auth/Logout';
import PrivateRoute from './Auth/PrivateRoute';
import ManageSchedule from './Admin/ManageSchedule';
import ManagePresenters from './Admin/ManagePresenters';

export const DataContext = React.createContext();

function App() {

  const [News, setNews] = useState([
    {
      id: 1,
      category: 'News',
      title: 'Fostering Unity through Agro-Products Sustainability',
      author: 'JEREMIAH AMEDU',
      content: `The Alliance for a Green Revolution in Africa (AGRA) pledge to train more Farmers in new innovations , farming skills in line with global standard in Gombe , Nassarawa and Oyo states.\n

Country director of AGRA, Dr Kehinde Makinde , asserted this to the newsmen , during the inspection of Demonstration Farms at Likoro Village in Kudan local government at Kaduna state, facilitated by National Agricultural Extension and research Liaison Services (NAERLS) in collaboration with AGRA.\n

According to Dr Kehinde apart from engaging over 900,000 Farmers nationwide the project will soon embark to permeate other states as part of its effort to enhance food production in Nigeria.\n

The country director added that already Farmers in Kaduna and Niger states are accosted and supported with new farming skills of Beans , Cowpeas, Maize and Rice as well as Vegetables for better adoptations to the environs.\n

Dr Kehinde ,lamented the worrying part of the set back the farmers are facing due to the climate changes , hence he said their is need for major concern in food production adapted to climate changes which farmers need to be well versed about the methods.\n

Furthermore he said since the coming of the project to the country in 2017, the target is to rebrand and change the farming techniques in the country so that Nigeria would rub the shoulder with global giants in Food Production.\n
`,
      date: 'FEBRUARY 23, 2021',
      image: '/agra.png',
    },
    {
      id: 2,
      category: 'News',
      title: 'Aeroponics and Hydroponics: Food Security and New Techniques.',
      author: 'JEREMIAH AMEDU',
      content: `Every human endeavor is rapidly experiencing fascinating evolution making regular activities such as construction, education, healthcare, sports and agricultural activities more efficient and far reaching. That is why new innovations are fast rising and changing the ideals of society.\n These ideals in the Information and Technology sector have even been described as disruptive technology as they have the tendency to totally alter the normal way tasks are carried out. For example, the overwhelming challenge that came with the COVID-19 pandemic has placed an option in the offing for the use of virtual communications for educational, social, judicial and governance purposes. \nIn the last seven months many weddings were held online, lectures and seminars were held virtually, court sessions and government functions were also held virtually.\nThese are all changes that has affected our social psyche in the way things are done. Same changes are occurring in other sectors such as mechanized farming, genetic engineering, and the use of hydroponics and aeroponics in the growth of crops. Hydroponics is a type of horticulture and a subset of hydroculture, which is a method of growing plants, usually crops, without soil, by using mineral nutrient solutions in an aqueous solvent while aeroponics is the use of aerosols laced with nutrients for plants and crops to grow.`,
      date: 'FEBRUARY 23, 2021',
      image: '/hydro-3.jpg',
    },
    {
      id: 3,
      category: 'News',
      title:
        'Assessing the Feed Nigeria Summit 2020: Tackling food insecurity in Nigeria head-on.',
      author: 'JEREMIAH AMEDU',
      content: `When a man rises at dawn, what gives him an assurance of a bright day is not the shining rays of the sunlight or a pleasant weather, but the hope of getting three square meals with the right diet for his family and himself by sun set. According to the United Nations Food and Agriculture Organization, FAO, while many people may not be hungry in the sense that they are suffering physical discomfort caused by lack of dietary energy, they may still be food insecure.\nThey might also have access to food to meet their energy needs yet they are uncertain that it will last or they might be forced to reduce the quantity, and or the quality of food they eat in order to get by. This various aspect of food insecurity can contribute to various forms of malnutrition and can have serious consequences for health and wellbeing.\n THE FAO goes further by defining food insecurity as a situation where a person lacks regular access to enough safe and nutritious food for normal growth and development and an active and healthy life.\nThis may be due to unavailability of food or lack of resources to purchase or obtain food. Interestingly and somewhat ironically obesity and being overweight is also a indication of food insecurity. This is because uncertainty to access the right kind of food for long periods could lead to physiological changes that can contribute to obesity and overweight which in turn could also lead to severe illness.


`,
      image: 'meeting-3.jpg',
      date: 'FEBRUARY 23, 2021',
    },
    {
      id: 4,
      category: 'News',
      title: 'Not just a Farmer: A Feeder!!!',
      author: 'OLAYEMI DANIYAN',
      content: `Each time a farmer strikes the earth with tools and machines to clear weeds, till the soil, plant crops and harvest it or evacuate dung and feeds for animals to feed, what comes to mind is the implication of his trade. If he decides to stop working, one wonders, where will the food in homes, markets, restaurants, warehouses and silos come from? Farmers play severely vital role in preserving the lives of millions of people. Unfortunately, in many underdeveloped economies farmers remain poor. The question that then comes to mind is why is it so? The simple answer is lack of money: no money to expand their fields or use the latest seeds and technology.

But economists have a more complicated theory. Perhaps, farmers face too much risk as too many factors seem against them. From unfavourable weather issues, to poor yields due to attack on crops by pests, coupled with unfavourable government policies and programmes. Also, a major risk factor especially in the Sub-Saharan Africa is the problem of clashes between farmers and herdsmen due to cows grazing on farm crops. Also unpleasant for farmers is the worsening security condition in rural areas such as kidnappings and assassinations. Besides these challenges is the issue of toil and poor interest in the trade, as a result many young people consider farming for rural dwellers or the old and retired. The situation has made many, especially in Nigeria to drop their tools and leave the farms for other trades.

However, despite these challenges which can be found in many countries throughout the globe, some personalities have faced the odds and emerged wealthy from farming while some other wealthy business investors are expanding their tentacles into farming. This is most likely due to the fact that farmers play a key role in keeping humans alive as everyone has to eat. A clear case is Africa’s richest man, Aliko Dangote who intends to branch into farming by investing $4.6billion in the Nigerian agriculture sector. Mr. Dangote plans to invest at least $3.8billion in sugar and rice and $800m in milk production in the next three years.`,
      date: 'FEBRUARY 23, 2021',
      image: 'farm-4.jpg',
    },
  ]);
  const [Shows, setShows] = useState([
    {
      id: '1',
      title: 'Sirin Noma',
      image: 'sirinNoma.jpeg',
    },
    {
      id: '2',
      title: 'Dogaro Da Kai',
      image: 'dogarodakai.jpeg',
    },
    {
      id: '3',
      title: 'Ilimin Kasuwanci',
      image: 'llimin.jpeg',
    },
    {
      id: '4',
      title: 'Kasuwar Wase',
      image: 'kasuwarwuse.jpeg',
    },

    {
      id: '5',
      title: 'Siyasa ba gaba ba',
      image: 'siyasa.jpeg',
    },
    {
      id: '6',
      title: 'Tattalin Arzikin Mi',
      image: 'tattalin.jpeg',
    },
    {
      id: '7',
      title: 'Kacici Kacici',
      image: 'kacici.jpeg',
    },
  ]);
  const [Presenter, setPresenter] = useState([
    {
      id: '1',
      name: 'Kabir G Haruna',
      bio: '',
      image: 'presenter_kabir.jpg',
    },
    {
      id: '2',
      name: 'Salisu Idris Madobi',
      bio: '',
      image: 'presenter_salisu.jpg',
    },
  ]);
  const [Television, setTelevision] = useState([
    {
      id: '1',
      title: 'Angas traditional dancers of Plateau state. #asharuwa',
      content: '',
      url: 'https://www.youtube.com/@HimmaTV261',
    },
  ]);

  return (
    <div className='App'>
      <BrowserRouter>
        <DataContext.Provider value={{ News, Shows, Presenter, Television }}>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/page/:id/' element={<Page />} />
            {/* details section  */}
            <Route path='/news/:id' element={<NewsDetails />} />
            <Route path='/presenters/:id' element={<PresenterDetails />} />
            <Route path='/full/:id' element={<ShowsDetails />} />
            <Route path='/Himma-Tv/:id' element={<TvDetails />} />
            {/* details section  */}
            <Route path='/radio' element={<Radio />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/news' element={<NavNews />} />
            <Route path='/presenters' element={<NavPresenters />} />
            <Route path='/waserock-tv' element={<NavTv />} />
            <Route path='/programmes' element={<NavShows />} />
            <Route path='/podcast' element={<Podcast />} />

            <Route path='*' element={<NoteFound />} />
            
            {/* Authentication Routes */}
            <Route path='/login' element={<Login />} />
            
            {/* Private Admin Routes */}
            <Route path='/admin/*' element={<PrivateRoute element={<AdminLayout />} />} />
            <Route path='dashboard' element={<PrivateRoute element={<Dashboard />} />} />
            <Route path='manageshows' element={<PrivateRoute element={<ManageShows />} />} />
            <Route path='manageplaylists' element={<PrivateRoute element={<ManagePlaylists />} />} />
            <Route path='managenews' element={<PrivateRoute element={<ManageNews />} />} />
            <Route path='manageschedule' element={<PrivateRoute element={<ManageSchedule />} />} />
            <Route path='managepresenters' element={<PrivateRoute element={<ManagePresenters />} />} />
          </Routes>
        </DataContext.Provider>
      </BrowserRouter>
    </div>
  );
}



export default App;
