import React from 'react';
import {withFirebase} from "../Firebase";
import {compose} from "recompose";
import { withRouter} from "react-router-dom";
import {connect} from "react-redux";


const Authorization = allowedRoles => Component =>{

    class WithAuthorization extends React.Component {

        isUserAllowed = (allowedRoles, userRoles) => allowedRoles.some(allowedRole => userRoles === allowedRole);

        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(authUser => {

                    if (!this.isUserAllowed(allowedRoles, authUser.role)){
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
            const role = !!this.props.authUser ? this.props.authUser.role : 'GUEST';
            if (this.isUserAllowed(allowedRoles, role))
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