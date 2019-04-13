import React from "react";
import {withFirebase} from "../Firebase";
import {compose} from "recompose";
import {connect} from "react-redux";


const withAuthentication = Component => {

    class WithAuthentication extends React.Component {
        constructor(props){
            super(props);

            this.props.onSetAuthUser(
                JSON.parse(localStorage.getItem('authUser')),
            )
        }



        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(
                authUser=> {
                    this.props.onSetAuthUser(authUser);
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                },
                ()=> {
                    localStorage.setItem('authUser', null);
                    this.setState({authUser: null})
                    this.props.onSetAuthUser(
                        JSON.parse(localStorage.getItem('authUser')),
                    )
                }
            );
        }

        componentWillUnmount() {
            this.listener();
        }


        render() {
            return <Component {...this.props}/>
        }
    }

    const mapDispatchToProps = dispatch => ({
        onSetAuthUser: authUser =>
            dispatch({type: 'AUTH_USER_SET', authUser})
    });

    return compose(
        withFirebase,
        connect(null, mapDispatchToProps),
    )(WithAuthentication);
};

export default withAuthentication;