import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import SportLocations from './components/SportLocations/SportLocations';
import ImageSlider from './components/SportLocations/SportLocation/ImageSlider/ImageSlider';
import Booking from './components/Booking/Booking'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import ContactForm from './components/ContactForm/ContactForm'
import UserResarvations from './components/UserReservations/UserReservations'
import Dashboard from './components/AdminPanel/Dashboard/Dashboard'
import AddSport from './components/AdminPanel/AddSport/AddSport';
import TodoList from './test/TodoList'
import UpdateSport from './components/AdminPanel/UpdateSport/UpdateSport';

import GridGallery from './components/AdminPanel/UpdateSport/GridGallery/GridGallery'
import RemoveSport from './components/AdminPanel/RemoveSport/RemoveSport';
import Customers from './components/AdminPanel/Customers/Customers'

import Sports from './components/AdminPanel/Sports/Sports'
import SDashboard from './components/SupportPanel/SDashboard/SDashboard';
import Faq from './components/SupportPanel/FAQ/Faq';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/sportLocations' component={SportLocations} />
          <Route exact path='/booking' component={Booking} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/contact' component={ContactForm} />
          <Route exact path='/userRes' component={UserResarvations} />
          <Route exact path='/adminDashboard' component={Dashboard} />
          <Route exact path='/adminAddSport' component={AddSport} />
          <Route exact path='/adminUpdateSport' component={UpdateSport} />
          <Route exact path='/adminRemoveSport' component={RemoveSport} />
          <Route exact path='/adminCustomers' component={Customers} />
          <Route exact path='/adminSports' component={Sports} />
          <Route exact path='/supportDashboard' component={SDashboard} />
          <Route exact path='/supportFaq' component={Faq} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
