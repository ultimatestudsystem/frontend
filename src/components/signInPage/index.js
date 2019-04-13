import React from 'react';
import {withFirebase} from "../Firebase";
import * as ROUTES from '../../constants/routes'
import {Link, NavLink, Redirect, withRouter} from "react-router-dom";
import {SignUpLink} from "../signUpPage";
import {compose} from "recompose";
import {connect} from "react-redux";

const SignInPage = (props)=> {

    if (props.authUser == null)
        return (
            <div>
                <h1>Sign in</h1>
                <SignInForm/>
                <SignUpLink/>
            </div>
        );
    else {
        props.history.push(ROUTES.USER_PAGE);
        return null;
    }
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
        event.preventDefault();

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(authUser=> {
                this.setState({...INITIAL_STATE});
                this.props.firebase
                    .user(authUser.uid)
                    .once('value')
                    .then(snapshot=> {
                        const dbUser = snapshot.val();
                        if (dbUser) {
                            if (!dbUser.roles) {
                                dbUser.roles = {};
                            }

                            authUser = {
                                email: authUser.email,
                                uid: authUser.uid,
                                ...dbUser
                            };
                        }
                    });
                this.props.onSetAuthUser(authUser);
                this.props.history.push(ROUTES.USER_PAGE)

            })
            .catch(error => {
                this.setState({error});
            });
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

const mapStateToProps = state => {
    return {
        authUser: state.sessionState.authUser,
    }
};
const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser =>
        dispatch({type: 'AUTH_USER_SET', authUser})
});


export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(SignInPage);

export {SignInLink}