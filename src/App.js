import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/Navigation/Navbar.js';
import PrivateRoute from './components/Navigation/PrivateRoute.js';
import { auth, useAuth, AuthHeaderContext, UserContext } from './authentication/index.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logGuestEvent } from 'api/ClubsAPI.js';
import { useSelector } from 'react-redux';

const App = () => {
  const guest = useSelector((state) => state.guest);
  const { tokenRef } = useAuth(auth)
  const [user] = useAuthState(auth)

  const authHeader = useCallback(() => ({
    Authorization: `Bearer ${tokenRef.current}`
  }))

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = "https://fonts.googleapis.com/css2?family=Arvo&family=Biryani:wght@200;600;700;800&family=Montserrat:wght@300;400;500;600;700&family=Yanone+Kaffeesatz:wght@400;500;600&family=Lilita+One&display=swap";
    document.head.appendChild(link);
  }, []);

  React.useEffect(() => {
    if(guest.guestMode) {
        logGuestEvent();
    }
  }, [guest.guestMode]);

  return (
      <Router>
        <AuthHeaderContext.Provider value={authHeader}>
          <UserContext.Provider value={user ?? null}>
            <Navbar/>
            <PrivateRoute exact path="/"/>
          </UserContext.Provider>
        </AuthHeaderContext.Provider>
      </ Router>
  )
}
export default App;
