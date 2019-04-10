import React from 'react';
import {withFirebase} from "../Firebase";
import * as ROUTES from '../../constants/routes';
import {NavLink, withRouter} from "react-router-dom";
import {SignInLink} from "../signInPage";

const SignUpPage = ()=> {
    return (
        <div>
            <h1>Sign up</h1>
            <SignUpForm/>
            <SignInLink/>
        </div>
    );
};

const INITIAL_STATE = {
    email: '',
    password: '',
    name: '',
    error: null
};

class SignUpFormBase extends React.Component {


    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE}
    }

    onSubmit = event => {
        const {email, password, name} = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {

                this.setState(INITIAL_STATE);

                this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        name,
                        email,
                    });

                this.props.history.push(ROUTES.SIGN_IN);

            })
            .catch(error => {
                this.setState({error})
            });

        event.preventDefault();
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {

        const {error, email, password, name} = this.state;
        const isInvalid = email === '' || password === '' || name === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                       name={'name'}
                       placeholder={'Name'}
                       onChange={this.onChange}
                       value={name}
                />
                <input type="text"
                       name={'email'}
                       placeholder={'Email address'}
                       onChange={this.onChange}
                       value={email}
                />
                <input type="password"
                       name={'password'}
                       placeholder={'password ...'}
                       onChange={this.onChange}
                       value={password}
                />
                <button type={'submit'} disabled={isInvalid}>Sign Up</button>
                {error && <p> Error: {error.message}  </p>}
            </form>
        );

    }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

const SignUpLink = ()=> (
    <p>
        Don't have an account? <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
    </p>
);

export default SignUpPage;

export { SignUpLink }