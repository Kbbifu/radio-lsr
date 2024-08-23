import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Presenters from './Home/Presenters';
import News from './Home/News';
import Shows from './Home/Shows';
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

import Login from './Auth/Login';
import AdminHome from './Admin/AdminHome';
import Logout from './Auth/Logout';
import PrivateRoute from './Auth/PrivateRoute';
import ManageSchedule from './Admin/ManageSchedule';
import ManagePresenters from './Admin/ManagePresenters';

export const DataContext = React.createContext();

function App() {
  const [News, setNews] = useState([
    // ... vos données de news ici
  ]);
  const [Shows, setShows] = useState([
    // ... vos données de shows ici
  ]);
  const [Presenter, setPresenter] = useState([
    // ... vos données de presenters ici
  ]);
  

  return (
    <div className='App'>
      <BrowserRouter>
        <DataContext.Provider value={{ News, Shows, Presenters }}>
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

            {/* <Route path='/Presenters' element={<PresentersPage />} /> */}
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

            {/* Admin Routes encapsulated in PrivateRoute */}
            <Route
              path='/admin'
              element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }
            />
            <Route
              path='/administration'
              element={
                <PrivateRoute>
                  <AdminHome />
                </PrivateRoute>
              }
            />
            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path='/manageshows'
              element={
                <PrivateRoute>
                  <ManageShows />
                </PrivateRoute>
              }
            />
            <Route
              path='/manageplaylists'
              element={
                <PrivateRoute>
                  <ManagePlaylists />
                </PrivateRoute>
              }
            />
            <Route
              path='/managenews'
              element={
                <PrivateRoute>
                  <ManageNews />
                </PrivateRoute>
              }
            />
            <Route
              path='/manageschedule'
              element={
                <PrivateRoute>
                  <ManageSchedule />
                </PrivateRoute>
              }
            />
            <Route
              path='/managepresenters'
              element={
                <PrivateRoute>
                  <ManagePresenters />
                </PrivateRoute>
              }
            />
          </Routes>
        </DataContext.Provider>
      </BrowserRouter>
    </div>
  );
}

function AdminLayout() {
  return (
    <div>
      <AdminSidebar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/manageshows' element={<ManageShows />} />
        <Route path='/manageplaylists' element={<ManagePlaylists />} />
        <Route path='/managenews' element={<ManageNews />} />
        <Route path='/manageschedule' element={<ManageSchedule />} />
        <Route path='/managepresenters' element={<ManagePresenters />} />
      </Routes>
    </div>
  );
}

export default App;
