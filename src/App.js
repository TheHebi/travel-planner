import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// LOCAL IMPORTS
import Navigation from './components/Navigation/Navigation.js';
import Homepage from './components/Homepage/Homepage.js';
import Features from './components/Features/Features.js';
import Contact from './components/Contact/Contact.js';

function App() {
  return (
    <div>
      <Navigation />
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
            <Features />
            <Contact />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;