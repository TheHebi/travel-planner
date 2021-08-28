import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// LOCAL IMPORTS
import Navigation from './components/Navigation/Navigation.js';
import Main from './pages/Main.js';
import Trips from './pages/Trips.js';

function App() {
  return (
    <div style={{minHeight: '100vh', background: '#202530'}}>
      <Navigation />
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/trips">
            <Trips />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;