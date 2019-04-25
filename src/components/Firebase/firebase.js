import firebase from  'firebase'
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

    getIdToken = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = this.auth.onAuthStateChanged((user) => {
                unsubscribe();
                if (user) {
                    user.getIdToken().then((idToken) => {
                        resolve(idToken);
                    }, (error) => {
                        resolve(null);
                    });
                } else {
                    resolve(null);
                }
            });
        });
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
                            if (!dbUser.role) {
                                dbUser.role = 'GUEST';
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

    // *** Chat API *** //
    chats = ()=> this.db.ref('chats');
    chat = (prof_uid, student_uid) => (next, fallback) => {
        return this.chats()
            .orderByChild('professor_id').equalTo(prof_uid)
            .orderByChild('student_id').equalTo(student_uid)
            .limitToFirst(1)
            .once('value')
            .then(snapshot=> {
                next(snapshot.val());
            })
            .catch(error=> {
                fallback(error.message);
            })
    };

    // *** Message API *** //
    message = uid => this.db.ref(`messages/${uid}`);

    messages = () => this.db.ref('messages');

    // ***

    student = uid => this.db.ref(`students/${uid}`);

    professor = uid => this.db.ref(`professors/${uid}`); // deleted

    onProfessorListener = (uid, onSetProfessorInfo) => { // deleted
        this.professor(uid)
            .on('value', snapshot=> {
                onSetProfessorInfo(snapshot.val());
            })
    };

    onStudentListener = (uid ,onSetStudentInfo)=> {
        this.student(uid)
                    .on('value' , snapshot=> {
                        onSetStudentInfo(snapshot.val())
                    })
    }

    // *** Task API *** //
    tasks = course_id => (startDate, endDate) => next => {
        this.db.ref(`tasks/${course_id}`).orderByChild('last_updating_date').startAt(startDate).endAt(endDate)
            .once('value')
            .then( snapshot =>{
                let tasks = {};
                Object.values(snapshot.val()).forEach(value => {
                    tasks[new Date(value['last_updating_date']*1000).toLocaleDateString()] = value;
                });
                next(tasks, course_id);
            })
            .catch(error => console.log(error.message));
    };

    task_ref = (course_id)=> this.db.ref(`tasks/${course_id}`);

    // *** Courses API *** //
    course = groupId => next => {
        this.db.ref('courses').orderByChild('group_id').equalTo(groupId)
            .once('value')
            .then(snapshot=> {
               next(snapshot.val());
            })
            .catch(error=> console.log(error.message))
    };

    course_list_by_group = group_id => next => {
        this.courses().orderByChild('group_id').equalTo(group_id)
            .once('value')
            .then(snapshot=> {
                next(snapshot.val());
            })
            .catch(err=> console.log(err.message))
    };

    course_list_by_professor = professor_id => next => {
        this.db.ref('courses').orderByChild('professor_id').equalTo(professor_id)
            .once('value')
            .then(snapshot=> {
                console.log(professor_id)
                console.log(snapshot.val())
               next(snapshot.val());
            })
            .catch(error=> console.log(error.message))
    };

    courses = ()=> this.db.ref('courses');
}

export default Firebase;
