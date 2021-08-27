import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
// LOCAL IMPORTS
import Navigation from './components/Navigation/Navigation.js';
import Main from './pages/Main.js';
import Trips from './pages/Trips.js';
import CreateTrip from './pages/CreateTrip.js';

function App() {
  return (
    <div>
      <Navigation />
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
            <ScrollToTop smooth/>
          </Route>
          <Route path="/trips">
            <Trips />
          </Route>
          <Route path="/createTrip">
            <CreateTrip />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;