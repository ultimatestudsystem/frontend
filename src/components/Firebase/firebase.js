import firebase from 'firebase'
import { config } from './config'
// Initialize Firebase
class Firebase {
    constructor(){
        firebase.initializeApp(config);

        this.auth = firebase.auth();
        this.db = firebase.database();
    };

    doCreateUserWithEmailAndPassword = (email, password)=> {
        return this.auth.createUserWithEmailAndPassword(email, password);
    };

    doSignInWithEmailAndPassword = (email, password)=> {
        return this.auth.signInWithEmailAndPassword(email, password);
    };

    doSignOut = ()=> {
        return this.auth.signOut();
    };

    // *** USER API *** //

    user = uid => this.db.ref(`users/${uid}`);

    users = ()=> this.db.ref('users')

}

export default Firebase;
