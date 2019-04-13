import React from 'react';
import * as ROUTES from '../../constants/routes';
import {withFirebase} from "../Firebase";
import {compose} from "recompose";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";


const Authorization = allowedRoles => Component =>{

    class WithAuthorization extends React.Component {

        isUserAllowed = (allowedRoles, userRoles) => allowedRoles.some(allowedRole => !!userRoles[allowedRole]);

        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(authUser => {
                    console.log(authUser)

                    if (!this.isUserAllowed(allowedRoles, authUser.roles)){
                        this.props.history.push('/next')
                    }
                },
                () => this.props.history.push('/nextFail')
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            const roles = !!this.props.authUser ? this.props.authUser.roles : {};
            console.log(this.props.authUser)
            if (this.isUserAllowed(allowedRoles, roles))
                return <Component {...this.props} />;
            else
                return <h1> No page for you! 403 error code </h1>
        }
    }

    const mapStateToProps = state =>{
       return {
           authUser: state.sessionState.authUser,
       }
    };

    return compose(
        withFirebase,
        withRouter,
        connect(mapStateToProps, null),
    )(WithAuthorization)
};

export default Authorization;