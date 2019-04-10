import React, { Component } from 'react';
import './App.css';
import UserPage from "./userPage";
import {Route} from "react-router-dom";
import * as ROUTES from './constants/routes'
import SignUpPage from "./signUpPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.USER_PAGE} component={UserPage} />
      </div>
    );
  }
}

export default App;
