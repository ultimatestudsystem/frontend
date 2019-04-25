import React, { Component } from 'react';
import './App.css';
import UserPage from "./student";
import {Route} from "react-router-dom";
import * as ROUTES from '../constants/routes'
import SignUpPage from "./signUpPage";
import SignInPage from './signInPage'
import {withAuthentication, Authorization} from "./Session";
import AdminPage from "./admin";
import ProfessorPage from "./professor";

const Student = Authorization(['STUDENT']);
const Teacher = Authorization(['PROFESSOR']);

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path={ROUTES.SIGN_IN} component={SignInPage}/>
                <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.USER_PAGE} component={Student(UserPage)} />
                <Route path={ROUTES.PROFESSOR_PAGE} component={Teacher(ProfessorPage)}/>
                <Route path={ROUTES.ADMIN_PAGE} component={AdminPage}/>
            </div>
        );
    }
}

export default withAuthentication(App);
