import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';

// LOCAL IMPORTS
import Navigation from './components/Navigation/Navigation.js';
import Main from './pages/Main.js';
import Trips from './pages/Trips.js';
import CreateTrip from './pages/CreateTrip.js';
// import api from './utils/api';

function App() {

  const [userState, setUserState] = useState({
    token: "",
    user: {

    }
  });

  useEffect(() => {
    document.title = "Trips Refocused";
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      api.getUser(userId, token).then(res => {
        console.log(res.data)
        setUserState({
          token: token,
          user: {
            email: res.data.email,
            id: res.data.id,
            username: res.data.username
          }
        })
      }).catch(err => {
        console.log('no logged in user');
        setUserState({
          token: "",
          user: {}
        })
      })
    } else {
      console.log('no token provided');
    }
  }, []);

  const handleLogout = () => {
    setUserState({
        token: "",
        user: {}
    });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location = '/';
};

  return (
    <div style={{ minHeight: '100vh', background: '#202530', overflowX: 'hidden' }}>
      <Navigation setUserState={setUserState} userState={userState} user={userState.user} token={userState.token} handleLogout={handleLogout}/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Main setUserState={setUserState} userState={userState} user={userState.user} token={userState.token} handleLogout={handleLogout}/>
            <ScrollToTop smooth />
          </Route>
          <Route path="/trips/:id">
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