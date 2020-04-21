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
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/addSport' component={AddSport} />
          <Route exact path='/test' component={TodoList} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
