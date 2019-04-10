import React from 'react';
import FirebaseContext from './context'

const withFirebase = Component => props => {

    return (
            <FirebaseContext.Consumer>
                {firebase =>
                    <Component {...props} firebase={firebase}/>
                }
            </FirebaseContext.Consumer>
        );

};

export default withFirebase;