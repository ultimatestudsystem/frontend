import React from 'react';
import {withRouter} from 'react-router-dom';
import {withFirebase} from "../Firebase";
import * as ROUTES from '../../constants/routes'
import {connect} from "react-redux";

const SignOut = ({firebase, history, onSetAuthUser}) => {

    let doSignOut = ()=> {
        localStorage.setItem('authUser', null);
        firebase.doSignOut()
            .then(()=> {
                    onSetAuthUser(null);
                    history.push(ROUTES.SIGN_IN)
                }
            )
            .catch(error => alert(error));
    };

    return (
        <button type={'button'} onClick={doSignOut} >Sign out</button>
    );
};

const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser =>
        dispatch({type: 'AUTH_USER_SET', authUser})
});

export default connect(null, mapDispatchToProps)(withRouter(withFirebase(SignOut)));