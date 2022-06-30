import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import ImageFormPage from './components/ImageFormPage';
import CameraRoll from "./components/CameraRoll";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ImagePage from "./components/ImagePage";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Splash from "./components/HomePage/Splash";
import Component404 from "./components/Component404";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/images/upload">
            <ImageFormPage />
          </Route>
          <Route path="/cameraroll">
            <CameraRoll />
          </Route>
          <Route exact path="/images/:imageId" >
            <ImagePage />
          </Route>
          <Route path='/splash'>
            <Splash/>
          </Route>
          <Route >
            <Component404/>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
