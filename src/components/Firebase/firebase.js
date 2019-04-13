import firebase from 'firebase'
import {config} from './config'

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

    // ***
    onAuthUserListener = (next, fallback)=> {
        return this.auth.onAuthStateChanged(authUser => {
            if (authUser) {

                this.user(authUser.uid)
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

                            next(authUser);
                        }
                    })
            } else {
                fallback();
            }
        })
    };

    // *** USER API *** //

    user = uid => this.db.ref(`users/${uid}`);

    users = ()=> this.db.ref('users')

    // *** Message API *** //
    message = uid => this.db.ref(`messages/${uid}`);

    messages = () => this.db.ref('messages');

    // ***

    student = uid => this.db.ref(`students/${uid}`);

    professor = uid => this.db.ref(`professors/${uid}`);

    onStudentListener = (uid ,onSetStudentInfo)=> {
        this.student(uid)
                    .on('value' , snapshot=> {
                        onSetStudentInfo(snapshot.val())
                    })
    }

    // *** Task API *** //
    tasks = course_id => (startDate, endDate) => next => {
        this.db.ref(`tasks/${course_id}`).orderByChild('added_date').startAt(startDate).endAt(endDate)
            .once('value')
            .then( snapshot=>{
                next(snapshot.val());
            })
            .catch(error => console.log(error.message));
    }

    // *** Courses API *** //
    courses = groupId => next => {
        this.db.ref('courses').orderByChild('group_id').equalTo(groupId)
            .once('value')
            .then(snapshot=> {
                console.log(groupId)
               next(snapshot.val());
            })
            .catch(error=> console.log(error.message))
    }
}

export default Firebase;
