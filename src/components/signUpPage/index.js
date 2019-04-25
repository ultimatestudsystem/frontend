import React from 'react';
import {withFirebase} from "../Firebase";
import * as ROUTES from '../../constants/routes';
import {NavLink, withRouter} from "react-router-dom";
import {SignInLink} from "../signInPage";
import * as ROLES from "../../constants/roles";

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
    first_name: '',
    last_name: '',
    middle_name: '',
    phone: '',
    birth_date: '',
    photo: '',
    error: null
};

class SignUpFormBase extends React.Component {


    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE}
    }

    onSubmit = event => {
        const {
            email,
            password,
            first_name,
            last_name,
            middle_name,
            phone,
            birth_date,
            photo
        } = this.state;
        const roles = {};

        roles[ROLES.STUDENT] = ROLES.STUDENT;
        const role = 'STUDENT';
        event.preventDefault();

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {

                this.setState({...INITIAL_STATE});

                this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        first_name,
                        last_name,
                        email,
                        role,
                        middle_name,
                        phone,
                        birth_date,
                        photo
                    });

                this.props.history.push(ROUTES.SIGN_IN);

            })
            .catch(error => {
                this.setState({error})
            });

    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {

        const {
            error,
            email,
            password,
            first_name,
            last_name,
            middle_name,
            phone,
            birth_date,
            photo
        } = this.state;
        const isInvalid = email === '' || password === '' ||
            first_name === '' || last_name === '' || middle_name === '' ||
            phone === '' || birth_date === '' || phone === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <input type="text"
                           name={'first_name'}
                           placeholder={'Name'}
                           onChange={this.onChange}
                           value={first_name}
                    />
                </div>
                <div>
                    <input type="text"
                           name={'last_name'}
                           placeholder={'Lastname'}
                           onChange={this.onChange}
                           value={last_name}
                    />
                </div>
                <div>
                    <input type="text"
                           name={'middle_name'}
                           placeholder={'MiddleName'}
                           onChange={this.onChange}
                           value={middle_name}
                    />
                </div>
                <div>
                    <input type="text"
                           name={'phone'}
                           placeholder={'phone'}
                           onChange={this.onChange}
                           value={phone}
                    />
                </div>
                <div>
                    <input type="text"
                           name={'birth_date'}
                           placeholder={'birthdate'}
                           onChange={this.onChange}
                           value={birth_date}
                    />
                </div>
                <div>
                    <input type="text"
                           name={'photo'}
                           placeholder={'photo'}
                           onChange={this.onChange}
                           value={photo}
                    />
                </div>
                <div>
                    <input type="text"
                           name={'email'}
                           placeholder={'Email address'}
                           onChange={this.onChange}
                           value={email}
                    />
                </div>
                <div>
                    <input type="password"
                           name={'password'}
                           placeholder={'password ...'}
                           onChange={this.onChange}
                           value={password}
                    />
                </div>
                <div>
                    <button type={'submit'} disabled={isInvalid}>Sign Up</button>
                </div>
                <div>
                    {error && <p> Error: {error.message}  </p>}
                </div>
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