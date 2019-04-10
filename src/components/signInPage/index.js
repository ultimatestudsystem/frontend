import React from 'react';
import {withFirebase} from "../Firebase";
import * as ROUTES from '../../constants/routes'
import {Link, NavLink, withRouter} from "react-router-dom";
import {SignUpLink} from "../signUpPage";

const SignInPage = ()=> {

    return (
      <div>
          <h1>Sign in</h1>
          <SignInForm/>
          <SignUpLink/>
      </div>
    );
};

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

class SignInFormBase extends React.Component {

    constructor(props){
        super(props);

        this.state = {...INITIAL_STATE}
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    };

    onSubmit = event => {
        const {email, password} = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(authUser=> {
                this.setState(INITIAL_STATE);
                this.props.history.push(ROUTES.USER_PAGE)

            })
            .catch(error => {
                this.setState({error});
            });
        event.preventDefault();
    };

    render() {
        const { error, email, password } = this.state;
        const isInvalid = email === '' || password === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                       name={'email'}
                       placeholder={'Email address'}
                       onChange={this.onChange}
                       value={email}
                />
                <input type="password"
                       name={'password'}
                       placeholder={'Password..'}
                       onChange={this.onChange}
                       value={password}
                />
                <button type={'submit'} disabled={isInvalid}> Sign in</button>
                {error && <p> Error: {error.message} </p>}
            </form>
        );
    }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

const SignInLink = ()=> {
    return (
        <p>You already have account? <Link to={ROUTES.SIGN_IN}>Sign in</Link></p>
    );
};

export default SignInPage;

export {SignInLink}