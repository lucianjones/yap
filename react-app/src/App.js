import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import Home from "./components/Home";
import Chat from './chat2.jpg';

import { authenticate } from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((store) => store.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  if (user === null) {
      return (
          <BrowserRouter>
              <NavBar />
              <div id='welcome'>
                  <p>Welcome to yap! A premier chat application.</p>
              </div>
              <img src={Chat} alt='chat' id='chat' />
          </BrowserRouter>
      )
  }

  return (
    <BrowserRouter>
      <img src={Chat} alt='chat' id='chat' />
      <NavBar />
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      <Switch>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
